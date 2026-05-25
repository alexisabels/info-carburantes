import { ImageResponse } from "next/og";
import { fetchGasolineraServer } from "../../../../lib/api-server";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Precios de la gasolinera en Carburantes";

function formatearPrecio(raw) {
  if (raw === undefined || raw === null) return null;
  const s = String(raw).trim();
  if (!s || s === "-") return null;
  const num = parseFloat(s.replace(",", "."));
  if (!Number.isFinite(num) || num <= 0) return null;
  return s;
}

const PRECIOS_LABELS = [
  { label: "Diésel", campo: "Precio Gasoleo A" },
  { label: "Gasolina 95", campo: "Precio Gasolina 95 E5" },
  { label: "Gasolina 98", campo: "Precio Gasolina 98 E5" },
];

export default async function Image({ params }) {
  const { idMunicipio, idGasolinera } = await params;
  const { estacion, fecha } = await fetchGasolineraServer(
    idMunicipio,
    idGasolinera
  );

  const rotulo = estacion?.["Rótulo"] || "Gasolinera";
  const direccion = estacion?.Dirección || "";
  const localidad = estacion?.Localidad || "";
  const provincia = estacion?.Provincia || "";
  const ubicacion = [direccion, localidad, provincia].filter(Boolean).join(", ");

  const precios = PRECIOS_LABELS.map((p) => ({
    label: p.label,
    valor: formatearPrecio(estacion?.[p.campo]),
  }));

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
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 26,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 48,
                height: 48,
                background: "#0d7a3a",
                color: "#ffffff",
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              €
            </div>
            <div style={{ display: "flex", fontWeight: 600 }}>Carburantes</div>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#9a9a9a" }}>
            {fecha ? `Actualizado ${fecha}` : ""}
          </div>
        </div>

        {/* Title */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: 18 }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 74,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              maxWidth: 1040,
            }}
          >
            {rotulo}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#6b6b6b",
              maxWidth: 1040,
              lineHeight: 1.25,
            }}
          >
            {ubicacion}
          </div>
        </div>

        {/* Prices */}
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 16,
          }}
        >
          {precios.map((p) => (
            <div
              key={p.label}
              style={{
                display: "flex",
                flex: 1,
                background: "#f4f4f3",
                borderRadius: 18,
                padding: "24px 28px",
                flexDirection: "column",
                gap: 6,
                border: "1px solid #e2e2e0",
              }}
            >
              <div style={{ display: "flex", fontSize: 22, color: "#6b6b6b" }}>
                {p.label}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 8,
                  fontSize: 64,
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  color: p.valor ? "#0a0a0a" : "#9a9a9a",
                }}
              >
                <div style={{ display: "flex" }}>{p.valor || "N/D"}</div>
                {p.valor && (
                  <div
                    style={{
                      display: "flex",
                      fontSize: 26,
                      color: "#6b6b6b",
                    }}
                  >
                    €/L
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
