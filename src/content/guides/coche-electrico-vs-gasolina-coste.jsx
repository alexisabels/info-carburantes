import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "coche-electrico-vs-gasolina-coste";
const title = "Coche eléctrico vs gasolina: ¿cuál sale más barato?";
const description =
  "Comparamos el coste real de un coche eléctrico frente a uno de gasolina: compra, recarga vs repostaje, mantenimiento y cuándo compensa cada uno.";

const guide = {
  slug,
  title,
  seoTitle: "Eléctrico vs gasolina: coste real · Guía",
  description,
  category: "tipos-combustible",
  datePublished: "2026-05-29",
  dateModified: "2026-05-29",
  readingMinutes: 8,
  keywords: [
    "coche eléctrico vs gasolina",
    "coste coche eléctrico",
    "eléctrico o gasolina cuál compensa",
    "recarga vs gasolina precio",
    "eléctrico merece la pena",
  ],
  mentions: [
    { "@type": "Thing", name: "Coche eléctrico" },
    { "@type": "Thing", name: "kWh" },
  ],
  faq: [
    {
      q: "¿Es más barato un coche eléctrico que uno de gasolina?",
      a: "Depende del plazo. Comprar un eléctrico suele costar más de entrada que un gasolina equivalente, pero rodar es bastante más barato: la energía cuesta menos por kilómetro y el mantenimiento es menor. Si recargas en casa y haces muchos kilómetros al año, el eléctrico tiende a salir más barato a partir del cuarto o quinto año. Si haces pocos kilómetros, dependes de carga pública o cambias de coche cada poco, el gasolina puede seguir compensando. La cuenta cambia según el precio de compra, las ayudas que consigas, tu tarifa eléctrica y tus kilómetros, así que conviene hacer tus propios números en lugar de fiarte de una regla general.",
    },
    {
      q: "¿Cuánto cuesta cargar un eléctrico?",
      a: "Depende de dónde cargues. En casa con una tarifa con horas valle, recargar suele costar muy poco por kilómetro, mucho menos que repostar gasolina para ese mismo recorrido. En un punto público lento de precio moderado el coste sube, y en cargadores rápidos de autopista puede acercarse o incluso igualar el coste de la gasolina por kilómetro en los casos más caros. La cifra exacta varía según el precio del kWh que pagues y el consumo del coche, por eso quien carga casi siempre en casa es quien más ahorra y quien depende de carga rápida pública ahorra mucho menos.",
    },
    {
      q: "¿Cuándo compensa comprar eléctrico?",
      a: "Compensa sobre todo si tienes dónde cargar en casa o en el trabajo a precio barato, si haces bastantes kilómetros al año y si piensas conservar el coche varios años para amortizar el sobrecoste de compra. También ayuda poder aprovechar ayudas a la compra y el menor coste de mantenimiento. En cambio, si vives sin plaza propia, haces pocos kilómetros o sueles cambiar de coche pronto, el ahorro por kilómetro tarda más en compensar el mayor precio inicial y un gasolina o un híbrido pueden encajar mejor.",
    },
    {
      q: "¿Y si no puedo cargar en casa?",
      a: "Sigue siendo posible tener un eléctrico, pero el ahorro se reduce porque dependes de carga pública, que es más cara que la doméstica. Puedes apoyarte en cargadores en el trabajo, en supermercados o en centros comerciales donde a veces cargar es barato o gratuito mientras haces otras cosas, y reservar la carga rápida de autopista para los viajes largos. Aun así, sin acceso a carga barata habitual, el caso económico del eléctrico se debilita y conviene comparar con un gasolina eficiente o un híbrido antes de decidir.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        No hay un ganador único: el coche eléctrico <strong>sale más caro de
        comprar</strong> pero <strong>mucho más barato de usar</strong> (energía
        y mantenimiento), mientras que el de gasolina cuesta menos de entrada y
        no depende de tener un enchufe. Si recargas en casa y haces bastantes
        kilómetros al año, el eléctrico suele compensar a medio plazo; si haces
        pocos kilómetros o dependes de carga pública, el gasolina aguanta bien.
      </Answer>

      <Tldr
        items={[
          "Compra: el eléctrico parte más caro que un gasolina equivalente; las ayudas reducen la diferencia.",
          "Uso: cargar en casa en horas valle cuesta mucho menos por km que repostar; la carga rápida pública recorta ese ahorro.",
          "Mantenimiento: el eléctrico tiene menos piezas que se desgastan, así que de media gasta menos en taller.",
          "Punto de equilibrio: suele llegar a partir del 4.º-5.º año si haces kilómetros y cargas barato.",
          "Sin enchufe propio o con pocos kilómetros, el gasolina (o un híbrido) sigue siendo razonable.",
        ]}
      />

      <p>
        La pregunta «¿eléctrico o gasolina?» casi nunca tiene una respuesta de
        sí o no, porque el coste total depende de cómo conduces tú. Lo que sí
        podemos hacer es desglosar las cuatro partidas que mueven la balanza
        —compra, energía, mantenimiento y depreciación— para que hagas tus
        propios números. Las cifras que verás abajo son aproximadas y típicas
        en España en 2026: úsalas como orden de magnitud, no como precio exacto.
      </p>

      <h2 id="precio-de-compra-y-ayudas">Precio de compra y ayudas</h2>
      <p>
        De entrada, un coche eléctrico suele costar más que un gasolina del
        mismo tamaño y categoría. La diferencia se ha ido estrechando con la
        llegada de modelos más asequibles, pero la batería sigue siendo la pieza
        más cara del vehículo y eso se nota en la etiqueta. Para un utilitario
        o compacto, el sobreprecio típico ronda varios miles de euros frente al
        gasolina equivalente, aunque varía mucho según marca y segmento.
      </p>
      <p>
        Aquí entran las ayudas a la compra. En España han existido planes de
        incentivos (tipo Plan MOVES) y ventajas fiscales que rebajan de forma
        notable el precio del eléctrico, a veces combinables con achatarrar un
        coche antiguo. El problema es que estos programas{" "}
        <strong>cambian de un año a otro</strong>, se agotan los fondos y las
        condiciones (importe, requisitos, plazos de cobro) se actualizan con
        frecuencia. Antes de contar con una ayuda concreta, confírmala en la
        fuente oficial vigente o pregunta a un gestor, porque lo que valía el
        año pasado puede no aplicar hoy.
      </p>
      <p>
        Más allá del precio de catálogo, hay extras propios del eléctrico que
        conviene presupuestar: instalar un cargador doméstico (con su
        instalación eléctrica y, a veces, permisos de la comunidad de vecinos)
        tiene un coste de varios cientos de euros. No es enorme, pero forma
        parte del desembolso inicial real y a menudo se olvida al comparar
        precios de escaparate.
      </p>
      <Callout type="note" title="No mires solo el precio de la pegatina">
        Para comparar bien, suma al precio de compra las ayudas que de verdad
        puedas conseguir (no las teóricas), el coste del cargador si vas a
        instalarlo y lo que cada coche valdrá cuando lo vendas. Esa cifra —el
        coste total de propiedad— es la que decide, no el precio de salida.
      </Callout>

      <h2 id="coste-de-repostar-kwh-vs-litros">Coste de repostar: kWh vs litros</h2>
      <p>
        Esta es la partida donde el eléctrico saca más ventaja, pero solo si
        cargas en el sitio adecuado. La clave es comparar lo mismo: cuánto
        cuesta recorrer un kilómetro con cada coche. Un gasolina consume litros
        que pagas al precio del surtidor; un eléctrico consume kilovatios hora
        (kWh) que pagas a tu tarifa eléctrica o a la del punto de recarga.
      </p>
      <p>
        El matiz decisivo es <strong>dónde enchufas</strong>. Cargar en casa con
        una tarifa que aproveche las horas valle es, con diferencia, lo más
        barato: el coste por kilómetro queda muy por debajo del de la gasolina.
        Cargar en un punto público lento de precio moderado sube el coste pero
        suele seguir saliendo a cuenta. Y la carga rápida de autopista, la más
        cómoda para viajes largos, es bastante más cara: en los casos más caros
        puede acercarse o incluso igualar el coste por kilómetro de un gasolina
        eficiente.
      </p>
      <CompareTable
        caption="Coste de mover el coche: dónde cargas lo cambia todo (datos típicos en España, 2026)"
        headers={["Forma de repostar/cargar", "Coste relativo por km", "Cuándo encaja"]}
        rows={[
          ["Eléctrico — carga en casa (horas valle)", "El más barato", "Día a día, si tienes enchufe propio"],
          ["Eléctrico — punto público lento", "Intermedio", "Trabajo, supermercado, larga estancia"],
          ["Eléctrico — carga rápida autopista", "Alto (cerca del gasolina)", "Viajes largos puntuales"],
          ["Gasolina — repostaje normal", "Medio-alto, estable", "Cualquier sitio, sin depender de enchufe"],
        ]}
      />
      <p>
        Por eso la respuesta honesta a «¿es más barato cargar que repostar?» es
        «depende de tu enchufe». Quien carga casi siempre en casa es quien
        exprime el ahorro; quien vive de la carga rápida pública lo ve muy
        diluido. El coche de gasolina, en cambio, cuesta más o menos lo mismo
        por kilómetro repostes donde repostes, aunque también puedes recortar
        comparando estaciones: te ayudamos a hacerlo en la guía de{" "}
        <Link href="/guias/como-ahorrar-en-combustible-guia">cómo ahorrar en
        combustible</Link>.
      </p>
      <p>
        Si tu duda real es entre térmicos, el eléctrico no es la única vía de
        ahorro: el <Link href="/guias/glp-autogas-espana">GLP o autogás</Link>{" "}
        ofrece un coste por kilómetro bajo sin renunciar a repostar en surtidor,
        y es una alternativa a tener en cuenta si no puedes cargar en casa.
      </p>

      <h2 id="mantenimiento">Mantenimiento</h2>
      <p>
        Aquí el eléctrico vuelve a ganar terreno. Un motor eléctrico tiene muy
        pocas piezas móviles comparado con un motor de combustión: no lleva
        aceite que cambiar, ni filtros de aceite o de combustible, ni correa de
        distribución, ni embrague convencional, ni escape que se deteriore. Eso
        se traduce en revisiones más sencillas y, de media, en menos gasto de
        taller a lo largo de los años.
      </p>
      <p>
        El gasolina, por su parte, acumula el mantenimiento clásico: cambios de
        aceite y filtros, bujías, correa o cadena de distribución según el
        modelo, sistema de escape, etc. Nada dramático y muy previsible, pero
        suma. Un mantenimiento al día también influye en lo que gastas en
        combustible, como explicamos en la guía de{" "}
        <Link href="/guias/mantenimiento-coche-consumo">mantenimiento y
        consumo</Link>.
      </p>
      <p>
        Conviene matizar dos cosas para no idealizar el eléctrico. La primera:
        algunas partidas son comunes a ambos —neumáticos, frenos, suspensión,
        líquido de frenos— y el eléctrico, al pesar más por la batería, puede
        desgastar antes los neumáticos. La segunda, y la gran incógnita: la
        batería. Es la pieza más cara del coche y, aunque están diseñadas para
        durar muchos años y suelen tener garantías largas, una sustitución fuera
        de garantía sería un gasto importante. En la práctica las degradaciones
        suelen ser graduales, no muertes súbitas, pero es el factor que más pesa
        en el riesgo a largo plazo.
      </p>

      <h2 id="depreciacion-y-vida-util">Depreciación y vida útil</h2>
      <p>
        La depreciación —lo que pierde el coche de valor— suele ser la partida
        más grande de todas, por encima del combustible, y a la vez la más
        difícil de predecir. En los coches eléctricos ha sido históricamente
        más acusada e irregular: la tecnología avanza rápido, salen modelos con
        más autonomía y el mercado de segunda mano todavía mira con recelo el
        estado de la batería. Eso ha hecho que algunos eléctricos pierdan valor
        deprisa, aunque la tendencia se va estabilizando a medida que el usado
        eléctrico se normaliza.
      </p>
      <p>
        El gasolina tiene una depreciación más conocida y predecible, con un
        mercado de segunda mano amplio y maduro. A su favor juega que cualquiera
        sabe valorarlo; en su contra, el horizonte regulatorio (zonas de bajas
        emisiones, etiquetas ambientales, restricciones futuras en ciudades) que
        puede penalizar a medio plazo el valor de reventa de los térmicos más
        contaminantes. Si te afecta la circulación urbana, repasa la{" "}
        <Link href="/guias/etiqueta-dgt-combustible">etiqueta ambiental de la
        DGT según el combustible</Link> antes de comprar.
      </p>
      <Callout type="info" title="La depreciación decide más que el combustible">
        Mucha gente compara céntimos de gasolina contra céntimos de kWh y se
        olvida de lo que pierde el coche al revenderlo. Si vas a cambiar de
        coche en pocos años, la depreciación pesa más que el ahorro en energía;
        si lo conservas mucho tiempo, ese ahorro por kilómetro sí tiene años
        para acumularse y compensar.
      </Callout>

      <h2 id="cuando-compensa-cada-uno">¿Cuándo compensa cada uno?</h2>
      <p>
        El eléctrico compensa cuando puedes cargar barato en casa o en el
        trabajo, haces bastantes kilómetros al año y vas a conservar el coche
        varios años; el gasolina compensa si haces pocos kilómetros, no tienes
        enchufe propio o cambias de coche con frecuencia. El punto de equilibrio
        suele llegar a medio plazo, no de inmediato.
      </p>
      <p>
        Dicho de otra forma, el eléctrico funciona como una inversión: pagas más
        al principio y lo recuperas kilómetro a kilómetro mientras el gasolina
        gasta más en cada repostaje. Cuanto más rápido «quemes» kilómetros y más
        barato cargues, antes llegas a ese punto de equilibrio, que en un perfil
        de muchos kilómetros con carga doméstica suele situarse en torno al
        cuarto o quinto año. Con pocos kilómetros, esos años se estiran tanto que
        quizá nunca lleguen antes de que vendas el coche.
      </p>
      <p>Resumiendo por perfiles típicos:</p>
      <ul>
        <li>
          <strong>Tienes garaje con enchufe y haces muchos km</strong>: el
          eléctrico es probablemente la opción más barata a medio plazo. Es el
          escenario que más le favorece.
        </li>
        <li>
          <strong>Haces pocos km y mayormente ciudad</strong>: el ahorro en
          energía es pequeño en términos absolutos, así que el sobreprecio de
          compra tarda mucho en amortizarse. Un gasolina pequeño o un híbrido
          encajan bien.
        </li>
        <li>
          <strong>No tienes dónde cargar en casa</strong>: dependes de carga
          pública, más cara, y el ahorro se diluye. Valora un gasolina
          eficiente o alternativas como el GLP.
        </li>
        <li>
          <strong>Haces muchos viajes largos por autopista</strong>: la carga
          rápida frecuente encarece el eléctrico y añade paradas. Si es tu uso
          dominante, compáralo con un diésel o gasolina;{" "}
          <Link href="/guias/coche-diesel-o-gasolina">en esta guía vemos diésel
          o gasolina</Link> según kilometraje.
        </li>
        <li>
          <strong>Cambias de coche cada 2-3 años</strong>: no das tiempo a
          amortizar el sobrecoste y te expones a la depreciación; el térmico
          suele salir mejor.
        </li>
      </ul>
      <p>
        Sea cual sea tu caso, el consejo es el mismo: haz la cuenta con tus
        cifras reales —tu precio de compra tras ayudas, tu tarifa eléctrica, tus
        kilómetros al año y los años que piensas tenerlo— en lugar de fiarte de
        titulares. Y si sigues con un coche de combustión, el ahorro más
        inmediato y seguro está en repostar al mejor precio.
      </p>

      <AppCta
        title="Compara el precio real de la gasolina cerca de ti"
        body="Decidas lo que decidas, mientras conduzcas un térmico el ahorro está en repostar barato. En Carburantes ves los precios oficiales del Ministerio actualizados: busca por municipio o pulsa «Cerca de mí» para encontrar la gasolinera más barata de tu zona."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/coche-diesel-o-gasolina", label: "Diésel o gasolina" },
          { href: "/guias/glp-autogas-espana", label: "GLP (autogás)" },
          { href: "/guias/como-ahorrar-en-combustible-guia", label: "Cómo ahorrar en combustible" },
        ]}
      />
    </>
  );
}

export default guide;
