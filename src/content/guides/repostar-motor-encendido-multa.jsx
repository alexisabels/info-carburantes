import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "repostar-motor-encendido-multa";
const title = "Repostar con el motor encendido: ¿multa y peligro real?";
const description =
  "¿Es ilegal repostar con el motor en marcha o usar el móvil en la gasolinera? Te explicamos qué dice la normativa, el riesgo real y las buenas prácticas.";

const guide = {
  slug,
  title,
  seoTitle: "Repostar con el motor encendido · Guía",
  description,
  category: "normativa",
  datePublished: "2026-05-29",
  dateModified: "2026-05-29",
  readingMinutes: 5,
  keywords: [
    "repostar motor encendido multa",
    "usar móvil gasolinera",
    "repostar con el coche encendido",
    "normas seguridad gasolinera",
  ],
  mentions: [
    { "@type": "Thing", name: "Seguridad" },
    { "@type": "Thing", name: "Vapores" },
  ],
  faq: [
    {
      q: "¿Me pueden multar por repostar con el motor encendido?",
      a: "No existe en España una multa específica de tráfico con un importe fijo por repostar con el motor en marcha. Sin embargo, las estaciones de servicio se rigen por normativa de prevención de incendios y por sus propias condiciones de uso, que obligan a apagar el motor. Si te niegas, el personal puede negarse a suministrarte y, en caso de incidente, la responsabilidad recae sobre ti. Además, hay infracciones generales como conducir usando el móvil que sí están sancionadas. La normativa puede variar entre comunidades y por ordenanzas locales, así que confirma con la propia estación o la fuente oficial si tienes dudas.",
    },
    {
      q: "¿De verdad el móvil es peligroso al repostar?",
      a: "El riesgo de que un móvil provoque una explosión por sí solo es prácticamente nulo: no hay casos confirmados de incendios en gasolineras causados por la radiofrecuencia de un teléfono. El motivo real para no usarlo es doble: distrae de una tarea que requiere atención y, en teoría, una chispa por electricidad estática al manipular el aparato podría inflamar vapores en condiciones muy concretas. La recomendación de guardarlo es de prudencia y atención, no porque las ondas del móvil enciendan la gasolina.",
    },
    {
      q: "¿Por qué hay que apagar el motor?",
      a: "Por seguridad. Con el motor en marcha hay componentes calientes (escape, colector) y sistemas eléctricos activos que, en presencia de vapores de gasolina, suponen una fuente de ignición innecesaria. Apagar el motor elimina esa fuente, reduce el riesgo en caso de derrame y es además una exigencia habitual de las normas de la estación. Es una medida de prevención sencilla y eficaz que apenas cuesta unos segundos.",
    },
    {
      q: "¿Qué pasa si fumo en la gasolinera?",
      a: "Fumar está terminantemente prohibido en toda la zona de surtidores y suele estar señalizado. Una brasa encendida sí es una fuente de ignición real y suficiente para inflamar los vapores de combustible, que son inflamables incluso a temperatura ambiente. El personal puede expulsarte de la instalación y negarte el servicio, y en caso de incidente la responsabilidad sería tuya. No enciendas cigarrillos, mecheros ni cerillas en ningún punto de la pista.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Repostar con el motor encendido no tiene en España una{" "}
        <strong>multa de tráfico específica con importe fijo</strong>, pero sí
        infringe las normas de seguridad de las estaciones de servicio, que
        obligan a apagarlo. El motivo no es burocrático: el motor en marcha es
        una fuente de calor y electricidad cerca de vapores inflamables. Apagarlo
        cuesta segundos y elimina un riesgo innecesario.
      </Answer>

      <Tldr
        items={[
          "No hay una sanción de tráfico concreta por dejar el motor en marcha, pero la estación puede negarte el servicio y la responsabilidad es tuya.",
          "Apagar el motor elimina una fuente de ignición (calor y electricidad) junto a vapores inflamables.",
          "El móvil no enciende la gasolina por sus ondas: el riesgo real es la distracción y, en teoría, la electricidad estática.",
          "Fumar sí es un peligro real y está prohibido en toda la pista.",
          "Las normas pueden variar por estación y comunidad; ante la duda, confirma en la fuente oficial.",
        ]}
      />

      <h2 id="es-ilegal-motor-encendido">
        ¿Es ilegal repostar con el motor encendido?
      </h2>
      <p>
        No existe en España una multa de tráfico específica, con un importe
        cerrado, por repostar con el motor en marcha. Lo que sí hay es normativa
        de prevención de incendios y las propias condiciones de uso de cada
        estación, que obligan a apagar el motor mientras se llena el depósito.
      </p>
      <p>
        La diferencia es importante. Una norma de circulación (como saltarse un
        semáforo) la sanciona la DGT con un importe tasado. En cambio, repostar
        es una actividad que ocurre dentro de una instalación privada con sus
        propias reglas de seguridad, derivadas de normativa industrial y de
        prevención. En la práctica esto significa que:
      </p>
      <ul>
        <li>
          El personal de la estación puede pedirte que apagues el motor y,
          si te niegas, <strong>negarse a suministrarte combustible</strong>.
        </li>
        <li>
          Si se produce un incidente (un derrame que se inflama, un conato de
          incendio) por no haber seguido las normas, la{" "}
          <strong>responsabilidad recae sobre ti</strong>.
        </li>
        <li>
          Algunas conductas asociadas sí están sancionadas por tráfico de forma
          general, como manipular el móvil de forma que afecte a la conducción
          o tener el vehículo de manera que genere riesgo.
        </li>
      </ul>
      <p>
        Conviene matizar que la normativa de seguridad de las instalaciones de
        suministro puede cambiar con el tiempo y que las ordenanzas locales o
        autonómicas pueden añadir matices. Si necesitas una respuesta cerrada
        para un caso concreto, lo más fiable es preguntar en la propia estación
        o consultar la fuente oficial. La idea de fondo, en cualquier caso, no
        es el miedo a la multa: es que apagar el motor es la práctica segura y
        razonable.
      </p>

      <Callout type="info" title="Norma práctica">
        En la mayoría de estaciones verás un pictograma que indica apagar el
        motor, no fumar y no usar el móvil. Esas señales recogen las normas de
        la instalación: incumplirlas habilita al personal a no servirte, aunque
        no veas a un agente con un talonario de multas.
      </Callout>

      <h2 id="riesgo-vapores">El riesgo real de los vapores</h2>
      <p>
        El peligro auténtico al repostar no es el líquido, sino los{" "}
        <strong>vapores</strong>. La gasolina se evapora con facilidad incluso a
        temperatura ambiente, y esos vapores —más pesados que el aire— se
        acumulan alrededor de la boca del depósito y a ras de suelo. Son
        inflamables: basta una fuente de ignición suficiente para que prendan.
      </p>
      <p>
        Un motor en marcha aporta justo eso, fuentes de ignición que no hacen
        ninguna falta mientras llenas el depósito:
      </p>
      <ul>
        <li>
          <strong>Calor</strong>: el sistema de escape y el colector pueden
          alcanzar temperaturas muy altas. Un escape caliente cerca de vapores y
          de un posible goteo es un riesgo evitable.
        </li>
        <li>
          <strong>Electricidad</strong>: el sistema eléctrico del coche está
          activo, con corriente circulando. Cualquier chispa accidental es una
          fuente potencial de ignición.
        </li>
        <li>
          <strong>Movimiento involuntario</strong>: con el motor encendido es
          más fácil que el coche se mueva por un descuido con la marcha o el
          embrague, tirando de la manguera.
        </li>
      </ul>
      <p>
        El diésel es bastante menos volátil que la gasolina y sus vapores
        prenden con mucha más dificultad, pero la norma de apagar el motor se
        aplica igual: la pista es un espacio compartido y la regla es la misma
        para todos. Si te interesa hacerlo todo bien de principio a fin, en{" "}
        <Link href="/guias/repostar-correctamente-pasos">
          nuestra guía de cómo repostar paso a paso
        </Link>{" "}
        repasamos la secuencia completa, incluido el orden correcto de apagar el
        motor y manejar la manguera.
      </p>

      <h2 id="mito-movil">El mito del móvil en la gasolinera</h2>
      <p>
        El móvil no enciende la gasolina por sus ondas: no hay ningún caso
        confirmado de incendio en una estación provocado por la radiofrecuencia
        de un teléfono. La famosa prohibición tiene una explicación más sensata
        que la del peligro de las antenas.
      </p>
      <p>
        El motivo real para no usarlo es doble. Primero, la{" "}
        <strong>distracción</strong>: repostar es una tarea breve que conviene
        hacer con atención —vigilar el surtidor, evitar derrames, no dejar la
        manguera mal colocada—, y mirar el móvil te despista. Segundo, de forma
        teórica, manipular un aparato podría generar una pequeña descarga de{" "}
        <strong>electricidad estática</strong> que, en condiciones muy concretas,
        actuara como chispa cerca de los vapores. Ese mismo razonamiento explica
        por qué se recomienda no volver a sentarse y levantarse del coche mientras
        repostas en días secos.
      </p>
      <p>
        Dicho de otro modo: el problema no son las llamadas ni los datos, es que
        un teléfono te distrae y que cualquier chispa cerca de vapores
        inflamables es indeseable. La recomendación de guardarlo es de prudencia,
        no porque las ondas prendan el combustible.
      </p>

      <CompareTable
        caption="Riesgos en la gasolinera: percepción frente a realidad (orientativo, 2026)"
        headers={["Conducta", "¿Peligro real?", "Por qué"]}
        rows={[
          [
            "Motor encendido",
            "Sí, evitable",
            "Aporta calor y electricidad cerca de vapores",
          ],
          [
            "Usar el móvil",
            "Bajo / indirecto",
            "Distrae; chispa por estática solo en teoría",
          ],
          [
            "Fumar",
            "Sí, alto",
            "La brasa es una fuente de ignición real",
          ],
          [
            "Repostar en bidón sin homologar",
            "Sí",
            "Carga estática y recipientes inadecuados",
          ],
          [
            "Llenar de más hasta que rebosa",
            "Sí, evitable",
            "Derrame de combustible inflamable en la pista",
          ],
        ]}
      />

      <h2 id="normas-estacion">Qué dicen las normas de la estación</h2>
      <p>
        Cada estación de servicio funciona como una instalación con sus propias
        normas de seguridad, recogidas en la cartelería que ves al entrar en la
        pista. Aunque la redacción varíe, el conjunto de reglas es muy
        homogéneo en toda España:
      </p>
      <ul>
        <li>
          <strong>Apaga el motor</strong> antes de empezar a repostar.
        </li>
        <li>
          <strong>No fumes</strong> ni enciendas mecheros o cerillas en ningún
          punto de la zona de surtidores.
        </li>
        <li>
          <strong>No uses el móvil</strong> mientras manipulas la manguera.
        </li>
        <li>
          <strong>No llenes recipientes no homologados</strong>: para el
          combustible solo valen bidones aptos y bien apoyados en el suelo,
          como explicamos en{" "}
          <Link href="/guias/llenar-deposito-de-mas-rebosa">
            la guía sobre llenar de más el depósito
          </Link>
          , donde también vemos por qué no conviene apurar hasta que rebose.
        </li>
        <li>
          <strong>Sigue las indicaciones del personal</strong>: pueden negarse
          a suministrar si no cumples las normas de seguridad.
        </li>
      </ul>
      <p>
        Estas reglas no son un capricho de la marca: responden a normativa de
        prevención de incendios y de seguridad industrial. La consecuencia
        práctica de incumplirlas no es necesariamente una multa de tráfico, sino
        que te puedan dejar sin servicio y que asumas la responsabilidad ante
        cualquier incidente. En las{" "}
        <Link href="/guias/gasolineras-automaticas-como-funcionan">
          gasolineras automáticas
        </Link>{" "}
        las normas son idénticas, con la diferencia de que no hay personal en
        pista: la responsabilidad de seguir el procedimiento recae enteramente
        en ti.
      </p>

      <h2 id="buenas-practicas">Buenas prácticas de seguridad</h2>
      <p>
        La buena noticia es que repostar de forma segura es muy sencillo y no
        cuesta apenas tiempo. Si conviertes en rutina estos gestos, eliminas la
        mayor parte del riesgo:
      </p>
      <ul>
        <li>
          <strong>Apaga el motor</strong> al llegar al surtidor, antes de bajar.
        </li>
        <li>
          <strong>Guarda el móvil</strong> y deja la conversación o el mensaje
          para después; tardas un par de minutos.
        </li>
        <li>
          <strong>Descarga la estática</strong> tocando una parte metálica de la
          carrocería antes de manipular la pistola, especialmente en días secos.
        </li>
        <li>
          <strong>No fumes</strong> y mantén lejos cualquier llama.
        </li>
        <li>
          <strong>No fuerces el llenado</strong> tras el primer corte automático
          de la pistola, para evitar derrames y rebosamientos.
        </li>
        <li>
          <strong>Cierra bien el tapón</strong> y revisa que no haya goteos
          antes de arrancar.
        </li>
      </ul>
      <p>
        Si además quieres que repostar te salga lo más barato posible, la otra
        mitad de la ecuación es elegir bien dónde llenas. Comparar el precio real
        de las estaciones de tu zona puede suponer un ahorro notable a lo largo
        del año, y eso lo decides tú con datos en la mano.
      </p>

      <AppCta
        title="Reposta seguro y al mejor precio"
        body="En Carburantes ves los precios oficiales del Ministerio actualizados. Pulsa «Cerca de mí» o busca por municipio para repostar con calma en la estación más barata de tu zona."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/repostar-correctamente-pasos", label: "Cómo repostar paso a paso" },
          { href: "/guias/llenar-deposito-de-mas-rebosa", label: "Llenar de más el depósito" },
          { href: "/guias/gasolineras-automaticas-como-funcionan", label: "Gasolineras automáticas" },
        ]}
      />
    </>
  );
}

export default guide;
