"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Header.css";

const Header = () => {
  const pathname = usePathname();
  const aboutActive = pathname === "/about";
  return (
    <header className="appbar">
      <div className="appbar__inner">
        <Link href="/" className="appbar__brand" aria-label="Inicio">
          <img src="/gas.svg" alt="" aria-hidden="true" />
          <span>Carburantes</span>
        </Link>
        <Link
          href="/about"
          className={aboutActive ? "appbar__nav appbar__nav--active" : "appbar__nav"}
        >
          Sobre
        </Link>
      </div>
    </header>
  );
};

export default Header;
