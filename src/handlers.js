import { fetchMunicipios, fetchMunicipioCompleto } from "./api";

export const handleSelectProvincia = async (
  e,
  provincias,
  setProvinciaSeleccionada,
  setMunicipioSeleccionado,
  setListadoPrecios,
  setMunicipios
) => {
  const provinciaNombre = e.target.value;
  const provincia = provincias.find((p) => p.Provincia === provinciaNombre);

  if (provincia) {
    setProvinciaSeleccionada(provincia);
    setMunicipioSeleccionado(null);
    setListadoPrecios([]);
    try {
      const municipiosData = await fetchMunicipios(provincia.IDPovincia);
      setMunicipios(municipiosData);
    } catch (error) {
      console.error("Error al cargar los municipios:", error);
    }
  }
};

export const handleSelectMunicipio = async (
  e,
  municipios,
  setMunicipioSeleccionado,
  setListadoPrecios,
  setLoadingPrecios
) => {
  const municipioNombre = e.target.value;
  const municipio = municipios.find((m) => m.Municipio === municipioNombre);

  if (municipio) {
    setMunicipioSeleccionado(municipio);
    setListadoPrecios([]);
    try {
      setLoadingPrecios(true);
      const data = await fetchMunicipioCompleto(municipio.IDMunicipio);
      setListadoPrecios(data.ListaEESSPrecio || []);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    } finally {
      setLoadingPrecios(false);
    }
  }
};
