const FUEL_KEYS = [
  "Precio Gasoleo A",
  "Precio Gasoleo Premium",
  "Precio Gasolina 95 E5",
  "Precio Gasolina 98 E5",
];

const parsePrice = (rawValue) => {
  if (rawValue === undefined || rawValue === null) return null;
  const stringValue =
    typeof rawValue === "string" ? rawValue.trim() : String(rawValue);
  if (stringValue === "" || stringValue === "-") return null;
  const price = parseFloat(stringValue.replace(",", "."));
  if (!Number.isFinite(price) || price <= 0) return null;
  return price;
};

export const getLowestPrices = (precios) => {
  const lowestPrices = {
    "Precio Gasoleo A": null,
    "Precio Gasoleo Premium": null,
    "Precio Gasolina 95 E5": null,
    "Precio Gasolina 98 E5": null,
  };

  if (!Array.isArray(precios) || precios.length === 0) {
    return lowestPrices;
  }

  for (const gasolinera of precios) {
    if (!gasolinera || typeof gasolinera !== "object") continue;

    for (const key of FUEL_KEYS) {
      const price = parsePrice(gasolinera[key]);
      if (price === null) continue;
      if (lowestPrices[key] === null || price < lowestPrices[key]) {
        lowestPrices[key] = price;
      }
    }
  }

  return lowestPrices;
};
