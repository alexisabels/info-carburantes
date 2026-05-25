// Catálogo de marcas reconocidas + helpers para mapear nombres de marca a/desde
// URLs. La fuente única son los IDs canónicos en KNOWN_BRANDS (en minúscula,
// sin tildes/espacios) — son a la vez los slugs y los nombres de archivo de
// logo (logo_${id}.gif en /public/station-icons/).

import { getLogoForGasolinera } from "../utils/logoUtils";

export const KNOWN_BRANDS = [
  { id: "repsol", display: "Repsol" },
  { id: "cepsa", display: "Cepsa" },
  { id: "bp", display: "BP" },
  { id: "shell", display: "Shell" },
  { id: "galp", display: "Galp" },
  { id: "petronor", display: "Petronor" },
  { id: "campsa", display: "Campsa" },
  { id: "avia", display: "Avia" },
  { id: "q8", display: "Q8" },
  { id: "meroil", display: "Meroil" },
  { id: "saras", display: "Saras" },
  { id: "ballenoil", display: "Ballenoil" },
  { id: "plenoil", display: "Plenoil" },
  { id: "petroprix", display: "Petroprix" },
  { id: "easygas", display: "EasyGas" },
  { id: "petrocat", display: "Petrocat" },
  { id: "carrefour", display: "Carrefour" },
  { id: "alcampo", display: "Alcampo" },
  { id: "eroski", display: "Eroski" },
  { id: "bonarea", display: "BonÀrea" },
  { id: "simply", display: "Simply" },
  { id: "eleclerc", display: "E.Leclerc" },
];

const BRAND_BY_ID = new Map(KNOWN_BRANDS.map((b) => [b.id, b]));

export function getBrand(idOrSlug) {
  if (!idOrSlug) return null;
  return BRAND_BY_ID.get(String(idOrSlug).toLowerCase()) || null;
}

// Coincidencia marca↔estación reusando el resolver de logos: si para una
// estación getLogoForGasolinera() devuelve logo_${brand}.gif, esa estación
// pertenece a esa marca. Es exactamente la heurística que ya usamos para
// pintar el avatar, así que el mapeo es consistente con lo que ve el usuario.
export function stationBrand(estacion) {
  const rotulo = estacion?.["Rótulo"] || "";
  const logo = getLogoForGasolinera(rotulo);
  if (!logo || logo === "logo_generico.gif") return null;
  const m = logo.match(/^logo_(.+)\.gif$/);
  return m ? m[1] : null;
}

export function isStationOfBrand(estacion, brandId) {
  return stationBrand(estacion) === brandId;
}
