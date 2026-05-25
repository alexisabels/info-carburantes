// Para cada estación, calcula la distancia mínima al trazado y la
// posición (km recorridos) en la que estaría parando ahí. Devuelve solo
// las que están dentro del desvío máximo permitido.
//
// Algoritmo en dos pasos:
//   1. BBox del trazado + buffer (≈maxDetour). Descarta a millones por
//      segundo (~12k estaciones nacionales → suelen quedar 50-2000).
//   2. Para las supervivientes, distancia al vértice más cercano del
//      polyline downsampled. Con la geometría a paso ~150m, la diferencia
//      entre "distancia al vértice más cercano" y "distancia al segmento
//      más cercano" es como mucho ~75m: irrelevante para nuestro umbral
//      de 0.5-5 km. Evitamos la complejidad y el coste de point-to-segment.
//
// Acumulamos en paralelo la distancia recorrida hasta cada vértice
// (`cumulative[i]` = metros desde el origen hasta el vértice i). Eso da
// gratis la "posición en la ruta" sin recalcular nada.

import { calculateDistance } from "./locationUtils";

const KM_PER_DEG_LAT = 111.32;
const buildBboxBuffer = (centerLat, bufferKm) => {
  const cosLat = Math.cos((centerLat * Math.PI) / 180);
  const safeCos = Math.max(cosLat, 0.1);
  return {
    lat: bufferKm / KM_PER_DEG_LAT,
    lng: bufferKm / (KM_PER_DEG_LAT * safeCos),
  };
};

const cumulativeMeters = (geometry) => {
  const cum = new Float64Array(geometry.length);
  cum[0] = 0;
  for (let i = 1; i < geometry.length; i++) {
    const prev = geometry[i - 1];
    const cur = geometry[i];
    cum[i] =
      cum[i - 1] + calculateDistance(prev[0], prev[1], cur[0], cur[1]) * 1000;
  }
  return cum;
};

// Devuelve { stations: [{...station, detour, alongMeters, alongIndex}], totalMeters }
// `stations` viene filtrado por desvío y enriquecido con métricas de ruta.
export const stationsAlongRoute = ({
  allStations,
  geometry,
  maxDetourKm = 2,
}) => {
  if (
    !Array.isArray(allStations) ||
    !Array.isArray(geometry) ||
    geometry.length < 2
  ) {
    return { stations: [], totalMeters: 0 };
  }

  // BBox del trazado + buffer para corte rápido. Usamos la latitud media
  // para calcular el factor coseno del buffer en longitud (a 40º vs 0º hay
  // un 24% de diferencia en la conversión deg→km).
  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;
  for (const [lat, lng] of geometry) {
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
  }
  const midLat = (minLat + maxLat) / 2;
  const buffer = buildBboxBuffer(midLat, maxDetourKm + 0.5);
  const bboxMinLat = minLat - buffer.lat;
  const bboxMaxLat = maxLat + buffer.lat;
  const bboxMinLng = minLng - buffer.lng;
  const bboxMaxLng = maxLng + buffer.lng;

  const cum = cumulativeMeters(geometry);
  const totalMeters = cum[cum.length - 1];

  const out = [];
  for (const station of allStations) {
    const lat = parseFloat(String(station.Latitud).replace(",", "."));
    const lng = parseFloat(String(station["Longitud (WGS84)"]).replace(",", "."));
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;
    if (lat < bboxMinLat || lat > bboxMaxLat) continue;
    if (lng < bboxMinLng || lng > bboxMaxLng) continue;

    let bestKm = Infinity;
    let bestIdx = 0;
    for (let i = 0; i < geometry.length; i++) {
      const [glat, glng] = geometry[i];
      // Recorte barato por delta de latitud antes de Haversine — la
      // estación lleva descartado el bbox global pero dentro del bbox la
      // mayoría de vértices están aún lejos. Ahorra un 70-90% de
      // trigonometría en rutas largas.
      if (Math.abs(glat - lat) > buffer.lat) continue;
      if (Math.abs(glng - lng) > buffer.lng) continue;
      const km = calculateDistance(lat, lng, glat, glng);
      if (km < bestKm) {
        bestKm = km;
        bestIdx = i;
        if (bestKm < 0.05) break; // ya estamos prácticamente encima
      }
    }
    if (bestKm <= maxDetourKm) {
      out.push({
        ...station,
        detour: bestKm,
        alongMeters: cum[bestIdx],
        alongIndex: bestIdx,
      });
    }
  }

  return { stations: out, totalMeters };
};
