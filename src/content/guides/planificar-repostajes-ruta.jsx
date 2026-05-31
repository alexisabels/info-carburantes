import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "planificar-repostajes-ruta";
const title = "Cómo planificar los repostajes de una ruta larga";
const description =
  "Evita quedarte sin gasolina y repostar caro en autopista: te enseñamos a planificar las paradas de combustible de un viaje largo según tu autonomía y los precios.";

const guide = {
  slug,
  title,
  seoTitle: "Planificar repostajes en ruta · Guía",
  description,
  category: "viajes",
  datePublished: "2026-05-23",
  dateModified: "2026-05-23",
  readingMinutes: 6,
  keywords: [
    "planificar repostajes ruta",
    "paradas gasolina viaje",
    "autonomía coche viaje",
    "repostar autopista barato",
  ],
  mentions: [
    { "@type": "Thing", name: "Autonomía" },
    { "@type": "Thing", name: "Reserva" },
  ],
  faq: [
    {
      q: "¿Cada cuánto debo repostar en un viaje?",
      a: "La regla práctica es repostar cuando te quede en torno a un cuarto de depósito, sin esperar a que se encienda el testigo de reserva. Si tu autonomía real con el depósito lleno son unos 600 km, eso significa planificar una parada cada 400-450 km aproximadamente. Repostar con margen te permite elegir una gasolinera barata en lugar de la primera que encuentres por necesidad, y deja un colchón por si hay desvíos, retenciones o estaciones cerradas.",
    },
    {
      q: "¿Cuánta autonomía deja la reserva?",
      a: "Depende del coche, pero como referencia típica en España la reserva suele equivaler a entre 5 y 10 litros, es decir, unos 50-100 km a velocidad de autovía. No te fíes de la cifra de autonomía estimada que muestra el ordenador de a bordo cuando ya estás en reserva: ese cálculo se vuelve poco fiable con el depósito casi vacío y puede sobreestimar los kilómetros que te quedan. Trata la reserva como un plan B de emergencia, no como kilómetros que puedes gastar tranquilamente.",
    },
    {
      q: "¿Es más caro repostar en autopista?",
      a: "Por norma general sí. Las estaciones de servicio situadas dentro de autopistas de peaje y en áreas con poca competencia suelen tener precios más altos que las de polígonos, supermercados o travesías de pueblo cercanas. La diferencia puede rondar varios céntimos por litro, lo que en un depósito grande supone unos cuantos euros. La cifra exacta cambia cada día y según la zona, así que la única forma de saberlo es comparar el precio real en la app antes de salir o de desviarte.",
    },
    {
      q: "¿Hay alguna herramienta para planificar?",
      a: "Sí. En Carburantes tienes un planificador de ruta donde introduces origen y destino y te muestra las gasolineras a lo largo del trayecto con su precio oficial actualizado, para que puedas decidir dónde te conviene parar. Combinado con la función Cerca de mí para imprevistos, te permite repostar siempre con criterio en lugar de a ciegas en la primera estación de la autopista.",
    },
  ],
  howTo: {
    name: "Cómo planificar los repostajes de una ruta larga",
    description:
      "Pasos para organizar las paradas de combustible de un viaje largo según tu autonomía real y los precios, evitando quedarte sin gasolina y repostar caro en autopista.",
    totalTime: "PT6M",
    steps: [
      {
        name: "Calcula tu autonomía real",
        text: "Multiplica la capacidad útil del depósito por tu consumo real en carretera para saber cuántos kilómetros aguantas de verdad, no los que promete el fabricante.",
        anchor: "calcula-autonomia-real",
      },
      {
        name: "Marca las paradas según kilómetros",
        text: "Reparte el trayecto en tramos que dejen siempre un cuarto de depósito de margen y fija puntos de repostaje sobre el mapa antes de salir.",
        anchor: "marca-paradas-kilometros",
      },
      {
        name: "Evita repostar en autopista a ciegas",
        text: "Compara el precio de las estaciones del recorrido y prioriza las más baratas fuera del peaje, valorando si compensa un pequeño desvío.",
        anchor: "evita-autopista-a-ciegas",
      },
      {
        name: "Ten un plan B con la reserva",
        text: "Conoce cuántos kilómetros te da la reserva de tu coche y úsala solo como emergencia, no como kilómetros disponibles.",
        anchor: "plan-b-reserva",
      },
      {
        name: "Usa el planificador de ruta",
        text: "Introduce origen y destino en el planificador para ver las gasolineras del trayecto con su precio oficial y decidir dónde parar.",
        anchor: "usa-planificador-ruta",
      },
    ],
  },
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Planificar los repostajes de un viaje largo se reduce a tres cosas:
        saber tu <strong>autonomía real</strong> (kilómetros que aguantas con
        un depósito, no los que promete el fabricante), marcar las paradas
        dejando siempre un cuarto de depósito de margen y comparar precios
        antes de parar para no repostar caro en la primera estación de la
        autopista. Con esos tres datos eliges dónde y cuándo paras tú, en
        lugar de hacerlo por necesidad.
      </Answer>

      <Tldr
        items={[
          "Calcula tu autonomía real: depósito útil × consumo real, no la cifra del catálogo.",
          "Repostar con un cuarto de depósito de margen, sin esperar a la reserva.",
          "La autopista de peaje suele ser de las opciones más caras: compara antes de parar.",
          "La reserva da en torno a 50-100 km típicos: es un plan B, no kilómetros que gastar.",
          "Usa el planificador de ruta para ver precios oficiales a lo largo del trayecto.",
        ]}
      />

      <h2 id="calcula-autonomia-real">Calcula tu autonomía real</h2>
      <p>
        La autonomía que de verdad importa no es la que aparece en la ficha
        del coche, sino la que consigues tú en tu viaje real, cargado de
        maletas y a velocidad de autovía. Calcularla es sencillo: multiplica
        la <strong>capacidad útil del depósito</strong> por tu{" "}
        <strong>consumo real</strong> en carretera.
      </p>
      <ul>
        <li>
          <strong>Capacidad útil</strong>: no toda la capacidad nominal es
          aprovechable. Si tu depósito es de 55 litros, cuenta con unos 50
          litros usables hasta tocar la reserva. El resto es el colchón de
          seguridad que no deberías gastar.
        </li>
        <li>
          <strong>Consumo real</strong>: mira el consumo medio que marca el
          ordenador de a bordo tras un trayecto largo por autovía, o calcúlalo
          a mano con dos llenos completos y los kilómetros recorridos entre
          ellos. En carretera suele ser bastante estable.
        </li>
      </ul>
      <p>
        Un ejemplo típico: 50 litros usables a un consumo de 6,5 L/100 km dan
        una autonomía real de unos 770 km; el mismo coche a 8 L/100 km (más
        cargado, con aire acondicionado y a buen ritmo) baja a unos 625 km. La
        diferencia es grande, y por eso conviene partir de tu cifra real y no
        de la del catálogo. Si quieres reducir ese consumo en viaje, en{" "}
        <Link href="/guias/velocidad-consumo-autovia">esta guía vemos cuánto
        influye la velocidad en autovía</Link> sobre el gasto de combustible.
      </p>
      <p>
        Ten en cuenta que el consumo en viaje casi nunca coincide con tu media
        habitual de ciudad. Con el coche cargado de equipaje y pasajeros, una
        baca o un cofre en el techo, el aire acondicionado a tope en verano y un
        ritmo sostenido de autovía, es normal que el gasto suba un buen tramo
        respecto a tu dato urbano. Por eso, si vas a calcular tu autonomía para
        un viaje concreto, parte siempre del consumo en las condiciones del
        viaje, no de la cifra optimista del día a día.
      </p>

      <Callout type="note" title="No apures la cifra al máximo">
        Calcula tu autonomía real, pero planifica siempre con margen. El viento
        en contra, una autovía de montaña, un portaequipajes en el techo o ir
        muy cargado pueden disparar el consumo y recortar varios kilómetros tu
        alcance. Mejor que sobre depósito a que falte gasolinera.
      </Callout>

      <h2 id="marca-paradas-kilometros">Marca las paradas según kilómetros</h2>
      <p>
        Una vez sabes cuántos kilómetros aguantas, reparte el trayecto en
        tramos que dejen un colchón cómodo. La regla práctica es{" "}
        <strong>repostar cuando te quede en torno a un cuarto de depósito</strong>,
        sin esperar al testigo de reserva. Si tu autonomía real son unos 600
        km, eso significa una parada cada 400-450 km aproximadamente.
      </p>
      <p>
        Repostar con ese margen tiene dos ventajas claras:
      </p>
      <ul>
        <li>
          <strong>Eliges, no improvisas</strong>: con un cuarto de depósito
          tienes 100-150 km para encontrar una estación barata, en lugar de
          tener que entrar en la primera que veas porque vas justo.
        </li>
        <li>
          <strong>Absorbes imprevistos</strong>: desvíos por obras, retenciones
          largas, una estación cerrada de noche o una zona rural con pocas
          gasolineras. El margen es tu seguro.
        </li>
      </ul>
      <p>
        Antes de salir, abre el mapa y sitúa mentalmente (o sobre el
        planificador) dónde caerán esas paradas. En una ruta de 700 km, por
        ejemplo, lo lógico es planear un repostaje hacia la mitad del trayecto
        en una zona con varias gasolineras donde puedas elegir la más barata.
        Si dudas entre llenar del todo o solo medio depósito en cada parada, lo
        analizamos en{" "}
        <Link href="/guias/lleno-o-medio-deposito">lleno o medio depósito</Link>.
      </p>

      <h2 id="evita-autopista-a-ciegas">Evita repostar en autopista a ciegas</h2>
      <p>
        El error más caro de un viaje largo es repostar sin mirar el precio en
        la primera estación de servicio de la autopista de peaje, simplemente
        porque vas justo de combustible. Las estaciones dentro de autopistas de
        peaje y en áreas con poca competencia suelen estar entre las más caras,
        porque saben que el conductor que ya está dentro tiene pocas
        alternativas.
      </p>
      <p>
        La diferencia respecto a una gasolinera de polígono, supermercado o
        travesía cercana puede ser de varios céntimos por litro. No es una
        cifra fija ni un dato oficial: cambia cada día y según la zona, así que
        la única forma fiable de saberlo es{" "}
        <strong>comparar el precio real antes de parar</strong>. A veces
        compensa aguantar 20 km más hasta una salida con estaciones más
        baratas; otras veces el desvío no merece la pena. Para decidirlo con
        números, mira{" "}
        <Link href="/guias/merece-la-pena-desviarse-repostar">cuándo merece la
        pena desviarse para repostar</Link>.
      </p>

      <CompareTable
        caption="Dónde repostar en un viaje largo (datos típicos en España, 2026)"
        headers={["Tipo de estación", "Precio relativo", "Cuándo te conviene"]}
        rows={[
          ["Autopista de peaje", "Suele ser el más caro", "Solo si vas muy justo de reserva"],
          ["Área de autovía gratuita", "Variable, a veces alto", "Si no hay alternativa cerca de la salida"],
          ["Polígono / travesía de pueblo", "Suele ser más barato", "Cuando puedes desviarte 2-5 km"],
          ["Low cost / supermercado", "Habitualmente de los más baratos", "Si está en tu ruta o cerca de una salida"],
        ]}
      />
      <p>
        La tabla es orientativa: el orden real de precios cambia de un día a
        otro y de una provincia a otra. Por eso conviene comprobar el dato
        concreto en la app en lugar de fiarte de la regla general. Si te
        interesan las opciones más económicas, tienes una guía dedicada a las{" "}
        <Link href="/guias/gasolineras-low-cost">gasolineras low cost</Link> y
        sus diferencias con las de marca.
      </p>

      <h2 id="plan-b-reserva">Ten un plan B (la reserva)</h2>
      <p>
        La reserva es ese colchón final que se activa cuando se enciende el
        testigo del surtidor en el cuadro. Conviene saber cuántos kilómetros te
        da realmente, pero tratarla como una emergencia, no como kilómetros que
        puedes gastar a propósito.
      </p>
      <ul>
        <li>
          <strong>Cuánto da</strong>: como referencia típica, la reserva suele
          equivaler a entre 5 y 10 litros, es decir, unos 50-100 km a velocidad
          de autovía. Varía mucho según el modelo, así que consulta el manual
          de tu coche para tu cifra concreta.
        </li>
        <li>
          <strong>Cuidado con la autonomía estimada</strong>: el número de
          kilómetros restantes que muestra el ordenador de a bordo se vuelve
          poco fiable con el depósito casi vacío y tiende a sobreestimar. No
          conduzcas «al límite» fiándote de esa cifra.
        </li>
        <li>
          <strong>Qué hacer si entras en reserva lejos de todo</strong>: baja
          el ritmo a unos 90-100 km/h, apaga el aire acondicionado, evita
          acelerones y busca la salida más cercana con gasolinera. Conducir
          suave estira los kilómetros disponibles.
        </li>
      </ul>

      <Callout type="warn" title="No aproveches la reserva como kilómetros extra">
        Llegar a la reserva en un viaje largo significa que la planificación se
        ha quedado corta. Apurar hasta el último litro en zonas con pocas
        estaciones, de noche o en festivos es arriesgado: puedes encontrarte
        gasolineras cerradas o áreas sin servicio. Reposta con un cuarto de
        depósito y deja la reserva intacta como verdadero plan B.
      </Callout>

      <h2 id="usa-planificador-ruta">Usa el planificador de ruta</h2>
      <p>
        Hacer todo esto a mano funciona, pero la forma rápida y precisa es usar
        el planificador de ruta. Introduces origen y destino y te muestra las
        gasolineras a lo largo del trayecto con su <strong>precio oficial
        actualizado</strong> (los mismos datos del Ministerio que ves en el
        resto de la app), para que decidas dónde te conviene parar antes de
        salir de casa.
      </p>
      <p>
        Con esa información montas un plan sencillo: marcas una o dos paradas en
        zonas con varias gasolineras baratas, dejando un cuarto de depósito de
        margen entre ellas. Y para los imprevistos sobre la marcha, la función{" "}
        <strong>Cerca de mí</strong> te enseña al instante las estaciones más
        baratas alrededor de tu posición, sin tener que entrar a ciegas en la
        primera de la autopista.
      </p>
      <p>
        En la práctica, planificar así convierte el repostaje en una decisión
        tuya y no del azar: sabes cuántos kilómetros aguantas, dónde vas a
        parar y qué precio vas a pagar antes de arrancar. Eso evita los dos
        sustos clásicos del viaje largo, quedarte corto de combustible en una
        zona sin estaciones y pagar de más por entrar en la primera de la
        autopista. Dedica cinco minutos a mirarlo antes de salir y ahorrarás
        tanto en tranquilidad como en euros.
      </p>

      <AppCta
        title="Planifica las paradas de tu próximo viaje"
        body="Introduce origen y destino y Carburantes te muestra las gasolineras del trayecto con su precio oficial, actualizado cada media hora desde los datos del Ministerio. Elige dónde parar antes de salir."
        href="/ruta"
        linkLabel="Planificar mi ruta"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/ahorrar-combustible-viaje-largo", label: "Ahorrar en viajes largos" },
          { href: "/guias/repostar-portugal-francia-andorra", label: "Repostar en Portugal, Francia o Andorra" },
          { href: "/guias/gasolineras-24-horas", label: "Gasolineras 24 horas" },
        ]}
      />
    </>
  );
}

export default guide;
