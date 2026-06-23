import { notFound } from "next/navigation";
import { fetchGasolineraServer } from "../../../../lib/api-server";
import {
  buildMetadata,
  jsonLdBreadcrumb,
  jsonLdGasStation,
} from "../../../../lib/seo";
import { slugify } from "../../../../utils/slug";
import { absoluteUrl } from "../../../../lib/site";
import Gasolinera from "../../../../components/StationDetail/Gasolinera";

export const dynamicParams = true;
// Copia ISR regenerada 1 vez/día (la ven crawlers y el primer paint). El
// usuario ve el precio EN VIVO: la ficha refresca contra MITECO al montar en
// cliente. Antes 30 min → reescrituras ISR masivas con ~12 000 estaciones.
export const revalidate = 86400;

function formatearPrecio(raw) {
  if (raw === undefined || raw === null) return null;
  const s = String(raw).trim();
  if (!s || s === "-") return null;
  const num = parseFloat(s.replace(",", "."));
  if (!Number.isFinite(num) || num <= 0) return null;
  return s;
}

export async function generateMetadata({ params }) {
  const { idMunicipio, idGasolinera } = await params;
  const { estacion, fecha } = await fetchGasolineraServer(
    idMunicipio,
    idGasolinera
  );
  const path = `/gasolinera/${idMunicipio}/${idGasolinera}`;

  if (!estacion) {
    return buildMetadata({
      title: "Gasolinera no encontrada · Carburantes",
      path,
      noindex: true,
    });
  }

  const rotulo = estacion["Rótulo"] || "Gasolinera";
  const direccion = estacion.Dirección || "";
  const cp = (estacion["C.P."] || "").trim();
  const localidad = estacion.Localidad || "";
  const provincia = estacion.Provincia || "";
  const localidadConCp = cp && localidad ? `${cp} ${localidad}` : localidad || cp;
  const ubicacion = [direccion, localidadConCp, provincia]
    .filter(Boolean)
    .join(", ");

  const precios = [
    {
      label: "Diésel A",
      value: formatearPrecio(estacion["Precio Gasoleo A"]),
    },
    {
      label: "Gasolina 95",
      value: formatearPrecio(estacion["Precio Gasolina 95 E5"]),
    },
    {
      label: "Gasolina 98",
      value: formatearPrecio(estacion["Precio Gasolina 98 E5"]),
    },
  ].filter((p) => p.value);

  const tieneAdblue = !!formatearPrecio(estacion["Precio Adblue"]);
  const tieneGlp = !!formatearPrecio(
    estacion["Precio Gases licuados del petróleo"]
  );
  const sellos = [
    tieneAdblue ? "Con AdBlue" : null,
    tieneGlp ? "Con GLP" : null,
  ].filter(Boolean);

  const titulo = ubicacion ? `${rotulo} — ${ubicacion}` : rotulo;

  // Descripción corta: tres precios principales + sellos. Sin "Ministerio:
  // fecha" (era ruido y empujaba la longitud por encima de 155 chars).
  const partesDescripcion = [];
  if (precios.length) {
    partesDescripcion.push(
      precios.map((p) => `${p.label} ${p.value} €/L`).join(" · ")
    );
  }
  if (sellos.length) {
    partesDescripcion.push(sellos.join(" · "));
  }
  const descripcion = partesDescripcion.length
    ? `${rotulo}${ubicacion ? `, ${localidad || provincia}` : ""}. ${partesDescripcion.join(" · ")}.`
    : "Consulta precios actualizados de gasolina y diésel en esta estación.";

  return buildMetadata({
    title: `${titulo} · Carburantes`,
    description: descripcion,
    path,
  });
}

export default async function GasolineraPage({ params }) {
  const { idMunicipio, idGasolinera } = await params;
  const { estacion, fecha } = await fetchGasolineraServer(
    idMunicipio,
    idGasolinera
  );

  if (!estacion) {
    notFound();
  }

  const path = `/gasolinera/${idMunicipio}/${idGasolinera}`;
  const url = absoluteUrl(path);

  const municipioNombre = estacion.Municipio || "";
  const muniSlug = slugify(municipioNombre);
  const muniPath = muniSlug
    ? `/municipio/${idMunicipio}/${muniSlug}`
    : `/municipio/${idMunicipio}`;

  const provincia = estacion.Provincia || "";
  const idProvincia = estacion.IDProvincia || "";
  const provSlug = provincia ? slugify(provincia) : "";

  const stationJsonLd = jsonLdGasStation(estacion, {
    url,
    fechaToma: fecha || undefined,
  });
  const breadcrumbItems = [{ name: "Inicio", url: "/" }];
  if (provincia && idProvincia && provSlug) {
    breadcrumbItems.push({ name: "Provincias", url: "/provincias" });
    breadcrumbItems.push({
      name: provincia,
      url: `/provincia/${idProvincia}/${provSlug}`,
    });
  } else {
    breadcrumbItems.push({ name: "Municipios", url: "/municipio" });
  }
  breadcrumbItems.push({ name: municipioNombre || "Municipio", url: muniPath });
  breadcrumbItems.push({
    name: estacion["Rótulo"] || "Gasolinera",
    url: path,
  });
  const breadcrumbJsonLd = jsonLdBreadcrumb(breadcrumbItems);

  return (
    <>
      {stationJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(stationJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Gasolinera
        idMunicipio={idMunicipio}
        idGasolinera={idGasolinera}
        initialStation={estacion}
      />
    </>
  );
}
