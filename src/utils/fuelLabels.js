// Etiquetas humanas para los IDs de carburante que devuelve la API. Fuente
// única para la UI: textos cortos en minúsculas pensados para construir
// frases naturales del tipo "Sin {fuel}" (placeholder cuando una estación
// no declara precio para ese combustible).
//
// Las claves coinciden con los nombres que usa el Ministerio en el JSON
// (`Precio Gasoleo A`, `Precio Gasolina 95 E5`, etc.) y con los IDs que
// emplean los selectores en MainContent y FuelTypeSelector.

const FUEL_SHORT_LABEL = {
  "Precio Gasoleo A": "diésel",
  "Precio Gasoleo Premium": "diésel +",
  "Precio Gasolina 95 E5": "gasolina 95",
  "Precio Gasolina 98 E5": "gasolina 98",
};

export const fuelShortLabel = (fuelId) =>
  FUEL_SHORT_LABEL[fuelId] || "este combustible";

// Texto para el placeholder cuando la estación no tiene precio del
// combustible seleccionado. Capitaliza la primera letra para usarlo como
// etiqueta independiente ("Sin diésel"); para frases más largas ya en
// minúscula (aria-labels), usa `fuelShortLabel` directamente.
export const noPriceLabel = (fuelId) => {
  const short = fuelShortLabel(fuelId);
  return `Sin ${short}`;
};
