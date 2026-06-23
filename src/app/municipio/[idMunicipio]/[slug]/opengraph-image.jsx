import { ImageResponse } from "next/og";
import {
  fetchMunicipioCompletoServer,
  minPrecio,
} from "../../../../lib/api-server";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Precios de gasolineras en el municipio";

// La tarjeta para compartir no necesita precios al minuto: con regenerarla a
// diario basta (comparte el data-cache diario de MITECO). Antes heredaba la
// ventana de 30 min y reescribía ~8000 imágenes constantemente.
export const revalidate = 86400;

export default async function Image({ params }) {
  const { idMunicipio } = await params;
  const data = await fetchMunicipioCompletoServer(idMunicipio);
  const lista = Array.isArray(data?.ListaEESSPrecio) ? data.ListaEESSPrecio : [];
  const first = lista[0] || {};
  const nombre = first.Municipio || "este municipio";
  const provincia = first.Provincia || "";
  const total = lista.length;

  const minDiesel = minPrecio(lista, "Precio Gasoleo A");
  const min95 = minPrecio(lista, "Precio Gasolina 95 E5");
  const min98 = minPrecio(lista, "Precio Gasolina 98 E5");

  const stats = [
    { label: "Diésel", valor: minDiesel?.texto || null },
    { label: "Gasolina 95", valor: min95?.texto || null },
    { label: "Gasolina 98", valor: min98?.texto || null },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          background:
            "linear-gradient(160deg, #ffffff 0%, #f4f4f3 70%, #e6f4ec 100%)",
          color: "#0a0a0a",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "72px 80px",
          justifyContent: "space-between",
        }}
      >
        {/* Branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 28,
            color: "#0a0a0a",
          }}
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

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{ display: "flex", fontSize: 30, color: "#6b6b6b", fontWeight: 500 }}
          >
            Gasolineras en
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 110,
              fontWeight: 800,
              letterSpacing: "-0.045em",
              lineHeight: 1.0,
              color: "#0a0a0a",
              maxWidth: 1040,
            }}
          >
            {nombre}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              color: "#0d7a3a",
              fontWeight: 600,
              marginTop: 8,
            }}
          >
            {provincia || ""}
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: 22,
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#0a0a0a",
              color: "#ffffff",
              borderRadius: 18,
              padding: "24px 32px",
              justifyContent: "center",
              gap: 4,
              minWidth: 200,
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
                lineHeight: 1.0,
              }}
            >
              {String(total)}
            </div>
          </div>
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                flex: 1,
                background: "#ffffff",
                borderRadius: 18,
                padding: "20px 24px",
                flexDirection: "column",
                justifyContent: "center",
                gap: 6,
                border: "1px solid #e2e2e0",
              }}
            >
              <div style={{ display: "flex", fontSize: 22, color: "#6b6b6b" }}>
                {s.label} desde
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 6,
                  fontSize: 48,
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  color: s.valor ? "#0a0a0a" : "#9a9a9a",
                }}
              >
                <div style={{ display: "flex" }}>{s.valor || "N/D"}</div>
                {s.valor && (
                  <div
                    style={{ display: "flex", fontSize: 22, color: "#6b6b6b" }}
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
