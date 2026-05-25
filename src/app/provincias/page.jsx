import Link from "next/link";
import { fetchProvinciasServer } from "../../lib/api-server";
import { slugify } from "../../utils/slug";
import { absoluteUrl } from "../../lib/site";
import {
  buildMetadata,
  jsonLdBreadcrumb,
} from "../../lib/seo";

export const revalidate = 86400;

const collator = new Intl.Collator("es", { sensitivity: "base" });

export const metadata = buildMetadata({
  title: "Provincias de España · Carburantes",
  description:
    "Listado de las 52 provincias españolas con sus gasolineras. Compara precios de gasolina y diésel por provincia.",
  path: "/provincias",
});

export default async function ProvinciasIndexPage() {
  const provincias = await fetchProvinciasServer();
  const ordenadas = [...provincias]
    .filter((p) => p?.IDPovincia && p?.Provincia)
    .sort((a, b) => collator.compare(a.Provincia, b.Provincia));

  const breadcrumbJsonLd = jsonLdBreadcrumb([
    { name: "Inicio", url: "/" },
    { name: "Provincias", url: "/provincias" },
  ]);

  const itemListJsonLd = ordenadas.length
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Provincias de España",
        url: absoluteUrl("/provincias"),
        numberOfItems: ordenadas.length,
        itemListElement: ordenadas.slice(0, 100).map((p, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "AdministrativeArea",
            name: p.Provincia,
            url: absoluteUrl(
              `/provincia/${encodeURIComponent(String(p.IDPovincia))}/${slugify(
                p.Provincia
              )}`
            ),
          },
        })),
      }
    : null;

  return (
    <main id="main" className="provinces">
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

      <header className="provinces__head">
        <h1 className="provinces__title">Provincias de España</h1>
        <p className="provinces__sub">
          {ordenadas.length === 0
            ? "No se ha podido cargar el listado de provincias ahora mismo."
            : `Selecciona una de las ${ordenadas.length} provincias para ver sus municipios y comparar precios de combustible.`}
        </p>
      </header>

      {ordenadas.length > 0 && (
        <ul className="provinces__grid">
          {ordenadas.map((p) => {
            const id = String(p.IDPovincia);
            const slug = slugify(p.Provincia);
            const href = `/provincia/${id}/${slug}`;
            return (
              <li key={id} className="provinces__item">
                <Link href={href} className="provinces__link">
                  {p.Provincia}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
