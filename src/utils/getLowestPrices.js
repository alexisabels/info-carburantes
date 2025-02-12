export const getLowestPrices = (precios) => {
  const lowestPrices = {
    "Precio Gasoleo A": Infinity,
    "Precio Gasoleo Premium": Infinity,
    "Precio Gasolina 95 E5": Infinity,
    "Precio Gasolina 98 E5": Infinity,
  };

  precios.forEach((gasolinera) => {
    Object.keys(lowestPrices).forEach((key) => {
      const price = parseFloat(gasolinera[key].replace(",", "."));
      if (!isNaN(price) && price < lowestPrices[key]) {
        lowestPrices[key] = price;
      }
    });
  });
  return lowestPrices;
};
