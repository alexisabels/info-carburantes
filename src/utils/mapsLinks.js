// Construye deep links a apps de mapas externas (Google / Apple / Waze).
// Se usa tanto en /cerca y /municipio (botón "Cómo llegar" desde un marker)
// como en /ruta (botón "Cómo llegar parando aquí" con waypoint intermedio).
//
// La preferencia del usuario se guarda en localStorage en
// `maps.preferred` con valores "google" | "apple" | "waze". Si no hay
// preferencia o el navegador no permite leerla, default Google porque es
// el único proveedor que soporta waypoints intermedios vía URL pública.

const MAPS_PREF_KEY = "maps.preferred";
export const MAPS_OPTIONS = ["google", "apple", "waze"];

export const readPreferredMaps = () => {
  try {
    if (typeof localStorage === "undefined") return null;
    const v = localStorage.getItem(MAPS_PREF_KEY);
    return MAPS_OPTIONS.includes(v) ? v : null;
  } catch {
    return null;
  }
};

const encodeLatLng = (lat, lng) => `${lat},${lng}`;

// "Cómo llegar al destino" — sin origen. Útil cuando solo queremos abrir
// la app de mapas apuntando a la gasolinera (vistas /cerca, /municipio,
// detalle de gasolinera).
export const buildDirectionsHref = (lat, lng, provider = null) => {
  const p = provider || readPreferredMaps() || "google";
  const dest = encodeURIComponent(encodeLatLng(lat, lng));
  if (p === "apple") {
    return `https://maps.apple.com/?daddr=${dest}&dirflg=d`;
  }
  if (p === "waze") {
    return `https://www.waze.com/ul?ll=${dest}&navigate=yes`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${dest}`;
};

// "Cómo llegar parando aquí" — con origen, destino final y waypoint
// intermedio (la gasolinera). Solo Google Maps soporta waypoints
// intermedios vía URL pública; para Apple y Waze caemos a "ir a la
// gasolinera" porque su URL scheme no admite varias paradas y, dentro
// del contexto "planifico una ruta y paro a repostar", lo mejor es
// llevar al usuario primero a la estación.
export const buildRouteWithStopHref = ({
  origin,
  destination,
  waypoint,
  provider = null,
}) => {
  const p = provider || readPreferredMaps() || "google";
  if (!waypoint || !Number.isFinite(waypoint.lat) || !Number.isFinite(waypoint.lng)) {
    return null;
  }

  if (p === "google" && origin && destination) {
    const o = encodeURIComponent(encodeLatLng(origin.lat, origin.lng));
    const d = encodeURIComponent(encodeLatLng(destination.lat, destination.lng));
    const w = encodeURIComponent(encodeLatLng(waypoint.lat, waypoint.lng));
    return `https://www.google.com/maps/dir/?api=1&origin=${o}&destination=${d}&waypoints=${w}&travelmode=driving`;
  }

  // Apple / Waze (o Google sin origen/destino conocidos): solo a la
  // gasolinera.
  return buildDirectionsHref(waypoint.lat, waypoint.lng, p);
};
