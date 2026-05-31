import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "por-que-sube-baja-precio-gasolina";
const title = "Por qué sube y baja el precio de la gasolina";
const description =
  "Brent, euro-dólar, refino, impuestos y márgenes: te explicamos por qué el precio de la gasolina y el diésel cambia casi cada día y qué lo mueve.";

const guide = {
  slug,
  title,
  seoTitle: "Por qué sube y baja la gasolina · Guía Carburantes",
  description,
  category: "mercado",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",
  readingMinutes: 7,
  keywords: [
    "por qué sube la gasolina",
    "por qué baja el precio del combustible",
    "brent gasolina",
    "precio gasolina euro dólar",
  ],
  mentions: [
    { "@type": "Thing", name: "Brent" },
    { "@type": "Thing", name: "Euro" },
    { "@type": "Thing", name: "Dólar" },
  ],
  faq: [
    {
      q: "¿Por qué la gasolina sube rápido y baja lento?",
      a: "Es el llamado efecto cohete y pluma: cuando el crudo sube, las estaciones repercuten la subida casi de inmediato para no vender con pérdidas el combustible que tendrán que reponer más caro; cuando el crudo baja, tienden a bajar más despacio porque aún tienen en los depósitos producto que compraron caro y porque la competencia local no les obliga a hacerlo más rápido. No es una conspiración: responde a la gestión del inventario, al desfase entre la compra mayorista y la venta al público, y a la presión competitiva de la zona. En sitios con muchas gasolineras compitiendo, la bajada llega antes.",
    },
    {
      q: "¿Qué es el Brent?",
      a: "El Brent es el petróleo crudo de referencia en Europa, extraído originalmente del mar del Norte. Su precio se fija en los mercados internacionales y se cotiza en dólares por barril (cada barril son unos 159 litros). Es la referencia que usan refinerías, comercializadoras y analistas en España y casi toda Europa para saber cuánto cuesta la materia prima. Cuando oyes en las noticias que el barril de Brent sube o baja, es la pista más directa de hacia dónde irá el precio de la gasolina y el diésel unos días después.",
    },
    {
      q: "¿Cómo afecta el euro-dólar?",
      a: "El petróleo se compra en dólares en el mercado internacional, pero tú pagas en euros. Por eso el precio final depende de dos cosas a la vez: cuánto cuesta el barril en dólares y a cuánto está el cambio euro-dólar. Si el euro se debilita frente al dólar, cada barril te sale más caro en euros aunque su precio en dólares no haya cambiado. Y al revés: un euro fuerte abarata las importaciones de crudo y suele aliviar el precio en el surtidor. Es un factor que mucha gente ignora, pero puede mover el precio tanto como el propio Brent.",
    },
    {
      q: "¿Cuándo conviene repostar si va a bajar?",
      a: "Nadie puede predecir el precio con exactitud, así que la mejor estrategia no es adivinar sino comparar. Si el crudo lleva varios días cayendo, es razonable repostar lo justo y esperar unos días a que la bajada llegue al surtidor antes de hacer el lleno grande. Si el crudo sube con fuerza, conviene llenar antes de que la subida se traslade al precio. En el día a día, el ahorro más fiable no viene de acertar el momento, sino de comparar el precio real entre gasolineras cercanas: la diferencia entre la más cara y la más barata de tu zona suele superar con creces cualquier oscilación diaria del mercado.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        El precio de la gasolina y el diésel cambia casi cada día porque
        depende sobre todo del <strong>precio del crudo (Brent)</strong> y del
        <strong> cambio euro-dólar</strong>, dos cosas que se mueven en
        mercados internacionales en tiempo real. A eso se suma el coste de
        refino, el transporte, los impuestos (que en España son la mitad larga
        del recibo) y el margen de cada estación. Sube rápido y baja lento por
        el modo en que las gasolineras gestionan sus depósitos y la competencia
        de la zona — y por eso comparar precios cerca de ti ahorra más que
        intentar adivinar el mercado.
      </Answer>

      <Tldr
        items={[
          "El Brent (crudo de referencia en Europa) es el factor que más manda en el precio.",
          "El petróleo se paga en dólares: si el euro se debilita, repostas más caro aunque el barril no se mueva.",
          "Sube rápido y baja lento (efecto cohete y pluma) por el inventario y la competencia local.",
          "Impuestos y margen son la parte fija; el crudo y el cambio son la parte que oscila a diario.",
          "Comparar gasolineras cercanas ahorra más que acertar el día perfecto para repostar.",
        ]}
      />

      <h2 id="el-crudo-brent-manda">El precio del crudo (Brent) manda</h2>
      <p>
        La materia prima de la gasolina y el diésel es el petróleo, y en Europa
        la referencia es el <strong>Brent</strong>: el crudo del mar del Norte
        cuyo precio se cotiza en dólares por barril en los mercados
        internacionales. Cuando el barril sube, el combustible que las
        refinerías y comercializadoras tendrán que reponer cuesta más, y esa
        subida termina llegando al surtidor. Cuando baja, ocurre lo contrario,
        aunque con cierto retraso (lo vemos más abajo).
      </p>
      <p>
        El Brent se mueve por motivos geopolíticos y económicos: decisiones de
        la OPEP sobre cuánto petróleo bombear, conflictos en zonas
        productoras, datos de demanda mundial, niveles de reservas en Estados
        Unidos o expectativas sobre la economía. Todo eso hace que el barril
        oscile a diario, a veces con saltos bruscos. No tienes que seguirlo de
        cerca, pero conviene saber que cuando en las noticias dicen «el Brent
        repunta», el surtidor suele notarlo unos días después.
      </p>
      <p>
        Importante: el precio del crudo es solo una parte del recibo. De cada
        litro que pagas, la materia prima viene a ser <em>en torno a</em> un
        tercio; el resto lo componen el refino, la logística, los impuestos y
        el margen. Lo desglosamos en detalle en la guía de{" "}
        <Link href="/guias/como-se-forma-precio-gasolina">cómo se forma el
        precio de la gasolina</Link>.
      </p>

      <h2 id="efecto-euro-dolar">El efecto euro-dólar</h2>
      <p>
        Aquí está el factor que mucha gente pasa por alto. El petróleo se compra
        en <strong>dólares</strong> en el mercado internacional, pero tú repostas
        y pagas en <strong>euros</strong>. Eso significa que el precio final
        depende de dos variables que se multiplican:
      </p>
      <ul>
        <li>
          <strong>El precio del barril en dólares</strong> (lo que cuesta el
          crudo en el mercado).
        </li>
        <li>
          <strong>El tipo de cambio euro-dólar</strong> (cuántos dólares te dan
          por cada euro).
        </li>
      </ul>
      <p>
        Si el euro se debilita frente al dólar, cada barril te cuesta más euros
        aunque su precio en dólares no haya variado ni un céntimo. Y al revés:
        un euro fuerte abarata las importaciones de crudo y suele aliviar el
        precio en el surtidor. Por eso a veces ves que el Brent baja un poco en
        las noticias pero el gasóleo no termina de bajar: probablemente el euro
        se ha debilitado a la vez y ha compensado la caída.
      </p>
      <Callout type="info" title="Dos palancas, no una">
        Piensa en el precio del crudo en euros como el resultado de dos
        palancas que se mueven a la vez. Pueden empujar en la misma dirección
        (Brent al alza y euro débil: subida fuerte) o cancelarse entre sí (Brent
        a la baja pero euro débil: el precio casi no se mueve). Por eso seguir
        solo el barril en dólares a veces despista.
      </Callout>

      <h2 id="por-que-baja-mas-lento">El desfase: por qué baja más lento de lo que sube</h2>
      <p>
        Es la queja más repetida en cualquier conversación sobre carburantes:
        «cuando sube el petróleo, lo suben al día siguiente; cuando baja, tardan
        semanas». Tiene nombre técnico, el <strong>efecto cohete y pluma</strong>
        {" "}(<em>rockets and feathers</em>), y está bien documentado en estudios
        económicos de medio mundo. Las causas reales son varias y ninguna
        requiere una conspiración:
      </p>
      <ul>
        <li>
          <strong>Gestión del inventario.</strong> Una estación vende el
          combustible que ya tiene en los depósitos, comprado días atrás. Si el
          crudo sube, repercute la subida rápido para no vender con pérdidas lo
          que tendrá que reponer más caro. Si el crudo baja, todavía tiene
          producto comprado caro y tiende a apurarlo antes de bajar el precio.
        </li>
        <li>
          <strong>Asimetría competitiva.</strong> Cuando los costes suben,
          todas las estaciones suben casi a la vez (nadie quiere vender
          perdiendo). Cuando bajan, cada una espera a ver si la vecina baja
          primero, y la bajada se traslada más despacio.
        </li>
        <li>
          <strong>Densidad de competencia.</strong> En zonas con muchas
          gasolineras compitiendo, la bajada llega antes porque alguien tiene
          incentivo para ganar clientes recortando precio. En carreteras
          aisladas o pueblos con una sola estación, el desfase se nota mucho
          más.
        </li>
      </ul>
      <p>
        Hay además un desfase puramente temporal que no tiene nada que ver con
        la mala fe. Entre que el crudo se compra en el mercado, llega a la
        refinería, se convierte en gasolina o diésel, se transporta a los
        depósitos y por fin se vende en el surtidor, pasan días o incluso
        semanas. El precio que pagas hoy refleja, en buena medida, lo que
        costaba la materia prima cuando ese combustible entró en la cadena, no
        lo que marca el Brent en la pantalla esta mañana. Por eso cualquier
        movimiento del mercado tarda en notarse, tanto si sube como si baja, y
        por eso comparar el cierre del barril de un día con el precio del
        surtidor de ese mismo día casi nunca cuadra.
      </p>
      <p>
        La consecuencia práctica para ti es clara: el precio del día concreto
        en tu gasolinera depende tanto del mercado como de la competencia que
        tenga al lado. Por eso dos estaciones a pocos kilómetros pueden tener
        precios muy distintos el mismo día.
      </p>

      <h2 id="impuestos-y-margen">Impuestos y margen</h2>
      <p>
        Hasta aquí hemos hablado de la parte que oscila a diario. Pero buena
        parte del recibo es <strong>fija</strong> y explica por qué el precio
        nunca baja tanto como esperarías cuando el crudo se desploma.
      </p>
      <ul>
        <li>
          <strong>Impuestos.</strong> En España, los impuestos (Impuesto
          Especial de Hidrocarburos más el IVA, que se aplica también sobre ese
          impuesto especial) suelen suponer <em>en torno a</em> la mitad o más
          de lo que pagas por litro. Es una parte que casi no se mueve con el
          mercado: aunque el crudo caiga a la mitad, los impuestos siguen ahí.
          Lo detallamos en la guía de{" "}
          <Link href="/guias/impuestos-gasolina-espana">impuestos de la
          gasolina en España</Link>.
        </li>
        <li>
          <strong>Refino y logística.</strong> Convertir el crudo en gasolina o
          diésel, almacenarlo y transportarlo hasta cada estación tiene un coste
          que cambia poco de un día para otro.
        </li>
        <li>
          <strong>Margen de la estación.</strong> Es lo que se queda la
          gasolinera para cubrir personal, mantenimiento y beneficio. Suele ser
          una parte pequeña del precio total, y es donde más se aprecian las
          diferencias entre una estación de marca y una low cost.
        </li>
      </ul>
      <p>
        Como la mayor parte del precio es fija (impuestos y costes), las
        oscilaciones del crudo se «diluyen» al llegar al surtidor: una caída del
        10 % en el barril no se traduce en una caída del 10 % en lo que pagas,
        porque sobre la mitad del precio (los impuestos) no tiene ningún efecto.
      </p>
      <p>
        Este es también el motivo por el que el precio de la gasolina y el del
        diésel no siempre se mueven al unísono. Aunque ambos salen del mismo
        crudo, se refinan por procesos distintos y soportan una carga fiscal
        que no tiene por qué ser idéntica, de modo que la demanda estacional
        —más gasóleo de calefacción y transporte en invierno, más gasolina en
        los meses de vacaciones— puede empujar uno hacia arriba mientras el
        otro se mantiene plano. Si alguna vez te ha extrañado que el diésel
        cueste casi lo mismo que la gasolina cuando «siempre» fue más barato,
        ahí tienes parte de la explicación: el reparto entre materia prima,
        refino e impuestos cambia con el tiempo y con la política fiscal de
        cada momento.
      </p>

      <CompareTable
        caption="De qué depende cada parte del precio (datos típicos en España, 2026)"
        headers={["Componente", "Peso aproximado", "¿Cambia a diario?"]}
        rows={[
          ["Crudo (Brent) + euro-dólar", "~1/3 del precio", "Sí, constantemente"],
          ["Refino y logística", "Parte menor", "Poco"],
          ["Impuestos (IEH + IVA)", "~La mitad o más", "No (salvo cambio legal)"],
          ["Margen de la estación", "Parte pequeña", "Poco, según competencia"],
        ]}
      />

      <h2 id="como-aprovechar-las-bajadas">Cómo aprovechar las bajadas</h2>
      <p>
        Si has llegado hasta aquí, la conclusión útil es esta:{" "}
        <strong>no intentes adivinar el precio, compáralo</strong>. Nadie sabe
        con certeza qué hará el Brent mañana, y el desfase entre el mercado y el
        surtidor hace casi imposible cronometrar el día perfecto. Pero sí puedes
        aplicar unas reglas sencillas:
      </p>
      <ul>
        <li>
          <strong>Si el crudo lleva días cayendo</strong>, reposta lo justo y
          espera unos días: la bajada tarda en llegar al surtidor, así que el
          lleno grande sale más a cuenta un poco después.
        </li>
        <li>
          <strong>Si el crudo sube con fuerza</strong>, adelanta el lleno antes
          de que la subida se traslade al precio.
        </li>
        <li>
          <strong>Cada día, compara estaciones cercanas.</strong> La diferencia
          entre la más cara y la más barata de tu zona suele ser mayor que
          cualquier oscilación diaria del mercado. Ahí está el ahorro fiable.
        </li>
        <li>
          <strong>Aprovecha la hora y la competencia.</strong> Algunos hábitos
          ayudan; lo vemos en{" "}
          <Link href="/guias/mejor-hora-dia-repostar">la mejor hora del día
          para repostar</Link> y en{" "}
          <Link href="/guias/cuanto-se-ahorra-comparando-gasolineras">cuánto se
          ahorra comparando gasolineras</Link>.
        </li>
      </ul>
      <p>
        Dicho de otro modo: el mercado global decide la marea, pero tú eliges en
        qué playa repostar. Y esa elección, hecha bien cada vez, pesa más en tu
        bolsillo a final de año que acertar un par de veces el momento de la
        bajada.
      </p>

      <AppCta
        title="Compara el precio real cerca de ti ahora"
        body="Carburantes lee los datos oficiales del Ministerio cada media hora. Pulsa «Cerca de mí» o busca por municipio para ver de un vistazo las gasolineras más baratas de tu zona — y no tener que adivinar el mercado."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/como-se-forma-precio-gasolina", label: "Cómo se forma el precio de la gasolina" },
          { href: "/guias/impuestos-gasolina-espana", label: "Impuestos de la gasolina" },
          { href: "/guias/historico-precio-gasolina-espana", label: "Histórico del precio" },
        ]}
      />
    </>
  );
}

export default guide;
