// URL pública del sitio. Se usa para canonicales, OG, sitemap y JSON-LD. En
// Vercel la variable VERCEL_URL trae el host del preview deployment, así que
// caemos a ella cuando no hay un dominio custom definido. Solo es relevante
// en build/SSR: en cliente, Next.js ya resuelve relativos contra location.
const PROD_FALLBACK = "https://carburantes.alexisabel.com";

export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return PROD_FALLBACK;
}

export function absoluteUrl(path = "/") {
  const base = getSiteUrl();
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}
