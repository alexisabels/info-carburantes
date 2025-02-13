import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <p>
        Desarrollado por <a href="https://github.com/alexisabel">alexisabel</a>
      </p>
      <span className="separator">|</span>
      <Link to="/about" className="separator">
        Acerca de
      </Link>
    </div>
  </footer>
);

export default Footer;
