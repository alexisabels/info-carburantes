import { absoluteUrl, getSiteUrl } from "./site";

const SITE_NAME = "Carburantes";
const DEFAULT_DESC =
  "Consulta precios actualizados de gasolina y diésel en estaciones de servicio de España. Encuentra la gasolinera más barata cerca de ti en tiempo real.";

// Recorta una descripción a ~155 caracteres respetando palabras. Google y
// WhatsApp truncan más allá de ese tamaño; pasarlo de largo no ayuda y a
// veces degrada el preview a la variante "pequeña".
export function trimDescription(text, max = 155) {
  if (!text) return "";
  if (text.length <= max) return text;
  const cut = text.slice(0, max + 1);
  const lastSpace = cut.lastIndexOf(" ");
  const safeEnd = lastSpace > 80 ? lastSpace : max;
  return text.slice(0, safeEnd).trimEnd().replace(/[.,;:·]+$/, "") + "…";
}

// Construye un objeto Metadata compatible con generateMetadata. Las imágenes
// OG/Twitter se gestionan por convención de fichero (`opengraph-image.jsx`)
// en cada ruta: Next.js las inyecta automáticamente en
// openGraph.images/twitter.images y conmuta twitter.card al variante
// `summary_large_image`. No hace falta repetirlas aquí.
export function buildMetadata({
  title,
  description = DEFAULT_DESC,
  path = "/",
  noindex = false,
} = {}) {
  const url = absoluteUrl(path);
  const titleAbs = title ? title : `${SITE_NAME} — Precios de gasolineras en España`;
  const desc = trimDescription(description);

  return {
    metadataBase: new URL(getSiteUrl()),
    title: titleAbs,
    description: desc,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title: titleAbs,
      description: desc,
      url,
      siteName: SITE_NAME,
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: titleAbs,
      description: desc,
    },
  };
}

// ---------- JSON-LD builders ----------

export function jsonLdWebSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: getSiteUrl(),
    inLanguage: "es-ES",
    potentialAction: {
      "@type": "SearchAction",
      target: `${getSiteUrl()}/municipio?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function jsonLdBreadcrumb(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: it.url ? absoluteUrl(it.url) : undefined,
    })),
  };
}

// Schema.org/GasStation. La API del MITECO no es muy estructurada; mapeamos
// lo que tenemos: dirección postal, geo, horario textual y ofertas (precios
// de cada combustible disponible).
const PRECIO_KEYS = [
  { campo: "Precio Gasoleo A", label: "Diésel A" },
  { campo: "Precio Gasoleo Premium", label: "Diésel Premium" },
  { campo: "Precio Gasolina 95 E5", label: "Gasolina 95" },
  { campo: "Precio Gasolina 98 E5", label: "Gasolina 98" },
  { campo: "Precio Adblue", label: "AdBlue" },
  { campo: "Precio Gases licuados del petróleo", label: "GLP" },
  { campo: "Precio Hidrogeno", label: "Hidrógeno" },
];

function priceFor(raw) {
  if (raw === undefined || raw === null) return null;
  const s = String(raw).trim();
  if (!s || s === "-") return null;
  const n = parseFloat(s.replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : null;
}

function parseLatLng(estacion) {
  const lat = parseFloat(String(estacion?.Latitud ?? "").replace(",", "."));
  const lng = parseFloat(
    String(estacion?.["Longitud (WGS84)"] ?? "").replace(",", ".")
  );
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { lat, lng };
}

export function jsonLdGasStation(estacion, { url, fechaToma } = {}) {
  if (!estacion) return null;
  const rotulo = estacion["Rótulo"] || "Gasolinera";
  const geo = parseLatLng(estacion);
  const offers = PRECIO_KEYS.map(({ campo, label }) => {
    const price = priceFor(estacion[campo]);
    if (price === null) return null;
    return {
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: label },
      price: price.toFixed(3),
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: price.toFixed(3),
        priceCurrency: "EUR",
        unitCode: "LTR",
        unitText: "€/L",
      },
      availability: "https://schema.org/InStock",
      validFrom: fechaToma || undefined,
    };
  }).filter(Boolean);

  const address = {
    "@type": "PostalAddress",
    streetAddress: estacion.Dirección || undefined,
    postalCode: (estacion["C.P."] || "").trim() || undefined,
    addressLocality: estacion.Localidad || undefined,
    addressRegion: estacion.Provincia || undefined,
    addressCountry: "ES",
  };

  return {
    "@context": "https://schema.org",
    "@type": "GasStation",
    "@id": url,
    name: rotulo,
    url,
    address,
    geo: geo
      ? { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng }
      : undefined,
    openingHours: estacion.Horario || undefined,
    makesOffer: offers.length ? offers : undefined,
  };
}

// Organization global del sitio. Una sola pieza de JSON-LD que ayuda a los
// motores a construir el "knowledge graph" de la marca Carburantes (logo,
// autor, redes sociales si las hubiera).
export function jsonLdOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Carburantes",
    url: getSiteUrl(),
    logo: absoluteUrl("/pwa-512x512.png"),
    description:
      "Buscador de precios de gasolineras en España con datos oficiales del Ministerio para la Transición Ecológica.",
    sameAs: ["https://github.com/alexisabels/info-carburantes"],
    founder: {
      "@type": "Person",
      name: "alexisabel",
      url: "https://alexisabel.com",
    },
  };
}

// `Place` para una ciudad/municipio. Lo usamos en /municipio/[id]/[slug] para
// que Google entienda que la página representa una entidad geográfica
// concreta y no un listado abstracto.
export function jsonLdPlaceMunicipio({
  nombre,
  provincia,
  url,
  numStations,
} = {}) {
  if (!nombre) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: nombre,
    url,
    containedInPlace: provincia
      ? {
          "@type": "AdministrativeArea",
          name: provincia,
        }
      : undefined,
    additionalProperty: Number.isFinite(numStations)
      ? {
          "@type": "PropertyValue",
          name: "Gasolineras",
          value: numStations,
        }
      : undefined,
  };
}

// `AdministrativeArea` para una provincia. Mismo razonamiento que Place pero
// a un nivel más amplio; útil para /provincia/[id]/[slug].
export function jsonLdAdministrativeArea({
  nombre,
  url,
  numMunicipios,
} = {}) {
  if (!nombre) return null;
  return {
    "@context": "https://schema.org",
    "@type": "AdministrativeArea",
    name: nombre,
    url,
    additionalProperty: Number.isFinite(numMunicipios)
      ? {
          "@type": "PropertyValue",
          name: "Municipios",
          value: numMunicipios,
        }
      : undefined,
  };
}

// ItemList de municipios de una provincia (links a las páginas de cada
// municipio). El typo de PropertyValue queda como auditoría visible para el
// crawler de la estructura de la provincia.
export function jsonLdItemListProvincia(municipios, { provincia, url } = {}) {
  const items = (municipios || []).slice(0, 100).map((m, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    item: {
      "@type": "Place",
      name: m?.Municipio || "Municipio",
      url: `${getSiteUrl()}/municipio/${encodeURIComponent(
        m?.IDMunicipio || ""
      )}`,
    },
  }));
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Municipios de ${provincia || ""}`.trim(),
    url,
    numberOfItems: municipios?.length || 0,
    itemListElement: items,
  };
}

// FAQPage para /preguntas-frecuentes. Google muestra estos items expandibles
// en la SERP como rich snippet — buena ganancia de CTR sin pelear ranking.
// `items` es [{ q, a }, ...]; las respuestas se sirven como texto plano
// para evitar choques con el sanitizador de Google.
export function jsonLdFAQ(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (items || []).map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a,
      },
    })),
  };
}

// ItemList genérico para páginas de marca y similares: cada item apunta a
// la ficha de una gasolinera concreta. Limitado a 50 entries por SEO/peso.
export function jsonLdItemListGenerico(estaciones, { name, url, max = 50 } = {}) {
  const items = (estaciones || []).slice(0, max).map((e, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    item: {
      "@type": "GasStation",
      name: e["Rótulo"] || "Gasolinera",
      url: `${getSiteUrl()}/gasolinera/${encodeURIComponent(e.IDMunicipio)}/${encodeURIComponent(
        e.IDEESS
      )}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: e.Dirección || undefined,
        addressLocality: e.Municipio || undefined,
        addressRegion: e.Provincia || undefined,
        addressCountry: "ES",
      },
    },
  }));
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url,
    numberOfItems: estaciones?.length || 0,
    itemListElement: items,
  };
}

// ---------- JSON-LD para guías/blog (GEO/AEO) ----------

// `Article` para una guía individual. Schema.org/Article + speakable hint para
// asistentes de voz / motores generativos (ChatGPT, Perplexity, Google SGE).
// `author` apunta a la Organization para mantener el knowledge graph cohesivo,
// y `mentions` enumera entidades que la guía referencia (marcas, combustibles)
// — ayuda a los LLMs a entender el grafo semántico del artículo.
export function jsonLdArticle({
  url,
  title,
  description,
  datePublished,
  dateModified,
  imageUrl,
  category,
  wordCount,
  keywords,
  mentions,
} = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: title,
    description,
    inLanguage: "es-ES",
    datePublished,
    dateModified: dateModified || datePublished,
    image: imageUrl ? [imageUrl] : undefined,
    articleSection: category || undefined,
    wordCount: Number.isFinite(wordCount) ? wordCount : undefined,
    keywords: Array.isArray(keywords) && keywords.length ? keywords.join(", ") : undefined,
    author: {
      "@type": "Organization",
      name: "Carburantes",
      url: getSiteUrl(),
    },
    publisher: {
      "@type": "Organization",
      name: "Carburantes",
      url: getSiteUrl(),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/pwa-512x512.png"),
      },
    },
    mentions: Array.isArray(mentions) && mentions.length ? mentions : undefined,
    // Selectores CSS de fragmentos "habladlos" — bloques que Google Assistant
    // / Alexa pueden leer en voz alta y que un LLM puede citar como respuesta
    // directa. Apuntamos al TL;DR + el primer párrafo respuesta.
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".guide__answer", ".guide__tldr"],
    },
  };
}

// `HowTo` para guías paso-a-paso. No todas las guías son HowTo — solo las que
// tienen una secuencia ordenada (ej. "cómo encontrar gasolinera más barata").
// Google muestra estos como rich cards con los pasos numerados en la SERP.
export function jsonLdHowTo({
  url,
  name,
  description,
  totalTime,
  steps,
  imageUrl,
} = {}) {
  if (!Array.isArray(steps) || !steps.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${url}#howto`,
    name,
    description,
    inLanguage: "es-ES",
    totalTime: totalTime || undefined,
    image: imageUrl ? [imageUrl] : undefined,
    step: steps.map((s, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: s.name,
      text: s.text,
      url: s.anchor ? `${url}#${s.anchor}` : undefined,
    })),
  };
}

// `Blog` para el índice /guias. Le da contexto a Google de que la sección es
// una colección editorial y no un listado comercial.
export function jsonLdBlog({ url, name, description, posts } = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${url}#blog`,
    name,
    description,
    url,
    inLanguage: "es-ES",
    publisher: {
      "@type": "Organization",
      name: "Carburantes",
      url: getSiteUrl(),
    },
    blogPost: (posts || []).slice(0, 50).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.datePublished,
      dateModified: p.dateModified || p.datePublished,
      url: absoluteUrl(p.path),
      author: { "@type": "Organization", name: "Carburantes" },
    })),
  };
}

// `Person` o `Thing` para enumerar entidades mencionadas. Útil dentro de
// `mentions` del Article para señalar marcas, combustibles, etc.
export function entityMention({ name, url, sameAs, type = "Thing" } = {}) {
  return {
    "@type": type,
    name,
    url: url ? absoluteUrl(url) : undefined,
    sameAs: Array.isArray(sameAs) && sameAs.length ? sameAs : undefined,
  };
}

// ItemList de gasolineras (para páginas de municipio). Limitamos a las 20
// primeras para no inflar el HTML; el SEO real lo da el contenido visible.
export function jsonLdItemListMunicipio(estaciones, { municipio, url } = {}) {
  const items = (estaciones || []).slice(0, 20).map((e, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    item: {
      "@type": "GasStation",
      name: e["Rótulo"] || "Gasolinera",
      url: `${getSiteUrl()}/gasolinera/${encodeURIComponent(e.IDMunicipio)}/${encodeURIComponent(
        e.IDEESS
      )}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: e.Dirección || undefined,
        postalCode: (e["C.P."] || "").trim() || undefined,
        addressLocality: e.Localidad || undefined,
        addressRegion: e.Provincia || undefined,
        addressCountry: "ES",
      },
    },
  }));
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Gasolineras en ${municipio || ""}`.trim(),
    url,
    numberOfItems: estaciones?.length || 0,
    itemListElement: items,
  };
}
