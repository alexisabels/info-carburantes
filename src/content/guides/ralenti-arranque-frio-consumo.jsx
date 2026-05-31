import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "ralenti-arranque-frio-consumo";
const title = "Ralentí y arranque en frío: cuánto combustible gastan";
const description =
  "¿Hay que calentar el motor parado? ¿Gasta mucho el ralentí en un atasco? Te explicamos cuánto combustible gastan de verdad y qué hábitos te hacen perder dinero.";

const guide = {
  slug,
  title,
  seoTitle: "Ralentí y arranque en frío: consumo · Guía",
  description,
  category: "conduccion",
  datePublished: "2026-05-19",
  dateModified: "2026-05-19",
  readingMinutes: 5,
  keywords: [
    "ralentí consumo",
    "arranque en frío gasta más",
    "calentar motor parado",
    "start stop ahorra",
  ],
  mentions: [{ "@type": "Thing", name: "Start-Stop" }],
  faq: [
    {
      q: "¿Hay que calentar el motor antes de arrancar?",
      a: "No, no con el coche parado. Los motores modernos de inyección electrónica no necesitan calentar al ralentí antes de salir, como sí ocurría con los antiguos carburadores. La forma correcta y más eficiente de calentar el motor es arrancar y empezar a circular suave en los primeros minutos, sin exigir muchas revoluciones ni acelerones bruscos. El motor alcanza su temperatura de trabajo mucho antes conduciendo despacio que parado, porque con carga genera más calor. Calentar parado solo quema combustible, ensucia el motor y, en muchos sitios, está sancionado por dejar el coche en marcha sin necesidad.",
    },
    {
      q: "¿Cuánto gasta el coche al ralentí?",
      a: "De media, un turismo gasolina consume en torno a 0,5 a 1 litro por hora al ralentí, y un diésel un poco menos. En un atasco largo o esperando con el motor encendido, eso puede suponer fácilmente unas décimas de litro cada media hora. No es una cifra enorme por minuto, pero es combustible que se quema avanzando cero kilómetros, así que el rendimiento es literalmente de cero kilómetros por litro. Son cifras orientativas: el gasto real depende de la cilindrada, de si llevas el aire acondicionado puesto y de la temperatura del motor.",
    },
    {
      q: "¿El Start-Stop ahorra de verdad?",
      a: "Sí, en conducción urbana con muchas paradas (semáforos, atascos, pasos de peatones) el sistema Start-Stop reduce el consumo de forma apreciable, en torno a un 3 a 8 % de media en ciudad según el fabricante y el tráfico. Apaga el motor cuando te detienes y lo vuelve a arrancar al soltar el freno o el embrague, evitando esos minutos de ralentí inútil. En carretera, donde apenas te paras, su efecto es casi nulo. No daña el motor de arranque ni la batería porque ambos están diseñados reforzados para ese uso.",
    },
    {
      q: "¿Conviene apagar el motor en un atasco?",
      a: "Sí, si la parada va a durar más de aproximadamente un minuto y tu coche no tiene Start-Stop automático. Por debajo de ese tiempo, el arranque consume un poco y la diferencia es mínima; por encima, compensa apagar. Si tu coche lleva Start-Stop, déjalo trabajar: ya lo hace solo de forma óptima. En paradas muy largas, como un corte de carretera, apagar el motor ahorra combustible y reduce emisiones sin riesgo para la mecánica.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        El momento que más combustible gasta es el <strong>arranque en frío</strong>:
        durante los primeros minutos el motor consume bastante más de lo normal
        hasta alcanzar su temperatura de trabajo. La mejor forma de calentarlo
        no es dejarlo parado al ralentí, sino <strong>arrancar y circular
        suave</strong>. Al ralentí el coche gasta poco por minuto (en torno a
        0,5-1 litro por hora), pero avanza cero kilómetros, así que cada minuto
        parado con el motor en marcha es dinero quemado a cambio de nada.
      </Answer>

      <Tldr
        items={[
          "El arranque en frío es lo que más gasta: el motor pide más combustible hasta calentarse.",
          "Calentar el motor parado no sirve de nada en coches modernos: arranca y conduce suave.",
          "Al ralentí gastas ~0,5-1 L/hora avanzando cero kilómetros.",
          "El Start-Stop ahorra en torno a 3-8 % en ciudad; en carretera casi nada.",
          "En atascos largos sin Start-Stop, apaga el motor si la parada supera el minuto.",
        ]}
      />

      <h2 id="arranque-en-frio">El arranque en frío: el momento que más gasta</h2>
      <p>
        Cuando el motor está frío, todo trabaja en su contra: el aceite está
        espeso y cuesta más mover las piezas, el combustible se condensa con
        más facilidad y la electrónica inyecta una mezcla más rica (más
        gasolina por unidad de aire) para que el motor arranque y funcione
        estable. El resultado es que durante los primeros minutos el coche
        consume bastante más que cuando está a temperatura — pueden ser
        consumos instantáneos del doble o más en esos primeros instantes.
      </p>
      <p>
        Eso no significa que arrancar sea «malo» o que haya que evitarlo: es
        simplemente cómo funciona un motor de combustión. Pero sí tiene una
        consecuencia práctica importante. Los trayectos muy cortos (ir a
        comprar el pan a dos calles, dejar a alguien a la vuelta de la esquina)
        son <strong>los más caros por kilómetro</strong>, porque todo el viaje
        transcurre con el motor frío y nunca llega a su punto eficiente. Si
        encadenas muchos trayectos de menos de 3 o 4 kilómetros, tu consumo
        medio se dispara aunque conduzcas con suavidad.
      </p>
      <ul>
        <li>
          <strong>Agrupa recados</strong>: hacer cuatro gestiones en una sola
          salida sale mucho más barato que cuatro arranques en frío distintos.
        </li>
        <li>
          <strong>Para distancias muy cortas</strong>, valora ir andando o en
          bici: además del combustible, te ahorras el desgaste que más castiga
          al motor.
        </li>
      </ul>

      <h2 id="calentar-motor-parado">¿Hay que calentar el motor parado?</h2>
      <p>
        Es uno de los mitos más arraigados de la conducción, y hoy es
        directamente falso para la inmensa mayoría de coches. Venía de la época
        de los carburadores: aquellos motores sí necesitaban unos minutos al
        ralentí en invierno para funcionar de forma estable. Pero los motores
        modernos llevan <strong>inyección electrónica</strong> desde hace
        décadas, y gestionan ellos solos la mezcla en frío. No necesitan que
        los calientes parados.
      </p>
      <p>
        Es más: calentar el motor parado es <em>peor</em> que hacerlo
        conduciendo. Al ralentí el motor genera poco calor y tarda muchísimo en
        alcanzar su temperatura de trabajo; conduciendo suave, con carga ligera,
        se calienta en una fracción del tiempo. Mientras tanto, dejarlo parado
        quema combustible para nada, alarga el periodo de mezcla rica (que
        ensucia inyectores y catalizador) y, en muchos municipios, está
        sancionado dejar el vehículo en marcha sin necesidad por motivos de
        ruido y contaminación.
      </p>
      <Callout type="info" title="La forma correcta de calentar el motor">
        Arranca, ponte el cinturón, ajusta los espejos y sal. Durante el primer
        par de kilómetros conduce suave: sin pisar a fondo, sin apurar las
        marchas y sin subir mucho de revoluciones. Así el motor llega a su
        temperatura rápido, sin desperdiciar combustible y sin forzar la
        mecánica en frío. Es exactamente lo contrario de quedarte parado en la
        puerta con el motor en marcha.
      </Callout>

      <h2 id="ralenti-atascos">El ralentí en atascos y paradas</h2>
      <p>
        Al ralentí, un turismo gasolina gasta de media en torno a{" "}
        <strong>0,5 a 1 litro por hora</strong>, y un diésel algo menos. Por
        minuto parece poco, pero el problema no es la cantidad: es que durante
        ese tiempo el coche avanza <strong>cero kilómetros</strong>. Su
        rendimiento, medido en kilómetros por litro, es literalmente cero. Cada
        minuto de motor en marcha sin moverte es combustible que se va sin
        contraprestación.
      </p>
      <p>
        En un atasco esto se acumula. Media hora detenido con el motor
        encendido y, encima, el aire acondicionado puesto, puede irse en varias
        décimas de litro que no aparecen reflejadas en ningún kilómetro
        recorrido. Si el aire acondicionado te preocupa en estos contextos,
        merece la pena que entiendas{" "}
        <Link href="/guias/aire-acondicionado-consumo">cuánto suma de verdad
        el aire acondicionado al consumo</Link> antes de decidir cómo usarlo en
        ciudad.
      </p>
      <p>
        ¿La solución? No es apagar y encender el motor en cada semáforo a mano
        (eso es incómodo y, en paradas muy breves, ni siquiera compensa). La
        solución la trae de serie la mayoría de coches modernos: el Start-Stop.
      </p>

      <CompareTable
        caption="Gasto al ralentí según situación (datos típicos en España, 2026)"
        headers={["Situación", "Consumo aproximado", "Kilómetros recorridos"]}
        rows={[
          ["Ralentí en parado (gasolina)", "~0,5-1 L/hora", "0 km"],
          ["Ralentí en parado (diésel)", "~0,4-0,8 L/hora", "0 km"],
          ["Calentar motor parado 5 min", "Combustible desperdiciado", "0 km"],
          ["Arrancar tras parada de 1 min", "Equivalente a pocos segundos de ralentí", "—"],
          ["Conducción suave en frío", "Calienta rápido y aprovecha cada km", "Avanzas"],
        ]}
      />

      <h2 id="para-que-sirve-start-stop">Para qué sirve el Start-Stop</h2>
      <p>
        El sistema <strong>Start-Stop</strong> apaga el motor automáticamente
        cuando te detienes (en un semáforo, en un atasco, en un ceda el paso) y
        lo vuelve a arrancar al instante en cuanto sueltas el freno o pisas el
        embrague para salir. Su única misión es eliminar esos minutos de ralentí
        inútil que, sumados a lo largo de un día por ciudad, representan
        bastante combustible.
      </p>
      <ul>
        <li>
          <strong>En ciudad ahorra de verdad</strong>: con muchas paradas, el
          ahorro está en torno a un 3 a 8 % de media según el fabricante y el
          tipo de tráfico. Cuanto más denso y con más paradas, más rinde.
        </li>
        <li>
          <strong>En carretera apenas hace nada</strong>: si casi no te
          detienes, el sistema casi no actúa. Por eso su beneficio se concentra
          en el uso urbano.
        </li>
        <li>
          <strong>No daña el motor</strong>: el motor de arranque y la batería
          de un coche con Start-Stop están reforzados y diseñados para soportar
          miles de arranques. No es como apagar y encender un coche antiguo a
          mano.
        </li>
      </ul>
      <p>
        Si tu coche lo lleva, lo más sensato es <strong>dejarlo activado</strong>
        y no desconectarlo por costumbre. Solo tiene sentido apagarlo en
        situaciones puntuales (por ejemplo, parado en una cuesta empinada donde
        prefieres que el motor no se apague). El resto del tiempo, deja que
        trabaje: lo hace mejor y más rápido que tú a mano.
      </p>

      <h2 id="habitos-que-gastan">Hábitos que te hacen gastar de más</h2>
      <p>
        Más allá del arranque y el ralentí, hay rutinas cotidianas que suman
        combustible sin que te des cuenta. Estas son las que más se repiten:
      </p>
      <ul>
        <li>
          <strong>Calentar el motor parado en la puerta de casa.</strong> Ya lo
          hemos visto: no sirve de nada y gasta. Arranca y sal.
        </li>
        <li>
          <strong>Dejar el motor en marcha mientras esperas.</strong> Recoger a
          alguien, esperar en doble fila, parar a hacer una llamada. Si la
          espera supera el minuto, apaga.
        </li>
        <li>
          <strong>Encadenar trayectos cortísimos en frío.</strong> Es el peor
          escenario de consumo por kilómetro. Agrupa los recados en una sola
          salida.
        </li>
        <li>
          <strong>Desactivar el Start-Stop por costumbre.</strong> En ciudad le
          estás regalando ese 3-8 % de ahorro.
        </li>
        <li>
          <strong>Acelerar el motor en frío para «que coja temperatura».</strong>
          Ni lo calienta antes ni ayuda: solo lo fuerza con el aceite todavía
          espeso.
        </li>
      </ul>
      <p>
        Todos estos hábitos son de conducción urbana, donde el coche pasa más
        tiempo parado o frío. Si quieres exprimir el ahorro al máximo, combina
        estos consejos con los de nuestra{" "}
        <Link href="/guias/conducir-ahorrar-combustible">guía para conducir y
        ahorrar combustible</Link>, y revisa que la{" "}
        <Link href="/guias/mantenimiento-coche-consumo">puesta a punto del
        coche</Link> esté al día: un motor bien mantenido calienta antes y
        consume menos en cada arranque.
      </p>

      <AppCta
        title="Lo que ahorras conduciendo, no lo regales repostando"
        body="Estos hábitos te ahorran un porcentaje del consumo, pero el precio del litro varía mucho de una gasolinera a otra. En Carburantes comparas el precio real con datos del Ministerio: busca por municipio o pulsa «Cerca de mí»."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/conducir-ahorrar-combustible", label: "Conducir para ahorrar" },
          { href: "/guias/mantenimiento-coche-consumo", label: "Mantenimiento y consumo" },
          { href: "/guias/velocidad-consumo-autovia", label: "Velocidad y consumo" },
        ]}
      />
    </>
  );
}

export default guide;
