import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "hvo-combustible-renovable";
const title = "HVO y diésel renovable: el combustible que ya se vende en España";
const description =
  "El HVO es un diésel renovable hecho con aceites y residuos que reduce emisiones sin tocar el motor. Te explicamos qué es, su precio y dónde repostarlo.";

const guide = {
  slug,
  title,
  seoTitle: "HVO diésel renovable en España · Guía Carburantes",
  description,
  category: "tipos-combustible",
  datePublished: "2026-05-15",
  dateModified: "2026-05-15",
  readingMinutes: 6,
  keywords: [
    "hvo combustible",
    "diésel renovable",
    "hvo100",
    "combustible eco diésel",
    "hvo precio españa",
  ],
  mentions: [
    { "@type": "Thing", name: "HVO" },
    { "@type": "Thing", name: "Diésel renovable" },
  ],
  faq: [
    {
      q: "¿El HVO sirve para cualquier diésel?",
      a: "El HVO100 es compatible con la mayoría de motores diésel modernos porque cumple la norma EN 15940, pero no con todos. Lo que manda es la homologación del fabricante: marcas como Volvo, Mercedes, DAF, Scania, Renault o muchos modelos del grupo Volkswagen ya aprueban su uso y lo indican en el manual o con una pegatina en la tapa del depósito. Si tu coche no lo homologa expresamente, repostarlo puede afectar a la garantía aunque mecánicamente el motor lo tolere. Consulta siempre el manual antes de llenar.",
    },
    {
      q: "¿Contamina menos el HVO?",
      a: "Sí, sobre todo en emisiones de CO2 a lo largo de su ciclo de vida. Al estar hecho con aceites usados y residuos en lugar de petróleo, su huella de carbono puede reducirse de forma muy notable frente al diésel fósil, hasta en torno a un 80-90 % según el residuo de partida. También quema más limpio, con menos partículas y menos humo negro. Eso sí, por el tubo de escape sigue emitiendo CO2 y NOx: no es un coche cero emisiones, sino un diésel con una huella de origen mucho menor.",
    },
    {
      q: "¿Es más caro que el diésel normal?",
      a: "Hoy suele ser algo más caro que el gasóleo A convencional, con una diferencia típica de unos pocos céntimos por litro, aunque varía mucho según la estación y la zona. El motivo es que producirlo cuesta más y aún se vende en menos puntos. La buena noticia es que no necesitas ningún cambio en el coche para usarlo, así que el único sobrecoste es el del litro. Como el precio se mueve a diario, lo mejor es comparar el dato real en la app antes de repostar.",
    },
    {
      q: "¿Dónde se vende HVO en España?",
      a: "Cada vez en más sitios, pero todavía no en todas las gasolineras. Lo encontrarás sobre todo en estaciones de marcas que han apostado por él y en puntos pensados para flotas y transporte, más habituales en grandes ciudades y corredores logísticos que en pueblos pequeños. La red crece deprisa, así que la forma más fiable de localizar una estación con HVO cerca es buscar por tu municipio o usar Cerca de mí en la app y filtrar por el combustible.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        El HVO (siglas en inglés de <em>aceite vegetal hidrotratado</em>) es un{" "}
        <strong>diésel renovable</strong> fabricado a partir de aceites usados,
        grasas y residuos en lugar de petróleo. Cumple la norma EN 15940, por lo
        que muchos motores diésel modernos pueden usarlo sin ningún cambio
        mecánico, y reduce mucho las emisiones de CO2 de su ciclo de vida. En
        España ya se vende —se etiqueta a menudo como «HVO100»— aunque todavía
        en menos puntos y, de momento, a un precio algo superior al del gasóleo
        normal.
      </Answer>

      <Tldr
        items={[
          "El HVO es diésel renovable hecho con aceites y residuos, no con petróleo.",
          "Reduce las emisiones de CO2 del ciclo de vida de forma notable (típicamente del orden del 80-90 % según el residuo de origen).",
          "Funciona en motores diésel modernos sin tocar nada, pero solo si el fabricante lo homologa.",
          "Hoy suele costar unos céntimos más por litro que el gasóleo A y se vende en menos estaciones.",
          "Compara el precio y la disponibilidad reales en la app antes de desviarte a repostarlo.",
        ]}
      />

      <h2 id="que-es-el-hvo">Qué es el HVO</h2>
      <p>
        HVO son las siglas de <em>Hydrotreated Vegetable Oil</em>, aceite
        vegetal hidrotratado. Es un combustible diésel parafínico que no sale de
        una refinería de petróleo, sino de tratar con hidrógeno y a alta
        temperatura materias primas de origen renovable: aceites de cocina
        usados, grasas animales, residuos de la industria alimentaria y aceites
        vegetales. El resultado es un líquido transparente, casi inodoro, que se
        comporta como un gasóleo y se reposta exactamente igual.
      </p>
      <p>
        Lo verás anunciado con varios nombres comerciales —«diésel renovable»,
        «eco diésel», «HVO100»— pero el concepto es el mismo. El «100» indica que
        es HVO puro al cien por cien; también existen mezclas en las que se añade
        un porcentaje de HVO al gasóleo fósil tradicional. A diferencia del
        antiguo biodiésel (FAME), el HVO no contiene ésteres, no absorbe agua con
        facilidad y aguanta mucho mejor el almacenamiento y el frío, lo que
        evita buena parte de los problemas que daba aquel.
      </p>

      <h2 id="diferencia-diesel-normal">En qué se diferencia del diésel normal</h2>
      <p>
        Por fuera, nada: misma bomba, mismo surtidor, mismo gesto. Las
        diferencias están en su origen y en su química, y son las que importan:
      </p>
      <ul>
        <li>
          <strong>De qué está hecho.</strong> El gasóleo A se obtiene del crudo
          de petróleo; el HVO, de residuos y aceites renovables. Esa es la
          diferencia de fondo y la razón de su menor huella de carbono.
        </li>
        <li>
          <strong>Emisiones.</strong> Quema más limpio, con menos partículas y
          menos humo negro, y reduce mucho el CO2 contabilizado a lo largo de su
          ciclo de vida. No es cero emisiones por el tubo de escape, pero su
          balance global es muy inferior al del diésel fósil.
        </li>
        <li>
          <strong>Número de cetano.</strong> El HVO tiene un cetano más alto que
          el gasóleo normal, lo que mejora ligeramente la combustión y puede
          suavizar el arranque en frío y la sonoridad del motor.
        </li>
        <li>
          <strong>Conservación.</strong> Al no llevar componentes que se
          degraden tan rápido, se almacena mejor durante meses, algo útil para
          maquinaria o vehículos de uso esporádico.
        </li>
      </ul>
      <p>
        Una aclaración importante: el HVO <em>no</em> reduce el consumo de forma
        apreciable ni «da más potencia». Su densidad energética es ligeramente
        distinta, pero en la práctica el coche recorre prácticamente los mismos
        kilómetros por litro. Su ventaja es ambiental, no de rendimiento ni de
        ahorro en el surtidor.
      </p>

      <h2 id="puede-usarlo-mi-coche">¿Puede usarlo mi coche?</h2>
      <p>
        Aquí está la clave de todo. El HVO100 cumple la norma europea EN 15940
        de combustibles parafínicos, y la mayoría de motores diésel modernos lo
        toleran sin ningún problema mecánico. Pero «lo tolera» y «está aprobado»
        no son lo mismo: lo que de verdad cuenta es que el{" "}
        <strong>fabricante de tu coche lo homologue</strong>.
      </p>
      <ul>
        <li>
          <strong>Vehículos homologados.</strong> Muchas marcas ya aprueban el
          HVO y lo indican en el manual o con una pegatina «XTL» junto a la tapa
          del depósito. Es muy habitual en camiones y furgonetas (Volvo,
          Mercedes, DAF, Scania, MAN, Renault) y cada vez en más turismos. Si tu
          coche lo homologa, puedes alternar HVO y gasóleo A sin vaciar el
          depósito: son perfectamente mezclables.
        </li>
        <li>
          <strong>Vehículos no homologados.</strong> Si el manual no lo menciona,
          el motor probablemente lo aceptaría, pero usarlo podría darte
          problemas con la garantía. En coches antiguos conviene además
          comprobar la compatibilidad de juntas y conductos.
        </li>
      </ul>
      <Callout type="info" title="Cómo salir de dudas en un minuto">
        Mira la tapa del depósito y el manual buscando la marca «XTL» o una
        mención expresa al diésel parafínico o renovable. Si aparece, tu coche
        está homologado para HVO. Si no estás seguro, lo prudente es tratarlo
        como cualquier otra decisión de combustible y verificarlo con el
        fabricante, igual que harías al comprobar la{" "}
        <Link href="/guias/etiqueta-dgt-combustible">etiqueta DGT y el tipo de
        combustible</Link> de tu vehículo.
      </Callout>

      <h2 id="precio-disponibilidad">Precio y disponibilidad en España</h2>
      <p>
        El HVO ya está a la venta en España y su red de estaciones crece deprisa,
        impulsada sobre todo por las flotas de transporte y reparto que buscan
        reducir su huella de carbono sin esperar a electrificar. Aun así, todavía
        no se encuentra en todas las gasolineras: es más fácil dar con él en
        grandes ciudades y corredores logísticos que en estaciones de pueblo.
      </p>
      <p>
        En cuanto al precio, hoy suele ser algo más caro que el gasóleo A
        convencional, con una diferencia típica de unos pocos céntimos por litro
        en 2026. Influyen el mayor coste de producción y la menor escala de
        venta. Como ocurre con cualquier carburante, el precio se mueve a diario
        y cambia de una estación a otra, así que merece la pena verlo antes de
        decidir.
      </p>

      <CompareTable
        caption="HVO100 vs gasóleo A convencional (datos típicos en España, 2026)"
        headers={["Característica", "Gasóleo A", "HVO100"]}
        rows={[
          ["Origen", "Petróleo", "Aceites usados y residuos"],
          ["Norma", "EN 590", "EN 15940"],
          ["Emisiones CO2 ciclo de vida", "Referencia", "Mucho menores (~80-90 % menos)"],
          ["Cambios en el motor", "—", "Ninguno (si está homologado)"],
          ["Precio por litro", "Referencia", "Algo superior (unos céntimos más)"],
          ["Disponibilidad", "Todas las estaciones", "Creciente, aún limitada"],
        ]}
      />

      <p>
        Antes de cambiar tus hábitos por el HVO, conviene tener clara la lógica
        de precios: lo que pagas no depende solo del tipo de combustible, sino de
        impuestos, márgenes y ubicación. Si quieres entender por qué dos
        estaciones cercanas marcan cifras distintas, te ayudará leer{" "}
        <Link href="/guias/como-se-forma-precio-gasolina">cómo se forma el
        precio del carburante</Link>. Y si dudas entre seguir con tu diésel o no,
        la guía de{" "}
        <Link href="/guias/coche-diesel-o-gasolina">diésel o gasolina</Link>{" "}
        pone en contexto la decisión.
      </p>

      <AppCta
        title="Busca estaciones con HVO cerca de ti"
        body="En Carburantes puedes filtrar por tipo de combustible y comparar el precio real del diésel renovable frente al gasóleo A en las estaciones de tu zona. Busca por municipio o pulsa «Cerca de mí»."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <h2 id="futuro-renovables">Futuro de los combustibles renovables</h2>
      <p>
        El HVO forma parte de una familia más amplia de combustibles renovables
        y sintéticos que buscan reducir emisiones sin obligar a cambiar de coche.
        Su gran baza es justamente esa: aprovecha los millones de motores diésel
        ya en circulación y la red de surtidores que ya existe, sin nueva
        infraestructura ni vehículos nuevos. Por eso interesa tanto al transporte
        pesado, donde la electrificación todavía es complicada.
      </p>
      <ul>
        <li>
          <strong>Disponibilidad al alza.</strong> Es previsible que cada vez más
          estaciones lo ofrezcan a medida que aumente la producción y la demanda
          de las flotas.
        </li>
        <li>
          <strong>Limitación de materia prima.</strong> Su producción depende de
          residuos y aceites disponibles, que no son ilimitados, así que es una
          pieza del puzle de la descarbonización, no la solución única.
        </li>
        <li>
          <strong>Convive con otras alternativas.</strong> El HVO comparte
          camino con opciones como el{" "}
          <Link href="/guias/glp-autogas-espana">GLP autogás</Link>, el{" "}
          <Link href="/guias/gnc-gas-natural-vehicular">gas natural vehicular</Link>{" "}
          o, a más largo plazo, el{" "}
          <Link href="/guias/coche-hidrogeno-espana">coche de hidrógeno</Link>.
        </li>
      </ul>
      <p>
        Para el conductor de a pie, la conclusión práctica es sencilla: si tu
        diésel está homologado y encuentras HVO cerca a un precio razonable,
        repostarlo reduce tu huella de carbono sin tocar nada del coche. Como
        siempre, la decisión final pasa por el precio del litro ese día —y eso se
        comprueba en un segundo en la app.
      </p>

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/diesel-a-vs-premium", label: "Diésel A, premium, B y C" },
          { href: "/guias/etiqueta-dgt-combustible", label: "Etiqueta DGT y combustible" },
          { href: "/guias/coche-diesel-o-gasolina", label: "Diésel o gasolina" },
        ]}
      />
    </>
  );
}

export default guide;
