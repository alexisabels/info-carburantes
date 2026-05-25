import { getSiteUrl } from "../../lib/site";

// OpenSearch description: permite a Chrome/Firefox/Edge ofrecer "Buscar
// gasolineras" directamente desde la barra de direcciones cuando el usuario
// ha visitado la web antes. Es una pequeña ganancia de retención.
//
// Apuntamos el "search URL" a /municipio porque allí el usuario puede
// teclear el nombre y la app navegará al listado del municipio.

export const dynamic = "force-static";

export async function GET() {
  const base = getSiteUrl();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>Carburantes</ShortName>
  <Description>Precios de gasolineras en España</Description>
  <InputEncoding>UTF-8</InputEncoding>
  <Image width="64" height="64" type="image/png">${base}/pwa-64x64.png</Image>
  <Image width="192" height="192" type="image/png">${base}/pwa-192x192.png</Image>
  <Url type="text/html" method="get" template="${base}/municipio?q={searchTerms}"/>
  <Url type="application/opensearchdescription+xml" rel="self" template="${base}/opensearch.xml"/>
  <SearchForm>${base}/municipio</SearchForm>
  <moz:SearchForm xmlns:moz="http://www.mozilla.org/2006/browser/search/">${base}/municipio</moz:SearchForm>
  <Language>es-ES</Language>
</OpenSearchDescription>`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/opensearchdescription+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
