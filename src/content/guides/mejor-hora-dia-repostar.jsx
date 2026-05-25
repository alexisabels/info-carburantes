import Link from "next/link";
import { Answer, Tldr, Callout, AppCta, InternalLinks } from "./_components";

const slug = "mejor-hora-dia-repostar";
const title = "¿Cuál es el mejor día y hora para repostar gasolina en España?";
const description =
  "Lunes, martes y miércoles suelen ser los días más baratos para repostar. Te contamos por qué y cuándo evitar repostar para ahorrar entre 5 y 12 € al mes.";

const guide = {
  slug,
  title,
  seoTitle: "Mejor día y hora para repostar gasolina · Guía",
  description,
  category: "ahorro",
  datePublished: "2026-05-25",
  dateModified: "2026-05-25",
  readingMinutes: 6,
  keywords: [
    "mejor día repostar gasolina",
    "mejor hora gasolina barata",
    "cuándo subir bajar precio combustible",
    "repostar lunes martes barato",
    "evitar repostar viernes",
  ],
  mentions: [
    { "@type": "Thing", name: "Gasolina 95" },
    { "@type": "Thing", name: "Diésel A" },
  ],
  faq: [
    {
      q: "¿Qué día de la semana es el más barato para repostar?",
      a: "Los lunes y los martes suelen ser los días con el precio medio más bajo en España, según los estudios anuales de la OCU y Facua. Los precios bajan ligeramente entre lunes y miércoles y vuelven a subir el jueves o viernes ante la mayor demanda del fin de semana.",
    },
    {
      q: "¿Qué día es el más caro para repostar?",
      a: "Los viernes por la tarde, los sábados por la mañana y los lunes festivos son los momentos con precios más altos. Las gasolineras saben que la mayoría de conductores reposta justo antes de un viaje y aprovechan para subir céntimo a céntimo.",
    },
    {
      q: "¿Es más barato repostar por la mañana o por la noche?",
      a: "El precio en el surtidor es el mismo a cualquier hora del día. El mito de que el combustible 'denso' por el frío rinde más por la mañana es real pero el efecto es mínimo (menos de un 0,1 %) y no compensa madrugar.",
    },
    {
      q: "¿Cuándo actualizan las gasolineras los precios?",
      a: "Por ley, las estaciones envían los cambios al Ministerio al menos una vez al día, pero pueden hacerlo con más frecuencia. La práctica habitual es revisar precios al cerrar la jornada laboral; por eso los cambios suelen aparecer entre las 21:00 y las 7:00.",
    },
    {
      q: "¿Cuánto puedo ahorrar eligiendo bien el día?",
      a: "Entre 1 y 4 céntimos por litro. En un depósito de 55 litros eso son entre 0,55 € y 2,20 € por lleno. Si repostas 3 veces al mes, hablamos de 5 a 12 € al año — modesto pero acumulable con el resto de trucos.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        En España, los días más baratos para repostar son los <strong>lunes y
        martes</strong>, con precios entre 1 y 4 céntimos por litro por debajo
        de los viernes y sábados. La hora del día no afecta al precio (es el
        mismo en surtidor las 24 h), pero conviene evitar repostar las tardes
        de jueves y viernes porque el precio se ajusta al alza ante la mayor
        demanda del fin de semana.
      </Answer>

      <Tldr
        items={[
          "Mejor: lunes y martes. Peor: viernes tarde y sábado mañana.",
          "La hora del día NO cambia el precio (el cartel es el mismo todo el día).",
          "Ahorro real eligiendo bien el día: 5-12 € al año.",
          "Combina con elegir una low cost para multiplicar el ahorro.",
        ]}
      />

      <h2 id="dias-baratos">Los días más baratos: lunes y martes</h2>
      <p>
        Los estudios anuales de la <em>OCU</em> y <em>Facua</em> sobre precios
        de carburantes en España coinciden en una pauta clara: el precio
        medio nacional cae ligeramente entre el lunes y el miércoles, se
        estabiliza el jueves y vuelve a subir el viernes. La diferencia
        semanal es modesta (entre 1 y 4 céntimos por litro) pero consistente
        a lo largo de los años.
      </p>
      <p>
        El motivo es comercial: la mayoría de españoles llena el depósito el
        viernes al salir del trabajo, antes de un viaje de fin de semana, o el
        sábado por la mañana camino del pueblo. Las gasolineras lo saben y
        ajustan al alza los precios entre el miércoles tarde y el sábado para
        capturar esa demanda. El lunes vuelven a bajar para captar al
        conductor diario que sale a trabajar con el depósito casi vacío.
      </p>

      <Callout type="info" title="Cómo lo verifico yo">
        Con la herramienta de <Link href="/">históricos de Carburantes</Link>{" "}
        puedes ver la evolución de cualquier estación durante los últimos
        meses. Si miras una gasolinera con tráfico estable, verás la pauta
        semanal con claridad: pequeñas subidas los jueves/viernes y bajadas
        los lunes.
      </Callout>

      <h2 id="hora-dia">La hora del día no importa</h2>
      <p>
        Un mito muy extendido dice que es más barato repostar por la mañana
        porque «el combustible está más denso y cabe más». Es técnicamente
        cierto: la gasolina se expande con el calor y por la mañana, cuando
        sale del tanque enterrado a 12-15 °C, ocupa algo menos volumen que a
        mediodía. Pero el efecto real es mínimo:
      </p>
      <ul>
        <li>
          El tanque de la gasolinera está enterrado. La temperatura del
          combustible apenas oscila 1-2 °C entre la mañana y la tarde.
        </li>
        <li>
          Esa diferencia se traduce en menos de un 0,1 % de volumen
          adicional — en 50 litros, hablamos de 0,05 € de ahorro.
        </li>
        <li>
          Madrugar para repostar consume gasolina extra que anula
          completamente cualquier ahorro teórico.
        </li>
      </ul>
      <p>
        En cuanto al precio en el cartel, en España las estaciones rara vez lo
        cambian a lo largo del día: lo fijan al abrir y solo lo modifican al
        cierre o al recibir un cisterna nueva. Por eso, dentro del mismo día,
        repostar a las 8:00 o a las 22:00 cuesta exactamente lo mismo.
      </p>

      <h2 id="momentos-caros">Los momentos a evitar</h2>
      <p>
        Si quieres optimizar, hay cuatro momentos del año donde el precio se
        dispara y conviene tener el depósito ya lleno:
      </p>
      <ol>
        <li>
          <strong>Viernes por la tarde antes de un puente o festivo</strong>:
          subidas de hasta 5 céntimos en 24 h, especialmente en estaciones de
          carretera principal.
        </li>
        <li>
          <strong>Inicio de las operaciones salida de Semana Santa, agosto y
          Navidad</strong>: la DGT publica fechas concretas; las gasolineras
          suben precios entre 24 y 48 h antes.
        </li>
        <li>
          <strong>Lunes post-festivo</strong>: cuando el lunes es festivo, la
          subida del fin de semana se prolonga hasta el martes.
        </li>
        <li>
          <strong>Después de un anuncio de la OPEP o conflicto geopolítico</strong>:
          aunque el crudo no llega al surtidor hasta semanas después, muchas
          estaciones ajustan «por previsión».
        </li>
      </ol>

      <h2 id="cuando-actualizan">Cuándo cambian el precio en el cartel</h2>
      <p>
        Por la Orden ICT/155/2020, todas las estaciones de servicio de España
        están obligadas a comunicar al Ministerio cualquier cambio de precio.
        La comunicación se hace electrónicamente y el Ministerio publica los
        datos en su portal varias veces al día (la propia API que usa{" "}
        <Link href="/">Carburantes</Link> se actualiza cada 30 minutos
        aproximadamente en horario laboral).
      </p>
      <p>
        En la práctica, la mayoría de gasolineras revisan su precio al
        terminar la jornada (entre las 21:00 y las 23:00) y los pequeños
        cambios suelen ser visibles al día siguiente. Las estaciones de
        autopista y las low cost ajustan con más frecuencia — algunas
        Ballenoil y Plenoil llegan a cambiar el precio dos o tres veces al
        día siguiendo la cotización del mercado mayorista.
      </p>

      <h2 id="estrategia-real">La estrategia que funciona de verdad</h2>
      <p>
        El día concreto solo aporta 1-4 céntimos por litro. Combinado con el
        resto de palancas, sí marcas una diferencia notable en el gasto anual
        de combustible:
      </p>
      <ul>
        <li>
          <strong>Elegir bien la estación</strong>: hasta 15 céntimos por litro
          entre la más cara y la más barata de un mismo municipio.{" "}
          <Link href="/guias/gasolineras-low-cost">
            Las low cost son la palanca principal
          </Link>
          .
        </li>
        <li>
          <strong>Elegir bien el día</strong>: 1-4 céntimos repostando los
          lunes/martes.
        </li>
        <li>
          <strong>Usar tarjeta de descuento</strong>:{" "}
          <Link href="/guias/descuentos-tarjetas-gasolineras">
            entre 3 y 10 céntimos según marca y modalidad
          </Link>
          .
        </li>
        <li>
          <strong>Conducir eficientemente</strong>:{" "}
          <Link href="/guias/conducir-ahorrar-combustible">
            un 15-20 % menos consumo
          </Link>{" "}
          aplicando 4-5 hábitos sencillos.
        </li>
      </ul>
      <p>
        Sumadas, estas cuatro palancas reducen fácilmente entre un 20 % y un
        30 % la factura anual de combustible de un usuario medio (que en
        España ronda los 1.500 € al año en un coche diésel).
      </p>

      <AppCta
        title="Ver el precio actualizado ahora"
        body="Carburantes lee los datos del Ministerio cada media hora. Compara la estación más barata cerca de ti antes de salir a repostar."
        href="/cerca"
        linkLabel="Buscar cerca de mí"
      />

      <InternalLinks
        title="Sigue leyendo"
        links={[
          { href: "/guias/gasolineras-low-cost", label: "Gasolineras low cost: ¿es igual de buena la gasolina?" },
          { href: "/guias/descuentos-tarjetas-gasolineras", label: "Descuentos de tarjetas de fidelización" },
          { href: "/guias/conducir-ahorrar-combustible", label: "Cómo conducir para gastar menos combustible" },
          { href: "/guias/como-se-forma-precio-gasolina", label: "Cómo se forma el precio de la gasolina en España" },
        ]}
      />
    </>
  );
}

export default guide;
