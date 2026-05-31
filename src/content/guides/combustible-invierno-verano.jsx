import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "combustible-invierno-verano";
const title = "¿Cambia el combustible entre invierno y verano?";
const description =
  "Las petroleras ajustan la gasolina y el diésel según la estación. Te explicamos qué cambia entre el combustible de invierno y verano y cómo te afecta.";

const guide = {
  slug,
  title,
  seoTitle: "Combustible de invierno y verano · Guía",
  description,
  category: "tipos-combustible",
  datePublished: "2026-05-30",
  dateModified: "2026-05-30",
  readingMinutes: 5,
  keywords: [
    "combustible invierno verano",
    "gasolina verano invierno",
    "diésel invierno",
    "formulación combustible estación",
  ],
  mentions: [
    { "@type": "Thing", name: "Volatilidad" },
    { "@type": "Thing", name: "Parafina" },
  ],
  faq: [
    {
      q: "¿La gasolina cambia en verano?",
      a: "Sí. Las refinerías reducen la volatilidad de la gasolina en los meses cálidos para que no se evapore en exceso dentro del depósito y el circuito de alimentación. En invierno hacen lo contrario: suben la volatilidad para que el motor arranque bien con el frío. Tú no notas el cambio porque la transición es gradual y la haces sin darte cuenta cada vez que repostas. La normativa europea fija valores distintos para el periodo de verano y el de invierno, y las fechas exactas pueden variar según el país y el año.",
    },
    {
      q: "¿Por qué el diésel es distinto en invierno?",
      a: "Porque el gasóleo contiene parafinas que, con el frío intenso, empiezan a cristalizar y pueden obstruir el filtro de combustible. El diésel de invierno lleva aditivos mejoradores de flujo en frío y una formulación que aguanta temperaturas más bajas sin que se forme esa cera. En España, las estaciones suministran gasóleo adaptado a la temporada de forma automática, así que repostando con normalidad ya recibes el adecuado para la época.",
    },
    {
      q: "¿Afecta a mi consumo?",
      a: "Muy poco, y la mayor parte de la diferencia no viene del combustible en sí, sino del frío. Los arranques con motor y aceite fríos, el aire acondicionado o la calefacción, los neumáticos a menos presión y la mayor densidad del aire hacen que gastes algo más en invierno. La formulación estacional del carburante tiene un efecto marginal frente a todo eso. Conducir suave y revisar la presión de los neumáticos te ahorra mucho más que cualquier matiz de la mezcla.",
    },
    {
      q: "¿Tengo que hacer algo?",
      a: "En condiciones normales, nada. Las petroleras y las estaciones ajustan la formulación por ti según el calendario y la zona, así que repostando con regularidad siempre llevas el combustible adecuado. Solo conviene tener cuidado si guardas un coche o una máquina parada mucho tiempo con el depósito de un diésel de verano y luego llegan heladas fuertes, o si viajas a zonas de montaña muy frías; en esos casos, repostar antes de la helada o usar un aditivo anticongelante específico aporta un margen extra.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Sí, el combustible cambia entre invierno y verano, aunque no lo notes.
        Las refinerías ajustan la <strong>volatilidad</strong> de la gasolina y
        la resistencia al frío del diésel según la estación: en verano la
        gasolina se evapora menos y en invierno arranca mejor, mientras que el
        gasóleo de invierno lleva aditivos para que la <strong>parafina</strong>{" "}
        no cristalice con el frío. Tú repostas igual; el ajuste es automático.
      </Answer>

      <Tldr
        items={[
          "El combustible se reformula por temporada por normativa y por física, no por capricho de la petrolera.",
          "Gasolina de verano: menos volátil para que no se evapore con el calor; la de invierno, más volátil para arrancar en frío.",
          "Diésel de invierno: aditivos contra la parafina para que no se forme cera y obstruya el filtro.",
          "El cambio es gradual y automático: repostando con normalidad siempre recibes el adecuado a la época y la zona.",
          "El precio no depende de esto; compara siempre el de cada estación en la app.",
        ]}
      />

      <h2 id="por-que-se-ajusta">Por qué se ajusta por estación</h2>
      <p>
        El combustible no es un líquido fijo que sale siempre igual de la
        refinería. Es una mezcla de hidrocarburos que se formula con un objetivo
        muy concreto: que el motor funcione bien <em>en las condiciones
        ambientales del momento</em>. Y esas condiciones no son las mismas en
        agosto a 40 °C que en enero a −5 °C. Por eso las petroleras producen
        versiones distintas a lo largo del año, dentro de los límites que marca
        la normativa europea de calidad de carburantes.
      </p>
      <p>
        La idea de fondo es sencilla. En verano el riesgo es que el combustible
        se <strong>evapore</strong> demasiado y dé problemas de alimentación o
        emisiones; en invierno el riesgo es justo el contrario, que no arranque
        bien o que se espese con el frío. Ajustar la mezcla por temporada
        resuelve los dos problemas sin que el conductor tenga que hacer nada. La
        transición se hace de forma escalonada en las semanas de cambio de
        estación, así que nunca hay un «día» en que el surtidor pase de una
        fórmula a otra de golpe.
      </p>
      <p>
        Esto afecta tanto a la gasolina como al diésel, pero de maneras
        diferentes y por motivos físicos distintos. Lo vemos por separado.
      </p>

      <h2 id="gasolina-volatilidad">La gasolina: volatilidad (RVP)</h2>
      <p>
        En la gasolina, el parámetro clave que cambia con la estación es la{" "}
        <strong>volatilidad</strong>, que se mide con la presión de vapor Reid o{" "}
        <em>RVP</em> (Reid Vapor Pressure). La volatilidad es, en pocas palabras,
        la facilidad con la que la gasolina pasa de líquido a vapor. Un motor de
        gasolina necesita que parte del combustible se vaporice para mezclarse
        con el aire y arder bien.
      </p>
      <p>
        Aquí hay un equilibrio delicado. Si la gasolina es{" "}
        <strong>demasiado volátil en verano</strong>, con el calor se evapora en
        exceso dentro del depósito y del circuito de alimentación: aumentan las
        emisiones de compuestos volátiles y, en casos extremos en motores
        antiguos, puede aparecer el llamado «vapor lock» (tapón de vapor que
        interrumpe el flujo de combustible). Por eso la gasolina de verano se
        formula con una volatilidad <em>más baja</em>.
      </p>
      <p>
        En invierno el problema es el opuesto. Con el motor y el ambiente fríos,
        cuesta más que la gasolina se vaporice lo suficiente para encender al
        primer intento. Para compensarlo, la gasolina de invierno se hace{" "}
        <strong>más volátil</strong>: arranca mejor en frío y el ralentí se
        estabiliza antes. Si te interesa el detalle de cómo el frío encarece esos
        primeros minutos, lo desarrollamos en la guía sobre{" "}
        <Link href="/guias/ralenti-arranque-frio-consumo">ralentí y arranque en
        frío</Link>.
      </p>
      <Callout type="info" title="¿Y el octanaje? Ese no cambia">
        El número que ves en el surtidor (95, 98) es el octanaje, y no varía por
        temporada: la 95 sigue siendo 95 todo el año. Lo que cambia es la
        volatilidad, un parámetro interno que no aparece etiquetado. Si tienes
        dudas sobre qué significa el octanaje frente a otras siglas, lo
        explicamos en{" "}
        <Link href="/guias/cetano-octanaje-que-significan">cetano y octanaje</Link>.
      </Callout>

      <h2 id="diesel-parafina">El diésel: parafina y frío</h2>
      <p>
        En el diésel, el reto estacional tiene nombre propio:{" "}
        <strong>la parafina</strong>. El gasóleo contiene parafinas (ceras) que a
        temperatura normal van disueltas y no dan ningún problema. Pero cuando la
        temperatura baja lo suficiente, esas parafinas empiezan a{" "}
        <strong>cristalizar</strong>: el combustible se enturbia, se vuelve más
        espeso y, si el frío aprieta, los cristales pueden taponar el filtro de
        combustible y dejar el coche tirado.
      </p>
      <p>
        Para evitarlo, el diésel de invierno se formula con una composición
        distinta y, sobre todo, con <strong>aditivos mejoradores de flujo en
        frío</strong> que retrasan la formación de esos cristales y los mantienen
        pequeños para que pasen por el filtro. El resultado es un gasóleo que
        aguanta temperaturas mucho más bajas sin obstruirse. En zonas y épocas de
        frío extremo existen incluso versiones tipo «ártico» con una resistencia
        todavía mayor.
      </p>
      <p>
        La buena noticia es que en España no tienes que pedir nada especial: las
        estaciones suministran el gasóleo adaptado a la temporada y a la zona de
        forma automática. Repostando con normalidad ya recibes el adecuado.
        Profundizamos en este punto, y en cuándo merece la pena un aditivo, en la
        guía de{" "}
        <Link href="/guias/diesel-invierno-anticongelante">diésel de invierno y
        anticongelante</Link>.
      </p>

      <CompareTable
        caption="Combustible de invierno vs verano (datos típicos en España, 2026)"
        headers={["Aspecto", "Verano", "Invierno"]}
        rows={[
          ["Gasolina — volatilidad (RVP)", "Más baja (no se evapora de más)", "Más alta (arranca en frío)"],
          ["Diésel — riesgo principal", "Ninguno relevante por temperatura", "Cristalización de parafinas"],
          ["Diésel — aditivos", "Estándar", "Mejoradores de flujo en frío"],
          ["Octanaje gasolina", "Igual (95 / 98)", "Igual (95 / 98)"],
          ["Qué tienes que hacer", "Nada", "Nada en condiciones normales"],
        ]}
      />

      <h2 id="lo-notas-conduciendo">¿Lo notas al conducir?</h2>
      <p>
        En la práctica, no. El ajuste estacional está pensado precisamente para
        que el coche funcione igual de bien en cualquier época, así que en
        condiciones normales no percibes ningún cambio al volante por culpa de la
        formulación del combustible.
      </p>
      <p>
        Lo que sí puedes notar en invierno son los efectos del{" "}
        <strong>frío en general</strong>, que la gente a veces atribuye al
        combustible pero tienen otras causas: el motor tarda más en alcanzar
        temperatura, el ralentí va algo más alto los primeros minutos, las marchas
        entran más duras con el aceite frío y el coche «pide» más al arrancar.
        Nada de eso es la gasolina ni el diésel: es la física del frío.
      </p>
      <p>
        El único escenario en el que el combustible estacional importa de verdad
        es uno límite: un diésel de verano metido en el depósito de un vehículo o
        una máquina que lleva mucho tiempo parado y al que de pronto le caen
        heladas fuertes. Ahí sí puede aparecer la parafina. Para el uso diario
        normal, repostando cada pocas semanas, esto no llega a darse.
      </p>

      <h2 id="implica-consumo">Qué implica para el consumo</h2>
      <p>
        Mucha gente nota que el coche gasta más en invierno y lo achaca al
        «combustible de invierno». La realidad es que el carburante en sí apenas
        influye en el consumo; lo que dispara el gasto en frío es todo lo que
        rodea a la conducción invernal:
      </p>
      <ul>
        <li>
          <strong>Arranques en frío</strong>: el motor y el aceite fríos crean más
          rozamiento y la centralita enriquece la mezcla los primeros minutos.
        </li>
        <li>
          <strong>Climatización</strong>: la calefacción y el desempañado tiran de
          consumo, igual que el aire acondicionado lo hace en verano (lo vemos en{" "}
          <Link href="/guias/aire-acondicionado-consumo">aire acondicionado y
          consumo</Link>).
        </li>
        <li>
          <strong>Neumáticos</strong>: con el frío baja la presión y aumenta la
          resistencia a la rodadura; revisar la presión ayuda más de lo que parece.
        </li>
        <li>
          <strong>Aire más denso</strong> y trayectos cortos que no dan tiempo a
          calentar el motor terminan de redondear el gasto extra.
        </li>
      </ul>
      <p>
        Sumado, todo esto puede traducirse en un consumo algo mayor en los meses
        fríos, pero la parte atribuible a la fórmula estacional del combustible es
        mínima. Si te preocupa el gasto, la palanca real es la conducción: tienes
        ideas concretas en{" "}
        <Link href="/guias/conducir-ahorrar-combustible">cómo conducir para
        ahorrar combustible</Link>. Y, por supuesto, dónde repostas: el precio por
        litro entre una estación y otra suele pesar mucho más en tu bolsillo que
        cualquier matiz de la mezcla.
      </p>

      <AppCta
        title="El combustible cambia con la estación; el precio, con la gasolinera"
        body="La formulación la ajusta la petrolera por ti, pero el precio lo eliges tú. En Carburantes ves los datos oficiales del Ministerio actualizados y comparas la estación más barata cerca de ti o en tu ruta."
        href="/"
        linkLabel="Comparar precios cerca"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/diesel-invierno-anticongelante", label: "Diésel de invierno" },
          { href: "/guias/como-se-forma-precio-gasolina", label: "Cómo se forma el precio" },
          { href: "/guias/tipos-de-combustible-guia-completa", label: "Tipos de combustible" },
        ]}
      />
    </>
  );
}

export default guide;
