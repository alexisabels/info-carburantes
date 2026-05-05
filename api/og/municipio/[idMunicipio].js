// Función serverless: devuelve HTML con meta tags Open Graph para
// /municipio/:idMunicipio[/:slug]. Solo se invoca para bots (rewrite
// condicional por User-Agent en vercel.json), por lo que no consume
// invocaciones con tráfico humano normal.

const MITECO_BASE =
  "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes";

const escapeHtml = (str) =>
  String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const slugify = (str) =>
  String(str || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const formatearPrecio = (raw) => {
  if (raw === undefined || raw === null) return null;
  const s = String(raw).trim();
  if (!s || s === "-") return null;
  const num = parseFloat(s.replace(",", "."));
  if (!Number.isFinite(num) || num <= 0) return null;
  return { texto: s, num };
};

const fetchMunicipio = async (idMunicipio) => {
  const url = `${MITECO_BASE}/EstacionesTerrestres/FiltroMunicipio/${encodeURIComponent(
    idMunicipio
  )}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    if (!res.ok) return { lista: [], fecha: null };
    const data = await res.json();
    return {
      lista: Array.isArray(data?.ListaEESSPrecio) ? data.ListaEESSPrecio : [],
      fecha: data?.Fecha || null,
    };
  } catch {
    return { lista: [], fecha: null };
  } finally {
    clearTimeout(timer);
  }
};

const minPrecio = (lista, campo) => {
  let min = null;
  for (const e of lista) {
    const p = formatearPrecio(e[campo]);
    if (p && (min === null || p.num < min.num)) min = p;
  }
  return min;
};

export default async function handler(req, res) {
  const { idMunicipio } = req.query;
  if (!idMunicipio) {
    res.status(400).send("Bad request");
    return;
  }

  const { lista, fecha } = await fetchMunicipio(idMunicipio);
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const imageUrl = `${proto}://${host}/pwa-512x512.png`;

  const first = lista[0] || {};
  const nombre = first.Municipio || "";
  const provincia = first.Provincia || "";
  const slug = slugify(nombre);
  const canonical = slug
    ? `${proto}://${host}/municipio/${idMunicipio}/${slug}`
    : `${proto}://${host}/municipio/${idMunicipio}`;

  const total = lista.length;
  const minDiesel = minPrecio(lista, "Precio Gasoleo A");
  const min95 = minPrecio(lista, "Precio Gasolina 95 E5");
  const min98 = minPrecio(lista, "Precio Gasolina 98 E5");

  const titulo = nombre
    ? provincia
      ? `Precios de gasolineras en ${nombre} (${provincia})`
      : `Precios de gasolineras en ${nombre}`
    : "Precios de gasolineras";

  const partes = [];
  if (total > 0) {
    partes.push(`${total} ${total === 1 ? "gasolinera" : "gasolineras"}`);
  }
  if (minDiesel) partes.push(`Diésel desde ${minDiesel.texto} €/L`);
  if (min95) partes.push(`Gasolina 95 desde ${min95.texto} €/L`);
  if (min98) partes.push(`Gasolina 98 desde ${min98.texto} €/L`);
  if (fecha) partes.push(`Ministerio: ${fecha}`);
  const descripcion = partes.length
    ? partes.join(" · ")
    : "Consulta precios actualizados de carburantes en este municipio.";

  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(titulo)}</title>
<meta name="description" content="${escapeHtml(descripcion)}" />
<link rel="canonical" href="${canonical}" />

<meta property="og:title" content="${escapeHtml(titulo)}" />
<meta property="og:description" content="${escapeHtml(descripcion)}" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="es_ES" />
<meta property="og:site_name" content="Carburantes" />
<meta property="og:url" content="${canonical}" />
<meta property="og:image" content="${imageUrl}" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="512" />
<meta property="og:image:height" content="512" />
<meta property="og:image:alt" content="Carburantes" />

<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="${escapeHtml(titulo)}" />
<meta name="twitter:description" content="${escapeHtml(descripcion)}" />
<meta name="twitter:image" content="${imageUrl}" />
</head>
<body>
<h1>${escapeHtml(titulo)}</h1>
<p>${escapeHtml(descripcion)}</p>
<p><a href="${canonical}">Ver listado completo</a></p>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "private, no-store");
  res.setHeader("Vary", "User-Agent");
  res.status(200).send(html);
}
