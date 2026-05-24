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
export const revalidate = 1800;

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

  const partesDescripcion = [];
  if (precios.length) {
    partesDescripcion.push(
      precios.map((p) => `${p.label}: ${p.value} €/L`).join(" · ")
    );
  }
  if (sellos.length) {
    partesDescripcion.push(sellos.join(" · "));
  }
  if (fecha) {
    partesDescripcion.push(`Ministerio: ${fecha}`);
  }
  const descripcion = partesDescripcion.length
    ? partesDescripcion.join(" — ")
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

  const stationJsonLd = jsonLdGasStation(estacion, {
    url,
    fechaToma: fecha || undefined,
  });
  const breadcrumbJsonLd = jsonLdBreadcrumb([
    { name: "Inicio", url: "/" },
    { name: "Municipios", url: "/municipio" },
    { name: municipioNombre || "Municipio", url: muniPath },
    { name: estacion["Rótulo"] || "Gasolinera", url: path },
  ]);

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
