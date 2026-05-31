import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "pagar-gasolina-movil-app";
const title = "Pagar la gasolina con el móvil: apps de repostaje";
const description =
  "Waylet, Cepsa Pay, Galp Pay, Plenoil... Te explicamos cómo pagar la gasolina desde el móvil sin bajarte del coche y si esas apps ahorran de verdad.";

const guide = {
  slug,
  title,
  seoTitle: "Pagar gasolina con el móvil: apps · Guía",
  description,
  category: "practico",
  datePublished: "2026-05-31",
  dateModified: "2026-05-31",
  readingMinutes: 6,
  keywords: [
    "pagar gasolina con el móvil",
    "waylet",
    "cepsa pay",
    "app repostaje",
    "pagar gasolinera app",
  ],
  mentions: [
    { "@type": "Thing", name: "Waylet" },
    { "@type": "Thing", name: "Cepsa Pay" },
  ],
  faq: [
    {
      q: "¿Se puede pagar la gasolina con el móvil?",
      a: "Sí. La mayoría de las grandes cadenas en España tienen su propia app de pago: Waylet en Repsol, Cepsa Pay en Cepsa, Galp Pay en Galp o la app de Plenoil. Vinculas una tarjeta o cuenta bancaria, eliges el surtidor desde el teléfono y autorizas el pago con tu huella o cara. En muchas estaciones puedes pagar sin pasar por la tienda e incluso sin bajarte del coche. También existe el pago contactless con el propio móvil (Apple Pay o Google Pay) en el datáfono del surtidor, que funciona en casi cualquier gasolinera aunque no tenga app propia.",
    },
    {
      q: "¿Waylet da descuento?",
      a: "Waylet suele aplicar un descuento directo por litro en las estaciones Repsol adheridas, normalmente unos pocos céntimos por litro, además de devolverte un porcentaje en saldo monedero por tus repostajes y compras en tienda. La cifra exacta cambia según la promoción vigente, tu nivel de cliente y si tienes contratada luz o gas con la compañía. No es un descuento fijo garantizado: conviene mirar la promoción del momento dentro de la propia app antes de dar por hecho cuánto vas a ahorrar.",
    },
    {
      q: "¿Es seguro pagar con la app?",
      a: "Sí, igual o más que sacar la tarjeta física. Los datos de tu tarjeta se guardan tokenizados (la app no almacena el número real) y cada pago se confirma con la biometría del teléfono o un PIN. Al no enseñar ni teclear la tarjeta en un datáfono público reduces el riesgo de copiado. Las precauciones son las de siempre: descarga la app oficial desde la tienda de aplicaciones, usa bloqueo de pantalla y desconfía de enlaces o correos que pidan tus datos fuera de la app.",
    },
    {
      q: "¿Necesito bajarme del coche?",
      a: "Depende de la estación. En muchas gasolineras atendidas con app puedes seleccionar el surtidor, autorizar el importe y repostar sin pasar por caja, pero aun así tienes que salir para coger la manguera y llenar el depósito. Bajarte del coche por completo es inevitable salvo que sea una estación con servicio de atención que reposte por ti. Lo que las apps te ahorran de verdad es la cola de la tienda y el paso por el datáfono, no el acto físico de repostar.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Sí, puedes pagar la gasolina con el móvil. Las grandes cadenas tienen
        su propia app —<strong>Waylet</strong> (Repsol), <strong>Cepsa Pay</strong>,
        Galp Pay o la de Plenoil— que te permite elegir el surtidor desde el
        teléfono, autorizar el importe con la huella y marcharte sin pasar por
        la tienda. Además, casi cualquier gasolinera acepta hoy el pago
        contactless con Apple Pay o Google Pay en el datáfono del surtidor. La
        comodidad es real; el ahorro, en cambio, depende de la promoción del
        momento.
      </Answer>

      <Tldr
        items={[
          "Las apps de marca (Waylet, Cepsa Pay, Galp Pay, Plenoil) pagan desde el móvil y suelen sumar descuento y devolución en saldo.",
          "Si no hay app, el contactless del móvil en el datáfono funciona en casi cualquier estación.",
          "Te ahorran la cola y el datáfono, no el acto de repostar: salvo atención plena, sigues bajándote a coger la manguera.",
          "El descuento típico ronda unos céntimos por litro, pero varía con cada promoción: míralo en la app.",
          "El precio de partida manda: una app barata en una estación cara no compensa frente a una low cost cercana.",
        ]}
      />

      <h2 id="como-funciona">Cómo funciona el pago por app</h2>
      <p>
        El proceso es muy parecido en todas las apps de repostaje. La primera
        vez te registras, verificas tu identidad y vinculas un medio de pago:
        una tarjeta bancaria, una cuenta o, en algunos casos, una tarjeta de
        la propia compañía. A partir de ahí, repostar se reduce a estos pasos:
      </p>
      <ul>
        <li>
          Abres la app al llegar y compruebas que estás en una estación
          adherida (la app te geolocaliza o eliges la estación de una lista).
        </li>
        <li>
          Seleccionas el <strong>número del surtidor</strong> en el que has
          aparcado y, en algunas apps, el importe máximo a autorizar.
        </li>
        <li>
          Confirmas el pago con tu <strong>huella, cara o un PIN</strong>. La
          app preautoriza un importe y libera el surtidor.
        </li>
        <li>
          Repostas con normalidad. Al colgar la manguera, la app ajusta el
          cobro a los litros reales y te manda el tique digital.
        </li>
      </ul>
      <p>
        Junto a este modelo «de marca» convive el más universal:{" "}
        <strong>el pago contactless con el propio teléfono</strong>. No
        necesitas ninguna app especial, solo tener Apple Pay o Google Pay
        configurado. Acercas el móvil al datáfono del surtidor desatendido o
        de la tienda y listo. No te da descuentos, pero funciona prácticamente
        en cualquier gasolinera, incluidas las{" "}
        <Link href="/guias/gasolineras-automaticas-como-funcionan">
          estaciones automáticas sin personal
        </Link>
        .
      </p>

      <h2 id="apps-espana">Las principales apps en España</h2>
      <p>
        Cada cadena empuja su propia aplicación porque le permite fidelizar y
        conocer a sus clientes. Estas son las más extendidas, con la idea de
        que <strong>los detalles concretos de cada promoción cambian a
        menudo</strong> y conviene confirmarlos dentro de la propia app:
      </p>
      <ul>
        <li>
          <strong>Waylet (Repsol)</strong>: la más usada de España, no solo
          para gasolina. Aplica descuento por litro en estaciones adheridas y
          devuelve un porcentaje en saldo monedero que luego puedes gastar en
          la propia red o en comercios asociados.
        </li>
        <li>
          <strong>Cepsa Pay</strong>: integrada en la app de Cepsa, paga el
          repostaje y acumula puntos del programa de fidelización. Suele
          ofrecer descuento por litro y promociones ligadas a contratar otros
          servicios de la compañía.
        </li>
        <li>
          <strong>Galp Pay</strong>: el pago móvil de Galp, con descuento por
          litro y ventajas en lavado y tienda según la promoción.
        </li>
        <li>
          <strong>Plenoil y otras low cost</strong>: varias cadenas{" "}
          <Link href="/guias/gasolineras-low-cost">low cost</Link> tienen app
          propia que sirve sobre todo para pagar cómodo en estaciones
          desatendidas; el descuento suele ser menor porque su precio de
          partida ya es bajo.
        </li>
        <li>
          <strong>Apps multimarca y de bancos</strong>: algunos monederos y
          apps bancarias permiten pagar combustible con cashback puntual. Son
          un complemento, no sustituyen a las apps de cadena.
        </li>
      </ul>

      <Callout type="info" title="Una app no te ata a una marca">
        Tener Waylet no te obliga a repostar siempre en Repsol, ni Cepsa Pay a
        ir solo a Cepsa. Puedes llevar varias apps instaladas y usar la que
        toque según dónde te pille y, sobre todo, según dónde esté el mejor
        precio ese día. El móvil es la herramienta de pago; la decisión de
        dónde repostar deberías tomarla mirando el precio real.
      </Callout>

      <h2 id="ventajas">Ventajas: cola, descuentos y tique</h2>
      <p>
        El argumento de venta de estas apps no es uno solo, sino la suma de
        varias comodidades:
      </p>
      <ul>
        <li>
          <strong>Te saltas la cola de la tienda.</strong> En horas punta, no
          tener que entrar a pagar y hacer fila es la ventaja más tangible,
          sobre todo en estaciones grandes con mucho tránsito.
        </li>
        <li>
          <strong>Descuento por litro y devolución en saldo.</strong> Muchas
          apps rebajan unos céntimos por litro en el acto y, además, te
          devuelven un porcentaje en un monedero virtual para próximos gastos.
        </li>
        <li>
          <strong>Tique digital y control de gasto.</strong> Cada repostaje
          queda registrado con fecha, litros e importe. Para quien necesita
          justificar gastos o llevar la cuenta del coche, es un histórico
          cómodo. Si repostas por trabajo, conviene compararlo con las{" "}
          <Link href="/guias/tarjetas-combustible-empresa">
            tarjetas de combustible para empresa
          </Link>
          , que están pensadas para eso.
        </li>
        <li>
          <strong>Menos manipulación de tarjeta y efectivo.</strong> Pagas con
          el teléfono que ya llevas en la mano, sin sacar la cartera.
        </li>
      </ul>

      <h2 id="ahorran-de-verdad">¿Ahorran de verdad?</h2>
      <p>
        Aquí conviene ser honesto. Las apps <em>pueden</em> ahorrar, pero
        mucho menos de lo que sugiere el marketing, y el ahorro depende de
        factores que cambian constantemente. El descuento directo por litro
        suele moverse en torno a unos pocos céntimos, y la devolución en saldo
        es real pero está atada a que sigas comprando en la misma red para
        gastarlo.
      </p>
      <p>
        El problema es de orden de magnitud. La diferencia de precio{" "}
        <strong>entre una gasolinera y otra</strong> en una misma ciudad puede
        ser de varios céntimos por litro, bastante más que el descuento medio
        de una app. Dicho de otra forma: una app que te rebaja un poco en una
        estación cara puede salirte más cara que pagar a pelo en una estación
        barata. Lo desarrollamos en{" "}
        <Link href="/guias/cuanto-se-ahorra-comparando-gasolineras">
          cuánto se ahorra comparando gasolineras
        </Link>
        .
      </p>

      <CompareTable
        caption="Formas de pagar el repostaje (datos típicos en España, 2026)"
        headers={["Método", "Comodidad", "Ahorro potencial", "Dónde funciona"]}
        rows={[
          ["App de marca (Waylet, Cepsa Pay...)", "Alta: sin cola ni datáfono", "Descuento + saldo (variable)", "Estaciones de esa cadena adheridas"],
          ["Contactless del móvil (Apple/Google Pay)", "Alta: acercar y pagar", "Ninguno por sí mismo", "Casi cualquier gasolinera"],
          ["Tarjeta física en datáfono", "Media: hay que sacarla", "Solo si la tarjeta da cashback", "Cualquier gasolinera"],
          ["App + elegir estación barata", "Alta", "El mayor (precio bajo + descuento)", "Donde coincidan ambas cosas"],
        ]}
      />

      <p>
        La conclusión práctica: usa la app por comodidad y por el extra que te
        dé, pero <strong>la primera decisión sigue siendo el precio de
        partida</strong>. El ahorro grande está en elegir bien la gasolinera,
        no en la app. Y eso es justo lo que puedes comprobar antes de salir de
        casa.
      </p>

      <AppCta
        title="Mira el precio real antes de elegir app"
        body="En Carburantes ves el precio oficial de cada gasolinera con datos del Ministerio. Busca por municipio o pulsa «Cerca de mí» y elige primero la estación más barata; el descuento de la app vendrá después."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <h2 id="seguridad-privacidad">Seguridad y privacidad</h2>
      <p>
        Pagar con el móvil es, en lo técnico, tan seguro o más que usar la
        tarjeta física. Cuando vinculas una tarjeta, la app no guarda el número
        real: trabaja con un <strong>token</strong>, un identificador que solo
        sirve para esa app y que no permite reconstruir tu tarjeta. Cada pago
        se confirma con tu biometría o un PIN, así que aunque pierdas el
        teléfono nadie puede repostar sin desbloquearlo.
      </p>
      <ul>
        <li>
          <strong>Descarga solo la app oficial</strong> desde App Store o
          Google Play, comprobando el desarrollador. Evita enlaces que llegan
          por SMS o correo.
        </li>
        <li>
          <strong>Activa el bloqueo del teléfono</strong> (huella, cara o
          código). Es tu primera barrera y la que protege el pago.
        </li>
        <li>
          <strong>Desconfía del phishing.</strong> Ninguna app te pedirá la
          contraseña o el PIN completo por correo. Si algo huele raro, entra a
          la app escribiendo el nombre, no pulsando un enlace.
        </li>
        <li>
          <strong>Revisa los permisos y los datos.</strong> Estas apps usan tu
          ubicación y tu historial de repostajes para promociones. Es legítimo,
          pero conviene saber qué compartes y poder limitarlo en los ajustes.
        </li>
      </ul>
      <p>
        En cuanto a privacidad, la contrapartida de las ventajas es que la
        compañía conoce dónde y cuándo repostas. Para muchos conductores es un
        intercambio asumible a cambio de descuentos; si te incomoda, el
        contactless genérico del móvil te deja pagar cómodo sin entregar ese
        historial a una marca concreta.
      </p>

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/descuentos-tarjetas-gasolineras", label: "Descuentos y tarjetas" },
          { href: "/guias/tarjetas-combustible-empresa", label: "Tarjetas para empresas" },
          { href: "/guias/gasolineras-automaticas-como-funcionan", label: "Gasolineras automáticas" },
        ]}
      />
    </>
  );
}

export default guide;
