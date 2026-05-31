import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "tarjetas-combustible-empresa";
const title = "Tarjetas de combustible para empresas y autónomos";
const description =
  "Solred, Cepsa StarDirect, BP Plus, Galp Frota... Comparamos las tarjetas de combustible para empresas y autónomos: descuentos, IVA y control de gasto.";

const guide = {
  slug,
  title,
  seoTitle: "Tarjetas de combustible para empresas · Guía",
  description,
  category: "ahorro",
  datePublished: "2026-05-18",
  dateModified: "2026-05-18",
  readingMinutes: 6,
  keywords: [
    "tarjeta combustible empresa",
    "tarjeta gasolina autónomos",
    "solred",
    "tarjeta repostaje flota",
    "descuento combustible empresa",
  ],
  mentions: [
    { "@type": "Thing", name: "Solred" },
    { "@type": "Thing", name: "Cepsa" },
    { "@type": "Thing", name: "BP" },
    { "@type": "Thing", name: "Galp" },
  ],
  faq: [
    {
      q: "¿Merecen la pena las tarjetas de combustible para autónomos?",
      a: "Depende de cuánto repostes. La gran ventaja para un autónomo no es tanto el descuento (suele ser modesto, de unos pocos céntimos por litro) como el control del gasto y la factura única con todo el IVA detallado, que ahorra mucho papeleo en cada declaración trimestral. Si gastas más de 200-300 euros al mes en combustible y haces la contabilidad tú mismo o con una gestoría, la comodidad fiscal compensa de sobra. Si repostas poco y de forma esporádica, una simple tarjeta de fidelización gratuita de la propia gasolinera puede ser suficiente.",
    },
    {
      q: "¿Qué descuento dan las tarjetas de combustible de empresa?",
      a: "Los descuentos típicos en España en 2026 rondan los 2 a 6 céntimos por litro en las estaciones de la red de la marca emisora, y suelen ser menores o nulos en estaciones ajenas. Algunos programas aplican descuentos escalonados según el volumen mensual: cuanto más reposta la flota, mayor es el céntimo por litro. Conviene leer la letra pequeña, porque a veces el descuento se calcula sobre el precio sin promociones de la estación, no sobre el precio que pagaría un particular con su propia tarjeta de fidelización.",
    },
    {
      q: "¿Sirven las tarjetas de combustible para deducir el IVA?",
      a: "La tarjeta en sí no da derecho a deducir nada; lo que permite deducir el IVA es que el gasto esté correctamente justificado con factura. La ventaja de estas tarjetas es que generan una factura mensual única con el desglose de IVA de todos los repostajes, en lugar de tener que guardar y cuadrar decenas de tickets. Para deducir el 100 % del IVA, Hacienda exige que el vehículo esté afecto en exclusiva a la actividad; en turismos de uso mixto la deducción habitual es del 50 %. La factura facilita la justificación, pero no cambia esas reglas.",
    },
    {
      q: "¿Tienen cuota anual las tarjetas de combustible profesionales?",
      a: "Muchas tienen cuota de emisión o mantenimiento por tarjeta, en torno a 10-30 euros al año por unidad según el programa, aunque algunas marcas la bonifican o la eliminan si superas un volumen mínimo de consumo. Además puede haber comisiones por aplazamiento de pago, por SMS de control o por reposición de tarjetas perdidas. Antes de firmar, suma todas esas comisiones y compáralas con el descuento real que vas a obtener para ver si el saldo final es positivo.",
    },
    {
      q: "¿Puedo controlar en qué gasta cada conductor con estas tarjetas?",
      a: "Sí, ese es uno de sus puntos fuertes. Puedes asignar una tarjeta a cada vehículo o conductor, fijar límites de importe diario o mensual, restringir el tipo de producto (solo carburante, sin tienda) e incluso pedir el kilometraje al repostar. En el panel online de la empresa emisora ves quién, cuándo, dónde y cuánto ha repostado cada tarjeta, lo que ayuda a detectar consumos anómalos o usos indebidos.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Una tarjeta de combustible profesional es un medio de pago pensado
        para empresas y autónomos que reposten con frecuencia. Su valor real
        no está tanto en el <strong>descuento</strong> —suele ser modesto, de
        unos pocos céntimos por litro— como en la <strong>factura única
        mensual con el IVA desglosado</strong> y en el control del gasto por
        vehículo o conductor. Si repostas poco, una tarjeta de fidelización
        gratuita rinde casi lo mismo sin comisiones.
      </Answer>

      <Tldr
        items={[
          "Tres ventajas: descuento por litro, IVA agrupado en una factura y control de gasto por vehículo.",
          "Descuentos típicos en 2026: ~2 a 6 céntimos/litro, mayores en la red propia de la marca.",
          "Principales en España: Solred (Repsol), Cepsa StarDirect, BP Plus y Galp Frota.",
          "Ojo a la letra pequeña: cuotas anuales por tarjeta y comisiones por aplazamiento.",
          "Para un autónomo, la comodidad fiscal pesa más que el céntimo de descuento.",
        ]}
      />

      <h2 id="que-es-tarjeta-combustible-profesional">
        Qué es una tarjeta de combustible profesional
      </h2>
      <p>
        Una tarjeta de combustible para empresas es, en esencia, un medio de
        pago especializado: en lugar de pagar cada repostaje con la tarjeta
        bancaria de la empresa y acumular tickets, el conductor paga con una
        tarjeta emitida por la petrolera (o por un operador independiente) y
        todos los consumos se agrupan en una <strong>factura mensual
        única</strong>. La empresa paga ese cargo a fin de mes en lugar de
        adelantar dinero en cada surtidor.
      </p>
      <p>
        No es lo mismo que la tarjeta de fidelización que cualquier
        particular puede sacarse gratis. Las de fidelización acumulan puntos
        o aplican un descuento directo en el surtidor, pero no emiten factura
        agrupada ni permiten gestionar varias tarjetas con límites. Las
        profesionales están diseñadas para <strong>flotas</strong> —desde un
        único autónomo con su furgoneta hasta empresas con cientos de
        vehículos— y se contratan firmando un acuerdo con la entidad emisora.
        Si solo quieres rascar unos céntimos como particular, te conviene
        más esta{" "}
        <Link href="/guias/descuentos-tarjetas-gasolineras">
          guía de descuentos y tarjetas de fidelización
        </Link>
        .
      </p>

      <h2 id="ventajas-descuento-iva-control">
        Ventajas: descuento, IVA y control de gasto
      </h2>
      <p>
        Las tarjetas profesionales se venden por tres motivos, y conviene
        ordenarlos por importancia real, que casi nunca es la que anuncia el
        comercial:
      </p>
      <ul>
        <li>
          <strong>Factura única con el IVA desglosado.</strong> Es la ventaja
          de más peso. En lugar de guardar y cuadrar decenas de tickets cada
          trimestre, recibes una factura mensual con todos los repostajes y
          su IVA detallado, lista para la contabilidad. Para un autónomo que
          hace la declaración trimestral, esto ahorra horas de papeleo y
          reduce el riesgo de perder justificantes.
        </li>
        <li>
          <strong>Control del gasto.</strong> Puedes asignar una tarjeta a
          cada vehículo o conductor, ponerle límites de importe diario o
          mensual, restringir el producto (solo carburante, sin tienda) y ver
          en un panel online quién, cuándo, dónde y cuánto ha repostado. Es
          la herramienta clave para detectar consumos raros en una flota.
        </li>
        <li>
          <strong>Descuento por litro.</strong> Existe, pero suele ser lo
          menos jugoso. Los importes típicos en España en 2026 rondan los{" "}
          <strong>2 a 6 céntimos por litro</strong> en la red propia de la
          marca, y se reducen o desaparecen en estaciones ajenas. No esperes
          milagros: el descuento es un complemento, no el motivo principal.
        </li>
      </ul>
      <p>
        Sobre el IVA conviene ser exacto: la tarjeta no «da derecho» a
        deducir nada por sí misma. Lo que permite deducir es que el gasto
        esté bien justificado con factura, y eso es justo lo que estas
        tarjetas facilitan. Recuerda que Hacienda solo admite deducir el{" "}
        <strong>100 % del IVA</strong> si el vehículo está afecto en
        exclusiva a la actividad; en turismos de uso mixto la deducción
        habitual se queda en el <strong>50 %</strong>. La tarjeta agiliza la
        justificación, pero no cambia esas reglas.
      </p>

      <Callout type="info" title="Combustible profesional bonificado">
        Si tu actividad es transporte de mercancías o viajeros, taxi o
        agricultura, además del descuento de la tarjeta puedes tener derecho
        a la devolución parcial del Impuesto de Hidrocarburos del gasóleo
        profesional. Son cosas distintas que se suman. Lo explicamos en la{" "}
        <Link href="/guias/bonificacion-gasoleo-profesional">
          guía de la bonificación del gasóleo profesional
        </Link>
        , y muchas tarjetas de flota tramitan esa devolución automáticamente.
      </Callout>

      <h2 id="principales-tarjetas-espana">
        Principales tarjetas en España
      </h2>
      <p>
        Las grandes petroleras con red en España tienen su propio programa
        para profesionales. A grandes rasgos, todas ofrecen lo mismo
        (factura única, control online, descuento en su red) y se diferencian
        sobre todo en el tamaño de su red de estaciones y en los detalles de
        comisiones:
      </p>

      <CompareTable
        caption="Tarjetas de combustible para empresas en España (datos típicos, 2026)"
        headers={["Programa", "Marca / red", "Punto fuerte"]}
        rows={[
          ["Solred", "Repsol, Campsa, Petronor", "Red más amplia del país y muchos servicios añadidos"],
          ["Cepsa StarDirect", "Cepsa", "Buen control online y descuentos escalonados por volumen"],
          ["BP Plus", "BP", "Aceptación internacional, útil para rutas por Europa"],
          ["Galp Frota", "Galp", "Pensada para flotas; fuerte presencia en el oeste peninsular"],
        ]}
      />

      <p>
        Junto a las petroleras existen <strong>emisores
        independientes</strong> (operadores multimarca) cuyas tarjetas se
        aceptan en estaciones de varias enseñas a la vez. Pierdes parte del
        descuento de marca, pero ganas en flexibilidad si tus vehículos
        repostan donde pillan. Para rutas internacionales, las tarjetas con
        aceptación europea evitan tener que cuadrar tickets en otros idiomas;
        si cruzas la frontera con frecuencia, mira también nuestra guía de{" "}
        <Link href="/guias/repostar-portugal-francia-andorra">
          repostar en Portugal, Francia y Andorra
        </Link>
        .
      </p>
      <p>
        ¿Cuál elegir? La regla práctica es sencilla: mira primero{" "}
        <strong>dónde repostan de verdad tus vehículos</strong>. De poco sirve
        un descuento de marca si tus rutas pasan siempre por estaciones de
        otra enseña o por gasolineras low cost, que rara vez aceptan estas
        tarjetas. Antes de firmar, comprueba en la app si las estaciones de
        esa red están en tus zonas habituales.
      </p>

      <h2 id="comisiones-letra-pequena">
        Comisiones y letra pequeña
      </h2>
      <p>
        Aquí es donde el saldo final puede darse la vuelta. El descuento por
        litro es visible y se anuncia a bombo y platillo; las comisiones van
        en las condiciones. Repasa siempre estos puntos antes de contratar:
      </p>
      <ul>
        <li>
          <strong>Cuota anual o de mantenimiento por tarjeta.</strong> Suele
          rondar los <strong>10-30 euros al año por unidad</strong> según el
          programa. Algunas marcas la bonifican si superas un volumen mínimo
          de consumo; otras la cobran sí o sí. Con varias tarjetas, la suma
          se nota.
        </li>
        <li>
          <strong>Comisión por aplazamiento de pago.</strong> Pagar a 15 o 30
          días es cómodo, pero a veces lleva un recargo o un coste financiero
          implícito. Si no necesitas el aplazamiento, busca la modalidad de
          cargo inmediato sin comisión.
        </li>
        <li>
          <strong>Descuento sobre qué precio.</strong> Es la trampa más
          habitual. A veces el descuento se calcula sobre el precio de la
          estación <em>sin</em> sus promociones, no sobre el precio que
          pagaría un particular con su tarjeta de fidelización. Resultado: el
          ahorro real frente a pagar normal es menor de lo que parece.
        </li>
        <li>
          <strong>Pequeñas comisiones recurrentes.</strong> SMS de control de
          consumo, reposición de tarjetas perdidas, emisión de tarjetas
          adicionales... individualmente son céntimos, pero en una flota se
          acumulan.
        </li>
      </ul>
      <p>
        La cuenta honesta es esta: suma todas las comisiones anuales y
        compáralas con el descuento real (céntimos por litro multiplicados
        por los litros que vas a repostar de verdad en la red de esa marca).
        Si repostas mucho, el descuento gana de calle. Si repostas poco, las
        comisiones se comen el ahorro y te queda solo la ventaja fiscal —que
        ya es bastante, pero conviene saberlo.
      </p>

      <Callout type="warn" title="El descuento no anula comparar precios">
        Un error frecuente es repostar siempre en la red de tu marca «porque
        tengo descuento». Si esa estación está cara, los 4 céntimos de
        descuento no compensan los 10 que pagas de más frente a una
        gasolinera competitiva. El descuento se aplica sobre el precio de esa
        estación, sea caro o barato. Compara primero el precio real y luego
        aplica el descuento.
      </Callout>

      <h2 id="te-interesa-siendo-autonomo">
        ¿Te interesa siendo autónomo?
      </h2>
      <p>
        Para un autónomo con uno o dos vehículos, la decisión se reduce a una
        pregunta: <strong>¿cuánto repostas y quién te lleva la
        contabilidad?</strong>
      </p>
      <ul>
        <li>
          <strong>Repostas mucho (más de 200-300 euros al mes) y deduces el
          combustible:</strong> la factura única con el IVA desglosado te
          ahorra papeleo en cada trimestre y reduce el riesgo de perder
          tickets. La tarjeta compensa, aunque el descuento sea modesto.
        </li>
        <li>
          <strong>Repostas poco y de forma esporádica:</strong> probablemente
          no merezca la pena. Las cuotas y comisiones se comen el ahorro y
          una simple tarjeta de fidelización gratuita, sumada a guardar bien
          las facturas simplificadas, cumple la misma función.
        </li>
      </ul>
      <p>
        Sea cual sea tu caso, la palanca de ahorro más potente no es el
        plástico, sino <strong>dónde y cuándo repostas</strong>. Unos pocos
        céntimos de descuento de tarjeta son calderilla al lado de los ~15-20
        céntimos por litro que pueden separar una gasolinera cara de una
        barata en una misma ciudad. Antes de obsesionarte con qué tarjeta firmar,
        asegúrate de estar repostando en estaciones competitivas: ahí está el
        dinero de verdad.
      </p>

      <AppCta
        title="Compara el precio real antes de aplicar el descuento"
        body="En Carburantes ves el precio oficial de cada estación con datos del Ministerio. Pulsa «Cerca de mí» o busca por municipio para localizar las gasolineras más baratas de la red de tu tarjeta."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/descuentos-tarjetas-gasolineras", label: "Descuentos y tarjetas de fidelización" },
          { href: "/guias/bonificacion-gasoleo-profesional", label: "Bonificación del gasóleo profesional" },
          { href: "/guias/pagar-gasolina-movil-app", label: "Pagar la gasolina con el móvil" },
        ]}
      />
    </>
  );
}

export default guide;
