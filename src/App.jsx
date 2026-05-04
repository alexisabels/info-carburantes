import { Component } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";
import AppRoutes from "./config/routes";
import { BrowserRouter } from "react-router-dom";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary capturó un error:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
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
              onClick={this.handleReload}
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
              Recargar
            </button>
            <button
              type="button"
              onClick={this.handleGoHome}
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
              }}
            >
              Ir al inicio
            </button>
          </div>
        </div>
      );
    }

    // eslint-disable-next-line react/prop-types
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <a href="#main" className="skip-link">
          Saltar al contenido
        </a>
        <div className="app">
          <div className="container">
            <Header />
            <AppRoutes />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
