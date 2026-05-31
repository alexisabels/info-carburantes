import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "coche-hidrogeno-espana";
const title = "Coche de hidrógeno en España: cómo funciona y dónde repostar";
const description =
  "Pila de combustible, autonomía, precio del hidrógeno y las (pocas) hidrogeneras de España. Todo sobre el coche de hidrógeno y si tiene futuro aquí.";

const guide = {
  slug,
  title,
  seoTitle: "Coche de hidrógeno en España · Guía Carburantes",
  description,
  category: "tipos-combustible",
  datePublished: "2026-05-13",
  dateModified: "2026-05-13",
  readingMinutes: 7,
  keywords: [
    "coche de hidrógeno",
    "hidrogeneras españa",
    "precio hidrógeno coche",
    "pila de combustible",
    "hidrógeno vs eléctrico",
  ],
  mentions: [
    { "@type": "Thing", name: "Hidrógeno" },
    { "@type": "Thing", name: "Pila de combustible" },
  ],
  faq: [
    {
      q: "¿Cuántas hidrogeneras hay en España?",
      a: "Muy pocas, y casi todas pensadas para flotas o autobuses más que para turismos. A fecha de 2026 hablamos de un puñado de estaciones públicas de hidrógeno repartidas por unas pocas comunidades (zona de Madrid, Cataluña, País Vasco, Comunidad Valenciana, Aragón y algún punto más), del orden de una o dos docenas operativas en todo el país. La cifra cambia con frecuencia porque hay proyectos que abren, otros que están solo anunciados y algunos que cierran o quedan fuera de servicio. La consecuencia práctica es que hoy no puedes hacer un viaje largo en coche de hidrógeno por España con la tranquilidad con la que repostas gasolina o diésel: tienes que planificar cada parada y, en muchas rutas, simplemente no hay estación.",
    },
    {
      q: "¿Cuánto cuesta llenar un coche de hidrógeno?",
      a: "Llenar un turismo de hidrógeno (depósitos en torno a 5-6 kilos) suele costar bastante más que un depósito equivalente de gasolina. Con precios típicos del hidrógeno para automoción en Europa, en torno a 10-15 euros por kilo de media, un lleno ronda fácilmente los 60-90 euros y da una autonomía aproximada de 500-650 km. El precio no está regulado ni es transparente como el de la gasolina, varía mucho de una estación a otra y de un país a otro, y la red es tan pequeña que no hay competencia que lo abarate. Son cifras orientativas: el coste real depende de la estación concreta y del momento.",
    },
    {
      q: "¿El hidrógeno contamina?",
      a: "El coche en sí no: por el tubo de escape solo sale vapor de agua, sin CO2 ni partículas ni NOx. El problema está antes, en cómo se produce el hidrógeno. Hoy la mayor parte del hidrógeno mundial es hidrógeno gris, obtenido a partir de gas natural en un proceso que sí emite mucho CO2. Solo el hidrógeno verde, producido por electrólisis con electricidad renovable, es realmente limpio de principio a fin, pero todavía es minoritario y caro. Por eso un coche de hidrógeno solo es de verdad ecológico si se alimenta con hidrógeno verde; con hidrógeno gris las emisiones se trasladan a la fábrica en lugar de eliminarse.",
    },
    {
      q: "¿Hidrógeno o eléctrico?",
      a: "Para el coche particular en España, hoy el eléctrico de batería va muy por delante: hay miles de puntos de recarga, los coches son más baratos, el coste por kilómetro es menor y puedes cargar en casa. El hidrógeno tiene a su favor el repostaje rápido (3-5 minutos) y la autonomía sin perder capacidad con el frío, ventajas que importan sobre todo en camiones, autobuses y flotas que recorren muchos kilómetros y vuelven siempre a la misma base. Para la mayoría de conductores, mientras no haya hidrogeneras cerca, la respuesta práctica es el eléctrico o, si haces muchos kilómetros, seguir comparando el coste real de gasolina y diésel.",
    },
    {
      q: "¿Puedo comprar un coche de hidrógeno en España hoy?",
      a: "Se puede, pero la oferta es testimonial. Hay muy pocos modelos de turismo de pila de combustible a la venta (como el Toyota Mirai o el Hyundai Nexo), son caros y, sobre todo, dependen de una red de repostaje casi inexistente fuera de unas pocas ciudades. Comprar uno hoy en España solo tiene sentido en casos muy concretos: flotas con surtidor propio, demostradores o usuarios que viven justo al lado de una hidrogenera. Para el conductor normal, no es una alternativa realista todavía.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Un coche de hidrógeno es, en realidad, un <strong>coche eléctrico</strong>:
        no quema nada, sino que usa una <strong>pila de combustible</strong> que
        combina hidrógeno con oxígeno para generar electricidad y mover un motor
        eléctrico, soltando solo vapor de agua por el escape. Reposta en
        minutos y tiene buena autonomía, pero en España choca con un muro: hay
        muy pocas <strong>hidrogeneras</strong>, el hidrógeno es caro y, para el
        conductor particular, hoy no es una alternativa práctica frente al
        eléctrico de batería o a los combustibles tradicionales.
      </Answer>

      <Tldr
        items={[
          "El coche de hidrógeno es eléctrico: una pila de combustible genera la electricidad a bordo y solo emite vapor de agua.",
          "Reposta en 3-5 minutos y ofrece 500-650 km de autonomía: sus dos grandes ventajas frente al eléctrico de batería.",
          "El hidrógeno cuesta del orden de 10-15 €/kg de media, así que un lleno ronda los 60-90 € (cifras orientativas, 2026).",
          "El gran problema en España son las hidrogeneras: apenas una o dos docenas, casi todas para flotas y autobuses.",
          "Hoy tiene sentido para camiones y flotas con base fija; para el coche particular, todavía no.",
        ]}
      />

      <h2 id="como-funciona">Cómo funciona un coche de hidrógeno</h2>
      <p>
        La confusión más habitual es pensar que un coche de hidrógeno
        «quema» hidrógeno como una gasolina quema combustible. No es así. Lo
        que mueve las ruedas es un <strong>motor eléctrico</strong>, exactamente
        igual que en un coche de batería. La diferencia está en de dónde sale
        esa electricidad.
      </p>
      <p>
        En lugar de una batería grande cargada desde un enchufe, el coche
        lleva una <strong>pila de combustible</strong> (en inglés <em>fuel
        cell</em>). Dentro de ella ocurre lo contrario de la electrólisis: el
        hidrógeno almacenado en unos depósitos a alta presión se combina con el
        oxígeno del aire y, en esa reacción química controlada, se genera
        electricidad. El único residuo es <strong>agua</strong>, que sale por
        el escape en forma de vapor. No hay combustión, ni CO₂, ni NOx, ni
        partículas saliendo del coche.
      </p>
      <p>Los componentes clave son:</p>
      <ul>
        <li>
          <strong>Depósitos de hidrógeno</strong>: tanques reforzados que
          guardan el gas a muy alta presión (habitualmente 700 bar). Almacenan
          del orden de 5-6 kilos de hidrógeno en un turismo.
        </li>
        <li>
          <strong>Pila de combustible</strong>: el «corazón» donde el hidrógeno
          y el oxígeno producen la corriente eléctrica.
        </li>
        <li>
          <strong>Batería tampón</strong>: una batería pequeña que almacena
          energía, recupera la frenada (como en un híbrido) y da empuje extra
          en aceleraciones.
        </li>
        <li>
          <strong>Motor eléctrico</strong>: el que realmente mueve el coche,
          silencioso y con par instantáneo.
        </li>
      </ul>
      <p>
        Por eso a estos coches se les llama técnicamente FCEV (<em>Fuel Cell
        Electric Vehicle</em>) y la DGT les da la etiqueta CERO, la misma que a
        los eléctricos puros. Si te interesa cómo se clasifican los distintos
        combustibles y tecnologías, lo desarrollamos en la{" "}
        <Link href="/guias/etiqueta-dgt-combustible">guía de la etiqueta
        ambiental de la DGT</Link>.
      </p>

      <h2 id="autonomia-repostaje">Autonomía y repostaje</h2>
      <p>
        Aquí es donde el hidrógeno saca pecho frente al coche eléctrico de
        batería, y con razón. Sus dos grandes ventajas son justo las dos
        cosas que más fricción generan en un eléctrico convencional:
      </p>
      <ul>
        <li>
          <strong>Repostaje rápido</strong>: llenar los depósitos lleva entre
          3 y 5 minutos, prácticamente como echar gasolina. Nada de esperar
          media hora en un cargador rápido.
        </li>
        <li>
          <strong>Autonomía sólida</strong>: un turismo de hidrógeno recorre del
          orden de 500-650 km con un lleno, y esa cifra apenas se resiente con
          el frío, a diferencia de las baterías, que pierden autonomía en
          invierno.
        </li>
      </ul>
      <p>
        Sobre el papel suena ideal: la comodidad de repostar de un coche de
        gasolina con la limpieza de un eléctrico. El problema, como veremos, no
        es el coche ni la tecnología, sino que casi no hay sitios donde llenar
        el depósito. De poco sirve repostar en cinco minutos si la hidrogenera
        más cercana está a 200 km.
      </p>

      <Callout type="info" title="No confundas con el motor de hidrógeno">
        Existe una tecnología distinta, el motor de combustión de hidrógeno
        (un motor parecido al de gasolina que quema hidrógeno en lugar de
        combustible fósil), que algunos fabricantes investigan sobre todo para
        deportivos y maquinaria. No es lo mismo que la pila de combustible de
        la que hablamos aquí: el coche de hidrógeno que se vende para carretera
        es eléctrico de pila de combustible, no de combustión.
      </Callout>

      <h2 id="precio-coste-km">Precio del hidrógeno y coste por km</h2>
      <p>
        Si vienes de comparar el precio de la gasolina, lo primero que choca es
        que el hidrógeno <strong>no se vende por litro, sino por kilo</strong>,
        y que su precio no está regulado ni es transparente como el de los
        carburantes tradicionales. No existe un equivalente al sistema oficial
        del Ministerio que te diga, estación por estación, lo que cuesta el
        kilo de hidrógeno en tiempo real.
      </p>
      <p>
        Con precios típicos del hidrógeno para automoción en Europa, en torno a{" "}
        <strong>10-15 € por kilo de media</strong>, y depósitos de unos 5-6
        kilos, un lleno completo ronda fácilmente los <strong>60-90 €</strong> y
        da esos 500-650 km de autonomía. Son cifras orientativas para 2026: el
        coste real depende de la estación concreta y del momento, porque la red
        es tan pequeña que no hay competencia que tire los precios hacia abajo.
      </p>
      <p>
        Traducido a coste por kilómetro, hoy un coche de hidrógeno sale
        bastante más caro de «alimentar» que un eléctrico de batería cargado en
        casa, y en muchos casos también más que un diésel o un gasolina
        eficientes. La promesa es que el hidrógeno verde se abarate mucho en la
        próxima década; mientras tanto, el bolsillo sigue mandando. Si lo que
        buscas es gastar menos en cada repostaje hoy, la palanca real sigue
        siendo elegir bien la gasolinera: en la{" "}
        <Link href="/guias/cuanto-se-ahorra-comparando-gasolineras">guía
        de cuánto se ahorra comparando gasolineras</Link> verás el margen que
        hay entre la más cara y la más barata de tu zona.
      </p>

      <CompareTable
        caption="Hidrógeno vs eléctrico de batería para coche particular (datos típicos en España, 2026)"
        headers={["Aspecto", "Hidrógeno (pila de combustible)", "Eléctrico de batería"]}
        rows={[
          ["Cómo se mueve", "Motor eléctrico", "Motor eléctrico"],
          ["De dónde sale la energía", "Pila que combina hidrógeno y oxígeno", "Batería cargada del enchufe"],
          ["Tiempo de repostaje", "3-5 minutos", "20-40 min (rápido) / horas en casa"],
          ["Autonomía típica", "~500-650 km", "~300-500 km (varía con frío)"],
          ["Coste por km", "Alto (hidrógeno caro)", "Bajo si cargas en casa"],
          ["Red en España", "Muy escasa (decenas)", "Amplia (miles de puntos)"],
          ["Emisiones del coche", "Solo vapor de agua", "Cero (sin escape)"],
        ]}
      />

      <h2 id="hidrogeneras-espana">Hidrogeneras en España: el gran cuello de botella</h2>
      <p>
        Aquí está el verdadero motivo por el que el coche de hidrógeno no ha
        despegado para el particular en España. No es que la tecnología falle:
        es que <strong>no hay dónde repostar</strong>. Frente a las más de
        11.000 gasolineras que se calculan en el país y a los miles de puntos
        de recarga eléctrica, las hidrogeneras públicas se cuentan con los dedos.
      </p>
      <p>
        A fecha de 2026, hablamos del orden de una o dos docenas de estaciones
        operativas en toda España, concentradas en unas pocas zonas (entorno de
        Madrid, Cataluña, País Vasco, Comunidad Valenciana, Aragón y algún punto
        más) y diseñadas en su mayoría para <strong>flotas, autobuses urbanos y
        camiones</strong>, no para que un turismo cualquiera pare a llenar. La
        cifra exacta baila constantemente: hay proyectos que se anuncian, otros
        que abren, alguno que cierra o queda fuera de servicio.
      </p>
      <p>Las consecuencias para el conductor particular son demoledoras:</p>
      <ul>
        <li>
          <strong>No puedes planificar un viaje largo</strong> con tranquilidad:
          en la mayoría de rutas, simplemente no hay hidrogenera.
        </li>
        <li>
          <strong>Dependes de una sola estación</strong>. Si la que te queda
          cerca está en mantenimiento, te quedas tirado sin alternativa próxima.
        </li>
        <li>
          <strong>No hay competencia</strong> que ajuste el precio: con tan
          pocos puntos, el kilo de hidrógeno se mantiene caro.
        </li>
      </ul>
      <p>
        Es el clásico problema del huevo y la gallina: no se venden coches
        porque no hay hidrogeneras, y no se construyen hidrogeneras porque no
        hay coches que las usen. El eléctrico de batería rompió ese círculo
        porque se puede cargar en casa o en cualquier enchufe; el hidrógeno, de
        momento, no tiene esa salida.
      </p>

      <h2 id="tiene-sentido-hoy">¿Tiene sentido hoy?</h2>
      <p>
        Para el <strong>coche particular en España, hoy no</strong>, salvo casos
        muy concretos (vivir literalmente al lado de una hidrogenera, formar
        parte de un programa de demostración o de una flota con surtidor
        propio). La oferta de modelos es testimonial, los coches son caros y la
        red de repostaje hace inviable usarlos como coche único.
      </p>
      <p>
        Donde el hidrógeno sí tiene un futuro razonable es en el{" "}
        <strong>transporte pesado y las flotas</strong>: camiones de largo
        recorrido, autobuses urbanos, vehículos de logística que hacen muchos
        kilómetros y vuelven cada noche a la misma base, donde se puede instalar
        una sola hidrogenera que sirva a decenas de vehículos. Ahí el repostaje
        rápido y la autonomía sin penalización por frío marcan la diferencia
        frente a baterías enormes y pesadas.
      </p>
      <p>
        Si lo que estás haciendo es elegir tu próximo coche, lo más sensato hoy
        es comparar las opciones realmente disponibles y baratas de usar. Entre
        térmicos, la decisión clásica la analizamos en{" "}
        <Link href="/guias/coche-diesel-o-gasolina">diésel o gasolina: cuál
        comprar</Link>; y si quieres una alternativa más económica de repostar
        que el hidrógeno y con red de verdad, echa un vistazo a gas como el{" "}
        <Link href="/guias/glp-autogas-espana">GLP (autogás)</Link>.
      </p>

      <AppCta
        title="Compara el precio real de tu combustible cerca"
        body="Mientras el hidrógeno madura, lo que sí puedes controlar hoy es lo que pagas en cada repostaje. Carburantes lee los datos oficiales del Ministerio: busca por municipio o pulsa «Cerca de mí» para ver las gasolineras más baratas de tu zona."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/gnc-gas-natural-vehicular", label: "GNC: gas natural vehicular" },
          { href: "/guias/glp-autogas-espana", label: "GLP (autogás)" },
          { href: "/guias/coche-diesel-o-gasolina", label: "Diésel o gasolina" },
        ]}
      />
    </>
  );
}

export default guide;
