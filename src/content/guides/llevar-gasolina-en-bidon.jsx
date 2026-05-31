import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "llevar-gasolina-en-bidon";
const title = "Llevar gasolina en bidón: cuánto es legal y cómo hacerlo";
const description =
  "¿Cuánta gasolina puedes llevar en bidón en el coche y cómo? Te explicamos los límites, los recipientes homologados y las precauciones para hacerlo con seguridad.";

const guide = {
  slug,
  title,
  seoTitle: "Gasolina en bidón: cuánto es legal · Guía",
  description,
  category: "normativa",
  datePublished: "2026-05-28",
  dateModified: "2026-05-28",
  readingMinutes: 5,
  keywords: [
    "llevar gasolina en bidón",
    "cuánta gasolina puedo llevar",
    "bidón gasolina legal",
    "transportar combustible coche",
  ],
  mentions: [{ "@type": "Thing", name: "Bidón homologado" }],
  faq: [
    {
      q: "¿Cuánta gasolina puedo llevar en el coche?",
      a: "Para uso particular y de forma ocasional, la referencia habitual es no superar unos 60 litros de gasolina transportados en recipientes homologados, repartidos en envases de un tamaño razonable (típicamente bidones de 5 a 20 litros). No es para acopio ni reventa, sino para una emergencia puntual: llevar combustible a un coche que se ha quedado seco, repostar maquinaria o una embarcación. La normativa de transporte de mercancías peligrosas (el acuerdo ADR) contempla exenciones para particulares, pero el detalle puede cambiar y la interpretación varía, así que conviene confirmar los límites vigentes con la DGT o la fuente oficial antes de un viaje. Como criterio práctico: lleva lo justo, en bidones homologados y bien cerrados.",
    },
    {
      q: "¿Qué bidón necesito?",
      a: "Un bidón homologado para combustibles inflamables. Lo reconoces porque viene marcado con un código de homologación (en Europa suele aparecer la marca UN y referencias de normas como EN), está fabricado en metal o plástico HDPE resistente a hidrocarburos, lleva tapón de cierre hermético y, en muchos modelos, una válvula que alivia la presión. Evita garrafas de agua, envases de detergente reutilizados o recipientes sin marcado: el plástico común se degrada con la gasolina, puede fugar vapores y no aguanta la dilatación del combustible con el calor. Un bidón homologado de 5, 10 o 20 litros cuesta poco y es la única opción segura y conforme.",
    },
    {
      q: "¿Es peligroso llevar gasolina en el maletero?",
      a: "Llevar gasolina en el maletero tiene riesgo porque la gasolina emite vapores muy inflamables incluso con el bidón cerrado, y esos vapores son más pesados que el aire y pueden acumularse en el habitáculo. El peligro real no es tanto que el líquido arda como que los vapores formen una mezcla inflamable. Para minimizarlo: usa un bidón homologado bien cerrado, no lo llenes hasta arriba (deja cámara de expansión), sujétalo para que no vuelque, ventila el coche y no fumes ni manipules nada que produzca chispas. No lo dejes horas al sol dentro del coche cerrado. Con estas precauciones, un trayecto corto y ocasional es asumible; transportar grandes cantidades de forma habitual no lo es.",
    },
    {
      q: "¿Cuánto dura la gasolina en el bidón?",
      a: "En un bidón homologado, bien cerrado y guardado en sitio fresco y a la sombra, la gasolina se mantiene en buen estado en torno a tres a seis meses. A partir de ahí empieza a oxidarse y a perder propiedades, sobre todo si el bidón ha estado al sol o medio vacío, porque el contacto con el aire acelera el deterioro. Si va a estar parada más tiempo, conviene usar un estabilizante de combustible, que puede alargar su vida útil hasta un año o más. La gasolina vieja arranca mal, ensucia y puede dejar residuos; ante la duda, no la metas en el motor de un coche moderno.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Para uso particular puedes llevar gasolina en el coche siempre que sea
        en <strong>bidones homologados</strong> para combustibles, bien
        cerrados y en cantidad moderada (la referencia habitual son unos 60
        litros como máximo, repartidos en envases pequeños). No es para hacer
        acopio: es para una emergencia puntual. Como la normativa de transporte
        puede cambiar, confirma los límites vigentes con la DGT antes de un
        viaje largo.
      </Answer>

      <Tldr
        items={[
          "Usa siempre bidón homologado para inflamables (marcado UN), nunca una garrafa de agua.",
          "Límite orientativo para particulares: ~60 litros en envases pequeños y de forma ocasional.",
          "No llenes el bidón hasta el borde: deja cámara de expansión y ciérralo bien.",
          "La gasolina dura ~3-6 meses en buen estado; más si usas estabilizante.",
          "Ventila el coche, sujeta el bidón y nunca lo dejes al sol en el habitáculo cerrado.",
        ]}
      />

      <h2 id="cuanta-gasolina">¿Cuánta gasolina se puede llevar?</h2>
      <p>
        Para uso particular y ocasional, la referencia que se maneja en España
        es no superar en torno a <strong>60 litros</strong> de gasolina
        transportada en recipientes homologados, repartidos en envases de
        tamaño razonable (bidones de 5, 10 o 20 litros). El objetivo de esa
        cantidad es claro: cubrir una emergencia puntual —un coche que se ha
        quedado sin combustible, repostar una motosierra, un generador o una
        embarcación—, no acumular carburante ni transportarlo para revenderlo.
      </p>
      <p>
        El marco que regula esto es el de transporte de mercancías peligrosas
        (el acuerdo internacional ADR), que contempla exenciones para
        particulares precisamente porque todos podemos necesitar mover una
        pequeña cantidad de combustible alguna vez. Ahora bien, los detalles de
        cantidades, tipos de envase y condiciones pueden actualizarse, y la
        interpretación no siempre es uniforme. Por eso, antes de un viaje en el
        que vayas a llevar varios bidones, lo prudente es confirmar los límites
        vigentes con la <strong>DGT</strong> o la normativa oficial, o consultar
        con un gestor si es para una actividad profesional.
      </p>
      <p>
        Regla práctica: lleva lo justo para resolver el problema, en bidones
        homologados, bien cerrados y sujetos. Cuanta menos gasolina suelta haya
        en el coche, menos riesgo. Y si lo que buscas es no quedarte tirado,
        muchas veces la mejor solución no es el bidón sino planificar la parada:
        consulta dónde tienes la{" "}
        <Link href="/guias/gasolineras-24-horas">gasolinera abierta más cercana</Link>{" "}
        antes de salir.
      </p>

      <h2 id="recipientes-homologados">Recipientes homologados</h2>
      <p>
        El recipiente es la parte más importante y la que más gente se salta. La
        gasolina solo debe transportarse en un <strong>bidón homologado para
        líquidos inflamables</strong>. No vale una garrafa de agua, un envase de
        detergente reciclado ni cualquier bidón «que tenía por casa». El plástico
        común se degrada en contacto con los hidrocarburos, deja pasar vapores y
        no soporta la dilatación que sufre el combustible con el calor.
      </p>
      <p>Un bidón homologado de verdad cumple varias cosas a la vez:</p>
      <ul>
        <li>
          <strong>Marcado de homologación</strong>: lleva impreso un código (en
          Europa es habitual ver la marca <em>UN</em> y referencias a normas tipo
          EN). Es la prueba de que el envase ha pasado ensayos de estanqueidad y
          resistencia.
        </li>
        <li>
          <strong>Material adecuado</strong>: metal, o plástico HDPE específico
          para combustibles. Resiste la gasolina sin degradarse.
        </li>
        <li>
          <strong>Cierre hermético</strong>: tapón de rosca que sella de verdad,
          a menudo con junta. Algunos modelos incorporan una pequeña válvula que
          alivia la sobrepresión cuando hace calor.
        </li>
        <li>
          <strong>Color y etiquetado</strong>: muchos bidones de gasolina son
          rojos por convención, pero lo que importa es la homologación, no el
          color.
        </li>
      </ul>

      <Callout type="warn" title="No reutilices garrafas de agua o de aceite">
        Es el error más frecuente y el más peligroso. Las garrafas de agua no
        son estancas a los vapores de gasolina, el plástico se reblandece y, con
        el calor del maletero, pueden deformarse o fugar. Un bidón homologado de
        5 o 10 litros cuesta muy poco y es la única opción segura y conforme con
        la normativa.
      </Callout>

      <h2 id="transportar-con-seguridad">Cómo transportarla con seguridad</h2>
      <p>
        Aunque lleves el bidón correcto, cómo lo cargas y lo transportas marca la
        diferencia. La gasolina emite vapores muy inflamables, más pesados que el
        aire, que tienden a acumularse en zonas bajas. Estas precauciones reducen
        el riesgo casi a cero en un trayecto corto:
      </p>
      <ul>
        <li>
          <strong>No lo llenes hasta arriba.</strong> Deja una cámara de aire
          para que el combustible pueda dilatarse con el calor sin forzar el
          tapón ni rebosar.
        </li>
        <li>
          <strong>Ciérralo bien y comprueba el tapón.</strong> Apriétalo a fondo
          y verifica que no hay olor a gasolina antes de meterlo en el coche. Si
          huele, algo no cierra.
        </li>
        <li>
          <strong>Sujeta el bidón.</strong> Que no pueda volcar ni desplazarse en
          una frenada. En el maletero, calzado o atado; nunca suelto en el
          habitáculo junto a los pasajeros.
        </li>
        <li>
          <strong>Ventila.</strong> Lleva alguna ventana ligeramente abierta o la
          ventilación activa, sobre todo al principio del trayecto.
        </li>
        <li>
          <strong>Nada de chispas ni fuego.</strong> No fumes, no manipules
          mecheros y evita aparatos que generen chispas cerca del bidón.
        </li>
        <li>
          <strong>Reposta despacio si lo llenas en la gasolinera.</strong> Pon el
          bidón en el suelo, nunca dentro del coche ni sobre plásticos, para
          descargar la electricidad estática. Y aprovecha para hacerlo bien: si
          tienes dudas, repasa{" "}
          <Link href="/guias/repostar-correctamente-pasos">cómo repostar paso a paso</Link>.
        </li>
      </ul>
      <p>
        Y por sentido común: no dejes el coche con un bidón dentro aparcado
        horas al sol en pleno verano. El calor dispara la presión interna y la
        emisión de vapores.
      </p>

      <h2 id="cuanto-dura">Cuánto dura en el bidón</h2>
      <p>
        La gasolina no es eterna. En un bidón homologado, bien cerrado y guardado
        en un sitio fresco y a la sombra, se mantiene en buen estado durante{" "}
        <strong>unos tres a seis meses</strong> de media. Pasado ese tiempo
        empieza a oxidarse: los compuestos más volátiles se evaporan, aparecen
        resinas y el combustible pierde capacidad para arrancar y quemar bien.
      </p>
      <p>
        Dos factores aceleran ese deterioro: el calor y el contacto con el aire.
        Un bidón medio vacío envejece la gasolina mucho más rápido que uno lleno,
        porque hay más oxígeno dentro. Si sabes que el combustible va a estar
        parado más tiempo —por ejemplo, para una moto o una máquina que usas en
        temporada—, merece la pena añadir un <strong>estabilizante de
        combustible</strong>, que puede alargar su vida útil hasta un año o más.
      </p>
      <CompareTable
        caption="Vida útil aproximada de la gasolina almacenada (datos típicos, 2026)"
        headers={["Condición de almacenaje", "Duración orientativa", "Riesgo"]}
        rows={[
          ["Bidón cerrado, fresco y a la sombra", "~3-6 meses", "Bajo"],
          ["Bidón al sol o con calor", "~1-3 meses", "Medio"],
          ["Bidón medio vacío (mucho aire)", "Se degrada antes", "Medio-alto"],
          ["Con estabilizante, bien guardado", "Hasta ~1 año o más", "Bajo"],
        ]}
      />
      <p>
        Si tienes gasolina que lleva mucho tiempo guardada, mejor no arriesgarte a
        meterla en un coche moderno: puede ensuciar inyectores y dejar residuos.
        Lo explicamos con detalle en{" "}
        <Link href="/guias/caduca-la-gasolina-cuanto-dura">esta guía sobre si caduca la gasolina</Link>.
      </p>

      <h2 id="que-evitar">Qué evitar</h2>
      <p>Resumiendo los errores que nunca debes cometer:</p>
      <ul>
        <li>
          <strong>Garrafas o envases sin homologar.</strong> Es el fallo más
          común y el más peligroso.
        </li>
        <li>
          <strong>Llenar el bidón hasta el borde.</strong> Sin cámara de
          expansión, el calor lo fuerza y puede rebosar o fugar.
        </li>
        <li>
          <strong>Llevar grandes cantidades de forma habitual.</strong> El bidón
          es para emergencias, no para almacenar combustible en el coche.
        </li>
        <li>
          <strong>Repostar el bidón dentro del coche o sobre plásticos.</strong>{" "}
          La estática puede provocar una chispa. Siempre en el suelo.
        </li>
        <li>
          <strong>Dejar el coche con el bidón al sol durante horas.</strong> El
          calor multiplica la presión y los vapores.
        </li>
        <li>
          <strong>Guardar gasolina vieja «por si acaso».</strong> Si tiene más de
          medio año y no usaste estabilizante, desconfía.
        </li>
      </ul>
      <p>
        En la mayoría de casos, la forma más segura de no quedarte tirado no es
        cargar combustible suelto, sino planificar el repostaje. Saber dónde está
        la gasolinera más barata y a qué hora te conviene parar resuelve el
        problema sin riesgos.
      </p>

      <AppCta
        title="No te quedes sin gasolina: localiza la estación más cercana"
        body="En Carburantes ves los precios oficiales del Ministerio en tiempo casi real. Pulsa «Cerca de mí» o busca por municipio para encontrar la gasolinera abierta más próxima antes de quedarte en reserva."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/caduca-la-gasolina-cuanto-dura", label: "¿Caduca la gasolina?" },
          { href: "/guias/gasolineras-24-horas", label: "Gasolineras 24 horas" },
          { href: "/guias/repostar-correctamente-pasos", label: "Cómo repostar paso a paso" },
        ]}
      />
    </>
  );
}

export default guide;
