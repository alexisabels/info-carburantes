import { redirect } from "next/navigation";
import Link from "next/link";
import { slugify } from "../../../../utils/slug";
import {
  getProvinciaContext,
  getMunicipiosOfProvincia,
} from "../../../../lib/provincias";
import { absoluteUrl } from "../../../../lib/site";
import {
  buildMetadata,
  jsonLdAdministrativeArea,
  jsonLdBreadcrumb,
  jsonLdItemListProvincia,
} from "../../../../lib/seo";

export const dynamicParams = true;
export const revalidate = 86400;

const collator = new Intl.Collator("es", { sensitivity: "base" });

async function loadProvincia({ idProvincia, slug }) {
  const ctx = await getProvinciaContext(idProvincia);
  const municipios = ctx.nombre
    ? await getMunicipiosOfProvincia(idProvincia)
    : [];
  return { ctx, municipios, slugMatches: !slug || ctx.slug === slug };
}

export async function generateMetadata({ params }) {
  const { idProvincia, slug } = await params;
  const { ctx, municipios } = await loadProvincia({ idProvincia, slug });

  if (!ctx.nombre) {
    return buildMetadata({
      title: "Provincia no encontrada · Carburantes",
      path: `/provincia/${idProvincia}/${slug}`,
      noindex: true,
    });
  }

  const total = municipios.length;
  const titulo = `Gasolineras en la provincia de ${ctx.nombre} — Carburantes`;
  const descripcion = total
    ? `Compara precios de gasolineras en ${total} municipios de ${ctx.nombre}. Diésel y gasolina con datos oficiales del Ministerio.`
    : `Precios de gasolineras en la provincia de ${ctx.nombre} con datos oficiales del Ministerio.`;

  return buildMetadata({
    title: titulo,
    description: descripcion,
    path: `/provincia/${ctx.idProvincia}/${ctx.slug}`,
  });
}

export default async function ProvinciaListadoPage({ params }) {
  const { idProvincia, slug } = await params;
  const { ctx, municipios } = await loadProvincia({ idProvincia, slug });

  if (ctx.slug && slug !== ctx.slug) {
    redirect(`/provincia/${ctx.idProvincia}/${ctx.slug}`);
  }

  // Ordenamos alfabéticamente para que el listado sea estable y
  // facilite el escaneo del usuario.
  const ordenados = [...municipios].sort((a, b) =>
    collator.compare(a?.Municipio || "", b?.Municipio || "")
  );

  const path = `/provincia/${idProvincia}/${ctx.slug || slug}`;
  const url = absoluteUrl(path);

  const breadcrumbJsonLd = jsonLdBreadcrumb([
    { name: "Inicio", url: "/" },
    { name: "Provincias", url: "/provincias" },
    { name: ctx.nombre || idProvincia, url: path },
  ]);
  const areaJsonLd = jsonLdAdministrativeArea({
    nombre: ctx.nombre,
    url,
    numMunicipios: ordenados.length,
  });
  const itemListJsonLd = ordenados.length
    ? jsonLdItemListProvincia(ordenados, {
        provincia: ctx.nombre,
        url,
      })
    : null;

  return (
    <main id="main" className="province">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {areaJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(areaJsonLd) }}
        />
      )}
      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      )}

      <header className="province__head">
        <nav className="province__crumbs" aria-label="Migas">
          <Link href="/provincias">Provincias</Link>
          <span aria-hidden="true"> › </span>
          <span>{ctx.nombre || "Provincia"}</span>
        </nav>
        <h1 className="province__title">
          Gasolineras en la provincia de {ctx.nombre || "(desconocida)"}
        </h1>
        {ordenados.length > 0 && (
          <p className="province__sub">
            {ordenados.length} {ordenados.length === 1 ? "municipio" : "municipios"} con
            estaciones de servicio en el directorio del Ministerio.
          </p>
        )}
      </header>

      {ordenados.length === 0 ? (
        <p className="province__empty">
          No hay municipios cargados para esta provincia ahora mismo. Vuelve a
          intentarlo más tarde.
        </p>
      ) : (
        <ul className="province__list">
          {ordenados.map((m) => {
            const id = String(m?.IDMunicipio || "");
            const nombre = m?.Municipio || "Municipio";
            const muniSlug = slugify(nombre);
            const href = muniSlug
              ? `/municipio/${id}/${muniSlug}`
              : `/municipio/${id}`;
            return (
              <li key={id} className="province__item">
                <Link href={href} className="province__link">
                  <span className="province__muni">{nombre}</span>
                  <span aria-hidden="true" className="province__chev">
                    ›
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
