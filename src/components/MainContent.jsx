"use client";

/* eslint-disable react/prop-types */
import Link from "next/link";
import { usePathname, useRouter, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
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
import LocationSearch from "./LocationSearch/LocationSearch";
import ShareButton from "./ShareButton/ShareButton";
import useFavorites from "../hooks/useFavorites";
import { getUserLocation, calculateDistance } from "../utils/locationUtils";
import { reverseGeocode } from "../utils/geocoder";
import { getLowestPrices } from "../utils/getLowestPrices";
import { fuelShortLabel } from "../utils/fuelLabels";
import { absoluteUrl } from "../lib/site";
import "./MainContent.css";

// react-leaflet (~70KB gzip) NO debe entrar en el bundle de servidor: dynamic
// + ssr:false garantiza que solo se carga al alternar a la vista mapa en
// cliente. Sin esto, Next intenta SSR de Leaflet y `window` revienta.
const MapView = dynamic(() => import("./MapView/MapView"), {
  ssr: false,
  loading: () => (
    <div className="loading" role="status" aria-live="polite">
      <div className="loading__bar" aria-hidden="true" />
      <span>Cargando mapa…</span>
    </div>
  ),
});

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

const SNAPSHOT_KEY = "main.snapshot";
const VALID_VIEWMODES = new Set(["list", "map"]);

const readSnapshot = () => {
  try {
    if (typeof sessionStorage === "undefined") return null;
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
    if (typeof sessionStorage === "undefined") return;
    sessionStorage.setItem(SNAPSHOT_KEY, JSON.stringify(data));
  } catch {
    /* almacenamiento no disponible (cuota o modo privado) */
  }
};

const clearSnapshot = () => {
  try {
    if (typeof sessionStorage === "undefined") return;
    sessionStorage.removeItem(SNAPSHOT_KEY);
  } catch {
    /* noop */
  }
};

// `initialData` permite sembrar el componente con datos del servidor cuando
// la ruta tiene paridad SSR (e.g. /municipio/:id/:slug). Cuando llega:
//   - municipioSeleccionado y listadoPrecios arrancan llenos
//   - lastFetchedMunicipioRef se marca como ya cargado para que la primera
//     ejecución del effect URL→estado no dispare un refetch innecesario.
const MainContent = ({ initialData = null, mode = null }) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  // En servidor no tenemos snapshot ni storage. En cliente, leemos una sola
  // vez al montar para rehidratar la vista que el usuario tenía antes de
  // entrar en la ficha de una gasolinera.
  const initialSnapshot = useRef(readSnapshot()).current;
  const initialLastScope = useRef(readStoredScope()).current;

  const urlSuggestsResults =
    pathname === "/cerca" || pathname.startsWith("/municipio/");

  const canRehydrateManual =
    !initialData &&
    urlSuggestsResults &&
    initialSnapshot &&
    initialSnapshot.scope === "manual" &&
    Array.isArray(initialSnapshot.listadoPrecios) &&
    initialSnapshot.listadoPrecios.length > 0 &&
    initialSnapshot.municipioSeleccionado;

  const initialScope = initialData
    ? "manual"
    : mode === "near"
      ? "near"
      : mode === "manual"
        ? "manual"
        : canRehydrateManual
          ? "manual"
          : urlSuggestsResults
            ? initialSnapshot?.scope || "home"
            : "home";

  const seedSnapshot = !initialData && urlSuggestsResults ? initialSnapshot : null;

  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(
    seedSnapshot?.provinciaSeleccionada || null
  );
  const [provincias, setProvincias] = useState([]);
  const [municipios, setMunicipios] = useState(
    seedSnapshot?.municipios || []
  );
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState(
    initialData?.municipioSeleccionado ||
      seedSnapshot?.municipioSeleccionado ||
      null
  );
  const [listadoPrecios, setListadoPrecios] = useState(
    initialData?.listadoPrecios || seedSnapshot?.listadoPrecios || []
  );
  const [loadingPrecios, setLoadingPrecios] = useState(false);
  const [fechaActualizacion, setFechaActualizacion] = useState(
    initialData?.fechaActualizacion ||
      seedSnapshot?.fechaActualizacion ||
      null
  );

  const [selectedFuel, setSelectedFuelState] = useState(() => readStoredFuel());
  const setSelectedFuel = (value) => {
    setSelectedFuelState(value);
    writeStoredFuel(value);
  };
  const effectiveFuel = selectedFuel || DEFAULT_FUEL;

  const [scope, setScope] = useState(initialScope);
  const [sortBy, setSortBy] = useState(seedSnapshot?.sortBy || "price");
  const [nearMeError, setNearMeError] = useState(null);
  const [nearMePhase, setNearMePhase] = useState(null);
  const [viewMode, setViewMode] = useState(() => {
    const stored = seedSnapshot?.viewMode;
    return stored && VALID_VIEWMODES.has(stored) ? stored : "list";
  });
  const [userPos, setUserPos] = useState(() => {
    const pos = seedSnapshot?.userPos;
    if (!pos || !Number.isFinite(pos.lat) || !Number.isFinite(pos.lng)) return null;
    if (pos.t && Date.now() - pos.t > 10 * 60 * 1000) return null;
    return { lat: pos.lat, lng: pos.lng };
  });
  // Etiqueta humana del origen de la búsqueda "cerca" — bien "Mi ubicación"
  // (vía GPS), bien la dirección que escribió el usuario. Solo se usa para
  // pintar contexto y permitir compartir la búsqueda.
  const [searchOriginLabel, setSearchOriginLabel] = useState(
    seedSnapshot?.searchOriginLabel || null
  );
  const [onlyOpen, setOnlyOpen] = useState(!!seedSnapshot?.onlyOpen);
  const [loadError, setLoadError] = useState(false);
  const [showAllFavs, setShowAllFavs] = useState(false);
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

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(min-width: 900px)");
    const onChange = (e) => setIsDesktop(e.matches);
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
      searchOriginLabel,
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
    searchOriginLabel,
    provinciaSeleccionada,
    municipioSeleccionado,
    municipios,
    listadoPrecios,
    fechaActualizacion,
  ]);

  // Si llegamos con initialData (SSR de /municipio/:id[/:slug]) marcamos el
  // ID como "ya cargado" en el ref para que el effect URL→estado no se
  // dispare con la consecuencia de pintar "Cargando…" sobre datos válidos.
  const lastFetchedMunicipioRef = useRef(
    initialData?.municipioSeleccionado?.IDMunicipio
      ? String(initialData.municipioSeleccionado.IDMunicipio)
      : canRehydrateManual && seedSnapshot?.municipioSeleccionado?.IDMunicipio
        ? String(seedSnapshot.municipioSeleccionado.IDMunicipio)
        : null
  );

  useEffect(() => {
    if (pathname === "/") {
      lastFetchedMunicipioRef.current = null;
      if (scope !== "home") setScope("home");
      return undefined;
    }

    if (pathname === "/cerca") {
      if (scope !== "near") setScope("near");
      // Auto-trigger solo si el usuario llega "en frío": sin resultados,
      // sin error y sin posición ya elegida.
      if (
        listadoPrecios.length === 0 &&
        !loadingPrecios &&
        !nearMeError &&
        !userPos
      ) {
        // Si la URL trae ?lat&lng (compartida o refresh), prefiero la
        // posición ya codificada — el destinatario debe ver lo mismo que
        // el remitente, no su propio GPS.
        let urlPreset = null;
        if (typeof window !== "undefined") {
          const qp = new URLSearchParams(window.location.search);
          const qLat = parseFloat(qp.get("lat"));
          const qLng = parseFloat(qp.get("lng"));
          if (
            Number.isFinite(qLat) &&
            Number.isFinite(qLng) &&
            qLat >= -90 &&
            qLat <= 90 &&
            qLng >= -180 &&
            qLng <= 180
          ) {
            urlPreset = { lat: qLat, lng: qLng, label: qp.get("q") || null };
          }
        }
        const t = setTimeout(() => {
          if (!isMountedRef.current) return;
          if (urlPreset) {
            // syncUrl=false: la URL ya viene con los params, no la pisamos.
            runNearbySearch({
              preset: { lat: urlPreset.lat, lng: urlPreset.lng },
              label: urlPreset.label,
              syncUrl: false,
            });
          } else {
            handleNearMe();
          }
        }, 0);
        return () => clearTimeout(t);
      }
      return undefined;
    }

    if (pathname === "/municipio") {
      if (scope !== "manual") setScope("manual");
      lastFetchedMunicipioRef.current = null;
      if (municipioSeleccionado || listadoPrecios.length > 0) {
        setListadoPrecios([]);
        setMunicipioSeleccionado(null);
      }
      return undefined;
    }

    if (pathname.startsWith("/municipio/") && params?.idMunicipio) {
      const idMun = String(params.idMunicipio);
      if (scope !== "manual") setScope("manual");

      if (lastFetchedMunicipioRef.current === idMun) {
        if (municipioSeleccionado?.Municipio) {
          const canonical = slugify(municipioSeleccionado.Municipio);
          if (canonical && params.slug !== canonical) {
            router.replace(`/municipio/${idMun}/${canonical}`);
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

          if (nombre) {
            const canonical = slugify(nombre);
            if (canonical && params.slug !== canonical) {
              router.replace(`/municipio/${idMun}/${canonical}`);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, params?.idMunicipio, params?.slug]);

  // Codifica una búsqueda "cerca" como URL ?lat&lng&q. La compartimos para
  // que el destinatario aterrice en EL MISMO punto, no en su GPS. 5 decimales
  // ≈ 1 m: suficiente sin filtrar metadatos GPS.
  const buildCercaPath = (point) => {
    if (!point || !Number.isFinite(point.lat) || !Number.isFinite(point.lng)) {
      return "/cerca";
    }
    const params = new URLSearchParams();
    params.set("lat", point.lat.toFixed(5));
    params.set("lng", point.lng.toFixed(5));
    if (point.label && point.label !== "Mi ubicación") {
      params.set("q", point.label);
    }
    return `/cerca?${params.toString()}`;
  };

  // Resuelve la posición (vía GPS o vía geocoder previo), descarga el
  // listado nacional y filtra las 50 más cercanas. Centralizamos para que
  // "Cerca de mí" (GPS) y "Buscar dirección" (Nominatim) compartan código.
  const runNearbySearch = async ({
    preset = null,
    label = null,
    syncUrl = true,
  } = {}) => {
    if (loadingPrecios) return;
    const requestId = ++nearMeRequestIdRef.current;
    setLoadingPrecios(true);
    setNearMePhase(preset ? "fetch" : "geo");
    setScope("near");
    writeStoredScope("near");
    setSortBy("price");
    setViewMode("map");
    setProvinciaSeleccionada(null);
    setMunicipioSeleccionado(null);
    setListadoPrecios([]);
    setNearMeError(null);

    // Si arrancamos con una posición concreta (dirección o coords),
    // sincronizamos la URL para que esa búsqueda sea compartible y
    // refrescable. Para GPS sin label dejamos /cerca limpia hasta que
    // tengamos coordenadas (las añade el bloque post-fetch).
    if (syncUrl && preset && pathname === "/cerca") {
      const next = buildCercaPath({ ...preset, label });
      router.replace(next);
    }

    try {
      let location = preset;
      const resolvedLabel = label;
      if (!location) {
        location = await getUserLocation();
        if (
          isMountedRef.current &&
          requestId === nearMeRequestIdRef.current
        ) {
          setNearMePhase("fetch");
        }
      }

      // Reverse geocoding "best effort": sin él la búsqueda funciona, solo
      // lo usamos para mostrar "Cerca de Calle X" en vez de coords crudas.
      // Lo disparamos siempre que NO tengamos un label explícito (GPS sin
      // etiqueta o link compartido `/cerca?lat&lng` sin q).
      if (!resolvedLabel) {
        reverseGeocode(location.lat, location.lng)
          .then((g) => {
            if (
              g &&
              g.label &&
              isMountedRef.current &&
              requestId === nearMeRequestIdRef.current
            ) {
              setSearchOriginLabel(g.label);
            }
          })
          .catch(() => {
            /* sin label, no es crítico */
          });
      }

      const allStationsData = await fetchTodasLasEstaciones();
      if (!isMountedRef.current || requestId !== nearMeRequestIdRef.current) {
        return;
      }
      setUserPos({ lat: location.lat, lng: location.lng });
      const finalLabel = resolvedLabel || (preset ? null : "Mi ubicación");
      setSearchOriginLabel(finalLabel);
      // Para búsquedas vía GPS sin preset también sincronizamos la URL una
      // vez tenemos coords resueltas, para que el botón Compartir genere un
      // enlace que apunte exactamente a esta zona.
      if (syncUrl && !preset && pathname === "/cerca") {
        const next = buildCercaPath({
          lat: location.lat,
          lng: location.lng,
          label: finalLabel,
        });
        router.replace(next);
      }
      const allStations = allStationsData.ListaEESSPrecio || [];

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
      const name = err && (err.name || err.code);
      const message = (err && err.message) || "";
      const denied =
        name === "PermissionDeniedError" ||
        name === 1 ||
        /denied|denegad|permission/i.test(message);
      setNearMeError(denied ? "permission" : "generic");
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

  const handleNearMe = () => runNearbySearch();
  const handleNearByAddress = (point) =>
    runNearbySearch({ preset: point, label: point?.label || null });

  const handleManualSearchClick = () => {
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
    router.push("/municipio");
  };

  const goNearMe = () => {
    if (loadingPrecios) return;
    setListadoPrecios([]);
    setMunicipioSeleccionado(null);
    setProvinciaSeleccionada(null);
    setNearMeError(null);
    lastFetchedMunicipioRef.current = null;
    router.push("/cerca");
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
    router.push("/");
  };

  const navigateToMunicipio = (municipio) => {
    if (!municipio || !municipio.IDMunicipio) return;
    const slug = slugify(municipio.Municipio || "");
    const id = municipio.IDMunicipio;
    if (slug) router.push(`/municipio/${id}/${slug}`);
    else router.push(`/municipio/${id}`);
  };

  // Disparado desde la home cuando el usuario selecciona una dirección en el
  // LocationSearch. Pusheamos directamente a /cerca?lat&lng&q: el effect de
  // pathname leerá los params y disparará runNearbySearch con preset.
  // Así, una sola navegación basta y la URL queda lista para compartir.
  const handleLocationFromHome = (point) => {
    if (!point) return;
    router.push(buildCercaPath(point));
  };

  const handleUseMyLocationFromHome = () => {
    nearMeRequestIdRef.current++;
    setListadoPrecios([]);
    setMunicipioSeleccionado(null);
    setProvinciaSeleccionada(null);
    setNearMeError(null);
    lastFetchedMunicipioRef.current = null;
    router.push("/cerca");
  };

  const showHome = scope === "home";
  const showResults = listadoPrecios.length > 0 || loadingPrecios;

  // Genera el payload de share para WhatsApp/Telegram/Email. Se invoca al
  // pulsar Compartir para que el texto refleje el ESTADO ACTUAL (mínimos
  // y filtros pueden haber cambiado tras el último render).
  const buildShareData = () => {
    const fechaLine = fechaActualizacion
      ? `Actualizado el ${fechaActualizacion}.`
      : null;
    const lowest = getLowestPrices(listadoPrecios);
    const tieneAlguno = Object.values(lowest).some((v) => v !== null);
    const fmt = (n) =>
      typeof n === "number" ? `${n.toFixed(3).replace(".", ",")} €/L` : null;
    const lineas = [];
    if (lowest["Precio Gasolina 95 E5"] !== null) {
      lineas.push(
        `· Gasolina 95 desde ${fmt(lowest["Precio Gasolina 95 E5"])}`
      );
    }
    if (lowest["Precio Gasoleo A"] !== null) {
      lineas.push(`· Diésel desde ${fmt(lowest["Precio Gasoleo A"])}`);
    }
    if (lowest["Precio Gasolina 98 E5"] !== null) {
      lineas.push(
        `· Gasolina 98 desde ${fmt(lowest["Precio Gasolina 98 E5"])}`
      );
    }

    if (scope === "manual" && municipioSeleccionado?.IDMunicipio) {
      const nombre = municipioSeleccionado.Municipio || "este municipio";
      const provincia = municipioSeleccionado.Provincia || "";
      const totalLine =
        listadoPrecios.length > 0
          ? `${listadoPrecios.length} ${
              listadoPrecios.length === 1 ? "gasolinera" : "gasolineras"
            } en ${nombre}${provincia ? ` (${provincia})` : ""}.`
          : `Gasolineras en ${nombre}${provincia ? ` (${provincia})` : ""}.`;
      const slug = slugify(nombre);
      const path = slug
        ? `/municipio/${municipioSeleccionado.IDMunicipio}/${slug}`
        : `/municipio/${municipioSeleccionado.IDMunicipio}`;
      const url = absoluteUrl(path);
      const text = [
        `⛽ ${totalLine}`,
        tieneAlguno
          ? `Mejores precios hoy:\n${lineas.join("\n")}`
          : null,
        fechaLine,
      ]
        .filter(Boolean)
        .join("\n\n");
      const preview = tieneAlguno
        ? `${totalLine} ${lineas.join(" · ")}`
        : totalLine;
      return {
        title: `Gasolineras en ${nombre}${provincia ? ` · ${provincia}` : ""}`,
        text,
        url,
        preview,
      };
    }

    if (scope === "near") {
      const origen = searchOriginLabel || "tu zona";
      const totalLine =
        listadoPrecios.length > 0
          ? `${listadoPrecios.length} ${
              listadoPrecios.length === 1
                ? "gasolinera"
                : `gasolineras más cercanas`
            } a ${origen}.`
          : `Gasolineras cerca de ${origen}.`;
      // Compartimos la URL con la posición codificada, NO solo /cerca:
      // así quien la abre ve la misma zona, no su propio GPS.
      const url = userPos
        ? absoluteUrl(
            buildCercaPath({
              lat: userPos.lat,
              lng: userPos.lng,
              label: searchOriginLabel,
            })
          )
        : absoluteUrl("/cerca");
      const text = [
        `⛽ ${totalLine}`,
        tieneAlguno
          ? `Mejores precios ahora:\n${lineas.join("\n")}`
          : null,
        fechaLine,
      ]
        .filter(Boolean)
        .join("\n\n");
      const preview = tieneAlguno
        ? `${totalLine} ${lineas.join(" · ")}`
        : totalLine;
      return {
        title: `Gasolineras cerca de ${origen}`,
        text,
        url,
        preview,
      };
    }

    return null;
  };

  const shareReady =
    !loadingPrecios &&
    listadoPrecios.length > 0 &&
    ((scope === "manual" && !!municipioSeleccionado?.IDMunicipio) ||
      scope === "near");

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

  const manualNoMunicipios =
    scope === "manual" &&
    !!provinciaSeleccionada &&
    !municipioSeleccionado &&
    municipios.length === 0;

  const visibleFavs = showAllFavs ? favorites : favorites.slice(0, 6);

  return (
    <main id="main">
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
            <div className="home__locsearch">
              <LocationSearch
                placeholder="Busca una dirección, calle, CP o ciudad"
                onSelectLocation={handleLocationFromHome}
                onUseMyLocation={handleUseMyLocationFromHome}
              />
              <p className="home__locsearch-hint">
                Escribe una dirección o pulsa <strong>Usar mi ubicación</strong>{" "}
                para ver las gasolineras cercanas.
              </p>
            </div>
            <button
              type="button"
              className={`bigbtn${initialLastScope === "near" ? " bigbtn--recent" : ""}`}
              onClick={goNearMe}
              disabled={loadingPrecios}
              aria-busy={loadingPrecios || undefined}
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
                      href={`/gasolinera/${fav.idMunicipio}/${fav.ideess}`}
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
              {shareReady && (
                <ShareButton
                  className="toolbar__share"
                  variant="ghost"
                  size="md"
                  iconOnly
                  ariaLabel={
                    scope === "manual"
                      ? `Compartir gasolineras en ${
                          municipioSeleccionado?.Municipio || "este municipio"
                        }`
                      : "Compartir esta búsqueda"
                  }
                  getShare={buildShareData}
                />
              )}
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

          {scope === "near" && (
            <section className="nearbar" aria-label="Búsqueda de ubicación">
              <LocationSearch
                placeholder="Cambia de zona: dirección, calle o CP"
                onSelectLocation={handleNearByAddress}
                onUseMyLocation={handleNearMe}
                busy={loadingPrecios}
              />
              {searchOriginLabel && !loadingPrecios && (
                <p className="nearbar__origin">
                  Resultados cerca de{" "}
                  <strong>{searchOriginLabel}</strong>
                </p>
              )}
            </section>
          )}

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
            <MapView
              listadoPrecios={listadoPrecios}
              selectedFuel={effectiveFuel}
              userPos={scope === "near" ? userPos : null}
              onlyOpen={onlyOpen}
            />
          )}

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
