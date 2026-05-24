"use client";

/* eslint-disable react/prop-types */
import { useRouter } from "next/navigation";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { fetchGasolineraPorID } from "../../utils/api";
import { formatHorario, isOpenNow } from "../../utils/formatHorario";
import "./Gasolinera.css";
import { getLogoForGasolinera } from "../../utils/logoUtils";
import FavoriteButton from "../Favorites/FavoriteButton";
import { useTheme } from "../../hooks/useTheme";

// Lazy: recharts pesa ~75KB gzip y dispara 7 fetches secuenciales al montar.
// Solo se carga cuando el usuario pulsa "Ver histórico".
const PriceHistoryChart = lazy(
  () => import("../PriceHistoryChart/PriceHistoryChart")
);

// El mapa entra por dynamic-import sin SSR para no romper la pintura inicial
// de la ficha: Leaflet referencia `window` al cargar el módulo, así que no
// puede vivir en el bundle de servidor.
const StationMap = dynamic(
  () => import("./StationMap"),
  {
    ssr: false,
    loading: () => (
      <div className="loading" role="status" aria-live="polite">
        <div className="loading__bar" aria-hidden="true" />
        <span>Cargando mapa…</span>
      </div>
    ),
  }
);

const PRECIOS = [
  { etiqueta: "Diésel A", campo: "Precio Gasoleo A" },
  { etiqueta: "Diésel +", campo: "Precio Gasoleo Premium" },
  { etiqueta: "Gasolina 95", campo: "Precio Gasolina 95 E5" },
  { etiqueta: "Gasolina 98", campo: "Precio Gasolina 98 E5" },
];

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

function Gasolinera({ idMunicipio, idGasolinera, initialStation = null }) {
  const router = useRouter();
  const { resolved: theme } = useTheme();
  const [gasolinera, setGasolinera] = useState(initialStation);
  const [loading, setLoading] = useState(!initialStation);
  const [error, setError] = useState("");
  // En cliente intentamos rehidratar el último fix de GPS del snapshot de la
  // home. En servidor no hay sessionStorage: arrancamos sin posición.
  const [userPos, setUserPos] = useState(() => {
    if (typeof sessionStorage === "undefined") return null;
    try {
      const raw = sessionStorage.getItem("main.snapshot");
      if (!raw) return null;
      const data = JSON.parse(raw);
      const pos = data?.userPos;
      if (!pos || !Number.isFinite(pos.lat) || !Number.isFinite(pos.lng))
        return null;
      if (pos.t && Date.now() - pos.t > 10 * 60 * 1000) return null;
      return { lat: pos.lat, lng: pos.lng };
    } catch {
      return null;
    }
  });
  const [mapsSheetOpen, setMapsSheetOpen] = useState(false);
  const [rememberChoice, setRememberChoice] = useState(true);
  const [preferredMaps, setPreferredMaps] = useState(() => readPreferredMaps());
  const [toastMsg, setToastMsg] = useState("");
  const [sharing, setSharing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const isMobile = useMemo(() => isMobileLikely(), []);
  const sheetRef = useRef(null);
  const triggerRef = useRef(null);
  const toastTimerRef = useRef(null);

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length <= 1) {
      router.push("/");
    } else {
      router.back();
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

  // Si llegamos con initialStation (SSR), no refetcheamos: la API del MITECO
  // es lenta y los datos ya han sido validados por el servidor.
  useEffect(() => {
    if (initialStation) return undefined;
    if (!idMunicipio || !idGasolinera) {
      setError("Parámetros de gasolinera no válidos");
      setLoading(false);
      return undefined;
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
  }, [idMunicipio, idGasolinera, initialStation]);

  useEffect(() => {
    if (userPos) return undefined;
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      return undefined;
    }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const preferredFuel = useMemo(() => readPreferredFuel(), []);

  useEffect(() => {
    if (!mapsSheetOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMapsSheetOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mapsSheetOpen]);

  useEffect(() => {
    if (mapsSheetOpen) {
      const t = setTimeout(() => {
        const first = sheetRef.current?.querySelector(".mapssheet__option");
        if (first) first.focus();
      }, 0);
      return () => clearTimeout(t);
    }
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
          <button type="button" onClick={() => router.push("/")}>
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
  const localProvSame =
    !!localidad &&
    !!provincia &&
    localidad.trim().toLowerCase() === provincia.trim().toLowerCase();
  const localidadConCp = cp && localidad ? `${cp} ${localidad}` : localidad || cp;
  const direccionLine = localProvSame
    ? [direccion, localidadConCp].filter(Boolean).join(", ")
    : [direccion, localidadConCp, provincia].filter(Boolean).join(", ");

  const openStatus = isOpenNow(gasolinera.Horario);

  const tipoVenta = gasolinera["Tipo Venta"];
  const ventaRestringida = tipoVenta === "R";

  const extras = EXTRAS.map(({ etiqueta, campo }) => ({
    etiqueta,
    campo,
    valor: formatearPrecio(gasolinera[campo]),
  })).filter((e) => e.valor);
  const hasAdblue = extras.some((e) => e.campo === "Precio Adblue");
  const hasGlp = extras.some(
    (e) => e.campo === "Precio Gases licuados del petróleo"
  );

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

  const preciosConValor = precios.filter((p) => p.valor);
  let principal =
    (preferredFuel &&
      precios.find((p) => p.campo === preferredFuel && p.valor)) ||
    null;
  if (!principal && preciosConValor.length === 1) {
    principal = preciosConValor[0];
  }

  const otros = precios.filter((p) => p !== principal);

  const chartFuels = preciosConValor.map(({ etiqueta, campo }) => ({
    etiqueta,
    campo,
  }));
  const chartDefaultFuel = principal?.campo || chartFuels[0]?.campo || null;

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
    if (!isMobile) return;
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

    const ubicacion = [direccion, localidad].filter(Boolean).join(", ");
    const cabecera = ubicacion
      ? `Ahora mismo en ${rotulo}\n${ubicacion}`
      : `Ahora mismo en ${rotulo}`;

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

      {principal && principal.valor && (
        <section className="bigprice" aria-label="Precio principal">
          <div className="bigprice__label">{principal.etiqueta}</div>
          <div className="bigprice__value">
            <span className="bigprice__num">{principal.valor}</span>
            <span className="bigprice__unit">€/L</span>
          </div>
        </section>
      )}

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

      <section className="schedule" aria-label="Horario">
        <h2 className="section-title">Horario</h2>
        <div className="schedule__content">
          {formatHorario(gasolinera.Horario)}
        </div>
      </section>

      {hasCoords && (
        <section className="mapsec" aria-label="Ubicación">
          <h2 className="section-title">Ubicación</h2>
          <div
            className="mapsec__frame"
            aria-label="Mapa con la ubicación de la gasolinera"
          >
            <StationMap
              lat={lat}
              lng={lng}
              rotulo={rotulo}
              theme={theme}
              scrollWheelZoom={isDesktop}
            />

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

      {chartFuels.length > 0 && gasolinera.IDMunicipio && gasolinera.IDEESS && (
        showHistory ? (
          <Suspense
            fallback={
              <div className="loading" role="status" aria-live="polite">
                <div className="loading__bar" aria-hidden="true" />
                <span>Cargando histórico…</span>
              </div>
            }
          >
            <PriceHistoryChart
              idMunicipio={gasolinera.IDMunicipio}
              idEstacion={gasolinera.IDEESS}
              fuels={chartFuels}
              defaultFuel={chartDefaultFuel}
            />
          </Suspense>
        ) : (
          <section className="histtoggle" aria-label="Histórico de precios">
            <button
              type="button"
              className="histtoggle__btn"
              onClick={() => setShowHistory(true)}
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M3 17l5-5 4 4 7-9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Ver histórico de precios
            </button>
          </section>
        )
      )}

      <footer className="station__foot">
        {gasolinera["Toma de datos"] && (
          <p>Última actualización: {gasolinera["Toma de datos"]}</p>
        )}
        <p>Datos: Ministerio para la Transición Ecológica (MITECO).</p>
      </footer>

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

      {toastMsg && (
        <div className="toast" role="status" aria-live="polite">
          {toastMsg}
        </div>
      )}

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
