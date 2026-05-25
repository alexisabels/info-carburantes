"use client";

import Link from "next/link";
import { useEffect } from "react";

// Error boundary global de la App Router. Equivalente al ErrorBoundary que
// envolvía la app en Vite, pero ahora viene incluido por Next como ruta
// especial. Registra el error (idealmente a un servicio externo) y ofrece
// recuperación inline sin perder el shell de Header/Footer.
export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("App error boundary capturó:", error);
  }, [error]);

  return (
    <main
      role="alert"
      style={{
        padding: "2rem",
        textAlign: "center",
        maxWidth: "600px",
        margin: "2rem auto",
        color: "var(--ink)",
        background: "var(--bg)",
      }}
    >
      <h1>Ha ocurrido un error inesperado</h1>
      <p>Algo ha fallado. Inténtalo de nuevo o vuelve al inicio.</p>
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "1rem",
        }}
      >
        <button
          type="button"
          onClick={() => reset()}
          style={{
            minHeight: "44px",
            padding: "0.6rem 1.2rem",
            fontSize: "1rem",
            cursor: "pointer",
            background: "var(--ink)",
            color: "var(--bg)",
            border: "1px solid var(--ink)",
            borderRadius: "6px",
            fontWeight: 600,
          }}
        >
          Reintentar
        </button>
        <Link
          href="/"
          style={{
            minHeight: "44px",
            padding: "0.6rem 1.2rem",
            fontSize: "1rem",
            cursor: "pointer",
            background: "var(--bg)",
            color: "var(--ink)",
            border: "1px solid var(--ink)",
            borderRadius: "6px",
            fontWeight: 600,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          Ir al inicio
        </Link>
      </div>
    </main>
  );
}
