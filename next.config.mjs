import withPWAInit from "@ducanh2912/next-pwa";

const isProd = process.env.NODE_ENV === "production";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  // Solo activamos el SW en producción: en dev queremos HMR limpio y evitar
  // que un SW antiguo sirva páginas obsoletas.
  disable: !isProd,
  workboxOptions: {
    // Permite que la primera carga de cualquier URL no precacheada caiga al
    // index — equivalente al SPA fallback de la app Vite original.
    navigateFallback: "/",
    navigateFallbackDenylist: [
      // Estas son páginas dinámicas SSR; no las queremos servir desde caché.
      /^\/api\//,
      /^\/sitemap\.xml/,
      /^\/robots\.txt/,
    ],
    runtimeCaching: [
      {
        // Tiles del mapa: caché agresiva, pesan poco y son inmutables por URL.
        urlPattern: /^https:\/\/[a-d]\.basemaps\.cartocdn\.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "carto-tiles",
          expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
        },
      },
      {
        // API del MITECO: SWR para responder al instante con caché y refrescar.
        urlPattern: /^https:\/\/sedeaplicaciones\.minetur\.gob\.es\/.*/i,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "miteco-api",
          expiration: { maxEntries: 64, maxAgeSeconds: 60 * 60 },
        },
      },
    ],
  },
});

const nextConfig = {
  reactStrictMode: true,
  // Cabeceras de seguridad y caché estática. Las páginas SSR las cachea Next
  // según `revalidate`; aquí solo tuneamos defaults para activos estáticos.
  async headers() {
    return [
      {
        source: "/(.*)\\.(svg|png|ico|webmanifest|gif|jpg|jpeg|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default withPWA(nextConfig);
