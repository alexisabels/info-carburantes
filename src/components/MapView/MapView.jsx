/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { Link, useNavigate } from "react-router-dom";
import { getLowestPrices } from "../../utils/getLowestPrices";
import { isOpenNow } from "../../utils/formatHorario";
import { getLogoForGasolinera } from "../../utils/logoUtils";
import { noPriceLabel } from "../../utils/fuelLabels";
import { useTheme } from "../../hooks/useTheme";
import "./MapView.css";

const TILE_URL = {
  light:
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  dark: "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png",
};

const MAPS_PREF_KEY = "maps.preferred";
const MAPS_OPTIONS = ["google", "apple", "waze"];
const readPreferredMaps = () => {
  try {
    const v = localStorage.getItem(MAPS_PREF_KEY);
    return MAPS_OPTIONS.includes(v) ? v : null;
  } catch {
    return null;
  }
};

const formatPrice = (raw) => {
  if (!raw || raw === "-") return null;
  const n = parseFloat(String(raw).replace(",", "."));
  if (!Number.isFinite(n) || n <= 0) return null;
  return raw;
};

// Detecta desktop por media query, reactivo a cambios de tamaño/orientación.
// Decide qué interacción usamos al pulsar un marker: en desktop, popup
// anclado al marker (más intuitivo, ratón); en móvil, peeksheet abajo.
const DESKTOP_QUERY = "(min-width: 720px)";
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia(DESKTOP_QUERY).matches;
  });
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const mq = window.matchMedia(DESKTOP_QUERY);
    const handler = (e) => setIsDesktop(e.matches);
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, []);
  return isDesktop;
}

// Marker custom: pill redondeada con el precio, sin "cola triangular"
// agresiva. La cheapest tiene anillo verde + halo. Tipografía mono tabular
// asegura que precios distintos no descuadren al ojo.
//
// Hit area 84×44 (Apple HIG mínimo 44pt en táctil). El pill visible es más
// pequeño y se centra en el wrapper; CSS hace que la zona transparente de
// alrededor también capture el tap.
const buildPriceIcon = (priceText, isCheapest, hasPrice) => {
  const classes = ["map-price"];
  if (isCheapest) classes.push("map-price--cheapest");
  if (!hasPrice) classes.push("map-price--na");
  return L.divIcon({
    className: classes.join(" "),
    html: `<span class="map-price__bubble">${priceText}</span>`,
    iconSize: [84, 44],
    iconAnchor: [42, 22],
    popupAnchor: [0, -22],
  });
};

const userIcon = L.divIcon({
  className: "map-userpos",
  html: '<span class="map-userpos__pulse"></span><span class="map-userpos__dot"></span>',
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    if (!points || points.length === 0) return;
    if (points.length === 1) {
      map.setView(points[0], 14, { animate: true });
      return;
    }
    map.fitBounds(points, { padding: [60, 60], maxZoom: 15 });
  }, [map, points]);
  return null;
}

// Icono GPS reutilizado por ambos FABs (centrar y solicitar ubicación).
const GpsIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
    <circle
      cx="12"
      cy="12"
      r="7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M12 2v3M12 19v3M2 12h3M19 12h3"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

function RecenterButton({ userPos, onRequestLocation }) {
  const map = useMap();
  // Si no hay userPos pero el padre nos pasa un callback para pedirla, mostramos
  // un FAB "Ubicarme". Si no hay callback, nos comportamos como antes.
  if (!userPos) {
    if (typeof onRequestLocation !== "function") return null;
    return (
      <button
        type="button"
        className="mapview__fab mapview__fab--locate"
        aria-label="Pedir mi ubicación"
        onClick={onRequestLocation}
      >
        <GpsIcon />
        <span>Ubicarme</span>
      </button>
    );
  }
  return (
    <button
      type="button"
      className="mapview__fab mapview__fab--recenter"
      aria-label="Centrar en mi ubicación"
      onClick={() =>
        map.setView([userPos.lat, userPos.lng], 14, { animate: true })
      }
    >
      <GpsIcon />
    </button>
  );
}

const MapView = ({
  listadoPrecios,
  selectedFuel,
  userPos,
  onlyOpen = false,
  onRequestLocation,
}) => {
  const navigate = useNavigate();
  const { resolved: theme } = useTheme();
  const isDesktop = useIsDesktop();
  // En móvil usamos el peeksheet abajo. En desktop el contenido va en un
  // <Popup> anclado al marker, y `selectedId` no se usa.
  const [selectedId, setSelectedId] = useState(null);

  const lowestPrices = useMemo(
    () => getLowestPrices(listadoPrecios || []),
    [listadoPrecios]
  );

  const stations = useMemo(() => {
    return (listadoPrecios || [])
      .map((s) => {
        const lat = parseFloat(String(s.Latitud).replace(",", "."));
        const lng = parseFloat(String(s["Longitud (WGS84)"]).replace(",", "."));
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
        return { ...s, _lat: lat, _lng: lng };
      })
      .filter(Boolean)
      .filter((s) => {
        if (!onlyOpen) return true;
        return isOpenNow(s.Horario) !== false;
      });
  }, [listadoPrecios, onlyOpen]);

  const points = useMemo(() => {
    const ps = stations.map((s) => [s._lat, s._lng]);
    if (userPos) ps.push([userPos.lat, userPos.lng]);
    return ps;
  }, [stations, userPos]);

  const iconCacheRef = useRef(new Map());
  const getCachedIcon = (priceText, isCheapest, hasPrice) => {
    const key = `${priceText}|${isCheapest ? "1" : "0"}|${hasPrice ? "1" : "0"}`;
    const cache = iconCacheRef.current;
    let icon = cache.get(key);
    if (!icon) {
      icon = buildPriceIcon(priceText, isCheapest, hasPrice);
      cache.set(key, icon);
    }
    return icon;
  };

  const selected = useMemo(
    () => stations.find((s) => s.IDEESS === selectedId) || null,
    [stations, selectedId]
  );

  // Cierre del peek con Escape.
  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  if (stations.length === 0) {
    return (
      <div className="empty">
        <div className="empty__title">Nada que mostrar en el mapa</div>
        {onlyOpen && (
          <div className="empty__hint">
            Desactiva el filtro <em>Abierto ahora</em> y vuelve a probar.
          </div>
        )}
      </div>
    );
  }

  const initialCenter = userPos
    ? [userPos.lat, userPos.lng]
    : [stations[0]._lat, stations[0]._lng];

  // Datos derivados para el peek-sheet
  const buildHrefForProvider = (lat, lng) => {
    const c = `${lat},${lng}`;
    const provider = readPreferredMaps() || "google";
    if (provider === "apple") {
      return `https://maps.apple.com/?daddr=${encodeURIComponent(c)}&dirflg=d`;
    }
    if (provider === "waze") {
      return `https://www.waze.com/ul?ll=${encodeURIComponent(c)}&navigate=yes`;
    }
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(c)}`;
  };

  return (
    <div className="mapview" aria-label="Mapa de gasolineras">
      <MapContainer
        center={initialCenter}
        zoom={13}
        scrollWheelZoom
        zoomControl={false}
        className="mapview__map"
      >
        <TileLayer
          key={theme}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url={TILE_URL[theme] || TILE_URL.light}
          subdomains={["a", "b", "c", "d"]}
          maxZoom={19}
        />
        <FitBounds points={points} />
        <RecenterButton
          userPos={userPos}
          onRequestLocation={onRequestLocation}
        />
        {userPos && (
          <Marker position={[userPos.lat, userPos.lng]} icon={userIcon} />
        )}
        {stations.map((s) => {
          const formatted = formatPrice(s[selectedFuel]);
          const numeric = formatted
            ? parseFloat(formatted.replace(",", "."))
            : null;
          const isCheapest =
            numeric !== null && numeric === lowestPrices[selectedFuel];
          const text = formatted || "—";
          const rotulo = s["Rótulo"];
          const distancia =
            typeof s.distance === "number" && Number.isFinite(s.distance)
              ? `${s.distance.toFixed(1).replace(".", ",")} km`
              : null;
          const titleParts = [rotulo, `${text} €/L`];
          if (distancia) titleParts.push(distancia);
          // En desktop NO ponemos title nativo (chocaría con el Tooltip de
          // Leaflet) y no engachamos click → setSelectedId. El Popup se
          // abre solo al pulsar el marker.
          return (
            <Marker
              key={s.IDEESS}
              position={[s._lat, s._lng]}
              icon={getCachedIcon(text, isCheapest, !!formatted)}
              zIndexOffset={isCheapest ? 1000 : 0}
              eventHandlers={
                isDesktop
                  ? undefined
                  : { click: () => setSelectedId(s.IDEESS) }
              }
              keyboard
              alt={rotulo}
              title={isDesktop ? undefined : titleParts.join(" · ")}
            >
              {isDesktop && (
                <>
                  <Tooltip
                    direction="top"
                    offset={[0, -22]}
                    opacity={1}
                    className="map-tooltip"
                  >
                    <span className="map-tooltip__name">{rotulo}</span>
                    <span className="map-tooltip__sep" aria-hidden="true">
                      ·
                    </span>
                    <span className="map-tooltip__price">
                      {formatted
                        ? `${formatted} €/L`
                        : noPriceLabel(selectedFuel)}
                    </span>
                  </Tooltip>
                  <Popup
                    offset={[0, -22]}
                    closeButton={false}
                    autoPan
                    autoPanPadding={[40, 40]}
                    className="map-popup"
                  >
                    <MarkerPopup
                      station={s}
                      formatted={formatted}
                      distancia={distancia}
                      selectedFuel={selectedFuel}
                      mapsHref={buildHrefForProvider(s._lat, s._lng)}
                      onOpenDetail={() =>
                        navigate(`/gasolinera/${s.IDMunicipio}/${s.IDEESS}`)
                      }
                    />
                  </Popup>
                </>
              )}
            </Marker>
          );
        })}
      </MapContainer>

      {!isDesktop && selected && (
        <PeekSheet
          station={selected}
          selectedFuel={selectedFuel}
          onClose={() => setSelectedId(null)}
          onOpenDetail={() =>
            navigate(`/gasolinera/${selected.IDMunicipio}/${selected.IDEESS}`)
          }
          mapsHref={buildHrefForProvider(selected._lat, selected._lng)}
        />
      )}
    </div>
  );
};

// Contenido del Popup en desktop. Layout compacto: logo + rótulo, dirección,
// distancia (si la tenemos), precio destacado, dos botones.
function MarkerPopup({
  station,
  formatted,
  distancia,
  selectedFuel,
  mapsHref,
  onOpenDetail,
}) {
  return (
    <div className="map-popup__inner">
      <div className="map-popup__head">
        <span className="map-popup__logo">
          <img
            src={`/station-icons/${getLogoForGasolinera(station["Rótulo"])}`}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            width="32"
            height="32"
          />
        </span>
        <div className="map-popup__heading">
          <div className="map-popup__name">{station["Rótulo"]}</div>
          <div className="map-popup__addr">{station.Dirección}</div>
        </div>
      </div>
      <div className="map-popup__pricerow">
        {formatted ? (
          <div className="map-popup__price">
            <span className="map-popup__num">{formatted}</span>
            <span className="map-popup__unit">€/L</span>
          </div>
        ) : (
          <div className="map-popup__nodata">{noPriceLabel(selectedFuel)}</div>
        )}
        {distancia && (
          <span className="map-popup__dist">{distancia}</span>
        )}
      </div>
      <div className="map-popup__actions">
        <button
          type="button"
          className="map-popup__btn map-popup__btn--ghost"
          onClick={onOpenDetail}
        >
          Ver detalle
        </button>
        <a
          href={mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="map-popup__btn map-popup__btn--primary"
        >
          Cómo llegar
        </a>
      </div>
    </div>
  );
}

// Peek-sheet: panel inferior compacto con info de la gasolinera al pulsar
// un marker. Sustituye al "navigate directo": el usuario puede comparar
// varios pulsos sin salir del mapa, y elige cuándo entrar al detalle o ir
// directo a "Cómo llegar".
function PeekSheet({ station, selectedFuel, onClose, onOpenDetail, mapsHref }) {
  const formatted = formatPrice(station[selectedFuel]);
  const distancia =
    typeof station.distance === "number" && Number.isFinite(station.distance)
      ? `${station.distance.toFixed(1).replace(".", ",")} km`
      : null;

  // Defensa contra el "ghost click" de iOS: cuando el usuario toca un marker
  // del mapa, iOS dispara un click sintético ~300ms después en las
  // coordenadas del touch. Si el peek se abre justo encima de esas coords,
  // el backdrop captura el click sintético y se cierra al instante. Por eso
  // ignoramos cualquier click al backdrop que llegue antes de 350ms desde
  // que se montó el peek.
  const mountedAtRef = useRef(Date.now());
  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  const handleBackdropClick = () => {
    if (Date.now() - mountedAtRef.current < 350) return;
    onClose();
  };

  // Portalizamos el sheet a <body>: si lo dejamos dentro de .mapview, que
  // tiene `isolation: isolate`, su z-index queda confinado y el FAB
  // Lista|Mapa (z-index 800 en body) lo tapa visualmente. Así escapa al
  // contexto global y puede subir por encima del FAB sin tocar el mapa.
  return createPortal(
    <>
      <button
        type="button"
        className="peeksheet__backdrop"
        aria-label="Cerrar"
        onClick={handleBackdropClick}
      />
      <div
        className="peeksheet"
        role="dialog"
        aria-modal="true"
        aria-label={`${station["Rótulo"]} – detalles rápidos`}
      >
        <div className="peeksheet__handle" aria-hidden="true" />
        <div className="peeksheet__head">
          <span className="peeksheet__logo">
            <img
              src={`/station-icons/${getLogoForGasolinera(station["Rótulo"])}`}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              width="40"
              height="40"
            />
          </span>
          <div className="peeksheet__main">
            <div className="peeksheet__name">{station["Rótulo"]}</div>
            <div className="peeksheet__sub">
              {distancia && (
                <strong className="peeksheet__dist">{distancia}</strong>
              )}
              {distancia && (
                <span className="peeksheet__dot" aria-hidden="true">·</span>
              )}
              {station.Dirección}
            </div>
          </div>
          <div className="peeksheet__price">
            {formatted ? (
              <>
                <span className="peeksheet__num">{formatted}</span>
                <span className="peeksheet__unit">€/L</span>
              </>
            ) : (
              <span className="peeksheet__nodata">{noPriceLabel(selectedFuel)}</span>
            )}
          </div>
        </div>
        <div className="peeksheet__actions">
          <button
            type="button"
            className="peeksheet__btn peeksheet__btn--ghost"
            onClick={onOpenDetail}
          >
            Ver detalle
          </button>
          <a
            className="peeksheet__btn peeksheet__btn--primary"
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            Cómo llegar
          </a>
        </div>
        {/* Link nativo accesible (alternativa para teclado) */}
        <Link
          className="peeksheet__deeplink"
          to={`/gasolinera/${station.IDMunicipio}/${station.IDEESS}`}
          aria-hidden="true"
          tabIndex={-1}
        >
          {station["Rótulo"]}
        </Link>
      </div>
    </>,
    document.body
  );
}

export default MapView;
