import { fetchMunicipios, fetchMunicipioCompleto } from "./api";

export const handleSelectProvincia = async (
  e,
  provincias,
  setProvinciaSeleccionada,
  setMunicipioSeleccionado,
  setListadoPrecios,
  setMunicipios
) => {
  const provinciaNombre = e?.target?.value;

  // Clear (X de react-select) o valor vacío: reseteamos toda la cadena
  // dependiente para que no queden municipios/precios huérfanos en pantalla.
  if (!provinciaNombre) {
    setProvinciaSeleccionada(null);
    setMunicipios([]);
    setMunicipioSeleccionado(null);
    setListadoPrecios([]);
    return;
  }

  if (!Array.isArray(provincias)) return;
  const provincia = provincias.find((p) => p.Provincia === provinciaNombre);
  if (!provincia) return;

  setProvinciaSeleccionada(provincia);
  setMunicipioSeleccionado(null);
  setListadoPrecios([]);
  setMunicipios([]);
  try {
    const municipiosData = await fetchMunicipios(provincia.IDPovincia);
    setMunicipios(Array.isArray(municipiosData) ? municipiosData : []);
  } catch {
    // Mantenemos consistencia: sin municipios y sin selección colgando.
    setMunicipios([]);
    setMunicipioSeleccionado(null);
    setListadoPrecios([]);
  }
};

export const handleSelectMunicipio = async (
  e,
  municipios,
  setMunicipioSeleccionado,
  setListadoPrecios,
  setLoadingPrecios,
  setFechaActualizacion
) => {
  const municipioNombre = e?.target?.value;

  // Clear (X de react-select): limpiamos municipio y precios.
  if (!municipioNombre) {
    setMunicipioSeleccionado(null);
    setListadoPrecios([]);
    return;
  }

  if (!Array.isArray(municipios)) return;
  const municipio = municipios.find((m) => m.Municipio === municipioNombre);
  if (!municipio) return;

  setMunicipioSeleccionado(municipio);
  setListadoPrecios([]);
  setLoadingPrecios(true);
  try {
    const data = await fetchMunicipioCompleto(municipio.IDMunicipio);
    setListadoPrecios(data?.ListaEESSPrecio || []);
    setFechaActualizacion(data?.Fecha || null);
  } catch {
    setListadoPrecios([]);
    setFechaActualizacion(null);
  } finally {
    setLoadingPrecios(false);
  }
};
