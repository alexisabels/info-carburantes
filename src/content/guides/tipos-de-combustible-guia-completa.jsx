import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "tipos-de-combustible-guia-completa";
const title = "Tipos de combustible en España: la guía completa";
const description =
  "Gasolina 95 y 98, diésel A y premium, GLP, GNC, hidrógeno, AdBlue y las etiquetas E5/E10/B7. La guía completa de los tipos de combustible y cuál le conviene a tu coche.";

const guide = {
  slug,
  title,
  seoTitle: "Tipos de combustible en España · Guía completa",
  description,
  category: "tipos-combustible",
  datePublished: "2026-05-31",
  dateModified: "2026-05-31",
  readingMinutes: 12,
  keywords: [
    "tipos de combustible",
    "tipos de carburante españa",
    "qué combustible usa mi coche",
    "tipos de gasolina y diésel",
    "tipos de combustible coche",
  ],
  mentions: [
    { "@type": "Thing", name: "Gasolina 95" },
    { "@type": "Thing", name: "Gasolina 98" },
    { "@type": "Thing", name: "Diésel A" },
    { "@type": "Thing", name: "GLP" },
    { "@type": "Thing", name: "GNC" },
    { "@type": "Thing", name: "Hidrógeno" },
  ],
  faq: [
    {
      q: "¿Cuántos tipos de combustible hay en España?",
      a: "En la práctica conviven dos grandes familias líquidas (gasolinas y gasóleos) y varias alternativas. Entre las gasolinas tienes la 95 y la 98; entre los gasóleos, el diésel A normal, los premium de marca, el gasóleo B agrícola y el C de calefacción. A eso se suman los gases para automoción (GLP o autogás y GNC, gas natural comprimido), el hidrógeno en estaciones contadas y la electricidad para coches eléctricos. Más que contar etiquetas, lo útil es saber a qué familia pertenece tu coche y mirar el surtillo exacto que indica el manual.",
    },
    {
      q: "¿Qué combustible usa mi coche?",
      a: "El dato exacto está en dos sitios: el manual del vehículo, en la sección de combustibles, y una pegatina en la tapa del depósito con el símbolo europeo (E5, E10, B7, H2 o LPG) y el octanaje o cetano mínimo. Como regla general, los coches de gasolina usan 95 salvo que el fabricante exija 98, y los de gasóleo usan diésel A. Si tienes la menor duda, no te fíes del color de la manguera ni de la costumbre: consulta el manual antes de repostar, porque equivocarse de combustible es uno de los errores más caros.",
    },
    {
      q: "¿Cuál es el combustible más barato?",
      a: "Por precio de litro, el GLP (autogás) suele ser el más económico en España, en torno a la mitad que la gasolina, aunque su consumo es algo mayor y exige una instalación homologada. El GNC también sale muy barato por kilómetro pero hay pocas estaciones. Entre los líquidos convencionales, el diésel A y la gasolina 95 se mueven en cifras parecidas según la zona y el momento. Lo importante es que el combustible más barato para ti es el que tu coche admite, y dentro de ese, la gasolinera con mejor precio cerca: eso solo lo sabrás comparando precios reales en el momento de repostar.",
    },
    {
      q: "¿Puedo cambiar el tipo de combustible de mi coche?",
      a: "No puedes pasar libremente de gasolina a diésel ni al revés: son motores distintos. Lo que sí existe es convertir un coche de gasolina a GLP mediante una instalación bifuel homologada por un taller autorizado, que añade un segundo depósito y permite alternar entre gasolina y autogás. La conversión tiene un coste de entrada y debe pasar inspección, así que conviene calcular cuántos kilómetros haces al año para ver si compensa. La normativa de homologación puede cambiar, de modo que confirma siempre los requisitos con un instalador autorizado y con la ITV.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        En España conviven dos grandes familias de combustibles líquidos —{" "}
        <strong>gasolinas</strong> (95 y 98) y <strong>gasóleos</strong>{" "}
        (diésel A, premium, B agrícola y C de calefacción)— junto a varias
        alternativas: los gases para automoción <strong>GLP</strong> (autogás)
        y <strong>GNC</strong>, el <strong>hidrógeno</strong> y la electricidad.
        Lo decisivo no es cuántos hay, sino cuál admite tu coche: ese dato
        está siempre en el manual y en la pegatina (E5, E10, B7…) de la tapa
        del depósito.
      </Answer>

      <Tldr
        items={[
          "Gasolina: la 95 vale para casi todos los coches; la 98 solo si el fabricante la exige.",
          "Diésel: el A es el normal; el premium añade aditivos; el B (agrícola) y el C (calefacción) no son para coches de carretera.",
          "Etiquetas del surtidor: E5/E10 son gasolinas, B7/B10 gasóleos, XTL parafínicos. El número indica el porcentaje de origen renovable.",
          "Gases: el GLP (autogás) es el más barato por litro; el GNC sale muy bien por km pero hay pocas estaciones.",
          "Alternativas: el hidrógeno apenas tiene surtidores y el eléctrico no reposta, se carga. Compara siempre el precio real cerca de ti.",
        ]}
      />

      <p>
        Esta es la guía de referencia para entender, de un vistazo, todos los
        tipos de combustible que vas a encontrar en una estación de servicio
        española en 2026. La idea es que la uses como índice: cada apartado
        resume lo esencial y enlaza a la guía específica si quieres profundizar.
        Al final tienes una sección práctica para decidir qué le conviene a tu
        coche y cómo encontrar el surtidor correcto al mejor precio.
      </p>

      <h2 id="gasolinas-95-98-octanaje">Gasolinas: 95, 98 y el octanaje</h2>
      <p>
        Las gasolinas se diferencian por el <strong>octanaje</strong> (RON), que
        mide su resistencia a auto-encenderse al comprimirse. La{" "}
        <strong>gasolina 95</strong> es la de uso general y sirve para la
        inmensa mayoría del parque español. La <strong>gasolina 98</strong>{" "}
        resiste mejor la compresión y solo es obligatoria en motores de alta
        compresión —deportivos y altas prestaciones— que el fabricante diseñó
        para ese octanaje.
      </p>
      <p>
        En un coche normal pensado para 95, repostar 98 «por si acaso» no aporta
        más potencia ni reduce consumo de forma apreciable: solo añade unos
        aditivos detergentes y un sobrecoste típico de unos 8 a 15 céntimos por
        litro. Al revés —usar 95 en un coche que exige 98— sí es contraproducente:
        el sensor de picado retrasa el encendido para proteger el motor, pierdes
        potencia y, a la larga, puedes dañarlo. Si quieres el detalle completo,
        incluido cuándo compensa y cuándo no, lo desarrollamos en{" "}
        <Link href="/guias/gasolina-95-vs-98">gasolina 95 vs 98</Link>. Y si te
        interesa la teoría de fondo, en{" "}
        <Link href="/guias/cetano-octanaje-que-significan">qué significan el
        cetano y el octanaje</Link> explicamos el número que define cada familia.
      </p>

      <h2 id="diesel-a-premium-b-c">Diésel: A, premium, B y C</h2>
      <p>
        Bajo la palabra «diésel» se esconden varios gasóleos distintos. El{" "}
        <strong>gasóleo A</strong> es el diésel normal de automoción, el que
        repostas en cualquier surtidor para tu coche. Los{" "}
        <strong>diésel premium</strong> de marca son gasóleo A con un paquete
        extra de aditivos detergentes y mejoradores de cetano, pensados para
        mantener limpio el sistema de inyección; su utilidad real depende del
        estado del coche y suele ser marginal en vehículos modernos bien
        cuidados.
      </p>
      <ul>
        <li>
          <strong>Gasóleo A</strong>: diésel de carretera estándar. El que usa
          tu coche.
        </li>
        <li>
          <strong>Diésel premium</strong> (Repsol, Cepsa, BP, Galp…): mismo
          gasóleo A con más aditivos. Coste algo mayor por litro.
        </li>
        <li>
          <strong>Gasóleo B</strong>: el agrícola, teñido de rojo, con
          fiscalidad reducida para maquinaria de campo, tractores o
          embarcaciones. <strong>No es legal usarlo en un coche de carretera</strong>{" "}
          y los marcadores que lleva delatan su uso indebido.
        </li>
        <li>
          <strong>Gasóleo C</strong>: el de calefacción. Pensado para calderas,
          tampoco se usa en vehículos.
        </li>
      </ul>
      <p>
        Conviene entender que la cifra que define la calidad de un gasóleo no es
        el octanaje, sino el <strong>índice de cetano</strong>: mide la facilidad
        con la que el combustible se auto-enciende al comprimirse, justo lo
        contrario de lo que busca una gasolina. Un cetano más alto suele
        traducirse en un arranque más suave y una combustión algo más limpia, y
        es uno de los argumentos comerciales de los diésel premium. Si te
        interesa el detalle de qué miden estos números y por qué importan,
        lo desarrollamos en{" "}
        <Link href="/guias/cetano-octanaje-que-significan">qué significan el
        cetano y el octanaje</Link>.
      </p>
      <p>
        Una sutileza estacional importante: el gasóleo de automoción cambia su
        formulación en invierno para no «parafinarse» con el frío, algo que
        notarás sobre todo en zonas de montaña; lo contamos en{" "}
        <Link href="/guias/diesel-invierno-anticongelante">diésel de invierno y
        anticongelante</Link>. Para la comparación entre el A normal y los
        premium de marca, mira{" "}
        <Link href="/guias/diesel-a-vs-premium">diésel A vs premium</Link>.
      </p>

      <CompareTable
        caption="Tipos de combustible en España de un vistazo (datos típicos, 2026)"
        headers={["Combustible", "Para qué coche", "Precio relativo", "Disponibilidad"]}
        rows={[
          ["Gasolina 95 E5/E10", "Mayoría de gasolina", "Referencia", "Total"],
          ["Gasolina 98", "Alta compresión", "+8 a +15 cént/L", "Muy alta"],
          ["Diésel A (B7)", "Mayoría de diésel", "Similar al 95", "Total"],
          ["Diésel premium", "Diésel (opcional)", "Algo más caro", "Alta"],
          ["GLP / autogás", "Gasolina + kit bifuel", "~mitad por litro", "Media"],
          ["GNC", "Motores preparados", "Muy bajo por km", "Baja"],
          ["Hidrógeno", "Coche de pila de combustible", "Alto", "Muy baja"],
        ]}
      />

      <h2 id="etiquetas-surtidor-e5-e10-b7-xtl">
        Las etiquetas del surtidor: E5, E10, B7, XTL
      </h2>
      <p>
        Desde 2018, todos los surtidores de la Unión Europea llevan unas
        etiquetas armonizadas que te dicen qué hay realmente dentro de la
        manguera, con independencia del nombre comercial. Saber leerlas evita
        equivocaciones, sobre todo cuando viajas al extranjero. Hay tres formas
        geométricas:
      </p>
      <ul>
        <li>
          <strong>Círculo (gasolinas)</strong>: <strong>E5</strong> y{" "}
          <strong>E10</strong>. El número es el porcentaje máximo de bioetanol
          mezclado. La E5 (hasta 5 %) es la habitual en España y compatible con
          todos los coches; la E10 (hasta 10 %) es ya el estándar en buena parte
          de Europa y la admite la mayoría de coches de 2011 en adelante.
        </li>
        <li>
          <strong>Cuadrado (gasóleos)</strong>: <strong>B7</strong>,{" "}
          <strong>B10</strong> o <strong>XTL</strong>. La «B» con su número
          indica el porcentaje de biodiésel (FAME); el B7 es el diésel A normal
          en España. El <strong>XTL</strong> identifica los gasóleos parafínicos
          de síntesis, como el <Link href="/guias/hvo-combustible-renovable">HVO,
          el diésel renovable</Link> fabricado a partir de aceites y residuos.
        </li>
        <li>
          <strong>Rombo (gases)</strong>: <strong>H2</strong> (hidrógeno),{" "}
          <strong>CNG</strong> (gas natural comprimido), <strong>LPG</strong>{" "}
          (GLP/autogás) y <strong>LNG</strong> (gas natural licuado, sobre todo
          camiones).
        </li>
      </ul>
      <p>
        Si quieres entender la compatibilidad del bioetanol y por qué a algunos
        coches antiguos les sienta peor el E10, lo desarrollamos en{" "}
        <Link href="/guias/bioetanol-e5-vs-e10">bioetanol E5 vs E10</Link> y en{" "}
        <Link href="/guias/biodiesel-b7-b10-xtl">biodiésel B7, B10 y XTL</Link>.
      </p>

      <Callout type="warn" title="El error más caro: confundir gasolina y diésel">
        Las etiquetas y el manual existen para evitar el clásico susto de meter
        el combustible equivocado. Si te das cuenta antes de arrancar,{" "}
        <strong>no enciendas el motor</strong>: pide ayuda para vaciar el
        depósito. Arrancar con el carburante equivocado puede dañar la bomba y
        los inyectores. Tienes el protocolo paso a paso en{" "}
        <Link href="/guias/me-he-equivocado-combustible">qué hacer si te has
        equivocado de combustible</Link>.
      </Callout>

      <h2 id="gases-glp-gnc">Gases para automoción: GLP y GNC</h2>
      <p>
        Los gases son la alternativa más madura para ahorrar en combustible sin
        cambiar de coche. Hay dos, y conviene no confundirlos:
      </p>
      <ul>
        <li>
          <strong>GLP (autogás)</strong>: una mezcla de propano y butano
          licuada a presión. Es la más extendida porque un coche de gasolina se
          puede convertir a <em>bifuel</em> con un kit homologado, manteniendo
          el depósito de gasolina como reserva. El precio por litro suele rondar
          la mitad que la gasolina, aunque el consumo es algo mayor, así que el
          ahorro real depende de los kilómetros que hagas. Lo analizamos a fondo
          en <Link href="/guias/glp-autogas-espana">GLP (autogás) en España</Link>.
        </li>
        <li>
          <strong>GNC (gas natural comprimido)</strong>: metano almacenado a
          alta presión. Sale muy barato por kilómetro y emite menos, pero exige
          un coche concebido para ello y, sobre todo, hay muy pocas estaciones,
          lo que limita su uso a flotas y trayectos conocidos. Lo cuentamos en{" "}
          <Link href="/guias/gnc-gas-natural-vehicular">GNC: gas natural
          vehicular</Link>.
        </li>
      </ul>
      <p>
        Ambos gases tienen la ventaja añadida de la etiqueta ambiental ECO de la
        DGT en los coches bifuel, con sus beneficios de circulación y
        aparcamiento en ciudad. Si te mueves por zonas de bajas emisiones, ese
        detalle puede pesar tanto como el ahorro de combustible; lo vemos en{" "}
        <Link href="/guias/etiqueta-dgt-combustible">la etiqueta DGT según el
        combustible</Link>.
      </p>

      <h2 id="alternativas-hidrogeno-electrico">
        Alternativas: hidrógeno y eléctrico
      </h2>
      <p>
        Más allá de los líquidos y los gases tradicionales, hay dos vías que se
        mencionan mucho pero que hoy ocupan posiciones muy distintas en el día a
        día español:
      </p>
      <ul>
        <li>
          <strong>Hidrógeno</strong>: alimenta coches de pila de combustible que
          generan electricidad a bordo y solo emiten vapor de agua. La
          tecnología funciona, pero la red de hidrogeneras en España se cuenta
          con los dedos de una mano, lo que hace inviable un uso particular
          generalizado por ahora. Repasamos su estado real en{" "}
          <Link href="/guias/coche-hidrogeno-espana">el coche de hidrógeno en
          España</Link>.
        </li>
        <li>
          <strong>Eléctrico</strong>: el coche eléctrico de batería no «reposta»
          combustible, se carga de electricidad, por lo que queda fuera de la
          comparativa de surtidor; aun así, mucha gente duda entre eléctrico y
          térmico por coste total. Si estás en ese punto, te ayudan{" "}
          <Link href="/guias/coche-electrico-vs-gasolina-coste">coche eléctrico
          vs gasolina: coste</Link> y{" "}
          <Link href="/guias/coche-diesel-o-gasolina">diésel o gasolina: cuál
          comprar</Link>.
        </li>
      </ul>

      <h2 id="adblue-aditivos">AdBlue y aditivos</h2>
      <p>
        El <strong>AdBlue</strong> no es un combustible: es un aditivo de urea
        que muchos diésel modernos necesitan para limpiar los gases de escape
        mediante el sistema SCR. Va en un depósito aparte, con su propia boca de
        llenado, y se consume despacio (del orden de un litro cada varios
        cientos de kilómetros, según el coche). Si el coche se queda sin AdBlue,
        normalmente entra en modo de emergencia y acaba no permitiendo el
        arranque hasta rellenarlo, así que conviene no apurar. Lo explicamos
        entero en <Link href="/guias/que-es-el-adblue">qué es el AdBlue</Link>.
      </p>
      <p>
        Caso aparte son los <strong>aditivos de bote</strong> que se venden para
        echar al depósito (limpiainyectores, mejoradores de cetano, antihumedad).
        Pueden tener sentido puntual en motores con muchos kilómetros o tras un
        repostaje dudoso, pero no hacen milagros ni sustituyen el mantenimiento.
        Repasamos qué funciona y qué es marketing en{" "}
        <Link href="/guias/aditivos-combustible-sirven">¿sirven los aditivos de
        combustible?</Link>.
      </p>

      <h2 id="que-combustible-le-conviene-a-tu-coche">
        ¿Qué combustible le conviene a tu coche?
      </h2>
      <p>
        El combustible que le conviene a tu coche es, casi siempre, el que indica
        el fabricante en el manual y en la pegatina de la tapa del depósito: ahí
        verás el octanaje mínimo (RON 95 o 98) si es gasolina o la etiqueta B7 si
        es diésel. Ese dato manda sobre cualquier costumbre o consejo de barra de
        bar.
      </p>
      <p>
        A partir de ahí, la decisión práctica se reduce a unos pocos casos:
      </p>
      <ul>
        <li>
          <strong>Coche de gasolina normal</strong>: gasolina 95 (E5 o E10 si es
          de 2011 o posterior). La 98 solo si el manual la pide.
        </li>
        <li>
          <strong>Deportivo o alta compresión</strong>: la 98 (o 100) que exija
          el fabricante; no bajes de ahí salvo apuro puntual.
        </li>
        <li>
          <strong>Coche diésel</strong>: gasóleo A (B7). El premium es opcional;
          el AdBlue, obligatorio si tu coche lo lleva.
        </li>
        <li>
          <strong>Muchos kilómetros urbanos al año</strong>: valora convertir a
          GLP por el ahorro por litro y la etiqueta ECO, calculando antes la
          amortización.
        </li>
      </ul>
      <p>
        Una vez sabes qué surtidor buscar, lo que más dinero te ahorra no es el
        tipo de combustible en sí, sino <strong>dónde y cuándo repostas</strong>.
        El precio del mismo gasóleo A o de la misma 95 puede variar varios
        céntimos por litro entre dos estaciones a pocos kilómetros. Por eso
        merece la pena comparar precios reales antes de llenar: te lo ponemos
        fácil en <Link href="/guias/gasolinera-mas-barata-cerca-como-encontrar">cómo
        encontrar la gasolinera más barata cerca</Link> y en{" "}
        <Link href="/guias/cuanto-se-ahorra-comparando-gasolineras">cuánto se
        ahorra comparando gasolineras</Link>.
      </p>

      <Callout type="note" title="Regla de oro antes de repostar">
        Mira la pegatina de la tapa, confirma la etiqueta del surtidor (E5/E10,
        B7, LPG…) y compara el precio en la app. Tres segundos que te ahorran
        sustos caros y unos cuantos euros en cada lleno.
      </Callout>

      <h2 id="combustible-marca-vs-low-cost">
        ¿Es mejor el combustible de marca o el de gasolinera low cost?
      </h2>
      <p>
        Para la mayoría de coches, el combustible de una gasolinera low cost
        cumple la misma normativa de calidad que el de las grandes marcas: la
        diferencia práctica suele ser pequeña y se reduce a los aditivos
        detergentes y, sobre todo, al precio por litro. Para un uso normal,
        repostar en una low cost bien surtida es una forma válida de ahorrar.
      </p>
      <p>
        El gasóleo A y la gasolina 95 que se venden en España, vengan de la marca
        que vengan, deben cumplir las mismas especificaciones técnicas. Las
        diferencias se concentran en dos puntos. El primero son los{" "}
        <strong>aditivos detergentes</strong> que las gamas premium incorporan
        para mantener limpios inyectores y cámara de combustión; su beneficio es
        real pero tiende a ser modesto en un coche moderno bien mantenido. El
        segundo, y el que más nota tu bolsillo, es el <strong>precio</strong>:
        entre dos surtidores del mismo combustible puede haber varios céntimos
        por litro de diferencia.
      </p>
      <ul>
        <li>
          <strong>Uso normal y kilometraje alto</strong>: prioriza el precio.
          Una low cost con buena rotación de producto suele ser la opción más
          sensata para el bolsillo.
        </li>
        <li>
          <strong>Motor con muchos años o consumos altos</strong>: alternar de
          vez en cuando un depósito premium puede ayudar a la limpieza, sin
          pagar el extra en todos los repostajes.
        </li>
        <li>
          <strong>En cualquier caso</strong>: el ahorro grande está en comparar
          precios, no en la marca del rótulo.
        </li>
      </ul>
      <p>
        Si te ronda el tópico de que «la gasolinera barata estropea el coche»,
        lo matizamos en{" "}
        <Link href="/guias/gasolineras-low-cost">gasolineras low cost: ¿son
        peores?</Link>. Y como en cada estación los precios y las etiquetas se
        leen igual, te viene bien repasar{" "}
        <Link href="/guias/como-leer-precios-surtidor">cómo leer los precios del
        surtidor</Link> para no llevarte sorpresas al pagar.
      </p>

      <AppCta
        title="Compara el precio real de cada combustible cerca de ti"
        body="Carburantes lee los datos oficiales del Ministerio cada media hora. Filtra por tu combustible —gasolina 95 o 98, diésel A, GLP, GNC— y ordena las gasolineras por precio, busca por municipio o usa «Cerca de mí»."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/gasolina-95-vs-98", label: "Gasolina 95 vs 98" },
          { href: "/guias/diesel-a-vs-premium", label: "Diésel A vs premium" },
          { href: "/guias/glp-autogas-espana", label: "GLP (autogás)" },
          { href: "/guias/gnc-gas-natural-vehicular", label: "GNC: gas natural vehicular" },
          { href: "/guias/coche-hidrogeno-espana", label: "Coche de hidrógeno" },
          { href: "/guias/que-es-el-adblue", label: "Qué es el AdBlue" },
        ]}
      />
    </>
  );
}

export default guide;
