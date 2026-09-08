# Gasolineras - España
Aplicación web que permite buscar gasolineras en España por municipio y consultar sus precios de combustible y horarios de apertura.

Características principales
Encuentra gasolineras en cualquier municipio de España.
Muestra precios actualizados y horarios de apertura de cada gasolinera.
Todos los datos son reales y los precios se actualizan cada media hora aprox.

## Configuración

Variables de entorno (en Vercel o en un `.env` local):

| Variable | Uso |
| --- | --- |
| `API_KEY_CARTO` | API key de los basemaps raster de CARTO. Sin ella los mapas cargan igual pero con el watermark "API key required". Se añade como `?key=` a la URL de los tiles y por tanto es visible en el navegador (así lo diseña CARTO; gratis hasta 5M tiles/mes). |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio, para metadatos y sitemap. |
| `NEXT_PUBLIC_OSRM_URL` | (opcional) Servidor OSRM alternativo para el planificador de rutas. |
