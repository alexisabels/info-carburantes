import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "agua-en-el-deposito-sintomas";
const title = "Agua en el depósito: síntomas, causas y solución";
const description =
  "El agua en el depósito hace que el coche tire mal, se cale o no arranque. Te explicamos por qué entra, cómo detectarlo y qué hacer para solucionarlo.";

const guide = {
  slug,
  title,
  seoTitle: "Agua en el depósito: síntomas y solución · Guía",
  description,
  category: "practico",
  datePublished: "2026-05-30",
  dateModified: "2026-05-30",
  readingMinutes: 5,
  keywords: [
    "agua en el depósito",
    "síntomas agua gasolina",
    "agua en el diésel",
    "cómo quitar agua depósito",
  ],
  mentions: [
    { "@type": "Thing", name: "Condensación" },
    { "@type": "Thing", name: "Depósito" },
  ],
  faq: [
    {
      q: "¿Cómo sé si hay agua en el depósito?",
      a: "Los síntomas más claros son que el coche tira mal o pega tirones a velocidad sostenida, que se cala al ralentí, que cuesta arrancar en frío o que aparece humo blanco anómalo. En casos leves notarás solo una pérdida de potencia intermitente. La confirmación fiable la da el taller: pueden vaciar una muestra del depósito y comprobar si hay una fase de agua separada en el fondo, o leer los códigos de avería del sistema de inyección. Si los síntomas aparecieron justo después de repostar en una gasolinera concreta, sospecha de combustible contaminado más que de tu coche.",
    },
    {
      q: "¿De dónde sale el agua?",
      a: "De tres sitios principales. El primero es la condensación: el aire del interior del depósito contiene humedad que, con los cambios de temperatura entre el día y la noche, se condensa en las paredes y cae al fondo. Es más probable con el depósito medio vacío y en climas húmedos o fríos. El segundo es el propio combustible, que admite trazas de agua y, en el caso del diésel, puede acumularla con el tiempo. El tercero, más raro, son entradas externas: un tapón en mal estado, una junta deteriorada o lavar a presión apuntando a la boca de llenado. También puede llegar agua ya desde una gasolinera con tanques en mal estado.",
    },
    {
      q: "¿Qué hago si tengo agua en el diésel?",
      a: "No fuerces el coche y llévalo al taller cuanto antes, porque el agua en diésel daña la bomba de alta presión y los inyectores, que son las piezas más caras del sistema. Muchos diésel llevan un filtro de combustible con vaso decantador y, en algunos modelos, un testigo de presencia de agua: si se enciende, hay que purgar el filtro. En el taller drenan el agua, cambian el filtro y, si la cantidad era importante, vacían y limpian el depósito. Cuanto antes actúes, más barata sale la reparación.",
    },
    {
      q: "¿Se puede prevenir?",
      a: "En buena medida sí. La medida más eficaz es reducir el aire húmedo dentro del depósito manteniéndolo más lleno, sobre todo si el coche va a estar parado mucho tiempo o en invierno. Reposta en gasolineras con buena rotación de producto, revisa que el tapón cierre bien y purga el filtro de combustible en los mantenimientos si tu diésel lo permite. Los aditivos antihumedad ayudan en casos puntuales, pero no sustituyen al hábito de tener buen combustible y un depósito sin demasiado aire dentro.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        El agua en el depósito llega sobre todo por <strong>condensación</strong>:
        el aire húmedo del interior se condensa con los cambios de temperatura y
        cae al fondo, donde el agua, más densa que el combustible, se acumula y
        acaba entrando en el motor. Provoca tirones, calado al ralentí, arranques
        difíciles y pérdida de potencia. La solución pasa por drenar el agua, cambiar
        el filtro de combustible y, en casos serios, vaciar el depósito en el taller.
      </Answer>

      <Tldr
        items={[
          "El agua entra por condensación, por el propio combustible o por entradas externas (tapón, junta, gasolinera).",
          "Síntomas: el coche tira mal, se cala, cuesta arrancar en frío y pierde potencia de forma intermitente.",
          "En diésel es más grave: daña bomba de alta presión e inyectores, las piezas más caras.",
          "Solución: drenar el agua, cambiar el filtro y, si hay mucha, vaciar y limpiar el depósito.",
          "Prevención: depósito más lleno en invierno, gasolineras con buena rotación y tapón en buen estado.",
        ]}
      />

      <h2 id="como-llega-el-agua">Cómo llega el agua al depósito</h2>
      <p>
        El depósito de tu coche nunca está sellado al vacío: necesita un respiradero
        para compensar la presión a medida que consumes combustible. Por ese punto entra
        aire, y el aire siempre lleva algo de humedad. Cuando el coche se enfría por la
        noche, esa humedad se condensa en las paredes interiores del depósito y resbala
        hacia el fondo en forma de gotas de agua. Como el agua es más densa que la gasolina
        o el diésel, no se mezcla: se deposita debajo, justo donde la bomba aspira el combustible.
      </p>
      <p>
        Hay tres orígenes habituales del agua:
      </p>
      <ul>
        <li>
          <strong>Condensación.</strong> Es la causa más frecuente. Se acelera con el
          depósito medio vacío (más aire dentro), en climas húmedos y con grandes saltos
          de temperatura entre día y noche. Un coche que pasa semanas aparcado con poco
          combustible es el caso de manual.
        </li>
        <li>
          <strong>El propio combustible.</strong> Tanto la gasolina como el diésel admiten
          trazas de agua disuelta. El diésel, además, tiende a retener y acumular más agua
          con el tiempo, sobre todo si el biodiésel mezclado es alto.
        </li>
        <li>
          <strong>Entradas externas.</strong> Un tapón que no cierra bien, una junta
          deteriorada, lavar a presión apuntando a la boca de llenado o, más raro, repostar
          en una estación con los tanques en mal estado o recién rellenados sin dejar decantar.
        </li>
      </ul>
      <p>
        Conviene tenerlo en cuenta junto a otro factor: el combustible no es eterno. Si tu
        coche pasa mucho tiempo parado, te interesa saber{" "}
        <Link href="/guias/caduca-la-gasolina-cuanto-dura">cuánto dura la gasolina antes de degradarse</Link>,
        porque un combustible viejo y un depósito con humedad son una mala combinación.
      </p>

      <h2 id="sintomas-tipicos">Síntomas típicos</h2>
      <p>
        El agua interrumpe la combustión porque no arde. Cuando la bomba aspira una mezcla
        de combustible y agua, el motor recibe «huecos» sin energía y se comporta de forma
        irregular. Estos son los avisos más característicos:
      </p>
      <ul>
        <li>
          <strong>Tirones y fallos de tracción</strong> a velocidad sostenida, sobre todo
          al pisar el acelerador. El coche da estirones como si le faltara gas.
        </li>
        <li>
          <strong>Se cala al ralentí</strong> o en parado, especialmente al frenar en un
          semáforo o al maniobrar despacio.
        </li>
        <li>
          <strong>Arranque difícil en frío</strong>: el motor tarda en prender o necesita
          varios intentos por la mañana.
        </li>
        <li>
          <strong>Pérdida de potencia intermitente</strong>: ratos normales y ratos en los
          que el coche «no responde», sin patrón claro.
        </li>
        <li>
          <strong>Testigo de avería del motor</strong> encendido y, en algunos diésel, un
          testigo específico de presencia de agua en el filtro de combustible.
        </li>
        <li>
          <strong>Humo blanco anómalo</strong> por el escape en casos con bastante agua.
        </li>
      </ul>
      <Callout type="warn" title="No lo confundas con repostar el combustible equivocado">
        Estos síntomas se parecen a los de meter gasolina en un diésel o al revés. Si los
        fallos empezaron justo al salir de la gasolinera, repasa antes{" "}
        <Link href="/guias/me-he-equivocado-combustible">qué hacer si te has equivocado de combustible</Link>.
        Si vienen apareciendo poco a poco o tras semanas de coche parado, apunta más a humedad
        acumulada que a un error de repostaje.
      </Callout>

      <h2 id="por-que-peor-diesel">Por qué es peor en diésel</h2>
      <p>
        En un motor de gasolina, el agua suele provocar fallos molestos pero reversibles: tirones,
        calado y mala combustión que se corrigen al limpiar el sistema. En un diésel moderno el
        problema es mucho más caro, porque el gasóleo también actúa como <strong>lubricante</strong>
        del sistema de inyección. El agua rompe esa lubricación.
      </p>
      <p>
        El gasóleo pasa por una bomba de alta presión que lo comprime a cientos de bar y por
        inyectores de tolerancias finísimas. El agua, al no lubricar, provoca rozamiento y
        corrosión en esas piezas, además de favorecer el crecimiento de microorganismos (el
        llamado «lodo» o contaminación microbiana del gasóleo). Una bomba o un juego de inyectores
        dañados pueden suponer una factura de varios cientos o incluso miles de euros. Por eso, ante
        la sospecha en un diésel, lo prudente es no forzar y pasar por el taller cuanto antes.
      </p>
      <p>
        La buena noticia es que la mayoría de diésel están preparados para defenderse: llevan un
        <strong> filtro de combustible con vaso decantador</strong> que separa el agua por densidad,
        y muchos incorporan un sensor que enciende un testigo cuando hay que purgarlo. Mantener ese
        filtro al día es la primera línea de defensa.
      </p>

      <CompareTable
        caption="Agua en el depósito: gasolina vs diésel (datos típicos en España, 2026)"
        headers={["Aspecto", "Gasolina", "Diésel"]}
        rows={[
          ["Síntoma principal", "Tirones y calado", "Tirones, calado y arranque difícil"],
          ["Riesgo para el motor", "Moderado, casi siempre reversible", "Alto: bomba e inyectores"],
          ["Defensa de fábrica", "Filtro de combustible", "Filtro con vaso decantador y, a veces, sensor de agua"],
          ["Coste típico de reparación", "Bajo si se actúa pronto", "Alto si afecta a la inyección"],
          ["Urgencia", "Atender pronto", "Llevar al taller cuanto antes"],
        ]}
      />

      <h2 id="que-hacer">Qué hacer si lo sospechas</h2>
      <p>
        Lo primero es <strong>no insistir circulando</strong> si el coche se cala o pierde potencia
        de forma evidente, porque cada kilómetro hace pasar más agua por el sistema. Estos son los
        pasos sensatos por orden:
      </p>
      <ul>
        <li>
          <strong>Anota el contexto.</strong> ¿Empezó tras un repostaje concreto? ¿Tras semanas
          parado? ¿En frío? Esa información orienta el diagnóstico y, si fue combustible contaminado,
          puede servirte para reclamar.
        </li>
        <li>
          <strong>Purga el filtro si tu diésel lo permite.</strong> Algunos modelos tienen un tornillo
          de drenaje en el vaso del filtro. Si no sabes hacerlo, no improvises: que lo haga el taller.
        </li>
        <li>
          <strong>Lleva el coche al taller.</strong> Allí pueden tomar una muestra del fondo del
          depósito y ver si hay una fase de agua separada, leer los códigos de avería y, si procede,
          vaciar y limpiar el depósito, cambiar filtros y, en diésel, revisar la inyección.
        </li>
        <li>
          <strong>Conserva el tique de repostaje.</strong> Si sospechas que el agua venía del
          combustible, guarda el comprobante y, si puedes, una muestra. Te explicamos los pasos en la
          guía de{" "}
          <Link href="/guias/reclamar-combustible-mala-calidad">cómo reclamar combustible en mal estado</Link>.
        </li>
      </ul>
      <p>
        Sobre los aditivos «secaagua» o antihumedad que se venden en gasolineras y tiendas: pueden
        ayudar a arrastrar cantidades pequeñas de agua emulsionándola para que pase por la combustión
        sin daño, pero no son magia. Con una cantidad importante de agua en el fondo, lo correcto es
        drenar físicamente el depósito, no diluir el problema.
      </p>

      <h2 id="como-prevenirlo">Cómo prevenirlo</h2>
      <p>
        La prevención es barata y eficaz. La idea de fondo es sencilla: menos aire húmedo dentro del
        depósito y mejor combustible.
      </p>
      <ul>
        <li>
          <strong>Mantén el depósito más lleno en invierno o si vas a dejar el coche parado.</strong>
          Cuanto menos aire haya dentro, menos humedad se condensa. Es un argumento a favor de no
          rodar siempre con la reserva puesta; lo comentamos en{" "}
          <Link href="/guias/lleno-o-medio-deposito">depósito lleno o medio</Link>.
        </li>
        <li>
          <strong>Reposta en gasolineras con buena rotación de producto.</strong> Un combustible que
          se mueve rápido tiene menos tiempo para acumular agua en los tanques de la estación.
        </li>
        <li>
          <strong>Revisa el tapón y la junta de la boca de llenado.</strong> Un cierre que no sella
          deja entrar humedad y, a veces, agua de lluvia o del lavado.
        </li>
        <li>
          <strong>Cuidado al lavar a presión</strong> cerca de la boca de llenado y al aparcar a la
          intemperie en zonas muy húmedas.
        </li>
        <li>
          <strong>Purga el filtro de combustible en los mantenimientos</strong> si tu diésel tiene
          vaso decantador, y cámbialo en los plazos del fabricante. Un buen mantenimiento general
          además te ahorra combustible: lo desarrollamos en{" "}
          <Link href="/guias/mantenimiento-coche-consumo">mantenimiento y consumo</Link>.
        </li>
      </ul>
      <p>
        Ninguna de estas medidas cuesta apenas dinero, y todas juntas reducen muchísimo la probabilidad
        de acabar con agua en el motor. El gasto evitado en una reparación de inyección compensa de
        sobra cualquier molestia.
      </p>

      <AppCta
        title="Reposta donde el combustible se mueve más barato y más fresco"
        body="Con Carburantes ves los precios oficiales del Ministerio actualizados y eliges gasolineras con buena rotación cerca de ti. Busca por municipio o pulsa «Cerca de mí»."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/caduca-la-gasolina-cuanto-dura", label: "¿Caduca la gasolina?" },
          { href: "/guias/mantenimiento-coche-consumo", label: "Mantenimiento y consumo" },
          { href: "/guias/reclamar-combustible-mala-calidad", label: "Reclamar combustible en mal estado" },
        ]}
      />
    </>
  );
}

export default guide;
