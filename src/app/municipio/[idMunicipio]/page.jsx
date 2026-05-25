import { redirect } from "next/navigation";
import { fetchMunicipioCompletoServer } from "../../../lib/api-server";
import { slugify } from "../../../utils/slug";

// Esta ruta solo existe para canonicalizar: si llega con id pero sin slug,
// resolvemos el nombre del municipio en servidor y hacemos un 308 al slug
// definitivo. Así el sitemap y los enlaces compartidos siempre acaban en la
// URL canónica.

export const dynamicParams = true;
export const revalidate = 86400;

export default async function MunicipioByIdPage({ params }) {
  const { idMunicipio } = await params;
  const data = await fetchMunicipioCompletoServer(idMunicipio);
  const lista = Array.isArray(data?.ListaEESSPrecio) ? data.ListaEESSPrecio : [];
  const nombre = lista[0]?.Municipio || "";
  const slug = slugify(nombre);
  if (slug) {
    redirect(`/municipio/${idMunicipio}/${slug}`);
  }
  // Sin nombre (municipio inexistente o API caída) caemos al picker.
  redirect("/municipio");
}
