import {
  fetchProvinciasServer,
  fetchMunicipiosPorProvinciaServer,
} from "../lib/api-server";
import { slugify } from "../utils/slug";
import { getSiteUrl } from "../lib/site";
import { KNOWN_BRANDS } from "../lib/brands";
import { GUIDES } from "../content/guides";

// Sitemap dinámico: enumera home, índices y todas las provincias + todos los
// municipios canónicos. Las gasolineras individuales NO se incluyen (>12 000
// entradas) — los crawlers las descubren siguiendo enlaces internos desde
// cada municipio. Se regenera cada 24h.
//
// Tamaño esperado: ~52 provincias + ~8000 municipios + 4 estáticas =
// ~8060 entradas → dentro del límite de 50 000 por sitemap.

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
      url: `${base}/provincias`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/marcas`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/preguntas-frecuentes`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/guias`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/municipio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${base}/mapa-del-sitio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.4,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  // Páginas de marca (22 entradas: una por cada marca conocida).
  for (const b of KNOWN_BRANDS) {
    entries.push({
      url: `${base}/marca/${b.id}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.7,
    });
  }

  // Guías editoriales. Prioridad alta porque cada una pelea su propio
  // long-tail y tiende a tener buen CTR si Google la indexa.
  for (const g of GUIDES) {
    entries.push({
      url: `${base}/guias/${g.slug}`,
      lastModified: new Date(g.dateModified || g.datePublished),
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }

  let provincias = [];
  try {
    provincias = await fetchProvinciasServer();
  } catch {
    return entries;
  }

  // Páginas canónicas de provincia.
  for (const p of provincias) {
    if (!p?.IDPovincia || !p?.Provincia) continue;
    const id = String(p.IDPovincia);
    const slug = slugify(p.Provincia);
    if (!slug) continue;
    entries.push({
      url: `${base}/provincia/${encodeURIComponent(id)}/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  // Páginas canónicas de municipio.
  const CONCURRENCY = 8;
  const seenMunicipios = new Set();
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
        if (seenMunicipios.has(id)) continue;
        seenMunicipios.add(id);
        const slug = slugify(m.Municipio);
        if (!slug) continue;
        municipioEntries.push({
          url: `${base}/municipio/${encodeURIComponent(id)}/${slug}`,
          lastModified: now,
          changeFrequency: "daily",
          priority: 0.65,
        });
      }
    }
  }

  return entries.concat(municipioEntries);
}
