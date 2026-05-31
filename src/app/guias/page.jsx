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
  getGuide,
} from "../../content/guides";
import GuidesBrowser from "../../components/Guides/GuidesBrowser";

// Slugs destacados que abren el hub. Se resuelven contra el registro con
// getGuide(); si alguno desaparece del registro, simplemente se omite (no
// rompe el render). El orden aquí es el orden de aparición. Los dos pilares
// abren la lista (guía de tipos de combustible y guía de ahorro).
const FEATURED_SLUGS = [
  "tipos-de-combustible-guia-completa",
  "como-ahorrar-en-combustible-guia",
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

  // Resolvemos las destacadas una sola vez. El agrupado por categoría y el
  // filtrado viven en <GuidesBrowser> (componente cliente), que se renderiza
  // también en servidor: las secciones y enlaces salen en el HTML inicial.

  const featured = FEATURED_SLUGS.map(getGuide).filter(Boolean);

  // Solo campos serializables hacia el componente cliente (NUNCA el campo
  // Body, que es una función y no cruza la frontera servidor → cliente).
  const guideItems = GUIDES.map((g) => ({
    slug: g.slug,
    title: g.title,
    description: g.description,
    category: g.category,
    readingMinutes: g.readingMinutes,
  }));
  const categories = GUIDE_CATEGORIES.map((c) => ({
    id: c.id,
    name: c.name,
    description: c.description,
  }));

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

      <GuidesBrowser guides={guideItems} categories={categories} />

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
