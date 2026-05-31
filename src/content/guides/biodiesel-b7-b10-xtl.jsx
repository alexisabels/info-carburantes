import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "biodiesel-b7-b10-xtl";
const title = "Biodiésel B7, B10 y XTL: qué significan las etiquetas del diésel";
const description =
  "El B7 de tu surtidor lleva hasta un 7% de biodiésel. Te explicamos las etiquetas B7, B10 y XTL, qué llevan y si tu coche diésel puede repostarlas sin riesgo.";

const guide = {
  slug,
  title,
  seoTitle: "Biodiésel B7, B10 y XTL · Guía Carburantes",
  description,
  category: "tipos-combustible",
  datePublished: "2026-05-28",
  dateModified: "2026-05-28",
  readingMinutes: 6,
  keywords: [
    "biodiesel b7",
    "b10 diésel",
    "xtl combustible",
    "etiqueta b7 surtidor",
    "diésel biodiesel porcentaje",
  ],
  mentions: [
    { "@type": "Thing", name: "B7" },
    { "@type": "Thing", name: "B10" },
    { "@type": "Thing", name: "XTL" },
    { "@type": "Thing", name: "Biodiésel" },
  ],
  faq: [
    {
      q: "¿Qué significa B7 en el surtidor?",
      a: "B7 es la etiqueta europea del gasóleo de automoción que llevas usando toda la vida. La «B» es de biodiésel y el «7» indica que la mezcla contiene hasta un 7% de biodiésel (FAME), con el 93% restante de gasóleo mineral. Es el diésel estándar en España y todos los coches diésel modernos lo aceptan sin problema. La etiqueta tiene forma cuadrada y aparece en el surtidor, en la manguera y en la tapa del depósito desde 2018.",
    },
    {
      q: "¿Mi coche puede repostar B10?",
      a: "Depende del fabricante. El B10 lleva hasta un 10% de biodiésel y solo deberías usarlo si tu coche está homologado para ello, dato que figura en el manual o en la tapa del depósito junto a la etiqueta B7. La mayoría de diésel fabricados antes de 2018-2019 están pensados para B7, y aunque un repostaje aislado de B10 raramente causa una avería inmediata, el uso continuado en un coche no homologado puede afectar a juntas, filtros e inyección. Ante la duda, confirma con el servicio oficial: la normativa y las homologaciones cambian.",
    },
    {
      q: "¿El biodiésel daña el motor?",
      a: "En las proporciones del surtidor (B7, e incluso B10 en coches homologados) no daña el motor: son combustibles normados que cumplen la norma EN 590 y los fabricantes los validan. El biodiésel tiene fama de absorber humedad y de degradarse antes que el gasóleo mineral, por lo que su único punto débil real es el combustible que pasa meses parado en el depósito, donde puede formar lodos o favorecer microorganismos. En un coche de uso normal no es un problema. El riesgo aparece con mezclas altas (B30, B100) en motores no preparados, algo que no encontrarás en una gasolinera convencional.",
    },
    {
      q: "¿Qué es el XTL?",
      a: "XTL es la etiqueta de los gasóleos sintéticos o parafínicos, fabricados por procesos distintos al refino del petróleo: GTL (a partir de gas natural), BTL (de biomasa) o el cada vez más común HVO, un diésel renovable hecho con aceites y grasas hidrotratados. Cumplen la norma EN 15940 y arden más limpio que el diésel convencional, pero no todos los coches están homologados para ellos. La etiqueta XTL tiene forma de rombo y solo deberías usar ese combustible si el fabricante lo autoriza expresamente.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        El <strong>B7</strong> que repostas a diario es gasóleo con hasta un
        7% de biodiésel mezclado; el resto, gasóleo mineral. El{" "}
        <strong>B10</strong> sube esa proporción al 10% y solo lo deben usar
        coches homologados. El <strong>XTL</strong> es un diésel sintético o
        renovable (como el HVO), más limpio, pero también restringido a
        vehículos compatibles. En la práctica, casi todos los diésel en
        España usan B7 sin ningún problema.
      </Answer>

      <Tldr
        items={[
          "B7: diésel estándar en España, hasta 7% de biodiésel. Lo acepta cualquier coche diésel moderno.",
          "B10: hasta 10% de biodiésel; solo para coches homologados por el fabricante.",
          "XTL: diésel sintético o renovable (GTL, BTL, HVO), más limpio pero restringido a vehículos compatibles.",
          "La «B» es de biodiésel; el número, el porcentaje máximo mezclado.",
          "Ante la duda, mira la tapa del depósito y el manual; la homologación manda.",
        ]}
      />

      <h2 id="que-significa-la-b">Qué significa la «B» del surtidor</h2>
      <p>
        Desde 2018, todos los surtidores de la Unión Europea llevan unas
        etiquetas normalizadas que identifican el combustible con una letra y,
        a veces, un número. En el caso del diésel, la letra clave es la{" "}
        <strong>«B»</strong>, que viene de <em>biodiésel</em>. El número que la
        acompaña (B7, B10) indica el <strong>porcentaje máximo de biodiésel</strong>{" "}
        mezclado con el gasóleo mineral.
      </p>
      <p>
        El biodiésel del que hablamos aquí es el FAME (ésteres metílicos de
        ácidos grasos, por sus siglas en inglés): un combustible obtenido de
        aceites vegetales (colza, girasol, soja, palma) o de grasas y aceites
        usados. No hay que confundirlo con el HVO, que es otro tipo de diésel
        renovable y se etiqueta de forma distinta, como veremos más abajo.
      </p>
      <p>
        Estas etiquetas tienen forma geométrica para que las identifiques de un
        vistazo: las del diésel son <strong>cuadradas</strong>, las de la
        gasolina circulares y las de los gases (GLP, GNC, hidrógeno)
        romboidales. Las encontrarás en tres sitios: el frontal del surtidor,
        la propia manguera y la tapa del depósito de tu coche. La idea es que
        compares la pegatina de tu coche con la del surtidor antes de repostar.
        Lo explicamos en detalle en la guía de{" "}
        <Link href="/guias/etiqueta-dgt-combustible">etiquetas del surtidor</Link>.
      </p>

      <h2 id="b7-diesel-estandar">B7: el diésel estándar en España</h2>
      <p>
        El B7 es, sencillamente, el gasóleo de automoción de toda la vida. Si
        echas «diésel» en cualquier gasolinera española, casi con total
        seguridad estás echando B7: hasta un 7% de biodiésel y un 93% de
        gasóleo mineral, todo ello cumpliendo la norma europea EN 590, la que
        garantiza que ese combustible es apto para tu motor.
      </p>
      <p>
        Ese 7% no es un capricho: responde al objetivo europeo y español de ir
        incorporando combustibles renovables para reducir las emisiones netas
        de CO₂. Lleva años entre nosotros, así que cualquier coche diésel
        moderno está diseñado y homologado para funcionar con él sin ninguna
        adaptación. No notarás diferencia de consumo, potencia ni arranque
        respecto a un gasóleo «sin bio», porque la proporción es baja y está
        cuidadosamente regulada.
      </p>
      <p>
        Conviene no confundir el B7 con las gamas «premium» de diésel (Repsol
        Diésel e+ 10, Cepsa Óptima, BP Ultimate, etc.). Esas también son B7 en
        cuanto a su contenido de biodiésel; lo que cambia es el paquete de
        aditivos detergentes y anticorrosión que añade cada marca. Si te
        interesa esa diferencia, la desarrollamos en{" "}
        <Link href="/guias/diesel-a-vs-premium">diésel A vs premium</Link>.
      </p>

      <Callout type="info" title="¿Y el «gasóleo B» rojo del campo?">
        Cuidado con la nomenclatura: el «gasóleo B» bonificado (de color rojo,
        para tractores, calefacción y maquinaria) no tiene nada que ver con la
        etiqueta «B7». Aquí la «B» del surtidor es de biodiésel; allí la «B» es
        una clasificación fiscal del gasóleo agrícola. Usar gasóleo
        bonificado en un coche de carretera está sancionado y suele dejar
        restos detectables en una inspección; si tienes dudas sobre su uso,
        conviene consultarlo con la fuente oficial o un asesor.
      </Callout>

      <h2 id="b10-mas-biodiesel">B10 y la llegada de más biodiésel</h2>
      <p>
        El B10 es el siguiente paso lógico: la misma idea que el B7 pero con
        hasta un <strong>10% de biodiésel</strong>. Está pensado para empujar la
        descarbonización del transporte sin cambiar de motor ni de surtidor.
        Sobre el papel apenas notarías la diferencia al volante; el matiz
        importante es de <strong>compatibilidad</strong>.
      </p>
      <p>
        Subir del 7% al 10% de biodiésel no es trivial para todos los motores.
        El biodiésel es algo más agresivo con ciertas juntas y materiales, tiene
        más tendencia a absorber humedad y puede saturar antes el filtro de
        combustible si el coche no está preparado. Por eso el B10 solo debe
        usarse en vehículos <strong>homologados expresamente</strong> por el
        fabricante para ese combustible, algo que suelen indicar en el manual y
        en la tapa del depósito.
      </p>
      <p>
        La regla práctica para España en 2026: si tu coche es relativamente
        moderno y el fabricante lo autoriza, puedes usar B10 con tranquilidad;
        si es anterior a 2018-2019 o no encuentras la homologación, quédate en
        B7. Un repostaje aislado de B10 en un coche de B7 raramente provoca una
        avería inmediata, pero el uso continuado en un vehículo no homologado no
        es recomendable. Como en todo lo normativo, conviene confirmarlo con el
        servicio oficial, porque las homologaciones y la disponibilidad de cada
        combustible van cambiando.
      </p>

      <CompareTable
        caption="B7 vs B10 vs XTL (datos típicos en España, 2026)"
        headers={["Característica", "B7", "B10", "XTL"]}
        rows={[
          ["Qué lleva", "≤7% biodiésel + gasóleo", "≤10% biodiésel + gasóleo", "Diésel sintético/renovable (GTL, BTL, HVO)"],
          ["Forma de etiqueta", "Cuadrada", "Cuadrada", "Rombo"],
          ["Norma", "EN 590", "EN 590", "EN 15940"],
          ["Compatibilidad", "Casi todos los diésel", "Solo coches homologados", "Solo coches homologados"],
          ["Disponibilidad en España", "Generalizada", "Limitada / emergente", "Limitada / en expansión"],
          ["Emisiones netas CO₂", "Algo menores que el fósil", "Menores", "Bastante menores (sobre todo HVO)"],
        ]}
      />

      <h2 id="xtl-diesel-sintetico">XTL: diésel sintético y HVO</h2>
      <p>
        El XTL es una familia aparte. Las siglas vienen de{" "}
        <em>«X-to-Liquid»</em> (algo a líquido) y agrupa los gasóleos{" "}
        <strong>parafínicos o sintéticos</strong>, fabricados sin pasar por el
        refino tradicional del crudo. Según la materia prima, hablamos de GTL
        (a partir de gas natural), BTL (de biomasa) o, el más relevante hoy, el{" "}
        <strong>HVO</strong> (aceite vegetal hidrotratado), un diésel renovable
        que se elabora con aceites y grasas, incluidos los usados.
      </p>
      <p>
        Estos combustibles cumplen su propia norma, la EN 15940, y tienen
        ventajas claras: arden más limpio, generan menos partículas y humo, y en
        el caso del HVO pueden reducir mucho las emisiones netas de CO₂ a lo
        largo de su ciclo de vida. Por eso cada vez más estaciones empiezan a
        ofrecerlos, a veces bajo nombres comerciales propios.
      </p>
      <p>
        El «pero» es el mismo de siempre: la <strong>homologación</strong>. La
        etiqueta XTL es un rombo precisamente para avisarte de que no es un
        diésel cualquiera. Algunos fabricantes ya validan sus motores para HVO
        100% y otros no, así que solo debes repostarlo si tu coche lo autoriza.
        Si te interesa este combustible, lo explicamos a fondo en la guía de{" "}
        <Link href="/guias/hvo-combustible-renovable">HVO y diésel renovable</Link>.
      </p>

      <Callout type="note" title="HVO no es lo mismo que biodiésel FAME">
        Aunque ambos son renovables, el biodiésel FAME (la «B» del B7/B10) y el
        HVO (un XTL) se fabrican de forma distinta y tienen propiedades
        distintas. El HVO es químicamente casi idéntico al gasóleo mineral, lo
        que lo hace más estable y menos sensible a la humedad. Por eso se
        etiquetan por separado y no comparten límites de mezcla.
      </Callout>

      <h2 id="puede-tu-coche-con-b10">¿Puede tu coche con B10?</h2>
      <p>
        Para saber si tu coche acepta B10, mira la <strong>tapa del depósito</strong>{" "}
        y el manual: si junto a la etiqueta cuadrada «B7» aparece también «B10»
        (o el fabricante lo indica por escrito), está homologado; si solo ves
        «B7», quédate en ese combustible. La homologación del fabricante es la
        que manda, por encima de cualquier regla general.
      </p>
      <p>
        Como orientación, no como norma absoluta: los diésel modernos que
        salieron al mercado con la etiqueta B10 ya prevista suelen aceptarlo, y
        muchos turismos posteriores a 2018-2019 lo contemplan. Los coches más
        antiguos, los que usan poco el vehículo y lo tienen meses parado, o los
        que ya arrastran filtros e inyección con kilómetros, son los que mejor
        hacen quedándose en B7. Si te equivocaras de combustible, en{" "}
        <Link href="/guias/me-he-equivocado-combustible">esta guía explicamos qué hacer</Link>.
      </p>
      <p>
        En cualquier caso, lo más probable es que ni te tengas que preocupar:
        hoy en la inmensa mayoría de gasolineras españolas el diésel que sale del
        surtidor es B7, y eso lo acepta tu coche sin pensarlo. El B10 y el XTL
        siguen siendo opciones minoritarias y bien señalizadas, así que es difícil
        echarlos por error. Antes de cualquier ruta larga, lo útil de verdad es
        comparar el precio real del gasóleo cerca de ti.
      </p>

      <AppCta
        title="Compara el precio del diésel cerca de ti"
        body="En Carburantes ves el precio oficial del gasóleo A en cada estación, actualizado con los datos del Ministerio. Pulsa «Cerca de mí» o busca por municipio para encontrar el surtidor más barato antes de repostar."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/etiqueta-dgt-combustible", label: "Etiquetas del surtidor" },
          { href: "/guias/hvo-combustible-renovable", label: "HVO y diésel renovable" },
          { href: "/guias/diesel-a-vs-premium", label: "Diésel A vs premium" },
        ]}
      />
    </>
  );
}

export default guide;
