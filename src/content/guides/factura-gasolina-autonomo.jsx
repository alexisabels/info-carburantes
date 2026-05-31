import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "factura-gasolina-autonomo";
const title = "Factura de gasolina: completa o simplificada (autónomos)";
const description =
  "Para deducir el combustible necesitas la factura correcta. Te explicamos la diferencia entre factura completa y ticket simplificado y cómo pedirla en la gasolinera.";

const guide = {
  slug,
  title,
  seoTitle: "Factura de gasolina para autónomos · Guía",
  description,
  category: "normativa",
  datePublished: "2026-05-30",
  dateModified: "2026-05-30",
  readingMinutes: 5,
  keywords: [
    "factura gasolina autónomo",
    "factura completa gasolinera",
    "ticket o factura combustible",
    "pedir factura gasolina",
  ],
  mentions: [
    { "@type": "Thing", name: "Factura" },
    { "@type": "Thing", name: "Ticket" },
  ],
  faq: [
    {
      q: "¿Me sirve el ticket de la gasolina para Hacienda?",
      a: "Para justificar el gasto de forma sólida, normalmente no basta con el ticket normal. El ticket simplificado acredita que hubo un pago, pero al no llevar tus datos fiscales (nombre o razón social y NIF) Hacienda puede no aceptarlo como soporte, sobre todo para deducir el IVA. Para el IVA del combustible necesitas factura completa con tus datos. Como práctica habitual conviene pedir siempre factura, conservarla y poder explicar la relación del gasto con tu actividad. La normativa puede cambiar y la aplicación depende de cada caso, así que confírmalo con tu asesor o gestor.",
    },
    {
      q: "¿Cómo pido factura en la gasolinera?",
      a: "Pídela en el mismo momento del repostaje, antes de marcharte, y entrega tus datos fiscales: nombre o razón social, NIF y dirección. En estaciones atendidas te la dan en el mostrador presentando el ticket. En estaciones automáticas o desatendidas suele haber un tótem, un código QR o una web donde introduces el número de ticket y tus datos para descargar la factura en PDF, normalmente en un plazo de unos días. Guarda el ticket hasta tener la factura en la mano.",
    },
    {
      q: "¿Qué datos debe llevar la factura?",
      a: "Una factura completa debe incluir un número de factura, la fecha, los datos del emisor (la estación: nombre o razón social, NIF y domicilio), tus datos como destinatario (nombre o razón social, NIF y dirección), la descripción del producto (tipo de combustible y litros), la base imponible, el tipo y la cuota de IVA desglosados y el total. Si falta tu NIF o el desglose del IVA, no es una factura completa válida para deducir. Ante cualquier duda sobre los requisitos vigentes, consulta la sede electrónica de la Agencia Tributaria o a tu gestor.",
    },
    {
      q: "¿Las apps generan factura válida?",
      a: "Sí, muchas apps de pago de combustible y tarjetas de empresa emiten factura completa con tus datos fiscales si los configuras antes en tu perfil. La clave está en rellenar correctamente NIF, razón social y dirección, y comprobar que el documento que descargas es realmente una factura (con número, IVA desglosado y tus datos) y no un simple justificante o recibo. Descarga y archiva el PDF de cada repostaje, porque algunas plataformas solo lo mantienen disponible un tiempo limitado.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Para deducir el combustible como autónomo necesitas{" "}
        <strong>factura completa</strong> con tus datos fiscales (nombre o
        razón social, NIF y dirección) y el IVA desglosado. El ticket
        simplificado que sale por defecto del surtidor acredita el pago, pero
        al no llevar tu NIF no suele bastar para deducir el IVA. Pide siempre
        factura en el mismo momento del repostaje.
      </Answer>

      <Tldr
        items={[
          "El ticket normal (simplificado) acredita el pago, pero no suele servir para deducir el IVA.",
          "La factura completa lleva tu NIF, tus datos y el IVA desglosado: es la que necesitas.",
          "Pídela en el momento del repostaje; en automáticas, usa el tótem, el QR o la web de la marca.",
          "Apps de pago y tarjetas de empresa generan factura válida si configuras antes tus datos fiscales.",
          "La normativa puede cambiar: confirma siempre el caso concreto con tu gestor.",
        ]}
      />

      <h2 id="por-que-ticket-no-basta">Por qué el ticket normal no basta</h2>
      <p>
        Porque el ticket simplificado <strong>no lleva tu NIF ni tus datos
        fiscales</strong>, así que nada vincula ese gasto contigo. Para deducir
        el IVA, Hacienda suele exigir que el documento te identifique como
        destinatario y que el impuesto esté desglosado, algo que el ticket no
        hace.
      </p>
      <p>
        Cuando repostas y pagas, la gasolinera te entrega por defecto un{" "}
        <strong>ticket simplificado</strong> (lo que antes se llamaba «factura
        simplificada» o, coloquialmente, ticket). Ese papel demuestra que ha
        habido una operación y un pago, e incluye el importe, el IVA en
        conjunto y los datos de la estación. Para un particular es suficiente.
        Para ti, que quieres deducir el gasto en tu actividad, normalmente se
        queda corto.
      </p>
      <p>
        El motivo es sencillo: el ticket simplificado{" "}
        <strong>no lleva tus datos fiscales</strong>. No aparece ni tu nombre o
        razón social ni tu NIF, así que nada vincula ese gasto contigo. Para
        deducir el IVA soportado, Hacienda exige que el documento te identifique
        como destinatario y que el impuesto esté desglosado. Sin esos
        elementos, lo más prudente es asumir que ese ticket no te servirá para
        recuperar el IVA, aunque puedas usarlo como apoyo del gasto en el IRPF.
      </p>
      <p>
        Hay un matiz importante para autónomos: la deducción del combustible no
        es automática. Debe estar afecto a tu actividad y, en vehículos de uso
        mixto, el IVA suele admitirse de forma parcial salvo en casos
        concretos. Tratamos esa parte con detalle en la guía sobre{" "}
        <Link href="/guias/deducir-iva-gasolina-autonomo">
          deducir el IVA del combustible
        </Link>
        . Aquí nos centramos en el documento: sin factura correcta, ni siquiera
        entras a discutir si el gasto es deducible.
      </p>

      <Callout type="note" title="Pídela siempre, aunque no estés seguro de deducir">
        Es mucho más fácil pedir factura en el momento que volver a por ella
        después. Si dudas si el repostaje es deducible, pide igualmente la
        factura completa: tener el documento no te obliga a nada, pero no
        tenerlo te cierra la puerta. La norma puede cambiar y la decisión final
        es de tu gestor.
      </Callout>

      <h2 id="completa-vs-simplificada">Factura completa vs simplificada</h2>
      <p>
        La diferencia clave está en si el documento te identifica a ti como
        destinatario. La factura completa lleva tus datos y el IVA desglosado;
        la simplificada (el ticket) no. Esta es la comparativa práctica:
      </p>

      <CompareTable
        caption="Ticket simplificado vs factura completa para combustible (datos típicos en España, 2026)"
        headers={["Elemento", "Ticket simplificado", "Factura completa"]}
        rows={[
          ["Tus datos fiscales (NIF)", "No aparecen", "Obligatorios"],
          ["Datos de la estación", "Sí", "Sí"],
          ["IVA", "Importe total", "Base, tipo y cuota desglosados"],
          ["Número de documento", "Normalmente sí", "Sí, numerado"],
          ["Sirve para deducir IVA", "Por lo general, no", "Sí"],
          ["Cómo se obtiene", "Sale por defecto", "Hay que pedirla"],
        ]}
      />

      <p>
        Dicho de otra forma: el ticket es lo que recibes sin pedir nada; la
        factura completa es lo que tienes que solicitar de forma activa. La buena
        noticia es que toda gasolinera está obligada a emitírtela si la pides, y
        hoy el proceso está muy automatizado incluso en estaciones desatendidas.
      </p>

      <h2 id="como-pedir-factura">Cómo pedir factura en la gasolinera</h2>
      <p>
        Pídela en el mismo momento del repostaje y entrega tus datos fiscales
        completos. Cuanto más tarde, más difícil: muchas marcas limitan el
        tiempo que puedes solicitar la factura a partir del ticket, así que no
        lo dejes para el cierre del trimestre.
      </p>
      <p>
        El procedimiento depende del tipo de estación:
      </p>
      <ul>
        <li>
          <strong>Estación atendida (con personal)</strong>: paga, conserva el
          ticket y pide la factura en el mostrador. Te pedirán nombre o razón
          social, NIF y dirección. Si repostas a menudo en la misma, suelen
          guardar tus datos para próximas veces.
        </li>
        <li>
          <strong>Estación automática o desatendida</strong>: aquí no hay
          mostrador, pero sí alternativas. Lo habitual es un{" "}
          <strong>tótem o pantalla</strong> donde introduces el número de
          ticket, un <strong>código QR</strong> impreso en el propio ticket que
          te lleva a una web, o un portal de la marca donde te registras una vez
          y descargas la factura en PDF. El plazo suele ir de inmediato a unos
          pocos días.
        </li>
        <li>
          <strong>Pago con app o tarjeta de empresa</strong>: en muchos casos la
          factura se genera automáticamente y la tienes en tu cuenta sin pedir
          nada en la estación. Lo vemos en el siguiente apartado.
        </li>
      </ul>
      <p>
        En todos los casos, <strong>guarda el ticket</strong> hasta tener la
        factura en la mano: es el comprobante que vincula tu petición con el
        repostaje concreto. Si pagas con el móvil, te interesa además la guía de{" "}
        <Link href="/guias/pagar-gasolina-movil-app">
          pagar la gasolina con el móvil
        </Link>
        , porque varias de esas apps emiten la factura directamente.
      </p>

      <Callout type="warn" title="No te vayas sin el comprobante">
        Si te marchas con solo el ticket y luego la web de la marca no encuentra
        tu repostaje, te quedas sin factura. Antes de salir, comprueba que el
        ticket lleva el QR o el número que vas a necesitar, o que el personal ha
        registrado tus datos. Recuperar una factura semanas después rara vez
        sale bien.
      </Callout>

      <h2 id="apps-y-tarjetas">Apps y tarjetas que la generan</h2>
      <p>
        Para un autónomo que reposta a menudo, la forma más cómoda de no perder
        ninguna factura es delegar en una app de pago o una tarjeta de empresa.
        Configuras tus datos fiscales una vez en el perfil y, a partir de ahí,
        cada repostaje genera factura completa de forma automática.
      </p>
      <ul>
        <li>
          <strong>Apps de las propias petroleras</strong>: las grandes marcas
          tienen app de pago en la que, si registras tu NIF y razón social,
          recibes la factura por cada operación, normalmente descargable en PDF
          desde tu historial.
        </li>
        <li>
          <strong>Tarjetas de combustible para empresas y flotas</strong>:
          centralizan todos los repostajes en una factura periódica con el IVA
          desglosado, lo que simplifica enormemente la contabilidad. Lo
          desarrollamos en la guía de{" "}
          <Link href="/guias/tarjetas-combustible-empresa">
            tarjetas para empresas
          </Link>
          .
        </li>
        <li>
          <strong>Apps de pago genéricas en el coche</strong>: algunas permiten
          repostar sin bajarte y emiten factura si has rellenado los datos
          fiscales. Comprueba siempre que el documento es una factura y no un
          simple recibo de cargo.
        </li>
      </ul>
      <p>
        El punto crítico es la configuración inicial: si no metes bien el NIF y
        la razón social <em>antes</em> de repostar, la app generará un
        justificante sin tus datos y tendrás el mismo problema que con el ticket.
        Y descarga el PDF cuanto antes: algunas plataformas solo lo conservan
        disponible durante un tiempo limitado.
      </p>

      <h2 id="que-datos-debe-incluir">Qué datos debe incluir</h2>
      <p>
        Para que una factura de combustible sea completa y te sirva para
        deducir, debe llevar como mínimo estos elementos. Revísalos en cuanto la
        recibas, porque un dato mal puesto (sobre todo tu NIF) la invalida:
      </p>
      <ul>
        <li>
          <strong>Número y fecha</strong> de la factura.
        </li>
        <li>
          <strong>Datos del emisor</strong> (la estación): nombre o razón
          social, NIF y domicilio fiscal.
        </li>
        <li>
          <strong>Tus datos como destinatario</strong>: nombre o razón social,
          NIF y dirección. Este es el dato que diferencia la factura del ticket.
        </li>
        <li>
          <strong>Descripción</strong> de la operación: tipo de combustible y
          litros (o el importe del producto).
        </li>
        <li>
          <strong>Base imponible</strong>, tipo de IVA aplicado y{" "}
          <strong>cuota de IVA</strong> desglosada, además del total.
        </li>
      </ul>
      <p>
        Si falta tu NIF o no aparece el IVA desglosado, no es una factura
        completa, por mucho que ponga «factura» en el encabezado. En ese caso,
        vuelve a solicitarla corregida. Los requisitos exactos de facturación
        están regulados y pueden actualizarse, así que ante cualquier duda
        consulta la sede electrónica de la Agencia Tributaria o a tu asesor: lo
        que aquí ves es la pauta general, no un dictamen para tu caso concreto.
      </p>
      <p>
        Más allá del documento, conviene que tus repostajes tengan coherencia
        con tu actividad. Comparar precios antes de repostar no solo te ahorra
        dinero: deja un rastro de gasto razonable y bien justificado. Mira{" "}
        <Link href="/guias/cuanto-se-ahorra-comparando-gasolineras">
          cuánto se ahorra comparando gasolineras
        </Link>{" "}
        para hacerte una idea del margen real.
      </p>

      <AppCta
        title="Compara el precio real antes de repostar"
        body="En Carburantes ves el precio oficial de cada gasolinera con datos del Ministerio. Busca por municipio, pulsa «Cerca de mí» o planifica la ruta, y reposta donde más te convenga antes de pedir tu factura."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/deducir-iva-gasolina-autonomo", label: "Deducir el IVA del combustible" },
          { href: "/guias/pagar-gasolina-movil-app", label: "Pagar con el móvil" },
          { href: "/guias/tarjetas-combustible-empresa", label: "Tarjetas para empresas" },
        ]}
      />
    </>
  );
}

export default guide;
