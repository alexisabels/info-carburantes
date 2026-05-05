import { lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";

import MainContent from "../components/MainContent";

// Lazy: estas rutas no son la primera pintura. About casi nadie la abre, y
// Gasolinera arrastra react-leaflet (~70KB) — diferirlas hace que el home
// arranque con menos JS que parsear en móvil.
const About = lazy(() => import("../pages/About/About"));
const Gasolinera = lazy(() => import("../pages/Gasolinera/Gasolinera"));

const RouteFallback = () => (
  <main
    className="loading"
    role="status"
    aria-live="polite"
    style={{ padding: "2rem 16px" }}
  >
    <div className="loading__bar" aria-hidden="true" />
    <span>Cargando…</span>
  </main>
);

const NotFound = () => (
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
      to="/"
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

const AppRoutes = () => {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/cerca" element={<MainContent />} />
        {/* /municipio (picker), /municipio/:id (listado), /municipio/:id/:slug
          * (canónica con slug SEO). Las tres caen en MainContent y este se
          * sincroniza con la URL para decidir qué render. */}
        <Route path="/municipio" element={<MainContent />} />
        <Route path="/municipio/:idMunicipio" element={<MainContent />} />
        <Route
          path="/municipio/:idMunicipio/:slug"
          element={<MainContent />}
        />
        <Route
          path="/gasolinera/:idMunicipio/:idGasolinera"
          element={<Gasolinera />}
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
