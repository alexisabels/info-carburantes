// Cliente del servicio de routing. Por defecto usa OSRM (Open Source
// Routing Machine) — sin API key, sin coste — apuntando a la demo pública
// (router.project-osrm.org). La demo es "best effort" según el proyecto y
// no se recomienda para producción de alto tráfico; para self-hostear o
// usar otro proveedor compatible con la API de OSRM v1, fija la env var
// `NEXT_PUBLIC_OSRM_URL` (sin slash final).
//
// Devolvemos:
//   - geometry: array de [lat, lng] del trazado completo (overview=full)
//   - distance: metros
//   - duration: segundos
//   - bbox: { minLat, maxLat, minLng, maxLng } calculada desde la geometría

const OSRM_BASE =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_OSRM_URL) ||
  "https://router.project-osrm.org";

const DEFAULT_TIMEOUT_MS = 12000;

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

export class RoutingError extends Error {
  constructor(message, { code = "generic" } = {}) {
    super(message);
    this.name = "RoutingError";
    this.code = code;
  }
}

const validPoint = (p) =>
  p &&
  Number.isFinite(p.lat) &&
  Number.isFinite(p.lng) &&
  p.lat >= -90 &&
  p.lat <= 90 &&
  p.lng >= -180 &&
  p.lng <= 180;

const computeBbox = (coords) => {
  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;
  for (const c of coords) {
    if (c[0] < minLat) minLat = c[0];
    if (c[0] > maxLat) maxLat = c[0];
    if (c[1] < minLng) minLng = c[1];
    if (c[1] > maxLng) maxLng = c[1];
  }
  return { minLat, maxLat, minLng, maxLng };
};

// Devuelve la ruta en coche que pasa por los puntos dados, en orden.
// Acepta `[origin, destination]` para la ruta base, o
// `[origin, waypoint, destination]` (o más paradas) cuando el usuario
// elige una gasolinera intermedia.
//
// OSRM acepta `lon,lat;lon,lat;...` en la ruta de la URL (al revés que
// cualquier API sana). `overview=full` trae la geometría completa,
// `geometries=geojson` la devuelve como array de [lng, lat]; convertimos
// a [lat, lng] aquí para que el resto del código no tenga que pensar en
// el orden inverso.
export const fetchRoute = async (points, { signal } = {}) => {
  if (!Array.isArray(points) || points.length < 2) {
    throw new RoutingError("Necesitamos al menos un origen y un destino", {
      code: "too_few_points",
    });
  }
  for (let i = 0; i < points.length; i++) {
    if (!validPoint(points[i])) {
      const code =
        i === 0
          ? "bad_origin"
          : i === points.length - 1
            ? "bad_destination"
            : "bad_waypoint";
      throw new RoutingError(`Punto ${i + 1} inválido`, { code });
    }
  }
  const coords = points.map((p) => `${p.lng},${p.lat}`).join(";");
  const url = `${OSRM_BASE}/route/v1/driving/${coords}?overview=full&geometries=geojson&alternatives=false&steps=false`;

  let response;
  try {
    response = await fetch(url, {
      signal: combineSignals(DEFAULT_TIMEOUT_MS, signal),
      headers: { Accept: "application/json" },
    });
  } catch (err) {
    if (signal && signal.aborted) {
      throw new RoutingError("Búsqueda cancelada", { code: "aborted" });
    }
    if (err && (err.name === "AbortError" || err.name === "TimeoutError")) {
      throw new RoutingError("La ruta tardó demasiado", { code: "timeout" });
    }
    throw new RoutingError("Sin conexión con el servicio de rutas", {
      code: "network",
    });
  }

  if (!response.ok) {
    throw new RoutingError(`Error del servicio de rutas (HTTP ${response.status})`, {
      code: "http",
    });
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new RoutingError("Respuesta de ruta inválida", { code: "parse" });
  }

  if (!data || data.code !== "Ok" || !Array.isArray(data.routes) || data.routes.length === 0) {
    const msg = data?.message || "No encontramos una ruta entre esos puntos.";
    throw new RoutingError(msg, { code: "no_route" });
  }

  const route = data.routes[0];
  const rawCoords = route?.geometry?.coordinates;
  if (!Array.isArray(rawCoords) || rawCoords.length < 2) {
    throw new RoutingError("La ruta no tiene geometría", { code: "no_geometry" });
  }

  // OSRM devuelve [lng, lat]; el resto del codebase usa [lat, lng].
  const geometry = rawCoords.map(([lng, lat]) => [lat, lng]);
  return {
    geometry,
    distance: typeof route.distance === "number" ? route.distance : null,
    duration: typeof route.duration === "number" ? route.duration : null,
    bbox: computeBbox(geometry),
  };
};

// Reduce la densidad de la polyline colapsando puntos consecutivos a menos
// de `minStepMeters` de distancia. OSRM con overview=full puede devolver
// miles de vértices en rutas largas; nuestra heurística "estación cerca de
// la ruta" no necesita esa precisión y bajamos el coste de comparar miles
// de estaciones contra miles de vértices. ~150m es buen compromiso entre
// fidelidad visual y coste de cálculo (a 50m la diferencia es imperceptible
// salvo en un zoom muy alto).
const EARTH_RADIUS_M = 6371000;
const deg2rad = (d) => d * (Math.PI / 180);

const haversineMeters = (lat1, lng1, lat2, lng2) => {
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export const downsampleGeometry = (geometry, minStepMeters = 150) => {
  if (!Array.isArray(geometry) || geometry.length < 3) return geometry;
  const out = [geometry[0]];
  let last = geometry[0];
  for (let i = 1; i < geometry.length - 1; i++) {
    const p = geometry[i];
    if (haversineMeters(last[0], last[1], p[0], p[1]) >= minStepMeters) {
      out.push(p);
      last = p;
    }
  }
  out.push(geometry[geometry.length - 1]);
  return out;
};

// Formato humano de duración (segundos → "1 h 32 min" / "45 min").
export const formatDuration = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return null;
  const totalMin = Math.round(seconds / 60);
  if (totalMin < 60) return `${totalMin} min`;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
};

// Formato humano de distancia (metros → "453 km" / "12,4 km" / "850 m").
export const formatDistanceMeters = (meters) => {
  if (!Number.isFinite(meters) || meters < 0) return null;
  if (meters < 1000) return `${Math.round(meters)} m`;
  const km = meters / 1000;
  if (km >= 100) return `${Math.round(km)} km`;
  return `${km.toFixed(1).replace(".", ",")} km`;
};

// Encuentra el índice del vértice de `geometry` ([lat,lng][]) más
// cercano a `point` ({lat, lng}). Lo usamos para partir la polyline de
// la ruta CON parada en dos tramos visualmente diferenciados:
// origen→parada (solid) y parada→destino (dashed), al estilo Google
// Maps. Como nuestra geometría está downsampleada a ~150m, la
// diferencia entre el vértice más cercano y el punto exacto del
// waypoint es <75m: imperceptible al zoom típico de la ruta.
export const findClosestIndex = (geometry, point) => {
  if (!Array.isArray(geometry) || geometry.length === 0 || !point) return 0;
  const { lat, lng } = point;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return 0;
  let bestIdx = 0;
  let bestM = Infinity;
  for (let i = 0; i < geometry.length; i++) {
    const [glat, glng] = geometry[i];
    const m = haversineMeters(lat, lng, glat, glng);
    if (m < bestM) {
      bestM = m;
      bestIdx = i;
    }
  }
  return bestIdx;
};
