// API pública del MITECO (Ministerio para la Transición Ecológica y el Reto
// Demográfico). El dominio sigue siendo `minetur.gob.es` por el cambio de
// denominación del ministerio en 2018: la administración mantuvo la URL
// legada para no romper integraciones existentes.
import { formatFechaApi } from "./dateRange";

const BASE_URL =
  "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes";

const DEFAULT_TIMEOUT_MS = 15000;
const RETRY_DELAY_MS = 500;

const ENDPOINTS = {
  PROVINCIAS: `${BASE_URL}/Listados/Provincias/`,
  MUNICIPIOS: (idProvincia) =>
    `${BASE_URL}/Listados/MunicipiosPorProvincia/${encodeURIComponent(
      idProvincia
    )}`,
  ESTACIONES_POR_MUNICIPIO: (idMunicipio) =>
    `${BASE_URL}/EstacionesTerrestres/FiltroMunicipio/${encodeURIComponent(
      idMunicipio
    )}`,
  TODAS_ESTACIONES: `${BASE_URL}/EstacionesTerrestres/`,
  HISTORICO_MUNICIPIO: (fechaStr, idMunicipio) =>
    `${BASE_URL}/EstacionesTerrestresHist/FiltroMunicipio/${fechaStr}/${encodeURIComponent(
      idMunicipio
    )}`,
};

const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const buildTimeoutSignal = (timeoutMs) => {
  if (typeof AbortSignal !== "undefined" && AbortSignal.timeout) {
    return AbortSignal.timeout(timeoutMs);
  }
  // Fallback para entornos sin AbortSignal.timeout.
  if (typeof AbortController !== "undefined") {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeoutMs);
    return controller.signal;
  }
  return undefined;
};

// Combina la señal del usuario (cancelación opcional) con la señal interna
// de timeout. Si alguna se aborta, el fetch se cancela.
const combineSignals = (timeoutMs, externalSignal) => {
  const timeoutSignal = buildTimeoutSignal(timeoutMs);
  if (!externalSignal) return timeoutSignal;
  if (!timeoutSignal) return externalSignal;
  if (typeof AbortController === "undefined") return timeoutSignal;

  const controller = new AbortController();
  const onAbort = () => controller.abort();
  if (externalSignal.aborted) {
    controller.abort();
  } else {
    externalSignal.addEventListener("abort", onAbort, { once: true });
  }
  if (timeoutSignal.aborted) {
    controller.abort();
  } else if (typeof timeoutSignal.addEventListener === "function") {
    timeoutSignal.addEventListener("abort", onAbort, { once: true });
  }
  return controller.signal;
};

// Error tipado para distinguir errores reintentables (red) de los que no
// (HTTP 4xx, respuesta inválida, ResultadoConsulta != "OK", abort de usuario).
class ApiError extends Error {
  constructor(message, { retryable = false, status = null } = {}) {
    super(message);
    this.name = "ApiError";
    this.retryable = retryable;
    this.status = status;
  }
}

const fetchJsonOnce = async (url, errorMessage, { timeoutMs, signal }) => {
  let response;
  try {
    response = await fetch(url, {
      signal: combineSignals(timeoutMs, signal),
      headers: { Accept: "application/json" },
    });
  } catch (err) {
    // Si el usuario abortó deliberadamente, no es reintentable.
    if (signal && signal.aborted) {
      throw new ApiError(`${errorMessage}: cancelado`, { retryable: false });
    }
    if (err && (err.name === "AbortError" || err.name === "TimeoutError")) {
      throw new ApiError(`${errorMessage}: tiempo de espera agotado`, {
        retryable: false,
      });
    }
    // Errores de red transitorios: sí reintentables.
    throw new ApiError(`${errorMessage}: error de red`, { retryable: true });
  }

  if (!response.ok) {
    const retryable = response.status >= 500 && response.status < 600;
    throw new ApiError(`${errorMessage} (HTTP ${response.status})`, {
      retryable,
      status: response.status,
    });
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new ApiError(`${errorMessage}: respuesta no válida`, {
      retryable: false,
    });
  }

  // La API del MITECO a veces responde con HTTP 200 pero ResultadoConsulta != "OK".
  if (
    data &&
    typeof data === "object" &&
    typeof data.ResultadoConsulta === "string" &&
    data.ResultadoConsulta.toUpperCase() !== "OK"
  ) {
    throw new ApiError(`${errorMessage}: ${data.ResultadoConsulta}`, {
      retryable: false,
    });
  }

  return data;
};

const fetchJson = async (
  url,
  errorMessage,
  { timeoutMs = DEFAULT_TIMEOUT_MS, signal, retry = true } = {}
) => {
  try {
    return await fetchJsonOnce(url, errorMessage, { timeoutMs, signal });
  } catch (err) {
    const isApiError = err instanceof ApiError;
    const canRetry =
      retry &&
      isApiError &&
      err.retryable &&
      !(signal && signal.aborted);
    if (!canRetry) {
      throw new Error(err.message);
    }
    await sleep(RETRY_DELAY_MS);
    if (signal && signal.aborted) {
      throw new Error(`${errorMessage}: cancelado`);
    }
    try {
      return await fetchJsonOnce(url, errorMessage, { timeoutMs, signal });
    } catch (err2) {
      throw new Error(err2.message);
    }
  }
};

// --- Caché en memoria + dedup de in-flight ----------------------------------
// Provincias: las 52 entidades no cambian. TTL 1h.
const PROVINCIAS_TTL_MS = 60 * 60 * 1000;
let provinciasCache = null;
let provinciasCachedAt = 0;
let provinciasInflight = null;

// Municipios por provincia: por idProvincia. TTL 1h.
const MUNICIPIOS_TTL_MS = 60 * 60 * 1000;
const municipiosCache = new Map(); // idProvincia -> { data, cachedAt }
const municipiosInflight = new Map(); // idProvincia -> Promise

export const fetchProvincias = async ({ signal } = {}) => {
  const now = Date.now();
  if (provinciasCache && now - provinciasCachedAt < PROVINCIAS_TTL_MS) {
    return provinciasCache;
  }
  if (provinciasInflight) return provinciasInflight;

  provinciasInflight = (async () => {
    try {
      const data = await fetchJson(
        ENDPOINTS.PROVINCIAS,
        "Error al obtener las provincias",
        { signal }
      );
      const result = Array.isArray(data) ? data : [];
      provinciasCache = result;
      provinciasCachedAt = Date.now();
      return result;
    } finally {
      provinciasInflight = null;
    }
  })();

  return provinciasInflight;
};

export const fetchMunicipios = async (idProvincia, { signal } = {}) => {
  if (idProvincia === undefined || idProvincia === null || idProvincia === "") {
    throw new Error("Error al obtener los municipios: idProvincia no válido");
  }
  const key = String(idProvincia);
  const now = Date.now();
  const cached = municipiosCache.get(key);
  if (cached && now - cached.cachedAt < MUNICIPIOS_TTL_MS) {
    return cached.data;
  }
  const inflight = municipiosInflight.get(key);
  if (inflight) return inflight;

  const promise = (async () => {
    try {
      const data = await fetchJson(
        ENDPOINTS.MUNICIPIOS(idProvincia),
        "Error al obtener los municipios",
        { signal }
      );
      const result = Array.isArray(data) ? data : [];
      municipiosCache.set(key, { data: result, cachedAt: Date.now() });
      return result;
    } finally {
      municipiosInflight.delete(key);
    }
  })();
  municipiosInflight.set(key, promise);
  return promise;
};

export const fetchMunicipioCompleto = async (idMunicipio, { signal } = {}) => {
  if (idMunicipio === undefined || idMunicipio === null || idMunicipio === "") {
    throw new Error(
      "Error al obtener los datos del municipio: idMunicipio no válido"
    );
  }
  const data = await fetchJson(
    ENDPOINTS.ESTACIONES_POR_MUNICIPIO(idMunicipio),
    "Error al obtener los datos del municipio",
    { signal }
  );
  return data && typeof data === "object" ? data : {};
};

export const fetchGasolineraPorID = async (
  idMunicipio,
  ideess,
  { signal } = {}
) => {
  if (ideess === undefined || ideess === null || ideess === "") {
    throw new Error("No se encontró la gasolinera: IDEESS no válido");
  }
  const municipioData = await fetchMunicipioCompleto(idMunicipio, { signal });
  const lista = Array.isArray(municipioData?.ListaEESSPrecio)
    ? municipioData.ListaEESSPrecio
    : [];
  const ideessStr = String(ideess);
  const gasolinera = lista.find(
    (estacion) => estacion && String(estacion.IDEESS) === ideessStr
  );
  if (!gasolinera) {
    throw new Error(`No se encontró la gasolinera con IDEESS ${ideess}`);
  }
  return gasolinera;
};

// Caché en memoria del listado completo: el JSON pesa varios MB y la API del
// MITECO es lenta. La fecha de actualización oficial cambia varias veces al
// día, así que un TTL de 10 min es seguro y evita re-descarga al alternar
// entre vistas dentro de la misma sesión.
const ALL_STATIONS_TTL_MS = 10 * 60 * 1000;
let allStationsCache = null;
let allStationsCachedAt = 0;
let allStationsInflight = null;

export const fetchTodasLasEstaciones = async ({
  force = false,
  signal,
} = {}) => {
  const now = Date.now();
  if (
    !force &&
    allStationsCache &&
    now - allStationsCachedAt < ALL_STATIONS_TTL_MS
  ) {
    return allStationsCache;
  }
  if (allStationsInflight) return allStationsInflight;

  allStationsInflight = (async () => {
    try {
      // Sin retry: petición lenta y costosa, confiamos en el caché.
      const data = await fetchJson(
        ENDPOINTS.TODAS_ESTACIONES,
        "Error al obtener todas las estaciones",
        { timeoutMs: 30000, signal, retry: false }
      );
      const result =
        data && typeof data === "object" ? data : { ListaEESSPrecio: [] };
      allStationsCache = result;
      allStationsCachedAt = Date.now();
      return result;
    } finally {
      allStationsInflight = null;
    }
  })();

  return allStationsInflight;
};

// --- Histórico por municipio ------------------------------------------------
// El histórico de un día pasado es inmutable; lo cacheamos en sessionStorage
// con TTL largo. Clave: (idMunicipio, fechaStr). Se descarga una sola vez
// para todos los combustibles del día (la respuesta los trae todos).
const HIST_TTL_MS = 24 * 60 * 60 * 1000;
const HIST_SS_PREFIX = "histcarb.muni:";

const ssGetHist = (key) => {
  try {
    if (typeof sessionStorage === "undefined") return null;
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || Date.now() - parsed.t > HIST_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
};

const ssSetHist = (key, data) => {
  try {
    if (typeof sessionStorage === "undefined") return;
    sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), data }));
  } catch {
    // cuota llena o modo privado: ignorar y servir sin caché.
  }
};

// Dedup de in-flight: si dos componentes piden la misma fecha/municipio a la
// vez, comparten la promesa. Mapa por clave compuesta.
const histInflight = new Map();

export const fetchHistoricoMunicipio = async (
  fecha,
  idMunicipio,
  { signal } = {}
) => {
  if (idMunicipio === undefined || idMunicipio === null || idMunicipio === "") {
    return { Fecha: "", ListaEESSPrecio: [] };
  }
  const fechaStr = formatFechaApi(fecha);
  const cacheKey = `${HIST_SS_PREFIX}${idMunicipio}:${fechaStr}`;
  const cached = ssGetHist(cacheKey);
  if (cached) return cached;

  const inflight = histInflight.get(cacheKey);
  if (inflight) return inflight;

  const promise = (async () => {
    try {
      const data = await fetchJson(
        ENDPOINTS.HISTORICO_MUNICIPIO(fechaStr, idMunicipio),
        `No se pudo cargar el histórico de ${fechaStr}`,
        { signal, retry: true }
      );
      const result =
        data && typeof data === "object"
          ? data
          : { Fecha: fechaStr, ListaEESSPrecio: [] };
      ssSetHist(cacheKey, result);
      return result;
    } catch (err) {
      // Cancelación del usuario: propagar para que el componente pare.
      if (signal && signal.aborted) throw err;
      // Día sin datos (festivo, error puntual): degradar a hueco para no
      // romper el render del resto de la serie.
      return { Fecha: fechaStr, ListaEESSPrecio: [] };
    } finally {
      histInflight.delete(cacheKey);
    }
  })();
  histInflight.set(cacheKey, promise);
  return promise;
};
