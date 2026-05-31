import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "margen-gasolineras-por-litro";
const title = "Cuánto gana una gasolinera por cada litro";
const description =
  "El margen de una gasolinera por litro es más pequeño de lo que crees. Te explicamos cuánto gana realmente, por qué las low cost venden más barato y dónde está el negocio.";

const guide = {
  slug,
  title,
  seoTitle: "Cuánto gana una gasolinera por litro · Guía",
  description,
  category: "mercado",
  datePublished: "2026-05-24",
  dateModified: "2026-05-24",
  readingMinutes: 6,
  keywords: [
    "margen gasolinera por litro",
    "cuánto gana una gasolinera",
    "beneficio gasolinera",
    "margen combustible",
  ],
  mentions: [
    { "@type": "Thing", name: "Margen" },
    { "@type": "Thing", name: "Low cost" },
  ],
  faq: [
    {
      q: "¿Cuánto gana una gasolinera por litro?",
      a: "Mucho menos de lo que la gente imagina. El margen bruto del minorista en España suele moverse en torno a 5-12 céntimos por litro (datos típicos, 2026), y de ahí todavía hay que descontar transporte, personal, alquiler o amortización del terreno, luz, mantenimiento de surtidores, comisiones de tarjeta y mermas. El beneficio neto que le queda al gestor por litro vendido es de apenas unos pocos céntimos, a veces menos de tres. La mayor parte del precio que pagas son impuestos y el coste del producto, que la gasolinera no controla. Por eso el negocio depende del volumen: una estación que vende mucho gana dinero con márgenes pequeños, y otra con poco tráfico necesita un margen mayor por litro para sobrevivir.",
    },
    {
      q: "¿Por qué las low cost son más baratas?",
      a: "Porque recortan justo en lo que infla el margen, no en la calidad del combustible. El gasóleo y la gasolina salen de los mismos depósitos logísticos y cumplen la misma norma europea para todas las estaciones, sean de marca o no. Lo que cambia es la estructura de costes: las low cost y las automáticas suelen tener poco o ningún personal, no mantienen tienda ni cafetería, ubican las estaciones en suelo más barato y trabajan con un margen por litro deliberadamente menor a cambio de vender mucho más volumen. Renuncian a una parte del beneficio por litro para ganar por cantidad, y ese ahorro se traslada al precio del surtidor.",
    },
    {
      q: "¿Ganan más con la tienda?",
      a: "En muchas estaciones de marca, sí. El margen sobre el café, el agua, la bollería, el tabaco o los accesorios es porcentualmente mucho mayor que el del combustible. Un café o una bolsa de chucherías deja un porcentaje de beneficio que un litro de gasóleo no alcanza ni de lejos. Por eso una estación de servicio tradicional está diseñada para que entres a la tienda mientras repostas: el combustible atrae al cliente y la tienda es donde se cierra buena parte del beneficio. Las low cost y automáticas renuncian a esa vía, y por eso aprietan más el precio del carburante.",
    },
    {
      q: "¿El margen explica las diferencias de precio?",
      a: "En gran parte, sí. El coste del producto y los impuestos son prácticamente iguales para todas las estaciones de una misma zona, así que casi toda la diferencia de precio que ves entre dos gasolineras se explica por su margen y su estructura de costes: cuánto personal tienen, si hay tienda, qué alquiler pagan, qué volumen mueven y qué beneficio por litro deciden aplicar. Por eso conviene comparar siempre el precio real antes de repostar: dos surtidores separados por pocos kilómetros pueden tener una diferencia de varios céntimos por litro sin que el combustible sea distinto en absoluto.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Una gasolinera gana mucho menos por litro de lo que parece. De cada
        euro que pagas, la mayor parte son <strong>impuestos</strong> y el{" "}
        <strong>coste del producto</strong>; el margen bruto del minorista
        ronda los <strong>5-12 céntimos por litro</strong> (datos típicos en
        España, 2026), y tras pagar personal, alquiler, luz y mantenimiento, el
        beneficio neto se queda en apenas unos pocos céntimos. El negocio real
        no está en el surtidor: está en el <strong>volumen</strong> y, en las
        estaciones de marca, en la <strong>tienda</strong>.
      </Answer>

      <Tldr
        items={[
          "El margen bruto del minorista es de ~5-12 céntimos/litro; el neto, unos pocos céntimos.",
          "Impuestos y coste del producto se llevan la mayor parte del precio: la gasolinera no los controla.",
          "El combustible deja poco beneficio; la tienda (café, tabaco, accesorios) deja mucho más.",
          "Las low cost y automáticas recortan costes (sin personal, sin tienda) y aprietan el margen, no la calidad.",
          "Casi toda la diferencia de precio entre dos estaciones es margen y estructura de costes, no producto.",
        ]}
      />

      <h2 id="margen-real-por-litro">El margen real por litro</h2>
      <p>
        Cuando llenas el depósito tienes la sensación de que la gasolinera se
        está forrando. La realidad es bastante más modesta. El precio que pagas
        se reparte, a grandes rasgos, en tres bloques: los{" "}
        <strong>impuestos</strong> (IVA, Impuesto sobre Hidrocarburos y los
        tramos autonómicos), el <strong>coste del producto</strong> (el precio
        del carburante en el mercado mayorista, ligado al petróleo y al cambio
        euro-dólar) y, por último, el <strong>margen del minorista</strong>: la
        parte que se queda quien explota la estación.
      </p>
      <p>
        Ese margen del minorista es el más pequeño de los tres. En España suele
        moverse en torno a <strong>5-12 céntimos por litro</strong> de margen
        bruto (datos típicos, 2026), y conviene insistir en lo de «bruto»:
        todavía no es beneficio. De esos céntimos hay que descontar una larga
        lista de costes antes de que sobre nada.
      </p>
      <ul>
        <li>
          <strong>Producto y logística</strong>: el carburante que la estación
          compra y el transporte en cisterna hasta sus depósitos.
        </li>
        <li>
          <strong>Personal</strong>: salarios y seguridad social del equipo que
          atiende, cobra y mantiene la estación.
        </li>
        <li>
          <strong>Inmueble</strong>: alquiler del suelo o amortización del
          terreno y la instalación, que en zonas urbanas es carísimo.
        </li>
        <li>
          <strong>Operación</strong>: luz (los surtidores y la iluminación
          nocturna consumen mucho), mantenimiento de equipos, inspecciones,
          seguros y mermas por evaporación.
        </li>
        <li>
          <strong>Comisiones de pago</strong>: cada cobro con tarjeta se lleva
          un porcentaje que, sobre un margen tan ajustado, pesa.
        </li>
      </ul>
      <p>
        Cuando restas todo eso, el <strong>beneficio neto</strong> que le queda
        a la estación por litro suele ser de unos pocos céntimos, a veces menos
        de tres. Es un negocio de céntimos multiplicados por millones de litros,
        no de grandes márgenes. Si te interesa el desglose completo de qué parte
        es impuesto y qué parte es producto, lo detallamos en{" "}
        <Link href="/guias/como-se-forma-precio-gasolina">
          cómo se forma el precio de la gasolina
        </Link>
        .
      </p>

      <CompareTable
        caption="A qué se destina el precio de un litro (reparto orientativo, España 2026)"
        headers={["Componente", "Quién lo controla", "Peso aproximado"]}
        rows={[
          ["Impuestos (IVA + Hidrocarburos)", "Estado y comunidades", "Aproximadamente la mitad del precio"],
          ["Coste del producto", "Mercado del petróleo / mayorista", "La otra gran parte"],
          ["Margen bruto del minorista", "La gasolinera", "~5-12 cént/L"],
          ["Beneficio neto por litro", "La gasolinera (tras costes)", "Unos pocos céntimos"],
        ]}
      />

      <Callout type="note" title="Por qué el precio sube cuando sube el petróleo">
        Como el coste del producto es uno de los bloques grandes y la gasolinera
        no lo fija, cuando el crudo o el dólar se mueven, el surtidor lo nota
        casi de inmediato. El margen del minorista apenas cambia: lo que oscila
        es el precio mayorista. Lo explicamos en{" "}
        <Link href="/guias/por-que-sube-baja-precio-gasolina">
          por qué sube y baja el precio de la gasolina
        </Link>
        .
      </Callout>

      <h2 id="tienda-mas-que-surtidor">Por qué la tienda importa más que el surtidor</h2>
      <p>
        Si el combustible deja tan poco, ¿cómo gana dinero una estación de
        servicio tradicional? La respuesta está dentro del edificio. El margen
        sobre el café, el agua, la bollería, el tabaco, las bebidas frías o los
        accesorios es <strong>porcentualmente mucho mayor</strong> que el de un
        litro de gasóleo. Un café puede dejar un porcentaje de beneficio que el
        carburante no alcanza ni de lejos.
      </p>
      <p>
        Por eso las estaciones de marca están diseñadas como pequeños
        supermercados de carretera: pasillos amplios, expositores junto a la
        caja, cafetería, baños limpios. El combustible es el gancho que te trae;
        la tienda es donde se cierra una parte importante del beneficio. No es
        casualidad que tengas que pasar por delante de la nevera de bebidas para
        llegar al mostrador a pagar.
      </p>
      <p>
        Esto explica una aparente paradoja: una estación de marca con tienda
        puede permitirse un margen <em>más alto</em> en el surtidor porque no
        depende solo de él, mientras que otra que vive exclusivamente del
        carburante tiene que apretar el precio para mover volumen. El modelo de
        negocio condiciona el precio que ves.
      </p>

      <h2 id="low-cost-automaticas">Cómo sobreviven las low cost y automáticas</h2>
      <p>
        Las gasolineras low cost y las automáticas dan la vuelta a ese modelo.
        En lugar de ganar con la tienda y un margen cómodo, renuncian a casi
        todo lo accesorio y compiten por <strong>volumen</strong> con un margen
        por litro deliberadamente más bajo. El combustible es el mismo —sale de
        los mismos depósitos logísticos y cumple la misma norma europea—, pero
        la estructura de costes es radicalmente más ligera.
      </p>
      <ul>
        <li>
          <strong>Poco o ningún personal</strong>: en las automáticas, repostas,
          pagas en el terminal y te vas. Sin empleado, ese coste desaparece del
          litro.
        </li>
        <li>
          <strong>Sin tienda ni cafetería</strong>: renuncian al margen del
          café, pero también al alquiler, el stock y el personal que eso exige.
        </li>
        <li>
          <strong>Suelo más barato</strong>: muchas se ubican junto a
          supermercados o en polígonos, donde el terreno cuesta una fracción de
          una esquina urbana.
        </li>
        <li>
          <strong>Margen ajustado a propósito</strong>: aceptan ganar menos por
          litro a cambio de vender muchos más litros.
        </li>
      </ul>
      <p>
        Ese ahorro de costes se traslada directamente al precio del surtidor.
        Por eso una automática puede estar varios céntimos por debajo de la
        estación de marca de al lado vendiendo exactamente el mismo carburante.
        Si quieres entender en detalle quién está detrás de estos modelos, lo
        contamos en{" "}
        <Link href="/guias/gasolineras-low-cost">la guía de gasolineras low cost</Link>{" "}
        y en{" "}
        <Link href="/guias/gasolineras-supermercado">
          las gasolineras de supermercado
        </Link>
        .
      </p>

      <Callout type="info" title="Más barato no significa peor combustible">
        El gasóleo y la gasolina cumplen la misma norma europea
        (EN 590 y EN 228) independientemente de quién los venda. Una low cost no
        te da un producto inferior: te da el mismo producto con menos servicios
        alrededor. La diferencia que verás en aditivos detergentes está en las
        gamas premium de marca, no en una rebaja de la calidad básica.
      </Callout>

      <h2 id="marca-vs-independiente">Marca vs independiente</h2>
      <p>
        Entre el extremo «low cost» y el extremo «gran marca con tienda» hay un
        abanico de modelos, y cada uno explica un precio distinto sin que el
        combustible cambie.
      </p>
      <CompareTable
        caption="Modelos de gasolinera y su lógica de margen (datos típicos en España, 2026)"
        headers={["Tipo de estación", "De dónde sale el beneficio", "Tendencia del precio"]}
        rows={[
          ["Gran marca con tienda", "Margen del surtidor + tienda + servicios", "Más alto"],
          ["Marca abanderada independiente", "Sobre todo el surtidor", "Medio"],
          ["Low cost atendida", "Volumen y costes bajos", "Bajo"],
          ["Automática / desatendida", "Volumen, casi sin costes fijos", "El más bajo"],
        ]}
      />
      <p>
        Una <strong>gran marca</strong> aporta cosas reales: baños, cafetería,
        asistencia, programas de puntos y, en sus gamas premium, más aditivos
        detergentes. Si valoras eso, el sobrecoste por litro tiene sentido. Una
        estación <strong>independiente o automática</strong> te da el combustible
        sin todo lo demás, y por eso es más barata. No hay truco: estás eligiendo
        cuánto servicio quieres pagar junto al carburante.
      </p>
      <p>
        Lo importante es no asumir que «más cara» equivale a «mejor gasolina» ni
        que «barata» equivale a «mala». Lo que decides al elegir surtidor es,
        sobre todo, qué estructura de costes estás financiando con tu repostaje.
      </p>

      <h2 id="que-significa-para-tu-bolsillo">Qué significa para tu bolsillo</h2>
      <p>
        Que el margen sea pequeño tiene una consecuencia muy concreta para ti:
        casi toda la diferencia de precio que ves entre dos gasolineras{" "}
        <strong>no está en el producto</strong>, sino en su margen y su
        estructura de costes. El coste del carburante y los impuestos son
        prácticamente iguales para todas las estaciones de una misma zona, así
        que dos surtidores separados por pocos kilómetros pueden diferir varios
        céntimos por litro vendiendo lo mismo.
      </p>
      <p>
        En un depósito de 55 litros, una diferencia de 10 céntimos por litro son
        más de 5 € por lleno. Si repostas un par de veces por semana, eso se
        convierte en bastante dinero al final del año, solo por elegir bien dónde
        repostar. Y como ese ahorro existe precisamente porque los márgenes son
        ajustados y variables, la única forma de aprovecharlo es{" "}
        <strong>comparar el precio real antes de echar</strong>, no fiarte de la
        marca ni de la costumbre.
      </p>
      <p>
        La buena noticia es que esos precios son públicos: las estaciones están
        obligadas a comunicarlos al Ministerio, que los actualiza varias veces al
        día. Con eso puedes ver, sin moverte, qué surtidor de tu zona aplica el
        margen más bajo hoy.
      </p>

      <AppCta
        title="Compara el precio real cerca de ti"
        body="El combustible es casi el mismo en todas partes; lo que cambia es el margen. En Carburantes ves los precios oficiales del Ministerio actualizados y ordenas por el más barato. Pulsa «Cerca de mí» o busca por municipio."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/gasolineras-low-cost", label: "Gasolineras low cost" },
          { href: "/guias/como-se-forma-precio-gasolina", label: "Cómo se forma el precio" },
          { href: "/guias/gasolineras-supermercado", label: "Gasolineras de supermercado" },
        ]}
      />
    </>
  );
}

export default guide;
