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
  { id: "price", label: "Precio" },
  { id: "detour", label: "Desvío" },
  { id: "along", label: "En la ruta" },
];

// Capacidad de depósito asumida para calcular el "ahorro máximo": elegimos
// 50 L como referencia común (turismo medio diésel/gasolina). El número se
// hace explícito en la UI para que el usuario sepa qué significa.
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
  // Formato: "lat,lng" o "lat,lng,label". El label puede contener comas
  // porque sólo separamos en los dos primeros.
  const firstComma = raw.indexOf(",");
  if (firstComma < 0) return null;
  const secondComma = raw.indexOf(",", firstComma + 1);
  const latStr = raw.slice(0, firstComma);
  const lngStr = secondComma > 0
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

  // Sincroniza la URL con el estado relevante. Replace (no push) para no
  // contaminar el historial — el usuario quiere volver atrás "fuera de
  // /ruta", no entre cada cambio de filtro.
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
    if (
      window.location.pathname + window.location.search !==
      next
    ) {
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

  // Auto-fetch de la ruta cuando ambos extremos están definidos.
  useEffect(() => {
    if (!origin || !destination) {
      setRoute(null);
      setRouteError(null);
      return undefined;
    }
    let cancelled = false;
    const controller = new AbortController();
    setLoadingRoute(true);
    setRouteError(null);
    fetchRoute(origin, destination, { signal: controller.signal })
      .then((r) => {
        if (cancelled) return;
        setRoute({
          ...r,
          geometry: downsampleGeometry(r.geometry, 150),
        });
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

  // Carga el listado nacional. Reutilizamos la caché de fetchTodasLasEstaciones
  // (en memoria + localStorage TTL 1h) — si el usuario viene de /cerca, lo
  // tenemos ya cargado y la "primera ruta" del día va instantánea.
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

  // Estaciones a lo largo de la ruta, con métricas (desvío, km recorridos).
  // Memo pesado: 12k estaciones × ~1k vértices ≈ varios millones de
  // comparaciones; aún así <200ms en JS, y solo se recalcula cuando cambia
  // la ruta o el desvío máximo.
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

  // Marcas disponibles (chips). Solo mostramos las que aparecen al menos
  // una vez en las estaciones de la ruta, y respetando el catálogo
  // KNOWN_BRANDS para mantener un display consistente.
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

  // Si el usuario eligió marcas que después dejaron de existir (cambió la
  // ruta y la marca ya no aparece), las podamos del estado para que la
  // URL no quede con basura y los filtros se mantengan coherentes.
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

  // Estadísticas de precio para el banner: mínimo, máximo y ahorro por 50L.
  // Solo consideramos estaciones con precio del combustible seleccionado.
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

  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleResetForm = () => {
    setOrigin(null);
    setDestination(null);
    setRoute(null);
    setRouteError(null);
  };

  const toggleBrand = (id) => {
    setSelectedBrands((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const hasRoute = !!route && !loadingRoute && !routeError;
  const showForm = !hasRoute && !loadingRoute;

  // Mensajes humanos para los códigos de error del cliente de routing.
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

      <section className="ruteform" aria-label="Origen y destino">
        <div className="ruteform__inputs">
          <div className="ruteform__field">
            <span className="ruteform__chip ruteform__chip--origin" aria-hidden="true">
              A
            </span>
            <LocationSearch
              // LocationSearch inicializa su input desde initialValue solo
              // en el primer render. Forzamos re-mount cuando cambia el
              // punto (swap o "Usar mi ubicación") para que el input refleje
              // la nueva etiqueta. Mientras el usuario teclea, lat/lng no
              // cambian todavía, por lo que el key se mantiene y no se
              // interrumpe la edición.
              key={`origin-${origin ? `${origin.lat},${origin.lng}` : "empty"}`}
              placeholder="Desde… dirección, ciudad o CP"
              initialValue={origin?.label || ""}
              initialPoint={origin}
              onSelectLocation={(p) => setOrigin(p)}
              onUseMyLocation={async () => {
                try {
                  const { getUserLocation } = await import(
                    "../../utils/locationUtils"
                  );
                  const pos = await getUserLocation();
                  setOrigin({
                    lat: pos.lat,
                    lng: pos.lng,
                    label: "Mi ubicación",
                  });
                } catch {
                  /* el LocationSearch ya muestra error si hace falta */
                }
              }}
            />
          </div>
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
          <div className="ruteform__field">
            <span className="ruteform__chip ruteform__chip--dest" aria-hidden="true">
              B
            </span>
            <LocationSearch
              key={`dest-${destination ? `${destination.lat},${destination.lng}` : "empty"}`}
              placeholder="Hasta… dirección, ciudad o CP"
              initialValue={destination?.label || ""}
              initialPoint={destination}
              onSelectLocation={(p) => setDestination(p)}
              onUseMyLocation={async () => {
                try {
                  const { getUserLocation } = await import(
                    "../../utils/locationUtils"
                  );
                  const pos = await getUserLocation();
                  setDestination({
                    lat: pos.lat,
                    lng: pos.lng,
                    label: "Mi ubicación",
                  });
                } catch {
                  /* noop */
                }
              }}
            />
          </div>
        </div>
        {showForm && (!origin || !destination) && (
          <p className="ruteform__hint">
            Indica un <strong>origen</strong> y un <strong>destino</strong>{" "}
            (dirección, ciudad o GPS) y calcularemos qué gasolineras tienes
            cerca del trayecto, ordenadas por precio.
          </p>
        )}
      </section>

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
                // Re-disparar el efecto: forzamos un cambio de identidad de
                // origin para que el effect se reejecute.
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
          </section>

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
                />
              )}

              {visibleStations.length > 0 && viewMode === "map" && (
                <RouteMap
                  geometry={route.geometry}
                  origin={origin}
                  destination={destination}
                  stations={visibleStations}
                  selectedFuel={selectedFuel}
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

function StationList({ stations, origin, destination, selectedFuel, priceStats }) {
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
        const lat = parseFloat(String(s.Latitud).replace(",", "."));
        const lng = parseFloat(String(s["Longitud (WGS84)"]).replace(",", "."));
        const mapsHref = buildRouteWithStopHref({
          origin,
          destination,
          waypoint: { lat, lng },
        });
        const open = isOpenNow(s.Horario);
        return (
          <li key={s.IDEESS} className={`rutelist__item${isMin ? " rutelist__item--best" : ""}`}>
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
                  {isMin && (
                    <span className="rutelist__badge rutelist__badge--best">
                      Más barata
                    </span>
                  )}
                  {isMax && !isMin && (
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
                  <span title="Desvío respecto al trayecto">{detourTxt}</span>
                  {alongTxt && (
                    <>
                      <span className="rutelist__dot" aria-hidden="true">·</span>
                      <span title="Distancia desde el origen siguiendo la ruta">
                        km {alongTxt} de ruta
                      </span>
                    </>
                  )}
                  {brand && (
                    <>
                      <span className="rutelist__dot" aria-hidden="true">·</span>
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
                      <span className="rutelist__dot" aria-hidden="true">·</span>
                      <span className="rutelist__open">Abierto</span>
                    </>
                  )}
                  {open === false && (
                    <>
                      <span className="rutelist__dot" aria-hidden="true">·</span>
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
              {mapsHref && (
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rutelist__btn rutelist__btn--primary"
                >
                  Parar aquí
                  <ArrowRightIcon />
                </a>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default RoutePlanner;
