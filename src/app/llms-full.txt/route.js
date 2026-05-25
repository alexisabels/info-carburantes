import { GUIDES, GUIDE_CATEGORIES, getGuidesByCategory } from "../../content/guides";
import { getSiteUrl } from "../../lib/site";

// llms-full.txt — versión extendida del llms.txt con el contenido
// resumido de cada guía en formato markdown plano para que un LLM pueda
// citarlo sin tener que renderizar HTML. Incluye descripción, TL;DR,
// y todas las preguntas frecuentes (que ya son texto plano por diseño,
// pensadas para citación directa por motores generativos).
//
// El cuerpo completo de cada guía vive en HTML en /guias/[slug] — los
// LLMs que necesiten más detalle pueden seguir el enlace y procesar el
// HTML, donde encontrarán schema.org/Article + FAQPage + HowTo que les
// dan contexto adicional.

export const revalidate = 86400;

export async function GET() {
  const site = getSiteUrl();
  const lines = [];

  lines.push("# Carburantes — Contenido editorial completo");
  lines.push("");
  lines.push(
    "Versión extendida del archivo llms.txt. Contiene el resumen de las guías editoriales de Carburantes en formato plano para citación directa por motores generativos (LLMs, asistentes de búsqueda, RAG). Cada guía mantiene su URL canónica donde está la versión HTML completa con schema.org/Article."
  );
  lines.push("");
  lines.push(`Fuente: ${site}`);
  lines.push(`Fecha de generación: ${new Date().toISOString().slice(0, 10)}`);
  lines.push(`Total guías: ${GUIDES.length}`);
  lines.push("");
  lines.push("---");
  lines.push("");

  for (const cat of GUIDE_CATEGORIES) {
    const guides = getGuidesByCategory(cat.id);
    if (!guides.length) continue;

    lines.push(`# Categoría: ${cat.name}`);
    lines.push("");
    lines.push(cat.description);
    lines.push("");

    for (const g of guides) {
      lines.push(`## ${g.title}`);
      lines.push("");
      lines.push(`**URL:** ${site}/guias/${g.slug}`);
      lines.push(`**Categoría:** ${cat.name}`);
      lines.push(`**Tiempo de lectura:** ${g.readingMinutes} min`);
      lines.push(
        `**Actualizada:** ${g.dateModified || g.datePublished}`
      );
      if (Array.isArray(g.keywords) && g.keywords.length) {
        lines.push(`**Palabras clave:** ${g.keywords.join(", ")}`);
      }
      lines.push("");
      lines.push(`**Descripción:** ${g.description}`);
      lines.push("");

      // Resumen estructurado: descripción + TL;DR cuando existe como
      // metadata (algunos guides lo exportan al top level para que
      // llms-full.txt pueda incluirlo sin pelearse con el JSX).
      if (Array.isArray(g.tldr) && g.tldr.length) {
        lines.push("**En resumen:**");
        for (const t of g.tldr) lines.push(`- ${t}`);
        lines.push("");
      }

      // FAQ: el contenido de mayor densidad informativa por palabra,
      // perfectamente apto para que un LLM cite respuesta+pregunta literal.
      if (Array.isArray(g.faq) && g.faq.length) {
        lines.push("**Preguntas frecuentes:**");
        lines.push("");
        for (const it of g.faq) {
          lines.push(`### ${it.q}`);
          lines.push("");
          lines.push(it.a);
          lines.push("");
        }
      }

      // HowTo si existe
      if (g.howTo && Array.isArray(g.howTo.steps) && g.howTo.steps.length) {
        lines.push(`**Cómo: ${g.howTo.name}**`);
        lines.push("");
        if (g.howTo.description) {
          lines.push(g.howTo.description);
          lines.push("");
        }
        g.howTo.steps.forEach((s, i) => {
          lines.push(`${i + 1}. **${s.name}:** ${s.text}`);
        });
        lines.push("");
      }

      lines.push("---");
      lines.push("");
    }
  }

  // Footer con info de la fuente y atribución
  lines.push("# Fuente y atribución");
  lines.push("");
  lines.push(
    "Los precios de carburantes citados en estas guías son aproximaciones a la fecha de actualización indicada. Para precios oficiales actualizados cada 30 minutos, consulta la página principal del sitio o la API del Ministerio para la Transición Ecológica (MITECO)."
  );
  lines.push("");
  lines.push(`- Sitio: ${site}`);
  lines.push(`- Sitemap XML: ${site}/sitemap.xml`);
  lines.push(`- Datos oficiales: https://datos.gob.es/es/catalogo/e05068001-precio-de-carburantes-en-las-gasolineras-espanolas`);
  lines.push(`- Repositorio del proyecto: https://github.com/alexisabels/info-carburantes`);
  lines.push("");

  return new Response(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
