import { redirect } from "next/navigation";
import {
  fetchMunicipioCompletoServer,
  minPrecio,
} from "../../../../lib/api-server";
import {
  buildMetadata,
  jsonLdBreadcrumb,
  jsonLdItemListMunicipio,
} from "../../../../lib/seo";
import { slugify } from "../../../../utils/slug";
import { absoluteUrl } from "../../../../lib/site";
import MainContent from "../../../../components/MainContent";

// ISR: revalidate cada 30 min (cota natural de MITECO). dynamicParams=true
// permite que llegue cualquier idMunicipio (no hace falta pregenerar todos).
export const dynamicParams = true;
export const revalidate = 1800;

async function getMunicipioContext({ idMunicipio, slug }) {
  const data = await fetchMunicipioCompletoServer(idMunicipio);
  const lista = Array.isArray(data?.ListaEESSPrecio) ? data.ListaEESSPrecio : [];
  const first = lista[0] || {};
  const nombre = first.Municipio || "";
  const provincia = first.Provincia || "";
  const idProvincia = first.IDProvincia || "";
  const canonicalSlug = nombre ? slugify(nombre) : "";
  return {
    idMunicipio,
    slug,
    canonicalSlug,
    nombre,
    provincia,
    idProvincia,
    fecha: data?.Fecha || null,
    lista,
  };
}

export async function generateMetadata({ params }) {
  const { idMunicipio, slug } = await params;
  const ctx = await getMunicipioContext({ idMunicipio, slug });
  if (!ctx.nombre) {
    return buildMetadata({
      title: "Municipio no encontrado · Carburantes",
      path: `/municipio/${idMunicipio}/${slug}`,
      noindex: true,
    });
  }

  const total = ctx.lista.length;
  const minDiesel = minPrecio(ctx.lista, "Precio Gasoleo A");
  const min95 = minPrecio(ctx.lista, "Precio Gasolina 95 E5");
  const min98 = minPrecio(ctx.lista, "Precio Gasolina 98 E5");

  const titulo = ctx.provincia
    ? `Precios de gasolineras en ${ctx.nombre} (${ctx.provincia}) — Carburantes`
    : `Precios de gasolineras en ${ctx.nombre} — Carburantes`;

  const partes = [];
  if (total > 0) {
    partes.push(`${total} ${total === 1 ? "gasolinera" : "gasolineras"}`);
  }
  if (minDiesel) partes.push(`diésel desde ${minDiesel.texto} €/L`);
  if (min95) partes.push(`gasolina 95 desde ${min95.texto} €/L`);
  if (min98) partes.push(`gasolina 98 desde ${min98.texto} €/L`);
  if (ctx.fecha) partes.push(`actualizado ${ctx.fecha}`);
  const descripcion = partes.length
    ? `Compara precios de carburantes en ${ctx.nombre}: ${partes.join(" · ")}.`
    : `Compara precios de carburantes en ${ctx.nombre}.`;

  return buildMetadata({
    title: titulo,
    description: descripcion,
    path: `/municipio/${idMunicipio}/${ctx.canonicalSlug || slug}`,
  });
}

export default async function MunicipioListadoPage({ params }) {
  const { idMunicipio, slug } = await params;
  const ctx = await getMunicipioContext({ idMunicipio, slug });

  // Si el slug no coincide con el canónico, redirigimos con 308 para
  // que solo exista una URL indexable por municipio.
  if (ctx.canonicalSlug && slug !== ctx.canonicalSlug) {
    redirect(`/municipio/${idMunicipio}/${ctx.canonicalSlug}`);
  }

  const path = `/municipio/${idMunicipio}/${ctx.canonicalSlug || slug}`;
  const url = absoluteUrl(path);

  const breadcrumbJsonLd = jsonLdBreadcrumb([
    { name: "Inicio", url: "/" },
    { name: "Municipios", url: "/municipio" },
    {
      name: ctx.nombre || idMunicipio,
      url: path,
    },
  ]);

  const itemListJsonLd =
    ctx.lista.length > 0
      ? jsonLdItemListMunicipio(ctx.lista, {
          municipio: ctx.nombre,
          url,
        })
      : null;

  const initialData = {
    municipioSeleccionado: {
      IDMunicipio: idMunicipio,
      Municipio: ctx.nombre,
      Provincia: ctx.provincia,
      IDProvincia: ctx.idProvincia,
    },
    listadoPrecios: ctx.lista,
    fechaActualizacion: ctx.fecha,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      )}
      <MainContent initialData={initialData} mode="manual" />
    </>
  );
}
