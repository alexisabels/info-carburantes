import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  fetchMunicipioCompleto,
  fetchProvincias,
  fetchTodasLasEstaciones,
} from "../utils/api";
import { slugify } from "../utils/slug";
import ProvinciaSelector from "./Selectors/ProvinciaSelector";
import MunicipioSelector from "./Selectors/MunicipioSelector";
import { handleSelectProvincia } from "../utils/handlers";
import GasolineraTable from "./GasolineraTable";
import FuelTypeSelector from "./Selectors/FuelTypeSelector";
import FavoriteButton from "./Favorites/FavoriteButton";
import useFavorites from "../hooks/useFavorites";
import { getUserLocation, calculateDistance } from "../utils/locationUtils";
import "../App.css";
import "./MainContent.css";

// react-leaflet + leaflet (~70KB gzip) solo se cargan cuando el usuario
// alterna a la vista mapa. La home y el listado nunca lo necesitan.
const MapView = lazy(() => import("./MapView/MapView"));

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const MapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M3 6.5 9 4l6 2.5L21 4v13.5L15 20l-6-2.5L3 20V6.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M9 4v13.5M15 6.5V20" stroke="currentColor" strokeWidth="2" />
  </svg>
);

// Flecha que reemplaza al chevron tipográfico ›: SVG legible y consistente
// con el resto de iconografía del home.
const ArrowRightIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
    width="20"
    height="20"
  >
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ---------- persistencia ligera (localStorage con try/catch) ----------

const FUEL_STORAGE_KEY = "fuel.preferred";
const SCOPE_STORAGE_KEY = "scope.last";
const FUEL_OPTIONS = [
  { id: "Precio Gasolina 95 E5", label: "Gasolina 95", hint: "El más habitual" },
  { id: "Precio Gasolina 98 E5", label: "Gasolina 98", hint: "Octanaje alto" },
  { id: "Precio Gasoleo A", label: "Diésel", hint: "Gasóleo A" },
  { id: "Precio Gasoleo Premium", label: "Diésel +", hint: "Gasóleo premium" },
];
const VALID_FUELS = new Set(FUEL_OPTIONS.map((f) => f.id));
const FUEL_LABEL = Object.fromEntries(
  FUEL_OPTIONS.map((f) => [f.id, f.label])
);
const VALID_SCOPES = new Set(["near", "manual"]);
// Combustible asumido por defecto cuando el usuario aún no ha elegido. No se
// persiste hasta que el usuario lo cambia explícitamente desde el segmented.
const DEFAULT_FUEL = "Precio Gasolina 95 E5";

const readStoredFuel = () => {
  try {
    const value = localStorage.getItem(FUEL_STORAGE_KEY);
    return value && VALID_FUELS.has(value) ? value : null;
  } catch {
    return null;
  }
};

const readStoredScope = () => {
  try {
    const value = localStorage.getItem(SCOPE_STORAGE_KEY);
    return value && VALID_SCOPES.has(value) ? value : null;
  } catch {
    return null;
  }
};

const writeStoredScope = (value) => {
  try {
    if (value && VALID_SCOPES.has(value)) {
      localStorage.setItem(SCOPE_STORAGE_KEY, value);
    }
  } catch {
    /* almacenamiento no disponible */
  }
};

const writeStoredFuel = (value) => {
  try {
    if (value && VALID_FUELS.has(value)) {
      localStorage.setItem(FUEL_STORAGE_KEY, value);
    }
  } catch {
    /* almacenamiento no disponible */
  }
};

// Snapshot de la búsqueda en curso. Lo persistimos en sessionStorage para
// que al volver desde la ficha de una gasolinera (navigate(-1)) recuperemos
// el listado, los selectores, la vista (lista/mapa) y la posición GPS.
const SNAPSHOT_KEY = "main.snapshot";
const VALID_VIEWMODES = new Set(["list", "map"]);

const readSnapshot = () => {
  try {
    const raw = sessionStorage.getItem(SNAPSHOT_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || !VALID_SCOPES.has(data.scope)) return null;
    return data;
  } catch {
    return null;
  }
};

const writeSnapshot = (data) => {
  try {
    sessionStorage.setItem(SNAPSHOT_KEY, JSON.stringify(data));
  } catch {
    /* almacenamiento no disponible (cuota o modo privado) */
  }
};

const clearSnapshot = () => {
  try {
    sessionStorage.removeItem(SNAPSHOT_KEY);
  } catch {
    /* noop */
  }
};

const MainContent = () => {
  // ─── Navegación. La URL es la fuente de verdad para el scope:
  //     /                            → home
  //     /cerca                       → near
  //     /municipio                   → manual (picker)
  //     /municipio/:id[/:slug]       → manual (listado)
  // Esto reemplaza al snapshot en sessionStorage como mecanismo principal:
  // refrescar la página o pegar una URL aterriza directo en la vista
  // correcta, y compartir un link de un municipio funciona end-to-end.
  const navigate = useNavigate();
  // Nombrado `routeLocation` para no chocar con el `location` (lat/lng) que
  // devuelve getUserLocation() dentro de handleNearMe.
  const routeLocation = useLocation();
  const params = useParams();

  // Snapshot leído una sola vez al montar para rehidratar la vista que el
  // usuario tenía antes de entrar en la ficha de una gasolinera. Solo se
  // usa cuando la URL es `/` (sin información), como fallback amistoso.
  const initialSnapshot = useRef(readSnapshot()).current;
  // Último ámbito recordado (sin auto-iniciar GPS): null | "near" | "manual"
  const initialLastScope = useRef(readStoredScope()).current;

  // En cold-load la URL es la fuente de verdad. Solo rehidratamos del
  // snapshot si la URL dice algo que casa con él (al volver desde /gasolinera
  // con navigate(-1), la URL ya es /cerca o /municipio/...). Si el usuario
  // abre directamente /, ignoramos el snapshot para no parpadear contenido
  // antes de que el URL effect rectifique a home.
  const initialPath =
    typeof window !== "undefined" ? window.location.pathname : "/";
  const urlSuggestsResults =
    initialPath === "/cerca" || initialPath.startsWith("/municipio/");

  // Visita recurrente: si la última vez el usuario buscó por municipio y el
  // snapshot trae listado + municipio válidos, arrancamos directamente en
  // resultados (no welcome). En "near" mantenemos welcome porque no debemos
  // pedir GPS sin gesto, pero destacamos el botón.
  const canRehydrateManual =
    urlSuggestsResults &&
    initialSnapshot &&
    initialSnapshot.scope === "manual" &&
    Array.isArray(initialSnapshot.listadoPrecios) &&
    initialSnapshot.listadoPrecios.length > 0 &&
    initialSnapshot.municipioSeleccionado;

  const initialScope = canRehydrateManual
    ? "manual"
    : urlSuggestsResults
      ? initialSnapshot?.scope || "home"
      : "home";

  // Solo rehidratamos contenido del snapshot cuando la URL sugiere
  // resultados (/cerca, /municipio/...). En home arrancamos limpio para
  // que la siguiente acción (cerca/manual) parta de cero.
  const seedSnapshot = urlSuggestsResults ? initialSnapshot : null;
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(
    seedSnapshot?.provinciaSeleccionada || null
  );
  const [provincias, setProvincias] = useState([]);
  const [municipios, setMunicipios] = useState(
    seedSnapshot?.municipios || []
  );
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState(
    seedSnapshot?.municipioSeleccionado || null
  );
  const [listadoPrecios, setListadoPrecios] = useState(
    seedSnapshot?.listadoPrecios || []
  );
  const [loadingPrecios, setLoadingPrecios] = useState(false);
  const [fechaActualizacion, setFechaActualizacion] = useState(
    seedSnapshot?.fechaActualizacion || null
  );

  // Combustible: leemos preferencia almacenada al montar. Si no hay,
  // arrancamos en `null` y trabajamos con DEFAULT_FUEL silenciosamente.
  // Solo persistimos cuando el usuario lo cambia explícitamente.
  const [selectedFuel, setSelectedFuelState] = useState(() => readStoredFuel());
  const setSelectedFuel = (value) => {
    setSelectedFuelState(value);
    writeStoredFuel(value);
  };
  // Combustible efectivo para listados/mapa: si el usuario aún no eligió,
  // usamos el default sin tocar localStorage.
  const effectiveFuel = selectedFuel || DEFAULT_FUEL;

  const [scope, setScope] = useState(initialScope);
  // Sort default: en near-me siempre por precio (la app vende ahorro).
  const [sortBy, setSortBy] = useState(seedSnapshot?.sortBy || "price");
  const [nearMeError, setNearMeError] = useState(null);
  // Sub-estado del flujo "cerca de mí": null | "geo" | "fetch"
  const [nearMePhase, setNearMePhase] = useState(null);
  // Vista de los resultados: rehidratamos del snapshot para que volver desde
  // una ficha al mapa no te tire a la lista.
  const [viewMode, setViewMode] = useState(() => {
    const stored = seedSnapshot?.viewMode;
    return stored && VALID_VIEWMODES.has(stored) ? stored : "list";
  });
  // Posición del usuario para pintarla en el mapa. La rehidratamos del
  // snapshot si era reciente (<10 min); GPS no es gratis y si volvemos a
  // /cerca tras una ficha, el último fix sigue siendo válido.
  const [userPos, setUserPos] = useState(() => {
    const pos = seedSnapshot?.userPos;
    if (!pos || !Number.isFinite(pos.lat) || !Number.isFinite(pos.lng)) return null;
    if (pos.t && Date.now() - pos.t > 10 * 60 * 1000) return null;
    return { lat: pos.lat, lng: pos.lng };
  });
  // Filtro "Abierto ahora" elevado a este componente para que tanto la lista
  // como el mapa lo respeten.
  const [onlyOpen, setOnlyOpen] = useState(
    !!seedSnapshot?.onlyOpen
  );
  // Error de carga de provincias (sin internet inicial, etc.).
  const [loadError, setLoadError] = useState(false);
  // Toggle inline para "Ver todas" en la sección de favoritas.
  const [showAllFavs, setShowAllFavs] = useState(false);
  // Detectamos desktop con matchMedia para decidir dónde renderizar el
  // toggle Lista|Mapa: en móvil es un FAB centrado abajo (cómodo con el
  // pulgar); en desktop ≥900px lo metemos en el toolbar (la esquina
  // inferior-derecha está reservada para chats/scroll-top).
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(min-width: 900px)").matches;
  });
  const { favorites } = useFavorites();

  const isMountedRef = useRef(true);
  const nearMeRequestIdRef = useRef(0);

  const loadProvincias = async () => {
    setLoadError(false);
    try {
      const provinciasData = await fetchProvincias();
      if (!isMountedRef.current) return;
      setProvincias(provinciasData);
    } catch {
      if (!isMountedRef.current) return;
      setLoadError(true);
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    let cancelled = false;
    const run = async () => {
      try {
        const provinciasData = await fetchProvincias();
        if (cancelled || !isMountedRef.current) return;
        setProvincias(provinciasData);
      } catch {
        if (cancelled || !isMountedRef.current) return;
        setLoadError(true);
      }
    };
    run();
    return () => {
      cancelled = true;
      isMountedRef.current = false;
    };
  }, []);

  // Escuchamos cambios de viewport para mantener `isDesktop` sincronizado
  // (rotación de tablet, redimensionado de ventana en escritorio, etc.).
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(min-width: 900px)");
    const onChange = (e) => setIsDesktop(e.matches);
    // Compatibilidad: Safari < 14 expone addListener; el resto, addEventListener.
    if (mql.addEventListener) {
      mql.addEventListener("change", onChange);
    } else if (mql.addListener) {
      mql.addListener(onChange);
    }
    setIsDesktop(mql.matches);
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", onChange);
      } else if (mql.removeListener) {
        mql.removeListener(onChange);
      }
    };
  }, []);

  // Persistimos un snapshot de la búsqueda para rehidratarla al volver
  // desde una ficha (navigate(-1)). Si estamos en home no sobreescribimos:
  // dejamos que el último snapshot útil sobreviva al paso por `/`, así el
  // back/forward del navegador no rompe la continuidad. La limpieza
  // explícita ocurre solo en goHome().
  useEffect(() => {
    if (scope === "home") return;
    writeSnapshot({
      scope,
      sortBy,
      viewMode,
      onlyOpen,
      userPos: userPos
        ? { lat: userPos.lat, lng: userPos.lng, t: Date.now() }
        : null,
      provinciaSeleccionada,
      municipioSeleccionado,
      municipios,
      listadoPrecios,
      fechaActualizacion,
    });
  }, [
    scope,
    sortBy,
    viewMode,
    onlyOpen,
    userPos,
    provinciaSeleccionada,
    municipioSeleccionado,
    municipios,
    listadoPrecios,
    fechaActualizacion,
  ]);

  // ─── URL → estado ─────────────────────────────────────────────────────
  // La URL es la fuente de verdad: refresh, deep-link o back/forward
  // aterrizan en la vista correcta. Si pegamos /municipio/X/slug, fetcheamos
  // el municipio, derivamos su nombre y canonicalizamos el slug.
  //
  // El ref arranca con el ID del snapshot rehidratado (si lo hay): si el
  // usuario vuelve desde una ficha a /municipio/:id y el snapshot ya trae
  // listado y municipioSeleccionado, no queremos que el effect dispare un
  // reset+refetch (parpadeo a "Cargando…" + selectores en blanco).
  const lastFetchedMunicipioRef = useRef(
    canRehydrateManual && seedSnapshot?.municipioSeleccionado?.IDMunicipio
      ? String(seedSnapshot.municipioSeleccionado.IDMunicipio)
      : null
  );

  useEffect(() => {
    const path = routeLocation.pathname;

    if (path === "/") {
      // Volver al home desde otra vista (por back de navegador, por
      // ejemplo). Reseteamos lo que se vea raro al pintar la home.
      lastFetchedMunicipioRef.current = null;
      if (scope !== "home") setScope("home");
      return undefined;
    }

    if (path === "/cerca") {
      if (scope !== "near") setScope("near");
      // Disparamos near-me solo si no hay datos ni petición en curso.
      // Diferimos al siguiente tick para no llamar setState dentro del
      // render-fase del effect.
      if (
        listadoPrecios.length === 0 &&
        !loadingPrecios &&
        !nearMeError
      ) {
        const t = setTimeout(() => {
          if (isMountedRef.current) handleNearMe();
        }, 0);
        return () => clearTimeout(t);
      }
      return undefined;
    }

    if (path === "/municipio") {
      // Picker (no hay id todavía).
      if (scope !== "manual") setScope("manual");
      lastFetchedMunicipioRef.current = null;
      if (municipioSeleccionado || listadoPrecios.length > 0) {
        setListadoPrecios([]);
        setMunicipioSeleccionado(null);
      }
      return undefined;
    }

    if (path.startsWith("/municipio/") && params.idMunicipio) {
      const idMun = String(params.idMunicipio);
      if (scope !== "manual") setScope("manual");

      if (lastFetchedMunicipioRef.current === idMun) {
        // Ya estamos pintando este municipio; solo canonicalizamos slug
        // si hace falta.
        if (municipioSeleccionado?.Municipio) {
          const canonical = slugify(municipioSeleccionado.Municipio);
          if (canonical && params.slug !== canonical) {
            navigate(`/municipio/${idMun}/${canonical}`, { replace: true });
          }
        }
        return undefined;
      }

      lastFetchedMunicipioRef.current = idMun;
      let cancelled = false;
      setLoadingPrecios(true);
      setListadoPrecios([]);
      setMunicipioSeleccionado(null);
      setOnlyOpen(false);
      setSortBy("price");
      setViewMode("list");

      (async () => {
        try {
          const data = await fetchMunicipioCompleto(idMun);
          if (cancelled || !isMountedRef.current) return;
          const lista = data?.ListaEESSPrecio || [];
          setListadoPrecios(lista);
          setFechaActualizacion(data?.Fecha || null);
          const first = lista[0] || {};
          const nombre = first.Municipio || "";
          setMunicipioSeleccionado({
            IDMunicipio: idMun,
            Municipio: nombre,
            Provincia: first.Provincia || "",
            IDProvincia: first.IDProvincia || "",
          });

          // Canonicalización del slug.
          if (nombre) {
            const canonical = slugify(nombre);
            if (canonical && params.slug !== canonical) {
              navigate(`/municipio/${idMun}/${canonical}`, { replace: true });
            }
          }
        } catch {
          if (!cancelled && isMountedRef.current) {
            setListadoPrecios([]);
            setFechaActualizacion(null);
          }
        } finally {
          if (!cancelled && isMountedRef.current) {
            setLoadingPrecios(false);
          }
        }
      })();
      return () => {
        cancelled = true;
      };
    }

    return undefined;
    // Solo respondemos a cambios en la URL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeLocation.pathname, params.idMunicipio, params.slug]);

  // Document title por ruta — útil para tab del navegador y SEO complementario.
  // El OG meta de los bots se sirve desde /api/og/... cuando aplique.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const path = routeLocation.pathname;
    const baseTitle = "Carburantes — Precios de gasolineras en España";
    if (path === "/cerca") {
      document.title = "Gasolineras cerca de ti · Carburantes";
    } else if (
      path.startsWith("/municipio/") &&
      municipioSeleccionado?.Municipio
    ) {
      const m = municipioSeleccionado.Municipio;
      const p = municipioSeleccionado.Provincia;
      document.title = p
        ? `Precios de gasolineras en ${m} (${p}) · Carburantes`
        : `Precios de gasolineras en ${m} · Carburantes`;
    } else if (path === "/municipio") {
      document.title = "Buscar por municipio · Carburantes";
    } else {
      document.title = baseTitle;
    }
  }, [
    routeLocation.pathname,
    municipioSeleccionado?.Municipio,
    municipioSeleccionado?.Provincia,
  ]);

  const handleNearMe = async () => {
    if (loadingPrecios) return;
    const requestId = ++nearMeRequestIdRef.current;
    setLoadingPrecios(true);
    setNearMePhase("geo");
    setScope("near");
    writeStoredScope("near");
    // La app vende ahorro: en near-me ordenamos por precio por defecto.
    setSortBy("price");
    // En near-me arrancamos en mapa (más útil para evaluar el entorno).
    setViewMode("map");
    setProvinciaSeleccionada(null);
    setMunicipioSeleccionado(null);
    setListadoPrecios([]);
    setNearMeError(null);

    try {
      // GPS y descarga del listado en paralelo. Antes iban en serie y se
      // sumaban los dos tiempos (3-4 s GPS + 5-8 s JSON enorme).
      // El cambio de fase a "fetch" es informativo: lo lanzamos cuando el GPS
      // resuelve para que el subtexto del loader cambie.
      const locationPromise = getUserLocation().then((loc) => {
        if (
          isMountedRef.current &&
          requestId === nearMeRequestIdRef.current
        ) {
          setNearMePhase("fetch");
        }
        return loc;
      });
      const [location, allStationsData] = await Promise.all([
        locationPromise,
        fetchTodasLasEstaciones(),
      ]);
      if (!isMountedRef.current || requestId !== nearMeRequestIdRef.current) {
        return;
      }
      setUserPos({ lat: location.lat, lng: location.lng });
      const allStations = allStationsData.ListaEESSPrecio || [];

      // Prefiltro por bounding box: descartamos estaciones lejanas sin
      // calcular Haversine. ~1° lat ≈ 111 km, así que 0.7° cubre ~75 km de
      // radio holgado y reduce el set de ~12 000 a unas pocas docenas.
      const LAT_DELTA = 0.7;
      const cosLat = Math.cos((location.lat * Math.PI) / 180);
      const LNG_DELTA = LAT_DELTA / Math.max(cosLat, 0.1);

      const nearby = [];
      for (const station of allStations) {
        const lat = parseFloat(String(station.Latitud).replace(",", "."));
        const lng = parseFloat(
          String(station["Longitud (WGS84)"]).replace(",", ".")
        );
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;
        if (Math.abs(lat - location.lat) > LAT_DELTA) continue;
        if (Math.abs(lng - location.lng) > LNG_DELTA) continue;
        const distance = calculateDistance(
          location.lat,
          location.lng,
          lat,
          lng
        );
        nearby.push({ ...station, distance });
      }

      const closestStations = nearby
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 50);

      setListadoPrecios(closestStations);
      setFechaActualizacion(allStationsData.Fecha);
    } catch (err) {
      if (!isMountedRef.current || requestId !== nearMeRequestIdRef.current) {
        return;
      }
      // Intentamos detectar denegación de permisos sin acoplarnos a la API
      // exacta de getUserLocation: nombre/código del error o substring.
      const name = err && (err.name || err.code);
      const message = (err && err.message) || "";
      const denied =
        name === "PermissionDeniedError" ||
        name === 1 ||
        /denied|denegad|permission/i.test(message);
      setNearMeError(
        denied
          ? "permission"
          : "generic"
      );
    } finally {
      if (
        isMountedRef.current &&
        requestId === nearMeRequestIdRef.current
      ) {
        setLoadingPrecios(false);
        setNearMePhase(null);
      }
    }
  };

  const handleManualSearchClick = () => {
    // La URL → estado se encarga del scope y del reseteo de listado.
    nearMeRequestIdRef.current++;
    writeStoredScope("manual");
    setProvinciaSeleccionada(null);
    setMunicipioSeleccionado(null);
    setLoadingPrecios(false);
    setNearMePhase(null);
    setNearMeError(null);
    setSortBy("price");
    setViewMode("list");
    setUserPos(null);
    setOnlyOpen(false);
    navigate("/municipio");
  };

  const goNearMe = () => {
    // Disparamos navegación; el URL effect llamará a handleNearMe()
    // cuando el path se actualice a /cerca. Limpiamos lista/municipio del
    // ámbito anterior para que el effect detecte "no hay datos" y arranque
    // el flujo de geolocalización (si no, mostraríamos resultados de
    // /municipio/X bajo la cabecera "Cerca de ti").
    if (loadingPrecios) return;
    setListadoPrecios([]);
    setMunicipioSeleccionado(null);
    setProvinciaSeleccionada(null);
    setNearMeError(null);
    lastFetchedMunicipioRef.current = null;
    navigate("/cerca");
  };

  const goHome = () => {
    nearMeRequestIdRef.current++;
    setListadoPrecios([]);
    setProvinciaSeleccionada(null);
    setMunicipioSeleccionado(null);
    setLoadingPrecios(false);
    setNearMePhase(null);
    setNearMeError(null);
    setOnlyOpen(false);
    clearSnapshot();
    navigate("/");
  };

  // Navega al listado de un municipio con slug canónico. Lo llamamos desde
  // el MunicipioSelector cuando el usuario lo elige.
  const navigateToMunicipio = (municipio) => {
    if (!municipio || !municipio.IDMunicipio) return;
    const slug = slugify(municipio.Municipio || "");
    const id = municipio.IDMunicipio;
    if (slug) navigate(`/municipio/${id}/${slug}`);
    else navigate(`/municipio/${id}`);
  };

  const showHome = scope === "home";
  const showResults = listadoPrecios.length > 0 || loadingPrecios;

  const headerTitle =
    scope === "near"
      ? "Cerca de ti"
      : municipioSeleccionado?.Municipio
        ? municipioSeleccionado.Municipio
        : "Buscar por municipio";

  const headerSub =
    scope === "near" && fechaActualizacion
      ? `Actualizado ${fechaActualizacion}`
      : scope === "manual" && !municipioSeleccionado
        ? "Elige provincia y municipio"
        : null;

  const nearMeLoadingTitle =
    nearMePhase === "geo" ? "Pidiendo ubicación…" : "Buscando…";
  const nearMeLoadingSub =
    nearMePhase === "geo"
      ? "Pidiendo permiso de ubicación"
      : nearMePhase === "fetch"
        ? "Buscando gasolineras cercanas"
        : "Las 50 más cercanas";

  // Para empty-state: provincia elegida pero sin municipios cargados.
  const manualNoMunicipios =
    scope === "manual" &&
    !!provinciaSeleccionada &&
    !municipioSeleccionado &&
    municipios.length === 0;

  const visibleFavs = showAllFavs ? favorites : favorites.slice(0, 6);

  return (
    <main>
      {showHome && (
        <section className="home">
          <div className="home__hero">
            <h1>¿Dónde repostas?</h1>
            <p>Te decimos qué gasolinera tiene el mejor precio.</p>
          </div>

          {loadError && (
            <div className="errorbox" role="alert">
              <p className="errorbox__title">Sin conexión</p>
              <p className="errorbox__hint">
                No podemos cargar el listado de provincias. Comprueba tu
                conexión y vuelve a intentarlo.
              </p>
              <div className="errorbox__actions">
                <button type="button" onClick={loadProvincias}>
                  Reintentar
                </button>
              </div>
            </div>
          )}

          <div className="home__primary">
            <button
              type="button"
              className={`bigbtn${initialLastScope === "near" ? " bigbtn--recent" : ""}`}
              onClick={goNearMe}
              disabled={loadingPrecios}
              aria-busy={loadingPrecios || undefined}
              autoFocus={initialLastScope === "near"}
            >
              <span className="bigbtn__icon">
                <PinIcon />
              </span>
              <span className="bigbtn__text">
                <span className="bigbtn__title">
                  {loadingPrecios ? nearMeLoadingTitle : "Cerca de mí"}
                </span>
                <span className="bigbtn__sub">{nearMeLoadingSub}</span>
              </span>
              <span className="bigbtn__chev" aria-hidden="true">
                <ArrowRightIcon />
              </span>
            </button>
            <button
              type="button"
              className="bigbtn bigbtn--ghost"
              onClick={handleManualSearchClick}
            >
              <span className="bigbtn__icon">
                <MapIcon />
              </span>
              <span className="bigbtn__text">
                <span className="bigbtn__title">Buscar por municipio</span>
                <span className="bigbtn__sub">Elige provincia y municipio</span>
              </span>
              <span className="bigbtn__chev" aria-hidden="true">
                <ArrowRightIcon />
              </span>
            </button>
            <p className="home__fuelnote">
              Mostrando precios de{" "}
              <strong>{FUEL_LABEL[effectiveFuel]}</strong>.{" "}
              <label className="home__fuelchange-wrap">
                <span className="visually-hidden">Cambiar combustible</span>
                <select
                  className="home__fuelselect"
                  value={effectiveFuel}
                  onChange={(e) => setSelectedFuel(e.target.value)}
                  aria-label="Cambiar combustible"
                >
                  {FUEL_OPTIONS.map((fuel) => (
                    <option key={fuel.id} value={fuel.id}>
                      {fuel.label}
                    </option>
                  ))}
                </select>
                <span className="home__fuelselect-chev" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
                    <path
                      d="m6 9 6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </label>
            </p>
          </div>

          {favorites.length > 0 && (
            <section className="favsec" aria-labelledby="favsec-h">
              <h2 id="favsec-h" className="favsec__title">
                Tus favoritas
              </h2>
              <ul className="favsec__list">
                {visibleFavs.map((fav) => (
                  <li key={fav.ideess} className="favsec__item">
                    <Link
                      to={`/gasolinera/${fav.idMunicipio}/${fav.ideess}`}
                      className="favsec__link"
                    >
                      <span className="favsec__rotulo">{fav.rotulo}</span>
                      <span className="favsec__sub">
                        {[fav.direccion, fav.localidad]
                          .filter(Boolean)
                          .join(" · ") || fav.provincia}
                      </span>
                    </Link>
                    <FavoriteButton
                      station={fav}
                      size="sm"
                      className="favsec__star"
                    />
                  </li>
                ))}
              </ul>
              {favorites.length > 6 && (
                <button
                  type="button"
                  className="favsec__more"
                  onClick={() => setShowAllFavs((v) => !v)}
                  aria-expanded={showAllFavs}
                >
                  {showAllFavs
                    ? "Ver menos"
                    : `Ver todos (${favorites.length})`}
                </button>
              )}
            </section>
          )}
        </section>
      )}

      {!showHome && (
        <>
          <div className="toolbar">
            <div className="toolbar__row">
              <button
                type="button"
                className="toolbar__back"
                onClick={goHome}
                aria-label="Volver al inicio"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M15 6 9 12l6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="toolbar__title">
                {headerTitle}
                {headerSub && <small>{headerSub}</small>}
              </div>
            </div>
            <div className="toolbar__filters">
              <FuelTypeSelector
                selectedFuel={effectiveFuel}
                onSelectFuel={setSelectedFuel}
              />
              {isDesktop && showResults && !loadingPrecios && (
                <div
                  className="toolbar__viewseg"
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
            </div>
          </div>

          {scope === "manual" && (
            <section className="locator" aria-label="Selección de ubicación">
              <ProvinciaSelector
                provincias={provincias}
                onSelect={(e) => {
                  handleSelectProvincia(
                    e,
                    provincias,
                    setProvinciaSeleccionada,
                    setMunicipioSeleccionado,
                    setListadoPrecios,
                    setMunicipios
                  );
                }}
              />
              {provinciaSeleccionada && (
                <MunicipioSelector
                  municipios={municipios}
                  onSelect={(e) => {
                    // Con routing por URL no fetcheamos aquí: navegamos a
                    // /municipio/:id/:slug y el URL effect se encarga de
                    // traer el listado y canonicalizar el slug.
                    const nombre = e?.target?.value;
                    if (!nombre) {
                      setMunicipioSeleccionado(null);
                      setListadoPrecios([]);
                      return;
                    }
                    const mun = municipios.find(
                      (m) => m.Municipio === nombre
                    );
                    if (mun) navigateToMunicipio(mun);
                  }}
                />
              )}
            </section>
          )}

          {scope === "near" && nearMeError && !loadingPrecios && (
            <div className="errorbox" role="alert">
              {nearMeError === "permission" ? (
                <>
                  <p className="errorbox__title">Sin acceso a tu ubicación</p>
                  <p className="errorbox__hint">
                    Si has denegado el permiso, actívalo en los ajustes del
                    navegador (icono del candado en la barra de direcciones)
                    y vuelve a intentarlo.
                  </p>
                </>
              ) : (
                <>
                  <p className="errorbox__title">No hemos podido buscar</p>
                  <p className="errorbox__hint">
                    No hemos podido obtener tu ubicación o cargar las
                    gasolineras. Comprueba tu conexión y, si el problema
                    persiste, actívalo en los ajustes del navegador.
                  </p>
                </>
              )}
              <div className="errorbox__actions">
                <button type="button" onClick={handleNearMe}>
                  Reintentar
                </button>
                <button
                  type="button"
                  className="errorbox__alt"
                  onClick={handleManualSearchClick}
                >
                  Buscar por municipio
                </button>
              </div>
            </div>
          )}

          {!showResults && scope === "manual" && !loadingPrecios && !provinciaSeleccionada && (
            <div className="empty">
              <div className="empty__title">Empieza por la provincia</div>
              <div className="empty__hint">Y luego elige un municipio.</div>
            </div>
          )}

          {!showResults && manualNoMunicipios && (
            <div className="empty empty--nomun">
              <div className="empty__title">
                Esta provincia no tiene municipios cargados
              </div>
              <div className="empty__hint">
                Prueba con otra provincia o vuelve a intentarlo más tarde.
              </div>
            </div>
          )}

          {showResults && viewMode === "list" && (
            <GasolineraTable
              listadoPrecios={listadoPrecios}
              municipioSeleccionado={municipioSeleccionado}
              loadingPrecios={loadingPrecios}
              fechaActualizacion={fechaActualizacion}
              selectedFuel={effectiveFuel}
              isNearMeMode={scope === "near"}
              sortBy={sortBy}
              onSort={setSortBy}
              onlyOpen={onlyOpen}
              onOnlyOpenChange={setOnlyOpen}
            />
          )}

          {showResults && viewMode === "map" && !loadingPrecios && (
            <Suspense
              fallback={
                <div className="loading" role="status" aria-live="polite">
                  <div className="loading__bar" aria-hidden="true" />
                  <span>Cargando mapa…</span>
                </div>
              }
            >
              <MapView
                listadoPrecios={listadoPrecios}
                selectedFuel={effectiveFuel}
                userPos={scope === "near" ? userPos : null}
                onlyOpen={onlyOpen}
              />
            </Suspense>
          )}

          {/* Mientras carga "Cerca de mí" en modo mapa, GasolineraTable no
            * se renderiza (sólo se muestra cuando viewMode==="list") y el
            * usuario quedaba mirando una pantalla en blanco. Añadimos aquí
            * un loader explícito para ese estado. */}
          {loadingPrecios && viewMode === "map" && (
            <div className="loading" role="status" aria-live="polite">
              <div className="loading__bar" aria-hidden="true" />
              <span>
                {scope === "near"
                  ? nearMePhase === "geo"
                    ? "Pidiendo tu ubicación…"
                    : "Buscando gasolineras cerca de ti…"
                  : "Buscando gasolineras…"}
              </span>
            </div>
          )}

          {/* FAB Lista|Mapa móvil: visible siempre que estemos en resultados,
            * incluso durante la carga, para que el usuario sepa que existe
            * la otra vista. Antes se ocultaba con !loadingPrecios y la app
            * "se quedaba en blanco" durante la espera. */}
          {showResults && !isDesktop && (
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
    </main>
  );
};

export default MainContent;
