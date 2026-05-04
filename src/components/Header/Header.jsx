import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => (
  <header className="appbar">
    <div className="appbar__inner">
      <Link to="/" className="appbar__brand" aria-label="Inicio">
        <img src="/gas.svg" alt="" aria-hidden="true" />
        <span>Carburantes</span>
      </Link>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? "appbar__nav appbar__nav--active" : "appbar__nav"
        }
      >
        Sobre
      </NavLink>
    </div>
  </header>
);

export default Header;
