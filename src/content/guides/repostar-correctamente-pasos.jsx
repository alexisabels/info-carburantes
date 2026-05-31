import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "repostar-correctamente-pasos";
const title = "Cómo repostar correctamente paso a paso";
const description =
  "Apaga el motor, elige la manguera correcta, evita derrames y rellena sin pasarte. Guía paso a paso para repostar bien, con o sin personal.";

const guide = {
  slug,
  title,
  seoTitle: "Cómo repostar paso a paso · Guía Carburantes",
  description,
  category: "practico",
  datePublished: "2026-05-30",
  dateModified: "2026-05-30",
  readingMinutes: 5,
  keywords: [
    "cómo repostar paso a paso",
    "repostar correctamente",
    "cómo echar gasolina",
    "primera vez gasolinera",
  ],
  mentions: [{ "@type": "Thing", name: "Surtidor" }],
  faq: [
    {
      q: "¿Hay que apagar el motor para repostar?",
      a: "Sí, siempre. Está obligado por la normativa de seguridad de las estaciones de servicio y aparece señalizado en todos los surtidores. Con el motor en marcha hay componentes calientes y chispas eléctricas cerca de los vapores de combustible, que son inflamables. Apaga el contacto del todo, no lo dejes en posición de accesorios. Si tu coche es híbrido, asegúrate de que el sistema está completamente apagado y no en modo eléctrico listo para arrancar.",
    },
    {
      q: "¿Por qué no debo llenar tras el primer corte?",
      a: "El primer corte automático salta cuando el combustible alcanza el nivel correcto del depósito, dejando un pequeño espacio de aire que el sistema necesita para expandirse con el calor y para que el canister de vapores funcione bien. Si insistes y añades más a golpecitos, ese combustible extra puede rebosar al calentarse, llegar al sistema de recuperación de vapores y estropearlo, o simplemente derramarse. Además no ganas autonomía real apreciable. Cuando salta el corte, has terminado.",
    },
    {
      q: "¿Puedo usar el móvil repostando?",
      a: "La recomendación oficial es no usarlo junto al surtidor. El riesgo real de que un móvil provoque ignición es muy bajo, pero las estaciones lo prohíben por precaución y porque distrae en una zona donde hay vapores y tráfico de vehículos. Si necesitas pagar con la app del móvil, hazlo, pero evita llamadas o juegos mientras manejas la pistola. Lo más importante en seguridad no es el móvil, sino la electricidad estática: toca una parte metálica del coche antes de coger la pistola.",
    },
    {
      q: "¿Cómo sé qué combustible echar?",
      a: "Mira la tapa del depósito o el manual del coche. Suele haber una pegatina con el tipo (un símbolo B7 o XTL para diésel; E5 o E10 para gasolina) y, en gasolina, el octanaje mínimo (RON 95 o RON 98). Como regla rápida: los coches de gasolina llevan boca de llenado estrecha y mangueras de surtidor con boquilla fina; el diésel lleva boca más ancha. Ante la duda, no metas nada y pregunta al personal o consulta el manual. Confundir gasolina y diésel obliga a vaciar el depósito.",
    },
    {
      q: "¿Tengo que esperar a que termine de gotear antes de sacar la pistola?",
      a: "Sí. Tras saltar el corte, deja la pistola dentro unos segundos y levántala un poco antes de retirarla para que escurra el combustible que queda en el caño. Así evitas que caigan gotas en la carrocería o en el suelo. Cuelga la pistola en su sitio y cierra bien el tapón hasta oír el clic; un tapón mal cerrado puede encender el testigo de avería en algunos coches.",
    },
  ],
  Body,
};

guide.howTo = {
  name: "Cómo repostar correctamente paso a paso",
  description:
    "Pasos para repostar combustible de forma segura y sin derrames en una gasolinera, atendida o automática.",
  totalTime: "PT5M",
  steps: [
    {
      name: "Apaga el motor y prepárate",
      text: "Detén el coche con la boca del depósito hacia el surtidor, apaga el motor por completo, abre la tapa del depósito y descarga la electricidad estática tocando una parte metálica.",
      anchor: "antes-de-repostar",
    },
    {
      name: "Elige la manguera y el combustible correctos",
      text: "Comprueba en la tapa o el manual qué combustible pide tu coche y coge la manguera del color y la etiqueta correspondientes. No te fíes solo del color.",
      anchor: "elige-manguera-combustible",
    },
    {
      name: "Introduce la pistola y llena",
      text: "Mete la pistola hasta el fondo de la boca de llenado, apoya el gatillo en la muesca de retención y deja que el combustible entre a ritmo constante sin forzar.",
      anchor: "introducir-pistola-llenar",
    },
    {
      name: "Respeta el corte automático",
      text: "Cuando la pistola corte sola, has terminado. No vuelvas a apretar a golpecitos para redondear el importe ni para apurar el depósito.",
      anchor: "corte-automatico-redondeo",
    },
    {
      name: "Paga y cierra bien",
      text: "Deja escurrir la pistola, cuélgala, cierra el tapón hasta el clic y paga en caja, en el datáfono del surtidor o con la app según el tipo de estación.",
      anchor: "pagar-cerrar-bien",
    },
  ],
};

function Body() {
  return (
    <>
      <Answer>
        Repostar bien es una rutina de cinco pasos: <strong>apaga el motor</strong>,
        elige la manguera del combustible que pide tu coche, introduce la
        pistola hasta el fondo y llena a ritmo normal, <strong>para cuando
        salte el corte automático</strong> (sin insistir para redondear) y
        cierra bien el tapón antes de pagar. Hacerlo así evita derrames, no
        daña el sistema de vapores del depósito y reduce el riesgo de echar
        el combustible equivocado.
      </Answer>

      <Tldr
        items={[
          "Motor apagado siempre: lo exige la normativa de las estaciones.",
          "Confirma el combustible en la tapa del depósito antes de coger la manguera.",
          "Pistola hasta el fondo y llenado a ritmo constante, sin forzar.",
          "Cuando salta el corte automático, has terminado: no rellenes a golpecitos.",
          "Deja escurrir la pistola, cierra el tapón hasta el clic y paga.",
        ]}
      />

      <h2 id="antes-de-repostar">Antes de repostar: apaga y prepara</h2>
      <p>
        Coloca el coche con la <strong>boca del depósito hacia el surtidor</strong>.
        Si no recuerdas de qué lado la tienes, mírala en el cuadro: la flechita
        junto al icono del surtidor apunta al lado correcto. Te ahorra tener
        que estirar la manguera por encima del techo.
      </p>
      <p>
        Con el coche detenido, <strong>apaga el motor por completo</strong>.
        No basta con dejar el contacto en accesorios: corta el encendido del
        todo. Es una norma de seguridad obligatoria en todas las estaciones y
        está señalizada en cada surtidor, porque cerca de la boca de llenado
        hay vapores de combustible que son inflamables. En un híbrido,
        comprueba que el sistema queda apagado y no en modo eléctrico listo
        para arrancar.
      </p>
      <p>
        Abre la tapa del depósito (suele tener un tirador en el coche o se
        empuja directamente) y desenrosca el tapón. Antes de tocar la pistola,
        <strong> descarga la electricidad estática</strong> tocando con la mano
        una parte metálica de la carrocería. Es el gesto de seguridad que más
        se ignora y, sin embargo, el más útil: en días secos y fríos una chispa
        estática es mucho más probable que un problema con el móvil.
      </p>

      <Callout type="warn" title="Lo que no debes hacer mientras repostas">
        Nada de fumar ni encender mecheros, motor apagado, y no vuelvas a
        entrar y salir del coche repetidamente (rozar el asiento recarga
        electricidad estática). Si entras al coche por cualquier motivo,
        vuelve a tocar metal antes de coger la pistola otra vez.
      </Callout>

      <h2 id="elige-manguera-combustible">Elige la manguera y el combustible correctos</h2>
      <p>
        Este es el paso donde más gente se equivoca, sobre todo en una{" "}
        <Link href="/guias/gasolineras-automaticas-como-funcionan">gasolinera
        automática sin personal</Link> o en una estación que no conoces. No te
        fíes solo del color de la manguera: <strong>los colores no son un
        estándar fijo</strong> y cambian entre marcas. Lee siempre la etiqueta.
      </p>
      <p>
        En España, desde 2018, todos los surtidores y tapas de depósito llevan
        las mismas etiquetas europeas:
      </p>
      <ul>
        <li>
          <strong>Gasolina</strong>: un círculo con «E5» o «E10» (el porcentaje
          máximo de bioetanol). Junto al surtidor verás además el octanaje:
          «95» o «98».
        </li>
        <li>
          <strong>Diésel</strong>: un cuadrado con «B7» (diésel normal), «B10»
          o «XTL» (diésel parafínico/sintético tipo HVO).
        </li>
        <li>
          <strong>Gases</strong>: un rombo con «GLP» (autogás) o «GNC» (gas
          natural), con conexión específica.
        </li>
      </ul>
      <p>
        Cruza esa etiqueta con la pegatina de la tapa de tu depósito o con el
        manual del coche. Si tienes cualquier duda sobre qué pone en el panel
        de precios, te lo desglosamos en{" "}
        <Link href="/guias/como-leer-precios-surtidor">cómo leer el surtidor</Link>.
      </p>

      <CompareTable
        caption="Pistas rápidas para identificar el combustible (datos típicos en España, 2026)"
        headers={["Pista", "Gasolina", "Diésel"]}
        rows={[
          ["Etiqueta", "E5 / E10 (círculo)", "B7 / XTL (cuadrado)"],
          ["Octanaje visible", "95 o 98", "—"],
          ["Boca de llenado", "Estrecha", "Más ancha"],
          ["Color habitual de manguera", "Verde (no fiable)", "Negro o amarillo (no fiable)"],
          ["Boquilla de la pistola", "Fina", "Gruesa"],
        ]}
      />

      <Callout type="note" title="La boquilla del diésel no entra en gasolina">
        La pistola de diésel suele ser más gruesa y, en muchos coches de
        gasolina, no entra en la boca estrecha del depósito. Es una protección
        física útil, pero no infalible al revés: la pistola fina de gasolina sí
        entra en un diésel. Por eso la lectura de la etiqueta sigue siendo tu
        seguro principal. Si pese a todo te equivocas, lo primero es no arrancar:
        lo explicamos en{" "}
        <Link href="/guias/me-he-equivocado-combustible">me he equivocado de combustible</Link>.
      </Callout>

      <h2 id="introducir-pistola-llenar">Cómo introducir la pistola y llenar</h2>
      <p>
        Mete la pistola <strong>hasta el fondo de la boca de llenado</strong>,
        bien apoyada y en su posición natural. Si la dejas a medias o ladeada,
        el sensor de corte puede saltar antes de tiempo y darte cortes falsos
        cada pocos segundos.
      </p>
      <p>
        Aprieta el gatillo. Casi todas las pistolas tienen una{" "}
        <strong>muesca de retención</strong> que mantiene el gatillo apretado
        para que no tengas que sujetarlo: úsala, deja que el combustible entre
        a ritmo constante y no fuerces el caudal al máximo si la pistola
        protesta con cortes. No hace falta llenar «a pulsos»: el flujo continuo
        es más limpio y rápido.
      </p>
      <ul>
        <li>
          Mantente <strong>junto al coche</strong> mientras llenas, atento a la
          pistola. No te alejes a hacer otra cosa.
        </li>
        <li>
          Si llenas un bidón homologado, ponlo <strong>en el suelo</strong>,
          nunca dentro del maletero ni sobre una superficie plástica: ahí la
          estática no tiene salida.
        </li>
        <li>
          Decide cuánto echar. Si dudas entre lleno o medio depósito, en{" "}
          <Link href="/guias/lleno-o-medio-deposito">esta guía lo comparamos</Link>{" "}
          (peso, número de paradas y comodidad).
        </li>
      </ul>

      <h2 id="corte-automatico-redondeo">El corte automático y el redondeo</h2>
      <p>
        Cuando el depósito llega a su nivel correcto, la pistola{" "}
        <strong>corta sola</strong>: notarás un golpe seco y el flujo se detiene.
        Eso significa que has terminado. El corte salta porque un pequeño
        conducto en la punta de la pistola detecta que el combustible ha subido
        hasta ahí, y deja a propósito un hueco de aire en la parte alta del
        depósito.
      </p>
      <p>
        Ese hueco no es un defecto: el combustible se <strong>expande con el
        calor</strong> y el sistema de recuperación de vapores (el canister)
        necesita ese espacio para trabajar. Por eso{" "}
        <strong>no debes rellenar a golpecitos</strong> tras el primer corte
        para «redondear» el importe a una cifra bonita o para apurar unos litros
        más. Si insistes:
      </p>
      <ul>
        <li>
          El combustible extra puede <strong>rebosar</strong> al calentarse y
          derramarse por la carrocería.
        </li>
        <li>
          Puedes mandar combustible líquido al <strong>canister de vapores</strong>{" "}
          y estropearlo, una avería cara.
        </li>
        <li>
          No ganas autonomía apreciable: son unos pocos céntimos de litro a
          cambio de un riesgo real.
        </li>
      </ul>
      <p>
        Sobre el dinero: el importe no es redondo porque el precio va por litro
        y el corte cae donde cae. No pasa nada por pagar 47,83 € en lugar de
        50 €. Lo que de verdad mueve el coste de tu lleno no es ese redondeo,
        sino el precio por litro de cada estación, que puede variar bastante en
        una misma ciudad. Antes de salir, compara: muchas veces ahorras más
        eligiendo gasolinera que apurando litros.
      </p>

      <AppCta
        title="Compara el precio antes de repostar"
        body="En Carburantes ves el precio real por litro de cada combustible y cada estación, con datos oficiales del Ministerio. Pulsa «Cerca de mí» o busca por municipio y reposta donde de verdad sale más barato."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <h2 id="pagar-cerrar-bien">Pagar y cerrar bien</h2>
      <p>
        Tras el corte, <strong>deja la pistola dentro unos segundos</strong> y
        levántala ligeramente antes de retirarla, para que escurra el caño y no
        caigan gotas en la pintura ni en el suelo. Cuelga la pistola en su
        soporte y <strong>cierra el tapón hasta oír el clic</strong>: un tapón
        mal cerrado puede encender el testigo de avería del coche en algunos
        modelos.
      </p>
      <p>El paso final depende del tipo de estación:</p>
      <ul>
        <li>
          <strong>Estación atendida</strong>: el surtidor se «reserva» al
          empezar; entras a caja, dices el número de surtidor y pagas. A veces
          el propio empleado reposta por ti.
        </li>
        <li>
          <strong>Estación con datáfono en el surtidor</strong>: pagas con
          tarjeta en el propio poste, normalmente <em>antes</em> de repostar
          (se hace una preautorización) o <em>después</em> según el modelo.
        </li>
        <li>
          <strong>Estación automática 24 h sin personal</strong>: pagas
          primero en el tótem o con la app, y solo entonces se libera la
          manguera. Si te sobra del importe prepagado, te devuelve la diferencia.
          Cómo funcionan al detalle lo explicamos en{" "}
          <Link href="/guias/gasolineras-automaticas-como-funcionan">gasolineras
          automáticas</Link>.
        </li>
      </ul>
      <p>
        Cada vez más estaciones permiten pagar desde el coche con el móvil sin
        bajar al tótem; si te interesa esa opción, mira{" "}
        <Link href="/guias/pagar-gasolina-movil-app">pagar la gasolina con el
        móvil</Link>. Sea cual sea el método, guarda el ticket: te sirve para
        controlar el consumo y, si confundiste de combustible, como prueba.
      </p>

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/me-he-equivocado-combustible", label: "Me he equivocado de combustible" },
          { href: "/guias/como-leer-precios-surtidor", label: "Cómo leer el surtidor" },
          { href: "/guias/gasolineras-automaticas-como-funcionan", label: "Gasolineras automáticas" },
        ]}
      />
    </>
  );
}

export default guide;
