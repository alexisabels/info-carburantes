import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "caduca-la-gasolina-cuanto-dura";
const title = "¿Caduca la gasolina? Cuánto dura en el depósito";
const description =
  "La gasolina y el diésel se degradan con el tiempo. Te explicamos cuánto duran en el depósito o en un bidón, qué les pasa y cómo conservarlos si no usas el coche.";

const guide = {
  slug,
  title,
  seoTitle: "¿Caduca la gasolina? · Guía Carburantes",
  description,
  category: "tipos-combustible",
  datePublished: "2026-05-28",
  dateModified: "2026-05-28",
  readingMinutes: 6,
  keywords: [
    "caduca la gasolina",
    "cuánto dura la gasolina",
    "gasolina vieja",
    "conservar gasolina bidón",
    "diésel caduca",
  ],
  mentions: [
    { "@type": "Thing", name: "Gasolina" },
    { "@type": "Thing", name: "Oxidación" },
  ],
  faq: [
    {
      q: "¿Cuánto dura la gasolina en el depósito?",
      a: "En el depósito de un coche, la gasolina aguanta bien entre tres y seis meses sin problemas apreciables, porque el sistema está cerrado y casi no entra aire. A partir de ahí empieza a perder propiedades poco a poco: los componentes más volátiles se evaporan y la mezcla se oxida. Pasado un año, un coche parado puede arrancar con dificultad o tener ralentí irregular hasta que se consume ese combustible viejo. No hay una fecha de caducidad impresa porque influyen mucho la temperatura, la humedad y lo lleno que esté el depósito; un depósito casi lleno y en un sitio fresco dura bastante más que uno medio vacío al sol.",
    },
    {
      q: "¿Se puede usar gasolina de hace un año?",
      a: "En la mayoría de casos sí, sobre todo si ha estado bien cerrada en un depósito o en un bidón homologado y en un sitio fresco. Lo habitual es que el motor funcione, aunque puede notarse un arranque más perezoso o un ralentí algo irregular las primeras veces, hasta que se quema ese combustible y entra gasolina fresca. La precaución sensata es no llenar todo el depósito solo con esa gasolina vieja: dilúyela mezclándola con bastante combustible nuevo, por ejemplo un cuarto de gasolina vieja y el resto fresca. Si huele a barniz o a rancio, está turbia o ves posos, mejor no usarla y llevarla a un punto limpio.",
    },
    {
      q: "¿El diésel dura más que la gasolina?",
      a: "Sí, el diésel suele conservarse algo mejor que la gasolina porque es menos volátil y no se evapora tan rápido. Bien almacenado puede aguantar del orden de un año o más. Su problema no es tanto la evaporación como la humedad y los microorganismos: el agua que se condensa en el depósito o el bidón favorece la aparición de bacterias y hongos (el llamado lodo o moho del gasóleo) que tapan filtros e inyectores. Por eso, para almacenarlo mucho tiempo, conviene mantener el recipiente lleno y bien cerrado, y usar un aditivo biocida y estabilizante si va a estar parado meses.",
    },
    {
      q: "¿Cómo conservo gasolina de un cortacésped?",
      a: "Guarda la gasolina del cortacésped en un bidón homologado para combustible, bien cerrado, lleno hasta arriba para dejar el mínimo de aire, y en un sitio fresco, ventilado y lejos de chispas o llamas. Para herramientas de jardín que pasan meses guardadas, un estabilizante de gasolina alarga bastante su vida; lo añades al bidón siguiendo las dosis del fabricante. Al final de la temporada, lo ideal es dejar el depósito de la máquina casi vacío o, si lo dejas con combustible, hacerlo con gasolina estabilizada y arrancar el motor un par de minutos para que circule por el carburador. Confirma siempre las normas locales de almacenamiento de combustible en casa, porque hay límites de cantidad.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Sí, la gasolina <strong>se degrada con el tiempo</strong>, aunque no
        lleve fecha de caducidad. En el depósito cerrado de un coche aguanta
        bien <strong>entre tres y seis meses</strong>; pasado un año empieza a
        oxidarse y a perder los componentes volátiles que ayudan a arrancar.
        El diésel suele durar algo más, pero le afecta la humedad. Para
        guardarla, usa un bidón homologado, lleno y bien cerrado, en un sitio
        fresco.
      </Answer>

      <Tldr
        items={[
          "La gasolina no caduca con fecha, pero se degrada: 3-6 meses sin problemas en el depósito.",
          "Pasado un año puede dar arranques perezosos y ralentí irregular; rara vez impide arrancar.",
          "El diésel aguanta algo más, pero la humedad genera lodos que atascan filtros.",
          "Para guardarla: bidón homologado, lleno, bien cerrado y en sitio fresco.",
          "Un estabilizante de combustible alarga la vida cuando vas a tener el coche o la máquina parados meses.",
        ]}
      />

      <h2 id="la-gasolina-caduca">¿La gasolina caduca?</h2>
      <p>
        La gasolina no tiene una fecha de caducidad impresa como un alimento,
        pero <strong>sí se estropea con el tiempo</strong>. No es que «se
        pudra»: lo que ocurre es que cambia su composición. La gasolina es una
        mezcla de muchos hidrocarburos, y los más ligeros y volátiles —los que
        más ayudan a que el motor arranque— se evaporan poco a poco. Al mismo
        tiempo, el contacto con el aire la <strong>oxida</strong> y forma unas
        gomas y barnices que pueden ensuciar inyectores y conductos.
      </p>
      <p>
        El resultado de esa degradación es una gasolina que enciende peor:
        cuesta arrancar, el ralentí queda irregular y el motor puede dar
        tirones hasta que se consume. En casos extremos, con combustible muy
        viejo y sucio, llega a obstruir filtros. La buena noticia es que ese
        proceso es lento y depende mucho de las condiciones de almacenamiento;
        no es algo que te vaya a pasar por dejar el coche aparcado tres
        semanas de vacaciones.
      </p>
      <p>
        El bioetanol que llevan las gasolinas actuales (la{" "}
        <Link href="/guias/bioetanol-e5-vs-e10">E5 o E10</Link>) añade un
        matiz: el etanol absorbe humedad del ambiente. Si la gasolina está
        mucho tiempo en contacto con aire húmedo, puede captar agua y
        separarse en dos fases. Por eso conviene guardarla siempre bien
        cerrada.
      </p>

      <h2 id="cuanto-dura-en-el-deposito">Cuánto dura en el depósito</h2>
      <p>
        Dentro del depósito de un coche, la gasolina está bastante protegida:
        es un sistema prácticamente cerrado, con poco aire en contacto y a una
        temperatura más estable que a la intemperie. Como referencia, con
        datos típicos de uso normal:
      </p>
      <ul>
        <li>
          <strong>Hasta ~3 meses</strong>: la gasolina está como nueva. No
          notarás nada al arrancar ni al circular.
        </li>
        <li>
          <strong>3 a 6 meses</strong>: sigue siendo perfectamente utilizable.
          Es el margen tranquilo para un coche que usas poco o que ha estado
          parado una temporada.
        </li>
        <li>
          <strong>6 a 12 meses</strong>: empieza a perder propiedades. Puede
          que el coche arranque algo más perezoso o tenga el ralentí un poco
          irregular las primeras veces, hasta quemar ese combustible.
        </li>
        <li>
          <strong>Más de 1 año</strong>: la gasolina ya está claramente
          envejecida. Lo más prudente es diluirla con combustible fresco y no
          fiarte de un depósito lleno solo de gasolina vieja.
        </li>
      </ul>
      <p>
        Estos plazos son orientativos. Un depósito <strong>casi lleno</strong>{" "}
        deja menos aire dentro y la gasolina dura más; uno medio vacío se
        oxida antes y, en frío, acumula condensación en las paredes que acaba
        en el fondo como{" "}
        <Link href="/guias/agua-en-el-deposito-sintomas">
          agua en el depósito
        </Link>
        . El calor acelera todo el proceso, así que un coche al sol en verano
        envejece su combustible más rápido que uno en un garaje fresco.
      </p>

      <h2 id="cuanto-dura-en-un-bidon">Cuánto dura en un bidón</h2>
      <p>
        En un bidón, la duración depende casi por completo de cómo lo guardes.
        Un bidón homologado para combustible, lleno hasta arriba y bien
        cerrado, en un sitio fresco y a la sombra, conserva la gasolina
        razonablemente bien durante varios meses. Si está medio vacío, abierto
        o al sol, se degrada mucho antes porque hay más aire y más calor en
        contacto con el combustible.
      </p>
      <p>
        Las claves para que aguante en un bidón son sencillas:
      </p>
      <ul>
        <li>
          <strong>Recipiente adecuado</strong>: usa un bidón homologado para
          carburante (suele ser metálico o de plástico específico, con cierre
          estanco y, a menudo, válvula de despresurización). No vale cualquier
          garrafa de agua.
        </li>
        <li>
          <strong>Lo más lleno posible</strong>: cuanto menos aire quede
          dentro, menos se oxida y menos se evaporan los componentes ligeros.
        </li>
        <li>
          <strong>Bien cerrado</strong>: el cierre estanco evita que entre
          humedad y que se escapen vapores (que además son inflamables).
        </li>
        <li>
          <strong>Sitio fresco y ventilado</strong>: lejos de fuentes de
          calor, chispas y luz solar directa.
        </li>
        <li>
          <strong>Estabilizante</strong> si prevés guardarla meses: estos
          aditivos frenan la oxidación y alargan la vida útil bastante más que
          la gasolina sola.
        </li>
      </ul>
      <p>
        Recuerda que transportar y almacenar combustible en casa tiene{" "}
        <Link href="/guias/llevar-gasolina-en-bidon">
          límites de cantidad y normas de seguridad
        </Link>
        . Antes de acumular bidones, confirma la normativa vigente, que puede
        variar y conviene revisar con la fuente oficial.
      </p>

      <Callout type="warn" title="Señales de gasolina pasada">
        Si tienes dudas con un combustible viejo, fíjate en tres cosas: el{" "}
        <strong>olor</strong> (a barniz, agrio o rancio en lugar del olor
        habitual), el <strong>color</strong> (oscurecido o turbio) y los{" "}
        <strong>posos</strong> o separación en capas. Si presenta cualquiera
        de estas señales, no la metas en el motor: dilúyela mucho o, mejor,
        llévala a un punto limpio o gestor autorizado. No la tires por el
        desagüe ni al suelo.
      </Callout>

      <h2 id="coche-parado-mucho-tiempo">Un coche parado mucho tiempo</h2>
      <p>
        Cuando un coche pasa meses sin moverse —una segunda residencia, un
        vehículo de temporada, una baja larga—, el combustible no es lo único
        que sufre, pero sí una de las primeras cosas que da problemas al
        volver a arrancar. Para minimizarlo:
      </p>
      <ul>
        <li>
          <strong>Déjalo con el depósito lleno</strong> si vas a tenerlo
          parado mucho. Cuanto menos aire haya dentro, menos se oxida la
          gasolina y menos condensación (agua) se forma en las paredes.
        </li>
        <li>
          <strong>Añade un estabilizante</strong> antes del último viaje y
          conduce unos kilómetros para que el aditivo llegue a todo el
          sistema, no solo al depósito.
        </li>
        <li>
          <strong>Arráncalo de vez en cuando</strong>, si puedes, y déjalo
          unos minutos o da una vuelta corta cada pocas semanas. Así renuevas
          el combustible en los conductos y, de paso, cuidas la batería.
        </li>
        <li>
          <strong>Al volver tras una parada larga</strong>, no te alarmes si
          el primer arranque es perezoso o el ralentí va irregular un rato:
          suele normalizarse al quemar el combustible viejo. Si el problema
          persiste, conviene revisar filtros e inyectores.
        </li>
      </ul>
      <p>
        Si el coche es <strong>diésel</strong>, vigila además la humedad: el
        gasóleo parado mucho tiempo con agua dentro puede generar lodos que
        atascan el filtro. Tenerlo lleno y, si va a estar muy parado, usar un
        aditivo biocida ayuda a evitarlo.
      </p>

      <h2 id="gasolina-vs-diesel">¿Aguanta más la gasolina o el diésel?</h2>
      <p>
        Depende de qué le afecte a cada uno. El diésel resiste mejor el paso
        del tiempo en cuanto a evaporación, porque es menos volátil que la
        gasolina; pero le perjudica más la humedad, que genera microorganismos
        y lodos. La gasolina pierde antes sus componentes ligeros y se oxida,
        pero no sufre el problema de las bacterias del gasóleo. Esta tabla
        resume las diferencias con datos típicos de almacenamiento:
      </p>

      <CompareTable
        caption="Gasolina vs diésel: conservación (datos típicos, almacenamiento normal)"
        headers={["Aspecto", "Gasolina", "Diésel"]}
        rows={[
          ["Duración orientativa", "~6 meses (hasta 1 año estabilizada)", "~1 año o más estabilizado"],
          ["Principal enemigo", "Evaporación y oxidación", "Humedad y microorganismos"],
          ["Síntoma al envejecer", "Arranque difícil, ralentí irregular", "Filtros atascados por lodos"],
          ["Aditivo recomendado", "Estabilizante de gasolina", "Biocida + estabilizante"],
          ["Sensible al calor", "Mucho", "Menos"],
        ]}
      />

      <p>
        En ambos casos, las reglas de oro son las mismas: recipiente
        homologado, lleno y bien cerrado, en sitio fresco, y un aditivo
        adecuado si la parada va a ser larga.
      </p>

      <h2 id="como-conservarla">Cómo conservarla</h2>
      <p>
        Tanto si hablas del depósito del coche, de un bidón para la moto o de
        la gasolina del cortacésped, conservar bien el combustible se reduce a
        controlar tres factores: <strong>aire, humedad y calor</strong>.
        Minimiza el aire teniendo los recipientes lo más llenos posible;
        minimiza la humedad cerrando bien y guardando en sitio seco; y
        minimiza el calor manteniéndolo a la sombra y lejos de fuentes de
        ignición.
      </p>
      <p>
        Para herramientas y motores que pasan meses guardados (cortacésped,
        desbrozadora, motosierra, generador), lo más efectivo es{" "}
        <strong>estabilizar la gasolina</strong>: añades el aditivo al bidón o
        al depósito, arrancas el motor un par de minutos para que circule por
        el carburador, y así evitas que se formen gomas que obstruyan los
        conductos finos. Al final de la temporada, otra opción es dejar el
        depósito de la máquina casi vacío para que no quede combustible
        envejeciendo dentro.
      </p>
      <p>
        Y si lo que quieres es <strong>no acumular gasolina vieja</strong>, la
        estrategia más simple es no comprar de más: reposta lo que vas a usar
        y, cuando vuelvas a necesitar combustible, compáralo para llenar al
        mejor precio en lugar de tirar de un bidón que lleva medio año en el
        trastero.
      </p>

      <AppCta
        title="Reposta fresco y al mejor precio"
        body="En lugar de guardar gasolina vieja en un bidón, llena cuando lo necesites. Con Carburantes ves los precios reales del Ministerio y encuentras la gasolinera más barata cerca de ti."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/llevar-gasolina-en-bidon", label: "Llevar gasolina en bidón" },
          { href: "/guias/agua-en-el-deposito-sintomas", label: "Agua en el depósito" },
          { href: "/guias/tipos-de-combustible-guia-completa", label: "Tipos de combustible" },
        ]}
      />
    </>
  );
}

export default guide;
