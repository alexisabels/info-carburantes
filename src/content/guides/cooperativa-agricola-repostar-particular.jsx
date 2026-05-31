import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "cooperativa-agricola-repostar-particular";
const title = "Cooperativas agrícolas: ¿puede repostar un particular?";
const description =
  "Las cooperativas agrícolas suelen tener gasóleo barato. Te explicamos si un particular puede repostar en ellas, qué gasóleo venden y las condiciones habituales.";

const guide = {
  slug,
  title,
  seoTitle: "Repostar en cooperativa agrícola · Guía",
  description,
  category: "normativa",
  datePublished: "2026-05-28",
  dateModified: "2026-05-28",
  readingMinutes: 5,
  keywords: [
    "cooperativa agrícola repostar",
    "gasóleo cooperativa",
    "repostar cooperativa particular",
    "gasolinera cooperativa",
  ],
  mentions: [
    { "@type": "Thing", name: "Cooperativa" },
    { "@type": "Thing", name: "Gasóleo" },
  ],
  faq: [
    {
      q: "¿Puedo repostar en una cooperativa siendo particular?",
      a: "En la mayoría de cooperativas que tienen surtidor de gasóleo A (el de automoción) sí, aunque no seas socio: funcionan como una estación de servicio o unidad de suministro abierta al público. Lo que cambia respecto al socio es el precio, porque muchas cooperativas reservan su tarifa más baja para sus miembros. Algunas instalaciones son privadas y solo atienden a socios; lo más seguro es llamar antes o comprobar si el surtidor figura en un buscador de precios oficial, que solo recoge los puntos abiertos al público.",
    },
    {
      q: "¿El gasóleo de cooperativa sirve para mi coche?",
      a: "Solo si es gasóleo A (el de automoción, sin tintar). Ese cumple la misma norma europea EN 590 que el de cualquier gasolinera y es perfectamente válido para tu coche diésel. Lo que NO puedes echar al coche es el gasóleo B, el agrícola tintado de rojo: está bonificado fiscalmente y reservado a tractores y maquinaria, y usarlo en un vehículo de carretera es una infracción tributaria con sanción. Antes de repostar, asegúrate de qué producto sale por el surtidor.",
    },
    {
      q: "¿Por qué es más barato?",
      a: "Por su modelo sin ánimo de lucro y por volumen. Una cooperativa compra combustible en grandes cantidades para abastecer a todos sus socios y traslada ese precio de compra con un margen muy ajustado, sin la estructura comercial ni publicitaria de una gran marca. El efecto es parecido al de una gasolinera low cost: menos intermediarios y menos margen por litro. La diferencia real frente a tu gasolinera habitual varía mucho según la zona, así que conviene compararla.",
    },
    {
      q: "¿Necesito ser socio?",
      a: "Depende de la cooperativa. Para repostar gasóleo A en un surtidor abierto al público normalmente no hace falta ser socio, aunque el precio de socio suele ser algo mejor. Para acceder al gasóleo B agrícola sí necesitas acreditar que eres agricultor o ganadero con maquinaria, porque es un producto de uso restringido. Si solo quieres llenar el depósito del coche, te interesa el gasóleo A y, en la mayoría de los casos, puedes hacerlo sin ser miembro.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Sí, en la mayoría de los casos un particular puede repostar en una
        cooperativa agrícola, siempre que tenga un surtidor de{" "}
        <strong>gasóleo A</strong> abierto al público. Ese gasóleo es el
        mismo que el de cualquier gasolinera y vale para tu coche. Lo que no
        puedes echar al depósito es el <strong>gasóleo B</strong> agrícola
        (tintado de rojo), reservado a maquinaria. El precio de socio suele
        ser algo más bajo, pero muchas cooperativas venden también a
        particulares.
      </Answer>

      <Tldr
        items={[
          "Si la cooperativa tiene surtidor de gasóleo A abierto al público, normalmente puedes repostar aunque no seas socio.",
          "El gasóleo A de cooperativa cumple la misma norma (EN 590) que el de cualquier gasolinera: es válido para tu coche.",
          "El gasóleo B (rojo, agrícola) está prohibido en vehículos de carretera: es una infracción fiscal.",
          "Suele ser barato por el modelo cooperativo (sin ánimo de lucro) y por comprar a gran volumen.",
          "El precio real cambia mucho por zona: compáralo antes en un buscador con datos oficiales.",
        ]}
      />

      <h2 id="que-es-cooperativa">Qué es una gasolinera de cooperativa</h2>
      <p>
        Una cooperativa agrícola es una empresa propiedad de sus socios
        (agricultores y ganaderos) que se asocian para comprar suministros en
        común y vender su producción. Entre esos suministros, el combustible
        es uno de los más importantes: tractores, cosechadoras, motobombas y
        vehículos consumen mucho gasóleo, y comprarlo de forma agrupada sale
        más barato que hacerlo cada uno por su cuenta.
      </p>
      <p>
        Para abastecer a sus socios, muchas cooperativas instalan{" "}
        <strong>surtidores propios</strong>. Algunos son instalaciones de uso
        privado, solo para miembros; otros se registran como una estación de
        servicio o como <em>unidad de suministro</em> abierta al público, con
        las mismas obligaciones de etiquetado, calidad y comunicación de
        precios que cualquier gasolinera. Esa diferencia administrativa es la
        que decide si un particular puede entrar o no.
      </p>
      <p>
        En la práctica, lo verás como un surtidor sencillo, a veces dentro del
        recinto de la cooperativa o junto al almacén de fertilizantes, sin
        tienda ni lavadero. Esa austeridad es justo una de las razones de su
        precio ajustado, igual que ocurre en las{" "}
        <Link href="/guias/gasolineras-low-cost">gasolineras low cost</Link>.
      </p>

      <h2 id="puede-repostar-particular">¿Puede repostar un particular?</h2>
      <p>
        En la mayoría de los casos sí: si la cooperativa tiene un surtidor de
        gasóleo A registrado como abierto al público, un particular puede
        repostar aunque no sea socio. Lo que suele variar es el precio, porque
        muchas reservan su tarifa más baja para los miembros y aplican otra,
        algo superior, al público general.
      </p>
      <p>
        La clave está en el tipo de instalación. Algunas cooperativas tienen
        un surtidor de <strong>uso exclusivo para socios</strong>: ahí no
        podrás repostar si no eres miembro. Otras funcionan como una estación
        de servicio normal y atienden a cualquiera. Como el régimen no se ve a
        simple vista, lo más práctico es comprobarlo de dos formas:
      </p>
      <ul>
        <li>
          <strong>En un buscador de precios oficial</strong>: los puntos de
          venta abiertos al público están obligados a comunicar sus precios al
          Ministerio. Si la cooperativa aparece con su gasóleo A listado, es
          que vende al público.
        </li>
        <li>
          <strong>Llamando o preguntando in situ</strong>: una llamada rápida
          te aclara si admiten particulares y con qué precio, y si hace falta
          algún trámite mínimo.
        </li>
      </ul>
      <Callout type="note" title="No todas las cooperativas son iguales">
        El funcionamiento depende de cada cooperativa y de cómo esté dada de
        alta su instalación. Algunas piden darse de alta como cliente, otras
        cobran solo en efectivo o con tarjeta propia, y unas pocas son
        estrictamente privadas. Confirma las condiciones concretas antes de
        ir, sobre todo si te desvías expresamente para repostar allí.
      </Callout>

      <h2 id="que-gasoleo-venden">Qué gasóleo venden (y cuál NO)</h2>
      <p>
        Aquí está el matiz más importante. En una cooperativa puedes
        encontrarte con dos gasóleos muy distintos, y solo uno vale para tu
        coche:
      </p>
      <ul>
        <li>
          <strong>Gasóleo A (automoción)</strong>: es el de toda la vida para
          coches, furgonetas y camiones. Cumple la norma europea EN 590, paga
          todos los impuestos y no está tintado. Si la cooperativa lo vende al
          público, es perfectamente válido y seguro para tu vehículo diésel.
        </li>
        <li>
          <strong>Gasóleo B (agrícola)</strong>: está tintado de rojo, paga
          menos impuestos (está bonificado fiscalmente) y está reservado a
          tractores, maquinaria agrícola y otros usos autorizados.{" "}
          <strong>No puedes echarlo al coche</strong>: usarlo en un vehículo
          de carretera es una infracción tributaria, y los controles
          detectan el tinte rojo en el depósito.
        </li>
      </ul>
      <p>
        Por eso, antes de repostar, asegúrate de qué producto sale por el
        surtidor. Si tienes dudas sobre las diferencias y por qué el gasóleo
        rojo es ilegal en automoción, lo explicamos a fondo en la guía de{" "}
        <Link href="/guias/diesel-a-vs-premium">diésel A, B y C</Link>.
      </p>

      <CompareTable
        caption="Gasóleo A vs gasóleo B en una cooperativa (datos típicos en España, 2026)"
        headers={["", "Gasóleo A (automoción)", "Gasóleo B (agrícola)"]}
        rows={[
          ["Color", "Transparente / amarillento", "Tintado de rojo"],
          ["Para tu coche", "Sí, válido y legal", "No, prohibido y sancionable"],
          ["Fiscalidad", "Impuestos completos", "Bonificado (menos impuestos)"],
          ["Uso autorizado", "Cualquier vehículo de carretera", "Tractores y maquinaria agrícola"],
          ["¿Lo vende al público?", "Sí, si es surtidor abierto", "Solo a usuarios acreditados"],
        ]}
      />

      <h2 id="por-que-mas-barato">¿Por qué suele ser más barato?</h2>
      <p>
        Porque una cooperativa no busca beneficio en la venta de combustible,
        sino dar servicio a sus socios al menor coste, y porque compra a gran
        volumen. Esa combinación, modelo sin ánimo de lucro más compra
        agrupada, le permite trasladar el precio con un margen mínimo, parecido
        al de una low cost.
      </p>
      <p>
        En el desglose habitual influyen varios factores:
      </p>
      <ul>
        <li>
          <strong>Volumen de compra</strong>: al adquirir combustible para
          todos sus socios, negocia mejores condiciones con el distribuidor.
        </li>
        <li>
          <strong>Estructura mínima</strong>: surtidores sencillos, sin
          tienda, sin marca cara ni publicidad, con pocos costes fijos por
          litro vendido. Es la misma lógica que hace baratas a muchas{" "}
          <Link href="/guias/gasolineras-supermercado">gasolineras de
          supermercado</Link>.
        </li>
        <li>
          <strong>Margen ajustado</strong>: el objetivo es el servicio, no
          maximizar el beneficio por litro.
        </li>
      </ul>
      <p>
        Dicho esto, no des por hecho que siempre será la opción más barata de
        tu zona. La diferencia frente a tu gasolinera habitual puede ser de
        unos pocos céntimos por litro o, en algunas zonas, prácticamente nula.
        Lo único fiable es comparar el precio real del día, sobre todo si
        tienes que desviarte para llegar.
      </p>

      <h2 id="condiciones-habituales">Condiciones habituales</h2>
      <p>
        Más allá del precio, estas son las particularidades que sueles
        encontrar al repostar en una cooperativa:
      </p>
      <ul>
        <li>
          <strong>Horario reducido</strong>: muchas siguen el horario laboral
          de la cooperativa y cierran tardes, festivos y fines de semana. No
          esperes el servicio continuo de una{" "}
          <Link href="/guias/gasolineras-24-horas">gasolinera 24 horas</Link>.
        </li>
        <li>
          <strong>Formas de pago concretas</strong>: algunas operan con
          tarjeta propia de la cooperativa o solo en efectivo; otras admiten
          tarjeta bancaria normal. Pregunta antes si dependes de un medio de
          pago concreto.
        </li>
        <li>
          <strong>Precio de socio vs precio público</strong>: es habitual que
          el socio tenga una tarifa algo mejor. Como particular, pagarás el
          precio público, que sigue siendo competitivo en muchas cooperativas.
        </li>
        <li>
          <strong>Surtido limitado</strong>: lo más común es gasóleo. No
          siempre hay gasolina 95/98, y rara vez encontrarás GLP o AdBlue.
        </li>
        <li>
          <strong>Factura</strong>: si necesitas factura (por ejemplo, como
          autónomo), confírmalo antes; algunas instalaciones emiten ticket
          simplificado.
        </li>
      </ul>
      <Callout type="warn" title="La normativa fiscal puede cambiar">
        El régimen del gasóleo bonificado, las condiciones de venta y los
        requisitos de las unidades de suministro están regulados y pueden
        actualizarse. Para usos profesionales o dudas sobre facturación,
        confirma siempre con la fuente oficial o con tu gestor o asesor antes
        de tomar decisiones.
      </Callout>

      <AppCta
        title="Compara el precio de la cooperativa con el resto"
        body="Antes de desviarte hasta una cooperativa, mira en Carburantes el gasóleo A de las estaciones de tu zona con datos oficiales del Ministerio. Así sabrás si de verdad compensa o si tienes algo igual de barato más cerca."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/diesel-a-vs-premium", label: "Diésel A, B y C" },
          { href: "/guias/gasolineras-low-cost", label: "Gasolineras low cost" },
          { href: "/guias/bonificacion-gasoleo-profesional", label: "Bonificación del gasóleo profesional" },
        ]}
      />
    </>
  );
}

export default guide;
