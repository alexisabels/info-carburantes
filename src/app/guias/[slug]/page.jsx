import Link from "next/link";
import { notFound } from "next/navigation";
import {
  buildMetadata,
  jsonLdArticle,
  jsonLdBreadcrumb,
  jsonLdFAQ,
  jsonLdHowTo,
} from "../../../lib/seo";
import { absoluteUrl } from "../../../lib/site";
import {
  GUIDES,
  getGuide,
  getRelatedGuides,
  categoryName,
} from "../../../content/guides";

// Las guías son contenido editorial estático (no dependen de MITECO). Las
// pre-generamos todas en build: 15 páginas se construyen en segundos y se
// sirven desde edge sin latencia. Si añadimos guías nuevas, basta con un
// redeploy o esperar al revalidate.
export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) {
    return buildMetadata({
      title: "Guía no encontrada · Carburantes",
      path: `/guias/${slug}`,
      noindex: true,
    });
  }
  return buildMetadata({
    title: guide.seoTitle || guide.title,
    description: guide.description,
    path: `/guias/${guide.slug}`,
  });
}

export default async function GuidePage({ params }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const path = `/guias/${guide.slug}`;
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(`${path}/opengraph-image`);
  const related = getRelatedGuides(guide.slug);

  const breadcrumbJsonLd = jsonLdBreadcrumb([
    { name: "Inicio", url: "/" },
    { name: "Guías", url: "/guias" },
    { name: guide.title, url: path },
  ]);

  // Word count aproximado: usado por Google Discover y algunos LLMs como
  // señal de calidad/profundidad. Para no hacer reflection sobre el JSX
  // damos una estimación basada en readingMinutes (~200 palabras/min).
  const estimatedWords = (guide.readingMinutes || 5) * 200;

  const articleJsonLd = jsonLdArticle({
    url,
    title: guide.title,
    description: guide.description,
    datePublished: guide.datePublished,
    dateModified: guide.dateModified || guide.datePublished,
    imageUrl,
    category: categoryName(guide.category),
    wordCount: estimatedWords,
    keywords: guide.keywords,
    mentions: guide.mentions,
  });

  const faqJsonLd =
    Array.isArray(guide.faq) && guide.faq.length
      ? jsonLdFAQ(guide.faq)
      : null;

  const howToJsonLd = guide.howTo
    ? jsonLdHowTo({
        url,
        name: guide.howTo.name,
        description: guide.howTo.description,
        totalTime: guide.howTo.totalTime,
        steps: guide.howTo.steps,
        imageUrl,
      })
    : null;

  const Body = guide.Body;

  return (
    <main id="main" className="guide">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      )}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <article className="guide__article">
        <header className="guide__head">
          <nav className="guide__crumbs" aria-label="Migas">
            <Link href="/">Inicio</Link>
            <span aria-hidden="true"> › </span>
            <Link href="/guias">Guías</Link>
            <span aria-hidden="true"> › </span>
            <span>{categoryName(guide.category)}</span>
          </nav>

          <h1 className="guide__title">{guide.title}</h1>
          <p className="guide__lede">{guide.description}</p>

          <div className="guide__meta" aria-label="Metadatos del artículo">
            <span className="guide__cat-pill">
              {categoryName(guide.category)}
            </span>
            <span className="guide__meta-sep" aria-hidden="true">
              ·
            </span>
            <span>{guide.readingMinutes} min de lectura</span>
            <span className="guide__meta-sep" aria-hidden="true">
              ·
            </span>
            <time dateTime={guide.dateModified || guide.datePublished}>
              Actualizada{" "}
              {new Date(
                guide.dateModified || guide.datePublished
              ).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>
        </header>

        <div className="guide__body">
          <Body />
        </div>

        {Array.isArray(guide.faq) && guide.faq.length > 0 && (
          <section className="guide__faq" aria-labelledby="guide-faq">
            <h2 id="guide-faq" className="guide__faq-title">
              Preguntas frecuentes
            </h2>
            <div className="guide__faq-list">
              {guide.faq.map((it, idx) => (
                <article key={idx} className="guide__faq-item">
                  <h3 className="guide__faq-q">{it.q}</h3>
                  <p className="guide__faq-a">{it.a}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="guide__more" aria-labelledby="guide-more">
            <h2 id="guide-more" className="guide__more-title">
              Otras guías que te pueden interesar
            </h2>
            <ul className="guide__more-list">
              {related.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/guias/${g.slug}`}
                    className="guide__more-link"
                  >
                    <span className="guide__more-link-title">{g.title}</span>
                    <span className="guide__more-link-desc">
                      {g.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <footer className="guide__foot">
          <p>
            Volver a <Link href="/guias">todas las guías</Link> o ir al{" "}
            <Link href="/">buscador de gasolineras</Link>.
          </p>
        </footer>
      </article>
    </main>
  );
}
