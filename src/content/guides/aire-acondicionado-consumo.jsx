import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "aire-acondicionado-consumo";
const title = "Aire acondicionado o ventanillas: qué gasta más";
const description =
  "¿Gasta más el aire acondicionado o llevar las ventanillas bajadas? Resolvemos el mito según la velocidad y te decimos cómo usar el clima sin disparar el consumo.";

const guide = {
  slug,
  title,
  seoTitle: "Aire acondicionado vs ventanillas · Guía",
  description,
  category: "conduccion",
  datePublished: "2026-05-17",
  dateModified: "2026-05-17",
  readingMinutes: 5,
  keywords: [
    "aire acondicionado consumo",
    "aire acondicionado o ventanillas",
    "cuánto gasta el aire acondicionado coche",
    "ahorrar gasolina aire acondicionado",
  ],
  mentions: [{ "@type": "Thing", name: "Aire acondicionado" }],
  faq: [
    {
      q: "¿Gasta más el aire o las ventanillas?",
      a: "Depende de la velocidad. A poca velocidad (ciudad, atascos, zona de 30 o 50 km/h) las ventanillas bajadas gastan menos, porque la resistencia aerodinámica extra es pequeña y el compresor del aire acondicionado es lo que más penaliza. A partir de unos 70-80 km/h se invierte: las ventanillas abiertas generan tanta resistencia al avance que consumen más que el aire acondicionado, así que en autovía conviene cerrar y usar el clima. La regla práctica: en ciudad, ventanillas; en carretera y autovía, aire.",
    },
    {
      q: "¿Cuánto consume el aire acondicionado?",
      a: "Como cifra orientativa, el aire acondicionado puede elevar el consumo en torno a un 5-20 % según el coche, la temperatura exterior y lo frío que pidas el habitáculo. En valores típicos en España (2026) eso supone más o menos entre 0,3 y 1 litro extra cada 100 km. El pico se da nada más arrancar con el coche muy caliente, cuando el compresor trabaja al máximo; una vez estabilizada la temperatura, el gasto baja bastante.",
    },
    {
      q: "¿Apagar el aire ahorra mucho?",
      a: "Ahorra algo, pero menos de lo que mucha gente cree, y a veces no compensa. En ciudad con calor puedes apagarlo y abrir ventanillas sin penalizar apenas. Pero en autovía apagar el aire y abrir ventanillas suele gastar más por la resistencia aerodinámica, además de ser incómodo y ruidoso. El mayor ahorro real de combustible no está en el clima, sino en la velocidad, la presión de los neumáticos y una conducción suave.",
    },
    {
      q: "¿El A/A se debe usar en invierno?",
      a: "Conviene encenderlo de vez en cuando aunque haga frío. El aire acondicionado no solo enfría: deseca el aire, así que es muy útil para desempañar lunas rápidamente. Además, hacerlo funcionar unos minutos cada cierto tiempo lubrica el compresor y mantiene en buen estado los retenes del circuito, evitando fugas de gas y averías caras. En invierno el coste en consumo es mínimo porque el compresor apenas trabaja.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        No hay un único ganador: depende de la velocidad. En ciudad, llevar
        las <strong>ventanillas bajadas</strong> gasta menos que el aire
        acondicionado, porque a poca velocidad la resistencia del aire es
        pequeña y lo que penaliza es el compresor. En autovía es al revés:
        a partir de unos <strong>70-80 km/h</strong> las ventanillas abiertas
        frenan tanto el coche que consumen más que el aire acondicionado, así
        que conviene cerrarlas y usar el clima.
      </Answer>

      <Tldr
        items={[
          "En ciudad (menos de ~70 km/h): ventanillas bajadas gastan menos que el aire.",
          "En autovía (más de ~80 km/h): cerrar ventanillas y usar el aire gasta menos.",
          "El aire acondicionado sube el consumo en torno a un 5-20 % según el caso (datos típicos en España, 2026).",
          "El pico de gasto es al arrancar con el coche muy caliente; luego baja.",
          "Donde más ahorras de verdad es en la velocidad y la presión de los neumáticos, no en el clima.",
        ]}
      />

      <h2 id="el-mito-de-las-ventanillas">El mito de las ventanillas</h2>
      <p>
        Circula una idea muy extendida: «apaga el aire y baja las ventanillas,
        que gastas menos». Y otra justo contraria: «las ventanillas frenan
        mucho, mejor el aire». Las dos tienen parte de razón, pero ninguna es
        cierta siempre. El error es buscar una respuesta única cuando la
        física depende de a qué velocidad vas.
      </p>
      <p>
        Tu coche gasta combustible en dos cosas relevantes para este debate.
        Por un lado, mover el <strong>compresor del aire acondicionado</strong>,
        que roba potencia al motor de forma más o menos constante mientras
        está encendido. Por otro, vencer la <strong>resistencia
        aerodinámica</strong>, es decir, el aire que el coche tiene que apartar
        para avanzar. Y aquí está la clave: esa resistencia no crece de forma
        lineal, sino que se dispara con la velocidad. Abrir ventanillas a 50
        km/h apenas cambia nada; abrirlas a 120 km/h convierte el coche en una
        especie de paracaídas.
      </p>

      <h2 id="ciudad-ventanillas">En ciudad: ventanillas ganan</h2>
      <p>
        A velocidades bajas y medias —el tráfico urbano, una travesía, una
        carretera secundaria— la resistencia aerodinámica es pequeña. Llevar
        las ventanillas bajadas penaliza muy poco el consumo, mientras que el
        compresor del aire acondicionado sí supone un gasto fijo apreciable
        en proporción a lo poco que corres.
      </p>
      <p>
        En esas condiciones, si el calor es soportable, abrir las ventanillas
        es la opción más eficiente. Además, en ciudad pasas mucho tiempo
        parado o casi parado (semáforos, atascos), donde el aire acondicionado
        sigue consumiendo pero no te desplazas, así que su «coste por
        kilómetro» se dispara. La conducción urbana ya es de por sí la que más
        gasta; si quieres apurar, mira también nuestra guía de{" "}
        <Link href="/guias/conducir-ahorrar-combustible">conducir para
        ahorrar combustible</Link>, porque la forma de acelerar y frenar
        influye mucho más que el clima.
      </p>
      <Callout type="info" title="Truco para los primeros minutos">
        Cuando el coche ha estado al sol y entras en un horno, lo más eficiente
        no es poner el aire a tope de inmediato. Abre las ventanillas los
        primeros segundos para expulsar el aire recalentado y luego ciérralas y
        enciende el clima: el compresor partirá de una temperatura más baja y
        trabajará menos.
      </Callout>

      <h2 id="autovia-aire-gana">En autovía: el aire acondicionado gana</h2>
      <p>
        A partir de unos 70-80 km/h la situación se invierte. La resistencia
        del aire crece muy deprisa con la velocidad, y unas ventanillas
        abiertas rompen la aerodinámica del coche generando turbulencias que
        lo frenan de forma notable. A 120 km/h, ese freno extra consume más
        combustible que tener el aire acondicionado encendido con las ventanas
        cerradas.
      </p>
      <p>
        Por eso, en autovía y autopista, la recomendación es clara:{" "}
        <strong>ventanillas cerradas y aire acondicionado encendido</strong>.
        Ganas en consumo, en confort y en ruido. Eso sí, el factor que de
        verdad manda en carretera es la velocidad a la que circulas: pasar de
        120 a 130 km/h dispara el gasto mucho más que cualquier decisión sobre
        el clima. Lo desarrollamos en{" "}
        <Link href="/guias/velocidad-consumo-autovia">velocidad y consumo en
        autovía</Link>.
      </p>

      <CompareTable
        caption="Qué conviene según la velocidad (orientativo; datos típicos en España, 2026)"
        headers={["Situación", "Ventanillas bajadas", "Aire acondicionado"]}
        rows={[
          ["Ciudad / atasco (~30-50 km/h)", "Más eficiente", "Penaliza más"],
          ["Carretera secundaria (~60-70 km/h)", "Parecido / ligera ventaja", "Parecido"],
          ["Autovía (~90-120 km/h)", "Penaliza más", "Más eficiente"],
          ["Confort y ruido", "Peor a alta velocidad", "Mejor"],
        ]}
      />

      <h2 id="cuanto-sube-el-consumo">Cuánto sube el consumo el clima</h2>
      <p>
        Poner una cifra exacta es engañoso, porque depende del coche, de la
        temperatura exterior y de lo frío que pidas el habitáculo. Como orden
        de magnitud, el aire acondicionado puede elevar el consumo{" "}
        <strong>en torno a un 5-20 %</strong>, lo que en valores típicos en
        España (2026) viene a ser más o menos entre 0,3 y 1 litro extra cada
        100 km.
      </p>
      <ul>
        <li>
          <strong>El pico es al arrancar</strong> con el coche muy caliente: el
          compresor trabaja al máximo para bajar la temperatura de golpe. Ese
          es el momento de mayor gasto.
        </li>
        <li>
          <strong>Luego se estabiliza</strong>: una vez el habitáculo está
          fresco, el sistema solo mantiene la temperatura y el consumo extra
          baja bastante.
        </li>
        <li>
          <strong>No te pases con el frío</strong>: pedir 18 °C cuando fuera
          hay 35 °C obliga al compresor a trabajar mucho más que mantener unos
          confortables 23-24 °C. Cada grado cuenta.
        </li>
      </ul>
      <p>
        Conviene relativizar: el sobrecoste del aire acondicionado es real,
        pero pequeño comparado con otros factores. Llevar los neumáticos
        flojos, por ejemplo, puede penalizarte más que el clima durante todo el
        año; lo explicamos en la guía de{" "}
        <Link href="/guias/presion-neumaticos-consumo">presión de neumáticos
        y consumo</Link>. Y en cualquier caso, el dinero de cada litro depende
        sobre todo de dónde repostes: compara siempre el precio real antes de
        llenar.
      </p>

      <h2 id="calefaccion-invierno">¿Y la calefacción en invierno?</h2>
      <p>
        Mucha gente cree que la calefacción del coche gasta tanto como el aire
        acondicionado, pero no es lo mismo. La calefacción aprovecha el{" "}
        <strong>calor sobrante del motor</strong>, que de todas formas se
        produce al quemar combustible y que el sistema de refrigeración tiene
        que disipar. Encender la calefacción no obliga al motor a quemar más
        gasolina o gasóleo: simplemente redirige hacia el habitáculo un calor
        que ya estaba ahí. Por eso, en términos de consumo, calentar el coche
        en invierno es prácticamente gratis una vez el motor ha cogido
        temperatura.
      </p>
      <p>
        El matiz está en el ventilador y en el aire acondicionado que muchos
        climatizadores encienden de forma automática para deshumidificar. El
        ventilador eléctrico consume muy poco, y el compresor en frío apenas
        trabaja, así que el sobrecoste sigue siendo pequeño. Distinto es el
        caso de los coches eléctricos: ahí la calefacción sí tira de la
        batería y reduce la autonomía de forma apreciable, porque no hay un
        motor de combustión que regale calor. Si tu preocupación es estirar
        cada litro en los viajes largos, lo desarrollamos en la guía de{" "}
        <Link href="/guias/ahorrar-combustible-viaje-largo">cómo ahorrar
        combustible en un viaje largo</Link>.
      </p>

      <h2 id="usar-aire-eficiente">Cómo usar el A/A de forma eficiente</h2>
      <ul>
        <li>
          <strong>Usa el recirculado con calor extremo.</strong> Cuando el
          habitáculo ya está fresco, recircular el aire interior (en vez de
          enfriar aire caliente de fuera) ayuda al compresor a trabajar menos.
          Eso sí, ventila de vez en cuando para que no se cargue el ambiente.
        </li>
        <li>
          <strong>No lo pongas demasiado frío.</strong> Mantén una temperatura
          de confort razonable (23-24 °C). Cuanto menor sea la diferencia con
          el exterior, menos esfuerzo y menos consumo.
        </li>
        <li>
          <strong>Apárcalo a la sombra.</strong> Un coche que no se ha
          convertido en un horno necesita mucho menos esfuerzo para
          refrescarse. Un parasol también ayuda.
        </li>
        <li>
          <strong>Mantenlo en forma.</strong> Cambia el filtro de habitáculo
          según el plan de mantenimiento y revisa la carga de gas cada pocos
          años: un sistema sucio o con poco gas enfría peor y consume más.
        </li>
        <li>
          <strong>Enciéndelo también en invierno.</strong> Unos minutos de
          tanto en tanto desempañan las lunas al instante y mantienen el
          compresor y los retenes en buen estado, evitando fugas y averías.
        </li>
      </ul>
      <p>
        En resumen, no obsesiones con apagar el aire para ahorrar cuatro
        gotas: úsalo con cabeza, baja ventanillas cuando vayas despacio y
        ciérralas en autovía. El ahorro de verdad llega cuando además moderas
        la velocidad y repostas donde el litro sale más barato.
      </p>

      <AppCta
        title="Compara el precio real del litro cerca de ti"
        body="El aire acondicionado sube algo el consumo, pero lo que más mueve la factura es el precio de cada litro. En Carburantes ves las gasolineras más baratas de tu zona: busca por municipio o pulsa «Cerca de mí»."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/conducir-ahorrar-combustible", label: "Conducir para ahorrar" },
          { href: "/guias/velocidad-consumo-autovia", label: "Velocidad y consumo en autovía" },
          { href: "/guias/presion-neumaticos-consumo", label: "Presión de neumáticos" },
        ]}
      />
    </>
  );
}

export default guide;
