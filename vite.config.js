import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: ["gas.svg"],
      manifest: {
        name: "Precios de Combustible",
        short_name: "Carburantes",
        description:
          "Encuentra los mejores precios de combustible cerca de ti.",
        background_color: "#f0f2f5",
        theme_color: "#2c3e50",
        icons: [
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
        ],
      },
    }),
  ],
});
