// Códigos de error reconocibles por el consumer para UX más fina sin tener
// que inspeccionar `error.code` del navegador (que mezcla denied/unavailable).
export const GEO_ERROR_CODES = Object.freeze({
  UNSUPPORTED: "GEO_UNSUPPORTED",
  PERMISSION_DENIED: "GEO_PERMISSION_DENIED",
  POSITION_UNAVAILABLE: "GEO_POSITION_UNAVAILABLE",
  TIMEOUT: "GEO_TIMEOUT",
  UNKNOWN: "GEO_UNKNOWN",
});

const DEFAULT_GEO_OPTIONS = Object.freeze({
  // Para una app de gasolineras (radios de km) la alta precisión no aporta y
  // tarda más + gasta batería. El consumer puede sobrescribir.
  enableHighAccuracy: false,
  // 8 s es suficiente en móviles modernos; 10 s se sentía perezoso.
  timeout: 8000,
  // Si hay un fix reciente (<1 min) lo reutilizamos: arranque casi instantáneo.
  maximumAge: 60000,
});

export const isGeolocationSupported = () => {
  return (
    typeof navigator !== "undefined" &&
    typeof navigator.geolocation !== "undefined" &&
    navigator.geolocation !== null
  );
};

// Devuelve "granted" | "denied" | "prompt" | "unknown".
// Permite anticipar un PermissionDeniedError y evitar el prompt nativo cuando
// ya sabemos que va a fallar (mejor UX: mostrar un mensaje en vez de esperar
// al timeout).
export const getGeolocationPermission = async () => {
  try {
    if (
      typeof navigator === "undefined" ||
      !navigator.permissions ||
      typeof navigator.permissions.query !== "function"
    ) {
      return "unknown";
    }
    const status = await navigator.permissions.query({ name: "geolocation" });
    if (status && typeof status.state === "string") {
      return status.state; // "granted" | "denied" | "prompt"
    }
    return "unknown";
  } catch {
    // Algunos navegadores (Safari antiguo, ciertos WebViews) lanzan al pedir
    // "geolocation". Tratamos como desconocido y dejamos que el flujo siga.
    return "unknown";
  }
};

const mapPositionError = (error) => {
  // Constantes definidas en GeolocationPositionError; no asumimos que existan
  // en todos los navegadores y comparamos también por `code` numérico.
  const code = error && typeof error.code === "number" ? error.code : null;
  let mapped = GEO_ERROR_CODES.UNKNOWN;
  let message = "No se pudo obtener la ubicación.";
  if (code === 1) {
    mapped = GEO_ERROR_CODES.PERMISSION_DENIED;
    message =
      "Permiso de ubicación denegado. Actívalo en los ajustes del navegador para usar 'Cerca de mí'.";
  } else if (code === 2) {
    mapped = GEO_ERROR_CODES.POSITION_UNAVAILABLE;
    message =
      "No se pudo determinar la ubicación. Comprueba que el GPS o la red estén disponibles.";
  } else if (code === 3) {
    mapped = GEO_ERROR_CODES.TIMEOUT;
    message =
      "La ubicación tardó demasiado en responder. Inténtalo de nuevo.";
  }
  const wrapped = new Error(message);
  wrapped.code = mapped;
  wrapped.originalCode = code;
  wrapped.cause = error;
  return wrapped;
};

export const getUserLocation = (options = {}) => {
  return new Promise((resolve, reject) => {
    if (!isGeolocationSupported()) {
      const err = new Error(
        "La geolocalización no está soportada por este navegador."
      );
      err.code = GEO_ERROR_CODES.UNSUPPORTED;
      reject(err);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        reject(mapPositionError(error));
      },
      { ...DEFAULT_GEO_OPTIONS, ...options }
    );
  });
};

// Haversine. Radio medio de la Tierra (IUGG): 6371.0088 km. Usamos 6371 (la
// diferencia es <0.001 % y es el valor estándar). Para distancias muy cortas
// (<1 m) Haversine puede perder precisión por cancelación catastrófica al
// restar latitudes/longitudes muy parecidas, pero en una app de gasolineras
// la mínima distancia útil es ~10 m, donde Haversine da error <0.5 % frente a
// Vincenty: no compensa la complejidad extra.
const EARTH_RADIUS_KM = 6371;

const deg2rad = (deg) => deg * (Math.PI / 180);

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const nLat1 = Number(lat1);
  const nLon1 = Number(lon1);
  const nLat2 = Number(lat2);
  const nLon2 = Number(lon2);
  if (
    !Number.isFinite(nLat1) ||
    !Number.isFinite(nLon1) ||
    !Number.isFinite(nLat2) ||
    !Number.isFinite(nLon2)
  ) {
    // Devolvemos Infinity para que el consumer pueda ordenar coordenadas
    // inválidas al final con un simple sort por distancia ascendente.
    return Infinity;
  }
  // Validación de rango: lat ∈ [-90, 90], lon ∈ [-180, 180].
  if (
    nLat1 < -90 ||
    nLat1 > 90 ||
    nLat2 < -90 ||
    nLat2 > 90 ||
    nLon1 < -180 ||
    nLon1 > 180 ||
    nLon2 < -180 ||
    nLon2 > 180
  ) {
    return Infinity;
  }
  // Atajo: mismas coordenadas → 0 sin pasar por trig (evita ruido numérico).
  if (nLat1 === nLat2 && nLon1 === nLon2) {
    return 0;
  }
  const dLat = deg2rad(nLat2 - nLat1);
  const dLon = deg2rad(nLon2 - nLon1);
  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);
  const a =
    sinDLat * sinDLat +
    Math.cos(deg2rad(nLat1)) *
      Math.cos(deg2rad(nLat2)) *
      sinDLon *
      sinDLon;
  // Clampeamos a [0, 1] para protegernos de ε numérico que haría sqrt(negativo).
  const aClamped = a < 0 ? 0 : a > 1 ? 1 : a;
  const c = 2 * Math.atan2(Math.sqrt(aClamped), Math.sqrt(1 - aClamped));
  return EARTH_RADIUS_KM * c;
};
