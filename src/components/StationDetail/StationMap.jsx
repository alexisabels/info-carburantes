"use client";

/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Light: Voyager. Dark: Dark Matter. Ver MapView.jsx para los detalles del
// pipeline visual.
const TILE_URL = {
  light:
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
};
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

const stationPin = L.divIcon({
  className: "map-pin-wrap",
  html: '<span class="map-pin"><span class="map-pin__dot"></span></span>',
  iconSize: [28, 36],
  iconAnchor: [14, 32],
  popupAnchor: [0, -28],
});

function MapFlyTo({ position, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (!position) return;
    map.flyTo(position, zoom, { duration: 0.7 });
  }, [map, position, zoom]);
  return null;
}

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

export default function StationMap({
  lat,
  lng,
  rotulo,
  theme = "light",
  scrollWheelZoom = false,
}) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      scrollWheelZoom={scrollWheelZoom}
      touchZoom={true}
      dragging={true}
      className="mapsec__map"
    >
      <TileLayer
        key={theme}
        attribution={TILE_ATTRIBUTION}
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
  );
}
