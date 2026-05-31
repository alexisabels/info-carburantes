import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "me-he-equivocado-combustible";
const title = "Me he equivocado de combustible: qué hacer paso a paso";
const description =
  "¿Has echado gasolina en un diésel (o al revés)? Te explicamos qué hacer al instante para no dañar el motor, qué cuesta arreglarlo y cómo evitarlo.";

const guide = {
  slug,
  title,
  seoTitle: "Equivocarse de combustible: qué hacer · Guía",
  description,
  category: "practico",
  datePublished: "2026-05-27",
  dateModified: "2026-05-27",
  readingMinutes: 6,
  keywords: [
    "echar gasolina en diésel",
    "me he equivocado de combustible",
    "gasolina en coche diésel qué hacer",
    "repostar mal combustible",
  ],
  mentions: [
    { "@type": "Thing", name: "Diésel" },
    { "@type": "Thing", name: "Gasolina" },
  ],
  faq: [
    {
      q: "¿Qué pasa si echo gasolina a un diésel?",
      a: "La gasolina reduce la lubricación del gasóleo, sobre la que se apoya todo el sistema de inyección diésel. La bomba de alta presión y los inyectores trabajan con tolerancias de micras y se lubrican con el propio gasóleo; al diluirlo con gasolina, las piezas rozan en seco y pueden desgastarse o griparse. Si además arrancas, esas limaduras metálicas circulan por todo el circuito y multiplican el daño. Por eso es la equivocación más cara: en sistemas common-rail modernos puede convertir un simple vaciado de depósito en una reparación de varios miles de euros. La regla es clara: no arranques y llama a la asistencia.",
    },
    {
      q: "¿Puedo arrancar si me he equivocado poco?",
      a: "No conviene dar por hecho que un poco es inofensivo, sobre todo en un diésel. Lo más seguro es no arrancar en ningún caso y dejar que un profesional valore la mezcla. Dicho esto, los talleres suelen manejar como orientación que una proporción pequeña de gasolina en un diésel (en torno a un 5 % o menos del depósito) a veces se tolera diluyéndola con gasóleo hasta llenar, pero nadie debería decidir eso por su cuenta sin conocer el coche ni el sistema de inyección. Ante la duda, trátalo como un error grave: no des al contacto y consulta.",
    },
    {
      q: "¿Cuánto cuesta vaciar el depósito?",
      a: "El vaciado y limpieza del depósito en sí suele moverse, de media en España en 2026, en torno a 150-400 euros si el coche no ha arrancado, según el modelo, el acceso al depósito y si hay que purgar también las líneas. La asistencia en carretera puede ir incluida en tu seguro o costar aparte. El problema no es el vaciado, sino lo que pasa si arrancas: ahí el coste se dispara porque puede haber que sustituir bomba e inyectores. Confirma siempre el precio del servicio antes de autorizarlo.",
    },
    {
      q: "¿Y si echo diésel en un gasolina?",
      a: "Es bastante menos frecuente porque la boquilla del surtidor de diésel es más gruesa y no suele entrar bien en el cuello del depósito de un coche de gasolina. Si ocurre, suele ser menos grave que al revés: el diésel no se vaporiza ni se enciende bien con la bujía, así que el coche típicamente petardea, echa humo blanco, pierde fuerza y acaba calándose. No daña el sistema de inyección como la gasolina en un diésel. Aun así, no debes circular: no arranques, vacía el depósito y limpia el circuito antes de volver a repostar el combustible correcto.",
    },
    {
      q: "¿Cómo sé qué combustible usa mi coche?",
      a: "El dato fiable está en el manual del vehículo y en una pegatina junto a la tapa del depósito, donde aparece el símbolo del combustible (por ejemplo B7 para diésel o E5 y E10 para gasolina). No te fíes del color del surtidor ni de la costumbre, porque cambian entre estaciones y entre países. Si conduces un coche que no es el tuyo (alquiler, sustitución, empresa), comprueba la pegatina antes de descolgar la manguera.",
    },
  ],
  Body,
};

guide.howTo = {
  name: "Qué hacer si te equivocas de combustible al repostar",
  description:
    "Pasos para reaccionar correctamente cuando has echado gasolina en un diésel o diésel en un gasolina, minimizando el daño al motor.",
  totalTime: "PT5M",
  steps: [
    {
      name: "No arranques el motor",
      text: "En cuanto te des cuenta del error, no des al contacto. Mientras el coche no arranca, el combustible equivocado se queda en el depósito y no llega al sistema de inyección.",
      anchor: "no-arranques",
    },
    {
      name: "Valora la gravedad según el caso",
      text: "Gasolina en un diésel es lo más grave porque arruina la lubricación del sistema de inyección. Diésel en un gasolina suele ser menos dañino. Identifica qué error has cometido.",
      anchor: "gasolina-en-diesel",
    },
    {
      name: "Llama a la asistencia y vacía el depósito",
      text: "Avisa a tu seguro o a un servicio de asistencia para que remolquen el coche o vacíen el depósito in situ. El vaciado y limpieza evita que el combustible equivocado dañe el motor.",
      anchor: "vaciado-deposito",
    },
    {
      name: "Repón el combustible correcto y revisa el surtidor",
      text: "Una vez limpio el circuito, reposta el combustible correcto. Para no repetirlo, comprueba siempre la etiqueta del surtidor y la pegatina del depósito antes de repostar.",
      anchor: "como-evitarlo",
    },
  ],
};

function Body() {
  return (
    <>
      <Answer>
        Si te has equivocado de combustible, lo más importante es{" "}
        <strong>no arrancar el motor</strong>: mientras el coche no se pone en
        marcha, el combustible erróneo se queda en el depósito y el daño es
        reparable con un simple vaciado. La equivocación grave es{" "}
        <strong>echar gasolina en un diésel</strong>, porque arruina la
        lubricación del sistema de inyección; el caso contrario (diésel en un
        gasolina) suele ser más leve. En ambos casos: no des al contacto y
        llama a la asistencia.
      </Answer>

      <Tldr
        items={[
          "Regla de oro: NO arranques el motor. Es lo único que separa un susto barato de una reparación cara.",
          "Gasolina en diésel = lo más grave (daña bomba e inyectores por falta de lubricación).",
          "Diésel en gasolina = menos dañino, pero tampoco debes circular.",
          "Vaciar el depósito sin haber arrancado cuesta, de media, ~150-400 € en España (2026).",
          "Si has arrancado, el coste puede multiplicarse: avisa de inmediato a la asistencia.",
        ]}
      />

      <h2 id="no-arranques">Lo primero: NO arranques el motor</h2>
      <p>
        Es la única decisión que de verdad cambia el desenlace. Mientras el
        coche permanece apagado, el combustible equivocado está quieto en el
        depósito y no ha tocado la bomba ni los inyectores. En ese estado, el
        problema se resuelve vaciando y limpiando el depósito, y rara vez pasa
        de un disgusto y unas horas perdidas.
      </p>
      <p>
        El error que dispara la factura es <strong>dar al contacto</strong>{" "}
        «para ver si pasa algo» o para mover el coche unos metros. En cuanto el
        motor gira, una bomba empieza a aspirar la mezcla y la empuja por todo
        el circuito de alta presión. A partir de ahí el combustible erróneo ya
        no está solo en el depósito: está en las tuberías, en la bomba y en los
        inyectores, y limpiarlo es mucho más complejo y caro.
      </p>
      <ul>
        <li>
          <strong>No metas la llave en el contacto ni pulses el botón de
          arranque.</strong> En coches con arranque por botón, ni siquiera
          dejes el sistema en «contacto» (ACC/ON) más de lo imprescindible.
        </li>
        <li>
          <strong>No muevas el coche con el motor.</strong> Si estorba en el
          surtidor, empújalo a mano (en punto muerto) o pide ayuda al personal
          de la estación.
        </li>
        <li>
          <strong>Avisa en la estación</strong> y llama a tu seguro o a un
          servicio de asistencia. Diles exactamente qué combustible has echado
          y en qué tipo de coche.
        </li>
      </ul>

      <Callout type="warn" title="La diferencia entre 200 € y 3.000 €">
        En casi todos los casos, el factor que decide si la reparación es
        barata o ruinosa es uno solo: si arrancaste o no. Un depósito con la
        mezcla equivocada pero motor apagado se limpia y listo. El mismo
        depósito tras unos kilómetros de marcha puede implicar sustituir la
        bomba de alta presión y los inyectores de un diésel moderno. Ante la
        duda, no arranques.
      </Callout>

      <h2 id="gasolina-en-diesel">Gasolina en diésel: por qué es lo más grave</h2>
      <p>
        Es el error más caro y, por desgracia, el más habitual: la boquilla del
        surtidor de gasolina es más fina y entra sin problema en el cuello del
        depósito de un diésel. La clave está en que el gasóleo no es solo
        combustible, también es el <strong>lubricante</strong> del sistema de
        inyección.
      </p>
      <p>
        La bomba de alta presión y los inyectores de un diésel trabajan con
        tolerancias de micras y se lubrican con el propio gasóleo que bombean.
        La gasolina actúa como disolvente: rebaja esa capacidad lubricante, de
        modo que las piezas internas empiezan a rozar prácticamente en seco. El
        resultado puede ir desde un desgaste acelerado hasta el gripado de la
        bomba, que además suelta limaduras metálicas que contaminan todo el
        circuito.
      </p>
      <p>
        En sistemas <strong>common-rail</strong> modernos —los de prácticamente
        cualquier diésel de los últimos veinte años— esto es especialmente
        delicado, porque trabajan a presiones altísimas y son muy sensibles a
        la lubricación. Por eso, ante gasolina en un diésel, la recomendación es
        siempre la misma y sin matices: <strong>no arranques</strong> y deja que
        un profesional vacíe el depósito. Si quieres entender mejor las
        variantes del gasóleo y qué pide tu coche, lo vemos en la{" "}
        <Link href="/guias/diesel-a-vs-premium">guía de diésel A vs premium</Link>.
      </p>

      <h2 id="diesel-en-gasolina">Diésel en gasolina: menos dañino</h2>
      <p>
        El error inverso es bastante menos común, y normalmente la propia
        física lo dificulta: la boquilla del surtidor de diésel es más gruesa y
        no suele entrar bien en el cuello del depósito de un coche de gasolina.
        Cuando aun así ocurre, las consecuencias suelen ser menos serias.
      </p>
      <p>
        Un motor de gasolina enciende la mezcla con la chispa de la bujía, y el
        diésel no se vaporiza ni prende bien con esa chispa. Lo que notarás, si
        llegaras a arrancar, es un motor que petardea, echa humo blanco, pierde
        fuerza, va a tirones y acaba calándose. Es desagradable y deja el coche
        inservible hasta que se limpia, pero no destruye el sistema de inyección
        del mismo modo que la gasolina arruina un diésel.
      </p>
      <p>
        Aun así, la conducta correcta es idéntica: <strong>no circules</strong>.
        No arranques, vacía el depósito y purga el circuito antes de volver a
        echar el combustible adecuado. Si dudas de qué combustible usa tu coche
        —algo habitual con coches de alquiler o de empresa—, compruébalo siempre
        en la etiqueta antes de repostar, como explicamos en la{" "}
        <Link href="/guias/etiqueta-dgt-combustible">guía de etiquetas del surtidor</Link>.
      </p>

      <CompareTable
        caption="Gasolina en diésel vs diésel en gasolina (orientación general, no sustituye el criterio de un taller)"
        headers={["Aspecto", "Gasolina en diésel", "Diésel en gasolina"]}
        rows={[
          ["Frecuencia", "Más habitual (boquilla fina entra)", "Poco habitual (boquilla gruesa no entra bien)"],
          ["Gravedad", "Alta", "Media-baja"],
          ["Riesgo principal", "Daño a bomba e inyectores por falta de lubricación", "Motor que petardea, humea y se cala"],
          ["Si NO arrancas", "Vaciado y limpieza de depósito", "Vaciado y limpieza de depósito"],
          ["Si arrancas", "Posible reparación de varios miles de €", "Limpieza más laboriosa, daño grave poco probable"],
          ["Qué hacer", "No arrancar y llamar a asistencia", "No arrancar y llamar a asistencia"],
        ]}
      />

      <h2 id="vaciado-deposito">Vaciado del depósito: coste y proceso</h2>
      <p>
        La solución, en ambos casos, pasa por extraer el combustible
        equivocado y limpiar el circuito antes de reponer el correcto. El
        proceso lo realiza un servicio de asistencia o un taller, y a grandes
        rasgos consiste en:
      </p>
      <ul>
        <li>
          <strong>Vaciar el depósito</strong>, normalmente succionando el
          líquido por el cuello de llenado o desmontando el depósito según el
          modelo.
        </li>
        <li>
          <strong>Limpiar o aclarar el depósito</strong> para arrastrar restos
          del combustible erróneo.
        </li>
        <li>
          <strong>Purgar las líneas</strong> si hubo arranque o si la mezcla
          pudo llegar más allá del depósito.
        </li>
        <li>
          <strong>Reponer el combustible correcto</strong> y comprobar que el
          coche arranca y funciona con normalidad.
        </li>
      </ul>
      <p>
        En cuanto al coste, conviene separar dos escenarios. Si{" "}
        <strong>no has arrancado</strong>, el vaciado y limpieza suele moverse,
        de media en España en 2026, en torno a{" "}
        <strong>~150-400 €</strong> según el modelo, lo accesible que sea el
        depósito y si hace falta purgar también las líneas; a eso puede sumarse
        la asistencia en carretera, que en muchas pólizas va incluida. Si{" "}
        <strong>sí has arrancado</strong>, no hay cifra orientativa fiable: la
        factura depende del daño y, en un diésel, puede escalar a varios miles
        de euros si hay que sustituir bomba e inyectores. Por eso insistimos
        tanto en lo de no dar al contacto.
      </p>
      <Callout type="info" title="Antes de autorizar el servicio">
        Pregunta siempre el precio cerrado del vaciado y revisa tu póliza de
        seguro: muchas asistencias en carretera cubren el remolque hasta el
        taller, lo que reduce bastante el desembolso. Y guarda el ticket del
        repostaje: a veces ayuda a justificar lo ocurrido.
      </Callout>

      <h2 id="como-evitarlo">Cómo no volver a equivocarte</h2>
      <p>
        La equivocación casi siempre ocurre con el piloto automático puesto:
        coche distinto al habitual, prisa, manguera descolgada por inercia.
        Estos hábitos sencillos la evitan casi por completo:
      </p>
      <ul>
        <li>
          <strong>Lee la etiqueta del surtidor antes de descolgar.</strong> En
          España el surtidor indica el combustible con códigos normalizados (B7
          para diésel, E5 y E10 para gasolina). Saber leerlos te quita dudas;
          lo detallamos en la{" "}
          <Link href="/guias/como-leer-precios-surtidor">guía de cómo leer los precios del surtidor</Link>.
        </li>
        <li>
          <strong>Mira la pegatina junto a la tapa del depósito.</strong> Casi
          todos los coches recientes la llevan con el símbolo del combustible
          que admiten. Es tu referencia definitiva, no el color de la manguera.
        </li>
        <li>
          <strong>Desconfía si conduces un coche que no es el tuyo.</strong>{" "}
          Alquiler, sustitución del taller, coche de empresa: ahí es donde más
          gente se equivoca. Comprueba el combustible antes de salir.
        </li>
        <li>
          <strong>Sin prisas en la estación.</strong> Un par de segundos
          mirando la etiqueta cuesta menos que cualquier reparación.
        </li>
      </ul>
      <p>
        Si quieres afianzar la rutina completa de repostar bien —desde apagar el
        motor hasta cerrar el tapón—, repásala en la{" "}
        <Link href="/guias/repostar-correctamente-pasos">guía de cómo repostar paso a paso</Link>.
      </p>

      <AppCta
        title="Reposta con cabeza y al mejor precio"
        body="Una vez tengas claro qué combustible pide tu coche, en Carburantes comparas el precio real de cada estación con los datos del Ministerio. Busca por municipio o pulsa «Cerca de mí» para encontrar la más barata sin desviarte."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/etiqueta-dgt-combustible", label: "Etiquetas del surtidor" },
          { href: "/guias/repostar-correctamente-pasos", label: "Cómo repostar paso a paso" },
          { href: "/guias/diesel-a-vs-premium", label: "Diésel A vs premium" },
        ]}
      />
    </>
  );
}

export default guide;
