import { absoluteUrl, getSiteUrl } from "./site";

const SITE_NAME = "Carburantes";
const DEFAULT_DESC =
  "Consulta precios actualizados de gasolina y diésel en estaciones de servicio de España. Encuentra la gasolinera más barata cerca de ti en tiempo real.";
const DEFAULT_OG_IMAGE = "/pwa-512x512.png";

// Construye un objeto Metadata compatible con generateMetadata. Pensado para
// devolver lo justo: title, description, OG, Twitter y canonical. Cualquier
// helper que añada JSON-LD lo hace ya inline en el page.tsx como <script>.
export function buildMetadata({
  title,
  description = DEFAULT_DESC,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  imageAlt = SITE_NAME,
  noindex = false,
} = {}) {
  const url = absoluteUrl(path);
  const titleAbs = title ? title : `${SITE_NAME} — Precios de gasolineras en España`;
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    metadataBase: new URL(getSiteUrl()),
    title: titleAbs,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title: titleAbs,
      description,
      url,
      siteName: SITE_NAME,
      locale: "es_ES",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 512,
          height: 512,
          alt: imageAlt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: titleAbs,
      description,
      images: [imageUrl],
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
