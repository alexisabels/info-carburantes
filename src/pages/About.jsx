/* eslint-disable react/prop-types */

import "./About.css";

const About = ({ provincias, onSelect }) => (
  <div className="provincia-card">
    <h2>Sobre esta Web</h2>
    <p>
      Esta aplicación permite comparar los precios de combustible en diferentes
      gasolineras de España. Puedes buscar por provincias y municipios para
      encontrar la mejor opción en tu zona.
    </p>
    <p>
      La información se obtiene de la API oficial del Ministerio, garantizando
      datos actualizados y precisos. El objetivo es ayudar a los usuarios a
      tomar decisiones informadas sobre dónde repostar.
    </p>
    <p>
      ¡Disfruta de la experiencia y encuentra siempre el mejor precio para tu
      combustible!
    </p>
    <footer className="credits">
      <p>
        Desarrollado por{" "}
        <a href="https://alexisabel.com/" target="_blank" rel="noreferrer">
          alexisabels
        </a>
      </p>
    </footer>
  </div>
);

export default About;
