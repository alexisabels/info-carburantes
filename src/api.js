const BASE_URL =
  "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes";

const ENDPOINTS = {
  PROVINCIAS: `${BASE_URL}/Listados/Provincias/`,
  PRODUCTOS: `${BASE_URL}/Listados/ProductosPetroliferos/`,
  MUNICIPIOS: (idProvincia) =>
    `${BASE_URL}/Listados/MunicipiosPorProvincia/${idProvincia}`,
  PRECIOS: (idMunicipio, idProducto) =>
    `${BASE_URL}/EstacionesTerrestres/FiltroMunicipioProducto/${idMunicipio}/${idProducto}`,
};

const PRODUCTOS_PERMITIDOS = [
  "Gasolina 95 E5",
  "Gasolina 95 E10",
  "Gasolina 95 E5 Premium",
  "Gasolina 98 E5",
  "Gasóleo A habitual",
  "Gasóleo Premium",
  "Gases licuados del petróleo",
  "Gas natural comprimido",
];

export const fetchProvincias = async () => {
  const response = await fetch(ENDPOINTS.PROVINCIAS);
  if (!response.ok) {
    throw new Error("Error al obtener las provincias");
  }
  return response.json();
};

export const fetchProductos = async () => {
  const response = await fetch(ENDPOINTS.PRODUCTOS);
  if (!response.ok) {
    throw new Error("Error al obtener los productos");
  }
  const productos = await response.json();
  return productos.filter((producto) =>
    PRODUCTOS_PERMITIDOS.includes(producto.NombreProducto)
  );
};

export const fetchMunicipios = async (idProvincia) => {
  const response = await fetch(ENDPOINTS.MUNICIPIOS(idProvincia));
  if (!response.ok) {
    throw new Error("Error al obtener los municipios");
  }
  return response.json();
};

export const fetchPrecios = async (idMunicipio, idProducto) => {
  const response = await fetch(ENDPOINTS.PRECIOS(idMunicipio, idProducto));
  if (!response.ok) {
    throw new Error("Error al obtener los precios");
  }
  return response.json();
};
