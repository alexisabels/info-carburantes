// Capa de datos para Server Components y rutas SSR/ISR.
// Usamos el `fetch` extendido de Next.js con `next.revalidate` para que el
// runtime cachee respuestas a nivel de petición HTTP. MITECO actualiza sus
// precios cada ~30 min, así que esa es la cota natural.
//
// La capa cliente (src/utils/api.js) sigue existiendo para fetches del
// navegador (Cerca de mí, históricos, etc.); aquí solo cubrimos lo que
// necesita renderizarse en servidor.

import { cache } from "react";

const BASE_URL =
  "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes";

const REVALIDATE_HALF_HOUR = 1800;
const REVALIDATE_DAY = 60 * 60 * 24;

async function fetchJson(url, { revalidate = REVALIDATE_HALF_HOUR, tag } = {}) {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate, tags: tag ? [tag] : undefined },
  });
  if (!res.ok) {
    throw new Error(`MITECO ${res.status}: ${url}`);
  }
  const data = await res.json();
  if (
    data &&
    typeof data === "object" &&
    typeof data.ResultadoConsulta === "string" &&
    data.ResultadoConsulta.toUpperCase() !== "OK"
  ) {
    throw new Error(`MITECO: ${data.ResultadoConsulta}`);
  }
  return data;
}

export async function fetchProvinciasServer() {
  try {
    const data = await fetchJson(`${BASE_URL}/Listados/Provincias/`, {
      revalidate: REVALIDATE_DAY,
      tag: "provincias",
    });
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function fetchMunicipiosPorProvinciaServer(idProvincia) {
  try {
    const data = await fetchJson(
      `${BASE_URL}/Listados/MunicipiosPorProvincia/${encodeURIComponent(idProvincia)}`,
      { revalidate: REVALIDATE_DAY, tag: `municipios:${idProvincia}` }
    );
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function fetchMunicipioCompletoServer(idMunicipio) {
  try {
    const data = await fetchJson(
      `${BASE_URL}/EstacionesTerrestres/FiltroMunicipio/${encodeURIComponent(idMunicipio)}`,
      { revalidate: REVALIDATE_HALF_HOUR, tag: `municipio:${idMunicipio}` }
    );
    return data && typeof data === "object"
      ? data
      : { Fecha: "", ListaEESSPrecio: [] };
  } catch {
    return { Fecha: "", ListaEESSPrecio: [] };
  }
}

export async function fetchGasolineraServer(idMunicipio, ideess) {
  const data = await fetchMunicipioCompletoServer(idMunicipio);
  const lista = Array.isArray(data?.ListaEESSPrecio) ? data.ListaEESSPrecio : [];
  const target = String(ideess);
  const estacion = lista.find((e) => e && String(e.IDEESS) === target) || null;
  return { estacion, fecha: data?.Fecha || null };
}

// Listado nacional completo. MITECO devuelve ~16 MB y Next.js solo cachea
// fetches de hasta 2 MB ("Failed to set Next.js data cache, items over 2MB"),
// así que la persistencia entre invocaciones se nos cae. Tampoco podemos
// pre-renderizar las 22 marcas en build (×30 s cada fetch = >10 min).
//
// Solución: bypass del data cache de Next (`cache: 'no-store'`) + memoización
// manual a nivel de módulo. En cada instancia/contenedor de Vercel el primer
// fetch tarda ~5-30 s; los siguientes durante la ventana TTL son instantáneos
// y reutilizan el objeto en memoria.
//
// También envolvemos en `React.cache()` para que dentro de UN MISMO render
// (página + JSON-LD + componentes hijos que pidan estaciones) solo se
// resuelva una vez aunque ya haya cache de módulo: evita andar tocando el
// Map a varias funciones en paralelo.

const ALL_STATIONS_TTL_MS = 60 * 60 * 1000;
let allStationsMemo = null;
let allStationsMemoAt = 0;
let allStationsInflight = null;

async function fetchTodasLasEstacionesUncached() {
  const now = Date.now();
  if (allStationsMemo && now - allStationsMemoAt < ALL_STATIONS_TTL_MS) {
    return allStationsMemo;
  }
  if (allStationsInflight) return allStationsInflight;

  allStationsInflight = (async () => {
    try {
      const res = await fetch(`${BASE_URL}/EstacionesTerrestres/`, {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`MITECO ${res.status}`);
      const data = await res.json();
      const result =
        data && typeof data === "object"
          ? data
          : { Fecha: "", ListaEESSPrecio: [] };
      allStationsMemo = result;
      allStationsMemoAt = Date.now();
      return result;
    } catch {
      return { Fecha: "", ListaEESSPrecio: [] };
    } finally {
      allStationsInflight = null;
    }
  })();

  return allStationsInflight;
}

// React.cache añade request-level memoization además del memo de módulo:
// dentro del mismo render, varias llamadas comparten promesa.
export const fetchTodasLasEstacionesServer = cache(
  fetchTodasLasEstacionesUncached
);

// Helper: precio numérico parseado o null.
export function parsePrecioSrv(raw) {
  if (raw === undefined || raw === null) return null;
  const s = String(raw).trim();
  if (!s || s === "-") return null;
  const n = parseFloat(s.replace(",", "."));
  if (!Number.isFinite(n) || n <= 0) return null;
  return { texto: s, num: n };
}

// Mínimo precio del listado para un campo concreto.
export function minPrecio(lista, campo) {
  let min = null;
  for (const e of lista) {
    const p = parsePrecioSrv(e?.[campo]);
    if (p && (min === null || p.num < min.num)) min = p;
  }
  return min;
}
