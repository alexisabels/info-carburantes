export default function manifest() {
  return {
    name: "Carburantes — Precios de gasolineras en España",
    short_name: "Carburantes",
    description:
      "Consulta precios actualizados de gasolina y diésel en estaciones de servicio de España. Encuentra la gasolinera más barata cerca de ti en tiempo real.",
    lang: "es-ES",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#0a0a0a",
    categories: ["travel", "navigation", "utilities"],
    icons: [
      { src: "/pwa-64x64.png", sizes: "64x64", type: "image/png" },
      { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Cerca de mí",
        short_name: "Cerca",
        description: "Encuentra gasolineras cercanas a tu ubicación actual.",
        url: "/cerca",
        icons: [
          { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" },
        ],
      },
      {
        name: "Buscar por municipio",
        short_name: "Municipio",
        description: "Elige una provincia y un municipio en España.",
        url: "/municipio",
        icons: [
          { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" },
        ],
      },
      {
        name: "Provincias",
        short_name: "Provincias",
        description: "Listado de provincias españolas con gasolineras.",
        url: "/provincias",
        icons: [
          { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" },
        ],
      },
      {
        name: "Marcas",
        short_name: "Marcas",
        description: "Repsol, Cepsa, BP, Galp y otras marcas en España.",
        url: "/marcas",
        icons: [
          { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" },
        ],
      },
    ],
  };
}
