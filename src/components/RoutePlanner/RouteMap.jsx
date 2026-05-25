"use client";

/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "leaflet/dist/leaflet.css";
import { getLowestPrices } from "../../utils/getLowestPrices";
import { getLogoForGasolinera } from "../../utils/logoUtils";
import { noPriceLabel } from "../../utils/fuelLabels";
import { useTheme } from "../../hooks/useTheme";
// Reutilizamos los estilos del MapView (.map-price, .map-tooltip,
// .map-popup, .peeksheet, filtros dark de los tiles) — son el lenguaje
// visual compartido para representar gasolineras sobre Leaflet.
import "../MapView/MapView.css";
import "./RouteMap.css";

const TILE_URL = {
  light:
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
};
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

const formatPrice = (raw) => {
  if (!raw || raw === "-") return null;
  const n = parseFloat(String(raw).replace(",", "."));
  if (!Number.isFinite(n) || n <= 0) return null;
  return raw;
};

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

// Pill de precio idéntico al de MapView para mantener la lectura visual
// coherente entre vistas. Variantes:
//   - default: chip blanco/oscuro con borde sutil
//   - cheapest: anillo verde + halo
//   - selected: anillo ámbar grueso + ligero scale para indicar que ES
//     la parada elegida
const buildPriceIcon = (priceText, isCheapest, hasPrice, isSelected) => {
  const classes = ["map-price"];
  if (isSelected) classes.push("map-price--selected");
  else if (isCheapest) classes.push("map-price--cheapest");
  if (!hasPrice) classes.push("map-price--na");
  return L.divIcon({
    className: classes.join(" "),
    html: `<span class="map-price__bubble">${priceText}</span>`,
    iconSize: [84, 44],
    iconAnchor: [42, 22],
    popupAnchor: [0, -22],
  });
};

const buildEndpointIcon = (letter, variant) =>
  L.divIcon({
    className: `route-endpoint route-endpoint--${variant}`,
    html: `<span class="route-endpoint__inner">${letter}</span>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });

const ORIGIN_ICON = buildEndpointIcon("A", "origin");
const DEST_ICON = buildEndpointIcon("B", "dest");

function FitToRoute({ geometry, fitKey }) {
  const map = useMap();
  useEffect(() => {
    if (!geometry || geometry.length < 2) return;
    const bounds = L.latLngBounds(geometry);
    map.fitBounds(bounds, { padding: [50, 50] });
    // fitKey nos permite forzar un re-fit cuando el padre cambia
    // (geometría base ↔ geometría con parada). Sin él, el effect solo
    // dispara con la referencia de geometry, que cambia siempre que
    // hay nueva polyline pero también re-encuadra cada vez que el
    // padre re-renderiza.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, fitKey]);
  return null;
}

const RouteMap = ({
  geometry,
  origin,
  destination,
  stations,
  selectedFuel,
  selectedWaypointId,
  onSelectWaypoint,
}) => {
  const router = useRouter();
  const { resolved: theme } = useTheme();
  const isDesktop = useIsDesktop();
  const [selectedId, setSelectedId] = useState(null);

  const lowestPrices = useMemo(
    () => getLowestPrices(stations || []),
    [stations]
  );

  const decorated = useMemo(() => {
    return (stations || [])
      .map((s) => {
        const lat = parseFloat(String(s.Latitud).replace(",", "."));
        const lng = parseFloat(String(s["Longitud (WGS84)"]).replace(",", "."));
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
        return { ...s, _lat: lat, _lng: lng };
      })
      .filter(Boolean);
  }, [stations]);

  const iconCacheRef = useRef(new Map());
  const getCachedIcon = (priceText, isCheapest, hasPrice, isSelected) => {
    const key = `${priceText}|${isCheapest ? "1" : "0"}|${hasPrice ? "1" : "0"}|${isSelected ? "1" : "0"}`;
    const cache = iconCacheRef.current;
    let icon = cache.get(key);
    if (!icon) {
      icon = buildPriceIcon(priceText, isCheapest, hasPrice, isSelected);
      cache.set(key, icon);
    }
    return icon;
  };

  const peekStation = useMemo(
    () => decorated.find((s) => s.IDEESS === selectedId) || null,
    [decorated, selectedId]
  );

  useEffect(() => {
    if (!peekStation) return;
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [peekStation]);

  if (!geometry || geometry.length < 2) return null;

  const initialCenter = geometry[Math.floor(geometry.length / 2)];
  const routeColor = theme === "dark" ? "#2db567" : "#0d7a3a";
  const outlineColor = theme === "dark" ? "#000" : "#fff";

  // Re-fit ÚNICAMENTE cuando cambian los extremos o cuando se añade /
  // quita parada (el polyline rebota a través de un nuevo punto). No
  // cuando se cambia un filtro que solo añade/quita markers.
  const fitKey = `${origin?.lat},${origin?.lng}|${destination?.lat},${destination?.lng}|${selectedWaypointId || ""}`;

  const handleStationClick = (s) => {
    if (typeof onSelectWaypoint === "function") {
      onSelectWaypoint(s.IDEESS);
    }
    setSelectedId(null);
  };

  return (
    <div
      className="mapview routemap"
      aria-label="Mapa con la ruta y gasolineras cercanas"
    >
      <MapContainer
        center={initialCenter}
        zoom={8}
        scrollWheelZoom
        zoomControl={false}
        className="mapview__map"
      >
        <TileLayer
          key={theme}
          attribution={TILE_ATTRIBUTION}
          url={TILE_URL[theme] || TILE_URL.light}
          subdomains={["a", "b", "c", "d"]}
          maxZoom={19}
        />
        <FitToRoute geometry={geometry} fitKey={fitKey} />
        {/* Doble polyline: capa exterior más ancha (blanco/negro según
            tema) para contraste sobre carreteras claras/amarillas de
            Voyager; capa interior en color de marca. */}
        <Polyline
          positions={geometry}
          pathOptions={{
            color: outlineColor,
            weight: 8,
            opacity: 0.65,
            lineCap: "round",
            lineJoin: "round",
          }}
        />
        <Polyline
          positions={geometry}
          pathOptions={{
            color: routeColor,
            weight: 5,
            opacity: 0.95,
            lineCap: "round",
            lineJoin: "round",
          }}
        />
        {origin && (
          <Marker position={[origin.lat, origin.lng]} icon={ORIGIN_ICON}>
            {origin.label && <Tooltip direction="top">{origin.label}</Tooltip>}
          </Marker>
        )}
        {destination && (
          <Marker position={[destination.lat, destination.lng]} icon={DEST_ICON}>
            {destination.label && (
              <Tooltip direction="top">{destination.label}</Tooltip>
            )}
          </Marker>
        )}

        {decorated.map((s) => {
          const formatted = formatPrice(s[selectedFuel]);
          const numeric = formatted
            ? parseFloat(formatted.replace(",", "."))
            : null;
          const isCheapest =
            numeric !== null && numeric === lowestPrices[selectedFuel];
          const isSelected = s.IDEESS === selectedWaypointId;
          const text = formatted || "—";
          const rotulo = s["Rótulo"];
          const detourTxt =
            typeof s.detour === "number" && Number.isFinite(s.detour)
              ? `${s.detour.toFixed(1).replace(".", ",")} km desvío`
              : null;
          const titleParts = [rotulo, `${text} €/L`];
          if (detourTxt) titleParts.push(detourTxt);
          return (
            <Marker
              key={s.IDEESS}
              position={[s._lat, s._lng]}
              icon={getCachedIcon(text, isCheapest, !!formatted, isSelected)}
              zIndexOffset={isSelected ? 2000 : isCheapest ? 1000 : 0}
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
                      detour={s.detour}
                      selectedFuel={selectedFuel}
                      isSelected={isSelected}
                      onSelectWaypoint={() => handleStationClick(s)}
                      onOpenDetail={() =>
                        router.push(`/gasolinera/${s.IDMunicipio}/${s.IDEESS}`)
                      }
                    />
                  </Popup>
                </>
              )}
            </Marker>
          );
        })}
      </MapContainer>

      {!isDesktop && peekStation && (
        <PeekSheet
          station={peekStation}
          selectedFuel={selectedFuel}
          isSelected={peekStation.IDEESS === selectedWaypointId}
          onClose={() => setSelectedId(null)}
          onOpenDetail={() =>
            router.push(
              `/gasolinera/${peekStation.IDMunicipio}/${peekStation.IDEESS}`
            )
          }
          onSelectWaypoint={() => handleStationClick(peekStation)}
        />
      )}
    </div>
  );
};

function MarkerPopup({
  station,
  formatted,
  detour,
  selectedFuel,
  isSelected,
  onSelectWaypoint,
  onOpenDetail,
}) {
  const detourTxt =
    typeof detour === "number" && Number.isFinite(detour)
      ? `${detour.toFixed(1).replace(".", ",")} km desvío`
      : null;
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
        {detourTxt && <span className="map-popup__dist">{detourTxt}</span>}
      </div>
      <div className="map-popup__actions">
        <button
          type="button"
          className="map-popup__btn map-popup__btn--ghost"
          onClick={onOpenDetail}
        >
          Ver detalle
        </button>
        <button
          type="button"
          className={`map-popup__btn map-popup__btn--primary${isSelected ? " map-popup__btn--active" : ""}`}
          onClick={onSelectWaypoint}
        >
          {isSelected ? "Parando aquí · quitar" : "Parar aquí"}
        </button>
      </div>
    </div>
  );
}

function PeekSheet({
  station,
  selectedFuel,
  isSelected,
  onClose,
  onOpenDetail,
  onSelectWaypoint,
}) {
  const formatted = formatPrice(station[selectedFuel]);
  const detourTxt =
    typeof station.detour === "number" && Number.isFinite(station.detour)
      ? `${station.detour.toFixed(1).replace(".", ",")} km desvío`
      : null;

  const mountedAtRef = useRef(Date.now());
  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  const handleBackdropClick = () => {
    if (Date.now() - mountedAtRef.current < 350) return;
    onClose();
  };

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
              {detourTxt && (
                <strong className="peeksheet__dist">{detourTxt}</strong>
              )}
              {detourTxt && (
                <span className="peeksheet__dot" aria-hidden="true">
                  ·
                </span>
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
              <span className="peeksheet__nodata">
                {noPriceLabel(selectedFuel)}
              </span>
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
          <button
            type="button"
            className={`peeksheet__btn peeksheet__btn--primary${isSelected ? " peeksheet__btn--active" : ""}`}
            onClick={onSelectWaypoint}
          >
            {isSelected ? "Parando aquí · quitar" : "Parar aquí"}
          </button>
        </div>
        <Link
          className="peeksheet__deeplink"
          href={`/gasolinera/${station.IDMunicipio}/${station.IDEESS}`}
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

export default RouteMap;
