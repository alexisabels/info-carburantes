"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Header.css";

const Header = () => {
  const pathname = usePathname();
  const aboutActive = pathname === "/about";
  // Una guía activa puede ser /guias o /guias/<slug>. Mantener el highlight
  // mientras el usuario navega entre artículos hace el cluster más legible.
  const guidesActive = pathname === "/guias" || pathname.startsWith("/guias/");
  return (
    <header className="appbar">
      <div className="appbar__inner">
        <Link href="/" className="appbar__brand" aria-label="Inicio">
          <img src="/gas.svg" alt="" aria-hidden="true" />
          <span>Carburantes</span>
        </Link>
        <nav className="appbar__navs" aria-label="Principal">
          <Link
            href="/guias"
            className={
              guidesActive
                ? "appbar__nav appbar__nav--active"
                : "appbar__nav"
            }
          >
            Guías
          </Link>
          <Link
            href="/about"
            className={
              aboutActive
                ? "appbar__nav appbar__nav--active"
                : "appbar__nav"
            }
          >
            Sobre
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
