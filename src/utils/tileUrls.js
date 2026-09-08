// URLs de los basemaps raster de CARTO (Voyager en claro, Dark Matter en
// oscuro) compartidas por todos los mapas Leaflet de la app.
//
// Desde 2026 CARTO exige una API key en los tiles raster (sin ella sale el
// watermark "API key required"). La key va como parámetro `key` en la URL,
// así que necesariamente es pública en el navegador — CARTO la diseña así
// (gratis hasta 5M tiles/mes por proyecto). En Vercel se define como
// `API_KEY_CARTO`; next.config.mjs la expone al bundle cliente como
// `NEXT_PUBLIC_CARTO_API_KEY`. Si no hay key (dev sin .env) las URLs salen
// sin parámetro y el mapa sigue funcionando, con watermark.
//
// Ventaja extra de llevarla en la URL: cambia la clave de caché del SW
// (`carto-tiles` en next.config.mjs) y del navegador, así que los tiles
// antiguos con watermark no se reutilizan.
const CARTO_API_KEY = process.env.NEXT_PUBLIC_CARTO_API_KEY || "";
const KEY_SUFFIX = CARTO_API_KEY
  ? `?key=${encodeURIComponent(CARTO_API_KEY)}`
  : "";

const BASE = "https://{s}.basemaps.cartocdn.com/rastertiles";

export const TILE_URL = {
  light: `${BASE}/voyager/{z}/{x}/{y}{r}.png${KEY_SUFFIX}`,
  dark: `${BASE}/dark_all/{z}/{x}/{y}{r}.png${KEY_SUFFIX}`,
};

export const TILE_SUBDOMAINS = ["a", "b", "c", "d"];

// La atribución a OSM y CARTO tiene que seguir visible: es la condición del
// tier gratuito (carto.com/attributions).
export const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
