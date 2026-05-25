# Plan de mejoras post-migración

Ejecutado en esta misma rama (`claude/nextjs-seo`) sobre PR #2. Lo agrupo por
fase y deja todas las decisiones explicadas para que sean fáciles de
revisar/revertir.

## Fase 1 — Página de provincia (nueva superficie SEO)

Añadimos `/provincia/[idProvincia]/[slug]` y `/provincias` para abrir el
target de búsquedas como *"gasolineras en Andalucía"* o *"gasolineras
provincia de Madrid"* que hoy no tenían URL canónica.

- `provincia/[idProvincia]/page.jsx` redirige 308 al slug canónico.
- `provincia/[idProvincia]/[slug]/page.jsx` lista los municipios de esa
  provincia con SSR/ISR (revalidate 1d), JSON-LD `ItemList` +
  `AdministrativeArea` + `BreadcrumbList` y enlaces canónicos al detalle
  de cada municipio.
- `provincias/page.jsx` es el índice de las 52 provincias.
- Sitemap y robots se actualizan para incluirlas.

## Fase 2 — OG dinámicas con `next/og`

Sustituimos el OG genérico (`/pwa-512x512.png`) por una `ImageResponse`
1200×630 por ruta:

- `opengraph-image.jsx` raíz: branding sólido por defecto.
- `municipio/[idMunicipio]/[slug]/opengraph-image.jsx`: municipio,
  provincia, conteo de gasolineras y mínimos de los tres combustibles
  populares.
- `gasolinera/[idMunicipio]/[idGasolinera]/opengraph-image.jsx`: rótulo,
  dirección y los precios disponibles.
- `provincia/[idProvincia]/[slug]/opengraph-image.jsx`: provincia +
  número de municipios.
- `twitter:card` pasa a `summary_large_image` para aprovecharlas.

## Fase 3 — Streaming + skeletons

Añadimos `loading.jsx` para las rutas pesadas (gasolinera y municipio)
con skeleton que respeta el layout final. Next.js streamea el shell
mientras se resuelve la llamada a MITECO (3–8 s) y reduce el TTFB
percibido a unos ms.

## Fase 4 — JSON-LD extra

- `Organization` global en el `<head>` del layout para construir el
  *knowledge graph*.
- `Place` + `AdministrativeArea` en municipios/provincias.
- Mantiene `WebSite` + `SearchAction` + `BreadcrumbList` que ya
  estaban.

## Fase 5 — `generateStaticParams` para top ciudades

Las 50 capitales/ciudades más pobladas se pre-renderizan en build para
que el primer click desde Google a "gasolineras Madrid" salga del edge
sin tocar MITECO. El resto siguen con ISR on-demand.

## Fase 6 — Preconnect + fix theme-color

- `<link rel="preconnect">` al MITECO en el layout: ahorra el TLS/DNS
  de la primera fetch del cliente (Cerca de mí, histórico).
- El script anti-FOUC de `data-theme` queda compatible con las dos
  `<meta name="theme-color">` con `media=` que añade Next a partir del
  `viewport.themeColor`.

## Fase 7 — Sitemap split + Cache-Control

- El sitemap pasa a un sitemap-index + sub-sitemaps por provincia
  (`/sitemap/<idProvincia>.xml`). 52 archivos sub-sitemaps mantenibles
  en lugar de uno solo de 8000 entradas.
- Cabeceras `Cache-Control` agresivas para los XML/JSON estáticos.

## Fase 8 — Manifest enriquecido

Más shortcuts y descripciones. Mantiene paridad 1:1 con la PWA original
y añade entrada directa a "Buscar por municipio".
