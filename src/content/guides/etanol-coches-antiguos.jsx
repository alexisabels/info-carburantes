import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "etanol-coches-antiguos";
const title = "¿El etanol (E10) daña los motores antiguos?";
const description =
  "La gasolina E10 lleva más bioetanol y preocupa a los dueños de clásicos. Te explicamos a qué motores afecta de verdad y cómo saber si el tuyo es compatible.";

const guide = {
  slug,
  title,
  seoTitle: "E10 y coches antiguos: ¿daña el motor? · Guía",
  description,
  category: "tipos-combustible",
  datePublished: "2026-05-29",
  dateModified: "2026-05-29",
  readingMinutes: 6,
  keywords: [
    "e10 coches antiguos",
    "etanol daña motor",
    "gasolina e10 clásicos",
    "compatibilidad e10",
    "bioetanol coche antiguo",
  ],
  mentions: [
    { "@type": "Thing", name: "E10" },
    { "@type": "Thing", name: "Bioetanol" },
  ],
  faq: [
    {
      q: "¿La E10 estropea los coches antiguos?",
      a: "Solo a una minoría. La E10 lleva hasta un 10 % de bioetanol, y el etanol es ligeramente más corrosivo y disuelve algunos cauchos y plásticos antiguos. En coches anteriores a mediados de los años 90 (carburador, gomas y juntas no preparadas para etanol) puede atacar latiguillos, membranas del carburador y juntas, y también arrastrar suciedad del depósito. En coches de gasolina con inyección fabricados a partir de 2000, y prácticamente todos desde 2011, no causa ningún problema. Si tu coche es de 2011 o posterior, puedes olvidarte del tema.",
    },
    {
      q: "¿Cómo sé si mi coche admite E10?",
      a: "Mira primero la tapa o boca del depósito: desde 2018 los coches nuevos en la UE llevan una pegatina con un círculo y la marca E5 o E10. Si pone E10, es compatible. Si no hay pegatina, consulta el manual de usuario en la sección de combustible, o busca el modelo en las listas de compatibilidad que publican fabricantes y asociaciones. Como regla orientativa, casi todos los coches de gasolina matriculados desde 2011 admiten E10; en modelos más antiguos conviene confirmar caso por caso.",
    },
    {
      q: "¿Qué hago si tengo un clásico?",
      a: "Si tu coche es realmente antiguo o de colección, lo más prudente es seguir usando gasolina E5, que en España continúa vendiéndose como la habitual, sobre todo en la 98. Evita dejar el depósito con E10 parado mucho tiempo, porque el etanol absorbe humedad. Si solo encuentras E10, puedes usarla de forma puntual sin drama, pero para uso continuado merece la pena revisar latiguillos y juntas, y valorar repuestos resistentes al etanol con un mecánico especializado en clásicos.",
    },
    {
      q: "¿Dónde encuentro gasolina E5?",
      a: "En España la E5 sigue siendo la gasolina estándar en la práctica totalidad de estaciones, especialmente en la 95 y la 98. La etiqueta E5 aparece en el surtidor dentro de un círculo. Si una estación concreta solo ofrece E10, casi siempre tendrás E5 disponible en la 98 o en otra gasolinera cercana. La forma más rápida de localizar estaciones y comparar qué tienen y a qué precio es buscar por tu municipio o pulsar Cerca de mí en la app, que usa los datos oficiales del Ministerio.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        En la mayoría de coches la E10 <strong>no daña el motor</strong>: casi
        todos los de gasolina fabricados desde 2011 (y muchos desde 2000) son
        compatibles. El riesgo real está en los <strong>clásicos y modelos
        anteriores a mediados de los 90</strong>, cuyos cauchos, juntas y
        carburadores no se diseñaron para tanto etanol. Si dudas, sigue usando
        E5, que en España continúa siendo la gasolina habitual.
      </Answer>

      <Tldr
        items={[
          "La E10 lleva hasta 10 % de bioetanol; la E5, hasta 5 %.",
          "Coches de gasolina desde 2011: compatibles con E10 sin problema.",
          "Riesgo real solo en clásicos y modelos previos a mediados de los 90.",
          "El etanol puede atacar gomas y juntas viejas y absorbe humedad si el coche está parado.",
          "En España la E5 sigue disponible, sobre todo en la gasolina 98.",
        ]}
      />

      <h2 id="por-que-preocupa-el-etanol">Por qué preocupa el etanol</h2>
      <p>
        El número que acompaña a la gasolina (E5 o E10) indica el porcentaje
        máximo de <strong>bioetanol</strong> mezclado con la gasolina. La E5
        lleva hasta un 5 % y la E10 hasta un 10 %. El bioetanol se obtiene de
        cereales o caña de azúcar y forma parte del esfuerzo europeo por
        reducir las emisiones de CO₂. Hasta aquí, todo razonable: es la misma
        gasolina de siempre con algo más de componente renovable.
      </p>
      <p>
        El problema es que el etanol tiene dos manías que la gasolina pura no
        tiene. La primera: es algo más <strong>corrosivo y disolvente</strong>,
        de modo que puede atacar ciertos cauchos, plásticos y metales blandos
        que no se fabricaron pensando en él. La segunda: es{" "}
        <strong>higroscópico</strong>, es decir, absorbe agua del ambiente. En
        un coche que se usa a diario eso es irrelevante, pero en uno que pasa
        meses parado con el depósito medio lleno, esa humedad puede acabar
        provocando problemas de arranque y corrosión interna.
      </p>
      <p>
        Por eso, cuando Europa empezó a extender la E10 como gasolina estándar,
        saltaron las alarmas entre los dueños de coches clásicos. La buena
        noticia es que la preocupación, en la práctica, afecta a una porción
        muy pequeña del parque. Si quieres entender la diferencia técnica al
        detalle, la tienes desarrollada en{" "}
        <Link href="/guias/bioetanol-e5-vs-e10">nuestra comparativa entre E5 y
        E10</Link>.
      </p>

      <h2 id="que-coches-pueden-tener-problemas">Qué coches pueden tener problemas</h2>
      <p>
        El etanol solo da guerra en motores cuyas piezas en contacto con el
        combustible no se diseñaron para tolerarlo. En la práctica, hablamos
        sobre todo de coches <strong>anteriores a mediados de los años 90</strong>,
        con carburador y con gomas, membranas y juntas de materiales que el
        etanol puede reblandecer o disolver con el tiempo.
      </p>
      <p>
        Estos son los componentes que suelen sufrir en un vehículo antiguo si
        se usa E10 de forma continuada:
      </p>
      <ul>
        <li>
          <strong>Latiguillos y conductos de goma</strong> de combustible
          antiguos, que pueden agrietarse o reblandecerse.
        </li>
        <li>
          <strong>Membranas y juntas del carburador</strong>, más sensibles al
          poder disolvente del etanol.
        </li>
        <li>
          <strong>Juntas y retenes de goma vieja</strong> en la bomba de
          gasolina y el sistema de alimentación.
        </li>
        <li>
          <strong>Depósitos metálicos con sedimentos</strong>: el etanol arrastra
          la suciedad acumulada y puede llegar a obstruir filtros e inyectores
          o el carburador.
        </li>
      </ul>
      <p>
        En el otro extremo, los coches de gasolina con <strong>inyección
        electrónica</strong> y materiales modernos no se inmutan. A partir del
        año 2000 la mayoría ya toleran E10 sin problema, y prácticamente todos
        los matriculados <strong>desde 2011</strong> se diseñaron pensando en
        ella, porque ese fue el año en que la norma europea la fijó como
        referencia. Si tu coche entra en ese grupo, puedes repostar E10 con
        total tranquilidad.
      </p>

      <CompareTable
        caption="¿A quién afecta la E10? (orientativo, no sustituye al manual)"
        headers={["Tipo de coche", "¿Compatible con E10?", "Recomendación"]}
        rows={[
          ["Gasolina desde 2011", "Sí, diseñado para ella", "Reposta E10 sin problema"],
          ["Gasolina 2000-2010", "Casi siempre sí", "Confirma en el manual"],
          ["Gasolina años 90", "Depende del modelo", "Comprueba listas del fabricante"],
          ["Clásico / anterior a 1995", "Frecuentemente no", "Mejor E5 y revisar gomas"],
          ["Diésel", "No aplica (la E10 es gasolina)", "Usa el gasóleo correspondiente"],
        ]}
      />

      <h2 id="como-saber-si-el-tuyo-es-compatible">¿Cómo saber si tu coche es compatible?</h2>
      <p>
        Lo más fiable es mirar la <strong>pegatina de la tapa del depósito</strong>:
        desde 2018 los coches nuevos de la UE la llevan con un círculo y la marca
        «E5» o «E10». Si pone E10, es compatible; si no hay pegatina o el coche es
        anterior, conviene confirmarlo por otras vías.
      </p>
      <p>
        Por orden de fiabilidad, comprueba en este orden:
      </p>
      <ul>
        <li>
          <strong>La pegatina del depósito</strong>: el círculo con «E10» es la
          confirmación más directa.
        </li>
        <li>
          <strong>El manual de usuario</strong>, en la sección de combustible.
          Suele indicar el RON mínimo y si admite E10.
        </li>
        <li>
          <strong>Listas de compatibilidad</strong> que publican los propios
          fabricantes y las asociaciones de automóvil para sus modelos por año.
        </li>
        <li>
          <strong>El servicio oficial de tu marca</strong>, si tienes dudas con
          un modelo concreto.
        </li>
      </ul>
      <p>
        Como atajo mental: si tu coche de gasolina es de <strong>2011 o
        posterior</strong>, casi con seguridad admite E10. Entre 2000 y 2010,
        lo más probable es que sí, pero conviene confirmarlo. Antes de 2000, y
        sobre todo en clásicos, no des nada por hecho. Recuerda además que el
        número E5/E10 es independiente del octanaje: puedes ver «95 E10» o «98
        E5», y si tienes dudas sobre qué octanaje pide tu motor lo aclaramos en{" "}
        <Link href="/guias/gasolina-95-vs-98">la guía de gasolina 95 vs 98</Link>.
      </p>

      <h2 id="que-hacer-si-tienes-un-clasico">Qué hacer si tienes un clásico</h2>
      <p>
        Si tienes un coche de colección o realmente antiguo, la estrategia
        sensata es sencilla: <strong>usa E5 siempre que puedas</strong> y trata
        la E10 como un recurso puntual, no como tu gasolina habitual. En España
        la E5 sigue siendo fácil de encontrar, especialmente en la 98, así que
        no tendrás que hacer malabares.
      </p>
      <p>
        Algunas pautas prácticas para cuidar un clásico:
      </p>
      <ul>
        <li>
          <strong>No dejes el depósito con E10 parado mucho tiempo.</strong> Si
          el coche va a estar meses sin moverse, mejor con E5 y el depósito
          lleno para reducir condensación.
        </li>
        <li>
          <strong>Revisa latiguillos, juntas y membranas.</strong> Si vas a
          rodar con regularidad, valora sustituir las gomas viejas por repuestos
          resistentes al etanol, que ya existen para muchos modelos.
        </li>
        <li>
          <strong>Vigila filtros y carburador.</strong> El etanol puede
          arrastrar sedimentos del depósito; un filtro de gasolina nuevo es un
          seguro barato.
        </li>
        <li>
          <strong>Si solo encuentras E10, úsala sin dramatizar.</strong> Un
          repostaje aislado no destroza un motor; el riesgo aparece con el uso
          continuado y los años.
        </li>
      </ul>
      <Callout type="note" title="Repuestos y normativa: confírmalo con un especialista">
        La disponibilidad de E5 y E10, las etiquetas obligatorias y las
        recomendaciones de los fabricantes pueden cambiar con el tiempo. Antes
        de hacer cambios en un coche de valor, contrasta con el servicio oficial
        de tu marca o con un mecánico especializado en clásicos, y verifica la
        compatibilidad concreta de tu modelo. Lo de aquí es una orientación
        general, no una indicación técnica para tu vehículo.
      </Callout>

      <h2 id="la-e5-sigue-disponible">La E5 sigue disponible</h2>
      <p>
        Conviene desmontar un miedo habitual: la llegada de la E10 no significa
        que la E5 vaya a desaparecer de la noche a la mañana. En España la E5
        sigue siendo, en la práctica, la gasolina estándar en casi todas las
        estaciones, y en muchos países europeos donde la E10 ya es la 95 por
        defecto, la <strong>98 se mantiene en E5</strong> precisamente como
        opción «protección» para coches antiguos y exigentes.
      </p>
      <p>
        En el surtidor, fíjate en la etiqueta dentro del círculo: «E5» o «E10»
        junto al octanaje. Si tu gasolinera habitual solo ofreciera E10 en la
        95, lo más normal es que tengas E5 disponible en la 98 o en otra
        estación cercana. Para no ir a ciegas, lo más cómodo es comparar antes:
        qué combustibles tiene cada estación y a qué precio.
      </p>

      <AppCta
        title="Encuentra gasolina E5 y compara precios cerca"
        body="En Carburantes ves los carburantes disponibles en cada estación y su precio real, con datos oficiales del Ministerio. Busca por municipio o pulsa «Cerca de mí» para localizar dónde repostar."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/bioetanol-e5-vs-e10", label: "Bioetanol E5 vs E10" },
          { href: "/guias/gasolina-95-vs-98", label: "Gasolina 95 vs 98" },
          { href: "/guias/tipos-de-combustible-guia-completa", label: "Tipos de combustible" },
        ]}
      />
    </>
  );
}

export default guide;
