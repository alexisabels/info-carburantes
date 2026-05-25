import { ImageResponse } from "next/og";
import { getGuide, categoryName } from "../../../content/guides";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Guía · Carburantes";

// OG dinámica por guía: cada artículo tiene su preview con título grande y
// categoría destacada. Esto multiplica el CTR en redes sociales y WhatsApp
// vs un OG genérico compartido.
export default async function Image({ params }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  const title = guide?.title || "Guía";
  const cat = guide ? categoryName(guide.category) : "Carburantes";
  const minutes = guide?.readingMinutes;

  // Recortes para que el título no rompa la maquetación. Si supera ~80
  // chars, cortamos y añadimos ellipsis — mejor que dejar overflow
  // invisible.
  const safeTitle =
    title.length > 90 ? `${title.slice(0, 87).trimEnd()}…` : title;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          background:
            "linear-gradient(150deg, #ffffff 0%, #f4f4f3 50%, #e6f4ec 100%)",
          color: "#0a0a0a",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "72px 80px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: 14 }}
          >
            <div
              style={{
                display: "flex",
                width: 52,
                height: 52,
                background: "#0d7a3a",
                color: "#ffffff",
                borderRadius: 13,
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              €
            </div>
            <div style={{ display: "flex", fontWeight: 600 }}>Carburantes</div>
          </div>
          <div
            style={{
              display: "flex",
              background: "#0d7a3a",
              color: "#ffffff",
              padding: "10px 18px",
              borderRadius: 999,
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
          >
            Guía
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#0d7a3a",
              fontWeight: 600,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
          >
            {cat}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "#0a0a0a",
            }}
          >
            {safeTitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#6b6b6b",
          }}
        >
          <span>carburantes.alexisabel.com/guias</span>
          {minutes ? <span>{minutes} min de lectura</span> : <span />}
        </div>
      </div>
    ),
    { ...size }
  );
}
