import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "deducir-iva-gasolina-autonomo";
const title = "Cómo deducir el IVA de la gasolina siendo autónomo";
const description =
  "Los autónomos pueden deducir parte o todo el IVA del combustible. Te explicamos los porcentajes, qué factura necesitas y cómo justificar el gasto ante Hacienda.";

const guide = {
  slug,
  title,
  seoTitle: "Deducir el IVA de la gasolina (autónomos) · Guía",
  description,
  category: "normativa",
  datePublished: "2026-05-30",
  dateModified: "2026-05-30",
  readingMinutes: 6,
  keywords: [
    "deducir iva gasolina autónomo",
    "iva combustible autónomos",
    "desgravar gasolina autónomo",
    "gastos combustible autónomo",
  ],
  mentions: [
    { "@type": "Thing", name: "IVA" },
    { "@type": "Thing", name: "Hacienda" },
  ],
  faq: [
    {
      q: "¿Puedo deducir el IVA de la gasolina como autónomo?",
      a: "Sí, siempre que el vehículo esté afecto a tu actividad económica y tengas factura completa a tu nombre o con tu NIF. Como regla general, Hacienda admite deducir el 50 % del IVA del combustible cuando el coche se usa de forma mixta (trabajo y vida privada), porque presume esa afectación parcial. Para deducir el 100 % tienes que demostrar que el vehículo se dedica en exclusiva a la actividad, algo que solo suele aceptarse en ciertos casos como vehículos industriales, taxis, autoescuelas o transporte de mercancías. La normativa puede cambiar y la interpretación de Hacienda es estricta, así que conviene confirmarlo con tu gestor.",
    },
    {
      q: "¿Cuánto IVA me puedo deducir?",
      a: "Por defecto, el 50 % del IVA soportado en el combustible si el vehículo es de uso mixto. Sobre un repostaje con un IVA de unos 10 euros, eso supone recuperar en torno a 5 euros vía liquidación trimestral. Si acreditas afectación exclusiva a la actividad (por ejemplo, una furgoneta de reparto rotulada que no usas para nada personal), puedes llegar al 100 %. Existen actividades con presunción del 100 % por ley, como el transporte de viajeros o mercancías. Estos porcentajes son orientativos y dependen de tu caso concreto.",
    },
    {
      q: "¿Vale el ticket o necesito factura?",
      a: "Para deducir el IVA necesitas factura completa, no el ticket simplificado del surtidor. La factura debe incluir tus datos fiscales (nombre o razón social y NIF), los datos de la gasolinera, la base imponible, el tipo de IVA y la cuota. El ticket normal no identifica al comprador, por eso no permite deducir el IVA aunque sí pueda servir como justificante parcial del gasto en algunos supuestos. Pide siempre la factura en la tienda de la estación o por su web indicando tu NIF.",
    },
    {
      q: "¿Cómo demuestro el uso profesional?",
      a: "Hacienda admite cualquier medio de prueba válido en derecho. Lo más habitual es combinar varios: facturas a tu nombre, un libro de kilómetros o registro de desplazamientos, agenda de visitas a clientes, rotulación del vehículo, contratos o albaranes que justifiquen las rutas, y coherencia entre el gasto en combustible y tu volumen de actividad. Cuanto más documentada esté la relación entre los repostajes y tu trabajo, más sólida es la deducción si te revisan.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Sí, un autónomo puede deducir el IVA del combustible, pero con
        matices. Si el coche es de <strong>uso mixto</strong> (trabajo y vida
        personal), Hacienda admite deducir por defecto el <strong>50 %</strong>{" "}
        del IVA soportado. Para llegar al <strong>100 %</strong> tienes que
        demostrar que el vehículo está afecto en exclusiva a la actividad. En
        ambos casos necesitas <strong>factura completa</strong> con tu NIF: el
        ticket del surtidor no sirve para deducir el IVA.
      </Answer>

      <Tldr
        items={[
          "El 50 % del IVA es la deducción por defecto en vehículos de uso mixto.",
          "El 100 % exige acreditar afectación exclusiva a la actividad (furgonetas, taxis, transporte…).",
          "Sin factura completa con tu NIF no hay deducción de IVA: el ticket no basta.",
          "Guarda pruebas del uso profesional: facturas, libro de kilómetros y rutas.",
          "La normativa cambia y la interpretación es estricta: confírmalo con tu gestor.",
        ]}
      />

      <h2 id="se-puede-deducir-iva-combustible">
        ¿Se puede deducir el IVA del combustible?
      </h2>
      <p>
        Sí. Un autónomo que tributa en régimen general de IVA puede deducir el
        IVA de la gasolina o el gasóleo siempre que el vehículo esté afecto a
        su actividad económica y disponga de factura completa. Es un derecho
        reconocido en la Ley del IVA, pero sometido a reglas concretas sobre
        cuánto puedes deducir y cómo debes justificarlo.
      </p>
      <p>
        La clave está en el concepto de <strong>afectación</strong>: en qué
        medida ese coche o esa furgoneta se usan realmente para trabajar.
        Hacienda parte de una presunción razonable —que un vehículo turismo
        normal se usa tanto para el trabajo como para la vida privada— y de
        ahí salen los dos escenarios típicos: deducir el 50 % o deducir el
        100 %. No es lo mismo el IVA del combustible que el gasto en sí a
        efectos de IRPF, así que conviene no mezclar ambos conceptos.
      </p>
      <p>
        Antes de nada, una advertencia que recorre toda esta guía: la
        normativa fiscal cambia con frecuencia y la interpretación de la
        Agencia Tributaria es estricta. Lo que aquí contamos es el marco
        general en 2026; tu caso concreto conviene confirmarlo con un asesor o
        gestor y, ante la duda, consultar la fuente oficial.
      </p>

      <Callout type="info" title="IVA y IRPF no son lo mismo">
        En esta guía hablamos del <strong>IVA</strong> del combustible (lo que
        recuperas en tus liquidaciones trimestrales, modelo 303). El gasto del
        combustible también puede deducirse en el <strong>IRPF</strong> como
        gasto de la actividad, pero ahí las reglas de afectación del vehículo
        son aún más exigentes. Son dos impuestos distintos con criterios
        diferentes: no asumas que porque deduces el 50 % del IVA puedes deducir
        automáticamente el gasto en renta.
      </Callout>

      <h2 id="50-por-defecto-y-100">El 50 % por defecto y el 100 %</h2>
      <p>
        La regla general para un coche turismo de uso mixto es deducir el{" "}
        <strong>50 % del IVA</strong> del combustible. Hacienda presume esa
        afectación parcial sin que tengas que demostrarla, igual que con la
        compra del propio vehículo. Es el escenario más común para comerciales,
        consultores, profesionales que se desplazan a clientes y, en general,
        cualquier autónomo con un coche que también usa fuera del trabajo.
      </p>
      <p>
        El <strong>100 %</strong> es posible, pero hay que ganárselo. Debes
        acreditar que el vehículo se dedica <strong>en exclusiva</strong> a la
        actividad, sin uso personal. La ley reconoce además algunos casos con
        presunción directa del 100 %, entre ellos:
      </p>
      <ul>
        <li>
          <strong>Vehículos industriales</strong> y mixtos para el transporte
          de mercancías (furgonetas de reparto, por ejemplo).
        </li>
        <li>
          <strong>Transporte de viajeros</strong> mediante contraprestación
          (taxis, VTC).
        </li>
        <li>
          Vehículos usados en la <strong>enseñanza de conductores</strong>{" "}
          (autoescuelas).
        </li>
        <li>
          Vehículos de <strong>vigilancia</strong> o usados por
          representantes/agentes comerciales en sus desplazamientos
          profesionales.
        </li>
      </ul>
      <p>
        Fuera de esos supuestos, conseguir el 100 % en un turismo normal es
        complicado: tendrás que probar que no lo usas nunca para fines
        privados, algo que Hacienda revisa con lupa. Por eso la inmensa mayoría
        de autónomos con coche se quedan en el 50 %.
      </p>

      <CompareTable
        caption="Deducción del IVA del combustible según el vehículo (marco general en España, 2026)"
        headers={["Tipo de vehículo / uso", "IVA deducible (orientativo)", "Qué necesitas justificar"]}
        rows={[
          ["Turismo de uso mixto", "~50 %", "Factura con tu NIF; afectación presunta"],
          ["Turismo afecto en exclusiva", "hasta 100 %", "Prueba de uso solo profesional"],
          ["Furgoneta / vehículo industrial", "100 %", "Naturaleza del vehículo y factura"],
          ["Taxi, VTC, autoescuela", "100 %", "Actividad con presunción legal"],
          ["Sin factura completa (solo ticket)", "0 %", "No hay deducción de IVA"],
        ]}
      />

      <Callout type="warn" title="No infles la afectación «por si cuela»">
        Deducir el 100 % de un turismo que usas también el fin de semana es
        una de las regularizaciones más típicas en una inspección. Si no
        puedes probar el uso exclusivo, Hacienda te limitará al 50 %, te
        reclamará la diferencia y podrá añadir recargo o sanción. Ante la
        duda, deduce el 50 % y duerme tranquilo.
      </Callout>

      <h2 id="que-factura-necesitas">Qué factura necesitas</h2>
      <p>
        Para deducir el IVA necesitas una <strong>factura completa</strong>, no
        el ticket simplificado que escupe el surtidor. Es el error más
        frecuente: el conductor guarda el tique del repostaje pensando que ya
        está, pero ese documento no identifica al comprador y, por tanto, no
        habilita la deducción del IVA.
      </p>
      <p>Una factura válida del combustible debe incluir, como mínimo:</p>
      <ul>
        <li>
          Tus <strong>datos fiscales</strong>: nombre o razón social y{" "}
          <strong>NIF</strong>.
        </li>
        <li>Datos de la gasolinera (nombre, NIF y domicilio).</li>
        <li>Número de factura y fecha.</li>
        <li>
          Descripción del producto (litros, tipo de combustible), la{" "}
          <strong>base imponible</strong>, el <strong>tipo de IVA</strong> y la{" "}
          <strong>cuota</strong> de IVA desglosada.
        </li>
      </ul>
      <p>
        En la práctica, casi todas las estaciones te emiten la factura en la
        tienda si la pides en el momento, o a posteriori desde su web
        introduciendo el número de ticket y tu NIF. Si repostas a menudo en la
        misma marca, las{" "}
        <Link href="/guias/tarjetas-combustible-empresa">
          tarjetas de combustible para empresas
        </Link>{" "}
        simplifican mucho esto: agrupan todos los repostajes en una factura
        mensual con el desglose de IVA listo para tu gestoría. Tienes el
        detalle de qué pedir y cómo conservarlo en la guía sobre la{" "}
        <Link href="/guias/factura-gasolina-autonomo">
          factura de gasolina para autónomos
        </Link>
        .
      </p>

      <h2 id="justificar-uso-profesional">
        Cómo justificar el uso profesional
      </h2>
      <p>
        Justificar el uso profesional consiste en acreditar que ese combustible
        se gasta para trabajar. Hacienda admite cualquier medio de prueba
        válido en derecho, así que cuanto más documentes la relación entre tus
        repostajes y tu actividad, más sólida será la deducción si te revisan.
      </p>
      <p>Lo más eficaz es combinar varias evidencias:</p>
      <ul>
        <li>
          <strong>Facturas a tu nombre</strong>, ordenadas por fecha y
          conservadas durante el plazo legal de prescripción.
        </li>
        <li>
          Un <strong>libro o registro de kilómetros</strong>: fecha, ruta,
          motivo del desplazamiento y cliente. Cruza esos kilómetros con el
          consumo del coche para que cuadren con el combustible repostado.
        </li>
        <li>
          <strong>Agenda de visitas, albaranes o contratos</strong> que
          respalden las rutas (a qué cliente fuiste y por qué).
        </li>
        <li>
          <strong>Rotulación del vehículo</strong> con tu marca o actividad,
          un indicio claro de afectación.
        </li>
        <li>
          <strong>Coherencia económica</strong>: que el gasto en combustible
          guarde proporción con tu facturación y tu tipo de actividad.
        </li>
      </ul>
      <p>
        Esta documentación es la que marca la diferencia entre una deducción
        que aguanta una revisión y otra que no. No hace falta llevar una
        contabilidad de detective, pero sí un mínimo orden. Si combinas tus
        rutas reales con repostajes en estaciones bien elegidas —comparando
        antes el precio para no pagar de más—, optimizas a la vez el gasto y su
        justificación.
      </p>

      <AppCta
        title="Compara el precio real antes de repostar"
        body="El IVA lo recuperas en parte, pero el precio del litro lo pagas entero. En Carburantes ves las gasolineras más baratas cerca o en tu ruta con datos oficiales del Ministerio. Cuanto mejor el precio, menos gasto que justificar."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <h2 id="errores-frecuentes-hacienda">Errores frecuentes con Hacienda</h2>
      <p>
        La mayoría de problemas con la deducción del combustible no vienen de
        la mala fe, sino de pequeños descuidos que se repiten. Estos son los
        más habituales:
      </p>
      <ul>
        <li>
          <strong>Deducir solo con el ticket.</strong> Sin factura completa con
          tu NIF, el IVA no es deducible. Es el fallo número uno.
        </li>
        <li>
          <strong>Deducir el 100 % de un turismo de uso mixto.</strong> Si no
          puedes probar el uso exclusivo, te limitarán al 50 % y te
          reclamarán la diferencia.
        </li>
        <li>
          <strong>Olvidar la coherencia.</strong> Repostar más litros de los
          que justifican tus kilómetros profesionales, o gastar en combustible
          de forma desproporcionada a tu facturación, levanta sospechas.
        </li>
        <li>
          <strong>No conservar las facturas.</strong> Si no las guardas durante
          el plazo de prescripción, no podrás defender la deducción en una
          comprobación.
        </li>
        <li>
          <strong>Confundir IVA e IRPF.</strong> Que deduzcas el 50 % del IVA
          no significa que puedas deducir automáticamente el gasto en la
          declaración de la renta; los criterios son distintos.
        </li>
      </ul>
      <p>
        Si tu vehículo es un gasóleo profesional y cumples requisitos, además
        del IVA puede interesarte la{" "}
        <Link href="/guias/bonificacion-gasoleo-profesional">
          bonificación del gasóleo profesional
        </Link>
        , una devolución parcial de impuestos compatible con la deducción del
        IVA. En cualquier caso, recuerda que la normativa puede cambiar y que
        la última palabra la tienen la Agencia Tributaria y tu asesor: usa esta
        guía como mapa, no como sustituto del consejo profesional.
      </p>

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/factura-gasolina-autonomo", label: "Factura de gasolina para autónomos" },
          { href: "/guias/tarjetas-combustible-empresa", label: "Tarjetas para empresas" },
          { href: "/guias/bonificacion-gasoleo-profesional", label: "Bonificación del gasóleo profesional" },
        ]}
      />
    </>
  );
}

export default guide;
