import {
  fetchProvinciasServer,
  fetchMunicipiosPorProvinciaServer,
} from "../lib/api-server";
import { slugify } from "../utils/slug";
import { getSiteUrl } from "../lib/site";

// Sitemap dinámico: enumera home, about y todos los municipios de España con
// su slug canónico. El detalle por gasolinera no se incluye explícitamente
// (>10 000 entradas inflarían el XML); confiamos en que los crawlers
// descubran las fichas siguiendo los enlaces internos desde cada municipio.
//
// Se regenera cada 24h (vía revalidate de la API). Tamaño esperado: ~8000
// municipios → bien dentro del límite de 50 000 entradas por sitemap.

export const revalidate = 86400;

export default async function sitemap() {
  const base = getSiteUrl();
  const now = new Date();
  const entries = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 1.0,
    },
    {
      url: `${base}/municipio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  let provincias = [];
  try {
    provincias = await fetchProvinciasServer();
  } catch {
    // Sin provincias caemos a un sitemap mínimo con las páginas estáticas.
    return entries;
  }

  // Lanzamos las 52 peticiones de municipios en paralelo, pero con un cap
  // de concurrencia razonable para no saturar el endpoint del MITECO.
  const CONCURRENCY = 8;
  const seen = new Set();
  const municipioEntries = [];

  const provinciaIds = provincias
    .map((p) => p?.IDPovincia)
    .filter((id) => id !== undefined && id !== null);

  for (let i = 0; i < provinciaIds.length; i += CONCURRENCY) {
    const batch = provinciaIds.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      batch.map((id) => fetchMunicipiosPorProvinciaServer(id))
    );
    for (const lista of results) {
      for (const m of lista || []) {
        if (!m?.IDMunicipio || !m?.Municipio) continue;
        const id = String(m.IDMunicipio);
        if (seen.has(id)) continue;
        seen.add(id);
        const slug = slugify(m.Municipio);
        if (!slug) continue;
        municipioEntries.push({
          url: `${base}/municipio/${encodeURIComponent(id)}/${slug}`,
          lastModified: now,
          changeFrequency: "daily",
          priority: 0.7,
        });
      }
    }
  }

  return entries.concat(municipioEntries);
}
