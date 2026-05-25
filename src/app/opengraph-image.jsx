import { ImageResponse } from "next/og";

// OG por defecto del sitio. Se sirve para `/` y se hereda en cualquier ruta
// que no defina su propio `opengraph-image.jsx`. Tamaño 1200×630 para que
// los previews de Twitter/Facebook/Slack rendericen a tamaño completo (con
// `twitter:card: summary_large_image`).
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Carburantes — Precios de gasolineras en España";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #1f1f1f 60%, #0d7a3a 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "80px 96px",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 30,
            letterSpacing: "-0.01em",
            opacity: 0.85,
          }}
        >
          <span
            style={{
              width: 60,
              height: 60,
              background: "#0d7a3a",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            €
          </span>
          <span style={{ fontWeight: 600 }}>Carburantes</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 90,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
            }}
          >
            Precios de gasolineras
          </div>
          <div
            style={{
              fontSize: 90,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
              color: "#7eddb0",
            }}
          >
            en España
          </div>
          <div
            style={{
              fontSize: 32,
              opacity: 0.8,
              maxWidth: 920,
              marginTop: 16,
              lineHeight: 1.35,
            }}
          >
            Compara gasolina y diésel en tiempo real con datos oficiales del
            Ministerio para la Transición Ecológica.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 24,
            opacity: 0.55,
          }}
        >
          <span>carburantes.alexisabel.com</span>
          <span>Datos oficiales · MITECO</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
