// Función serverless de Vercel: devuelve HTML con meta tags Open Graph
// rellenos por gasolinera. SOLO se invoca cuando el User-Agent es un bot
// (ver `has` en vercel.json), para no consumir invocaciones con tráfico
// humano normal — la SPA se sirve estática a los usuarios de carne y hueso.

const MINETUR_BASE =
  "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes";

const escapeHtml = (str) =>
  String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const formatearPrecio = (raw) => {
  if (raw === undefined || raw === null) return null;
  const s = String(raw).trim();
  if (!s || s === "-") return null;
  const num = parseFloat(s.replace(",", "."));
  if (!Number.isFinite(num) || num <= 0) return null;
  return s;
};

const fetchEstacion = async (idMunicipio, idGasolinera) => {
  const url = `${MINETUR_BASE}/EstacionesTerrestres/FiltroMunicipio/${encodeURIComponent(
    idMunicipio
  )}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    if (!res.ok) return { estacion: null, fecha: null };
    const data = await res.json();
    const lista = Array.isArray(data?.ListaEESSPrecio)
      ? data.ListaEESSPrecio
      : [];
    const estacion =
      lista.find((e) => String(e?.IDEESS) === String(idGasolinera)) || null;
    return { estacion, fecha: data?.Fecha || null };
  } catch {
    return { estacion: null, fecha: null };
  } finally {
    clearTimeout(timer);
  }
};

export default async function handler(req, res) {
  const { idMunicipio, idGasolinera } = req.query;
  if (!idMunicipio || !idGasolinera) {
    res.status(400).send("Bad request");
    return;
  }

  const { estacion, fecha } = await fetchEstacion(idMunicipio, idGasolinera);

  // Construimos URL absoluta a partir de las cabeceras del propio request,
  // así funciona en producción, preview deployments y dominios custom sin
  // hardcodear nada.
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const pageUrl = `${proto}://${host}/gasolinera/${encodeURIComponent(
    idMunicipio
  )}/${encodeURIComponent(idGasolinera)}`;
  const imageUrl = `${proto}://${host}/pwa-512x512.png`;

  const rotulo = estacion?.["Rótulo"] || "Gasolinera";
  const direccion = estacion?.Dirección || "";
  const cp = (estacion?.["C.P."] || "").trim();
  const localidad = estacion?.Localidad || "";
  const provincia = estacion?.Provincia || "";
  const localidadConCp = cp && localidad ? `${cp} ${localidad}` : localidad || cp;
  const ubicacion = [direccion, localidadConCp, provincia]
    .filter(Boolean)
    .join(", ");

  // Tres precios "famosos": Diésel A, Gasolina 95, Gasolina 98.
  const precios = [
    { label: "Diésel A", value: formatearPrecio(estacion?.["Precio Gasoleo A"]) },
    {
      label: "Gasolina 95",
      value: formatearPrecio(estacion?.["Precio Gasolina 95 E5"]),
    },
    {
      label: "Gasolina 98",
      value: formatearPrecio(estacion?.["Precio Gasolina 98 E5"]),
    },
  ].filter((p) => p.value);

  // Marcas de productos adicionales: solo añadimos un sufijo, sin precio,
  // para no saturar el preview. Útil para que el usuario vea de un vistazo
  // si la estación sirve AdBlue o GLP.
  const tieneAdblue = !!formatearPrecio(estacion?.["Precio Adblue"]);
  const tieneGlp = !!formatearPrecio(
    estacion?.["Precio Gases licuados del petróleo"]
  );
  const sellos = [
    tieneAdblue ? "Con AdBlue" : null,
    tieneGlp ? "Con GLP" : null,
  ].filter(Boolean);

  const titulo = estacion
    ? ubicacion
      ? `${rotulo} — ${ubicacion}`
      : rotulo
    : "Carburantes";

  const partesDescripcion = [];
  if (precios.length) {
    partesDescripcion.push(
      precios.map((p) => `${p.label}: ${p.value} €/L`).join(" · ")
    );
  }
  if (sellos.length) {
    partesDescripcion.push(sellos.join(" · "));
  }
  if (fecha) {
    partesDescripcion.push(`Ministerio: ${fecha}`);
  }
  const descripcion = partesDescripcion.length
    ? partesDescripcion.join(" — ")
    : "Consulta precios actualizados de gasolina y diésel en esta estación.";

  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(titulo)}</title>
<meta name="description" content="${escapeHtml(descripcion)}" />
<link rel="canonical" href="${pageUrl}" />

<meta property="og:title" content="${escapeHtml(titulo)}" />
<meta property="og:description" content="${escapeHtml(descripcion)}" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="es_ES" />
<meta property="og:site_name" content="Carburantes" />
<meta property="og:url" content="${pageUrl}" />
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
<p><a href="${pageUrl}">Ver en Carburantes</a></p>
</body>
</html>`;

  // No cacheamos en CDN: el rewrite condicional por User-Agent comparte URL
  // con la SPA, y un caché compartido podría servir el HTML del bot a un
  // usuario humano. Cada bot guarda su propio preview por su lado, así que
  // este endpoint recibe muy pocas invocaciones.
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "private, no-store");
  res.setHeader("Vary", "User-Agent");
  res.status(200).send(html);
}
