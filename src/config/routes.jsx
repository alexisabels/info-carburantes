import { Routes, Route, Link } from "react-router-dom";

import MainContent from "../components/MainContent";
import About from "../pages/About/About";
import Gasolinera from "../pages/Gasolinera/Gasolinera";

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
    <Routes>
      <Route path="/" element={<MainContent />} />
      <Route path="/cerca" element={<MainContent />} />
      <Route path="/municipio/:idMunicipio" element={<MainContent />} />
      <Route
        path="/gasolinera/:idMunicipio/:idGasolinera"
        element={<Gasolinera />}
      />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
