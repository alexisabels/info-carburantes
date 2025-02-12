/* eslint-disable react/prop-types */

import "./About.css";

const About = () => (
  <div className="provincia-card">
    <h2>Sobre esta Web</h2>
    <p>
      Esta aplicación permite comparar los precios de combustible en diferentes
      gasolineras de España. Puedes buscar por provincias y municipios para
      encontrar la mejor opción en tu zona.
    </p>
    <p>
      La información se obtiene de la{" "}
      <a href="https://datos.gob.es/es/catalogo/e05068001-precio-de-carburantes-en-las-gasolineras-espanolas">
        API REST oficial del Ministerio
      </a>
      , que proporciona información sobre los precios de los carburantes en
      todas las estaciones de servicio de España.
    </p>
    <p>
      ¡Disfruta de la experiencia y encuentra siempre el mejor precio para tu
      combustible!
    </p>
    <footer className="credits">
      <p>
        Desarrollado por{" "}
        <a href="https://alexisabel.com/" target="_blank" rel="noreferrer">
          alexisabel
        </a>
      </p>
    </footer>
  </div>
);

export default About;
