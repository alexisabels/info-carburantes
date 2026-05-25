"use client";

/* eslint-disable react/prop-types */
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import LocationSearch from "../LocationSearch/LocationSearch";
import FuelTypeSelector from "../Selectors/FuelTypeSelector";
import { fetchTodasLasEstaciones } from "../../utils/api";
import {
  downsampleGeometry,
  fetchRoute,
  formatDistanceMeters,
  formatDuration,
  RoutingError,
} from "../../utils/routing";
import { stationsAlongRoute } from "../../utils/routeStations";
import { isOpenNow } from "../../utils/formatHorario";
import { stationBrand, getBrand, KNOWN_BRANDS } from "../../lib/brands";
import { getLogoForGasolinera } from "../../utils/logoUtils";
import { buildRouteWithStopHref } from "../../utils/mapsLinks";
import {
  getGeolocationPermission,
  getUserLocationRobust,
  GEO_ERROR_CODES,
} from "../../utils/locationUtils";
import { noPriceLabel } from "../../utils/fuelLabels";
import "./RoutePlanner.css";

const RouteMap = dynamic(() => import("./RouteMap"), {
  ssr: false,
  loading: () => (
    <div className="loading" role="status" aria-live="polite">
      <div className="loading__bar" aria-hidden="true" />
      <span>Cargando mapa…</span>
    </div>
  ),
});

const FUEL_STORAGE_KEY = "fuel.preferred";
const VALID_FUELS = new Set([
  "Precio Gasolina 95 E5",
  "Precio Gasolina 98 E5",
  "Precio Gasoleo A",
  "Precio Gasoleo Premium",
]);
const DEFAULT_FUEL = "Precio Gasolina 95 E5";

const DETOUR_OPTIONS = [
  { km: 0.5, label: "0,5 km" },
  { km: 1, label: "1 km" },
  { km: 2, label: "2 km" },
  { km: 5, label: "5 km" },
];

const SORT_OPTIONS = [
  {
    id: "price",
    label: "Precio",
    title: "De más barata a más cara",
  },
  {
    id: "detour",
    label: "Desvío",
    title: "Las que requieren menos kilómetros fuera de la ruta",
  },
  {
    id: "along",
    label: "Orden de paso",
    title:
      "Por orden de aparición en el trayecto: primero las que pillas cerca del origen, después las del destino",
  },
];

const REFERENCE_LITERS = 50;

const readStoredFuel = () => {
  try {
    if (typeof localStorage === "undefined") return null;
    const v = localStorage.getItem(FUEL_STORAGE_KEY);
    return v && VALID_FUELS.has(v) ? v : null;
  } catch {
    return null;
  }
};

const writeStoredFuel = (v) => {
  try {
    if (typeof localStorage === "undefined") return;
    if (v && VALID_FUELS.has(v)) {
      localStorage.setItem(FUEL_STORAGE_KEY, v);
    }
  } catch {
    /* noop */
  }
};

const parsePoint = (raw) => {
  if (!raw || typeof raw !== "string") return null;
  const firstComma = raw.indexOf(",");
  if (firstComma < 0) return null;
  const secondComma = raw.indexOf(",", firstComma + 1);
  const latStr = raw.slice(0, firstComma);
  const lngStr =
    secondComma > 0
      ? raw.slice(firstComma + 1, secondComma)
      : raw.slice(firstComma + 1);
  const labelRaw = secondComma > 0 ? raw.slice(secondComma + 1) : "";
  const lat = parseFloat(latStr);
  const lng = parseFloat(lngStr);
  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lng) ||
    lat < -90 ||
    lat > 90 ||
    lng < -180 ||
    lng > 180
  ) {
    return null;
  }
  let label = null;
  try {
    label = labelRaw ? decodeURIComponent(labelRaw) : null;
  } catch {
    label = labelRaw || null;
  }
  return { lat, lng, label };
};

const stringifyPoint = (p) => {
  if (!p || !Number.isFinite(p.lat) || !Number.isFinite(p.lng)) return null;
  const base = `${p.lat.toFixed(5)},${p.lng.toFixed(5)}`;
  if (!p.label) return base;
  return `${base},${encodeURIComponent(p.label)}`;
};

const parsePrice = (raw) => {
  if (!raw || raw === "-") return null;
  const n = parseFloat(String(raw).replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : null;
};

const stationLatLng = (s) => {
  const lat = parseFloat(String(s.Latitud).replace(",", "."));
  const lng = parseFloat(String(s["Longitud (WGS84)"]).replace(",", "."));
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { lat, lng };
};

const SwapIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
    <path
      d="M7 7h11M7 7l3-3M7 7l3 3M17 17H6m11 0-3-3m3 3-3 3"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path
      d="M15 6 9 12l6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <path
      d="m5 12 4 4 10-10"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
    <path
      d="M4 20h4l10-10-4-4L4 16v4Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const RoutePlanner = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialURL = useRef({
    from: searchParams.get("from"),
    to: searchParams.get("to"),
    fuel: searchParams.get("fuel"),
    maxKm: searchParams.get("maxKm"),
    brands: searchParams.get("brands"),
    open: searchParams.get("open"),
    sort: searchParams.get("sort"),
  }).current;

  const [origin, setOrigin] = useState(() => parsePoint(initialURL.from));
  const [destination, setDestination] = useState(() => parsePoint(initialURL.to));
  // geoBusy[side]: null | "fetching" | "asking" — null = inactivo;
  // "fetching" = GPS pidiendo coords con permiso ya dado; "asking" =
  // pidiendo el permiso (browser está mostrando o va a mostrar prompt).
  const [geoBusy, setGeoBusy] = useState({ origin: null, destination: null });
  const [geoError, setGeoError] = useState({
    origin: null,
    destination: null,
  });
  // Cuando el usuario calcula una ruta, colapsamos el form a una "barra
  // de viaje" más compacta que muestra "A → B" con un botón Editar. Así
  // damos más sitio vertical a los resultados sin perder la posibilidad
  // de cambiar los puntos. `formCollapsed` lo controla.
  const [formCollapsed, setFormCollapsed] = useState(false);

  const [selectedFuel, setSelectedFuel] = useState(() => {
    const fromUrl = initialURL.fuel;
    if (fromUrl && VALID_FUELS.has(fromUrl)) return fromUrl;
    return readStoredFuel() || DEFAULT_FUEL;
  });
  const [maxDetourKm, setMaxDetourKm] = useState(() => {
    const n = parseFloat(initialURL.maxKm);
    if (Number.isFinite(n) && DETOUR_OPTIONS.some((o) => o.km === n)) return n;
    return 2;
  });
  const [selectedBrands, setSelectedBrands] = useState(() => {
    if (!initialURL.brands) return new Set();
    const ids = initialURL.brands
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    return new Set(ids);
  });
  const [onlyOpen, setOnlyOpen] = useState(initialURL.open === "1");
  const [sortBy, setSortBy] = useState(() => {
    return SORT_OPTIONS.some((o) => o.id === initialURL.sort)
      ? initialURL.sort
      : "price";
  });

  const [route, setRoute] = useState(null);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [routeError, setRouteError] = useState(null);

  // Parada elegida (waypoint intermedio). Cuando hay una parada, llamamos
  // de nuevo a OSRM con 3 puntos para obtener el polyline real que pasa
  // por la gasolinera. El "Abrir en Google Maps" usa también esos 3.
  const [selectedWaypointId, setSelectedWaypointId] = useState(null);
  const [routeWithStop, setRouteWithStop] = useState(null);
  const [loadingWithStop, setLoadingWithStop] = useState(false);
  const [withStopError, setWithStopError] = useState(false);

  const [allStations, setAllStations] = useState(null);
  const [loadingStations, setLoadingStations] = useState(false);
  const [stationsError, setStationsError] = useState(null);

  const [viewMode, setViewMode] = useState("list");
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(min-width: 900px)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(min-width: 900px)");
    const onChange = (e) => setIsDesktop(e.matches);
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);
    setIsDesktop(mql.matches);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, []);

  useEffect(() => writeStoredFuel(selectedFuel), [selectedFuel]);

  // URL sync. Replace (no push) para no contaminar historial cada vez
  // que se toca un filtro — el "atrás" debería volver fuera de /ruta.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    const fromS = stringifyPoint(origin);
    const toS = stringifyPoint(destination);
    if (fromS) params.set("from", fromS);
    if (toS) params.set("to", toS);
    if (selectedFuel !== DEFAULT_FUEL) params.set("fuel", selectedFuel);
    if (maxDetourKm !== 2) params.set("maxKm", String(maxDetourKm));
    if (selectedBrands.size > 0) {
      params.set("brands", Array.from(selectedBrands).join(","));
    }
    if (onlyOpen) params.set("open", "1");
    if (sortBy !== "price") params.set("sort", sortBy);
    const qs = params.toString();
    const next = qs ? `/ruta?${qs}` : "/ruta";
    if (window.location.pathname + window.location.search !== next) {
      router.replace(next, { scroll: false });
    }
  }, [
    router,
    origin,
    destination,
    selectedFuel,
    maxDetourKm,
    selectedBrands,
    onlyOpen,
    sortBy,
  ]);

  // Fetch de la ruta base cuando ambos extremos están definidos.
  useEffect(() => {
    if (!origin || !destination) {
      setRoute(null);
      setRouteError(null);
      setFormCollapsed(false);
      return undefined;
    }
    let cancelled = false;
    const controller = new AbortController();
    setLoadingRoute(true);
    setRouteError(null);
    fetchRoute([origin, destination], { signal: controller.signal })
      .then((r) => {
        if (cancelled) return;
        setRoute({
          ...r,
          geometry: downsampleGeometry(r.geometry, 150),
        });
        setFormCollapsed(true);
      })
      .catch((err) => {
        if (cancelled) return;
        const code = err instanceof RoutingError ? err.code : "generic";
        setRoute(null);
        setRouteError(code);
      })
      .finally(() => {
        if (!cancelled) setLoadingRoute(false);
      });
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [origin, destination]);

  // Carga el listado nacional. Reutilizamos el caché de fetchTodasLasEstaciones
  // (memoria + localStorage TTL 1h) — si el usuario viene de /cerca, lo
  // tenemos ya cargado y la primera ruta del día va instantánea.
  useEffect(() => {
    if (!route) return undefined;
    if (allStations) return undefined;
    let cancelled = false;
    setLoadingStations(true);
    setStationsError(null);
    fetchTodasLasEstaciones()
      .then((data) => {
        if (cancelled) return;
        const lista = Array.isArray(data?.ListaEESSPrecio)
          ? data.ListaEESSPrecio
          : [];
        setAllStations(lista);
      })
      .catch(() => {
        if (cancelled) return;
        setStationsError(true);
      })
      .finally(() => {
        if (!cancelled) setLoadingStations(false);
      });
    return () => {
      cancelled = true;
    };
  }, [route, allStations]);

  // Estaciones a lo largo de la ruta base, con métricas. Memo pesado
  // (12k×1k = millones de comparaciones, <200ms) que solo se recalcula
  // cuando cambia ruta o desvío máximo. NO depende del waypoint: la
  // lista visible no cambia al añadir parada — solo el polyline.
  const alongRoute = useMemo(() => {
    if (!route || !Array.isArray(allStations)) {
      return { stations: [], totalMeters: 0 };
    }
    return stationsAlongRoute({
      allStations,
      geometry: route.geometry,
      maxDetourKm,
    });
  }, [route, allStations, maxDetourKm]);

  // Si origen/destino cambian, el waypoint elegido deja de tener sentido.
  // Lo limpiamos para evitar referencias huérfanas y polylines con
  // paradas que ya no existen.
  useEffect(() => {
    setSelectedWaypointId(null);
    setRouteWithStop(null);
    setWithStopError(false);
  }, [origin?.lat, origin?.lng, destination?.lat, destination?.lng]);

  // Si el waypoint queda fuera del filtro (cambió el desvío máximo, marca,
  // abierto…), también lo limpiamos para no quedarnos con un "parada
  // invisible".
  useEffect(() => {
    if (!selectedWaypointId) return;
    const stillThere = alongRoute.stations.some(
      (s) => s.IDEESS === selectedWaypointId
    );
    if (!stillThere) {
      setSelectedWaypointId(null);
      setRouteWithStop(null);
      setWithStopError(false);
    }
  }, [selectedWaypointId, alongRoute.stations]);

  // Fetch de la ruta CON parada cuando el usuario elige una. Si OSRM
  // falla, mostramos un aviso suave y nos quedamos con la polyline base
  // — el botón "Abrir en Google Maps" sigue funcionando porque GMaps
  // resuelve el waypoint por su cuenta.
  useEffect(() => {
    if (!selectedWaypointId || !origin || !destination) {
      setRouteWithStop(null);
      setWithStopError(false);
      return undefined;
    }
    const station = alongRoute.stations.find(
      (s) => s.IDEESS === selectedWaypointId
    );
    const coords = station ? stationLatLng(station) : null;
    if (!coords) {
      setRouteWithStop(null);
      return undefined;
    }
    let cancelled = false;
    const controller = new AbortController();
    setLoadingWithStop(true);
    setWithStopError(false);
    fetchRoute([origin, coords, destination], { signal: controller.signal })
      .then((r) => {
        if (cancelled) return;
        setRouteWithStop({
          ...r,
          geometry: downsampleGeometry(r.geometry, 150),
        });
      })
      .catch(() => {
        if (cancelled) return;
        setRouteWithStop(null);
        setWithStopError(true);
      })
      .finally(() => {
        if (!cancelled) setLoadingWithStop(false);
      });
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [selectedWaypointId, origin, destination, alongRoute.stations]);

  const selectedWaypointStation = useMemo(
    () =>
      selectedWaypointId
        ? alongRoute.stations.find((s) => s.IDEESS === selectedWaypointId) ||
          null
        : null,
    [selectedWaypointId, alongRoute.stations]
  );

  const selectedWaypointCoords = useMemo(
    () => (selectedWaypointStation ? stationLatLng(selectedWaypointStation) : null),
    [selectedWaypointStation]
  );

  // Marcas disponibles (chips). Solo las que aparecen al menos una vez,
  // ordenadas según KNOWN_BRANDS para mantener un display estable.
  const availableBrands = useMemo(() => {
    const counts = new Map();
    for (const s of alongRoute.stations) {
      const id = stationBrand(s);
      if (!id) continue;
      counts.set(id, (counts.get(id) || 0) + 1);
    }
    return KNOWN_BRANDS.filter((b) => counts.has(b.id)).map((b) => ({
      ...b,
      count: counts.get(b.id),
    }));
  }, [alongRoute.stations]);

  // Si el usuario eligió marcas que después dejaron de existir, poda el
  // estado para mantener la URL coherente.
  useEffect(() => {
    if (selectedBrands.size === 0) return;
    const validIds = new Set(availableBrands.map((b) => b.id));
    let mutated = false;
    const next = new Set();
    for (const id of selectedBrands) {
      if (validIds.has(id)) next.add(id);
      else mutated = true;
    }
    if (mutated) setSelectedBrands(next);
  }, [availableBrands, selectedBrands]);

  // Lista filtrada y ordenada para mostrar.
  const visibleStations = useMemo(() => {
    let arr = alongRoute.stations;
    if (selectedBrands.size > 0) {
      arr = arr.filter((s) => {
        const id = stationBrand(s);
        return id && selectedBrands.has(id);
      });
    }
    if (onlyOpen) {
      arr = arr.filter((s) => isOpenNow(s.Horario) !== false);
    }
    const withPriceFirst = (a, b) => {
      const pa = parsePrice(a[selectedFuel]);
      const pb = parsePrice(b[selectedFuel]);
      if (pa === null && pb === null) return 0;
      if (pa === null) return 1;
      if (pb === null) return -1;
      return pa - pb;
    };
    if (sortBy === "price") {
      arr = [...arr].sort(withPriceFirst);
    } else if (sortBy === "detour") {
      arr = [...arr].sort((a, b) => a.detour - b.detour);
    } else if (sortBy === "along") {
      arr = [...arr].sort((a, b) => a.alongMeters - b.alongMeters);
    }
    return arr;
  }, [alongRoute.stations, selectedBrands, onlyOpen, selectedFuel, sortBy]);

  // Stats de precio para el banner sobre la lista FILTRADA.
  const priceStats = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    let count = 0;
    for (const s of visibleStations) {
      const p = parsePrice(s[selectedFuel]);
      if (p === null) continue;
      count += 1;
      if (p < min) min = p;
      if (p > max) max = p;
    }
    if (count === 0) {
      return { min: null, max: null, count: 0, savingsEur: null };
    }
    const savingsEur = (max - min) * REFERENCE_LITERS;
    return { min, max, count, savingsEur };
  }, [visibleStations, selectedFuel]);

  // Delta de la ruta con parada vs base — el "coste real" de hacer ese
  // desvío en km y minutos.
  const stopDelta = useMemo(() => {
    if (!route || !routeWithStop) return null;
    const dKm = (routeWithStop.distance - route.distance) / 1000;
    const dMin = (routeWithStop.duration - route.duration) / 60;
    return { dKm, dMin };
  }, [route, routeWithStop]);

  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleResetForm = () => {
    setOrigin(null);
    setDestination(null);
    setRoute(null);
    setRouteError(null);
    setSelectedWaypointId(null);
    setRouteWithStop(null);
    setFormCollapsed(false);
  };

  const handleEditForm = () => {
    setFormCollapsed(false);
  };

  const toggleBrand = (id) => {
    setSelectedBrands((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Geolocalización con feedback diferenciado: comprobamos primero el
  // estado del permiso para decir al usuario lo que realmente está
  // pasando — "Pidiendo permiso…" solo cuando el navegador va a
  // mostrar el prompt; si ya nos lo concedió, "Buscando tu ubicación…"
  // (no aparece ningún diálogo). Sin esto, el copy "Pidiendo permiso"
  // sale aunque el permiso lleve días dado y parecería que se ha
  // colgado.
  const triggerGeolocationFor = async (which) => {
    setGeoError((s) => ({ ...s, [which]: null }));
    // Optimistic: empieza como "fetching" — si más abajo descubrimos
    // que el permiso aún no está dado, lo subimos a "asking". Con
    // permiso ya concedido (caso común), no hay flash.
    setGeoBusy((s) => ({ ...s, [which]: "fetching" }));

    const permission = await getGeolocationPermission();
    if (permission === "denied") {
      setGeoError((s) => ({
        ...s,
        [which]:
          "Permiso denegado. Actívalo en los ajustes del navegador (icono del candado en la barra de direcciones).",
      }));
      setGeoBusy((s) => ({ ...s, [which]: null }));
      return;
    }
    if (permission === "prompt" || permission === "unknown") {
      setGeoBusy((s) => ({ ...s, [which]: "asking" }));
    }

    try {
      const pos = await getUserLocationRobust();
      const point = { lat: pos.lat, lng: pos.lng, label: "Mi ubicación" };
      if (which === "origin") setOrigin(point);
      else setDestination(point);
    } catch (err) {
      const msg =
        err && err.code === GEO_ERROR_CODES.PERMISSION_DENIED
          ? "Permiso denegado. Actívalo en los ajustes del navegador."
          : err && err.code === GEO_ERROR_CODES.TIMEOUT
            ? "El GPS tardó demasiado en responder. Inténtalo de nuevo."
            : "No hemos podido obtener tu ubicación. Inténtalo de nuevo.";
      setGeoError((s) => ({ ...s, [which]: msg }));
    } finally {
      setGeoBusy((s) => ({ ...s, [which]: null }));
    }
  };

  const hasRoute = !!route && !loadingRoute && !routeError;
  const showFormFull = !hasRoute || !formCollapsed;

  const routeErrorMessage = useMemo(() => {
    if (!routeError) return null;
    if (routeError === "no_route")
      return "No encontramos una ruta en coche entre esos puntos. ¿Están en carretera?";
    if (routeError === "timeout")
      return "El servicio de rutas tardó demasiado. Inténtalo de nuevo.";
    if (routeError === "network")
      return "Sin conexión con el servicio de rutas. Comprueba tu red.";
    if (routeError === "bad_origin") return "El origen no es válido.";
    if (routeError === "bad_destination") return "El destino no es válido.";
    return "No hemos podido calcular la ruta. Inténtalo de nuevo.";
  }, [routeError]);

  // Polyline efectiva: con parada si está cargada, base si no (o si la
  // parada falló al calcularse).
  const effectiveGeometry = routeWithStop?.geometry || route?.geometry || null;

  return (
    <main id="main">
      <div className="toolbar">
        <div className="toolbar__row">
          <Link
            href="/"
            className="toolbar__back"
            aria-label="Volver al inicio"
          >
            <BackIcon />
          </Link>
          <div className="toolbar__title">
            Planificar ruta
            {hasRoute && route && (
              <small>
                {formatDistanceMeters(route.distance)} ·{" "}
                {formatDuration(route.duration)}
              </small>
            )}
          </div>
        </div>
      </div>

      {/* Form de origen/destino. Cuando hay ruta calculada lo colapsamos
          a una barra A→B con un botón Editar para no robar altura útil. */}
      {showFormFull ? (
        <section className="ruteform" aria-label="Origen y destino">
          <div className="ruteform__inputs">
            <FormField
              variant="origin"
              point={origin}
              setPoint={setOrigin}
              placeholder="Desde… dirección, ciudad o CP"
              onUseMyLocation={() => triggerGeolocationFor("origin")}
              busy={geoBusy.origin}
              error={geoError.origin}
            />
            <button
              type="button"
              className="ruteform__swap"
              onClick={handleSwap}
              disabled={!origin && !destination}
              aria-label="Intercambiar origen y destino"
              title="Intercambiar origen y destino"
            >
              <SwapIcon />
            </button>
            <FormField
              variant="dest"
              point={destination}
              setPoint={setDestination}
              placeholder="Hasta… dirección, ciudad o CP"
              onUseMyLocation={() => triggerGeolocationFor("destination")}
              busy={geoBusy.destination}
              error={geoError.destination}
            />
          </div>
          {(!origin || !destination) && !loadingRoute && !routeError && (
            <p className="ruteform__hint">
              Indica un <strong>origen</strong> y un <strong>destino</strong>{" "}
              (dirección, ciudad o GPS) y calcularemos qué gasolineras tienes
              cerca del trayecto, ordenadas por precio.
            </p>
          )}
        </section>
      ) : (
        <CollapsedRoute
          origin={origin}
          destination={destination}
          onEdit={handleEditForm}
        />
      )}

      {loadingRoute && (
        <div className="loading" role="status" aria-live="polite">
          <div className="loading__bar" aria-hidden="true" />
          <span>Calculando ruta…</span>
        </div>
      )}

      {routeError && !loadingRoute && (
        <div className="errorbox" role="alert">
          <p className="errorbox__title">No hemos podido calcular la ruta</p>
          <p className="errorbox__hint">{routeErrorMessage}</p>
          <div className="errorbox__actions">
            <button
              type="button"
              onClick={() => {
                if (origin) setOrigin({ ...origin });
              }}
            >
              Reintentar
            </button>
            <button
              type="button"
              className="errorbox__alt"
              onClick={handleResetForm}
            >
              Cambiar puntos
            </button>
          </div>
        </div>
      )}

      {hasRoute && (
        <>
          <section className="rutestats" aria-label="Resumen de la ruta">
            <div className="rutestats__item">
              <span className="rutestats__num">
                {formatDistanceMeters(route.distance)}
              </span>
              <span className="rutestats__lbl">distancia</span>
            </div>
            <div className="rutestats__item">
              <span className="rutestats__num">
                {formatDuration(route.duration)}
              </span>
              <span className="rutestats__lbl">en coche</span>
            </div>
            {/* Mientras cargan las estaciones, evitamos mostrar "0
                gasolineras" — sería un dato falso (todavía no sabemos
                cuántas hay). Mostramos un skeleton con el mismo layout
                para no saltar el banner cuando llegue el dato. */}
            {!allStations || loadingStations ? (
              <div className="rutestats__item rutestats__item--loading">
                <span
                  className="rutestats__num rutestats__num--skeleton"
                  aria-hidden="true"
                />
                <span className="rutestats__lbl">buscando gasolineras…</span>
              </div>
            ) : (
              <>
                <div className="rutestats__item">
                  <span className="rutestats__num">{priceStats.count}</span>
                  <span className="rutestats__lbl">
                    {priceStats.count === 1 ? "gasolinera" : "gasolineras"} con
                    precio
                  </span>
                </div>
                {priceStats.savingsEur !== null && priceStats.savingsEur > 0.5 && (
                  <div className="rutestats__item rutestats__item--savings">
                    <span className="rutestats__num">
                      {priceStats.savingsEur.toFixed(2).replace(".", ",")} €
                    </span>
                    <span className="rutestats__lbl">
                      ahorro máx. por {REFERENCE_LITERS} L
                    </span>
                  </div>
                )}
              </>
            )}
          </section>

          {selectedWaypointStation && (
            <WaypointBanner
              station={selectedWaypointStation}
              origin={origin}
              destination={destination}
              delta={stopDelta}
              loading={loadingWithStop}
              warning={withStopError}
              onClear={() => setSelectedWaypointId(null)}
            />
          )}

          <section className="rutefilters" aria-label="Filtros">
            <div className="rutefilters__group">
              <span className="rutefilters__label" id="rf-fuel-lbl">
                Combustible
              </span>
              <FuelTypeSelector
                selectedFuel={selectedFuel}
                onSelectFuel={setSelectedFuel}
                aria-labelledby="rf-fuel-lbl"
              />
            </div>

            <div className="rutefilters__group">
              <span className="rutefilters__label" id="rf-detour-lbl">
                Desvío máx.
              </span>
              <div
                className="segmented rutefilters__seg"
                role="radiogroup"
                aria-labelledby="rf-detour-lbl"
              >
                {DETOUR_OPTIONS.map((opt) => (
                  <button
                    key={opt.km}
                    type="button"
                    role="radio"
                    aria-checked={maxDetourKm === opt.km}
                    aria-pressed={maxDetourKm === opt.km}
                    onClick={() => setMaxDetourKm(opt.km)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rutefilters__group">
              <span className="rutefilters__label" id="rf-sort-lbl">
                Ordenar
              </span>
              <div
                className="segmented rutefilters__seg"
                role="radiogroup"
                aria-labelledby="rf-sort-lbl"
              >
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    role="radio"
                    aria-checked={sortBy === opt.id}
                    aria-pressed={sortBy === opt.id}
                    onClick={() => setSortBy(opt.id)}
                    title={opt.title}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="rutefilters__toggle">
              <input
                type="checkbox"
                checked={onlyOpen}
                onChange={(e) => setOnlyOpen(e.target.checked)}
              />
              <span>Abierto ahora</span>
            </label>
          </section>

          {availableBrands.length > 0 && (
            <section className="rutebrands" aria-label="Filtrar por marca">
              <div className="rutebrands__row">
                <span className="rutebrands__label">Marca</span>
                {selectedBrands.size > 0 && (
                  <button
                    type="button"
                    className="rutebrands__clear"
                    onClick={() => setSelectedBrands(new Set())}
                  >
                    Quitar filtros
                  </button>
                )}
              </div>
              <div className="rutebrands__chips">
                {availableBrands.map((b) => {
                  const active = selectedBrands.has(b.id);
                  return (
                    <button
                      key={b.id}
                      type="button"
                      className={`rutebrands__chip${active ? " rutebrands__chip--active" : ""}`}
                      aria-pressed={active}
                      onClick={() => toggleBrand(b.id)}
                    >
                      <span>{b.display}</span>
                      <span className="rutebrands__count">{b.count}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {(loadingStations || stationsError) && (
            <div className="loading" role="status" aria-live="polite">
              {loadingStations ? (
                <>
                  <div className="loading__bar" aria-hidden="true" />
                  <span>Buscando gasolineras en tu ruta…</span>
                </>
              ) : (
                <span>
                  No hemos podido cargar las gasolineras. Inténtalo de nuevo.
                </span>
              )}
            </div>
          )}

          {!loadingStations && !stationsError && (
            <>
              {isDesktop && (
                <div
                  className="toolbar__viewseg ruteviewseg"
                  role="group"
                  aria-label="Vista"
                >
                  <button
                    type="button"
                    aria-pressed={viewMode === "list"}
                    onClick={() => setViewMode("list")}
                  >
                    Lista
                  </button>
                  <button
                    type="button"
                    aria-pressed={viewMode === "map"}
                    onClick={() => setViewMode("map")}
                  >
                    Mapa
                  </button>
                </div>
              )}

              {visibleStations.length === 0 && (
                <div className="empty">
                  <div className="empty__title">
                    No hay gasolineras con esos filtros
                  </div>
                  <div className="empty__hint">
                    Prueba a aumentar el desvío máximo, quitar el filtro de
                    marca o desactivar &quot;Abierto ahora&quot;.
                  </div>
                </div>
              )}

              {visibleStations.length > 0 && viewMode === "list" && (
                <StationList
                  stations={visibleStations}
                  origin={origin}
                  destination={destination}
                  selectedFuel={selectedFuel}
                  priceStats={priceStats}
                  selectedWaypointId={selectedWaypointId}
                  onSelectWaypoint={(id) =>
                    setSelectedWaypointId((prev) => (prev === id ? null : id))
                  }
                />
              )}

              {visibleStations.length > 0 && viewMode === "map" && effectiveGeometry && (
                <RouteMap
                  geometry={effectiveGeometry}
                  origin={origin}
                  destination={destination}
                  stations={visibleStations}
                  selectedFuel={selectedFuel}
                  selectedWaypointId={selectedWaypointId}
                  selectedWaypointCoords={
                    routeWithStop ? selectedWaypointCoords : null
                  }
                  onSelectWaypoint={(id) =>
                    setSelectedWaypointId((prev) => (prev === id ? null : id))
                  }
                />
              )}

              {visibleStations.length > 0 && !isDesktop && (
                <button
                  type="button"
                  className={`viewfab viewfab--${viewMode === "list" ? "to-map" : "to-list"}`}
                  onClick={() =>
                    setViewMode(viewMode === "list" ? "map" : "list")
                  }
                  aria-label={
                    viewMode === "list" ? "Ver en el mapa" : "Ver como lista"
                  }
                >
                  <span className="viewfab__icon" aria-hidden="true">
                    {viewMode === "list" ? (
                      <svg viewBox="0 0 24 24" width="20" height="20">
                        <path
                          d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="10"
                          r="2.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="20" height="20">
                        <path
                          d="M4 6h16M4 12h16M4 18h16"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span className="viewfab__label">
                    {viewMode === "list" ? "Mapa" : "Lista"}
                  </span>
                </button>
              )}
            </>
          )}
        </>
      )}
    </main>
  );
};

// FormField — input de origen o destino. Encapsula el LocationSearch +
// chip A/B en columnas reales (sin posicionamiento absoluto) y, cuando
// el usuario pide "Mi ubicación", sustituye el input por un bloque
// prominente "Pidiendo permiso de ubicación…" con spinner. Sin esto,
// el feedback se reduce a un texto pequeño y el usuario cree que no
// pasa nada mientras el browser espera al permiso.
function FormField({
  variant,
  point,
  setPoint,
  placeholder,
  onUseMyLocation,
  busy,
  error,
}) {
  const letter = variant === "origin" ? "A" : "B";
  const keyBase = variant === "origin" ? "origin" : "dest";
  return (
    <div className={`ruteform__field ruteform__field--${variant}`}>
      <span
        className={`ruteform__chip ruteform__chip--${variant}`}
        aria-hidden="true"
      >
        {letter}
      </span>
      <div className="ruteform__input">
        {busy ? (
          <GeoLoadingBlock kind={busy} />
        ) : (
          <LocationSearch
            // LocationSearch inicializa su input desde initialValue solo
            // en el primer render. Cambiamos el key cuando cambia el
            // punto (swap, "Mi ubicación", URL preset) para forzar
            // re-mount con el nuevo valor. Mientras el usuario teclea,
            // las coords no cambian todavía y el key se mantiene.
            key={`${keyBase}-${point ? `${point.lat},${point.lng}` : "empty"}`}
            placeholder={placeholder}
            initialValue={point?.label || ""}
            initialPoint={point}
            onSelectLocation={(p) => setPoint(p)}
            onUseMyLocation={onUseMyLocation}
          />
        )}
        {!busy && error && (
          <div className="ruteform__geoerror" role="alert">
            <span className="ruteform__geoerror-text">{error}</span>
            <button
              type="button"
              className="ruteform__geoerror-retry"
              onClick={onUseMyLocation}
            >
              Reintentar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Bloque grande "Pidiendo permiso de ubicación…". Tiene la altura
// mínima del LocationSearch para que sustituirlo no provoque saltos de
// layout. Mensaje explícito: el usuario sabe que la app está esperando
// al browser, no que se ha quedado colgada.
// kind: "asking" → el browser va a mostrar (o está mostrando) el
// prompt de permiso. "fetching" → permiso ya dado, solo esperamos al
// fix del GPS. Distinguirlos importa porque las acciones del usuario
// son distintas (pulsar Permitir vs solo esperar) — si decimos "pulsa
// Permitir" cuando ya está concedido, el usuario se confunde y cree
// que está colgado.
function GeoLoadingBlock({ kind = "fetching" }) {
  const isAsking = kind === "asking";
  return (
    <div
      className="ruteform__geoloading"
      role="status"
      aria-live="polite"
    >
      <span className="ruteform__spinner" aria-hidden="true" />
      <div className="ruteform__geoloading-text">
        {isAsking ? (
          <>
            <strong>Pidiendo permiso de ubicación…</strong>
            <span>
              Pulsa <em>Permitir</em> en el aviso del navegador.
            </span>
          </>
        ) : (
          <>
            <strong>Buscando tu ubicación…</strong>
            <span>Activando GPS, un momento.</span>
          </>
        )}
      </div>
    </div>
  );
}

// CollapsedRoute — chip "A → B" con un botón Editar. Aparece cuando la
// ruta ya está calculada, para que la sección de resultados gane altura
// y el usuario pueda seguir cambiando puntos sin abrir el form completo.
function CollapsedRoute({ origin, destination, onEdit }) {
  const labelOf = (p) => {
    if (!p) return "";
    if (p.label) return p.label;
    return `${p.lat.toFixed(3)}, ${p.lng.toFixed(3)}`;
  };
  return (
    <section className="rutecollapsed" aria-label="Ruta seleccionada">
      <div className="rutecollapsed__main">
        <div className="rutecollapsed__row">
          <span
            className="ruteform__chip ruteform__chip--origin"
            aria-hidden="true"
          >
            A
          </span>
          <span className="rutecollapsed__label">{labelOf(origin)}</span>
        </div>
        <div className="rutecollapsed__row">
          <span
            className="ruteform__chip ruteform__chip--dest"
            aria-hidden="true"
          >
            B
          </span>
          <span className="rutecollapsed__label">{labelOf(destination)}</span>
        </div>
      </div>
      <button
        type="button"
        className="rutecollapsed__edit"
        onClick={onEdit}
        aria-label="Editar origen o destino"
      >
        <EditIcon />
        <span>Editar</span>
      </button>
    </section>
  );
}

// WaypointBanner — banner cuando hay parada elegida. Muestra el coste
// real del desvío y el botón primario "Abrir en Google Maps con esta
// parada". Es sticky (top: 72px) para quedar bajo el toolbar al hacer
// scroll por la lista/mapa, sin mover el scroll del usuario.
function WaypointBanner({
  station,
  origin,
  destination,
  delta,
  loading,
  warning,
  onClear,
}) {
  const coords = stationLatLng(station);
  const mapsHref = coords
    ? buildRouteWithStopHref({
        origin,
        destination,
        waypoint: coords,
      })
    : null;
  const rotulo = station["Rótulo"];
  const dirEcc =
    [station.Dirección, station.Localidad].filter(Boolean).join(" · ") || "";

  let deltaText = null;
  if (delta) {
    const km = Math.max(0, delta.dKm);
    const min = Math.max(0, delta.dMin);
    const kmTxt =
      km < 0.1 ? "sin km extra" : `+${km.toFixed(1).replace(".", ",")} km`;
    const minTxt =
      min < 0.5 ? "sin tiempo extra" : `+${Math.round(min)} min`;
    deltaText = `${kmTxt} · ${minTxt} con esta parada`;
  } else if (loading) {
    deltaText = "Calculando el desvío…";
  } else if (warning) {
    deltaText =
      "No pudimos recalcular la ruta con esta parada, pero Google Maps lo hará al abrir el enlace.";
  }

  return (
    <section className="waypointbar" aria-label="Parada elegida">
      <div className="waypointbar__main">
        <div className="waypointbar__head">
          <span className="waypointbar__check" aria-hidden="true">
            <CheckIcon />
          </span>
          <span className="waypointbar__title">
            Parando en <strong>{rotulo}</strong>
          </span>
        </div>
        {dirEcc && <p className="waypointbar__sub">{dirEcc}</p>}
        {deltaText && (
          <p
            className={`waypointbar__delta${warning ? " waypointbar__delta--warn" : ""}`}
          >
            {deltaText}
          </p>
        )}
      </div>
      <div className="waypointbar__actions">
        {mapsHref && (
          <a
            className="waypointbar__btn waypointbar__btn--primary"
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir en Google Maps
            <ArrowRightIcon />
          </a>
        )}
        <button
          type="button"
          className="waypointbar__btn waypointbar__btn--ghost"
          onClick={onClear}
        >
          Quitar parada
        </button>
      </div>
    </section>
  );
}

function StationList({
  stations,
  origin,
  destination,
  selectedFuel,
  priceStats,
  selectedWaypointId,
  onSelectWaypoint,
}) {
  return (
    <ul className="rutelist" aria-label="Gasolineras en tu ruta">
      {stations.map((s) => {
        const price = parsePrice(s[selectedFuel]);
        const formatted = price !== null ? s[selectedFuel] : null;
        const isMin = price !== null && priceStats.min === price;
        const isMax =
          price !== null &&
          priceStats.max === price &&
          priceStats.max !== priceStats.min;
        const brandId = stationBrand(s);
        const brand = brandId ? getBrand(brandId) : null;
        const detourTxt = `${s.detour.toFixed(1).replace(".", ",")} km desvío`;
        const alongTxt = formatDistanceMeters(s.alongMeters);
        const open = isOpenNow(s.Horario);
        const isWaypoint = selectedWaypointId === s.IDEESS;
        const itemClass = [
          "rutelist__item",
          isMin ? "rutelist__item--best" : "",
          isWaypoint ? "rutelist__item--waypoint" : "",
        ]
          .filter(Boolean)
          .join(" ");
        return (
          <li key={s.IDEESS} className={itemClass}>
            <div className="rutelist__head">
              <span className="rutelist__logo">
                <img
                  src={`/station-icons/${getLogoForGasolinera(s["Rótulo"])}`}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  width="36"
                  height="36"
                />
              </span>
              <div className="rutelist__heading">
                <div className="rutelist__name">
                  {s["Rótulo"]}
                  {isWaypoint && (
                    <span className="rutelist__badge rutelist__badge--waypoint">
                      Parando aquí
                    </span>
                  )}
                  {!isWaypoint && isMin && (
                    <span className="rutelist__badge rutelist__badge--best">
                      Más barata
                    </span>
                  )}
                  {!isWaypoint && isMax && !isMin && (
                    <span className="rutelist__badge rutelist__badge--worst">
                      Más cara
                    </span>
                  )}
                </div>
                <div className="rutelist__addr">
                  {s.Dirección}
                  {s.Localidad ? ` · ${s.Localidad}` : ""}
                </div>
                <div className="rutelist__metrics">
                  <span title="Cuántos km tienes que salir de la ruta para llegar a la gasolinera">
                    {detourTxt}
                  </span>
                  {alongTxt && (
                    <>
                      <span className="rutelist__dot" aria-hidden="true">
                        ·
                      </span>
                      <span title="A qué altura del trayecto, contando desde el origen, queda la gasolinera">
                        km {alongTxt} de ruta
                      </span>
                    </>
                  )}
                  {brand && (
                    <>
                      <span className="rutelist__dot" aria-hidden="true">
                        ·
                      </span>
                      <Link
                        href={`/marca/${brand.id}`}
                        className="rutelist__brand"
                      >
                        {brand.display}
                      </Link>
                    </>
                  )}
                  {open === true && (
                    <>
                      <span className="rutelist__dot" aria-hidden="true">
                        ·
                      </span>
                      <span className="rutelist__open">Abierto</span>
                    </>
                  )}
                  {open === false && (
                    <>
                      <span className="rutelist__dot" aria-hidden="true">
                        ·
                      </span>
                      <span className="rutelist__closed">Cerrado</span>
                    </>
                  )}
                </div>
              </div>
              <div className="rutelist__price">
                {formatted ? (
                  <>
                    <span className="rutelist__num">{formatted}</span>
                    <span className="rutelist__unit">€/L</span>
                  </>
                ) : (
                  <span className="rutelist__nodata">
                    {noPriceLabel(selectedFuel)}
                  </span>
                )}
              </div>
            </div>
            <div className="rutelist__actions">
              <Link
                href={`/gasolinera/${s.IDMunicipio}/${s.IDEESS}`}
                className="rutelist__btn rutelist__btn--ghost"
              >
                Ver detalle
              </Link>
              <button
                type="button"
                className={`rutelist__btn rutelist__btn--primary${isWaypoint ? " rutelist__btn--active" : ""}`}
                onClick={() => onSelectWaypoint(s.IDEESS)}
              >
                {isWaypoint ? (
                  <>
                    <CheckIcon />
                    Parando aquí · quitar
                  </>
                ) : (
                  <>
                    Parar aquí
                    <ArrowRightIcon />
                  </>
                )}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default RoutePlanner;
