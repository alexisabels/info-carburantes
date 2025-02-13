import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => (
  <header className="header">
    <div className="header-content">
      <div className="logo">
        <img src="/gas.svg" alt="Logo" />
        <Link to="/" className="logo-a">
          <span className="name-large">Comparador de Combustible</span>
          <span className="name-small">Carburantes</span>
        </Link>
      </div>
      {/*  <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/favoritos">Favoritas</Link>
          </li> 
        </ul>
      </nav>*/}
    </div>
  </header>
);

export default Header;
