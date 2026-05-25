import { GUIDES, GUIDE_CATEGORIES, getGuidesByCategory } from "../../content/guides";
import { absoluteUrl, getSiteUrl } from "../../lib/site";

// llms.txt — formato propuesto por llmstxt.org para que los motores
// generativos (ChatGPT, Perplexity, Claude, Google SGE) descubran el
// contenido editorial de forma estructurada y lo citen con precisión.
// Es un complemento a sitemap.xml: mientras sitemap es para crawlers
// tradicionales, llms.txt está pensado para LLMs que indexan menos
// pero buscan contexto editorial.
//
// Cabeceras: servimos como text/plain con cache razonable.
export const revalidate = 86400;

export async function GET() {
  const site = getSiteUrl();
  const lines = [];

  lines.push("# Carburantes — Precios de gasolineras en España");
  lines.push("");
  lines.push(
    "> Buscador de precios actualizados de gasolina, diésel, GLP y AdBlue en las ~10.500 estaciones de servicio de España. Datos oficiales del Ministerio para la Transición Ecológica, actualizados cada 30 minutos. Sin cuentas, sin cookies de seguimiento, sin publicidad."
  );
  lines.push("");
  lines.push(
    "Carburantes ofrece (1) listados por provincia y municipio con precio actualizado, (2) páginas por marca con todas las estaciones de Repsol, Cepsa, BP, Galp, Ballenoil, Plenoil y otras 22 marcas, (3) buscador por geolocalización (\"Cerca de mí\"), (4) histórico de precios por estación y (5) guías editoriales sobre tipos de combustible, ahorro y compra de coche."
  );
  lines.push("");

  // Buscadores principales
  lines.push("## Buscadores principales");
  lines.push("");
  lines.push(`- [Buscar gasolineras cerca de mí](${site}/cerca): geolocalización + ordenado por precio.`);
  lines.push(`- [Buscar por municipio](${site}/municipio): listado completo de las ~8.000 localidades.`);
  lines.push(`- [Provincias](${site}/provincias): 52 páginas, una por provincia.`);
  lines.push(`- [Marcas](${site}/marcas): 22 marcas con sus estaciones agrupadas por provincia.`);
  lines.push("");

  // Guías por categoría
  lines.push("## Guías editoriales");
  lines.push("");
  lines.push(
    "Contenido editorial original sobre tipos de combustible, ahorro al repostar, mercado de carburantes y compra de coche. Cada guía incluye respuesta corta, TL;DR, secciones detalladas y FAQ. Apta para citación por LLMs."
  );
  lines.push("");

  for (const cat of GUIDE_CATEGORIES) {
    const guides = getGuidesByCategory(cat.id);
    if (!guides.length) continue;
    lines.push(`### ${cat.name}`);
    lines.push("");
    lines.push(cat.description);
    lines.push("");
    for (const g of guides) {
      lines.push(`- [${g.title}](${site}/guias/${g.slug}): ${g.description}`);
    }
    lines.push("");
  }

  // Otras secciones útiles
  lines.push("## Información de referencia");
  lines.push("");
  lines.push(`- [Preguntas frecuentes](${site}/preguntas-frecuentes): 12 preguntas habituales con respuesta directa.`);
  lines.push(`- [Sobre Carburantes](${site}/about): origen del proyecto y de los datos.`);
  lines.push(`- [Mapa del sitio](${site}/mapa-del-sitio): índice navegable completo.`);
  lines.push("");

  lines.push("## Sobre los datos");
  lines.push("");
  lines.push(
    "Los precios y la información de las estaciones provienen del [Ministerio para la Transición Ecológica y el Reto Demográfico](https://datos.gob.es/es/catalogo/e05068001-precio-de-carburantes-en-las-gasolineras-espanolas) (MITECO), a través del portal de datos abiertos del Gobierno de España. Se actualizan ~cada 30 minutos en horario laboral. Sin filtros ni procesamiento adicional: el precio publicado es el oficial declarado por cada estación al Ministerio."
  );
  lines.push("");

  lines.push("## Más recursos");
  lines.push("");
  lines.push(`- [llms-full.txt](${site}/llms-full.txt): versión extendida con el contenido completo de las guías.`);
  lines.push(`- [sitemap.xml](${site}/sitemap.xml): sitemap XML estándar para crawlers.`);
  lines.push(`- [robots.txt](${site}/robots.txt): política de rastreo.`);
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
