import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "calcular-coste-combustible-viaje";
const title = "Cómo calcular el coste de combustible de un viaje";
const description =
  "Antes de salir de ruta, calcula cuánto te costará el combustible: distancia, consumo y precio. Te damos la fórmula sencilla y cómo afinarla con datos reales.";

const guide = {
  slug,
  title,
  seoTitle: "Calcular el coste de combustible de un viaje · Guía",
  description,
  category: "ahorro",
  datePublished: "2026-05-30",
  dateModified: "2026-05-30",
  readingMinutes: 6,
  keywords: [
    "calcular coste combustible viaje",
    "cuánto gasto de gasolina viaje",
    "calculadora gasolina viaje",
    "coste gasolina por km",
  ],
  mentions: [
    { "@type": "Thing", name: "Consumo" },
    { "@type": "Thing", name: "Distancia" },
  ],
  faq: [
    {
      q: "¿Cómo calculo lo que gasto de gasolina en un viaje?",
      a: "La fórmula es: distancia en kilómetros, dividida entre 100, multiplicada por tu consumo en litros cada 100 km, y multiplicada por el precio del litro. Por ejemplo, un viaje de 500 km con un coche que gasta 6 litros a los 100 y un precio de 1,55 euros el litro: 500 dividido entre 100 son 5; por 6 litros son 30 litros; por 1,55 euros salen unos 46,5 euros de combustible para la ida. Si es ida y vuelta, duplica la distancia. La cifra exacta depende de tu consumo real y del precio que encuentres ese día, así que conviene comprobar el precio actual en la app antes de salir.",
    },
    {
      q: "¿Qué consumo uso para el cálculo?",
      a: "Usa tu consumo real en las condiciones del viaje, no el dato oficial del catálogo. La cifra homologada WLTP suele quedarse corta frente al gasto real, sobre todo con el coche cargado, el aire acondicionado puesto y a velocidad de autovía. Lo más fiable es mirar el consumo medio que marca el ordenador de a bordo tras un trayecto largo parecido, o calcularlo a mano con dos llenos completos y los kilómetros recorridos entre ellos. Para un viaje por autovía cargado, es prudente sumar entre medio y un litro a tu consumo habitual de ciudad.",
    },
    {
      q: "¿Cómo reparto el gasto entre pasajeros?",
      a: "Lo más justo es sumar el coste total del combustible y los peajes y dividirlo entre el número de ocupantes que comparten el gasto, incluido el conductor. Si el viaje es de 46 euros de combustible más 20 de peaje, son 66 euros entre cuatro personas: unos 16,5 euros cada una. Algunos grupos dejan al conductor fuera del reparto como compensación por poner el coche y el desgaste, o reparten solo el combustible y dejan los peajes aparte. No hay una regla única: lo importante es acordarlo antes de salir para evitar malentendidos.",
    },
    {
      q: "¿Hay alguna herramienta?",
      a: "Sí. En Carburantes tienes un planificador de ruta donde introduces origen y destino y te muestra la distancia del trayecto junto a las gasolineras del recorrido con su precio oficial actualizado. Con esos dos datos, la distancia y el precio real, solo te falta tu consumo para tener el coste afinado. La función Cerca de mí te ayuda además a localizar la estación más barata de tu zona antes de salir, para que el precio que metes en el cálculo sea el mejor disponible y no una estimación.",
    },
  ],
  howTo: {
    name: "Cómo calcular el coste de combustible de un viaje",
    description:
      "Pasos para estimar cuánto te costará el combustible de una ruta a partir de la distancia, tu consumo real y el precio del litro, y cómo afinar y repartir el gasto.",
    totalTime: "PT6M",
    steps: [
      {
        name: "Aplica la fórmula básica",
        text: "Divide la distancia entre 100, multiplica por tu consumo en litros cada 100 km y multiplica por el precio del litro para obtener el coste del combustible.",
        anchor: "formula-basica",
      },
      {
        name: "Mide la distancia del viaje",
        text: "Calcula los kilómetros reales del trayecto con el planificador o un mapa, y duplícalos si cuentas ida y vuelta.",
        anchor: "paso-1-distancia",
      },
      {
        name: "Usa tu consumo real",
        text: "Parte del consumo medio que marca el ordenador de a bordo o de dos llenos completos, no de la cifra optimista del catálogo.",
        anchor: "paso-2-consumo-real",
      },
      {
        name: "Mete el precio del combustible",
        text: "Comprueba el precio oficial actualizado del combustible que usas en las gasolineras de tu ruta y mete el más realista en el cálculo.",
        anchor: "paso-3-precio",
      },
      {
        name: "Afina y reparte el gasto",
        text: "Suma peajes y un margen de seguridad, y divide el total entre los ocupantes si compartís coche.",
        anchor: "paso-4-afina-reparte",
      },
    ],
  },
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Para calcular el coste de combustible de un viaje necesitas tres
        datos: la <strong>distancia</strong> en kilómetros, tu{" "}
        <strong>consumo</strong> en litros cada 100 km y el{" "}
        <strong>precio</strong> del litro. La fórmula es{" "}
        <strong>(distancia ÷ 100) × consumo × precio</strong>. Por ejemplo,
        500 km a 6 L/100 km con el litro a 1,55 € salen unos 46,5 €. El
        resultado solo es fiable si partes de tu consumo real y del precio
        que de verdad vas a pagar.
      </Answer>

      <Tldr
        items={[
          "Fórmula: (distancia ÷ 100) × consumo (L/100 km) × precio del litro.",
          "Usa tu consumo real en viaje, no la cifra del catálogo (suele quedarse corta).",
          "Para ida y vuelta, duplica la distancia antes de calcular.",
          "Mete el precio real del día, no uno aproximado: cambia cada jornada y por zona.",
          "Suma peajes y un margen, y divide entre los ocupantes si compartís coche.",
        ]}
      />

      <h2 id="formula-basica">La fórmula básica</h2>
      <p>
        Calcular cuánto te costará el combustible de un viaje es una cuenta
        sencilla que solo necesita tres ingredientes. La fórmula completa es:
      </p>
      <ul>
        <li>
          <strong>(distancia ÷ 100) × consumo × precio del litro</strong>
        </li>
      </ul>
      <p>
        Donde la <strong>distancia</strong> son los kilómetros totales del
        trayecto, el <strong>consumo</strong> son los litros que gasta tu
        coche cada 100 km y el <strong>precio</strong> es lo que cuesta un
        litro del combustible que usas. La división entre 100 está ahí porque
        el consumo se expresa «cada 100 km»: primero averiguas cuántos
        «paquetes» de 100 km tiene tu viaje y luego multiplicas por lo que
        gasta cada uno.
      </p>
      <p>
        Un ejemplo paso a paso para un viaje de 500 km, un coche que gasta 6
        L/100 km y un precio de 1,55 €/L (cifras típicas en España, 2026):
      </p>
      <ul>
        <li>500 ÷ 100 = 5 (paquetes de 100 km)</li>
        <li>5 × 6 = 30 litros que vas a consumir</li>
        <li>30 × 1,55 = ~46,5 € de combustible</li>
      </ul>
      <p>
        Esos ~46,5 € serían solo la ida. Si el viaje es de ida y vuelta,
        duplica la distancia desde el principio (1.000 km) y obtendrás en
        torno a 93 €. La cuenta es la misma para diésel, gasolina o GLP: solo
        cambian las cifras de consumo y precio que metes. Ten en cuenta que
        este resultado es una estimación de partida; en los siguientes pasos
        verás cómo afinar cada dato para que se acerque a lo que pagarás de
        verdad.
      </p>

      <Callout type="note" title="Un atajo útil: el coste por kilómetro">
        Si quieres comparar viajes rápido, calcula tu coste por km: consumo ×
        precio ÷ 100. Con 6 L/100 km y 1,55 €/L sale ~0,093 €/km, es decir,
        unos 9 céntimos por kilómetro. Multiplicado por los km del trayecto te
        da el gasto al instante, sin tener que repetir toda la fórmula cada
        vez.
      </Callout>

      <h2 id="paso-1-distancia">Paso 1: la distancia</h2>
      <p>
        El primer dato es cuántos kilómetros vas a recorrer de verdad. Parece
        lo más fácil, pero es donde más se suele fallar por usar una cifra
        «a ojo». Apóyate en un planificador de ruta o un mapa que te dé la
        distancia real por carretera entre origen y destino, no la distancia
        en línea recta.
      </p>
      <ul>
        <li>
          <strong>Ida y vuelta</strong>: si vas a volver, cuenta el doble. Es
          el error más habitual al estimar el coste de un viaje.
        </li>
        <li>
          <strong>Desvíos y vueltas extra</strong>: suma los kilómetros que
          harás ya en destino (moverte por la ciudad, excursiones, ir y venir
          al alojamiento). En un fin de semana fuera pueden ser bastantes.
        </li>
        <li>
          <strong>Rutas alternativas</strong>: la opción más corta no siempre
          es la más barata. Una autovía un poco más larga pero a velocidad
          constante puede gastar menos combustible que un trazado corto de
          puerto de montaña con muchas subidas.
        </li>
      </ul>
      <p>
        Si tu viaje implica paradas para repostar, conviene además situar
        dónde caerán esas paradas sobre el mapa. Lo vemos con detalle en{" "}
        <Link href="/guias/planificar-repostajes-ruta">cómo planificar los
        repostajes de una ruta</Link>, que se apoya en tu autonomía real y en
        los precios del trayecto.
      </p>

      <h2 id="paso-2-consumo-real">Paso 2: tu consumo real</h2>
      <p>
        El segundo dato, y el que más cambia el resultado, es tu consumo. La
        clave aquí es usar tu <strong>consumo real en las condiciones del
        viaje</strong>, no la cifra optimista del catálogo. El dato homologado
        WLTP que aparece en la ficha del coche suele quedarse corto frente al
        gasto real de carretera, y más todavía si vas cargado.
      </p>
      <p>
        Tienes dos formas fiables de conocer tu consumo:
      </p>
      <ul>
        <li>
          <strong>El ordenador de a bordo</strong>: mira el consumo medio que
          marca tras un trayecto largo por autovía parecido al que vas a
          hacer. Reinícialo al empezar un viaje similar para tener una cifra
          limpia.
        </li>
        <li>
          <strong>El método de dos llenos</strong>: llena el depósito a tope,
          pon el cuentakilómetros parcial a cero, conduce con normalidad y, en
          el siguiente lleno completo, divide los litros repostados entre los
          km recorridos y multiplica por 100. Esa es tu cifra real.
        </li>
      </ul>
      <p>
        Recuerda que el consumo de viaje casi nunca coincide con tu media de
        ciudad. Con el coche cargado de equipaje y pasajeros, una baca o un
        cofre en el techo, el aire acondicionado a tope en verano y un ritmo
        sostenido de autovía, el gasto sube. Como regla práctica, para un
        viaje cargado por autovía suma entre medio y un litro a tu consumo
        habitual. Si quieres bajar esa cifra, en{" "}
        <Link href="/guias/velocidad-consumo-autovia">esta guía vemos cuánto
        influye la velocidad en autovía</Link> sobre el consumo, que es uno de
        los factores que más pesa.
      </p>

      <Callout type="note" title="La diferencia entre catálogo y realidad pesa">
        En un viaje de 600 km, calcular con 5 L/100 km (la cifra optimista) en
        lugar de 6,5 L/100 km (la real con el coche cargado) son ~9 litros de
        diferencia: unos 14 € de menos en tu estimación que luego aparecen en
        el surtidor. Por eso conviene partir siempre del consumo real, aunque
        sea menos favorable.
      </Callout>

      <h2 id="paso-3-precio">Paso 3: el precio del combustible</h2>
      <p>
        El tercer dato es el precio del litro, y aquí está la única variable
        que puedes controlar de verdad antes de salir. El consumo de tu coche
        es el que es y la distancia viene dada por el destino, pero{" "}
        <strong>dónde repostas sí cambia lo que pagas</strong>, y la
        diferencia entre la gasolinera más cara y la más barata de una misma
        zona puede ser de varios céntimos por litro.
      </p>
      <p>
        Por eso, en lugar de meter un precio aproximado en la fórmula,
        conviene partir del precio real del día. Algunas pautas:
      </p>
      <ul>
        <li>
          <strong>Usa el combustible correcto</strong>: el precio del diésel,
          la gasolina 95, la 98 o el GLP no es el mismo. Mete el del que de
          verdad usas tu coche.
        </li>
        <li>
          <strong>El precio cambia cada día</strong>: no es un dato fijo ni una
          estadística oficial estable. Varía a diario y según la provincia, así
          que comprueba el precio actual justo antes de salir.
        </li>
        <li>
          <strong>Reposta donde compense</strong>: salir de casa con el
          depósito lleno desde una estación barata de tu zona suele salir mejor
          que repostar en la primera área de la autopista, que tiende a estar
          entre las más caras.
        </li>
      </ul>
      <p>
        En Carburantes ves el precio oficial de cada estación, actualizado con
        los datos del Ministerio, tanto cerca de ti como a lo largo de tu ruta.
        Si quieres dimensionar cuánto se puede ahorrar simplemente eligiendo
        bien, lo analizamos en{" "}
        <Link href="/guias/cuanto-se-ahorra-comparando-gasolineras">cuánto se
        ahorra comparando gasolineras</Link>.
      </p>

      <CompareTable
        caption="Cómo cambia el coste de un viaje de 500 km según el dato (datos típicos en España, 2026)"
        headers={["Variable", "Estimación a ojo", "Dato afinado", "Efecto en el coste"]}
        rows={[
          ["Distancia", "Solo la ida (500 km)", "Ida y vuelta + extras (1.050 km)", "Más del doble"],
          ["Consumo", "Catálogo (5 L/100 km)", "Real cargado (6,5 L/100 km)", "~30 % más litros"],
          ["Precio", "Aproximado (1,65 €/L)", "El más barato del día (1,52 €/L)", "Varios € menos por lleno"],
        ]}
      />
      <p>
        La tabla es orientativa y las cifras son típicas, no oficiales: el
        objetivo es que veas que afinar cada dato puede cambiar mucho el
        resultado final. Por eso conviene comprobar el precio concreto en la
        app en lugar de fiarte de una media.
      </p>

      <h2 id="paso-4-afina-reparte">Paso 4: afina y reparte gastos</h2>
      <p>
        Con la fórmula básica ya tienes el coste del combustible, pero el gasto
        real de un viaje incluye algo más. Para que la cifra final sea de
        verdad útil, conviene afinar con estos extras y, si vas acompañado,
        repartir.
      </p>
      <ul>
        <li>
          <strong>Peajes</strong>: súmalos aparte al coste del combustible. En
          rutas largas pueden pesar tanto o más que la gasolina, y son fáciles
          de olvidar.
        </li>
        <li>
          <strong>Margen de seguridad</strong>: añade un 10-15 % al cálculo del
          combustible para cubrir atascos, desvíos, mayor consumo en cuesta o
          un ritmo más alto del previsto. Mejor que sobre a quedarte corto.
        </li>
        <li>
          <strong>Reparto entre ocupantes</strong>: suma combustible y peajes y
          divide entre quienes comparten el gasto. Lo justo y lo más sencillo es
          dividir a partes iguales, incluido el conductor; algunos grupos dejan
          al conductor fuera como compensación por poner el coche y el desgaste.
          No hay regla única: lo importante es acordarlo antes de salir.
        </li>
      </ul>
      <p>
        Retomando el ejemplo: si el combustible de la ida y vuelta son ~93 €,
        le sumas 20 € de peajes y un margen, redondeas a unos 120 € y lo
        divides entre cuatro ocupantes, salen unos 30 € por persona. Compartir
        coche es, de hecho, una de las formas más efectivas de abaratar un
        viaje, porque el mismo combustible mueve a más gente. Y si buscas
        recortar todavía más el gasto, en{" "}
        <Link href="/guias/ahorrar-combustible-viaje-largo">ahorrar en viajes
        largos</Link> reunimos los trucos que más reducen el consumo en ruta.
      </p>
      <p>
        Hecho esto, tendrás un presupuesto realista del viaje en lugar de una
        cifra optimista que luego se queda corta en el surtidor. Dedicar cinco
        minutos a la cuenta antes de salir te evita sorpresas y te permite
        decidir, por ejemplo, si compensa el desvío hacia una gasolinera más
        barata o si conviene repostar antes de coger la autopista.
      </p>

      <AppCta
        title="Calcula el coste real de tu próxima ruta"
        body="Introduce origen y destino y Carburantes te muestra la distancia del trayecto y las gasolineras del recorrido con su precio oficial, actualizado cada media hora desde los datos del Ministerio. Solo te falta tu consumo para tener el coste afinado."
        href="/ruta"
        linkLabel="Planificar mi ruta"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/planificar-repostajes-ruta", label: "Planificar repostajes en ruta" },
          { href: "/guias/ahorrar-combustible-viaje-largo", label: "Ahorrar en viajes largos" },
          { href: "/guias/cuanto-cuesta-llenar-el-deposito", label: "Cuánto cuesta llenar el depósito" },
        ]}
      />
    </>
  );
}

export default guide;
