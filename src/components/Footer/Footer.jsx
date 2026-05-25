"use client";

import Link from "next/link";
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
          <Link href="/provincias">Provincias</Link>
          <Link href="/marcas">Marcas</Link>
          <Link href="/preguntas-frecuentes">FAQ</Link>
          <Link href="/about">Sobre</Link>
          <Link href="/mapa-del-sitio" aria-label="Mapa del sitio">
            Mapa
          </Link>
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
        <div className="appfoot__copy">
          © {year} Carburantes — Hecho por{" "}
          <a
            href="https://alexisabel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="appfoot__author"
          >
            alexisabel
          </a>
        </div>
        <ThemeToggle />
      </div>
    </footer>
  );
};

export default Footer;
