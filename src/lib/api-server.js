// Capa de datos para Server Components y rutas SSR/ISR.
// Usamos el `fetch` extendido de Next.js con `next.revalidate` para que el
// runtime cachee respuestas a nivel de petición HTTP. MITECO actualiza sus
// precios cada ~30 min, así que esa es la cota natural.
//
// La capa cliente (src/utils/api.js) sigue existiendo para fetches del
// navegador (Cerca de mí, históricos, etc.); aquí solo cubrimos lo que
// necesita renderizarse en servidor.

import { cache } from "react";
import { unstable_cache } from "next/cache";

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
    // revalidate diario (no 30 min): este fetch alimenta la copia ISR de las
    // páginas/OG de municipio y gasolinera. En Next, la ruta se regenera al
    // ritmo del fetch MÁS frecuente, así que dejarlo en 30 min reescribía la
    // caché ISR cada media hora. La frescura para el usuario la da el fetch de
    // CLIENTE (utils/api.js), que no pasa por aquí.
    const data = await fetchJson(
      `${BASE_URL}/EstacionesTerrestres/FiltroMunicipio/${encodeURIComponent(idMunicipio)}`,
      { revalidate: REVALIDATE_DAY, tag: `municipio:${idMunicipio}` }
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
// así que la persistencia EN BRUTO entre invocaciones se nos cae.
//
// Solución capas:
//   1. `cache: 'no-store'` evita el WARNING ruidoso de Next sobre los 2 MB.
//   2. Memoización a nivel de módulo: durante un build (un único proceso),
//      las 22 páginas de marca comparten el mismo objeto en memoria, así que
//      sólo descargamos MITECO UNA vez aunque pre-renderemos 22 rutas. En
//      producción, dentro de un mismo contenedor warm pasa lo mismo.
//   3. Para persistir ENTRE invocaciones serverless, no usamos esta función
//      directamente desde la página de marca: usamos el helper
//      `fetchEstacionesPorMarcaServer` (más abajo), que filtra el subset
//      por marca a un tamaño <2 MB y lo deja en el data cache de Next con
//      `unstable_cache`. Eso sí persiste entre invocaciones.
//
// Envolvemos también en `React.cache()` para que dentro de UN MISMO render
// (página + JSON-LD + componentes hijos que pidan estaciones) solo se
// resuelva una vez aunque ya haya cache de módulo.

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

// Subset filtrado y normalizado por marca: solo los campos que necesita la
// página /marca/[brand]. Esto reduce el JSON nacional (~16 MB) a algo
// tipicamente <300 KB incluso para la marca más grande (Repsol), lo que sí
// cabe en el data cache de Next (<2 MB) y permite que `unstable_cache`
// persista el resultado entre invocaciones serverless.
//
// El fetch nacional sigue siendo necesario una vez por contenedor (no hay
// filtro por marca en MITECO), pero a partir de ahí cada brand subset se
// mantiene caliente en el cache de Next durante la ventana de revalidación
// y los renders posteriores son instantáneos sin tocar los 16 MB.
async function buildBrandSubset(brandId) {
  const { stationBrand } = await import("./brands");
  const data = await fetchTodasLasEstacionesUncached();
  const lista = Array.isArray(data?.ListaEESSPrecio) ? data.ListaEESSPrecio : [];
  const fecha = data?.Fecha || "";
  const stations = [];
  for (const e of lista) {
    if (stationBrand(e) !== brandId) continue;
    // Subset mínimo de campos para la página + JSON-LD: dirección,
    // municipio/provincia, IDs para construir URLs, y datos de schema.org.
    stations.push({
      IDEESS: e.IDEESS,
      IDMunicipio: e.IDMunicipio,
      IDProvincia: e.IDProvincia,
      Provincia: e.Provincia,
      Municipio: e.Municipio,
      Localidad: e.Localidad,
      Dirección: e.Dirección,
      "Rótulo": e["Rótulo"],
      "C.P.": e["C.P."],
    });
  }
  return { fecha, stations };
}

// Cache namespaced por marca con TTL de 1 h (mayor que `revalidate=3600` de
// la página). Las páginas con `revalidate` reusan este cache, así que la
// ganancia entre invocaciones es real incluso sin warm container.
export const fetchEstacionesPorMarcaServer = cache(async (brandId) => {
  if (!brandId) return { fecha: "", stations: [] };
  const safeId = String(brandId).toLowerCase();
  const getCached = unstable_cache(
    () => buildBrandSubset(safeId),
    ["brand-subset", safeId],
    { revalidate: 3600, tags: [`brand:${safeId}`] }
  );
  try {
    return await getCached();
  } catch {
    return { fecha: "", stations: [] };
  }
});

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
