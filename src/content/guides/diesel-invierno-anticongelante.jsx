import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "diesel-invierno-anticongelante";
const title = "¿Se congela el diésel con el frío? El diésel de invierno";
const description =
  "Con frío extremo el diésel puede parafinarse y dejar el coche tirado. Te explicamos qué es el diésel de invierno, cuándo se usa y cómo evitar problemas.";

const guide = {
  slug,
  title,
  seoTitle: "Diésel de invierno: ¿se congela? · Guía",
  description,
  category: "tipos-combustible",
  datePublished: "2026-05-27",
  dateModified: "2026-05-27",
  readingMinutes: 6,
  keywords: [
    "diésel se congela",
    "diésel de invierno",
    "parafinado diésel",
    "aditivo anticongelante diésel",
    "diésel frío arranque",
  ],
  mentions: [
    { "@type": "Thing", name: "Parafina" },
    { "@type": "Thing", name: "Diésel de invierno" },
  ],
  faq: [
    {
      q: "¿A qué temperatura se congela el diésel?",
      a: "El diésel no se congela como el agua a una temperatura fija, sino que empieza a parafinarse de forma progresiva. El diésel de verano que se vende en España suele empezar a enturbiarse en torno a los -5 °C y a obstruir el filtro alrededor de los 0 a -10 °C, mientras que el diésel de invierno aguanta de forma habitual hasta unos -20 °C, y las versiones árticas o premium bastante más. Son cifras típicas y orientativas: el comportamiento real depende del lote, de los aditivos y del estado de tu sistema de combustible.",
    },
    {
      q: "¿Las gasolineras cambian el diésel en invierno?",
      a: "Sí. En España la normativa de calidad de carburantes establece que durante los meses fríos las estaciones dispensen un diésel con mejor comportamiento a baja temperatura, y en zonas de montaña o muy frías se distribuyen grados aún más resistentes. El cambio es automático y no tienes que pedir nada especial: si repostas con normalidad en invierno, ya estás cargando el grado adecuado para la estación. La normativa puede cambiar, así que para el detalle exacto conviene consultar la fuente oficial.",
    },
    {
      q: "¿Sirven los aditivos anticongelantes?",
      a: "Sí, los aditivos anticongelantes para diésel funcionan: rebajan el punto de obstrucción del filtro varios grados al modificar la forma en que cristaliza la parafina. Son útiles sobre todo si vas a dejar el coche a la intemperie en una ola de frío intensa o si has llenado con diésel de verano antes de subir a la montaña. Hay que echarlos en el depósito antes de repostar y respetar la dosis del fabricante; añadirlos cuando el diésel ya está parafinado no deshace los cristales ya formados.",
    },
    {
      q: "¿El diésel premium aguanta mejor el frío?",
      a: "De media sí. Los diéseles premium de las grandes marcas suelen llevar más aditivos, incluidos mejoradores de fluidez en frío, por lo que su punto de obstrucción tiende a ser más bajo que el del diésel normal. Aun así, en invierno tanto el diésel normal como el premium se distribuyen ya con grado de invierno, de modo que la diferencia en condiciones habituales es pequeña. El premium aporta un margen extra de seguridad en frío extremo, pero no sustituye a la prevención básica.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        El diésel no se congela como el agua, pero con frío intenso la{" "}
        <strong>parafina</strong> que lleva disuelta cristaliza y forma una
        especie de cera que tapona el filtro de combustible y deja el coche sin
        arrancar. Para evitarlo, en invierno las gasolineras dispensan{" "}
        <strong>diésel de invierno</strong>, formulado para aguantar
        temperaturas mucho más bajas (de forma típica hasta unos -20 °C).
      </Answer>

      <Tldr
        items={[
          "El diésel no se «congela»: se parafina. Los cristales de cera tapan el filtro y el motor no recibe combustible.",
          "El dato clave es el POFF (punto de obstrucción del filtro en frío), no una temperatura de congelación.",
          "En invierno las gasolineras españolas cambian al diésel de invierno automáticamente; aguanta de media hasta ~-20 °C.",
          "Si vas a zona de montaña con frío extremo, un aditivo anticongelante o un diésel premium dan margen extra.",
          "Si ya estás tirado por el frío, calentar el coche (garaje, sol) suele deshacer la parafina sin daños.",
        ]}
      />

      <h2 id="se-congela-de-verdad">¿Se congela de verdad el diésel?</h2>
      <p>
        No en el sentido habitual: el diésel no pasa de líquido a un bloque
        sólido a una temperatura concreta como hace el agua a 0 °C. Lo que
        ocurre es distinto y más gradual. El gasóleo contiene{" "}
        <strong>parafinas</strong> (cadenas de hidrocarburos cerosos) disueltas;
        cuando baja mucho la temperatura, esas parafinas empiezan a cristalizar
        y el combustible se vuelve turbio, espeso y, finalmente, incapaz de
        atravesar el filtro.
      </p>
      <p>
        Por eso, más que «congelarse», se dice que el diésel se{" "}
        <strong>parafina</strong> o «se apelmaza». El problema no es estético:
        esos cristalitos de cera se acumulan en la malla del filtro de
        combustible y lo taponan, igual que un colador se atasca con grumos.
        Cuando eso pasa, la bomba ya no puede empujar gasóleo hacia los
        inyectores y el motor se queda sin alimentación: o no arranca, o arranca
        y se cala a los pocos minutos.
      </p>
      <p>
        Es un fenómeno típico de mañanas muy frías en zonas de interior y
        montaña, sobre todo si el coche ha pasado la noche a la intemperie. La
        gasolina, por cierto, no sufre este problema porque no lleva esas
        parafinas; es una cuestión exclusiva del diésel. Si tienes dudas sobre
        qué tipo de gasóleo carga tu coche, lo repasamos en la guía de{" "}
        <Link href="/guias/diesel-a-vs-premium">diésel A frente a premium</Link>.
      </p>

      <h2 id="parafina-y-poff">La parafina y el punto de obstrucción (POFF)</h2>
      <p>
        Para hablar con propiedad del frío y el diésel hay que conocer tres
        temperaturas que definen su comportamiento. No son una sola cifra mágica,
        sino una secuencia de fenómenos que ocurren según baja el termómetro:
      </p>
      <ul>
        <li>
          <strong>Punto de enturbiamiento (cloud point):</strong> la temperatura
          a la que aparecen los primeros cristales y el gasóleo se vuelve turbio.
          A esta altura el coche aún funciona, pero es la primera señal.
        </li>
        <li>
          <strong>Punto de obstrucción del filtro en frío (POFF, o CFPP en
          inglés):</strong> la temperatura a la que los cristales ya son
          bastantes como para taponar un filtro estándar. Este es el dato que de
          verdad importa, porque marca cuándo el coche deja de arrancar.
        </li>
        <li>
          <strong>Punto de congelación (pour point):</strong> la temperatura a la
          que el gasóleo deja de fluir por completo. Se alcanza ya por debajo del
          POFF y es la situación más extrema.
        </li>
      </ul>
      <p>
        El número clave es el <strong>POFF</strong>. Cuando una etiqueta o una
        ficha técnica te dice que un diésel «aguanta -20 °C», se está refiriendo
        a su punto de obstrucción del filtro: por debajo de esa cifra, el riesgo
        de quedarte tirado se dispara. Para empujar ese POFF hacia abajo, las
        refinerías ajustan la mezcla de hidrocarburos y, sobre todo, añaden{" "}
        <strong>aditivos mejoradores de flujo en frío</strong>, que no eliminan la
        parafina pero hacen que cristalice en partículas más pequeñas que sí
        atraviesan el filtro.
      </p>

      <CompareTable
        caption="Comportamiento en frío según el grado de diésel (datos típicos en España, 2026)"
        headers={["Grado de diésel", "POFF orientativo", "Cuándo se usa"]}
        rows={[
          ["Diésel de verano", "~0 a -10 °C", "Meses cálidos y zonas templadas"],
          ["Diésel de invierno", "~-20 °C", "Meses fríos en la mayoría del país"],
          ["Diésel ártico / montaña", "~-30 °C o menos", "Zonas muy frías y alta montaña"],
          ["Diésel premium en invierno", "más bajo que el normal", "Margen extra en frío extremo"],
        ]}
      />
      <p>
        Las cifras de la tabla son aproximadas y varían según el lote, la marca y
        la comunidad autónoma. Lo importante es la idea: cada grado está pensado
        para una franja de temperatura, y el sistema está diseñado para que
        repostes el adecuado sin tener que pensarlo.
      </p>

      <h2 id="diesel-invierno-espana">El diésel de invierno en España</h2>
      <p>
        En España no existe «un solo diésel» todo el año. La normativa de calidad
        de carburantes obliga a las estaciones a dispensar un gasóleo con mejor
        comportamiento en frío durante los meses de invierno, y a reforzar ese
        grado en las zonas y altitudes donde las temperaturas son más severas. El
        cambio es <strong>automático y transparente</strong>: en el surtidor sigue
        poniendo «Gasóleo A» o «Diésel», pero la formulación interior es la de
        invierno.
      </p>
      <p>
        En la práctica esto significa que, si haces vida normal y repostas en tu
        zona, ya estás cargando el diésel apropiado para la estación sin hacer
        nada especial. Los problemas suelen aparecer en dos situaciones concretas:
      </p>
      <ul>
        <li>
          <strong>Cruzas de una zona templada a una muy fría con el depósito
          lleno.</strong> Si llenaste en la costa con diésel de transición y
          subes a un puerto de montaña en plena ola de frío, llevas un gasóleo
          que quizá no esté preparado para esa temperatura.
        </li>
        <li>
          <strong>El coche lleva semanas parado con diésel viejo.</strong> Un
          depósito llenado en otoño y sin mover puede contener un grado menos
          resistente del que necesitarías en pleno enero.
        </li>
      </ul>
      <p>
        La normativa que regula esto puede actualizarse de un año a otro, así que
        para fechas y umbrales exactos conviene consultar la fuente oficial. La
        idea de fondo, eso sí, es estable: <strong>el invierno trae un diésel más
        resistente al frío</strong>, y las zonas frías reciben grados todavía más
        bajos. Si planificas una ruta de montaña, comparar antes dónde repostar te
        ayuda a llegar con el depósito en condiciones; puedes hacerlo con el{" "}
        <Link href="/guias/planificar-repostajes-ruta">planificador de
        repostajes</Link>.
      </p>

      <h2 id="no-arranca-por-frio">Si el coche no arranca por el frío</h2>
      <p>
        Si una mañana gélida tu diésel no arranca o arranca y se cala enseguida, y
        descartas batería y otras causas, lo más probable es que el filtro esté
        parafinado. La buena noticia: <strong>no es una avería y no daña el
        motor</strong>. Los cristales de cera se deshacen solos en cuanto la
        temperatura sube. Qué puedes hacer:
      </p>
      <ul>
        <li>
          <strong>Dale calor.</strong> Si puedes mover el coche a un garaje
          cerrado, en pocas horas el filtro se descongela. Aparcar al sol según
          avanza la mañana también suele bastar.
        </li>
        <li>
          <strong>No insistas con el motor de arranque.</strong> Arrancar una y
          otra vez solo descarga la batería y no resuelve el taponamiento.
          Espera a que el coche se temple.
        </li>
        <li>
          <strong>Usa los precalentadores correctamente.</strong> Espera a que se
          apague el testigo de las bujías de incandescencia antes de arrancar; en
          frío extremo, repite el ciclo un par de veces.
        </li>
        <li>
          <strong>No eches agua caliente ni soples con llama.</strong> Sobre el
          filtro o las tuberías es peligroso y puede dañar piezas. El calor
          ambiente es suficiente.
        </li>
      </ul>
      <Callout type="warn" title="Cuándo sospechar de la parafina">
        Si el coche arrancaba bien y de repente, tras la primera helada fuerte
        del año, empieza a dar tirones, a perder potencia cuesta arriba o a
        calarse al ralentí en frío, piensa en el filtro de combustible antes que
        en una avería grave. En cuanto sube la temperatura suele volver a la
        normalidad. Si se repite, revisa el filtro en el taller: uno viejo o
        sucio se obstruye con mucha menos parafina que uno nuevo.
      </Callout>

      <h2 id="como-prevenirlo">Cómo prevenirlo</h2>
      <p>
        La parafina es un problema fácil de evitar con un poco de previsión.
        Estos hábitos cubren prácticamente todos los casos:
      </p>
      <ul>
        <li>
          <strong>Reposta en tu zona y a menudo en invierno.</strong> Así
          renuevas el diésel y te aseguras de llevar el grado de la estación, no
          uno cargado meses atrás.
        </li>
        <li>
          <strong>Si subes a la montaña, llena allí o cerca.</strong> El gasóleo
          de las estaciones de zonas frías ya viene con un POFF más bajo. Evita
          subir con el depósito lleno de diésel de costa.
        </li>
        <li>
          <strong>Guarda el coche bajo techo si puedes.</strong> Un garaje, aunque
          no esté calefactado, mantiene unos grados por encima del exterior y
          marca la diferencia en las noches más duras.
        </li>
        <li>
          <strong>Lleva un aditivo anticongelante de reserva</strong> si vives o
          viajas a zonas de frío severo. Se echa en el depósito <em>antes</em> de
          repostar para que se mezcle bien, respetando la dosis del fabricante.
        </li>
        <li>
          <strong>Cuida el filtro de combustible.</strong> Cámbialo según el
          plan de mantenimiento: un filtro nuevo tolera bastante más parafina
          antes de taponarse.
        </li>
      </ul>
      <p>
        Sobre los aditivos conviene tener expectativas realistas: ayudan, pero no
        hacen milagros y solo actúan si los echas antes de que el diésel
        cristalice. Si quieres entender qué promete y qué no este tipo de
        productos, lo analizamos en la guía sobre{" "}
        <Link href="/guias/aditivos-combustible-sirven">si los aditivos de
        combustible sirven de verdad</Link>. Y para entender por qué el
        combustible cambia entre estaciones del año, tienes la guía de{" "}
        <Link href="/guias/combustible-invierno-verano">combustible de invierno
        y verano</Link>.
      </p>

      <AppCta
        title="Compara el precio del diésel cerca de ti"
        body="En invierno todas las estaciones dispensan diésel de invierno, así que puedes elegir por precio sin perder protección frente al frío. Pulsa «Cerca de mí» o busca por municipio para ver el gasóleo más barato de tu zona."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/diesel-a-vs-premium", label: "Diésel A vs premium" },
          { href: "/guias/combustible-invierno-verano", label: "Combustible de invierno y verano" },
          { href: "/guias/tipos-de-combustible-guia-completa", label: "Tipos de combustible" },
        ]}
      />
    </>
  );
}

export default guide;
