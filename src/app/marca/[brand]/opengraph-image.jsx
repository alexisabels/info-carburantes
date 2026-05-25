import { ImageResponse } from "next/og";
import { fetchTodasLasEstacionesServer } from "../../../lib/api-server";
import { getBrand, stationBrand } from "../../../lib/brands";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Gasolineras de la marca · Carburantes";

export default async function Image({ params }) {
  const { brand } = await params;
  const def = getBrand(brand);
  const data = await fetchTodasLasEstacionesServer();
  const lista = Array.isArray(data?.ListaEESSPrecio) ? data.ListaEESSPrecio : [];
  const total = def ? lista.filter((e) => stationBrand(e) === def.id).length : 0;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          background:
            "linear-gradient(150deg, #ffffff 0%, #f4f4f3 60%, #e6f4ec 100%)",
          color: "#0a0a0a",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "72px 80px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28 }}
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

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", fontSize: 32, color: "#6b6b6b", fontWeight: 500 }}>
            Gasolineras
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 140,
              fontWeight: 800,
              letterSpacing: "-0.045em",
              lineHeight: 0.98,
              color: "#0a0a0a",
            }}
          >
            {def?.display || "Marca"}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#0d7a3a", fontWeight: 600, marginTop: 6 }}>
            en España
          </div>
        </div>

        <div
          style={{
            display: "flex",
            background: "#0a0a0a",
            color: "#ffffff",
            borderRadius: 18,
            padding: "24px 32px",
            flexDirection: "column",
            alignSelf: "flex-start",
          }}
        >
          <div style={{ display: "flex", fontSize: 22, opacity: 0.7 }}>
            Estaciones
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {String(total)}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
