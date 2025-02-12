import { Link } from "react-router-dom";

const Header = () => (
  <header className="header">
    <div className="header-content">
      <div className="logo">
        <img src="/gas.svg" alt="Logo" />
        <Link to="/" className="logo-a">
          Comparador de Combustible
        </Link>
      </div>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/favoritos">Favoritas</Link>
          </li>
          <li>
            <Link to="/about">Acerca de</Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
