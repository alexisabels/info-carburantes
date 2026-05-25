import { redirect } from "next/navigation";
import {
  fetchMunicipioCompletoServer,
  fetchProvinciasServer,
  minPrecio,
} from "../../../../lib/api-server";
import {
  buildMetadata,
  jsonLdBreadcrumb,
  jsonLdItemListMunicipio,
  jsonLdPlaceMunicipio,
} from "../../../../lib/seo";
import { slugify } from "../../../../utils/slug";
import { absoluteUrl } from "../../../../lib/site";
import MainContent from "../../../../components/MainContent";
import NearbyMunicipios from "../../../../components/NearbyMunicipios/NearbyMunicipios";

// Pre-renderiza al build las capitales/ciudades más buscadas. El resto se
// generan on-demand vía ISR (dynamicParams=true). MITECO no documenta los
// IDMunicipio; los resolvemos por nombre haciendo cross-reference con la
// API en build time.
const TOP_CITIES = new Set(
  [
    "Madrid",
    "Barcelona",
    "Valencia",
    "Sevilla",
    "Zaragoza",
    "Málaga",
    "Murcia",
    "Palma",
    "Las Palmas de Gran Canaria",
    "Bilbao",
    "Alicante (Alacant)",
    "Córdoba",
    "Valladolid",
    "Vigo",
    "Gijón",
    "L'Hospitalet de Llobregat",
    "Vitoria-Gasteiz",
    "Coruña (A)",
    "Granada",
    "Elche (Elx)",
    "Oviedo",
    "Santa Cruz de Tenerife",
    "Badalona",
    "Cartagena",
    "Terrassa",
    "Jerez de la Frontera",
    "Sabadell",
    "Móstoles",
    "Alcalá de Henares",
    "Pamplona/Iruña",
    "Fuenlabrada",
    "Almería",
    "Donostia/San Sebastián",
    "Leganés",
    "Burgos",
    "Albacete",
    "Salamanca",
    "Getafe",
    "Castellón de la Plana/Castelló de la Plana",
    "Logroño",
    "Badajoz",
    "Huelva",
    "Marbella",
    "Lleida",
    "Tarragona",
    "Cádiz",
    "León",
    "Dos Hermanas",
    "Mataró",
    "Santa Coloma de Gramenet",
  ].map((n) => slugifyForCompare(n))
);

function slugifyForCompare(name) {
  return slugify(String(name || ""));
}

export async function generateStaticParams() {
  try {
    const provincias = await fetchProvinciasServer();
    if (!provincias.length) return [];
    const { fetchMunicipiosPorProvinciaServer } = await import(
      "../../../../lib/api-server"
    );
    const params = [];
    const BATCH = 8;
    for (let i = 0; i < provincias.length; i += BATCH) {
      const batch = provincias.slice(i, i + BATCH);
      const results = await Promise.all(
        batch.map((p) => fetchMunicipiosPorProvinciaServer(p.IDPovincia))
      );
      for (const lista of results) {
        for (const m of lista || []) {
          if (!m?.IDMunicipio || !m?.Municipio) continue;
          if (TOP_CITIES.has(slugifyForCompare(m.Municipio))) {
            params.push({
              idMunicipio: String(m.IDMunicipio),
              slug: slugify(m.Municipio),
            });
          }
        }
      }
    }
    return params;
  } catch {
    return [];
  }
}

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

  const titulo = ctx.provincia
    ? `Precios de gasolineras en ${ctx.nombre} (${ctx.provincia}) — Carburantes`
    : `Precios de gasolineras en ${ctx.nombre} — Carburantes`;

  // Descripción corta (<155 chars) — WhatsApp y Google truncan textos largos
  // y a veces degradan el preview al variant pequeño. Dejamos solo los
  // mínimos de diésel y 95 (más relevantes); fecha y 98 se ven en la página.
  const partes = [];
  if (total > 0) {
    partes.push(`${total} ${total === 1 ? "gasolinera" : "gasolineras"}`);
  }
  if (minDiesel) partes.push(`diésel desde ${minDiesel.texto} €/L`);
  if (min95) partes.push(`gasolina 95 desde ${min95.texto} €/L`);
  const descripcion = partes.length
    ? `${partes.join(" · ")}. Compara precios en ${ctx.nombre}.`
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

  // Si tenemos provincia, la encadenamos en el breadcrumb (Inicio → Provincias
  // → Madrid → Madrid municipio). Si no la conocemos, caemos al breadcrumb
  // de 2 niveles para no inventar enlaces rotos.
  const provinciaSlug = ctx.provincia ? slugify(ctx.provincia) : "";
  const breadcrumbItems = [{ name: "Inicio", url: "/" }];
  if (ctx.idProvincia && ctx.provincia && provinciaSlug) {
    breadcrumbItems.push({ name: "Provincias", url: "/provincias" });
    breadcrumbItems.push({
      name: ctx.provincia,
      url: `/provincia/${ctx.idProvincia}/${provinciaSlug}`,
    });
  } else {
    breadcrumbItems.push({ name: "Municipios", url: "/municipio" });
  }
  breadcrumbItems.push({ name: ctx.nombre || idMunicipio, url: path });
  const breadcrumbJsonLd = jsonLdBreadcrumb(breadcrumbItems);

  const placeJsonLd = jsonLdPlaceMunicipio({
    nombre: ctx.nombre,
    provincia: ctx.provincia,
    url,
    numStations: ctx.lista.length,
  });

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
      {placeJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd) }}
        />
      )}
      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      )}
      <MainContent initialData={initialData} mode="manual" />
      {ctx.idProvincia && ctx.provincia && (
        <NearbyMunicipios
          idProvincia={ctx.idProvincia}
          provincia={ctx.provincia}
          currentIdMunicipio={idMunicipio}
        />
      )}
    </>
  );
}
