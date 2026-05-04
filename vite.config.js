import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // Sirve el manifest y SW en `npm run dev` para que la consola no
      // queje con "Manifest: Line: 1, column: 1, Syntax error" (que sucede
      // cuando el dev server cae al catch-all y devuelve index.html en
      // lugar del manifest).
      devOptions: {
        enabled: true,
        type: "module",
      },
      includeAssets: [
        "favicon.ico",
        "robots.txt",
        "gas.svg",
        "apple-touch-icon-180x180.png",
      ],
      manifest: {
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
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        shortcuts: [
          {
            name: "Cerca de mí",
            short_name: "Cerca",
            description:
              "Encuentra gasolineras cercanas a tu ubicación actual.",
            url: "/?cerca=1",
            icons: [
              {
                src: "pwa-192x192.png",
                sizes: "192x192",
                type: "image/png",
              },
            ],
          },
        ],
      },
    }),
  ],
});
