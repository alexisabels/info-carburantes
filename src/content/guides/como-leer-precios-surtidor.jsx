import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "como-leer-precios-surtidor";
const title = "Cómo leer los precios y el surtidor de una gasolinera";
const description =
  "Carteles, etiquetas E5/B7, precio con y sin descuento, autoservicio... Te explicamos cómo leer correctamente los precios y el surtidor para no llevarte sorpresas.";

const guide = {
  slug,
  title,
  seoTitle: "Cómo leer el surtidor y los precios · Guía",
  description,
  category: "practico",
  datePublished: "2026-05-28",
  dateModified: "2026-05-28",
  readingMinutes: 6,
  keywords: [
    "cómo leer surtidor gasolinera",
    "precios gasolinera cartel",
    "etiqueta surtidor e5 b7",
    "precio con descuento gasolinera",
  ],
  mentions: [
    { "@type": "Thing", name: "E5" },
    { "@type": "Thing", name: "B7" },
  ],
  faq: [
    {
      q: "¿El precio del cartel incluye descuentos?",
      a: "Casi nunca. El gran cartel luminoso de la entrada muestra el Precio de Venta al Público (PVP) general, el mismo que la estación está obligada a comunicar al Ministerio. Los descuentos por tarjeta de fidelización, app o pago en efectivo se aplican después, normalmente en el tique o en el cargo de la tarjeta, no en el número que ves desde la carretera. Algunas low cost sí anuncian su precio ya rebajado, pero son la excepción. La regla práctica: el cartel es el precio máximo que vas a pagar, y cualquier descuento solo lo reduce a partir de ahí.",
    },
    {
      q: "¿Qué significan E5, E10 y B7 en el surtidor?",
      a: "Son las etiquetas europeas obligatorias desde 2018 que indican el tipo de combustible. La letra señala la familia: E para gasolinas (contienen etanol) y B para diésel (contienen biodiésel). El número es el porcentaje máximo de biocomponente. E5 es la gasolina con hasta un 5 % de bioetanol (la habitual en España), E10 lleva hasta un 10 %, y B7 es el gasóleo con hasta un 7 % de biodiésel, que es el diésel normal que repostas a diario. Estas etiquetas aparecen en un rombo (gasolinas), cuadrado (diésel) o rombo girado (gases) tanto en el surtidor como en la tapa del depósito de tu coche, para que casen a simple vista.",
    },
    {
      q: "¿Cómo sé qué manguera es la mía?",
      a: "Mira primero la etiqueta de la tapa de tu depósito: ahí pone E5, E10, B7 u otra. Luego busca en el surtidor la manguera con esa misma etiqueta y comprueba el nombre comercial y el precio en la pantalla antes de coger la pistola. No te fíes solo del color del mango, porque no está estandarizado y varía entre marcas: el verde puede ser gasolina en una estación y otra cosa en otra. Si dudas, el orden de las pistolas suele ir de izquierda a derecha del combustible más barato al más caro, pero confirma siempre la etiqueta.",
    },
    {
      q: "¿El precio es por litro?",
      a: "Sí. En España, por ley, todos los precios de carburante se expresan en euros por litro, con tres decimales (por ejemplo 1,549 €/L). Ese tercer decimal es real: a la hora de cobrar, el importe total se redondea, pero el precio unitario que ves en el cartel y en el surtidor incluye milésimas. La pantalla del surtidor te muestra en tiempo real tres datos mientras repostas: los litros servidos, el importe en euros y el precio por litro aplicado. Para comparar entre gasolineras siempre fíjate en el euros por litro, nunca en lo que pagaste de total, porque depende de cuánto echaste.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Para no llevarte sorpresas, fíjate en tres cosas en este orden: el{" "}
        <strong>cartel de la entrada</strong> te da el precio de referencia por
        litro (normalmente <em>sin</em> descuentos), la <strong>etiqueta</strong>{" "}
        del surtidor (E5, E10, B7…) te confirma que coges la manguera correcta, y
        la <strong>pantalla del surtidor</strong> te muestra litros, euros y
        precio aplicado mientras repostas. El descuento, si lo hay, casi siempre
        se aplica al final, en el tique o en el cargo de tu tarjeta.
      </Answer>

      <Tldr
        items={[
          "El cartel grande muestra el PVP por litro, casi siempre antes de descuentos.",
          "Las etiquetas E5/E10/B7 indican el combustible: deben coincidir con la tapa de tu depósito.",
          "El precio se da en €/litro con tres decimales; compara siempre por litro, no por total.",
          "El color del mango de la pistola no está estandarizado: fíjate en la etiqueta, no en el color.",
          "El descuento real se ve en el tique o en el cargo, no en el número de la carretera.",
        ]}
      />

      <h2 id="cartel-entrada">El cartel de precios de la entrada</h2>
      <p>
        El gran tótem luminoso que ves desde la carretera no es decoración: es
        información regulada. Toda gasolinera está obligada a mostrar de forma
        visible el Precio de Venta al Público (PVP) de los carburantes que
        vende, y ese mismo precio es el que comunica varias veces al día al
        Ministerio, que es de donde Carburantes lee los datos. Por eso el número
        del cartel debería coincidir con el que ves en la app… salvo por un
        matiz importante que veremos enseguida.
      </p>
      <p>
        Lo que conviene entender es qué precio es ese número. En la inmensa
        mayoría de estaciones, el cartel muestra el <strong>precio general sin
        descuentos</strong>: lo que pagaría cualquiera que pasara sin tarjeta de
        fidelización, sin app y sin promoción. Es, en la práctica, el precio
        máximo que vas a pagar. Cualquier descuento posterior solo puede bajarlo.
      </p>
      <ul>
        <li>
          <strong>Petroleras de marca</strong> (Repsol, Cepsa, BP, Galp…):
          el cartel suele mostrar el precio general; el descuento por tarjeta o
          por pago con su app se resta después.
        </li>
        <li>
          <strong>Low cost y automáticas</strong>: a veces el cartel ya refleja
          su precio bajo definitivo, sin más rebajas. Por eso suelen ser más
          baratas de cara. Lo explicamos en{" "}
          <Link href="/guias/gasolineras-low-cost">esta guía sobre gasolineras
          low cost</Link>.
        </li>
        <li>
          <strong>Supermercados</strong> (Carrefour, Eroski, Alcampo…): el
          cartel muestra su precio, y el descuento por ser cliente o por compra
          mínima se aplica aparte.
        </li>
      </ul>
      <p>
        Detalle que despista a mucha gente: la ley exige mostrar el precio con
        tres decimales (por ejemplo 1,549 €/L). Ese tercer decimal —la
        milésima— es real y cuenta para el cálculo. No es un truco visual para
        que parezca más barato, aunque a efectos psicológicos funcione así.
      </p>

      <h2 id="surtidor-etiquetas">El surtidor: mangueras y etiquetas</h2>
      <p>
        Una vez aparcas junto al surtidor, el riesgo cambia: ya no es pagar de
        más, es <strong>equivocarte de combustible</strong>. Para evitarlo
        existe un sistema de etiquetado europeo, obligatorio en toda la UE desde
        2018, que aparece tanto en el surtidor como en la tapa de tu depósito.
        La idea es simple: que ambas etiquetas casen a la vista.
      </p>
      <p>
        Cada etiqueta tiene una forma y un código:
      </p>
      <ul>
        <li>
          <strong>Rombo</strong> = gasolinas. La letra <strong>E</strong>
          (etanol) más un número: <strong>E5</strong> (hasta 5 % de bioetanol,
          la habitual), <strong>E10</strong> (hasta 10 %) o E85.
        </li>
        <li>
          <strong>Cuadrado</strong> = diésel. La letra <strong>B</strong>
          (biodiésel) más un número: <strong>B7</strong> es el gasóleo A
          normal de toda la vida (hasta 7 % de biodiésel), y verás también B10
          o XTL en algunos casos.
        </li>
        <li>
          <strong>Rombo girado</strong> = gases: <strong>LPG</strong> (GLP o
          autogás), <strong>CNG</strong> (gas natural comprimido) o H2
          (hidrógeno).
        </li>
      </ul>
      <p>
        El error más común es fiarse del <strong>color del mango</strong> de la
        pistola. No te fíes: el color <em>no está estandarizado</em> en España y
        cambia de una marca a otra. El verde es gasolina en unas estaciones y
        diésel en otras; el negro, lo contrario. La única referencia fiable es
        la etiqueta E/B y el nombre comercial del producto. Si quieres tenerlo
        todo claro antes de salir de casa, repasa la{" "}
        <Link href="/guias/etiqueta-dgt-combustible">guía de etiquetas DGT y de
        combustible</Link>.
      </p>

      <Callout type="warn" title="Si te equivocas de manguera, NO arranques">
        Echar gasolina a un diésel (o al revés) es un error caro pero
        recuperable si actúas rápido. La regla de oro: si te das cuenta antes de
        arrancar, no gires la llave. Con el motor sin arrancar, el combustible
        equivocado se queda en el depósito y se puede vaciar sin que llegue al
        sistema de inyección. Tienes el protocolo completo en{" "}
        <Link href="/guias/me-he-equivocado-combustible">qué hacer si te has
        equivocado de combustible</Link>.
      </Callout>

      <h2 id="precio-con-descuento">Precio con descuento vs precio real</h2>
      <p>
        Aquí es donde más gente se lleva la sorpresa, en un sentido o en otro.
        El precio que anuncia una marca en su publicidad («tu gasolina a X
        céntimos menos») rara vez es el que ves en el cartel del tótem. Conviene
        distinguir tres precios distintos:
      </p>

      <CompareTable
        caption="Los tres precios que conviene distinguir (esquema general, 2026)"
        headers={["Precio", "Dónde lo ves", "Qué incluye"]}
        rows={[
          ["PVP del cartel", "Tótem de la entrada y la app", "Precio general, normalmente SIN descuentos"],
          ["Precio con descuento", "Publicidad de la marca / app", "PVP menos tarjeta, app o promoción"],
          ["Precio real pagado", "Tique y cargo en la tarjeta", "Lo que de verdad sale de tu cuenta"],
        ]}
      />

      <p>
        El descuento se aplica casi siempre <strong>al final</strong>: o lo
        descuentan en caja al pasar la tarjeta de fidelización, o te llega como
        un abono posterior en la app, o ves el precio rebajado directamente en
        el tique. Por eso, en el surtidor, vas a ver descontar al precio general
        del cartel. No te asustes: el descuento llega después.
      </p>
      <p>
        El problema es que comparar marcas «por el descuento» es engañoso. Una
        gasolinera que anuncia 12 céntimos de descuento pero parte de un PVP
        alto puede salirte más cara que una low cost sin ninguna promoción. Lo
        único que importa es el <strong>precio final por litro</strong>, y para
        eso lo más honesto es comparar el PVP real de cada estación —que es
        justo lo que hace Carburantes con los datos del Ministerio—. Si te
        interesa el detalle de qué descuentos compensan de verdad, lo
        desglosamos en la guía de{" "}
        <Link href="/guias/descuentos-tarjetas-gasolineras">descuentos y
        tarjetas de gasolineras</Link>.
      </p>

      <h2 id="autoservicio">Repostaje en autoservicio</h2>
      <p>
        Cada vez más estaciones funcionan en modo autoservicio, total o
        parcial: tú mismo manejas el surtidor y pagas en un cajero, en un poste
        de pago o con el móvil, sin atendente. Suelen ser más baratas porque
        ahorran personal. La secuencia típica es:
      </p>
      <ul>
        <li>
          <strong>Identifica el surtidor</strong> por su número (está pintado en
          grande). Lo necesitarás para decirle al cajero o a la app qué surtidor
          estás usando.
        </li>
        <li>
          <strong>Paga o autoriza primero</strong> en muchas automáticas: el
          cajero retiene un importe (por ejemplo, hasta el máximo que indiques)
          y luego te devuelve la diferencia de lo que no llegaste a repostar.
        </li>
        <li>
          <strong>Coge la manguera correcta</strong> comprobando la etiqueta,
          reposta, y la pantalla del surtidor te irá mostrando litros, euros y
          €/L en tiempo real.
        </li>
        <li>
          <strong>Recoge el tique</strong>, que es donde verás el precio real
          aplicado y, si lo hubiera, el descuento ya practicado.
        </li>
      </ul>
      <p>
        Si te incomoda no tener a nadie que te ayude, no pasa nada: el
        funcionamiento es siempre el mismo y la pantalla guía cada paso. Tienes
        el detalle en{" "}
        <Link href="/guias/gasolineras-automaticas-como-funcionan">cómo
        funcionan las gasolineras automáticas</Link>. Y si lo que quieres es
        pagar sin bajarte o sin tarjeta física, mira{" "}
        <Link href="/guias/pagar-gasolina-movil-app">cómo pagar la gasolina con
        el móvil</Link>.
      </p>

      <h2 id="trucos">Trucos para no equivocarte</h2>
      <p>
        Resumiendo lo importante en gestos rápidos que puedes hacer cada vez que
        repostas:
      </p>
      <ul>
        <li>
          <strong>Mira la tapa de tu depósito antes de salir de casa.</strong>{" "}
          Memoriza tu etiqueta (E5, E10, B7…). Así en la estación solo tienes
          que buscar la que coincide.
        </li>
        <li>
          <strong>Lee la pantalla del surtidor antes de apretar el gatillo.</strong>{" "}
          Confirma el nombre del producto y que el precio coincide con el del
          cartel.
        </li>
        <li>
          <strong>Compara siempre por €/litro, no por lo que pagaste.</strong>{" "}
          El total depende de cuánto echaste; el precio unitario es lo
          comparable.
        </li>
        <li>
          <strong>Comprueba que la pantalla está a cero</strong> al empezar, no
          sea que arrastre el repostaje anterior (muy raro, pero gratis de
          mirar).
        </li>
        <li>
          <strong>Guarda el tique</strong> hasta confirmar el cargo: ahí ves el
          precio real y cualquier descuento aplicado.
        </li>
      </ul>
      <p>
        Y el truco que más dinero ahorra no está en el surtidor, sino antes de
        elegir la estación: el precio del cartel varía mucho de una gasolinera a
        otra dentro del mismo municipio, a veces en torno a 15 o 20 céntimos por
        litro entre la más cara y la más barata. Eso, en un depósito de unos 50
        litros, pueden ser varios euros por repostaje. Antes de salir, mira el precio
        real de las que te pillan de paso. Si te interesa cuánto se ahorra de
        media, lo calculamos en{" "}
        <Link href="/guias/cuanto-se-ahorra-comparando-gasolineras">cuánto se
        ahorra comparando gasolineras</Link>.
      </p>

      <AppCta
        title="Comprueba el precio real antes de repostar"
        body="En Carburantes ves el PVP oficial de cada gasolinera, leído del Ministerio. Pulsa «Cerca de mí» o busca por municipio para encontrar la más barata de tu zona y evitar sorpresas en el cartel."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/etiqueta-dgt-combustible", label: "Etiquetas DGT y de combustible" },
          { href: "/guias/repostar-correctamente-pasos", label: "Cómo repostar paso a paso" },
          { href: "/guias/me-he-equivocado-combustible", label: "Me he equivocado de combustible" },
        ]}
      />
    </>
  );
}

export default guide;
