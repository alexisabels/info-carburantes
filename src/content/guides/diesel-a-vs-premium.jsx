import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "diesel-a-vs-premium";
const title = "Diésel A, premium, B y C: qué son y cuál pone tu coche";
const description =
  "Te explicamos las diferencias entre el diésel A (coches), el diésel premium con aditivos, el gasóleo B (agrícola) y el C (calefacción). Cuándo conviene cada uno.";

const guide = {
  slug,
  title,
  seoTitle: "Diésel A, premium, B y C: diferencias · Guía",
  description,
  category: "tipos-combustible",
  datePublished: "2026-05-25",
  dateModified: "2026-05-25",
  readingMinutes: 6,
  keywords: [
    "diésel A vs premium",
    "gasóleo B C diferencias",
    "diésel agrícola coche",
    "diésel premium aditivos",
    "diésel calefacción",
  ],
  mentions: [
    { "@type": "Thing", name: "Diésel A" },
    { "@type": "Thing", name: "Diésel premium" },
    { "@type": "Thing", name: "Gasóleo B" },
    { "@type": "Thing", name: "Gasóleo C" },
  ],
  faq: [
    {
      q: "¿Puedo poner gasóleo B en mi coche?",
      a: "No. Es ilegal y sancionable. El gasóleo B está fiscalmente bonificado para uso agrícola e industrial, está tintado de rojo para detectarlo en inspecciones, y aunque químicamente es muy similar al diésel A, los inspectores tienen detectores de tinte. La multa por usar gasóleo B en un vehículo de carretera puede superar los 1.500 €.",
    },
    {
      q: "¿Qué diferencia hay entre diésel A y diésel premium?",
      a: "El diésel premium es el mismo combustible base con aditivos detergentes y modificadores de cetano añadidos por la marca. Cuesta entre 4 y 10 céntimos más por litro y, en un coche moderno, el beneficio real es marginal salvo que tengas un motor con problemas previos de inyectores.",
    },
    {
      q: "¿El gasóleo C es para coches viejos?",
      a: "No. El gasóleo C es para calderas de calefacción doméstica e industrial. Tiene un contenido de azufre mucho mayor que el diésel A y dañaría el motor de cualquier coche moderno. Se vende solo a granel para depósitos de calefacción y también es ilegal usarlo en automoción.",
    },
    {
      q: "¿Por qué se llama 'A' al diésel de los coches?",
      a: "Por la antigua clasificación fiscal española de gasóleos: A para automoción, B para usos agrícolas/industriales bonificados, y C para calefacción. La denominación 'A' se mantiene aunque la normativa europea moderna (EN 590) usa otra nomenclatura.",
    },
    {
      q: "¿Es lo mismo gasóleo y diésel?",
      a: "Sí, son sinónimos en España. 'Diésel' es la traducción coloquial (por el ingeniero Rudolf Diesel) y 'gasóleo' es el nombre técnico/fiscal. La etiqueta oficial en los surtidores suele decir 'Gasóleo A' o 'Diésel A' indistintamente.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        En España hay tres tipos de diésel: el <strong>diésel A</strong> (o
        gasóleo A) es el único legal para coches y camiones; el{" "}
        <strong>diésel B</strong> (gasóleo B) es para tractores y maquinaria
        agrícola, fiscalmente bonificado y tintado de rojo para evitar fraude;
        el <strong>diésel C</strong> (gasóleo C) es para calderas de
        calefacción y nunca debe entrar en un motor de coche. El{" "}
        <strong>diésel premium</strong> es el mismo diésel A con aditivos
        detergentes añadidos por la marca y cuesta 4-10 céntimos más por litro.
      </Answer>

      <Tldr
        items={[
          "Diésel A: el de tu coche. Único legal en automoción.",
          "Diésel B: agrícola/industrial, bonificado fiscalmente. Ilegal usarlo en coche.",
          "Diésel C: calefacción doméstica. NUNCA en motores.",
          "Diésel premium: diésel A + aditivos detergentes. Sobrecoste de 4-10 cént/L.",
        ]}
      />

      <h2 id="diesel-a">Diésel A (gasóleo A): el de tu coche</h2>
      <p>
        El diésel A es el combustible estándar para vehículos de carretera con
        motor de gasóleo: turismos, furgonetas, camiones, autocares. Cumple
        la norma europea EN 590, que regula:
      </p>
      <ul>
        <li>Cetanaje mínimo (similar al octanaje pero para diésel): 51.</li>
        <li>
          Contenido máximo de azufre: 10 mg/kg (los antiguos diéseles superaban
          los 350 mg/kg).
        </li>
        <li>
          Contenido de FAME (biodiésel): hasta 7 % desde 2009, lo que lo
          convierte oficialmente en «B7».
        </li>
        <li>Punto de inflamación, lubricidad, viscosidad, etc.</li>
      </ul>
      <p>
        Todo el diésel A vendido en España cumple esa norma, da igual que sea{" "}
        <Link href="/marca/repsol">Repsol</Link>,{" "}
        <Link href="/marca/cepsa">Cepsa</Link> o{" "}
        <Link href="/marca/ballenoil">Ballenoil</Link>. La fiscalidad incluye
        impuestos especiales completos (céntimos por litro destinados a
        Tráfico, sanidad y obras públicas).
      </p>

      <h2 id="diesel-premium">Diésel premium: el mismo combustible con extras</h2>
      <p>
        Todas las grandes marcas comercializan una gama «premium» del diésel:
        Repsol Diesel e+, Cepsa Óptima Diésel, BP Ultimate Diésel, Galp
        G-Force Diésel, etc. Lo que cambia respecto al diésel A normal son
        los aditivos:
      </p>
      <ul>
        <li>
          <strong>Detergentes</strong>: limpian depósitos en los inyectores
          y mantienen el spray de inyección óptimo.
        </li>
        <li>
          <strong>Modificadores de cetano</strong>: elevan el cetanaje desde 51
          hasta ~55, mejorando ligeramente el arranque en frío y reduciendo
          el ruido típico del motor diésel.
        </li>
        <li>
          <strong>Inhibidores de corrosión y lubricantes</strong>: protegen el
          sistema de inyección.
        </li>
      </ul>
      <p>
        El sobrecoste oscila entre 4 y 10 céntimos por litro. ¿Vale la pena?
        En un coche moderno bien mantenido, el beneficio práctico es
        marginal. En un coche con inyectores ya sucios, hacer 2-3 depósitos
        de premium seguidos puede mejorar la respuesta del motor. La
        estrategia óptima: <strong>repostar diésel A normal el 90 % del
        tiempo</strong> y hacer un depósito de premium cada 6-12 meses como
        «limpieza» preventiva.
      </p>

      <Callout type="info" title="Mito habitual: 'el premium reduce consumo'">
        Las marcas suelen prometer mejoras del 2-4 % de consumo con el
        premium. Es cierto en condiciones de laboratorio y motores con
        problemas previos; en condiciones reales con un coche sano, la
        mejora medible es nula o por debajo del margen de error. El
        sobrecoste por litro no se compensa.
      </Callout>

      <h2 id="diesel-b">Gasóleo B: el del campo</h2>
      <p>
        El gasóleo B es químicamente casi idéntico al diésel A (mismo cetanaje
        y características generales), pero <strong>fiscalmente está
        bonificado</strong>: paga menos impuestos especiales porque su uso
        está restringido a:
      </p>
      <ul>
        <li>
          <strong>Maquinaria agrícola</strong>: tractores, cosechadoras,
          riego, generadores en explotaciones.
        </li>
        <li>
          <strong>Maquinaria industrial fija</strong>: grupos electrógenos,
          montacargas en obra, etc.
        </li>
        <li>
          <strong>Embarcaciones de pesca</strong>.
        </li>
      </ul>
      <p>
        Para impedir su uso fraudulento en automoción, el gasóleo B va
        tintado con un colorante <strong>rojo</strong> visible a simple
        vista en el depósito. Los agentes de Tráfico y la Guardia Civil
        pueden inspeccionar el depósito de cualquier vehículo y, si
        detectan tinte rojo, levantan acta:
      </p>
      <ul>
        <li>
          Multa por evadir impuestos especiales (puede superar los 1.500 €
          para un turismo, mucho más en camiones).
        </li>
        <li>
          Pago retroactivo de la diferencia fiscal por los litros consumidos
          fraudulentamente.
        </li>
        <li>En casos graves, retirada del vehículo.</li>
      </ul>

      <h2 id="diesel-c">Gasóleo C: solo para calefacción</h2>
      <p>
        El gasóleo C es el combustible que se quema en las calderas de
        calefacción central de edificios y viviendas unifamiliares con
        depósito propio. Sus características son muy distintas al diésel A:
      </p>
      <ul>
        <li>
          <strong>Contenido de azufre alto</strong>: hasta 1000 mg/kg
          (100 veces más que el diésel A). Las calderas tienen sistemas de
          combustión preparados para eso, pero un motor moderno con filtro
          de partículas se atascaría en horas.
        </li>
        <li>
          <strong>Sin aditivos para automoción</strong>: cetanaje y lubricidad
          mucho menores.
        </li>
        <li>
          <strong>Tintado de azul</strong> para distinguirlo del A y del B.
        </li>
        <li>
          <strong>Bonificación fiscal muy alta</strong>: por eso es ~30 %
          más barato que el diésel A.
        </li>
      </ul>
      <p>
        Usar gasóleo C en un coche es tan ilegal como usar gasóleo B, pero
        además es <em>técnicamente desastroso</em>: en pocos cientos de
        kilómetros se cargan los inyectores, el filtro de partículas y, en
        muchos casos, los pistones.
      </p>

      <CompareTable
        caption="Comparativa rápida"
        headers={["Tipo", "Uso", "Tinte", "Precio aprox.", "Legal en coche"]}
        rows={[
          ["Diésel A", "Coches, camiones", "—", "Estándar", "Sí"],
          ["Diésel premium", "Coches", "—", "+4-10 cént/L", "Sí"],
          ["Diésel B (gasóleo agrícola)", "Tractores, maquinaria", "Rojo", "-15-25 %", "No (multa)"],
          ["Diésel C (calefacción)", "Calderas", "Azul", "-30 % vs A", "No (daño + multa)"],
        ]}
      />

      <h2 id="dudas-frecuentes">Dudas frecuentes</h2>
      <p>
        <strong>¿Y si me he equivocado y he echado gasolina en un diésel?</strong>{" "}
        Aún sin haber arrancado, el coche debe ir a un taller para drenar
        completamente el depósito y la línea de combustible. Si has
        arrancado y has rodado, los daños pueden ir desde inyectores hasta
        bomba de alta y catalizador — son varios miles de euros.
      </p>
      <p>
        <strong>¿Puedo mezclar diésel A y diésel premium?</strong> Sí, sin
        problema. La mezcla es estable.
      </p>
      <p>
        <strong>¿Hay diferencia entre el diésel A de invierno y verano?</strong>{" "}
        Sí. Por norma europea, en invierno el diésel A lleva aditivos
        anticongelantes para evitar que se forme parafina a temperaturas
        bajo cero (esto se conoce como POFF o punto de obstrucción de
        filtros). Las gasolineras lo cambian estacionalmente sin que el
        usuario tenga que hacer nada.
      </p>

      <AppCta
        title="Mira el precio del diésel A y premium cerca de ti"
        body="Carburantes muestra ambos precios en cada estación. Compara antes de elegir y ahorra unos céntimos por litro."
        href="/"
        linkLabel="Buscar diésel cerca"
      />

      <InternalLinks
        title="Más guías de combustible"
        links={[
          { href: "/guias/gasolina-95-vs-98", label: "Gasolina 95 vs 98: cuál usar" },
          { href: "/guias/bioetanol-e5-vs-e10", label: "Bioetanol E5 vs E10" },
          { href: "/guias/que-es-el-adblue", label: "Qué es el AdBlue" },
          { href: "/guias/bonificacion-gasoleo-profesional", label: "Bonificación del gasóleo profesional" },
          { href: "/guias/coche-diesel-o-gasolina", label: "Diésel o gasolina: cuál comprar en 2026" },
        ]}
      />
    </>
  );
}

export default guide;
