import "./About.css";

const About = () => (
  <article className="about">
    <header className="about__header">
      <h1>Sobre Carburantes</h1>
      <p className="about__lede">
        Una forma sencilla de consultar los precios oficiales de las
        gasolineras en España.
      </p>
    </header>

    <section>
      <h2>Qué es</h2>
      <p>
        Carburantes es un buscador de precios de combustible en España. Puedes
        filtrar por provincia, municipio o tipo de carburante, y ver las
        estaciones cercanas a tu ubicación. No hay registros, ni cuentas, ni
        publicidad.
      </p>
    </section>

    <section>
      <h2>Cómo funciona</h2>
      <ol className="about__steps">
        <li>Elige tu combustible la primera vez que entres.</li>
        <li>
          Pulsa <em>Cerca de mí</em> (con GPS) o busca <em>Por municipio</em>.
        </li>
        <li>Compara precios y abre el detalle de cada estación.</li>
        <li>Marca con la estrella las gasolineras que más uses.</li>
      </ol>
    </section>

    <section>
      <h2>De dónde vienen los datos</h2>
      <p>
        Los precios y la información de las estaciones provienen del
        Ministerio para la Transición Ecológica y el Reto Demográfico, a
        través del portal de datos abiertos del Gobierno de España.
      </p>
      <ul className="about__list">
        <li>
          <a
            href="https://datos.gob.es/es/catalogo/e05068001-precio-de-carburantes-en-las-gasolineras-espanolas"
            target="_blank"
            rel="noopener noreferrer"
          >
            Precio de carburantes en las gasolineras españolas (datos.gob.es)
          </a>
        </li>
        <li>
          <a
            href="https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/help"
            target="_blank"
            rel="noopener noreferrer"
          >
            API de precios de carburantes (Ministerio)
          </a>
        </li>
      </ul>
      <p>
        La fecha de la última actualización del Ministerio aparece junto a los
        listados.
      </p>
    </section>

    <section>
      <h2>Privacidad</h2>
      <p>
        No hay cuentas, ni cookies de seguimiento, ni analítica de terceros.
      </p>
      <p>
        Si usas <em>Cerca de mí</em>, el navegador te pedirá permiso para
        acceder a tu ubicación. Esa ubicación se usa únicamente en tu
        dispositivo para calcular distancias; no se envía a ningún servidor ni
        se guarda en ningún sitio.
      </p>
    </section>

    <section>
      <h2>Limitaciones</h2>
      <p>
        Los precios los declaran las propias estaciones al Ministerio y pueden
        haber cambiado desde la última toma de datos. Antes de repostar,
        verifica el precio en el surtidor.
      </p>
    </section>

    <section>
      <h2>Créditos</h2>
      <p>
        Hecho por{" "}
        <a
          href="https://alexisabel.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          alexisabel
        </a>
        . Datos publicados por el Ministerio para la Transición Ecológica y el
        Reto Demográfico.
      </p>
    </section>
  </article>
);

export default About;
