import { ImageResponse } from "next/og";
import {
  getProvinciaContext,
  getMunicipiosOfProvincia,
} from "../../../../lib/provincias";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Gasolineras en la provincia · Carburantes";

export default async function Image({ params }) {
  const { idProvincia } = await params;
  const ctx = await getProvinciaContext(idProvincia);
  const municipios = ctx.nombre
    ? await getMunicipiosOfProvincia(idProvincia)
    : [];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          background:
            "linear-gradient(140deg, #0a0a0a 0%, #161616 60%, #0d7a3a 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "72px 80px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 52,
              height: 52,
              background: "#0d7a3a",
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
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <div style={{ display: "flex", fontSize: 32, opacity: 0.75 }}>
            Provincia de
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 130,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 0.98,
              maxWidth: 1040,
            }}
          >
            {ctx.nombre || "(desconocida)"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            gap: 22,
          }}
        >
          <div
            style={{
              display: "flex",
              background: "rgba(255,255,255,0.08)",
              borderRadius: 18,
              padding: "24px 32px",
              flexDirection: "column",
              minWidth: 240,
            }}
          >
            <div style={{ display: "flex", fontSize: 22, opacity: 0.7 }}>
              Municipios
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 72,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              {String(municipios.length)}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 18,
              padding: "24px 32px",
              flexDirection: "column",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <div style={{ display: "flex", fontSize: 24, opacity: 0.8 }}>
              Compara precios de combustible
            </div>
            <div style={{ display: "flex", fontSize: 28, fontWeight: 600 }}>
              Diésel y gasolina · datos del Ministerio
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
