import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "luz-reserva-cuantos-km-quedan";
const title = "Luz de reserva: ¿cuántos kilómetros quedan de verdad?";
const description =
  "Se enciende el testigo de gasolina: ¿cuánto puedes seguir? Te explicamos cuántos km da la reserva de media, por qué no debes apurarla y qué hacer.";

const guide = {
  slug,
  title,
  seoTitle: "Luz de reserva: cuántos km quedan · Guía",
  description,
  category: "practico",
  datePublished: "2026-05-29",
  dateModified: "2026-05-29",
  readingMinutes: 5,
  keywords: [
    "luz de reserva cuántos km",
    "reserva gasolina kilómetros",
    "testigo gasolina cuánto queda",
    "cuánto aguanta la reserva",
  ],
  mentions: [
    { "@type": "Thing", name: "Reserva" },
    { "@type": "Thing", name: "Autonomía" },
  ],
  faq: [
    {
      q: "¿Cuántos kilómetros quedan al encenderse la reserva?",
      a: "Depende del coche, pero como referencia típica en España (2026) la reserva equivale a entre 5 y 10 litros, lo que suele dar margen para unos 50 a 100 kilómetros en un turismo medio. Un utilitario pequeño que gasta poco puede pasar de 80-100 km; un SUV grande o conducción rápida puede quedarse en 40-50 km. La cifra exacta de tu coche aparece a veces en el manual, pero conviene tratarla siempre como una estimación a la baja y no apurar.",
    },
    {
      q: "¿Es malo conducir en reserva?",
      a: "Hacerlo de vez en cuando no daña el coche, pero hacerlo de forma habitual no es recomendable. En el fondo del depósito se acumulan sedimentos e impurezas, y en muchos coches la propia gasolina ayuda a refrigerar la bomba de combustible; circular casi siempre en reserva puede hacer que la bomba trabaje más caliente y se desgaste antes. Como rutina es mejor repostar antes de que se encienda el testigo.",
    },
    {
      q: "¿Y si me quedo tirado sin gasolina?",
      a: "Si el coche se para, intenta llevarlo con la inercia a un lugar seguro fuera de la calzada, enciende las luces de emergencia y, en vías rápidas, colócate detrás del quitamiedos con el chaleco reflectante puesto. Llama a tu seguro o a la asistencia en carretera: muchas pólizas cubren llevarte combustible o remolcarte hasta la gasolinera más cercana. En un coche diésel quedarse seco puede meter aire en el circuito y obligar a purgarlo, así que conviene no llegar a ese punto.",
    },
    {
      q: "¿Cuánto cabe en la reserva?",
      a: "No hay un valor fijo, pero en la mayoría de turismos la reserva representa en torno al 10-15 % de la capacidad total del depósito. En un depósito de 50 litros eso son unos 5 a 8 litros aproximadamente. El sensor además mide nivel, no litros exactos, así que la cifra real varía con la inclinación de la carretera y la temperatura. Trátala como un colchón de seguridad, no como un objetivo que vaciar del todo.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Cuando se enciende la luz de reserva, en un turismo medio en España
        suelen quedar <strong>entre 5 y 10 litros</strong>, lo que da margen
        para unos <strong>50 a 100 kilómetros</strong> de media. Es una
        estimación generosa: el dato real depende de tu modelo, tu consumo y
        cómo conduzcas, así que conviene tomarla como aviso para repostar
        pronto, no como un margen que apurar.
      </Answer>

      <Tldr
        items={[
          "La reserva suele equivaler a 5-10 litros: en torno a 50-100 km en un turismo medio (datos típicos, 2026).",
          "Un utilitario que gasta poco aguanta más; un SUV grande o conducir rápido, mucho menos.",
          "El «autonomía restante» del ordenador es un cálculo aproximado y suele ser optimista.",
          "Conducir siempre en reserva fuerza la bomba de combustible y arrastra sedimentos del fondo.",
          "Al ver el testigo, repostar pronto y comparar precio sale más barato que parar de urgencia.",
        ]}
      />

      <h2 id="que-significa-luz-reserva">Qué significa la luz de reserva</h2>
      <p>
        La luz de reserva es un testigo en el cuadro —normalmente un surtidor
        de gasolina en color ámbar o amarillo— que se enciende cuando el nivel
        del depósito baja de un umbral fijado por el fabricante. No mide los
        litros exactos que quedan: hay un flotador o sensor dentro del depósito
        que detecta la altura del combustible y, al cruzar cierto punto, manda
        encender el aviso.
      </p>
      <p>
        Ese umbral está pensado con un margen de seguridad deliberado. El
        fabricante no quiere que el testigo se encienda cuando ya no queda
        nada, sino con tiempo suficiente para llegar a una gasolinera con calma.
        Por eso, cuando se enciende, todavía hay combustible útil en el
        depósito: la reserva es justamente ese colchón final.
      </p>
      <p>
        Conviene distinguir dos cosas que la gente confunde: el{" "}
        <strong>testigo de reserva</strong> (un aviso de encendido/apagado) y la{" "}
        <strong>aguja o barra del nivel</strong> (que muestra cuánto queda de
        forma continua). El testigo se enciende cuando la barra está ya cerca
        del fondo, pero ninguno de los dos es un litrómetro de precisión.
      </p>

      <h2 id="cuantos-km-da-de-media">Cuántos km da de media</h2>
      <p>
        Como referencia general en España (2026), la reserva equivale a entre 5
        y 10 litros, y eso se traduce en unos 50 a 100 kilómetros en un turismo
        medio. Pero «de media» significa precisamente que tu coche puede estar
        bastante por encima o por debajo de esa horquilla.
      </p>
      <p>
        El kilometraje real que te da la reserva depende sobre todo de dos
        factores: cuántos litros marca el fabricante como reserva y cuánto
        consume tu coche en ese momento. Un mismo depósito de reserva rinde el
        doble de kilómetros en un utilitario que gasta 5 litros a los 100 km que
        en un todoterreno que gasta 10.
      </p>

      <CompareTable
        caption="Kilómetros aproximados en reserva según tipo de coche (estimaciones típicas, España 2026)"
        headers={["Tipo de coche", "Reserva aprox.", "Consumo aprox.", "Km estimados"]}
        rows={[
          ["Utilitario pequeño", "~5-6 L", "~5 L/100 km", "~90-110 km"],
          ["Compacto / familiar", "~6-8 L", "~6-7 L/100 km", "~70-100 km"],
          ["SUV mediano", "~7-9 L", "~7-8 L/100 km", "~60-90 km"],
          ["SUV grande / monovolumen", "~8-10 L", "~9-10 L/100 km", "~50-70 km"],
          ["Conducción rápida / autovía", "igual reserva", "+15-25 %", "~40-60 km"],
        ]}
      />

      <p>
        Estas cifras son orientativas: tómalas como el escenario en el que
        deberías estar buscando gasolinera, no como una promesa. Si vas con la
        familia, el maletero lleno y aire acondicionado a tope, gastas más de lo
        que crees y la reserva se acorta. Si quieres entender por qué tu consumo
        sube en autovía, lo vemos en la guía de{" "}
        <Link href="/guias/velocidad-consumo-autovia">
          velocidad y consumo en autovía
        </Link>
        .
      </p>

      <h2 id="por-que-el-ordenador-engana">Por qué la cifra del ordenador engaña</h2>
      <p>
        El indicador de «autonomía restante» (los «km hasta vacío») es un
        cálculo aproximado, no una medición exacta, y casi siempre peca de
        optimista en los primeros kilómetros de reserva. El ordenador estima los
        litros que quedan y los divide por tu consumo medio reciente, así que
        cualquier cambio de ritmo o de carretera desbarata la cuenta.
      </p>
      <p>
        El problema es que ese consumo medio mira al pasado. Si vienes de bajar
        un puerto a poco gas, el coche habrá calculado un consumo bajo y te dará
        una autonomía generosa; en cuanto pises una rampa o aceleres en autovía,
        el gasto real se dispara y los kilómetros prometidos se evaporan mucho
        más rápido de lo que baja el contador.
      </p>
      <ul>
        <li>
          <strong>El sensor mide nivel, no litros.</strong> En cuesta, frenando
          o en una rotonda, el combustible se mueve dentro del depósito y la
          lectura oscila. Por eso a veces la aguja «recupera» un poco al parar.
        </li>
        <li>
          <strong>Muchos coches dejan de mostrar cifra.</strong> Por debajo de
          cierto punto, varios modelos sustituyen los km restantes por rayas
          («---»). No es un error: el fabricante prefiere no dar un número que
          podrías apurar al límite.
        </li>
        <li>
          <strong>La reserva real es menos de lo que parece.</strong> Una parte
          del combustible que queda no es del todo aprovechable según la
          inclinación, y la bomba puede empezar a aspirar aire antes de vaciar
          la última gota.
        </li>
      </ul>
      <Callout type="note" title="Regla práctica con el indicador">
        Si el ordenador te dice «60 km restantes», cuenta mentalmente con la
        mitad para decisiones importantes: planifica repostar dentro de los
        próximos 25-30 km, no estirar hasta el último kilómetro teórico. El
        margen que pierdes es barato comparado con quedarte tirado.
      </Callout>

      <h2 id="que-pasa-si-te-quedas-sin">Qué pasa si te quedas sin gasolina</h2>
      <p>
        Quedarte sin combustible no solo es una molestia: puede salir caro y, en
        algunos coches, dañar componentes. Cuando el depósito se vacía del todo,
        la bomba de combustible empieza a aspirar aire en lugar de líquido, y
        eso tiene consecuencias distintas según el motor.
      </p>
      <ul>
        <li>
          <strong>En gasolina</strong>, lo habitual es que el coche dé tirones,
          pierda potencia y acabe parándose. Tras repostar suele arrancar sin
          más, aunque puede costar un par de intentos mientras se llena de nuevo
          el circuito.
        </li>
        <li>
          <strong>En diésel</strong>, quedarse seco es más delicado: entra aire
          en el sistema de inyección y en muchos modelos hay que{" "}
          <em>purgar</em> el circuito (cebar el sistema) antes de que vuelva a
          arrancar. A veces puedes hacerlo tú; otras requiere taller.
        </li>
        <li>
          <strong>La bomba de combustible sufre.</strong> En bastantes coches la
          gasolina ayuda a refrigerar y lubricar la bomba; trabajar en seco o
          casi seco de forma repetida acorta su vida, y sustituirla no es barato.
        </li>
      </ul>
      <p>
        Si llegas a pararte en marcha, la prioridad es la seguridad. Aprovecha
        la inercia para sacar el coche de la calzada, enciende las luces de
        emergencia, ponte el chaleco reflectante antes de salir y, en autovía o
        autopista, sitúate detrás de la barrera de protección. Después llama a
        tu seguro o a la asistencia en carretera: muchas pólizas cubren
        acercarte combustible o remolcarte. Ten en cuenta que la normativa de
        señalización y de uso de balizas puede cambiar, así que conviene revisar
        las indicaciones vigentes de la DGT.
      </p>

      <h2 id="que-hacer-al-entrar-en-reserva">Qué hacer al entrar en reserva</h2>
      <p>
        Al ver el testigo, la jugada inteligente no es exprimir cada kilómetro,
        sino repostar pronto y al mejor precio posible. Como acabas de cruzar el
        umbral, normalmente tienes margen de sobra para no parar en la primera
        gasolinera que aparezca —que suele ser de las más caras— y elegir con
        cabeza.
      </p>
      <ul>
        <li>
          <strong>No apures por deporte.</strong> Decide repostar dentro de los
          siguientes kilómetros razonables y olvídate de batir tu récord de
          reserva. El ahorro de no parar es nulo; el riesgo, real.
        </li>
        <li>
          <strong>Suaviza la conducción.</strong> Mientras buscas gasolinera,
          quita pie del acelerador, mantén una velocidad constante y evita
          acelerones. Con la reserva encendida, conducir suave estira los
          kilómetros disponibles. Tienes más trucos en{" "}
          <Link href="/guias/conducir-ahorrar-combustible">
            conducir para ahorrar combustible
          </Link>
          .
        </li>
        <li>
          <strong>Compara antes de entrar.</strong> En reserva no tienes por qué
          aceptar el primer precio. Mira qué estaciones hay cerca y cuánto
          cobran: la diferencia entre dos gasolineras próximas puede ser de
          varios céntimos por litro.
        </li>
        <li>
          <strong>Si vas de viaje, planifica.</strong> En ruta larga, decidir de
          antemano dónde repostar evita sustos en tramos sin servicio. Lo
          desarrollamos en{" "}
          <Link href="/guias/planificar-repostajes-ruta">
            planificar repostajes en ruta
          </Link>
          .
        </li>
      </ul>
      <p>
        En carretera, además, las gasolineras de autopista y las de áreas
        aisladas suelen ser más caras que las de los polígonos o las low cost de
        las afueras. Si la reserva te lo permite, desviarte unos minutos a una
        más barata compensa; si no, repón lo justo y llena después donde salga
        mejor de precio.
      </p>

      <AppCta
        title="¿En reserva? Encuentra la gasolinera más barata cerca"
        body="Carburantes lee los precios oficiales del Ministerio. Pulsa «Cerca de mí» para ver al instante las estaciones a tu alrededor ordenadas por precio y repostar sin pagar de más."
        href="/"
        linkLabel="Buscar gasolineras cerca"
      />

      <p>
        En resumen: el testigo de reserva es un aviso con margen, no una cuenta
        atrás al milímetro. Trátalo como la señal para repostar pronto y bien,
        no como un reto. Y aprovecha ese rato para comparar precios reales en vez
        de pagar lo primero que encuentres.
      </p>

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/planificar-repostajes-ruta", label: "Planificar repostajes en ruta" },
          {
            href: "/guias/gasolinera-mas-barata-cerca-como-encontrar",
            label: "Gasolinera más barata cerca",
          },
          { href: "/guias/gasolineras-24-horas", label: "Gasolineras 24 horas" },
        ]}
      />
    </>
  );
}

export default guide;
