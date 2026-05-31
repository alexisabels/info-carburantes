import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "presion-neumaticos-consumo";
const title = "Cómo la presión de los neumáticos afecta a tu consumo";
const description =
  "Unos neumáticos poco inflados aumentan el consumo y se desgastan antes. Te explicamos la presión correcta, cuánto se ahorra y cada cuánto revisarla.";

const guide = {
  slug,
  title,
  seoTitle: "Presión de neumáticos y consumo · Guía",
  description,
  category: "conduccion",
  datePublished: "2026-05-16",
  dateModified: "2026-05-16",
  readingMinutes: 5,
  keywords: [
    "presión neumáticos consumo",
    "neumáticos poco inflados gasta más",
    "presión correcta neumáticos",
    "ahorrar gasolina neumáticos",
  ],
  mentions: [{ "@type": "Thing", name: "Neumáticos" }],
  faq: [
    {
      q: "¿Cuánto consume de más un neumático poco inflado?",
      a: "Depende de cuánto le falte. Con medio bar por debajo de lo recomendado el gasto sube poco, en torno a un 1-2 % de media. Pero si circulas con 0,5 bar de menos en las cuatro ruedas de forma habitual, el consumo extra puede situarse típicamente entre el 3 % y el 5 %. En España, con un coche que gaste unos 6 litros a los 100 km, eso son varias decenas de euros al año tirados solo por no inflar. Es una de las causas de mayor consumo más baratas de corregir.",
    },
    {
      q: "¿Qué presión debo llevar?",
      a: "La que indica el fabricante de tu coche, no la del neumático. La encuentras en una pegatina en el marco de la puerta del conductor, en la tapa del depósito o en el manual. Suele dar dos valores: carga normal y carga máxima (coche lleno o con remolque). Si vas cargado o haces autovía, usa el valor alto. Esa presión se mide siempre en frío, con el coche parado o tras menos de un par de kilómetros.",
    },
    {
      q: "¿Inflar de más ahorra gasolina?",
      a: "Solo un poco y a costa de otras cosas. Subir 0,2-0,3 bar sobre lo recomendado, sobre todo en viaje cargado o autovía, reduce algo la resistencia y baja levemente el consumo. Pero pasarte mucho (más de 0,5 bar) hace que el neumático apoye solo por el centro: pierdes agarre, frenas peor, el coche va más incómodo y la banda central se desgasta antes. El ahorro extra no compensa el riesgo. Quédate en lo recomendado o, como mucho, un pelín por encima.",
    },
    {
      q: "¿Cada cuánto reviso la presión?",
      a: "Al menos una vez al mes y siempre antes de un viaje largo. El neumático pierde de forma natural en torno a 0,1 bar al mes, y más con el frío: por cada 10 grados que baja la temperatura se pierde aproximadamente 0,1 bar. Por eso en invierno conviene revisarla más a menudo. Hazlo en frío, comprueba las cuatro ruedas y no te olvides de la de repuesto si la llevas.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Unos neumáticos poco inflados ruedan con más resistencia, así que el
        motor tiene que empujar más y <strong>gastas más combustible</strong>.
        Circular con medio bar de menos puede subir el consumo en torno a un
        3-5 % de media, además de desgastar las ruedas antes y empeorar la
        frenada. La solución cuesta cero: lleva la presión que indica el
        fabricante de tu coche y revísala una vez al mes en frío.
      </Answer>

      <Tldr
        items={[
          "Poco inflado = más resistencia a la rodadura = más consumo (típicamente +3-5 % con 0,5 bar de menos).",
          "Usa la presión del fabricante (pegatina de la puerta o tapa del depósito), no la del neumático.",
          "Revísala en frío al menos una vez al mes y antes de cada viaje largo.",
          "El frío baja la presión: ~0,1 bar por cada 10 ºC menos.",
          "Inflar mucho de más no ahorra: pierdes agarre y desgastas el centro de la rueda.",
        ]}
      />

      <h2 id="por-que-afecta">Por qué la presión afecta al consumo</h2>
      <p>
        Cuando un neumático rueda no es perfectamente redondo: la zona que
        toca el suelo se aplasta ligeramente y vuelve a recuperar su forma a
        cada vuelta. Ese proceso de deformarse y recuperarse, miles de veces
        por minuto, consume energía. Es lo que se llama{" "}
        <strong>resistencia a la rodadura</strong>, y es una de las fuerzas
        que el motor tiene que vencer continuamente para mantener el coche en
        marcha.
      </p>
      <p>
        Si el neumático va poco inflado, se aplasta más contra el asfalto: la
        huella de contacto es mayor y la goma se deforma más en cada vuelta.
        Más deformación significa más energía perdida en calor y, por tanto,
        más combustible quemado para avanzar lo mismo. Por eso un coche con
        las ruedas blandas «pide» más acelerador en llano y nota peor las
        cuestas.
      </p>
      <p>
        La resistencia a la rodadura supone una parte nada despreciable del
        gasto, sobre todo en ciudad y carretera convencional, donde no hay
        tanta resistencia del aire. A velocidad de autovía manda más la
        aerodinámica —de eso hablamos en la guía sobre{" "}
        <Link href="/guias/velocidad-consumo-autovia">velocidad y consumo en
        autovía</Link>—, pero la presión sigue sumando a cualquier velocidad.
      </p>
      <p>
        Lo importante es que es una pérdida constante: no se nota en una sola
        marcha, como sí ocurre con un acelerón brusco, sino que actúa todo el
        rato, kilómetro tras kilómetro. Por eso un fallo «pequeño» como medio
        bar de menos termina pesando en la factura del año, mientras que el
        gesto de inflar bien apenas cuesta un par de minutos cada mes.
      </p>

      <h2 id="cuanto-se-gasta">Cuánto se gasta de más con poca presión</h2>
      <p>
        La cifra exacta depende del coche, del tipo de neumático y de cuánto
        le falte de aire, así que conviene tomarla como una referencia
        aproximada y no como un dato cerrado. Estos son los órdenes de
        magnitud que se manejan habitualmente:
      </p>

      <CompareTable
        caption="Efecto de la presión en el consumo (datos típicos en España, 2026)"
        headers={["Situación", "Presión", "Consumo extra (orientativo)"]}
        rows={[
          ["Correcta", "La del fabricante", "Referencia (0 %)"],
          ["Algo baja", "−0,3 bar", "~+1-2 %"],
          ["Claramente baja", "−0,5 bar", "~+3-5 %"],
          ["Muy baja / casi pinchada", "−1,0 bar o más", "~+6 % o más, riesgo de reventón"],
        ]}
      />

      <p>
        Para hacerte una idea en euros: si tu coche gasta unos 6 litros a los
        100 km y haces unos 15.000 km al año, un 4 % de más son unos 36 litros
        anuales. Al precio típico del combustible en España, eso ronda unas
        cuantas decenas de euros tirados cada año solo por no inflar bien las
        ruedas. El precio real lo puedes comprobar tú mismo comparando
        gasolineras en la app, porque varía mucho según la zona y el día.
      </p>
      <p>
        Y no es solo combustible. Un neumático poco inflado se calienta más,
        se desgasta antes (sobre todo por los hombros) y aumenta el riesgo de
        reventón en autovía. Es decir: ahorras unos céntimos de aire y acabas
        pagando ruedas nuevas antes de tiempo. Por eso la presión es uno de
        los pilares del <Link href="/guias/mantenimiento-coche-consumo">mantenimiento
        que de verdad influye en el consumo</Link>.
      </p>

      <h2 id="presion-correcta">La presión correcta para tu coche</h2>
      <p>
        El error más común es fijarse en el número que va impreso en el
        flanco del neumático. Ese valor es la presión <em>máxima</em> que
        soporta la goma, no la que debes llevar. La presión correcta la marca
        el <strong>fabricante del coche</strong>, y la encuentras en:
      </p>
      <ul>
        <li>
          Una <strong>pegatina en el marco de la puerta del conductor</strong>
          {" "}(lo más habitual), visible al abrir la puerta.
        </li>
        <li>La cara interior de la tapa del depósito de combustible.</li>
        <li>El manual de usuario, en el apartado de neumáticos.</li>
      </ul>
      <p>
        Esa pegatina suele dar dos juegos de valores: uno para{" "}
        <strong>carga normal</strong> (uno o dos ocupantes, conducción
        habitual) y otro para <strong>carga máxima</strong> (coche lleno de
        gente y maletas, o con remolque). Si te vas de vacaciones cargado o
        vas a hacer muchos kilómetros de autovía, usa el valor alto.
      </p>
      <p>
        Un detalle que suele confundir es la unidad. En España la presión se
        suele dar en bar o en kg/cm² (prácticamente equivalentes), mientras que
        algunos manuales o manómetros la muestran en psi, la unidad anglosajona.
        Como referencia, un coche normal suele moverse en torno a 2,2-2,5 bar,
        que equivalen aproximadamente a 32-36 psi. Si el manómetro de la
        gasolinera está en psi, basta con saber que 1 bar son unos 14,5 psi
        para no liarte.
      </p>

      <Callout type="info" title="Presión delantera y trasera no siempre son iguales">
        Muchos coches piden algo más de presión en el eje trasero cuando van
        cargados, y otros llevan distinta presión delante y detrás de fábrica.
        No infles las cuatro ruedas al mismo valor «por inercia»: mira la
        pegatina, que distingue eje delantero y trasero y, a veces, también el
        tamaño de llanta que monta tu coche.
      </Callout>

      <h2 id="cada-cuanto-revisar">Cada cuánto revisarla</h2>
      <p>
        Un neumático en buen estado pierde aire poco a poco de forma natural,
        del orden de 0,1 bar al mes, simplemente porque la goma es porosa.
        Además, la presión depende mucho de la temperatura: por cada 10 grados
        que baja el aire exterior, la presión cae aproximadamente 0,1 bar. Por
        eso una rueda que estaba perfecta en septiembre puede ir baja en
        diciembre sin que haya ningún pinchazo.
      </p>
      <ul>
        <li>
          <strong>Una vez al mes</strong> como rutina básica. Es un par de
          minutos en cualquier gasolinera.
        </li>
        <li>
          <strong>Antes de cada viaje largo</strong>, sobre todo si vas
          cargado. Aquí ajusta a la presión de carga máxima.
        </li>
        <li>
          <strong>Con los cambios de estación</strong>, en especial al entrar
          el frío, cuando la presión baja sola.
        </li>
        <li>
          No olvides la <strong>rueda de repuesto</strong> si la llevas: una
          rueda de auxilio desinflada no sirve de nada el día que la
          necesitas.
        </li>
      </ul>
      <p>
        Medir y corregir la presión es gratis o casi gratis en la mayoría de
        estaciones, y muchas <Link href="/guias/gasolineras-24-horas">gasolineras
        24 horas</Link> tienen el manómetro disponible a cualquier hora. Como
        ya estás parando a repostar, aprovecha para revisarlas de paso.
      </p>

      <h2 id="trucos-errores">Trucos y errores comunes</h2>
      <ul>
        <li>
          <strong>Mídela siempre en frío.</strong> Al rodar, las ruedas se
          calientan y la presión sube unas décimas; si mides caliente, leerás
          un valor más alto del real. Lo ideal es revisar tras menos de un par
          de kilómetros o con el coche parado un rato.
        </li>
        <li>
          <strong>No desinfles porque la veas «alta» tras conducir.</strong>{" "}
          Si has hecho muchos kilómetros y la rueda está caliente, es normal
          que marque de más. Si quitas aire en caliente, al enfriarse te
          quedará por debajo de lo correcto.
        </li>
        <li>
          <strong>Inflar muchísimo no es la solución mágica.</strong> Pasarte
          de 0,5 bar o más reduce un poco el consumo, sí, pero el neumático
          apoya solo por el centro: pierdes agarre, frenas peor, el coche va
          más duro y la banda central se gasta antes. Quédate en lo
          recomendado o, como mucho, un pelín por encima en viaje cargado.
        </li>
        <li>
          <strong>El testigo del salpicadero llega tarde.</strong> El sistema
          de control de presión (TPMS) suele avisar cuando ya falta bastante
          aire, no ante una bajada leve. Que no se encienda no garantiza que la
          presión sea la óptima; revísala tú igualmente.
        </li>
        <li>
          <strong>Combínalo con una conducción eficiente.</strong> Las ruedas
          bien infladas suman, pero el mayor ahorro está en cómo conduces. Lo
          tienes detallado en la guía de{" "}
          <Link href="/guias/conducir-ahorrar-combustible">conducir para
          ahorrar combustible</Link>.
        </li>
      </ul>

      <AppCta
        title="Revisa la presión mientras repostas barato"
        body="Ya que paras a echar aire, aprovecha para repostar en la gasolinera más económica. En Carburantes comparas precios reales con datos del Ministerio: busca por municipio o pulsa «Cerca de mí»."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/conducir-ahorrar-combustible", label: "Conducir para ahorrar combustible" },
          { href: "/guias/mantenimiento-coche-consumo", label: "Mantenimiento y consumo" },
          { href: "/guias/lleno-o-medio-deposito", label: "¿Lleno o medio depósito?" },
        ]}
      />
    </>
  );
}

export default guide;
