const BASE_URL =
  "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes";

const ENDPOINTS = {
  PROVINCIAS: `${BASE_URL}/Listados/Provincias/`,
  MUNICIPIOS: (idProvincia) =>
    `${BASE_URL}/Listados/MunicipiosPorProvincia/${idProvincia}`,
};

export const fetchProvincias = async () => {
  const response = await fetch(ENDPOINTS.PROVINCIAS);
  if (!response.ok) {
    throw new Error("Error al obtener las provincias");
  }
  return response.json();
};

export const fetchMunicipios = async (idProvincia) => {
  const response = await fetch(ENDPOINTS.MUNICIPIOS(idProvincia));
  if (!response.ok) {
    throw new Error("Error al obtener los municipios");
  }
  return response.json();
};

export const fetchMunicipioCompleto = async (idMunicipio) => {
  const response = await fetch(
    `${BASE_URL}/EstacionesTerrestres/FiltroMunicipio/${idMunicipio}`
  );
  if (!response.ok) {
    throw new Error("Error al obtener los datos del municipio");
  }
  return response.json();
};
