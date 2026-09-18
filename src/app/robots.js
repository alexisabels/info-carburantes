import { absoluteUrl } from "../lib/site";

// Estrategia: bloquear los bots de ENTRENAMIENTO y los espías SEO, y dejar
// pasar los de RESPUESTA (los que citan la web en respuestas en vivo, que es
// lo que persigue nuestro /llms.txt) y los buscadores de toda la vida.
//
// Motivo: GPTBot generaba 76 600 peticiones/día (el 97% del tráfico total del
// sitio) rastreando las ~8000 páginas de municipio, y cada visita a una copia
// ISR caducada la regeneraba y escribía. Googlebot, en el mismo día: 51.

// Rastreo para entrenar modelos. No nos aporta tráfico ni citación.
const AI_TRAINING_BOTS = [
  "GPTBot", // OpenAI — el causante del pico
  "ClaudeBot",
  "anthropic-ai",
  "CCBot", // Common Crawl, del que se alimentan casi todos
  "Bytespider", // ByteDance, notoriamente agresivo
  "Google-Extended", // solo entrenamiento de Gemini; NO afecta a Googlebot
  "Applebot-Extended", // ídem con Apple Intelligence; NO afecta a Applebot
  "meta-externalagent",
  "Amazonbot",
  "Diffbot",
  "Omgilibot",
  "Timpibot",
];

// Herramientas SEO de terceros: consumen presupuesto de rastreo para que otro
// analice nuestro sitio. Cero beneficio para nosotros.
const SEO_SPY_BOTS = [
  "SemrushBot",
  "AhrefsBot",
  "MJ12bot",
  "DotBot",
  "DataForSeoBot",
  "BLEXBot",
  "PetalBot",
];

export default function robots() {
  return {
    rules: [
      // Buscadores y bots de respuesta (OAI-SearchBot, ChatGPT-User,
      // PerplexityBot, Googlebot, Bingbot...) siguen teniendo acceso total.
      { userAgent: "*", allow: "/" },
      ...[...AI_TRAINING_BOTS, ...SEO_SPY_BOTS].map((userAgent) => ({
        userAgent,
        disallow: "/",
      })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/").replace(/\/$/, ""),
  };
}
