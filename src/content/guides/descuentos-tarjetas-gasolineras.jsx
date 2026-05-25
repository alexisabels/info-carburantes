import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "descuentos-tarjetas-gasolineras";
const title = "Descuentos de tarjetas de gasolinera: Waylet, Solred, BP, Galp...";
const description =
  "Comparamos las principales tarjetas y apps de descuento en gasolineras de España: Repsol Waylet, Cepsa Pay, BP Premier, Galp Frota Online y otras.";

const guide = {
  slug,
  title,
  seoTitle: "Tarjetas y apps de descuento en gasolinera · Guía",
  description,
  category: "ahorro",
  datePublished: "2026-05-25",
  dateModified: "2026-05-25",
  readingMinutes: 7,
  keywords: [
    "tarjeta descuento gasolinera",
    "Waylet Repsol descuento",
    "Cepsa Pay descuento",
    "BP Premier",
    "Galp Frota Online",
    "Solred profesional",
  ],
  mentions: [
    { "@type": "Thing", name: "Waylet" },
    { "@type": "Thing", name: "Cepsa Pay" },
    { "@type": "Thing", name: "BP Premier" },
    { "@type": "Thing", name: "Galp Frota Online" },
  ],
  faq: [
    {
      q: "¿Qué tarjeta de gasolinera tiene el mejor descuento?",
      a: "Para uso particular, las apps de las grandes petroleras (Waylet de Repsol, Cepsa Pay, BP Premier) suelen ofrecer entre 3 y 10 céntimos por litro acumulando promociones. Para uso profesional, las tarjetas Solred, Andamur o DKV pueden llegar a 12-15 céntimos de descuento gracias al modelo de flota.",
    },
    {
      q: "¿Las apps de descuento son gratis?",
      a: "Casi todas son gratuitas para particulares: se descargan, te registras con email y teléfono, y das de alta una tarjeta bancaria. Las tarjetas profesionales (Solred, DKV) tienen condiciones específicas para flotas y suelen requerir alta empresarial.",
    },
    {
      q: "¿Puedo usar varias apps de descuento a la vez?",
      a: "Sí, pero solo una al pagar en cada repostaje. Lo habitual es tener instaladas Waylet, Cepsa Pay y BP Premier y elegir la app correspondiente a la marca de la gasolinera. En low cost como Ballenoil o Plenoil tienes sus propias apps con descuentos para clientes habituales.",
    },
    {
      q: "¿Combinan los descuentos con tarjetas de bancos?",
      a: "Sí. Muchas tarjetas bancarias devuelven entre el 1 % y el 5 % en gasolineras (BBVA, ING, Openbank, Bankinter Multicarburante). Puedes pagar con esa tarjeta dentro de la app de descuento y combinar ambos beneficios.",
    },
    {
      q: "¿Caducan los descuentos acumulados?",
      a: "Depende de la marca. Waylet tiene saldo que no caduca mientras la cuenta esté activa. BP Premier va por puntos canjeables (caducan a 12-24 meses). Las low cost suelen aplicar el descuento al instante, así que no acumulas nada que caduque.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Las principales apps de descuento en gasolineras españolas son{" "}
        <strong>Waylet</strong> (Repsol), <strong>Cepsa Pay</strong>,{" "}
        <strong>BP Premier</strong> y <strong>Galp Frota Online</strong>.
        Ofrecen entre 3 y 10 céntimos por litro de ahorro combinando promociones,
        son gratis para particulares y se gestionan desde el móvil. Para
        uso profesional, las tarjetas de flota (<strong>Solred</strong>,{" "}
        <strong>Andamur</strong>, <strong>DKV</strong>) llegan a 12-15
        céntimos de descuento.
      </Answer>

      <Tldr
        items={[
          "Apps gratis para particulares: 3-10 cént/L de descuento real.",
          "Tarjetas profesionales: 12-15 cént/L para flotas y autónomos.",
          "Se pueden combinar con tarjetas bancarias de cashback (BBVA, ING...).",
          "Cada marca tiene la suya; instala las 3-4 grandes y elige al repostar.",
        ]}
      />

      <h2 id="apps-grandes-marcas">Apps de las grandes marcas</h2>

      <h3>Repsol Waylet</h3>
      <p>
        La app de pago de Repsol funciona en sus ~3.500 estaciones (la mayor
        red de España). Para particulares ofrece:
      </p>
      <ul>
        <li>5 céntimos/L de descuento de bienvenida los primeros repostajes.</li>
        <li>
          Promociones recurrentes: 3-5 céntimos/L en fechas concretas, 10
          céntimos/L en cumpleaños, etc.
        </li>
        <li>
          Sistema de «monedero» Waylet recargable que se puede usar también
          en tiendas y peajes asociados.
        </li>
        <li>
          Integración con Travel Club y otros programas de puntos.
        </li>
      </ul>
      <p>
        <Link href="/marca/repsol">Ver gasolineras Repsol</Link>.
      </p>

      <h3>Cepsa Pay</h3>
      <p>
        Equivalente de <Link href="/marca/cepsa">Cepsa</Link> para sus ~1.700
        estaciones. Características:
      </p>
      <ul>
        <li>
          3-5 céntimos/L acumulables con promociones puntuales en festivos.
        </li>
        <li>
          Programa <em>Star</em> para clientes frecuentes con descuentos
          escalados.
        </li>
        <li>Pago contactless desde el coche, sin bajar.</li>
      </ul>

      <h3>BP Premier (BPme)</h3>
      <p>
        La app de <Link href="/marca/bp">BP</Link> en sus ~700 estaciones.
        Funciona por puntos canjeables por descuento en posteriores
        repostajes:
      </p>
      <ul>
        <li>1 punto por litro repostado.</li>
        <li>
          Multiplicadores ocasionales (×2, ×3) en promociones y días
          especiales.
        </li>
        <li>Canjeables por descuento directo en surtidor.</li>
      </ul>

      <h3>Galp Frota Online</h3>
      <p>
        Originalmente concebida para flotas, <Link href="/marca/galp">Galp</Link>{" "}
        permite el alta personal con:
      </p>
      <ul>
        <li>3-5 céntimos/L de descuento estándar.</li>
        <li>Promociones por geografía (más alto en ciertas provincias).</li>
        <li>Factura mensual única, útil para autónomos.</li>
      </ul>

      <h2 id="apps-low-cost">Apps de las low cost</h2>
      <p>
        Las cadenas <Link href="/marca/ballenoil">Ballenoil</Link>,{" "}
        <Link href="/marca/plenoil">Plenoil</Link> y{" "}
        <Link href="/marca/petroprix">Petroprix</Link> también tienen apps,
        pero con un enfoque distinto: el descuento no es respecto a su precio
        público (que ya es bajo), sino respecto a no usar la app.
      </p>
      <ul>
        <li>
          <strong>Ballenoil</strong>: 1-2 céntimos/L extra para usuarios de
          su app + sorteos mensuales y promociones puntuales.
        </li>
        <li>
          <strong>Plenoil</strong>: descuentos personalizados según el
          número de visitas previas.
        </li>
        <li>
          <strong>Petroprix</strong>: «Petro Money», programa de puntos
          canjeable por descuento.
        </li>
      </ul>

      <h2 id="tarjetas-profesional">Tarjetas profesionales y flotas</h2>
      <p>
        Si eres autónomo, transportista o gestionas una flota, las
        tarjetas profesionales superan a las apps personales. Las
        principales en España son:
      </p>

      <CompareTable
        caption="Tarjetas profesionales más usadas en España"
        headers={["Tarjeta", "Red asociada", "Descuento típico", "Ideal para"]}
        rows={[
          ["Solred (Repsol)", "Repsol + colaboradoras", "4-10 cént/L", "Autónomos y pymes"],
          ["Andamur", "Andamur + asociadas en autopista", "8-15 cént/L", "Transporte pesado"],
          ["DKV Mobility", "Internacional", "5-12 cént/L", "Flotas europeas"],
          ["Cepsa StarFleet", "Cepsa", "5-10 cént/L", "Flotas medianas"],
          ["BP Plus", "BP", "4-9 cént/L", "Comercial y servicios"],
        ]}
      />

      <p>
        Para flotas grandes el descuento puede llegar a los 15-20 céntimos
        por litro gracias a acuerdos directos negociados con la red de
        estaciones. A eso se suma la ventaja de gestión: una sola factura
        mensual, conciliación automática, control de gasto por vehículo,
        etc.
      </p>

      <Callout type="info" title="Bonificación gasóleo profesional">
        Además de los descuentos comerciales, ciertos profesionales del
        transporte por carretera tienen derecho a la{" "}
        <Link href="/guias/bonificacion-gasoleo-profesional">
          devolución parcial del impuesto especial sobre el diésel
        </Link>
        : un mecanismo de la Agencia Tributaria que devuelve 4,9 céntimos
        por litro consumido en vehículos profesionales.
      </Callout>

      <h2 id="tarjetas-banco">Tarjetas bancarias con cashback en gasolinera</h2>
      <p>
        Algunas tarjetas bancarias devuelven un porcentaje del gasto en
        gasolineras, y se pueden combinar con las apps de descuento. Las
        más destacadas en 2026:
      </p>
      <ul>
        <li>
          <strong>BBVA Aqua Carburantes</strong>: 5 % de devolución hasta
          un límite mensual.
        </li>
        <li>
          <strong>ING Sin comisiones</strong>: cashback variable en
          comercios afiliados (incluye varias cadenas de gasolinera).
        </li>
        <li>
          <strong>Bankinter Multicarburante</strong>: 2-4 % en cualquier
          gasolinera.
        </li>
        <li>
          <strong>Revolut Premium / Metal</strong>: cashback genérico que
          aplica también en estaciones de servicio.
        </li>
        <li>
          <strong>Openbank Carburante</strong>: 3 % devolución en
          combustible.
        </li>
      </ul>

      <h2 id="estrategia">La estrategia óptima</h2>
      <p>
        Para un conductor particular en España, la combinación que más
        ahorra:
      </p>
      <ol>
        <li>
          Buscar en <Link href="/cerca">Carburantes</Link> la estación más
          barata cerca (5-15 cént/L de ahorro respecto a la más cara).
        </li>
        <li>
          Si esa estación es <em>premium</em> (Repsol, Cepsa, BP, Galp): usar
          su app (Waylet, Cepsa Pay, BPme, Frota) para 3-8 cént/L
          adicionales.
        </li>
        <li>
          Pagar dentro de la app con tarjeta bancaria de cashback (1-5 %
          adicional sobre el total).
        </li>
        <li>
          Si tu gasolinera habitual es low cost: descargar también su app
          propia para los 1-2 cént/L extra.
        </li>
      </ol>
      <p>
        Combinado, un usuario diligente puede llegar a ahorrar entre
        <strong> 200 € y 500 € al año</strong> en combustible respecto a
        repostar sin estrategia en la primera gasolinera que pille.
      </p>

      <AppCta
        title="Empieza por encontrar la más barata"
        body="Antes de aplicar descuentos, lo más rentable es repostar en una estación competitiva. Carburantes muestra el precio actualizado de cada combustible en cada gasolinera."
        href="/cerca"
        linkLabel="Buscar gasolinera cerca"
      />

      <InternalLinks
        title="Sigue ahorrando"
        links={[
          { href: "/guias/gasolineras-low-cost", label: "Gasolineras low cost: ¿calidad igual?" },
          { href: "/guias/mejor-hora-dia-repostar", label: "Mejor día y hora para repostar" },
          { href: "/guias/conducir-ahorrar-combustible", label: "Cómo conducir gastando menos" },
          { href: "/guias/bonificacion-gasoleo-profesional", label: "Bonificación del gasóleo profesional" },
        ]}
      />
    </>
  );
}

export default guide;
