import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "velocidad-consumo-autovia";
const title = "¿A qué velocidad se gasta menos en autovía?";
const description =
  "Cada km/h de más en autovía dispara el consumo por la resistencia del aire. Te explicamos la velocidad más eficiente y cuánto ahorras levantando el pie.";

const guide = {
  slug,
  title,
  seoTitle: "Velocidad y consumo en autovía · Guía",
  description,
  category: "conduccion",
  datePublished: "2026-05-18",
  dateModified: "2026-05-18",
  readingMinutes: 6,
  keywords: [
    "velocidad consumo autovía",
    "a qué velocidad se gasta menos",
    "velocidad eficiente coche",
    "ahorrar gasolina autovía velocidad",
  ],
  mentions: [{ "@type": "Thing", name: "Aerodinámica" }],
  faq: [
    {
      q: "¿A qué velocidad consume menos un coche?",
      a: "En carretera abierta, la mayoría de coches modernos consumen menos en torno a los 80-90 km/h en la marcha más larga posible. Por debajo de esa franja el motor trabaja a pocas vueltas pero recorres pocos kilómetros por hora, y por encima la resistencia del aire empieza a crecer con fuerza. Como en autovía no es práctico ni seguro ir a 80, la regla útil es: dentro de la velocidad legal, cuanto más cerca de 100-110 km/h circules de forma estable, menos gastarás. No existe una cifra mágica idéntica para todos los coches, pero la franja eficiente real en autovía está bastante por debajo del límite de 120.",
    },
    {
      q: "¿Cuánto ahorro yendo a 110 en vez de 120?",
      a: "De media en España, bajar de 120 a 110 km/h en autovía reduce el consumo en torno a un 8-12 % en gasolina y diésel, según el coche y la carga. En un trayecto largo eso pueden ser varios litros y unos pocos euros menos por viaje. El precio exacto del litro varía mucho entre estaciones, así que el ahorro real depende también de dónde repostes: conviene comparar el precio en la app antes de salir.",
    },
    {
      q: "¿El control de crucero ahorra gasolina?",
      a: "Sí, en terreno llano y con tráfico fluido. Al mantener una velocidad constante evita las aceleraciones y frenadas innecesarias que disparan el consumo, y suele ser más estable que el pie. En cambio, en zonas de muchas subidas y bajadas un control de crucero básico puede acelerar de más para mantener la velocidad cuesta arriba y desperdiciar inercia cuesta abajo; ahí un conductor atento gestiona mejor. Los controles de crucero adaptativos y predictivos modernos minimizan ese problema.",
    },
    {
      q: "¿La sexta marcha ayuda?",
      a: "Mucho. Circular en la marcha más larga posible mantiene el motor a pocas revoluciones para una misma velocidad, y menos vueltas significa menos combustible quemado. En autovía deberías ir siempre en la marcha más alta que el coche admita sin que el motor pida más (sin tirones ni esfuerzo). Si tu coche tiene sexta o séptima marcha, úsala en llano a velocidad de crucero.",
    },
    {
      q: "¿Influye la velocidad más que el precio del combustible?",
      a: "Son dos palancas distintas y conviene usar las dos. La velocidad afecta a cuántos litros gastas; el precio, a cuánto te cuesta cada litro. Levantar el pie reduce el consumo un porcentaje fijo cada viaje, pero elegir una gasolinera más barata puede ahorrarte aún más por litro. Lo más rentable es combinar conducción eficiente con comparar precios reales antes de repostar.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        En autovía gastas menos cuanto más despacio circulas dentro de lo
        razonable, porque la <strong>resistencia del aire crece con el
        cuadrado de la velocidad</strong>: a más km/h, el motor tiene que
        empujar una pared de aire que aumenta muy rápido. Por eso bajar de
        120 a 110 km/h recorta el consumo en torno a un <strong>8-12 %</strong>{" "}
        de media, y la franja realmente eficiente de cualquier coche está
        bastante por debajo del límite, en torno a los 90-110 km/h en marcha
        larga.
      </Answer>

      <Tldr
        items={[
          "La resistencia del aire crece con el cuadrado de la velocidad: a 120 empujas mucho más aire que a 100.",
          "La velocidad más eficiente real ronda los 90-110 km/h en la marcha más larga.",
          "Bajar de 120 a 110 km/h ahorra ~8-12 % de combustible de media.",
          "Marcha larga + velocidad constante (control de crucero en llano) es la combinación ganadora.",
          "El ahorro por velocidad se multiplica si además repostas en la gasolinera más barata de la zona.",
        ]}
      />

      <h2 id="por-que-la-velocidad-dispara-el-consumo">
        Por qué la velocidad dispara el consumo
      </h2>
      <p>
        A baja velocidad, lo que más consume el coche es vencer la inercia,
        la fricción de los neumáticos y mover sus propios componentes. Pero a
        partir de unos 70-80 km/h aparece un protagonista que lo cambia todo:
        el aire. Cuanto más rápido vas, más aire tiene que apartar el coche
        cada segundo, y ese esfuerzo no crece de forma proporcional, sino
        mucho más rápido.
      </p>
      <p>
        La consecuencia práctica es contraintuitiva: en ciudad, ir un poco
        más rápido apenas penaliza, pero en autovía cada km/h de más cuesta
        cada vez más caro. No es lo mismo subir de 80 a 90 que de 110 a 120:
        el segundo salto, aunque sea la misma cifra de km/h, dispara mucho
        más el gasto porque ya estás en la zona donde el aire manda. Por eso
        en un <Link href="/guias/ahorrar-combustible-viaje-largo">viaje largo
        por autovía</Link> la velocidad de crucero es la decisión que más peso
        tiene en lo que acabas pagando en el surtidor.
      </p>

      <h2 id="la-resistencia-aerodinamica">La resistencia aerodinámica</h2>
      <p>
        La clave física es sencilla de recordar: la fuerza que el aire opone
        al coche crece con el <strong>cuadrado de la velocidad</strong>. Si
        doblas la velocidad, la resistencia no se duplica, se multiplica por
        cuatro. Y como la potencia que el motor necesita para vencer esa
        resistencia depende además de la velocidad, el consumo asociado al
        aire crece de forma todavía más pronunciada.
      </p>
      <p>
        En cifras orientativas: a 50 km/h la resistencia del aire es casi
        anecdótica; a 90 ya es la fuerza dominante; y a 120 el motor dedica la
        mayor parte de su esfuerzo, simplemente, a apartar aire. Por eso dos
        coches idénticos a 100 y a 120 km/h pueden separarse fácilmente en
        más de un litro a los 100 km de consumo, aunque el motor sea el mismo
        y el trayecto idéntico.
      </p>
      <p>
        Todo lo que aumente la superficie que choca con el aire empeora el
        cuadro: una baca, un cofre de techo, las ventanillas abiertas a alta
        velocidad o incluso llevar las barras de techo vacías suman
        resistencia. Si no vas a usar el portabicis o el cofre, quítalo; a
        velocidad de autovía cada elemento aerodinámico cuenta más de lo que
        parece.
      </p>

      <Callout type="info" title="Aire frente a peso">
        A baja velocidad el peso del coche pesa más en el consumo (arrancar y
        acelerar masa). A velocidad de autovía manda la aerodinámica. Por eso
        vaciar el maletero ayuda sobre todo en ciudad, mientras que quitar el
        cofre del techo o cerrar ventanillas ayuda sobre todo en carretera.
      </Callout>

      <h2 id="la-velocidad-mas-eficiente">La velocidad más eficiente</h2>
      <p>
        Si solo importara el aire, lo ideal sería ir muy despacio. Pero el
        motor también tiene un punto óptimo de funcionamiento: muy a pocas
        vueltas trabaja con poca eficiencia, y muy revolucionado, también. El
        equilibrio entre «poco aire que vencer» y «motor en su zona buena»
        sitúa la velocidad más eficiente de la mayoría de coches modernos en
        torno a los <strong>80-90 km/h en la marcha más larga</strong>.
      </p>
      <p>
        Como en autovía circular a 80 no es ni práctico ni seguro con el
        tráfico, la regla útil es distinta: dentro del límite legal, cuanto
        más cerca de los <strong>100-110 km/h</strong> vayas de forma estable,
        menos gastarás. No hay una cifra mágica idéntica para todos los
        coches —depende del peso, la forma, las marchas y los neumáticos— pero
        en casi todos la franja realmente eficiente queda <em>por debajo</em>{" "}
        del límite de 120.
      </p>
      <ul>
        <li>
          <strong>90-100 km/h</strong>: zona muy eficiente, ideal si no tienes
          prisa y el tráfico lo permite.
        </li>
        <li>
          <strong>110 km/h</strong>: buen compromiso entre consumo y tiempo en
          la mayoría de autovías.
        </li>
        <li>
          <strong>120 km/h</strong>: legal pero el más caro de los tres; el
          aire ya domina y cada km/h extra penaliza.
        </li>
      </ul>

      <h2 id="cuanto-ahorras-de-130-a-110">Cuánto ahorras levantando el pie</h2>
      <p>
        Aunque en España el límite general en autovía es 120 km/h, mucha gente
        rueda «al límite» y algunos lo rebasan. La buena noticia es que el
        ahorro de levantar el pie es inmediato y medible. De media:
      </p>

      <CompareTable
        caption="Consumo orientativo según velocidad de crucero (datos típicos en España, 2026)"
        headers={["Velocidad de crucero", "Consumo relativo", "Ahorro vs 120 km/h"]}
        rows={[
          ["130 km/h", "Referencia alta", "—"],
          ["120 km/h", "~8-10 % menos que a 130", "—"],
          ["110 km/h", "~8-12 % menos que a 120", "Notable"],
          ["100 km/h", "~15-20 % menos que a 120", "Alto"],
          ["90 km/h", "Cerca del óptimo", "Máximo razonable"],
        ]}
      />

      <p>
        Los porcentajes son aproximados y varían según el coche, la carga, el
        viento y el firme, pero el patrón se cumple casi siempre:{" "}
        <strong>cada escalón de 10 km/h que bajas en autovía recorta el
        consumo de forma apreciable</strong>. En un trayecto largo, pasar de
        120 a 110 puede suponer varios litros menos y solo unos pocos minutos
        más de viaje.
      </p>
      <p>
        Ese ahorro en litros se convierte en euros según el precio que pagues,
        y ahí entra la segunda palanca: la velocidad decide{" "}
        <em>cuántos litros</em> gastas, pero la gasolinera decide{" "}
        <em>cuánto cuesta cada litro</em>. Combinar conducción suave con{" "}
        <Link href="/guias/conducir-ahorrar-combustible">una conducción
        eficiente general</Link> y repostar en la estación más barata de tu
        ruta es lo que de verdad nota el bolsillo a final de mes.
      </p>

      <Callout type="note" title="El tiempo que «ganas» es menos del que crees">
        Ir a 120 en vez de 110 te ahorra muy pocos minutos en un trayecto
        medio, porque rara vez mantienes la punta de velocidad todo el camino
        (curvas, tráfico, áreas, peajes). Esos minutos suelen no compensar el
        consumo extra ni el mayor desgaste.
      </Callout>

      <h2 id="marchas-largas-y-control-de-crucero">
        Marchas largas y control de crucero
      </h2>
      <p>
        La velocidad no es lo único que cuenta: <em>cómo</em> mantienes esa
        velocidad importa casi tanto. Dos hábitos marcan la diferencia en
        autovía.
      </p>
      <ul>
        <li>
          <strong>Marcha larga.</strong> Circula siempre en la marcha más alta
          que el coche admita sin esfuerzo ni tirones. A igual velocidad,
          menos revoluciones significan menos combustible quemado. Si tu coche
          tiene sexta o séptima, úsala en llano a velocidad de crucero.
        </li>
        <li>
          <strong>Velocidad constante.</strong> Las aceleraciones y frenadas
          innecesarias son carísimas en consumo. Mantener un ritmo estable, sin
          acordeón, es de lo más eficiente que puedes hacer.
        </li>
        <li>
          <strong>Control de crucero.</strong> En terreno llano y tráfico
          fluido es tu aliado: clava una velocidad constante mejor que el pie.
          En zonas de muchas subidas y bajadas, en cambio, un crucero básico
          puede acelerar de más cuesta arriba; ahí a veces conviene gestionar
          tú la inercia. Los sistemas adaptativos modernos reducen ese
          problema.
        </li>
      </ul>
      <p>
        A esto se suman los básicos que multiplican el efecto:{" "}
        <Link href="/guias/presion-neumaticos-consumo">la presión correcta de
        los neumáticos</Link> reduce la resistencia a la rodadura, y un{" "}
        <Link href="/guias/mantenimiento-coche-consumo">mantenimiento al
        día</Link> mantiene el motor en su mejor punto de eficiencia. Levantar
        el pie rinde mucho más si el coche parte de buenas condiciones.
      </p>

      <AppCta
        title="Repostar barato suma al ahorro de levantar el pie"
        body="Conducir suave reduce los litros; comparar precios reduce el coste de cada litro. En Carburantes ves los precios oficiales del Ministerio cerca de ti o en cualquier municipio de tu ruta."
        href="/"
        linkLabel="Buscar gasolineras cerca"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/conducir-ahorrar-combustible", label: "Conducir para ahorrar" },
          { href: "/guias/ahorrar-combustible-viaje-largo", label: "Ahorrar en viajes largos" },
          { href: "/guias/aire-acondicionado-consumo", label: "Aire acondicionado y consumo" },
        ]}
      />
    </>
  );
}

export default guide;
