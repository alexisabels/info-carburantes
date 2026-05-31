import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "lleno-o-medio-deposito";
const title = "¿Llenar el depósito o medio? Qué conviene para ahorrar";
const description =
  "¿Repostar a tope o medio depósito ahorra gasolina por el peso? Separamos el mito del ahorro real y te decimos cuándo conviene llenar del todo.";

const guide = {
  slug,
  title,
  seoTitle: "¿Lleno o medio depósito? · Guía Carburantes",
  description,
  category: "ahorro",
  datePublished: "2026-05-17",
  dateModified: "2026-05-17",
  readingMinutes: 5,
  keywords: [
    "llenar depósito o medio",
    "peso gasolina consumo",
    "medio depósito ahorra",
    "cuánto llenar depósito",
  ],
  mentions: [{ "@type": "Thing", name: "Depósito" }],
  faq: [
    {
      q: "¿Llevar medio depósito ahorra gasolina?",
      a: "En la práctica, casi nada. Medio depósito pesa entre 20 y 30 kg menos que uno lleno, y ese peso extra encarece el consumo en torno a un 0,2-0,3 % por cada 25 kg de media. Hablamos de céntimos a lo largo de muchos kilómetros. Para que el ahorro por peso compense, tendrías que repostar el doble de veces, perder tiempo en cada parada y arriesgarte a no encontrar precio barato cuando lo necesitas. El dinero que de verdad ahorras viene de elegir una gasolinera barata, no de llevar el depósito a medias.",
    },
    {
      q: "¿Cuánto pesa un depósito lleno?",
      a: "Depende del tamaño y del combustible. La gasolina pesa unos 0,74 kg por litro y el gasóleo unos 0,84 kg por litro. Un depósito típico de coche de 50 litros lleno de gasolina pesa en torno a 37 kg; de gasóleo, unos 42 kg. Medio depósito pesa la mitad, así que la diferencia entre lleno y medio ronda los 18-21 kg. Es un peso parecido al de un niño pequeño o una maleta facturada: notable en una báscula, casi irrelevante frente a los 1.200-1.500 kg que pesa el coche.",
    },
    {
      q: "¿Conviene llenar siempre a tope?",
      a: "Como norma general, sí. Llenar a tope reduce el número de paradas, te permite aprovechar una gasolinera barata cuando la encuentras y deja más margen ante imprevistos. Las excepciones son puntuales: si justo vas a vender el coche y no quieres regalar combustible, si pretendes repostar en un país o zona más barata en pocos kilómetros, o si haces un trayecto muy corto y conocido. Fuera de esos casos, el llenado completo suele ser la opción más cómoda y económica.",
    },
    {
      q: "¿El depósito lleno se conserva mejor?",
      a: "Sí, sobre todo si el coche va a estar parado varias semanas o meses. Un depósito lleno deja poco aire dentro, y menos aire significa menos humedad condensándose en las paredes y menos oxidación en depósitos metálicos. En coches modernos con depósito de plástico y sistemas estancos el riesgo es bajo, pero si vas a guardar el vehículo en invierno o durante un viaje largo, dejarlo lleno es la recomendación habitual de los fabricantes.",
    },
    {
      q: "¿Influye el peso del depósito en un coche pequeño?",
      a: "Proporcionalmente algo más que en uno grande, porque los kilos del combustible representan un porcentaje mayor del peso total. Aun así sigue siendo poco: en un utilitario de 1.100 kg, pasar de medio a lleno añade un 1,5-2 % al peso del coche, y el efecto sobre el consumo es de décimas. La diferencia real entre coches la marcan el motor, la aerodinámica, los neumáticos y, sobre todo, la forma de conducir.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Llevar <strong>medio depósito</strong> para ahorrar gasolina por el
        peso es, en la práctica, un mito: la diferencia de consumo entre un
        depósito lleno y uno medio es de <strong>décimas de porcentaje</strong>,
        unos céntimos a lo largo de muchos kilómetros. Lo que de verdad mueve
        tu factura es <em>dónde</em> repostas, no cuánto. En la mayoría de los
        casos conviene <strong>llenar a tope</strong>: haces menos paradas y
        aprovechas la gasolinera barata cuando la tienes delante.
      </Answer>

      <Tldr
        items={[
          "El peso del combustible influye en el consumo, pero muy poco: décimas de porcentaje.",
          "La diferencia entre lleno y medio ronda los 18-21 kg, frente a los 1.200-1.500 kg del coche.",
          "Llenar a tope reduce paradas y te deja aprovechar precios bajos cuando los encuentras.",
          "Medio depósito solo tiene sentido en casos puntuales (vender el coche, repostar pronto más barato).",
          "El ahorro de verdad está en comparar precios, no en el nivel del depósito.",
        ]}
      />

      <h2 id="mito-del-peso">El mito del peso del combustible</h2>
      <p>
        La idea suena lógica: si el combustible pesa, cargar menos peso debería
        hacer que el coche gaste menos. Y es cierto a medias — el peso{" "}
        <em>sí</em> influye en el consumo, pero la magnitud del efecto es
        diminuta comparada con lo que la mayoría imagina. La gasolina pesa unos{" "}
        <strong>0,74 kg por litro</strong> y el gasóleo unos{" "}
        <strong>0,84 kg por litro</strong>. En un depósito normal de 50 litros,
        pasar de medio a lleno añade en torno a <strong>18-21 kg</strong>.
      </p>
      <p>
        Pon ese número en contexto: un coche pequeño pesa 1.100-1.300 kg y uno
        familiar 1.400-1.700 kg, sin contar pasajeros ni equipaje. Esos 20 kg
        de combustible extra son apenas un <strong>1-2 % del peso total</strong>.
        Y el peso no se traduce uno a uno en consumo: los estudios de fabricantes
        y organismos de transporte estiman que cada 25 kg adicionales encarecen
        el gasto en torno a un <strong>0,2-0,3 %</strong> (datos típicos, 2026).
        Es decir, llevar el depósito siempre a medias para ahorrar peso te
        rebajaría el consumo medio en algo así como dos o tres décimas de
        porcentaje. En céntimos al año, casi nada.
      </p>
      <p>
        El peso que de verdad pesa en tu factura no está en el depósito, sino en
        cómo conduces y cómo mantienes el coche. Si te preocupa el consumo, dan
        muchísimo más resultado las cosas que explicamos en{" "}
        <Link href="/guias/conducir-ahorrar-combustible">conducir para
        ahorrar combustible</Link> que vigilar cuántos litros llevas dentro.
      </p>

      <h2 id="cuanto-pesa-medio-deposito">
        Cuánto pesa medio depósito y cuánto influye
      </h2>
      <p>
        Vamos con cifras concretas para que veas la escala real. Estos son pesos
        aproximados según el tamaño del depósito y el tipo de combustible:
      </p>

      <CompareTable
        caption="Peso del combustible según nivel del depósito (valores aproximados)"
        headers={["Depósito", "Medio (gasolina)", "Lleno (gasolina)", "Diferencia"]}
        rows={[
          ["40 litros", "~15 kg", "~30 kg", "~15 kg"],
          ["50 litros", "~18 kg", "~37 kg", "~18 kg"],
          ["60 litros", "~22 kg", "~44 kg", "~22 kg"],
          ["70 litros", "~26 kg", "~52 kg", "~26 kg"],
        ]}
      />

      <p>
        El gasóleo pesa algo más (≈0,84 kg/L), así que suma alrededor de un
        13 % a esas cifras. Pero el orden de magnitud no cambia: la diferencia
        entre lleno y medio se mueve entre 15 y 26 kg en coches normales.
      </p>
      <p>
        ¿Qué supone eso en consumo? Imagina que conduces 1.000 km al mes con un
        coche que gasta 6 litros a los 100 km. Llevar de media 20 kg menos te
        ahorraría, siendo generosos, en torno a un <strong>0,2 %</strong> de
        combustible: hablamos de unas <strong>décimas de litro al mes</strong>.
        A precio típico de 2026, eso son <strong>céntimos</strong>. Y para
        conseguirlo tendrías que repostar el doble de veces, lo que implica más
        desvíos, más colas y más probabilidad de tener que repostar justo donde
        está caro.
      </p>

      <Callout type="info" title="El peso no es lo único — y casi nunca es lo importante">
        Sobre el consumo influyen mucho más la velocidad, la aerodinámica (una
        baca cargada o las ventanillas bajadas a 120 km/h penalizan mucho más
        que 20 kg de gasolina), la presión de los neumáticos y el aire
        acondicionado. Si vas a optimizar algo, empieza por la{" "}
        <Link href="/guias/presion-neumaticos-consumo">presión de los
        neumáticos</Link>: un neumático bajo de presión te cuesta más que cargar
        el depósito a tope.
      </Callout>

      <h2 id="cuando-llenar-del-todo">Cuándo SÍ conviene llenar del todo</h2>
      <p>
        Para la mayoría de los conductores, llenar a tope es la mejor decisión
        casi siempre. Estas son las razones:
      </p>
      <ul>
        <li>
          <strong>Menos paradas, menos tiempo perdido.</strong> Cada repostaje
          te roba entre 5 y 10 minutos entre desvío, cola y pago. Llenar a tope
          espacia esas paradas y reduce el tiempo total que dedicas a repostar.
        </li>
        <li>
          <strong>Aprovechas el precio barato cuando lo encuentras.</strong>{" "}
          Si pasas por una gasolinera low cost o por una zona con precios bajos,
          llenar el depósito entero «congela» ese buen precio para muchos
          kilómetros. Llevar medio te obliga a repostar antes, quizá donde sea
          más caro.
        </li>
        <li>
          <strong>Margen ante imprevistos.</strong> Un depósito lleno te da
          autonomía para llegar a una estación barata, esquivar tramos con
          precios inflados (autopistas, zonas turísticas) o afrontar un atasco
          sin angustia. Llevar siempre el depósito justo te empuja a repostar
          con prisas y sin elegir.
        </li>
        <li>
          <strong>Cuida la bomba de combustible.</strong> En muchos coches la
          bomba se refrigera con el propio combustible del depósito. Circular
          habitualmente en reserva la hace trabajar más caliente y puede
          acortar su vida. No es dramático, pero es un motivo más para no
          apurar.
        </li>
        <li>
          <strong>Conservación si el coche va a estar parado.</strong> Si vas a
          dejar el vehículo quieto semanas o meses, un depósito lleno deja menos
          aire dentro y reduce la condensación de humedad y la oxidación.
        </li>
      </ul>
      <p>
        En otras palabras: la comodidad, la autonomía y la posibilidad de
        comprar barato pesan mucho más que los céntimos que «ahorrarías» por el
        peso. La estrategia ganadora no es llevar poco combustible, sino{" "}
        <strong>llenar a tope cuando el precio es bueno</strong>.
      </p>

      <h2 id="cuando-medio-tiene-sentido">Cuándo medio depósito tiene sentido</h2>
      <p>
        Dicho lo anterior, hay situaciones puntuales en las que repostar medio
        depósito (o menos) es razonable:
      </p>
      <ul>
        <li>
          <strong>Vas a vender o devolver el coche.</strong> No tiene sentido
          regalar 40 litros al comprador o a la empresa de renting. Aquí llevar
          el depósito justo es pura economía.
        </li>
        <li>
          <strong>Vas a repostar pronto en una zona más barata.</strong> Si en
          pocos kilómetros vas a cruzar a una gasolinera notablemente más
          barata —o a otro país, como cuando se{" "}
          <Link href="/guias/repostar-portugal-francia-andorra">reposta en
          Portugal, Francia o Andorra</Link>— echa solo lo justo para llegar y
          llena allí.
        </li>
        <li>
          <strong>El precio actual es claramente alto.</strong> Si estás
          atrapado en una autopista o zona cara y no te queda otra que repostar,
          echa lo mínimo para llegar a una estación con mejor precio y llena
          allí.
        </li>
        <li>
          <strong>Coches deportivos en circuito o pruebas de prestaciones.</strong>{" "}
          Aquí cada kilo cuenta para el cronómetro y se rueda con poco
          combustible a propósito. Es un caso muy específico, nada que ver con
          el uso diario.
        </li>
      </ul>
      <p>
        Salvo estos supuestos, no hay un motivo de ahorro real para racionar el
        combustible. El peso no te va a sacar las cuentas; el precio del litro,
        sí.
      </p>

      <h2 id="conclusion">Conclusión práctica</h2>
      <p>
        La regla es sencilla: <strong>llena a tope cuando el precio sea bueno</strong>{" "}
        y olvídate del peso. La diferencia de consumo entre lleno y medio es de
        décimas de porcentaje, mientras que repostar el doble de veces te hace
        perder tiempo y arriesgar a pagar más caro. Reserva el medio depósito
        para casos concretos —vender el coche, repostar pronto más barato o
        salir de una zona cara— y, el resto del tiempo, conduce tranquilo con el
        depósito bien cargado.
      </p>
      <p>
        El ahorro de verdad no está en cuántos litros llevas, sino en cuánto
        pagas por cada uno. Una diferencia de 10-15 céntimos por litro entre dos
        gasolineras de la misma zona —algo habitual en España— te hace ahorrar
        mucho más que toda la teoría del peso junta. Antes de repostar, mira el
        precio real: ahí está el dinero. Si quieres ver los números, lo
        desglosamos en{" "}
        <Link href="/guias/cuanto-se-ahorra-comparando-gasolineras">cuánto se
        ahorra comparando gasolineras</Link>.
      </p>

      <AppCta
        title="Llena a tope, pero en la barata"
        body="En Carburantes ves el precio real de cada gasolinera de tu zona con datos del Ministerio actualizados. Pulsa «Cerca de mí» o busca por municipio y llena el depósito donde más te conviene."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/conducir-ahorrar-combustible", label: "Conducir para ahorrar combustible" },
          { href: "/guias/presion-neumaticos-consumo", label: "Presión de neumáticos y consumo" },
          { href: "/guias/cuanto-se-ahorra-comparando-gasolineras", label: "Cuánto se ahorra comparando" },
        ]}
      />
    </>
  );
}

export default guide;
