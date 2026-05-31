import Link from "next/link";
import {
  buildMetadata,
  jsonLdBreadcrumb,
  jsonLdBlog,
} from "../../lib/seo";
import { absoluteUrl } from "../../lib/site";
import {
  GUIDES,
  GUIDE_CATEGORIES,
  getGuidesByCategory,
  getGuide,
} from "../../content/guides";

// Slugs destacados que abren el hub. Se resuelven contra el registro con
// getGuide(); si alguno desaparece del registro, simplemente se omite (no
// rompe el render). El orden aquí es el orden de aparición.
const FEATURED_SLUGS = [
  "gasolineras-low-cost",
  "mejor-hora-dia-repostar",
  "gasolina-95-vs-98",
  "como-se-forma-precio-gasolina",
  "me-he-equivocado-combustible",
];

// Hub estático de guías. No depende de MITECO, así que Next puede
// pre-renderizar y servir desde edge en milisegundos. Revalidate alto para
// invalidar si añadimos nuevas guías sin redeploy completo.
export const revalidate = 86400;

export const metadata = buildMetadata({
  title: "Guías de carburantes en España · Carburantes",
  description:
    "Guías prácticas sobre tipos de combustible, ahorro al repostar, mercado de carburantes y decisiones de compra de coche. Información clara y actualizada.",
  path: "/guias",
});

export default function GuiasIndexPage() {
  const path = "/guias";
  const url = absoluteUrl(path);

  // Resolvemos las destacadas y las categorías no vacías una sola vez. Las
  // categorías se mapean DINÁMICAMENTE desde GUIDE_CATEGORIES: añadir una
  // categoría nueva al registro la hace aparecer aquí sin tocar la página.
  const featured = FEATURED_SLUGS.map(getGuide).filter(Boolean);
  const sections = GUIDE_CATEGORIES.map((cat) => ({
    cat,
    guides: getGuidesByCategory(cat.id),
  })).filter((s) => s.guides.length > 0);

  const breadcrumbJsonLd = jsonLdBreadcrumb([
    { name: "Inicio", url: "/" },
    { name: "Guías", url: "/guias" },
  ]);

  const blogJsonLd = jsonLdBlog({
    url,
    name: "Guías de Carburantes",
    description:
      "Guías editoriales sobre tipos de combustible, ahorro, mercado y compra de coche en España.",
    posts: GUIDES.map((g) => ({
      title: g.title,
      description: g.description,
      datePublished: g.datePublished,
      dateModified: g.dateModified,
      path: `/guias/${g.slug}`,
    })),
  });

  // CollectionPage extra: ayuda a los LLMs a entender que esta página es una
  // colección editorial y no una landing comercial.
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    url,
    name: "Guías de Carburantes",
    description:
      "Colección de guías editoriales sobre combustibles, gasolineras y ahorro en España.",
    inLanguage: "es-ES",
    isPartOf: { "@type": "WebSite", url: absoluteUrl("/") },
    hasPart: GUIDES.map((g) => ({
      "@type": "Article",
      headline: g.title,
      url: absoluteUrl(`/guias/${g.slug}`),
      datePublished: g.datePublished,
      dateModified: g.dateModified,
    })),
  };

  return (
    <main id="main" className="guides">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <header className="guides__head">
        <nav className="guides__crumbs" aria-label="Migas">
          <Link href="/">Inicio</Link>
          <span aria-hidden="true"> › </span>
          <span>Guías</span>
        </nav>
        <h1 className="guides__title">Guías de carburantes</h1>
        <p className="guides__lede">
          Información clara y verificada sobre tipos de combustible, ahorro al
          repostar, mercado de carburantes y decisiones de compra. Sin
          publicidad, sin afiliados — solo datos útiles para tomar mejores
          decisiones.
        </p>
      </header>

      {featured.length > 0 && (
        <section className="guides__featured" aria-labelledby="guides-featured">
          <p id="guides-featured" className="guides__featured-title">
            Para empezar
          </p>
          <ul className="guides__featured-list">
            {featured.map((g) => (
              <li key={g.slug} className="guides__featured-item">
                <Link
                  href={`/guias/${g.slug}`}
                  className="guides__featured-link"
                >
                  <span className="guides__featured-name">{g.title}</span>
                  <span className="guides__featured-meta">
                    {g.readingMinutes} min
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {sections.length > 1 && (
        <nav className="guides__nav" aria-label="Categorías de guías">
          <ul className="guides__nav-list">
            {sections.map(({ cat, guides }) => (
              <li key={cat.id} className="guides__nav-item">
                <a href={`#cat-${cat.id}`} className="guides__nav-link">
                  {cat.name}
                  <span className="guides__nav-count" aria-hidden="true">
                    {" "}
                    ({guides.length})
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {sections.map(({ cat, guides }) => {
        return (
          <section
            key={cat.id}
            className="guides__cat"
            aria-labelledby={`cat-${cat.id}`}
          >
            <h2 id={`cat-${cat.id}`} className="guides__cat-title">
              {cat.name}
              <span className="guides__cat-count">
                {" "}
                · {guides.length} {guides.length === 1 ? "guía" : "guías"}
              </span>
            </h2>
            <p className="guides__cat-desc">{cat.description}</p>
            <ul className="guides__grid">
              {guides.map((g) => (
                <li key={g.slug} className="guides__card">
                  <Link href={`/guias/${g.slug}`} className="guides__card-link">
                    <h3 className="guides__card-title">{g.title}</h3>
                    <p className="guides__card-desc">{g.description}</p>
                    <span className="guides__card-meta">
                      {g.readingMinutes} min · Leer guía →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <aside className="guides__cta-bottom" aria-label="Usar la app">
        <p className="guides__cta-title">¿Necesitas precios reales?</p>
        <p className="guides__cta-body">
          Las guías te ayudan a tomar decisiones; los precios actualizados
          los ves en cada estación de servicio. Carburantes lee la
          información oficial del Ministerio cada media hora.
        </p>
        <Link href="/" className="guides__cta-btn">
          Buscar gasolineras <span aria-hidden="true">→</span>
        </Link>
      </aside>
    </main>
  );
}
