import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks, MiniFaq } from "./_components";

const slug = "distintivo-ambiental-dgt";
const title = "Distintivo ambiental DGT (B, C, ECO, 0): cuál te toca";
const description =
  "La etiqueta ambiental de la DGT decide dónde puedes circular y aparcar. Te explicamos qué distintivo le toca a tu coche, cómo conseguirlo y para qué sirve.";

const guide = {
  slug,
  title,
  seoTitle: "Distintivo ambiental DGT: B, C, ECO, 0 · Guía",
  description,
  category: "normativa",
  datePublished: "2026-05-31",
  dateModified: "2026-05-31",
  readingMinutes: 6,
  keywords: [
    "distintivo ambiental dgt",
    "etiqueta dgt c b eco 0",
    "qué etiqueta tiene mi coche",
    "etiqueta medioambiental dgt",
  ],
  mentions: [
    { "@type": "Thing", name: "Etiqueta ambiental" },
    { "@type": "Thing", name: "DGT" },
    { "@type": "Thing", name: "ZBE" },
  ],
  faq: [
    {
      q: "¿Qué etiqueta ambiental tiene mi coche?",
      a: "Depende del tipo de motor y del año de matriculación, no del modelo. A grandes rasgos: los eléctricos puros y de hidrógeno llevan etiqueta 0; los híbridos enchufables con cierta autonomía y los híbridos no enchufables suelen ser ECO; los gasolina matriculados desde 2006 (norma Euro 4 o superior) y los diésel desde 2014 (Euro 6) llevan la C; y los gasolina entre 2000 y 2005 (Euro 3) y los diésel entre 2006 y 2013 (Euro 4 y 5) llevan la B. La forma más fiable de saberlo es consultar la matrícula en el buscador oficial de la DGT, porque hay excepciones según la versión exacta del vehículo.",
    },
    {
      q: "¿Qué diferencia hay entre etiqueta C y B?",
      a: "La C corresponde a coches más nuevos y menos contaminantes que la B. Tienen la C los gasolina matriculados a partir de 2006 (Euro 4, 5 y 6) y los diésel a partir de 2014 (Euro 6). Tienen la B los gasolina de entre 2000 y 2005 (Euro 3) y los diésel de entre 2006 y 2013 (Euro 4 y 5). En la práctica, la diferencia importa en las zonas de bajas emisiones: en episodios de alta contaminación, los coches con etiqueta B suelen ser los primeros en tener restricciones de circulación, mientras que la C aguanta algo más. Las reglas exactas las fija cada ayuntamiento.",
    },
    {
      q: "¿Mi coche puede quedarse sin etiqueta?",
      a: "Sí. No reciben distintivo los gasolina anteriores al año 2000 (norma Euro 1, Euro 2 o sin clasificar) ni los diésel anteriores a 2006 (Euro 1 a Euro 3). Son los vehículos más antiguos y contaminantes, y son los que más restricciones sufren en las zonas de bajas emisiones de las grandes ciudades. No quedarse sin etiqueta no impide circular por carretera ni tener el coche, pero sí puede limitar el acceso al centro de muchas ciudades.",
    },
    {
      q: "¿Dónde compro el distintivo?",
      a: "El distintivo físico se vende en las oficinas de Correos y cuesta en torno a 5 euros (precio orientativo, conviene confirmarlo). También se puede adquirir en algunos talleres, gestorías y asociaciones del automóvil. No es obligatorio llevarlo pegado en todas las comunidades, pero sí muy recomendable porque facilita los controles y, en algunas zonas de bajas emisiones, las cámaras leen la matrícula igualmente. La clasificación ambiental existe aunque no lleves la pegatina: la pegatina solo la hace visible.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        El <strong>distintivo ambiental de la DGT</strong> clasifica tu coche
        según lo que contamina y determina dónde puedes circular y aparcar,
        sobre todo en las zonas de bajas emisiones de las ciudades. Hay cuatro
        categorías —<strong>0, ECO, C y B</strong>— y los vehículos más
        antiguos se quedan sin ninguna. Para saber cuál te toca solo necesitas
        tu matrícula y el buscador oficial de la DGT.
      </Answer>

      <Tldr
        items={[
          "La etiqueta clasifica el coche por sus emisiones, no por su marca o precio.",
          "Cuatro distintivos: 0 (eléctricos), ECO (híbridos y gas), C (gasolina desde 2006, diésel desde 2014) y B (más antiguos).",
          "Los gasolina anteriores a 2000 y los diésel anteriores a 2006 no tienen etiqueta.",
          "Sirve sobre todo para entrar en las ZBE de las ciudades y para descuentos de aparcamiento.",
          "El distintivo físico se compra en Correos por ~5 €; consulta tu matrícula en la web de la DGT.",
        ]}
      />

      <h2 id="que-es-el-distintivo">
        Qué es el distintivo ambiental (y no confundir con la etiqueta del
        combustible)
      </h2>
      <p>
        El distintivo ambiental es una pegatina circular que la Dirección
        General de Tráfico (DGT) creó en 2016 para clasificar los vehículos
        según las emisiones contaminantes que generan. No mide lo que gastas,
        ni cuánto vale tu coche: mide la tecnología del motor y, sobre todo,
        la norma de emisiones europea (Euro) que cumplía cuando se matriculó.
      </p>
      <p>
        Aquí conviene aclarar una confusión muy habitual. El distintivo
        ambiental <strong>no es lo mismo</strong> que las etiquetas E5, E10 o
        B7 que ves en el surtidor y en la tapa del depósito. Esas son la{" "}
        <Link href="/guias/etiqueta-dgt-combustible">
          etiqueta del combustible
        </Link>
        , un código europeo que indica qué carburante admite tu coche
        (gasolina con bioetanol, diésel con biodiésel, etc.). El distintivo
        ambiental, en cambio, es una clasificación de cuánto contamina el
        vehículo y sirve para temas de circulación y aparcamiento, no para
        elegir qué echas en el depósito.
      </p>
      <ul>
        <li>
          <strong>Etiqueta del combustible (E5, E10, B7…)</strong>: te dice
          qué carburante puedes repostar. Está en la tapa del depósito y en el
          surtidor.
        </li>
        <li>
          <strong>Distintivo ambiental (0, ECO, C, B)</strong>: te dice cuánto
          contamina tu coche y dónde puede circular. Es una pegatina para el
          parabrisas.
        </li>
      </ul>
      <p>
        En resumen: una decide tu repostaje y la otra decide tu acceso a la
        ciudad. Si te interesa la primera, la explicamos a fondo en su propia
        guía; aquí nos centramos en la segunda.
      </p>

      <h2 id="los-cuatro-distintivos">
        Los cuatro distintivos: 0, ECO, C y B
      </h2>
      <p>
        La DGT reparte los vehículos en cuatro categorías, de menos a más
        contaminante. Cuanto mejor es la etiqueta, menos restricciones tendrás
        en las zonas de bajas emisiones. Esta es la clasificación general, que
        puede tener excepciones según la versión exacta del vehículo:
      </p>
      <ul>
        <li>
          <strong>Etiqueta 0 (azul)</strong>: la más alta. La llevan los
          eléctricos puros (BEV), los de pila de hidrógeno, los eléctricos de
          autonomía extendida y los híbridos enchufables con una autonomía
          eléctrica de en torno a 40 km o más. Son los que menos restricciones
          sufren.
        </li>
        <li>
          <strong>Etiqueta ECO (azul y verde)</strong>: híbridos enchufables
          con menos autonomía, híbridos no enchufables (HEV), y vehículos de
          gas (GLP autogás y{" "}
          <Link href="/guias/gnc-gas-natural-vehicular">GNC</Link>) que además
          cumplen el nivel de la etiqueta C. Contaminan poco, pero algo más
          que los 0.
        </li>
        <li>
          <strong>Etiqueta C (verde)</strong>: los coches «de combustión
          modernos». Gasolina matriculados a partir de 2006 (Euro 4, 5 y 6) y
          diésel matriculados a partir de 2014 (Euro 6). También entran aquí
          furgonetas y vehículos pesados que cumplen las normas más recientes.
        </li>
        <li>
          <strong>Etiqueta B (amarilla)</strong>: coches algo más antiguos.
          Gasolina matriculados entre 2000 y 2005 (Euro 3) y diésel
          matriculados entre 2006 y 2013 (Euro 4 y 5).
        </li>
      </ul>

      <CompareTable
        caption="Distintivos ambientales DGT (clasificación general, 2026)"
        headers={["Distintivo", "Color", "Tipo de vehículo (a grandes rasgos)"]}
        rows={[
          ["0 emisiones", "Azul", "Eléctricos, hidrógeno, enchufables de mayor autonomía"],
          ["ECO", "Azul/verde", "Híbridos y vehículos de gas (GLP, GNC)"],
          ["C", "Verde", "Gasolina desde 2006 · diésel desde 2014"],
          ["B", "Amarillo", "Gasolina 2000-2005 · diésel 2006-2013"],
          ["Sin etiqueta", "—", "Gasolina anteriores a 2000 · diésel anteriores a 2006"],
        ]}
      />

      <Callout type="info" title="Importa el año, no la marca">
        Dos coches del mismo modelo pueden tener etiquetas distintas si se
        matricularon en años diferentes. Lo que clasifica la DGT es la norma
        de emisiones (Euro) vigente en el momento de la matriculación, no el
        precio ni el segmento del vehículo. Un utilitario reciente tiene mejor
        etiqueta que un coche grande de hace veinte años.
      </Callout>

      <h2 id="coches-sin-etiqueta">Qué coches se quedan sin etiqueta</h2>
      <p>
        Una parte del parque automovilístico español no recibe ningún
        distintivo. Son los vehículos más antiguos y, por tanto, los que la
        DGT considera más contaminantes. En concreto, se quedan sin etiqueta:
      </p>
      <ul>
        <li>
          <strong>Coches de gasolina anteriores al año 2000</strong> (norma
          Euro 1, Euro 2 o sin clasificar).
        </li>
        <li>
          <strong>Coches diésel anteriores a 2006</strong> (de Euro 1 a Euro
          3).
        </li>
      </ul>
      <p>
        No tener etiqueta no significa que el coche esté prohibido ni que no
        puedas circular por carretera: puedes seguir usándolo, pasar la ITV y
        venderlo con normalidad. Lo que cambia es el acceso a las{" "}
        <strong>zonas de bajas emisiones (ZBE)</strong> de las ciudades, donde
        estos vehículos suelen ser los primeros y los más restringidos. En
        muchos centros urbanos grandes ya no pueden entrar salvo excepciones
        (residentes, vehículos de personas con movilidad reducida, etc.), y
        las reglas tienden a endurecerse con el tiempo.
      </p>
      <p>
        Si estás pensando en cambiar de coche y la etiqueta es un factor, te
        pueden interesar nuestras guías comparativas sobre{" "}
        <Link href="/guias/coche-diesel-o-gasolina">diésel o gasolina</Link> y
        sobre el{" "}
        <Link href="/guias/coche-electrico-vs-gasolina-coste">
          coste real del eléctrico frente al gasolina
        </Link>
        , donde la clasificación ambiental pesa cada vez más en la decisión.
      </p>

      <h2 id="para-que-sirve">Para qué sirve: ZBE y aparcamiento</h2>
      <p>
        El distintivo ambiental sirve, sobre todo, para decidir dónde puede
        circular y estacionar tu coche en las ciudades. Es la herramienta con
        la que los ayuntamientos aplican sus zonas de bajas emisiones y sus
        políticas de aparcamiento. Los dos usos principales son:
      </p>
      <ul>
        <li>
          <strong>Zonas de bajas emisiones (ZBE)</strong>: desde 2023, la ley
          obliga a los municipios de más de 50.000 habitantes (y algunos más
          pequeños) a delimitar áreas donde se restringe el acceso a los
          vehículos más contaminantes. Cada ayuntamiento decide qué etiquetas
          pueden entrar, en qué horarios y con qué excepciones, así que las
          reglas varían mucho de una ciudad a otra. Como norma general, los 0 y
          ECO entran casi siempre, la C suele entrar con algunas condiciones,
          la B es la primera en sufrir limitaciones y los sin etiqueta son los
          más restringidos.
        </li>
        <li>
          <strong>Aparcamiento regulado (zona azul, verde…)</strong>: muchas
          ciudades aplican descuentos o tarifas más baratas a los coches con
          mejor etiqueta, e incluso recargos a los más contaminantes. En
          algunos casos los 0 y ECO aparcan gratis o con bonificación.
        </li>
        <li>
          <strong>Episodios de alta contaminación</strong>: cuando se disparan
          los niveles de partículas o NO₂, los ayuntamientos pueden activar
          restricciones temporales por etiqueta, empezando por los vehículos
          sin distintivo y los B.
        </li>
      </ul>
      <Callout type="warn" title="Cada ciudad tiene sus reglas">
        No existe una norma única para toda España: lo que vale en Madrid no
        tiene por qué valer en Barcelona, Valencia o Sevilla. Antes de entrar
        en una ZBE que no conozcas, confirma las condiciones en la web del
        ayuntamiento correspondiente. La normativa de bajas emisiones está en
        plena implantación y cambia con frecuencia.
      </Callout>
      <p>
        Conviene tener presente que la etiqueta también puede influir, de
        forma indirecta, en algunos impuestos y bonificaciones municipales
        (por ejemplo, el impuesto de circulación en ciertos ayuntamientos).
        Estos aspectos fiscales dependen de cada administración y cambian de un
        año a otro, así que lo prudente es comprobarlos en la sede oficial de
        tu ayuntamiento o consultarlo con una gestoría.
      </p>

      <h2 id="como-conseguir">Cómo conseguir la tuya</h2>
      <p>
        El proceso es sencillo y tiene dos partes: saber qué etiqueta te
        corresponde y, si quieres, comprar la pegatina física para llevarla en
        el parabrisas.
      </p>
      <ul>
        <li>
          <strong>1. Consulta tu clasificación</strong>. Entra en la web
          oficial de la DGT (sede electrónica) y usa el buscador del distintivo
          ambiental introduciendo tu matrícula. Te dirá al instante qué
          etiqueta tiene tu coche. Es gratis y es la fuente más fiable, porque
          tiene en cuenta la versión exacta de tu vehículo.
        </li>
        <li>
          <strong>2. Compra la pegatina (opcional pero recomendable)</strong>.
          El distintivo físico se vende en las oficinas de Correos por un
          precio en torno a los 5 € (orientativo, conviene confirmarlo).
          También lo distribuyen algunos talleres, gestorías y asociaciones del
          automóvil.
        </li>
        <li>
          <strong>3. Pégala en el parabrisas</strong>, en la esquina inferior
          derecha o donde indique tu comunidad, de forma que sea visible desde
          fuera.
        </li>
      </ul>
      <p>
        La clasificación ambiental existe en los registros de la DGT aunque no
        lleves la pegatina puesta: muchas ZBE leen la matrícula con cámaras y
        comprueban tu etiqueta automáticamente. Aun así, llevarla pegada
        facilita los controles manuales y evita malentendidos. La obligatoriedad
        de exhibirla puede variar según la comunidad y la normativa local, así
        que ante la duda, mejor llevarla.
      </p>

      <AppCta
        title="Lo que sí puedes elegir cada día: dónde repostar más barato"
        body="La etiqueta de tu coche no la cambias, pero el precio del depósito sí. En Carburantes comparas las gasolineras de tu zona con datos oficiales del Ministerio: pulsa «Cerca de mí» o busca por municipio."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <h2 id="preguntas-frecuentes">Preguntas frecuentes</h2>
      <MiniFaq items={guide.faq} />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/etiqueta-dgt-combustible", label: "Etiqueta del combustible (no confundir)" },
          { href: "/guias/coche-diesel-o-gasolina", label: "Diésel o gasolina" },
          { href: "/guias/coche-electrico-vs-gasolina-coste", label: "Eléctrico vs gasolina" },
        ]}
      />
    </>
  );
}

export default guide;
