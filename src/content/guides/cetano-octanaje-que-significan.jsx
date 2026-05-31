import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "cetano-octanaje-que-significan";
const title = "Cetano y octanaje: qué significan y por qué importan";
const description =
  "El octanaje mide la gasolina y el índice de cetano el diésel. Te explicamos qué significan, en qué se diferencian y cómo afectan al rendimiento de tu motor.";

const guide = {
  slug,
  title,
  seoTitle: "Cetano y octanaje: qué son · Guía Carburantes",
  description,
  category: "tipos-combustible",
  datePublished: "2026-05-27",
  dateModified: "2026-05-27",
  readingMinutes: 6,
  keywords: [
    "cetano",
    "octanaje",
    "índice de cetano",
    "ron gasolina",
    "número de cetano diésel",
  ],
  mentions: [
    { "@type": "Thing", name: "Octanaje" },
    { "@type": "Thing", name: "Cetano" },
    { "@type": "Thing", name: "RON" },
  ],
  faq: [
    {
      q: "¿Qué diferencia hay entre octanaje y cetano?",
      a: "Son dos medidas que miden cosas casi opuestas y que se aplican a combustibles distintos. El octanaje (RON) se aplica a la gasolina y mide su resistencia a auto-encenderse cuando se comprime: cuanto más alto, mejor aguanta sin detonar antes de la chispa de la bujía. El índice de cetano se aplica al diésel y mide justo lo contrario, la facilidad con la que el gasóleo se inflama por sí solo al inyectarse en aire muy caliente y comprimido: cuanto más alto, antes y mejor arranca la combustión. En resumen, una gasolina buena cuesta inflamarse y un diésel bueno se inflama con facilidad. Por eso no tiene sentido hablar de octanaje en el diésel ni de cetano en la gasolina.",
    },
    {
      q: "¿Más octanaje es mejor?",
      a: "Solo es mejor si tu coche lo necesita. El octanaje que debe usar tu motor lo fija el fabricante y aparece en el manual y en la tapa del depósito (por ejemplo, RON 95 o RON 98). Si tu coche está diseñado para 95, echar 98 no le da más potencia ni reduce el consumo de forma apreciable; solo pagas más por litro y aprovechas, como mucho, algunos aditivos detergentes extra. En cambio, si el fabricante exige 98 o 100, usar 95 puede provocar picado de motor y, a la larga, daños. Más octanaje no equivale a más calidad: equivale a más resistencia a la detonación, algo que solo sacan partido los motores de alta compresión.",
    },
    {
      q: "¿Qué cetano tiene el diésel normal?",
      a: "El gasóleo A de automoción que se vende en España suele tener un índice de cetano en torno a 51 como mínimo según la norma europea, y en la práctica muchos diéseles convencionales rondan valores de 51 a 53. Los gasóleos premium o de gama alta de las marcas suelen anunciar cifras algo superiores, a menudo en el entorno de 55 o más, además de aditivos detergentes y mejoradores. Son valores típicos y aproximados, no una garantía exacta de cada surtidor: la normativa puede cambiar y cada distribuidor formula su producto, así que conviene fijarse en la ficha del combustible si te interesa el dato concreto.",
    },
    {
      q: "¿Notaré la diferencia en mi coche?",
      a: "En un coche moderno y bien mantenido, la diferencia entre el combustible estándar y el premium suele ser sutil y no siempre perceptible. Con un diésel de mayor cetano puedes notar arranques en frío algo más suaves, menos ruido de motor en ralentí y una marcha más fina, sobre todo en vehículos más antiguos o con muchos kilómetros. Con una gasolina de mayor octanaje, en un motor que solo pide 95, lo normal es no notar prácticamente nada en potencia ni consumo. Donde sí se nota es en el bolsillo a fin de mes, porque las gamas premium cuestan más por litro. Antes de pagar el extra, compara el precio real en tu zona y valora si el coche realmente lo agradece.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        El <strong>octanaje</strong> (RON) se aplica a la gasolina y mide su
        resistencia a auto-encenderse al comprimirse; el <strong>índice de
        cetano</strong> se aplica al diésel y mide justo lo contrario, lo
        fácil que es inflamarlo. Miden propiedades opuestas en combustibles
        distintos, así que no son intercambiables: una buena gasolina cuesta
        inflamar y un buen diésel se inflama con facilidad.
      </Answer>

      <Tldr
        items={[
          "Octanaje (RON) = gasolina; mide su resistencia a detonar antes de la chispa.",
          "Índice de cetano = diésel; mide la facilidad con la que se inflama solo.",
          "Más octanaje no es «mejor»: solo importa si tu motor lo exige (95, 98 o 100).",
          "El gasóleo A típico ronda un cetano de ~51-53; los premium suelen anunciar más.",
          "El dato lo fija el fabricante: míralo en el manual o en la tapa del depósito.",
        ]}
      />

      <h2 id="que-es-octanaje">Qué es el octanaje (RON) en la gasolina</h2>
      <p>
        El octanaje, que verás escrito como RON (<em>Research Octane Number</em>,
        número de octano de investigación), mide la resistencia de la gasolina
        a auto-encenderse cuando se comprime dentro del cilindro. Un motor de
        gasolina aspira una mezcla de aire y combustible, la comprime y la
        enciende en el momento justo con la chispa de la bujía. El octanaje
        nos dice cuánto aguanta esa mezcla la presión y el calor sin prenderse
        sola antes de tiempo.
      </p>
      <p>
        Cuando la gasolina tiene poco octanaje para lo que el motor le exige,
        se auto-enciende <em>antes</em> de la chispa. Eso es el llamado
        «picado» o detonación: suena como unos golpecillos metálicos en ralentí
        o al acelerar y, mantenido en el tiempo, daña pistones y válvulas. Por
        eso el número importa: cuanto más alto, más se puede comprimir la
        mezcla sin que detone.
      </p>
      <p>
        En España la gasolina habitual es la 95 y la 98, donde el número es
        precisamente el RON. La 95 vale para la inmensa mayoría del parque; la
        98 solo es necesaria en motores de alta compresión que la exigen.
        Echar más octanaje del que tu coche pide no le da más potencia: si
        quieres profundizar, lo desarrollamos en{" "}
        <Link href="/guias/gasolina-95-vs-98">gasolina 95 vs 98</Link>.
      </p>

      <h2 id="que-es-cetano">Qué es el índice de cetano en el diésel</h2>
      <p>
        El índice de cetano (también «número de cetano») mide lo contrario que
        el octanaje, pero aplicado al diésel: cuán fácilmente se inflama el
        gasóleo por sí solo cuando se inyecta en el cilindro. Un motor diésel
        no tiene bujías: comprime mucho el aire hasta calentarlo y luego
        inyecta el combustible, que debe encenderse de forma espontánea por ese
        calor. Cuanto mayor es el cetano, antes y de forma más estable arranca
        esa combustión tras la inyección.
      </p>
      <p>
        El retardo entre que el gasóleo se inyecta y empieza a arder se llama
        «retardo de encendido». Un cetano alto reduce ese retardo, lo que se
        traduce en una combustión más progresiva y silenciosa, arranques en
        frío más limpios y menos ese típico traqueteo del diésel. Un cetano
        bajo alarga el retardo y puede provocar marcha más ruidosa, arranques
        difíciles y mayor emisión de humos.
      </p>
      <p>
        El gasóleo A de automoción en España parte de un mínimo en torno a 51
        según la norma europea, y en la práctica suele moverse entre ~51 y 53.
        Las versiones premium de las marcas anuncian cifras algo más altas y
        aditivos adicionales. Las diferencias entre el gasóleo estándar y el
        premium las tratamos en{" "}
        <Link href="/guias/diesel-a-vs-premium">diésel A vs premium</Link>.
      </p>

      <h2 id="por-que-no-son-lo-mismo">Por qué no son lo mismo</h2>
      <p>
        Octanaje y cetano se confunden con facilidad porque ambos son números
        que aparecen en el combustible, pero miden propiedades opuestas en
        carburantes distintos. El octanaje premia que la gasolina <em>resista</em>
        {" "}encenderse; el cetano premia que el diésel se <em>encienda</em> con
        facilidad. Son dos formas de combustión completamente diferentes.
      </p>
      <ul>
        <li>
          <strong>Gasolina (encendido provocado)</strong>: la mezcla se enciende
          con una chispa en un instante controlado. Interesa que no se adelante,
          de ahí que valoremos la resistencia que mide el octanaje.
        </li>
        <li>
          <strong>Diésel (encendido por compresión)</strong>: no hay chispa, el
          gasóleo debe inflamarse solo por el calor de la compresión. Interesa
          que lo haga pronto y de forma estable, de ahí el índice de cetano.
        </li>
      </ul>
      <p>
        Por eso no existe «octanaje del diésel» ni «cetano de la gasolina»: cada
        medida pertenece a su combustible. Y por eso un motor de gasolina y uno
        diésel no son intercambiables ni siquiera en lo conceptual; cada uno
        está diseñado alrededor de una de estas dos lógicas.
      </p>

      <CompareTable
        caption="Octanaje vs índice de cetano (datos típicos en España, 2026)"
        headers={["Característica", "Octanaje (RON)", "Índice de cetano"]}
        rows={[
          ["Combustible", "Gasolina", "Diésel (gasóleo)"],
          ["Qué mide", "Resistencia a auto-encenderse", "Facilidad para inflamarse"],
          ["Tipo de encendido", "Por chispa (bujía)", "Por compresión (calor)"],
          ["Valor típico", "95 o 98 RON", "~51-53 (premium, más)"],
          ["Más alto significa", "Aguanta más compresión sin detonar", "Combustión más rápida y suave"],
          ["¿Más es mejor?", "Solo si el motor lo exige", "Suele mejorar suavidad y arranque"],
        ]}
      />

      <h2 id="como-afectan-al-motor">Cómo afectan al motor</h2>
      <p>
        En la gasolina, el octanaje correcto es el que el fabricante diseñó.
        Si el motor pide 95 y le echas 95, funciona como debe. Si pide 98 (o
        100) y le pones 95, el sensor de picado lo detecta y retrasa el avance
        de encendido para protegerse: pierdes algo de potencia, puedes gastar
        un poco más y, a largo plazo, sometes el motor a un estrés que no le
        conviene. Subir de 95 a 98 sin que el coche lo necesite no aporta una
        mejora apreciable.
      </p>
      <p>
        En el diésel, un índice de cetano más alto tiende a dar una combustión
        más progresiva: arranques en frío más fáciles, menos ruido de motor y
        una marcha más fina, algo que se nota más en vehículos antiguos o con
        muchos kilómetros que en uno moderno y bien puesto a punto. No es que
        «dé más potencia», sino que la combustión es más limpia y ordenada.
      </p>
      <Callout type="warn" title="Respeta lo que pide el fabricante">
        El octanaje mínimo de tu coche no es una recomendación opcional: viene
        en el manual y en la tapa del depósito (por ejemplo «RON 95» o «RON
        98»). Bajar de ese mínimo de forma habitual puede causar picado y
        daños. Subir por encima «por si acaso» rara vez compensa el sobrecoste.
        Con el diésel hay menos margen de elección de números, pero también
        conviene seguir las indicaciones del fabricante sobre el tipo de
        gasóleo.
      </Callout>

      <h2 id="necesitas-mas-octanos-o-cetano">¿Necesitas más octanos o cetano?</h2>
      <p>
        En la mayoría de los casos, no: el combustible estándar que pide tu
        coche es suficiente y el sobreprecio de las gamas altas rara vez se
        recupera en consumo. Solo merece la pena subir cuando el fabricante lo
        exige (gasolinas de alto RON) o cuando quieres una marcha más fina en
        un diésel concreto y compruebas que tu coche lo agradece.
      </p>
      <p>
        Para decidir con cabeza, ten en cuenta tres cosas:
      </p>
      <ul>
        <li>
          <strong>Lo que dice el manual.</strong> Si pide 95, usa 95. Si exige
          98 o 100, no bajes. Es el dato que manda por encima de cualquier
          consejo general.
        </li>
        <li>
          <strong>Los aditivos, no solo el número.</strong> Buena parte del
          beneficio de las gamas premium viene de sus detergentes, no solo del
          octanaje o el cetano. Un truco razonable es alternar: meter un
          depósito premium cada cuatro o cinco repostajes normales.
        </li>
        <li>
          <strong>El precio real en tu zona.</strong> La diferencia por litro
          entre estándar y premium varía mucho de una estación a otra. Antes de
          pagar el extra, compara cuánto cuesta realmente cerca de ti.
        </li>
      </ul>
      <p>
        Si todavía dudas entre tecnologías de combustible o entre tipos de
        carburante, te orientamos en la{" "}
        <Link href="/guias/tipos-de-combustible-guia-completa">guía completa
        de tipos de combustible</Link>.
      </p>

      <AppCta
        title="Compara el precio real antes de pagar por el premium"
        body="En Carburantes ves el precio de cada combustible estación por estación, con datos del Ministerio actualizados cada media hora. Pulsa «Cerca de mí» o busca por municipio para saber si el extra del octanaje o el cetano compensa en tu zona."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/gasolina-95-vs-98", label: "Gasolina 95 vs 98" },
          { href: "/guias/diesel-a-vs-premium", label: "Diésel A vs premium" },
          { href: "/guias/tipos-de-combustible-guia-completa", label: "Guía completa de tipos de combustible" },
        ]}
      />
    </>
  );
}

export default guide;
