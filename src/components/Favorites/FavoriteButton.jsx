"use client";

/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useFavorites from "../../hooks/useFavorites";
import "./FavoriteButton.css";

const SIZE_PX = {
  sm: 24,
  md: 32,
  lg: 44,
};

// SVG estrella con `fill` controlado vía CSS para poder animar/transicionar
// sólo el relleno sin redibujar el path en cada toggle.
const StarIcon = ({ filled, pixelSize }) => (
  <svg
    className={`favbtn__icon${filled ? " favbtn__icon--filled" : ""}`}
    width={pixelSize}
    height={pixelSize}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M12 3.5l2.7 5.47 6.04.88-4.37 4.26 1.03 6.01L12 17.27l-5.4 2.85 1.03-6.01-4.37-4.26 6.04-.88L12 3.5z"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const FavoriteButton = ({ station, size = "md", className = "" }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  // Render-resistente en SSR: hasta que montemos en cliente, mostramos el
  // icono "vacío" para que el HTML server/cliente coincida y evitamos tocar
  // localStorage en server.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const ideess = station?.IDEESS ?? station?.ideess;
  const filled = mounted && ideess !== undefined && isFavorite(ideess);
  const pixelSize = SIZE_PX[size] ?? SIZE_PX.md;
  const label = filled ? "Quitar de favoritas" : "Marcar como favorita";

  const handleClick = (event) => {
    // El card padre es clickable (navega al detalle); el botón debe ser un
    // "puerto seguro" dentro de él.
    event.stopPropagation();
    event.preventDefault();
    if (!station || ideess === undefined) return;
    toggleFavorite(station);
  };

  // Si auxClick (botón medio) llega aquí, también lo paramos para no abrir
  // pestaña nueva del detalle por accidente.
  const handleAuxClick = (event) => {
    event.stopPropagation();
  };

  const wrapperClass = [
    "favbtn",
    `favbtn--${size}`,
    filled ? "favbtn--active" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={wrapperClass}
      aria-pressed={filled}
      aria-label={label}
      title={label}
      onClick={handleClick}
      onAuxClick={handleAuxClick}
      onMouseDown={(event) => event.stopPropagation()}
    >
      <span className="favbtn__hit" aria-hidden="true">
        <StarIcon filled={filled} pixelSize={pixelSize} />
      </span>
    </button>
  );
};

export default FavoriteButton;
