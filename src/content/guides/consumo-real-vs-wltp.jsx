import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "consumo-real-vs-wltp";
const title = "Consumo real vs homologado (WLTP): por qué no coinciden";
const description =
  "Tu coche gasta más que lo que dice la ficha. Te explicamos qué es el ciclo WLTP, por qué el consumo real es mayor y cómo calcular el tuyo de verdad.";

const guide = {
  slug,
  title,
  seoTitle: "Consumo real vs WLTP · Guía Carburantes",
  description,
  category: "practico",
  datePublished: "2026-05-30",
  dateModified: "2026-05-30",
  readingMinutes: 6,
  keywords: [
    "consumo real vs wltp",
    "consumo homologado",
    "ciclo wltp",
    "por qué gasta más mi coche",
    "consumo real coche",
  ],
  mentions: [{ "@type": "Thing", name: "WLTP" }],
  faq: [
    {
      q: "¿Por qué mi coche gasta más que en la ficha?",
      a: "Porque el consumo de la ficha se mide en un laboratorio, en condiciones controladas (temperatura suave, sin viento, sin aire acondicionado, conducción muy suave y un peso de referencia fijo). En tu día a día influyen el tráfico, las cuestas, el frío, los neumáticos, el aire acondicionado, la carga que llevas y, sobre todo, cómo aceleras. La cifra homologada es comparable entre coches, pero no es una promesa de lo que vas a gastar tú.",
    },
    {
      q: "¿Qué es el ciclo WLTP?",
      a: "WLTP son las siglas de Worldwide Harmonised Light Vehicles Test Procedure, el procedimiento de homologación que se usa en Europa desde 2017-2018 para medir consumo y emisiones. Sustituyó al antiguo ciclo NEDC, que daba cifras mucho más optimistas. El WLTP somete al coche a un ciclo de unos 30 minutos y 23 km con cuatro fases de velocidad (baja, media, alta y muy alta, hasta unos 131 km/h) sobre un banco de rodillos. Es más realista que el NEDC, pero sigue siendo un test de laboratorio.",
    },
    {
      q: "¿Cuánto se desvía el consumo real?",
      a: "De media, en torno a un 15-25 % por encima del dato WLTP en condiciones normales, según el tipo de coche y de uso. En ciudad con frío, trayectos cortos o conducción nerviosa la desviación puede superar el 30-40 %. En carretera a velocidad constante y con buen tiempo, puedes quedarte muy cerca del dato homologado. Son rangos orientativos: lo único exacto es medir tu propio consumo.",
    },
    {
      q: "¿Cómo calculo mi consumo real?",
      a: "Llena el depósito hasta que el surtidor corte, pon a cero el cuentakilómetros parcial y conduce con normalidad. En el siguiente repostaje, vuelve a llenar hasta que corte y anota los litros que has metido y los kilómetros recorridos. Divide litros entre kilómetros y multiplica por 100: ese es tu consumo real en litros a los 100 km. Repítelo dos o tres veces para tener una media fiable.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        El consumo homologado (WLTP) se mide en un laboratorio en condiciones
        ideales, así que es una cifra de <strong>referencia para comparar
        coches</strong>, no lo que gastarás tú. En la vida real influyen el
        tráfico, el frío, el aire acondicionado, la carga y tu forma de
        conducir, por lo que lo normal es gastar entre un <strong>15 % y un
        25 % más</strong> que el dato de la ficha.
      </Answer>

      <Tldr
        items={[
          "El consumo WLTP es un test de laboratorio: sirve para comparar coches, no para predecir tu gasto.",
          "En la práctica gastarás de media un 15-25 % más; en ciudad y con frío, aún más.",
          "Las desviaciones grandes vienen de trayectos cortos, conducción nerviosa, aire acondicionado y exceso de velocidad.",
          "Para saber tu consumo real: llena, anota kilómetros y litros del siguiente lleno, y divide.",
          "Casi todo lo que sube el consumo está bajo tu control: velocidad, presión de neumáticos y mantenimiento.",
        ]}
      />

      <h2 id="que-es-el-consumo-homologado-y-el-wltp">
        Qué es el consumo homologado y el WLTP
      </h2>
      <p>
        El consumo homologado es la cifra oficial que el fabricante declara en
        la ficha técnica y en los folletos: «4,8 L/100 km», por ejemplo. No es
        un número que alguien haya medido conduciendo por tu ciudad, sino el
        resultado de un test de laboratorio estandarizado y obligatorio para
        poder vender el coche en la Unión Europea.
      </p>
      <p>
        Desde 2017-2018, ese test es el <strong>WLTP</strong> (
        <em>Worldwide Harmonised Light Vehicles Test Procedure</em>). Sustituyó
        al antiguo ciclo NEDC, que era mucho más benévolo y daba consumos
        irrealmente bajos. El WLTP coloca el coche sobre un banco de rodillos,
        en una sala con temperatura controlada, y lo somete a un ciclo de unos
        23 km y media hora con cuatro fases: velocidad baja (urbana), media,
        alta y muy alta (hasta unos 131 km/h). De ahí salen las cifras que ves
        en el catálogo.
      </p>
      <p>
        La clave es entender <strong>para qué sirve</strong> ese número. El WLTP
        está pensado para que todos los coches se midan exactamente igual y así
        puedas compararlos entre sí de forma justa: un coche con 5,0 L/100 km
        homologados gastará menos que uno con 6,5 L/100 km en condiciones
        equivalentes. Lo que el WLTP <em>no</em> promete es que tú vayas a
        gastar esos 5,0 litros. Es un baremo comparativo, no una garantía.
      </p>

      <h2 id="por-que-el-real-es-mayor">Por qué el real es mayor</h2>
      <p>
        El consumo real es casi siempre mayor que el homologado porque el
        laboratorio elimina todo lo que en la vida real te hace gastar de más.
        En el banco de rodillos no hay viento de cara, ni cuestas de verdad, ni
        atascos, ni se enciende el aire acondicionado, y la conducción es
        suavísima y optimizada. Tu trayecto al trabajo no se parece en nada a
        eso.
      </p>
      <p>
        Estos son los factores que más alejan tu gasto del dato de la ficha:
      </p>
      <ul>
        <li>
          <strong>Tu forma de conducir.</strong> Acelerar con fuerza y frenar
          tarde es lo que más dispara el consumo. Una conducción nerviosa puede
          gastar mucho más que una suave en el mismo trayecto. Lo desarrollamos
          en{" "}
          <Link href="/guias/conducir-ahorrar-combustible">
            la guía de conducción eficiente
          </Link>
          .
        </li>
        <li>
          <strong>La velocidad.</strong> La resistencia del aire crece muy
          rápido con la velocidad. Ir a 130 en lugar de a 110-120 en autovía
          puede subir el consumo de forma notable sin ganar apenas tiempo.
        </li>
        <li>
          <strong>El frío y los trayectos cortos.</strong> Con el motor frío el
          coche gasta más hasta que alcanza temperatura. Si solo haces 3-4 km,
          gran parte del trayecto es con el motor frío: ahí la desviación se
          dispara.
        </li>
        <li>
          <strong>El aire acondicionado y la calefacción.</strong> El compresor
          del aire tira del motor; en verano puede sumar un consumo extra
          apreciable, sobre todo en ciudad.
        </li>
        <li>
          <strong>El peso y la carga.</strong> Llevar el maletero lleno, una
          baca o el coche cargado de gente aumenta el esfuerzo del motor. El
          WLTP usa un peso de referencia fijo, normalmente menor que el de tu
          uso real.
        </li>
        <li>
          <strong>Neumáticos y mantenimiento.</strong> Unos neumáticos
          desinflados, un filtro de aire sucio o un aceite inadecuado suben el
          consumo de forma silenciosa.
        </li>
      </ul>
      <p>
        Ninguno de estos factores aparece en el WLTP, y todos están presentes en
        tu día a día. Por eso la cifra de la ficha es siempre el suelo, casi
        nunca el techo.
      </p>

      <Callout type="info" title="Híbridos y eléctricos: cuidado con el WLTP">
        En los híbridos enchufables (PHEV) la cifra WLTP puede ser
        especialmente engañosa, porque el test asume que arrancas con la batería
        cargada. Si circulas con la batería vacía, el consumo real de gasolina
        se dispara muy por encima del homologado. En los eléctricos pasa algo
        parecido con la autonomía: el frío y la autovía reducen los kilómetros
        reales frente a la cifra oficial.
      </Callout>

      <h2 id="cuanto-se-desvia-de-media">Cuánto se desvía de media</h2>
      <p>
        No hay una cifra única, porque depende de cada coche y, sobre todo, de
        cómo y dónde conduces. Pero como orientación, estos son rangos típicos en
        España en 2026 frente al dato WLTP:
      </p>

      <CompareTable
        caption="Desviación orientativa del consumo real sobre el WLTP (rangos típicos, 2026)"
        headers={["Tipo de uso", "Desviación aproximada", "Por qué"]}
        rows={[
          [
            "Autovía a velocidad constante, buen tiempo",
            "+0 a +10 %",
            "Es lo más parecido a las fases altas del test",
          ],
          [
            "Uso mixto habitual (ciudad y carretera)",
            "+15 a +25 %",
            "La media de la mayoría de conductores",
          ],
          [
            "Ciudad, trayectos cortos, atascos",
            "+25 a +40 %",
            "Motor frío, paradas y arranques constantes",
          ],
          [
            "Frío intenso, conducción nerviosa o muy cargado",
            "+40 % o más",
            "Se suman varios factores a la vez",
          ],
        ]}
      />

      <p>
        Es decir: un coche con un WLTP de 5,0 L/100 km gastará en torno a
        5,8-6,3 L/100 km en un uso mixto normal, y puede acercarse a 7 L/100 km
        si lo usas casi siempre para trayectos urbanos cortos. Insistimos en que
        son <strong>rangos orientativos</strong>: lo único exacto es medir tu
        propio coche, y eso es justo lo que vemos a continuación.
      </p>

      <h2 id="como-calcular-tu-consumo-real">Cómo calcular tu consumo real</h2>
      <p>
        El método del «lleno a lleno» es el más fiable y no necesita nada
        especial, solo el tícket del repostaje y el cuentakilómetros. El
        ordenador de a bordo da una pista, pero suele ser optimista: para una
        cifra de verdad, calcúlalo tú con litros y kilómetros.
      </p>
      <ul>
        <li>
          <strong>1. Llena el depósito.</strong> Reposta hasta que el surtidor
          corte solo, sin forzar más. Ese es tu punto de partida.
        </li>
        <li>
          <strong>2. Pon a cero el cuentakilómetros parcial</strong> (el
          «trip») justo después de repostar.
        </li>
        <li>
          <strong>3. Conduce con normalidad.</strong> Cuanto más representativo
          sea el periodo (una semana de uso típico, mejor que un viaje aislado),
          más útil será el resultado.
        </li>
        <li>
          <strong>4. Vuelve a llenar hasta que corte</strong> en la misma
          gasolinera y, a ser posible, con el mismo surtidor, para que el punto
          de corte sea comparable. Anota los <strong>litros</strong> que has
          metido y los <strong>kilómetros</strong> del parcial.
        </li>
        <li>
          <strong>5. Aplica la fórmula:</strong> litros ÷ kilómetros × 100. El
          resultado es tu consumo en litros a los 100 km.
        </li>
      </ul>
      <p>
        Un ejemplo: si has metido 42 litros y has recorrido 640 km, sería 42 ÷
        640 × 100 = <strong>~6,6 L/100 km</strong>. Repite el cálculo dos o tres
        veces y haz la media: una sola medición puede salir desviada por un
        trayecto atípico o por una diferencia en el punto de corte del surtidor.
      </p>
      <p>
        Una vez sabes lo que gastas de verdad, puedes traducirlo a dinero. En{" "}
        <Link href="/guias/calcular-coste-combustible-viaje">
          la guía para calcular el coste de un viaje
        </Link>{" "}
        combinamos tu consumo real con el precio del litro para saber cuánto te
        cuesta cada trayecto.
      </p>

      <h2 id="como-acercarte-al-homologado">Cómo acercarte al homologado</h2>
      <p>
        No vas a igualar el dato de laboratorio en tu día a día, pero sí puedes
        recortar buena parte de la diferencia. Casi todo lo que sube el consumo
        está bajo tu control, y son hábitos gratis:
      </p>
      <ul>
        <li>
          <strong>Levanta el pie en autovía.</strong> Pasar de 130 a 110-120 es
          probablemente el ahorro más grande y fácil que existe, con apenas
          impacto en el tiempo de viaje.
        </li>
        <li>
          <strong>Anticipa y conduce suave.</strong> Acelera de forma
          progresiva, mantén distancia y deja que el coche se frene solo cuando
          ves un semáforo en rojo en lugar de llegar y frenar.
        </li>
        <li>
          <strong>Revisa la presión de los neumáticos.</strong> Unos neumáticos
          a la presión correcta ruedan con menos esfuerzo. Compruébalos al menos
          una vez al mes.
        </li>
        <li>
          <strong>Quita peso y resistencia.</strong> Vacía el maletero de lo que
          no necesites y retira la baca o el portabicis cuando no los uses: hacen
          mucho ruido aerodinámico.
        </li>
        <li>
          <strong>Mantén el coche a punto.</strong> Filtros, aceite y bujías en
          buen estado se traducen en menos consumo. Lo vemos en{" "}
          <Link href="/guias/mantenimiento-coche-consumo">
            la guía de mantenimiento y consumo
          </Link>
          .
        </li>
        <li>
          <strong>Usa el aire con cabeza.</strong> En ciudad, a baja velocidad,
          a veces compensa ventilar; en autovía, llevar las ventanillas bajadas
          genera más resistencia que el propio aire acondicionado.
        </li>
      </ul>
      <p>
        Y la otra mitad del ahorro no está en cómo conduces, sino en{" "}
        <strong>dónde repostas</strong>: el mismo litro puede costar bastantes
        céntimos menos en una estación cercana que en otra. Reducir el consumo y
        pagar el litro más barato es la combinación que de verdad nota tu
        bolsillo a final de mes.
      </p>

      <AppCta
        title="Gasta menos litros y págalos más baratos"
        body="Ya sabes lo que gasta tu coche de verdad; ahora compara el precio del litro. En Carburantes ves las gasolineras más baratas con datos oficiales del Ministerio. Pulsa «Cerca de mí» o busca por tu municipio."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/conducir-ahorrar-combustible", label: "Conducir para ahorrar" },
          { href: "/guias/calcular-coste-combustible-viaje", label: "Calcular el coste de un viaje" },
          { href: "/guias/mantenimiento-coche-consumo", label: "Mantenimiento y consumo" },
        ]}
      />
    </>
  );
}

export default guide;
