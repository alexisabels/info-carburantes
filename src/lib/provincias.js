// Helpers para trabajar con provincias en servidor. La API del MITECO usa
// `IDPovincia` (con typo en su esquema oficial) y nos devuelve nombre +
// código CCAA, así que normalizamos aquí para no repetir la transformación
// en cada page.

import { slugify } from "../utils/slug";
import {
  fetchProvinciasServer,
  fetchMunicipiosPorProvinciaServer,
} from "./api-server";

export async function getProvinciaContext(idProvincia) {
  const lista = await fetchProvinciasServer();
  const prov = lista.find(
    (p) => String(p?.IDPovincia) === String(idProvincia)
  );
  if (!prov) {
    return { idProvincia: String(idProvincia), nombre: "", slug: "", ccaa: "" };
  }
  const nombre = prov.Provincia || "";
  return {
    idProvincia: String(prov.IDPovincia),
    nombre,
    slug: slugify(nombre),
    ccaa: prov.CCAA || "",
  };
}

export async function getMunicipiosOfProvincia(idProvincia) {
  return await fetchMunicipiosPorProvinciaServer(idProvincia);
}
