import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="appfoot">
      <div className="appfoot__inner">
        <span className="appfoot__meta">
          Datos del{" "}
          <a
            href="https://datos.gob.es/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ministerio (abre en nueva pestaña)"
          >
            Ministerio
          </a>{" "}
          · actualizados a diario
        </span>
        <nav className="appfoot__links" aria-label="Pie">
          <Link to="/about">Sobre</Link>
          <a
            href="https://github.com/alexisabels/info-carburantes"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub (abre en nueva pestaña)"
          >
            GitHub
          </a>
        </nav>
      </div>
      <div className="appfoot__bottom">
        <div className="appfoot__copy">© {year} Carburantes</div>
        <ThemeToggle />
      </div>
    </footer>
  );
};

export default Footer;
