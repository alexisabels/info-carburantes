// Geocoder ligero contra Nominatim (OpenStreetMap). Sin dependencias, sin
// claves. Lo usamos para "buscar por dirección" en la pantalla Cerca y en
// la home — el usuario escribe una calle/CP/POI y obtenemos lat/lng para
// listar las gasolineras cercanas.
//
// Política de uso de Nominatim (https://operations.osmfoundation.org/policies/nominatim/):
// - máx 1 req/s (cubrimos con debounce 300ms en el consumidor + dedup).
// - identificarse: en navegador NO podemos fijar User-Agent, pero sí pasar
//   `email` como query param para que tracen abuso a una dirección útil.
// - cache cliente: cacheamos respuestas en sessionStorage para no
//   machacar la API con la misma query.
// - atribución: la pintamos en el footer del componente de búsqueda.
//
// Acotamos a España con `countrycodes=es` y limitamos a 6 resultados:
// más confunde y casi nunca aporta una mejor coincidencia.

const NOMINATIM_BASE = "https://nominatim.openstreetmap.org";
const REVERSE_BASE = `${NOMINATIM_BASE}/reverse`;
const SEARCH_BASE = `${NOMINATIM_BASE}/search`;

// Email de contacto público pegado al dominio del proyecto para que el
// equipo de Nominatim pueda contactar si hay abuso. No tiene que ser real
// pero conviene que apunte al maintainer.
const CONTACT = "carburantes@alexisabel.com";

const CACHE_PREFIX = "geocode.v1:";
const REVERSE_PREFIX = "revgeocode.v1:";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24h: las direcciones rara vez cambian.

const ssGet = (key) => {
  try {
    if (typeof sessionStorage === "undefined") return null;
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.t !== "number") return null;
    if (Date.now() - parsed.t > CACHE_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
};

const ssSet = (key, data) => {
  try {
    if (typeof sessionStorage === "undefined") return;
    sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), data }));
  } catch {
    // sessionStorage lleno o privado: ignoramos, el geocoder funciona sin caché.
  }
};

const buildTimeoutSignal = (timeoutMs) => {
  if (typeof AbortSignal !== "undefined" && AbortSignal.timeout) {
    return AbortSignal.timeout(timeoutMs);
  }
  if (typeof AbortController !== "undefined") {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeoutMs);
    return controller.signal;
  }
  return undefined;
};

// Une la señal interna de timeout con la externa del consumer.
const combineSignals = (timeoutMs, externalSignal) => {
  const timeoutSignal = buildTimeoutSignal(timeoutMs);
  if (!externalSignal) return timeoutSignal;
  if (!timeoutSignal) return externalSignal;
  if (typeof AbortController === "undefined") return timeoutSignal;
  const controller = new AbortController();
  const abort = () => controller.abort();
  if (externalSignal.aborted) controller.abort();
  else externalSignal.addEventListener("abort", abort, { once: true });
  if (timeoutSignal.aborted) controller.abort();
  else if (typeof timeoutSignal.addEventListener === "function") {
    timeoutSignal.addEventListener("abort", abort, { once: true });
  }
  return controller.signal;
};

const normalizeQuery = (q) =>
  String(q || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

// Formatea un display_name de Nominatim a un texto compacto: muchas veces
// llega como "Calle Mayor, 12, 28013, Madrid, Comunidad de Madrid, España".
// Dejamos las dos/tres primeras partes que son las más informativas.
const compactDisplay = (display) => {
  if (!display) return "";
  const parts = String(display).split(",").map((p) => p.trim()).filter(Boolean);
  if (parts.length <= 3) return parts.join(", ");
  // Quitamos el último (país) si es España, y nos quedamos con las 3 primeras
  // partes (calle/POI, número/CP, ciudad). El resto suele ser provincia/CCAA.
  const last = parts[parts.length - 1].toLowerCase();
  const trimmed = last === "españa" || last === "spain" ? parts.slice(0, -1) : parts;
  if (trimmed.length <= 3) return trimmed.join(", ");
  return trimmed.slice(0, 3).join(", ");
};

// Convierte la respuesta cruda de Nominatim a la forma que esperan los
// consumidores: { lat, lng, label, primary, secondary }.
const adaptResult = (raw) => {
  if (!raw) return null;
  const lat = parseFloat(raw.lat);
  const lng = parseFloat(raw.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  const display = raw.display_name || "";
  const label = compactDisplay(display);
  const parts = display.split(",").map((p) => p.trim()).filter(Boolean);
  const primary = parts[0] || label;
  const secondary = parts.slice(1, 3).join(", ");
  return {
    lat,
    lng,
    label: label || primary,
    primary,
    secondary,
    raw: { type: raw.type, class: raw.class, importance: raw.importance },
  };
};

const inflightSearch = new Map(); // queryNormalized -> Promise

// Devuelve hasta `limit` sugerencias para una consulta libre (calle, POI,
// CP, ciudad…). Cachea por query normalizada en sessionStorage.
export async function searchAddress(query, { signal, limit = 6 } = {}) {
  const q = normalizeQuery(query);
  if (q.length < 3) return [];
  const cacheKey = `${CACHE_PREFIX}${limit}:${q}`;
  const cached = ssGet(cacheKey);
  if (cached) return cached;

  const inflight = inflightSearch.get(cacheKey);
  if (inflight) return inflight;

  const url = new URL(SEARCH_BASE);
  url.searchParams.set("q", query);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("countrycodes", "es");
  url.searchParams.set("addressdetails", "0");
  url.searchParams.set("accept-language", "es");
  url.searchParams.set("email", CONTACT);

  const promise = (async () => {
    try {
      const response = await fetch(url.toString(), {
        signal: combineSignals(7000, signal),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Nominatim ${response.status}`);
      }
      const data = await response.json();
      const adapted = Array.isArray(data)
        ? data.map(adaptResult).filter(Boolean).slice(0, limit)
        : [];
      ssSet(cacheKey, adapted);
      return adapted;
    } catch (err) {
      if (signal && signal.aborted) return [];
      if (err && (err.name === "AbortError" || err.name === "TimeoutError")) {
        return [];
      }
      throw err;
    } finally {
      inflightSearch.delete(cacheKey);
    }
  })();
  inflightSearch.set(cacheKey, promise);
  return promise;
}

// Reverse geocoding: lat/lng → dirección legible. La usamos para mostrar
// "Cerca de Calle Mayor 12, Madrid" cuando el usuario llega vía geoloc.
export async function reverseGeocode(lat, lng, { signal } = {}) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  const key = `${REVERSE_PREFIX}${lat.toFixed(4)},${lng.toFixed(4)}`;
  const cached = ssGet(key);
  if (cached !== null) return cached;

  const url = new URL(REVERSE_BASE);
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lng));
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("zoom", "18");
  url.searchParams.set("accept-language", "es");
  url.searchParams.set("email", CONTACT);

  try {
    const response = await fetch(url.toString(), {
      signal: combineSignals(5000, signal),
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    const data = await response.json();
    const adapted = adaptResult(data);
    ssSet(key, adapted);
    return adapted;
  } catch {
    return null;
  }
}

export const GEOCODER_ATTRIBUTION = {
  text: "Direcciones por OpenStreetMap",
  href: "https://www.openstreetmap.org/copyright",
};
