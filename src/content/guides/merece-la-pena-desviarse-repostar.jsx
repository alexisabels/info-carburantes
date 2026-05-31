import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "merece-la-pena-desviarse-repostar";
const title = "¿Merece la pena desviarse para repostar más barato?";
const description =
  "Una gasolinera más barata a 10 minutos: ¿compensa el desvío o te comes el ahorro en gasolina y tiempo? Te damos la regla sencilla para decidir.";

const guide = {
  slug,
  title,
  seoTitle: "¿Vale la pena desviarse a repostar? · Guía",
  description,
  category: "ahorro",
  datePublished: "2026-05-19",
  dateModified: "2026-05-19",
  readingMinutes: 5,
  keywords: [
    "merece la pena desviarse repostar",
    "desvío gasolinera barata",
    "cuánto cuesta desviarse repostar",
  ],
  mentions: [{ "@type": "Thing", name: "Consumo" }],
  faq: [
    {
      q: "¿Cuánto puedo desviarme para que compense?",
      a: "Depende de cuánto vayas a repostar y de cuánto sea más barata la otra estación. Una regla rápida: con un depósito de unos 50 litros, cada céntimo por litro de diferencia te ahorra alrededor de 50 céntimos. Ida y vuelta de un desvío de 2 km gasta en torno a 0,20-0,25 € de combustible en un coche medio. Por tanto, si la diferencia es de 4-5 céntimos por litro o más y el desvío es de pocos kilómetros, casi siempre compensa. Si la diferencia es de 1-2 céntimos, solo merece la pena cuando la otra gasolinera te pilla de paso y no añade kilómetros reales.",
    },
    {
      q: "¿El desvío gasta más que el ahorro?",
      a: "Puede pasar, y es el error clásico. El coste de desviarse no es solo la gasolina que quemas en esos kilómetros extra: súmale el tiempo y el desgaste. Un desvío de ida y vuelta de 5 km en ciudad, con semáforos y arranques en frío, puede gastar fácilmente 0,50-0,70 € de combustible. Si solo vas a repostar 20 litros y la diferencia es de 2 céntimos, ahorras 0,40 € y el desvío te ha costado más: pierdes dinero. Por eso conviene calcular antes, sobre todo en repostajes pequeños.",
    },
    {
      q: "¿Cómo calculo si compensa?",
      a: "Multiplica los litros que vas a repostar por la diferencia de precio por litro: eso es tu ahorro bruto. Después estima el coste del desvío: kilómetros de ida y vuelta multiplicados por el consumo de tu coche (en torno a 0,10-0,13 € por kilómetro en un coche medio en 2026) y, si quieres afinar, añade un valor al tiempo que pierdes. Si el ahorro bruto supera con holgura el coste del desvío, adelante. Si quedan parejos, no merece la pena por unos céntimos. Lo más práctico es ver primero los precios reales y la distancia en la app y decidir con los números delante.",
    },
    {
      q: "¿Compensa desviarse en un viaje largo de autovía?",
      a: "En autovía la cuenta cambia a tu favor en un sentido y en tu contra en otro. A favor: sueles repostar el depósito casi entero, así que cada céntimo de diferencia rinde más. En contra: salir de la autovía, parar en un pueblo y volver a incorporarte puede sumar 8-12 km y varios minutos, y las áreas de servicio de autopista suelen ser de las más caras. Si planificas la ruta y eliges una estación barata que esté justo en tu trayecto o a la entrada del pueblo, ganas sin apenas desviarte. Desviarte mucho por carretera secundaria rara vez compensa.",
    },
    {
      q: "¿Y si la gasolinera barata me pilla de camino?",
      a: "Entonces casi siempre compensa, aunque la diferencia de precio sea pequeña. Si no añades kilómetros porque pasas por delante de todas formas (de camino al trabajo, al hacer un recado, al volver a casa), el coste del desvío es prácticamente cero y todo lo que ahorres por litro es ganancia limpia. La clave del ahorro no es perseguir la gasolinera más barata de la ciudad, sino repostar en la más barata de entre las que ya te quedan de paso.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Desviarte para repostar más barato <strong>compensa cuando el ahorro
        por litro supera el coste de los kilómetros extra</strong>, y eso
        depende de tres cosas: cuánto vas a echar, cuánto más barata es la otra
        estación y cuántos kilómetros añade el desvío. Regla rápida: si vas a
        llenar el depósito y la diferencia es de unos 4-5 céntimos por litro o
        más, un rodeo de un par de kilómetros casi siempre sale a cuenta. Para
        repostajes pequeños o diferencias de 1-2 céntimos, solo merece la pena
        si la gasolinera te pilla de paso.
      </Answer>

      <Tldr
        items={[
          "El ahorro bruto = litros que repostas × diferencia de precio por litro.",
          "El coste del desvío = kilómetros ida y vuelta × consumo (~0,10-0,13 €/km), más tu tiempo.",
          "Llenar el depósito hace que cada céntimo de diferencia rinda más; en repostajes pequeños, casi nunca compensa desviarse.",
          "Diferencias de 4-5 cént/L o más con desvíos cortos suelen salir a cuenta; 1-2 cént/L rara vez.",
          "Lo ideal: repostar en la más barata de entre las que ya te pillan de camino, sin rodeos.",
        ]}
      />

      <h2 id="coste-oculto">El coste oculto de desviarse</h2>
      <p>
        La tentación es lógica: ves en la app una gasolinera 6 céntimos más
        barata y piensas que estás dejando dinero sobre la mesa si no vas. Pero
        el ahorro real no es la diferencia de precio a secas: es esa diferencia{" "}
        <em>menos</em> lo que te cuesta llegar hasta allí. Y ese coste tiene
        varias partes que casi nadie suma.
      </p>
      <ul>
        <li>
          <strong>La gasolina del desvío.</strong> Los kilómetros de ida y
          vuelta los pagas con el mismo combustible que intentas ahorrar. En
          ciudad, además, son los kilómetros más caros: arranques, frenadas y
          semáforos disparan el consumo respecto a la cifra de catálogo.
        </li>
        <li>
          <strong>El tiempo.</strong> Diez minutos de rodeo, una cola más
          larga o un acceso incómodo tienen un valor. No hace falta ponerle
          precio exacto, pero sí tenerlo presente: ahorrar 80 céntimos a cambio
          de un cuarto de hora rara vez merece la pena.
        </li>
        <li>
          <strong>El desgaste.</strong> Más kilómetros son más neumático, más
          frenos y más mantenimiento, aunque sea en una proporción pequeña.
        </li>
      </ul>
      <p>
        Cuando juntas las tres partes, muchos desvíos «de chollo» se quedan en
        empate o incluso en pérdida. La buena noticia es que distinguir un caso
        del otro es muy fácil con una regla y dos multiplicaciones.
      </p>

      <h2 id="regla-centimos">La regla de los céntimos por litro</h2>
      <p>
        Todo gira en torno a una idea sencilla:{" "}
        <strong>cada céntimo de diferencia por litro solo te ahorra dinero en
        proporción a los litros que metes</strong>. No es lo mismo un céntimo
        sobre 10 litros que sobre 55.
      </p>
      <ul>
        <li>
          En un depósito de unos <strong>50 litros</strong>, cada céntimo por
          litro de diferencia equivale a <strong>~0,50 €</strong> de ahorro.
        </li>
        <li>
          Si solo echas <strong>15-20 litros</strong>, ese mismo céntimo apenas
          te ahorra <strong>15-20 céntimos</strong>.
        </li>
      </ul>
      <p>
        Por eso desviarse compensa mucho más cuando vas a hacer el lleno que
        cuando echas «lo justo para llegar». Si sueles repostar poco, te
        interesa leer si te conviene cambiar de hábito en{" "}
        <Link href="/guias/lleno-o-medio-deposito">esta guía sobre llenar el
        depósito o echar medio</Link>, porque cambia por completo cuándo merece
        la pena buscar una estación más barata.
      </p>
      <p>
        Frente a ese ahorro, el desvío gasta combustible a un ritmo bastante
        estable. En un coche medio en 2026, cada kilómetro recorrido cuesta en
        torno a <strong>0,10-0,13 €</strong> solo de combustible (más en ciudad,
        algo menos en carretera). Así que un desvío de ida y vuelta de 2 km
        gasta alrededor de <strong>0,20-0,25 €</strong>; uno de 5 km, en torno a{" "}
        <strong>0,50-0,65 €</strong>. Son cifras típicas y aproximadas: para
        decidir de verdad, compara siempre el precio real y la distancia en la
        app.
      </p>

      <CompareTable
        caption="¿Compensa el desvío? Ahorro frente a coste (datos típicos en España, 2026)"
        headers={[
          "Situación",
          "Litros",
          "Diferencia",
          "Ahorro bruto",
          "Coste desvío",
          "¿Compensa?",
        ]}
        rows={[
          ["Lleno + estación barata de camino", "50", "6 cént/L", "~3,00 €", "~0 €", "Sí, claramente"],
          ["Lleno + desvío de 2 km (ida y vuelta)", "50", "5 cént/L", "~2,50 €", "~0,25 €", "Sí"],
          ["Lleno + desvío de 6 km", "50", "3 cént/L", "~1,50 €", "~0,70 €", "Justo, valora el tiempo"],
          ["Medio depósito + desvío de 5 km", "20", "2 cént/L", "~0,40 €", "~0,60 €", "No, pierdes dinero"],
          ["Repostaje corto + desvío largo", "15", "2 cént/L", "~0,30 €", "~1,00 €", "No"],
        ]}
      />

      <h2 id="punto-equilibrio">Calcula tu punto de equilibrio</h2>
      <p>
        Para no ir a ojo, haz dos cuentas rápidas antes de salirte de tu ruta.
        Es literalmente una multiplicación por cada lado.
      </p>
      <ul>
        <li>
          <strong>Ahorro bruto</strong> = litros que vas a repostar × diferencia
          de precio por litro. Ejemplo: 45 litros × 0,05 € = 2,25 €.
        </li>
        <li>
          <strong>Coste del desvío</strong> = kilómetros de ida y vuelta ×
          coste por kilómetro (~0,10-0,13 € en un coche medio). Ejemplo: 4 km ×
          0,12 € = 0,48 €.
        </li>
      </ul>
      <p>
        En ese ejemplo ahorras 2,25 € y el desvío te cuesta 0,48 €: ganas casi
        1,80 € netos, claramente compensa. Si las dos cifras quedan parecidas,
        la respuesta práctica es <strong>no desviarse</strong>: el ahorro neto
        es tan pequeño que no paga el tiempo ni la molestia.
      </p>
      <Callout type="note" title="Atajo mental para decidir en 5 segundos">
        Multiplica los kilómetros de ida y vuelta del desvío por ~0,25: eso es,
        más o menos, los <strong>céntimos por litro de diferencia</strong> que
        necesitas para cubrir solo el combustible, suponiendo un lleno de unos
        50 litros. ¿Un desvío de 2 km? Te basta con apenas medio céntimo por
        litro para no perder dinero, aunque conviene bastante más para que
        merezca la pena el tiempo. ¿De 6 km? Rondas los ~1,5 céntimos solo para
        empatar en combustible. Si echas menos litros, sube la exigencia.
      </Callout>

      <h2 id="cuando-no-compensa">Cuándo NO compensa</h2>
      <p>
        Hay situaciones en las que casi siempre sales perdiendo, aunque la app
        marque un precio más bajo. Conviene reconocerlas para no caer en el
        «efecto chollo».
      </p>
      <ul>
        <li>
          <strong>Vas a repostar poco.</strong> Con 10-20 litros, la diferencia
          por litro casi nunca cubre un rodeo de varios kilómetros.
        </li>
        <li>
          <strong>La diferencia es de 1-2 céntimos.</strong> Salvo que la
          estación barata te pille de paso, no da para pagar el desvío.
        </li>
        <li>
          <strong>El desvío es en hora punta o por el centro.</strong> Atascos,
          semáforos y arranques en frío disparan el consumo de esos kilómetros;
          el coste real es mayor que el teórico.
        </li>
        <li>
          <strong>Sales y vuelves a una autovía solo para repostar.</strong> El
          rodeo suele sumar 8-12 km y varios minutos. Mejor planifica la parada
          dentro del trayecto, como explicamos en la guía de{" "}
          <Link href="/guias/planificar-repostajes-ruta">cómo planificar los
          repostajes de una ruta</Link>.
        </li>
      </ul>
      <p>
        El patrón es claro: desviarse expresamente, lejos y por poco dinero es
        una mala idea. El ahorro de verdad está en otro sitio.
      </p>

      <h2 id="sin-desviarte">Cómo encontrar la opción barata sin desviarte</h2>
      <p>
        La estrategia ganadora no es perseguir la gasolinera más barata de la
        ciudad, sino <strong>repostar en la más barata de entre las que ya te
        quedan de camino</strong>. Cuando no añades kilómetros, todo el ahorro
        por litro es ganancia limpia, sin coste de desvío que reste.
      </p>
      <ul>
        <li>
          <strong>Mira los precios de tu trayecto habitual.</strong> En el
          recorrido de casa al trabajo o a los sitios de siempre suele haber
          varias estaciones; elige la más barata de ese corredor, no la de la
          otra punta.
        </li>
        <li>
          <strong>Aprovecha los recados.</strong> Si vas a hacer la compra o
          llevar a alguien, encadena el repostaje con ese viaje y el desvío
          desaparece.
        </li>
        <li>
          <strong>Combina barato con hábitos que ahorran.</strong> Repostar en
          la estación adecuada rinde más si además conduces de forma eficiente:
          tienes ideas concretas en la guía de{" "}
          <Link href="/guias/conducir-ahorrar-combustible">cómo conducir para
          gastar menos</Link>.
        </li>
      </ul>
      <p>
        Para todo esto necesitas ver los precios reales y la distancia de un
        vistazo, y ahí es donde la app hace el trabajo por ti: ordena las
        estaciones por precio actualizado y por cercanía, para que distingas en
        un segundo entre un chollo que te pilla de camino y un espejismo a diez
        minutos.
      </p>

      <AppCta
        title="Mira qué gasolinera te conviene de verdad"
        body="En Carburantes ves el precio real de cada estación y a qué distancia está. Pulsa «Cerca de mí» o busca por municipio y compara antes de desviarte: así sabes si el ahorro cubre el rodeo."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/cuanto-se-ahorra-comparando-gasolineras", label: "Cuánto se ahorra comparando" },
          { href: "/guias/gasolineras-low-cost", label: "Gasolineras low cost" },
          { href: "/guias/repostar-pueblo-o-ciudad", label: "¿Repostar en pueblo o ciudad?" },
        ]}
      />
    </>
  );
}

export default guide;
