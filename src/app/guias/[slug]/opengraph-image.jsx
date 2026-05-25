import { ImageResponse } from "next/og";
import { getGuide, categoryName } from "../../../content/guides";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Guía · Carburantes";

// OG por guía. Diseño sobrio sin badges ni acentos de color: blanco,
// tipografía limpia, hairline divisor abajo. Mismo idioma visual que
// una portada de NYT / Stratechery, no una landing de SaaS.
export default async function Image({ params }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  const title = guide?.title || "Guía";
  const cat = guide ? categoryName(guide.category) : null;
  const minutes = guide?.readingMinutes;

  // Recorte conservador. A ~80 chars el título se ve cómodo a 60-64 px.
  const safeTitle =
    title.length > 92 ? `${title.slice(0, 89).trimEnd()}…` : title;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          background: "#ffffff",
          color: "#0a0a0a",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "72px 80px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
          }}
        >
          <span style={{ display: "flex", fontWeight: 600, color: "#0a0a0a" }}>
            Carburantes
          </span>
          {cat && (
            <span style={{ display: "flex", color: "#737373" }}>
              Guía · {cat}
            </span>
          )}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 66,
            fontWeight: 700,
            letterSpacing: "-0.028em",
            lineHeight: 1.06,
            color: "#0a0a0a",
            maxWidth: 1040,
          }}
        >
          {safeTitle}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#737373",
            borderTop: "1px solid #e2e2e0",
            paddingTop: 24,
          }}
        >
          <span style={{ display: "flex" }}>carburantes.alexisabel.com</span>
          {minutes ? (
            <span style={{ display: "flex" }}>{minutes} min de lectura</span>
          ) : (
            <span style={{ display: "flex" }} />
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
