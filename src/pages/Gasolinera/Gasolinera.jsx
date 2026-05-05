import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { fetchGasolineraPorID } from "../../utils/api";
import { formatHorario, isOpenNow } from "../../utils/formatHorario";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "./Gasolinera.css";
import { getLogoForGasolinera } from "../../utils/logoUtils";
import FavoriteButton from "../../components/Favorites/FavoriteButton";
import { useTheme } from "../../hooks/useTheme";

const TILE_URL = {
  light:
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  dark: "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png",
};

const PRECIOS = [
  { etiqueta: "Diésel A", campo: "Precio Gasoleo A" },
  { etiqueta: "Diésel +", campo: "Precio Gasoleo Premium" },
  { etiqueta: "Gasolina 95", campo: "Precio Gasolina 95 E5" },
  { etiqueta: "Gasolina 98", campo: "Precio Gasolina 98 E5" },
];

// Productos adicionales que mostramos en la sección "Otros combustibles"
// SOLO si la estación los tiene. No entran en `principal` para no robarle
// el sitio al combustible preferido del usuario.
const EXTRAS = [
  { etiqueta: "AdBlue", campo: "Precio Adblue" },
  { etiqueta: "GLP / Autogas", campo: "Precio Gases licuados del petróleo" },
  { etiqueta: "Hidrógeno", campo: "Precio Hidrogeno" },
  { etiqueta: "Gasolina 95 E10", campo: "Precio Gasolina 95 E10" },
];

const FUEL_PREF_KEY = "fuel.preferred";
const MAPS_PREF_KEY = "maps.preferred";
const MAPS_OPTIONS = ["google", "apple", "waze"];

const isMobileLikely = () => {
  if (typeof window === "undefined") return false;
  try {
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
      return true;
    }
  } catch {
    // ignore
  }
  if (typeof navigator !== "undefined" && navigator.userAgent) {
    return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  }
  return false;
};

const readPreferredMaps = () => {
  try {
    const v = localStorage.getItem(MAPS_PREF_KEY);
    return MAPS_OPTIONS.includes(v) ? v : null;
  } catch {
    return null;
  }
};

const writePreferredMaps = (value) => {
  try {
    localStorage.setItem(MAPS_PREF_KEY, value);
  } catch {
    // ignore
  }
};

const formatearPrecio = (valor) => {
  if (valor === undefined || valor === null) return null;
  const texto = String(valor).trim();
  if (!texto || texto === "-") return null;
  const num = parseFloat(texto.replace(",", "."));
  if (!Number.isFinite(num) || num <= 0) return null;
  return texto;
};

const readPreferredFuel = () => {
  try {
    return localStorage.getItem(FUEL_PREF_KEY);
  } catch {
    return null;
  }
};

// Pin custom dibujado por CSS, sin emojis ni recursos externos.
const stationPin = L.divIcon({
  className: "map-pin-wrap",
  html: '<span class="map-pin"><span class="map-pin__dot"></span></span>',
  iconSize: [28, 36],
  iconAnchor: [14, 32],
  popupAnchor: [0, -28],
});

// Distancia haversine en km (para la pequeña línea de la cabecera).
const distanciaKm = (a, b) => {
  if (!a || !b) return null;
  const R = 6371;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

const formatKm = (km) => {
  if (km === null || km === undefined || !Number.isFinite(km)) return null;
  if (km < 1) return `${Math.round(km * 1000)} m`;
  if (km < 10) return `${km.toFixed(1).replace(".", ",")} km`;
  return `${Math.round(km)} km`;
};

// Pequeño componente: aplica un flyTo al cargar el mapa.
// eslint-disable-next-line react/prop-types
function MapFlyTo({ position, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (!position) return;
    map.flyTo(position, zoom, { duration: 0.7 });
  }, [map, position, zoom]);
  return null;
}

// FAB para recentrar el mapa en la gasolinera (cuando el usuario lo ha
// arrastrado a otra zona). Tamaño de touch >= 44px.
// eslint-disable-next-line react/prop-types
function RecenterFAB({ position, zoom }) {
  const map = useMap();
  if (!position) return null;
  return (
    <button
      type="button"
      className="mapsec__recenter"
      aria-label="Centrar en la gasolinera"
      onClick={() => map.flyTo(position, zoom, { duration: 0.5 })}
    >
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          cx="12"
          cy="12"
          r="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M12 2v3M12 19v3M2 12h3M19 12h3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

function Gasolinera() {
  const { idMunicipio, idGasolinera } = useParams();
  const navigate = useNavigate();
  const { resolved: theme } = useTheme();
  const [gasolinera, setGasolinera] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userPos, setUserPos] = useState(null);
  const [mapsSheetOpen, setMapsSheetOpen] = useState(false);
  const [rememberChoice, setRememberChoice] = useState(true);
  const [preferredMaps, setPreferredMaps] = useState(() => readPreferredMaps());
  const [toastMsg, setToastMsg] = useState("");
  const [sharing, setSharing] = useState(false);
  const isMobile = useMemo(() => isMobileLikely(), []);
  const sheetRef = useRef(null);
  const triggerRef = useRef(null);
  const toastTimerRef = useRef(null);

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length <= 1) {
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastMsg(""), 2500);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const openMapsSheetFrom = (el) => {
    triggerRef.current = el || null;
    setMapsSheetOpen(true);
  };

  useEffect(() => {
    if (!idMunicipio || !idGasolinera) {
      setError("Parámetros de gasolinera no válidos");
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchGasolineraPorID(idMunicipio, idGasolinera);
        if (!cancelled) setGasolinera(data || null);
      } catch (err) {
        if (!cancelled && err.name !== "AbortError") setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [idMunicipio, idGasolinera]);

  // Geolocalización ligera y silenciosa para mostrar km en la cabecera.
  useEffect(() => {
    if (!("geolocation" in navigator)) return;
    let cancelled = false;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (cancelled) return;
        setUserPos({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {},
      { enableHighAccuracy: false, maximumAge: 5 * 60 * 1000, timeout: 4000 }
    );
    return () => {
      cancelled = true;
    };
  }, []);

  const preferredFuel = useMemo(() => readPreferredFuel(), []);

  // Cierre del sheet con Escape.
  useEffect(() => {
    if (!mapsSheetOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMapsSheetOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mapsSheetOpen]);

  // Focus management del sheet: al abrir, foco al primer botón;
  // al cerrar, devolver el foco al disparador.
  useEffect(() => {
    if (mapsSheetOpen) {
      // Pequeño defer para esperar al render del panel.
      const t = setTimeout(() => {
        const first = sheetRef.current?.querySelector(
          ".mapssheet__option"
        );
        if (first) first.focus();
      }, 0);
      return () => clearTimeout(t);
    }
    // Al cerrar, devolver el foco si tenemos referencia y sigue en el DOM.
    const trigger = triggerRef.current;
    if (trigger && typeof trigger.focus === "function") {
      try {
        trigger.focus();
      } catch {
        // ignore
      }
    }
    return undefined;
  }, [mapsSheetOpen]);

  if (loading) {
    return (
      <main className="station">
        <div className="loading" role="status" aria-live="polite">
          <div className="loading__bar" aria-hidden="true" />
          <span>Cargando…</span>
        </div>
      </main>
    );
  }

  if (error || !gasolinera) {
    return (
      <main className="station">
        <button type="button" className="linkback" onClick={goBack}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            focusable="false"
            width="16"
            height="16"
          >
            <path
              d="M15 6 9 12l6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Volver
        </button>
        <div className="errorbox" role="alert">
          <p>{error || "No hemos encontrado esta gasolinera."}</p>
          <button type="button" onClick={() => navigate("/")}>
            Ir al inicio
          </button>
        </div>
      </main>
    );
  }

  const rawLat = gasolinera["Latitud"];
  const rawLng = gasolinera["Longitud (WGS84)"];
  const lat =
    typeof rawLat === "string"
      ? parseFloat(rawLat.replace(",", "."))
      : Number(rawLat);
  const lng =
    typeof rawLng === "string"
      ? parseFloat(rawLng.replace(",", "."))
      : Number(rawLng);
  const hasCoords = Number.isFinite(lat) && Number.isFinite(lng);

  const rotulo = gasolinera["Rótulo"] || "Gasolinera";
  const direccion = gasolinera.Dirección || "";
  const cp = (gasolinera["C.P."] || "").trim();
  const localidad = gasolinera.Localidad || "";
  const provincia = gasolinera.Provincia || "";
  // Si la localidad coincide con la provincia (caso típico de capitales),
  // evitamos duplicar y mostramos solo una.
  const localProvSame =
    !!localidad &&
    !!provincia &&
    localidad.trim().toLowerCase() === provincia.trim().toLowerCase();
  // Convención española: "calle, 28013 Madrid, Madrid". El CP precede a la
  // localidad, no se separa con coma de ella.
  const localidadConCp = cp && localidad ? `${cp} ${localidad}` : localidad || cp;
  const direccionLine = localProvSame
    ? [direccion, localidadConCp].filter(Boolean).join(", ")
    : [direccion, localidadConCp, provincia].filter(Boolean).join(", ");

  // Estado abierto/cerrado en este momento.
  const openStatus = isOpenNow(gasolinera.Horario);

  // Tipo de venta: "R" = restringido (cooperativas, flotas).
  const tipoVenta = gasolinera["Tipo Venta"];
  const ventaRestringida = tipoVenta === "R";

  // Productos extra (AdBlue, GLP, H2, E10) que la estación tenga disponibles.
  const extras = EXTRAS.map(({ etiqueta, campo }) => ({
    etiqueta,
    campo,
    valor: formatearPrecio(gasolinera[campo]),
  })).filter((e) => e.valor);
  const hasAdblue = extras.some((e) => e.campo === "Precio Adblue");
  const hasGlp = extras.some(
    (e) => e.campo === "Precio Gases licuados del petróleo"
  );

  // Margen de la vía: "D" derecho, "I" izquierdo. Útil para autovías.
  const margen = gasolinera["Margen"];
  const margenLabel =
    margen === "D"
      ? "Margen derecho"
      : margen === "I"
        ? "Margen izquierdo"
        : null;

  const precios = PRECIOS.map(({ etiqueta, campo }) => ({
    etiqueta,
    campo,
    valor: formatearPrecio(gasolinera[campo]),
  }));

  // Precio principal: el que el usuario haya elegido como preferido si está
  // disponible. Si solo hay 1 precio en total, ese pasa a ser principal aunque
  // no coincida con la preferencia (no tiene sentido relegarlo a "otros").
  const preciosConValor = precios.filter((p) => p.valor);
  let principal =
    (preferredFuel &&
      precios.find((p) => p.campo === preferredFuel && p.valor)) ||
    null;
  if (!principal && preciosConValor.length === 1) {
    principal = preciosConValor[0];
  }

  const otros = precios.filter((p) => p !== principal);

  const km =
    hasCoords && userPos
      ? distanciaKm(userPos, { lat, lng })
      : null;
  const kmText = formatKm(km);

  const coordStr = hasCoords ? `${lat},${lng}` : null;

  const mapsHref = hasCoords
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        coordStr
      )}`
    : null;

  const appleMapsHref = hasCoords
    ? `https://maps.apple.com/?daddr=${encodeURIComponent(
        coordStr
      )}&dirflg=d`
    : null;

  const wazeHref = hasCoords
    ? `https://www.waze.com/ul?ll=${encodeURIComponent(
        coordStr
      )}&navigate=yes`
    : null;

  const mapsViewHref = hasCoords
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        coordStr
      )}`
    : null;

  const hrefForProvider = (provider) => {
    if (provider === "apple") return appleMapsHref;
    if (provider === "waze") return wazeHref;
    return mapsHref;
  };

  const openProvider = (provider) => {
    const url = hrefForProvider(provider);
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleDirectionsClick = (e) => {
    if (!hasCoords) return;
    if (!isMobile) return; // desktop: deja que el <a> abra en nueva pestaña
    e.preventDefault();
    if (preferredMaps) {
      openProvider(preferredMaps);
    } else {
      openMapsSheetFrom(e.currentTarget);
    }
  };

  const handleStickyDirections = (e) => {
    if (!hasCoords) return;
    if (!isMobile) {
      openProvider("google");
      return;
    }
    if (preferredMaps) {
      openProvider(preferredMaps);
    } else {
      openMapsSheetFrom(e?.currentTarget || null);
    }
  };

  const handleSheetKeyDown = (e) => {
    if (e.key !== "Tab") return;
    const panel = sheetRef.current;
    if (!panel) return;
    const focusables = panel.querySelectorAll(
      'button, [href], input, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (e.shiftKey) {
      if (active === first || !panel.contains(active)) {
        e.preventDefault();
        last.focus();
      }
    } else if (active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const handlePickProvider = (provider) => {
    if (rememberChoice) {
      writePreferredMaps(provider);
      setPreferredMaps(provider);
    }
    setMapsSheetOpen(false);
    openProvider(provider);
  };

  const closeMapsSheet = () => setMapsSheetOpen(false);

  const handleShare = async () => {
    if (sharing) return;
    setSharing(true);
    const url = window.location.href;

    // Cabecera en dos líneas: "Ahora mismo en {rotulo}" + dirección.
    // Evitamos separadores tipo · que hacen que el mensaje suene a plantilla.
    const ubicacion = [direccion, localidad].filter(Boolean).join(", ");
    const cabecera = ubicacion
      ? `Ahora mismo en ${rotulo}\n${ubicacion}`
      : `Ahora mismo en ${rotulo}`;

    // Tres precios "famosos" en el orden de PRECIOS (Diésel A, 95, 98).
    // Saltamos los no disponibles para no ensuciar el mensaje.
    const CAMPOS_FAMOSOS = new Set([
      "Precio Gasoleo A",
      "Precio Gasolina 95 E5",
      "Precio Gasolina 98 E5",
    ]);
    const lineasPrecios = precios
      .filter((p) => CAMPOS_FAMOSOS.has(p.campo) && p.valor)
      .map((p) => `${p.etiqueta}: ${p.valor} €/L`);

    const texto = lineasPrecios.length
      ? `${cabecera}\n\n${lineasPrecios.join("\n")}`
      : cabecera;

    const shareData = {
      title: `Gasolinera ${rotulo}`,
      text: texto,
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setSharing(false);
        return;
      } catch (err) {
        if (err && err.name === "AbortError") {
          setSharing(false);
          return;
        }
      }
    }

    // Sin Web Share: copiamos texto + URL para que se peguen juntos.
    const copiaCompleta = `${texto}\n${url}`;
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(copiaCompleta);
        showToast("Copiado al portapapeles");
        setSharing(false);
        return;
      } catch {
        // fallback
      }
    }

    window.prompt("Copia este enlace para compartir:", copiaCompleta);
    setSharing(false);
  };

  // Detección simple desktop vs móvil para tweaks del mapa (no SSR).
  const isDesktop =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(min-width: 720px)").matches;

  return (
    <main className="station">
      <button
        type="button"
        className="station__back"
        onClick={goBack}
        aria-label="Volver atrás"
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
        <span className="station__back-label">Volver</span>
      </button>

      {/* 1. Cabecera */}
      <header className="station__head">
        <div className="station__logo">
          <img
            src={`/station-icons/${getLogoForGasolinera(rotulo)}`}
            alt=""
            aria-hidden="true"
          />
        </div>
        <div className="station__heading">
          <h1 className="station__name">{rotulo}</h1>
          {direccionLine && <p className="station__addr">{direccionLine}</p>}
          {(openStatus !== null || margenLabel || hasAdblue || hasGlp) && (
            <div className="station__chips">
              {openStatus === true && (
                <span className="chip chip--open">Abierta</span>
              )}
              {openStatus === false && (
                <span className="chip chip--closed">Cerrada</span>
              )}
              {hasAdblue && (
                <span className="chip chip--adblue">AdBlue</span>
              )}
              {hasGlp && <span className="chip chip--glp">GLP</span>}
              {margenLabel && (
                <span className="chip chip--margen">{margenLabel}</span>
              )}
            </div>
          )}
          {ventaRestringida && (
            <span className="chip chip--restricted" role="note">
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M12 3 2 21h20L12 3Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 10v5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="18" r="1" fill="currentColor" />
              </svg>
              Acceso restringido (cooperativa)
            </span>
          )}
          {kmText && (
            <p className="station__distance">a {kmText} de tu posición</p>
          )}
        </div>
        <FavoriteButton
          station={gasolinera}
          size="lg"
          className="station__fav"
        />
      </header>

      {/* 2. Precio principal en GRANDE */}
      {principal && principal.valor && (
        <section className="bigprice" aria-label="Precio principal">
          <div className="bigprice__label">{principal.etiqueta}</div>
          <div className="bigprice__value">
            <span className="bigprice__num">{principal.valor}</span>
            <span className="bigprice__unit">€/L</span>
          </div>
        </section>
      )}

      {/* 3. Acciones primarias arriba (también persiste el sticky abajo en móvil). */}
      {hasCoords && (
        <section className="actions" aria-label="Acciones">
          <div className="actions__primary-wrap">
            <a
              className="actions__btn actions__btn--primary"
              href={hrefForProvider(preferredMaps) || mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDirectionsClick}
            >
              Cómo llegar
            </a>
            {isMobile && preferredMaps && (
              <button
                type="button"
                className="actions__kebab"
                aria-label="Cambiar a otra app de mapas"
                onClick={(e) => openMapsSheetFrom(e.currentTarget)}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  aria-hidden="true"
                  focusable="false"
                >
                  <circle cx="12" cy="5" r="1.6" fill="currentColor" />
                  <circle cx="12" cy="12" r="1.6" fill="currentColor" />
                  <circle cx="12" cy="19" r="1.6" fill="currentColor" />
                </svg>
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={handleShare}
            disabled={sharing}
            aria-busy={sharing}
            className="actions__btn actions__btn--ghost"
          >
            Compartir
          </button>
        </section>
      )}

      {/* 4. Precios (todos si no hay preferido; o los demás si sí) */}
      {(otros.length > 0 || extras.length > 0) && (
        <section className="otherprices" aria-label="Precios">
          <h2 className="section-title">
            {principal ? "Otros combustibles" : "Precios"}
          </h2>
          <ul className="otherprices__list">
            {otros.map(({ etiqueta, valor }) => (
              <li key={etiqueta} className="otherprices__item">
                <span className="otherprices__label">{etiqueta}</span>
                {valor ? (
                  <span className="otherprices__value">
                    {valor} <small>€/L</small>
                  </span>
                ) : (
                  <span className="otherprices__na">No disponible</span>
                )}
              </li>
            ))}
            {/* Productos extra: solo aparecen si la estación los tiene. */}
            {extras.map(({ etiqueta, valor }) => (
              <li key={etiqueta} className="otherprices__item">
                <span className="otherprices__label">{etiqueta}</span>
                <span className="otherprices__value">
                  {valor} <small>€/L</small>
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 5. Horario */}
      <section className="schedule" aria-label="Horario">
        <h2 className="section-title">Horario</h2>
        <div className="schedule__content">
          {formatHorario(gasolinera.Horario)}
        </div>
      </section>

      {/* 6. Mapa */}
      {hasCoords && (
        <section className="mapsec" aria-label="Ubicación">
          <h2 className="section-title">Ubicación</h2>
          <div
            className="mapsec__frame"
            aria-label="Mapa con la ubicación de la gasolinera"
          >
            <MapContainer
              center={[lat, lng]}
              zoom={15}
              scrollWheelZoom={isDesktop}
              touchZoom={true}
              dragging={true}
              className="mapsec__map"
            >
              <TileLayer
                key={theme}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url={TILE_URL[theme] || TILE_URL.light}
                subdomains={["a", "b", "c", "d"]}
                maxZoom={19}
              />
              <MapFlyTo position={[lat, lng]} zoom={16} />
              <Marker position={[lat, lng]} icon={stationPin}>
                <Popup>{rotulo}</Popup>
              </Marker>
              <RecenterFAB position={[lat, lng]} zoom={16} />
            </MapContainer>

            {mapsViewHref && (
              <a
                className="mapsec__open"
                href={mapsViewHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir en Google Maps
              </a>
            )}
          </div>
        </section>
      )}

      {/* 7. Última actualización + atribución */}
      <footer className="station__foot">
        {gasolinera["Toma de datos"] && (
          <p>Última actualización: {gasolinera["Toma de datos"]}</p>
        )}
        <p>Datos: Ministerio para la Transición Ecológica (MINETUR).</p>
      </footer>

      {/* Sticky inferior en móvil (en desktop se vuelve normal).
          Si no hay coords, no hay nada accionable: ocultamos el sticky
          completo en lugar de dejar el botón Compartir solo. */}
      {hasCoords && (
        <div className="stickybar">
          <button
            type="button"
            onClick={handleShare}
            disabled={sharing}
            aria-busy={sharing}
            className="stickybar__btn stickybar__btn--ghost"
          >
            Compartir
          </button>
          <div className="stickybar__primary-wrap">
            <button
              type="button"
              onClick={handleStickyDirections}
              className="stickybar__btn stickybar__btn--primary"
            >
              Cómo llegar
            </button>
            {isMobile && preferredMaps && (
              <button
                type="button"
                className="stickybar__kebab"
                aria-label="Cambiar a otra app de mapas"
                onClick={(e) => openMapsSheetFrom(e.currentTarget)}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  aria-hidden="true"
                  focusable="false"
                >
                  <circle cx="12" cy="5" r="1.6" fill="currentColor" />
                  <circle cx="12" cy="12" r="1.6" fill="currentColor" />
                  <circle cx="12" cy="19" r="1.6" fill="currentColor" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Toast inline no bloqueante */}
      {toastMsg && (
        <div className="toast" role="status" aria-live="polite">
          {toastMsg}
        </div>
      )}

      {/* Bottom sheet de selección de app de mapas (sólo móvil) */}
      {mapsSheetOpen && hasCoords && (
        <div
          className="mapssheet"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mapssheet-title"
        >
          <button
            type="button"
            className="mapssheet__backdrop"
            aria-label="Cerrar"
            onClick={closeMapsSheet}
          />
          <div
            className="mapssheet__panel"
            ref={sheetRef}
            onKeyDown={handleSheetKeyDown}
          >
            <div className="mapssheet__handle" aria-hidden="true" />
            <h2 id="mapssheet-title" className="mapssheet__title">
              Abrir indicaciones con
            </h2>
            <div className="mapssheet__options">
              <button
                type="button"
                className="mapssheet__option"
                onClick={() => handlePickProvider("google")}
              >
                <span className="mapssheet__option-name">Google Maps</span>
              </button>
              <button
                type="button"
                className="mapssheet__option"
                onClick={() => handlePickProvider("apple")}
              >
                <span className="mapssheet__option-name">Apple Maps</span>
              </button>
              <button
                type="button"
                className="mapssheet__option"
                onClick={() => handlePickProvider("waze")}
              >
                <span className="mapssheet__option-name">Waze</span>
              </button>
            </div>
            <label className="mapssheet__remember">
              <input
                type="checkbox"
                checked={rememberChoice}
                onChange={(e) => setRememberChoice(e.target.checked)}
              />
              <span>Recordar elección</span>
            </label>
            <button
              type="button"
              className="mapssheet__cancel"
              onClick={closeMapsSheet}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Gasolinera;
