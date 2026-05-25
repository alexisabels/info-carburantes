import { ImageResponse } from "next/og";
import { getBrand, KNOWN_BRANDS } from "../../../lib/brands";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Gasolineras de la marca · Carburantes";

// Pre-renderizamos las OG de las 22 marcas en build. Como el dato variable
// (recuento de estaciones) se ha eliminado del diseño, el render es 100%
// estático y NO necesita tocar MITECO. Antes, generar esta imagen disparaba
// una descarga de 16 MB en su propia función serverless (cold start de 5-30 s
// por cada compartir en Twitter/WhatsApp) para mostrar un único número que
// de todos modos quedaba obsoleto entre regeneraciones.
export const dynamicParams = false;

export function generateStaticParams() {
  return KNOWN_BRANDS.map((b) => ({ brand: b.id }));
}

export default async function Image({ params }) {
  const { brand } = await params;
  const def = getBrand(brand);

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
            Precios actualizados
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 44,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              marginTop: 4,
            }}
          >
            Diésel y gasolina
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
