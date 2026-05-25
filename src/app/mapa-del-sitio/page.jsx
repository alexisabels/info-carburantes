import Link from "next/link";
import { fetchProvinciasServer } from "../../lib/api-server";
import { KNOWN_BRANDS } from "../../lib/brands";
import { buildMetadata, jsonLdBreadcrumb } from "../../lib/seo";
import { slugify } from "../../utils/slug";
import { GUIDES, GUIDE_CATEGORIES, getGuidesByCategory } from "../../content/guides";

// Mapa del sitio HTML (no es el sitemap.xml para crawlers — es para
// usuarios y crawlers que prefieren navegar siguiendo enlaces). Sirve como
// "hub" interno: distribuye PageRank y facilita el descubrimiento.

export const revalidate = 86400;

const collator = new Intl.Collator("es", { sensitivity: "base" });

export const metadata = buildMetadata({
  title: "Mapa del sitio · Carburantes",
  description:
    "Todas las secciones de Carburantes: provincias, marcas y páginas de información.",
  path: "/mapa-del-sitio",
});

export default async function SiteMapPage() {
  const provincias = await fetchProvinciasServer();
  const provOrd = [...provincias]
    .filter((p) => p?.IDPovincia && p?.Provincia)
    .sort((a, b) => collator.compare(a.Provincia, b.Provincia));

  const breadcrumbJsonLd = jsonLdBreadcrumb([
    { name: "Inicio", url: "/" },
    { name: "Mapa del sitio", url: "/mapa-del-sitio" },
  ]);

  return (
    <main id="main" className="sitemap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <header className="sitemap__head">
        <h1 className="sitemap__title">Mapa del sitio</h1>
        <p className="sitemap__sub">
          Índice completo de Carburantes con enlaces a todas las secciones.
        </p>
      </header>

      <section className="sitemap__sec" aria-labelledby="sm-pages">
        <h2 id="sm-pages" className="sitemap__sec-title">
          Páginas principales
        </h2>
        <ul className="sitemap__pages">
          <li><Link href="/">Inicio</Link></li>
          <li><Link href="/cerca">Cerca de mí</Link></li>
          <li><Link href="/municipio">Buscar por municipio</Link></li>
          <li><Link href="/provincias">Provincias</Link></li>
          <li><Link href="/marcas">Marcas</Link></li>
          <li><Link href="/guias">Guías</Link></li>
          <li><Link href="/preguntas-frecuentes">Preguntas frecuentes</Link></li>
          <li><Link href="/about">Sobre Carburantes</Link></li>
        </ul>
      </section>

      <section className="sitemap__sec" aria-labelledby="sm-guides">
        <h2 id="sm-guides" className="sitemap__sec-title">
          Guías ({GUIDES.length})
        </h2>
        {GUIDE_CATEGORIES.map((cat) => {
          const guides = getGuidesByCategory(cat.id);
          if (!guides.length) return null;
          return (
            <div key={cat.id} className="sitemap__subgroup">
              <h3 className="sitemap__subgroup-title">{cat.name}</h3>
              <ul className="sitemap__pages">
                {guides.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/guias/${g.slug}`}>{g.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      <section className="sitemap__sec" aria-labelledby="sm-brands">
        <h2 id="sm-brands" className="sitemap__sec-title">
          Marcas
        </h2>
        <ul className="sitemap__brands">
          {KNOWN_BRANDS.map((b) => (
            <li key={b.id}>
              <Link href={`/marca/${b.id}`}>{b.display}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="sitemap__sec" aria-labelledby="sm-provincias">
        <h2 id="sm-provincias" className="sitemap__sec-title">
          Provincias ({provOrd.length})
        </h2>
        <ul className="sitemap__provincias">
          {provOrd.map((p) => {
            const slug = slugify(p.Provincia);
            return (
              <li key={String(p.IDPovincia)}>
                <Link href={`/provincia/${p.IDPovincia}/${slug}`}>
                  {p.Provincia}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
