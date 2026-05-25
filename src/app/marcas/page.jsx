import Link from "next/link";
import { KNOWN_BRANDS } from "../../lib/brands";
import { buildMetadata, jsonLdBreadcrumb } from "../../lib/seo";
import { absoluteUrl, getSiteUrl } from "../../lib/site";

// Lista estática de marcas conocidas: no toca MITECO, se puede prerenderizar
// y servir desde edge.
export const revalidate = 86400;

export const metadata = buildMetadata({
  title: "Marcas de gasolineras en España · Carburantes",
  description:
    "Explora las gasolineras de Repsol, Cepsa, BP, Galp, Shell y otras 18 marcas operando en España.",
  path: "/marcas",
});

export default function MarcasIndexPage() {
  const breadcrumbJsonLd = jsonLdBreadcrumb([
    { name: "Inicio", url: "/" },
    { name: "Marcas", url: "/marcas" },
  ]);
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Marcas de gasolineras en España",
    url: absoluteUrl("/marcas"),
    numberOfItems: KNOWN_BRANDS.length,
    itemListElement: KNOWN_BRANDS.map((b, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Organization",
        name: b.display,
        url: `${getSiteUrl()}/marca/${b.id}`,
      },
    })),
  };

  return (
    <main id="main" className="brands">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <header className="brands__head">
        <h1 className="brands__title">Marcas de gasolineras</h1>
        <p className="brands__sub">
          {KNOWN_BRANDS.length} marcas operando en España. Cada una agrupa sus
          estaciones por provincia con precios actualizados del Ministerio.
        </p>
      </header>

      <ul className="brands__grid">
        {KNOWN_BRANDS.map((b) => (
          <li key={b.id} className="brands__item">
            <Link href={`/marca/${b.id}`} className="brands__link">
              <span className="brands__logo">
                <img
                  src={`/station-icons/logo_${b.id}.gif`}
                  alt=""
                  aria-hidden="true"
                  width="40"
                  height="40"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="brands__name">{b.display}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
