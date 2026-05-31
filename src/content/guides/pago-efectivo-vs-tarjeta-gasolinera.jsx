import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "pago-efectivo-vs-tarjeta-gasolinera";
const title = "¿Es más barato pagar la gasolina en efectivo?";
const description =
  "Algunas gasolineras anuncian un precio en efectivo y otro con tarjeta. Te explicamos por qué, cuándo sale más barato pagar en efectivo y si compensa.";

const guide = {
  slug,
  title,
  seoTitle: "Gasolina: ¿efectivo o tarjeta? · Guía",
  description,
  category: "ahorro",
  datePublished: "2026-05-29",
  dateModified: "2026-05-29",
  readingMinutes: 5,
  keywords: [
    "pagar gasolina efectivo o tarjeta",
    "precio gasolina efectivo",
    "descuento efectivo gasolinera",
    "tarjeta vs efectivo combustible",
  ],
  mentions: [
    { "@type": "Thing", name: "Efectivo" },
    { "@type": "Thing", name: "Tarjeta" },
  ],
  faq: [
    {
      q: "¿Es más barata la gasolina en efectivo?",
      a: "En algunas gasolineras sí, pero no es lo habitual. Cuando existe doble precio, el efectivo suele salir entre 1 y 4 céntimos por litro más barato que la tarjeta. La mayoría de estaciones, incluidas las grandes marcas, aplican el mismo precio pagues como pagues, así que conviene mirar siempre el cartel y el surtidor antes de repostar.",
    },
    {
      q: "¿Por qué cobran más con tarjeta?",
      a: "Porque cada cobro con tarjeta tiene una comisión que el banco descuenta a la gasolinera. En un margen tan ajustado como el del combustible, ese pequeño porcentaje pesa, sobre todo en estaciones desatendidas o low cost que compiten al céntimo. Anunciar un precio más bajo en efectivo es una forma de trasladar ese ahorro al cliente y atraer tráfico.",
    },
    {
      q: "¿Es legal poner dos precios?",
      a: "Sí, siempre que ambos precios estén claramente indicados y sean reales. La normativa española permite diferenciar el precio según el medio de pago, pero exige que el consumidor pueda conocerlo antes de repostar, tanto en el cartel exterior como en el surtidor. La normativa de consumo y de precios puede cambiar y su aplicación admite matices, así que ante cualquier duda conviene confirmar con la fuente oficial o consultar a un organismo de consumo.",
    },
    {
      q: "¿Compensa llevar efectivo?",
      a: "Solo si repostas con frecuencia en estaciones que aplican descuento por efectivo y el ahorro supera la molestia de llevar dinero encima. Para un lleno típico, la diferencia ronda 1-2 euros, una cantidad modesta. Suele compensar más elegir una gasolinera barata comparando precios reales que arrastrar billetes para arañar unos céntimos.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Pagar en efectivo solo sale más barato en las gasolineras que anuncian
        expresamente <strong>doble precio</strong>, y la diferencia típica es
        de <strong>1 a 4 céntimos por litro</strong> (en torno a 1-2 € por
        lleno). En la mayoría de estaciones el precio es el mismo pagues como
        pagues, así que antes de fiarte del efectivo conviene comparar el
        precio real de cada gasolinera, que pesa mucho más que el medio de pago.
      </Answer>

      <Tldr
        items={[
          "El doble precio (efectivo más barato que tarjeta) existe, pero no es lo habitual: muchas estaciones cobran lo mismo pagues como pagues.",
          "Cuando hay diferencia, suele ser de ~1 a 4 céntimos/litro: en torno a 1-2 € por lleno.",
          "El motivo es la comisión bancaria por cobro con tarjeta, que pesa en un margen tan ajustado como el del combustible.",
          "Es legal mientras ambos precios estén claros en el cartel y en el surtidor.",
          "Casi siempre ahorras más eligiendo la gasolinera barata que arrastrando efectivo por unos céntimos.",
        ]}
      />

      <h2 id="por-que-dos-precios">¿Por qué hay dos precios?</h2>
      <p>
        Algunas gasolineras anuncian dos precios para el mismo combustible
        porque cada cobro con tarjeta les cuesta dinero: el banco les
        descuenta una pequeña comisión por cada transacción. Pagar en efectivo
        evita esa comisión, y parte de ese ahorro se traslada al cliente como
        un precio ligeramente más bajo.
      </p>
      <p>
        El margen que gana una gasolinera por litro es estrecho. Cuando hablamos
        de céntimos de diferencia entre estaciones, una comisión bancaria del
        orden del 0,3-0,5 % sobre el importe no es despreciable. En un sector
        que compite al céntimo —especialmente las{" "}
        <Link href="/guias/gasolineras-low-cost">gasolineras low cost</Link>—
        rebajar el precio en efectivo es una palanca comercial: atrae a quien
        busca el dato más bajo del cartel y reduce los costes de cobro.
      </p>
      <p>
        Hay un matiz importante: muchas grandes marcas (Repsol, Cepsa, BP,
        Galp) aplican un <strong>precio único</strong>, igual en efectivo y en
        tarjeta, y reservan los descuentos a sus propias tarjetas de
        fidelización. En esos casos no existe el «truco» del efectivo: el ahorro
        viene por otro lado. Lo veremos más abajo.
      </p>

      <h2 id="cuanto-cambia">Cuánto puede cambiar</h2>
      <p>
        Cuando una estación aplica doble precio, la diferencia típica en España
        ronda entre <strong>1 y 4 céntimos por litro</strong> a favor del
        efectivo (dato orientativo, 2026). No es una cifra fija ni regulada:
        cada gasolinero decide cuánto rebaja, y algunas no diferencian nada.
      </p>
      <p>
        Para hacerte una idea de lo que supone en la práctica, conviene
        traducirlo a euros por lleno en lugar de quedarse en los céntimos:
      </p>

      <CompareTable
        caption="Ahorro estimado pagando en efectivo, según diferencia de precio (datos típicos en España, 2026)"
        headers={["Diferencia", "Depósito 40 L", "Depósito 55 L", "Al año (~3 llenos/mes)"]}
        rows={[
          ["1 cént/L", "~0,40 €", "~0,55 €", "~20 €"],
          ["2 cént/L", "~0,80 €", "~1,10 €", "~40 €"],
          ["3 cént/L", "~1,20 €", "~1,65 €", "~60 €"],
          ["4 cént/L", "~1,60 €", "~2,20 €", "~80 €"],
        ]}
      />

      <p>
        Son cantidades modestas por repostaje, aunque sumadas a lo largo del año
        empiezan a notarse si siempre repostas en estaciones con descuento por
        efectivo. Para ponerlo en contexto: elegir bien la gasolinera puede
        ahorrarte mucho más. Entre la estación más cara y la más barata de una
        misma ciudad es habitual encontrar diferencias de 10, 15 o más céntimos
        por litro, como explicamos en{" "}
        <Link href="/guias/cuanto-se-ahorra-comparando-gasolineras">
          cuánto se ahorra comparando gasolineras
        </Link>
        . Esa diferencia eclipsa por completo el céntimo o dos del efectivo.
      </p>

      <Callout type="info" title="Mira el surtidor, no solo el cartel">
        El precio que cuenta es el que pagas en el surtidor. Algunos carteles
        de carretera muestran el precio en efectivo en grande y el de tarjeta
        en pequeño (o al revés). Si pagas con tarjeta, asegúrate de que el
        precio que verás reflejado es el correcto antes de empezar a repostar:
        el cartel y el surtidor deben coincidir con el medio de pago que vayas
        a usar.
      </Callout>

      <h2 id="donde-es-comun">Dónde es más común</h2>
      <p>
        El doble precio no aparece por igual en todas partes. Estos son los
        escenarios donde más probable es encontrarlo:
      </p>
      <ul>
        <li>
          <strong>Gasolineras independientes y de marca blanca</strong>: las que
          no pertenecen a una gran petrolera son las que más recurren al
          descuento por efectivo para competir.
        </li>
        <li>
          <strong>Estaciones desatendidas o automáticas</strong>: muchas{" "}
          <Link href="/guias/gasolineras-automaticas-como-funcionan">
            gasolineras automáticas
          </Link>{" "}
          funcionan solo con tarjeta, pero algunas con cajero aceptan billetes y
          aplican un precio algo menor al pagar en metálico.
        </li>
        <li>
          <strong>Pueblos y zonas rurales</strong>: en estaciones pequeñas con
          atención personal todavía es relativamente frecuente.
        </li>
        <li>
          <strong>Gasolineras de supermercado</strong>: varían mucho; algunas
          ligan el descuento a la tarjeta del propio supermercado más que al
          efectivo.
        </li>
      </ul>
      <p>
        En cambio, en las estaciones de grandes marcas en ciudad lo normal es el
        precio único. Por eso la única forma fiable de saber cuánto pagarás de
        verdad es comprobar el precio real de cada gasolinera concreta, no
        asumir que el efectivo siempre gana.
      </p>

      <h2 id="compensa-efectivo">¿Compensa pagar en efectivo?</h2>
      <p>
        Compensa solo si repostas habitualmente en una gasolinera que aplica
        descuento por efectivo y el ahorro real supera la molestia de llevar
        dinero encima. Para un lleno corriente hablamos de en torno a 1-2 €, una
        cantidad pequeña frente a lo que ahorras eligiendo bien la estación.
      </p>
      <p>
        Antes de decidir llevar billetes «por sistema», ten en cuenta tres cosas:
      </p>
      <ul>
        <li>
          <strong>Comodidad y seguridad</strong>: pagar con tarjeta o móvil es
          más rápido, no te obliga a pasar por un cajero ni a llevar efectivo, y
          deja registro automático del gasto.
        </li>
        <li>
          <strong>Factura para autónomos y empresas</strong>: si necesitas
          justificar el gasto, el pago con tarjeta o con una{" "}
          <Link href="/guias/tarjetas-combustible-empresa">
            tarjeta de combustible de empresa
          </Link>{" "}
          facilita mucho la contabilidad frente al ticket en efectivo.
        </li>
        <li>
          <strong>El precio base manda</strong>: una gasolinera barata que cobra
          igual en tarjeta casi siempre te deja un total menor que una más cara
          con «descuento» en efectivo. Compara primero el precio, después el
          medio de pago.
        </li>
      </ul>
      <p>
        La regla práctica: no organices tu repostaje alrededor del efectivo.
        Elige la gasolinera por su precio real y, si esa estación concreta
        además premia el metálico, llévalo. Si no, paga como te resulte más
        cómodo sin sensación de estar perdiendo dinero.
      </p>

      <h2 id="otras-formas-pago">Otras formas de pago con descuento</h2>
      <p>
        El efectivo no es la única vía para pagar menos. De hecho, en las
        grandes marcas suelen ser más jugosos otros descuentos ligados al medio
        de pago:
      </p>
      <ul>
        <li>
          <strong>Tarjetas de fidelización de la propia petrolera</strong>
          (Repsol Móvil/Waylet, Cepsa Pay, Galp, BP). Acumulan puntos o aplican
          una rebaja directa por litro. Lo detallamos en la guía de{" "}
          <Link href="/guias/descuentos-tarjetas-gasolineras">
            descuentos y tarjetas de gasolineras
          </Link>
          .
        </li>
        <li>
          <strong>Pago con el móvil dentro de la app de la estación</strong>,
          que a veces suma un descuento adicional al repostar. Lo explicamos en{" "}
          <Link href="/guias/pagar-gasolina-movil-app">
            pagar la gasolina con el móvil
          </Link>
          .
        </li>
        <li>
          <strong>Promociones de bancos y supermercados</strong>: algunas
          tarjetas bancarias devuelven un pequeño porcentaje en carburante, y
          ciertos supermercados ofrecen vales por compra que se canjean en su
          gasolinera.
        </li>
      </ul>
      <p>
        Cada programa tiene su letra pequeña (importe mínimo, caducidad de
        puntos, estaciones adheridas), así que vale la pena leer las condiciones
        antes de basar tu elección en el descuento. Y recuerda: ningún descuento
        compensa repostar en una estación que de partida es cara.
      </p>

      <AppCta
        title="Compara el precio real antes de repostar"
        body="En Carburantes ves el precio oficial de cada gasolinera, actualizado con los datos del Ministerio. Pulsa «Cerca de mí» o busca por municipio para encontrar la más barata y deja de adivinar si pagar en efectivo o con tarjeta."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/descuentos-tarjetas-gasolineras", label: "Descuentos y tarjetas" },
          { href: "/guias/pagar-gasolina-movil-app", label: "Pagar con el móvil" },
          { href: "/guias/gasolineras-low-cost", label: "Gasolineras low cost" },
        ]}
      />
    </>
  );
}

export default guide;
