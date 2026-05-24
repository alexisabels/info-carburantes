import Link from "next/link";
import { buildMetadata } from "../lib/seo";

export const metadata = buildMetadata({
  title: "Página no encontrada · Carburantes",
  description: "La página que buscas no existe o se ha movido.",
  path: "/404",
  noindex: true,
});

export default function NotFound() {
  return (
    <main
      className="notfound"
      style={{
        maxWidth: "600px",
        margin: "3rem auto",
        padding: "0 16px",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: "0.5rem" }}>Página no encontrada</h1>
      <p style={{ color: "var(--ink-muted)", marginBottom: "1.5rem" }}>
        La página que buscas no existe o se ha movido.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "44px",
          padding: "0.6rem 1.2rem",
          background: "var(--ink)",
          color: "var(--bg)",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        Volver al inicio
      </Link>
    </main>
  );
}
