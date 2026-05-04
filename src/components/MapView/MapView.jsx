/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { Link, useNavigate } from "react-router-dom";
import { getLowestPrices } from "../../utils/getLowestPrices";
import { isOpenNow } from "../../utils/formatHorario";
import { getLogoForGasolinera } from "../../utils/logoUtils";
import "./MapView.css";

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

// Marker custom: pill redondeada con el precio, sin "cola triangular"
// agresiva. La cheapest tiene anillo verde + halo. Tipografía mono tabular
// asegura que precios distintos no descuadren al ojo.
const buildPriceIcon = (priceText, isCheapest, hasPrice) => {
  const classes = ["map-price"];
  if (isCheapest) classes.push("map-price--cheapest");
  if (!hasPrice) classes.push("map-price--na");
  return L.divIcon({
    className: classes.join(" "),
    html: `<span class="map-price__bubble">${priceText}</span>`,
    iconSize: [62, 26],
    iconAnchor: [31, 13],
    popupAnchor: [0, -16],
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
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
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
          return (
            <Marker
              key={s.IDEESS}
              position={[s._lat, s._lng]}
              icon={getCachedIcon(text, isCheapest, !!formatted)}
              zIndexOffset={isCheapest ? 1000 : 0}
              eventHandlers={{
                click: () => setSelectedId(s.IDEESS),
              }}
              keyboard
              alt={rotulo}
              title={titleParts.join(" · ")}
            />
          );
        })}
      </MapContainer>

      {selected && (
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

  return (
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
              <span className="peeksheet__nodata">Sin precio</span>
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
    </>
  );
}

export default MapView;
