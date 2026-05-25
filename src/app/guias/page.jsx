import Link from "next/link";
import {
  buildMetadata,
  jsonLdBreadcrumb,
  jsonLdBlog,
} from "../../lib/seo";
import { absoluteUrl } from "../../lib/site";
import { GUIDES, GUIDE_CATEGORIES, getGuidesByCategory } from "../../content/guides";

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

      {GUIDE_CATEGORIES.map((cat) => {
        const guides = getGuidesByCategory(cat.id);
        if (!guides.length) return null;
        return (
          <section
            key={cat.id}
            className="guides__cat"
            aria-labelledby={`cat-${cat.id}`}
          >
            <h2 id={`cat-${cat.id}`} className="guides__cat-title">
              {cat.name}
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
