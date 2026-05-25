import Link from "next/link";
import { Answer, Tldr, Callout, AppCta, InternalLinks } from "./_components";

const slug = "que-es-el-adblue";
const title = "AdBlue: qué es, cuánto cuesta y cada cuánto rellenarlo";
const description =
  "El AdBlue es obligatorio en coches diésel modernos. Te contamos qué es, dónde se rellena, cuánto cuesta y qué ocurre si tu coche se queda sin él.";

const guide = {
  slug,
  title,
  seoTitle: "AdBlue: qué es y cómo rellenarlo · Guía Carburantes",
  description,
  category: "tipos-combustible",
  datePublished: "2026-05-25",
  dateModified: "2026-05-25",
  readingMinutes: 6,
  keywords: [
    "AdBlue qué es",
    "AdBlue rellenar",
    "AdBlue precio gasolinera",
    "coche sin AdBlue arranca",
    "consumo AdBlue diésel",
  ],
  mentions: [
    { "@type": "Thing", name: "AdBlue" },
    { "@type": "Thing", name: "Urea" },
    { "@type": "Thing", name: "Catalizador SCR" },
  ],
  faq: [
    {
      q: "¿Mi coche lleva AdBlue?",
      a: "Casi todos los coches diésel matriculados desde 2014 (normativa Euro 6) lo llevan. Tiene una segunda tapa junto a la del diésel (azul) o bajo el portón trasero. Si no estás seguro, mira el cuadro de mandos: cuando el nivel baja aparece un aviso específico que dice 'AdBlue' o 'rellenar AdBlue'.",
    },
    {
      q: "¿Cuánto cuesta el AdBlue en la gasolinera?",
      a: "Entre 0,80 € y 1,50 € por litro si lo rellenas directamente en el surtidor de la gasolinera. En garrafas de 10 L en supermercados o talleres ronda los 8-15 € (0,80-1,50 €/L), y a granel en talleres especializados puede bajar de 0,70 €/L.",
    },
    {
      q: "¿Qué pasa si me quedo sin AdBlue?",
      a: "El coche te avisa con suficiente antelación: primer aviso a unos 2.400 km del agotamiento, segundo a unos 800 km, y al llegar a cero el motor NO arrancará la próxima vez que lo apagues. Es un bloqueo legal exigido por la normativa Euro 6 para impedir que el coche circule contaminando sin tratamiento.",
    },
    {
      q: "¿Cada cuánto se rellena el AdBlue?",
      a: "Depende del consumo, pero un coche diésel consume aproximadamente 1 litro de AdBlue cada 1.000-1.500 km. Con un depósito habitual de 15-20 L, eso son entre 15.000 y 30.000 km entre rellenos.",
    },
    {
      q: "¿Puedo echar agua o algo similar si me quedo sin AdBlue en medio de la nada?",
      a: "No. El AdBlue es una solución concreta de urea al 32,5 % en agua desmineralizada (ISO 22241). Echar agua del grifo dañaría el catalizador SCR — su sustitución cuesta entre 2.000 y 6.000 € según el coche. Si te quedas tirado, pide grúa.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        El AdBlue es una solución de urea al 32,5 % en agua desmineralizada
        que los coches diésel modernos inyectan en el escape para reducir las
        emisiones de óxidos de nitrógeno (NOx). Se rellena en una segunda
        tapa junto a la del diésel, cuesta entre 0,80 y 1,50 €/L y un coche
        consume aproximadamente <strong>1 litro cada 1.000-1.500 km</strong>.
        Si te quedas sin AdBlue, el coche no volverá a arrancar hasta que
        rellenes.
      </Answer>

      <Tldr
        items={[
          "Obligatorio en diéseles Euro 6 (mayoría desde 2014).",
          "Reduce los óxidos de nitrógeno en el catalizador SCR.",
          "Consumo: ~1 L cada 1.000-1.500 km.",
          "Precio: 0,80-1,50 €/L. Garrafas o surtidor en la gasolinera.",
          "Sin AdBlue, el coche no arranca tras el siguiente apagado.",
        ]}
      />

      <h2 id="que-es">Qué es exactamente el AdBlue</h2>
      <p>
        AdBlue es una <strong>marca registrada</strong> de la asociación
        alemana de la industria del automóvil (VDA) que designa una
        solución acuosa muy concreta: <strong>32,5 % de urea técnica
        + 67,5 % de agua desmineralizada</strong>, fabricada según la norma
        ISO 22241. El nombre genérico técnico es DEF (<em>Diesel Exhaust
        Fluid</em>) o AUS 32 (<em>Aqueous Urea Solution 32,5 %</em>).
      </p>
      <p>
        Es un líquido incoloro, casi inodoro, no tóxico, no inflamable y
        no contaminante. Si te cae en la ropa o las manos, se limpia con
        agua. La urea es la misma molécula que el cuerpo humano expulsa por
        la orina — pero el AdBlue es de origen industrial sintético, no
        animal.
      </p>

      <h2 id="para-que-sirve">Para qué sirve y cómo funciona</h2>
      <p>
        El AdBlue alimenta el sistema <strong>SCR</strong> (Selective
        Catalytic Reduction) que llevan los motores diésel desde la
        normativa Euro 6 (2014). El proceso es el siguiente:
      </p>
      <ol>
        <li>
          Los gases de escape salen del motor cargados de óxidos de
          nitrógeno (NOx), un contaminante muy nocivo para los pulmones
          asociado al diésel.
        </li>
        <li>
          Antes del catalizador SCR, una boquilla inyecta una fina niebla
          de AdBlue en el flujo de escape.
        </li>
        <li>
          El calor del escape descompone la urea en amoniaco (NH₃).
        </li>
        <li>
          En el catalizador SCR, el amoniaco reacciona con los NOx y los
          convierte en <strong>nitrógeno (N₂) y agua (H₂O)</strong>, los dos
          gases mayoritarios del aire que respiramos.
        </li>
      </ol>
      <p>
        Sin AdBlue, esta reacción no se produce y el coche emite hasta 10
        veces más NOx — por eso la normativa Euro 6 prohíbe expresamente
        que un coche circule sin AdBlue en el depósito.
      </p>

      <h2 id="donde-rellenar">Dónde y cómo rellenar el AdBlue</h2>
      <p>
        Hay cuatro opciones, por orden de comodidad y precio:
      </p>
      <ul>
        <li>
          <strong>Surtidor de AdBlue en la gasolinera</strong>: muchas
          estaciones grandes (Repsol, Cepsa, BP, Galp en autopista) tienen
          una manguera dedicada al AdBlue en el mismo surtidor del diésel.
          Es lo más rápido y limpio: 0,80-1,20 €/L.
        </li>
        <li>
          <strong>Garrafa comprada en la propia gasolinera</strong>: la
          mayoría venden bidones de 5 o 10 litros junto a la caja, con
          boquilla integrada para verter sin derramar. Suelen costar
          1,20-1,80 €/L (más caro que el surtidor).
        </li>
        <li>
          <strong>Supermercado, gran superficie o tienda de coches</strong>:
          Carrefour, Alcampo, Norauto, Feu Vert... venden garrafas en torno
          a 1,00-1,50 €/L.
        </li>
        <li>
          <strong>Taller a granel</strong>: si haces muchos kilómetros, los
          talleres pueden rellenarte a granel directamente desde su depósito
          a 0,60-0,80 €/L. Conviene para flotas o usuarios intensivos.
        </li>
      </ul>

      <Callout type="note" title="Cómo rellenarlo paso a paso">
        Abre la tapa secundaria (suele ser azul, junto a la del diésel o bajo
        el portón). Limpia la zona alrededor de la boquilla. Vierte
        despacio: la mayoría de coches tienen un sensor que cierra
        automáticamente al llenar. Cierra bien y arranca: el coche tarda
        unos segundos en leer el nivel actualizado.
      </Callout>

      <h2 id="cuanto-consume">Cuánto consume y cuándo avisa</h2>
      <p>
        El consumo de AdBlue depende del coche, el tipo de conducción y la
        carga, pero como referencia un coche diésel moderno gasta entre{" "}
        <strong>1 litro cada 1.000 km</strong> (conducción agresiva o con
        remolque) y <strong>1 litro cada 1.500 km</strong> (conducción
        suave por autopista). La media de un usuario típico ronda los
        1.200 km/L.
      </p>
      <p>
        El depósito típico de AdBlue va de 12 a 22 litros. Con eso, entre
        rellenos pasan <strong>15.000 a 30.000 km</strong> — alineado con
        los intervalos de mantenimiento, así que muchos talleres aprovechan
        para rellenarlo en la revisión.
      </p>
      <p>
        El cuadro de mandos avisa en tres etapas progresivas:
      </p>
      <ul>
        <li>
          <strong>Primer aviso (~2.400 km restantes)</strong>: testigo
          amarillo con mensaje «Rellene AdBlue». Sin urgencia inmediata.
        </li>
        <li>
          <strong>Segundo aviso (~800 km restantes)</strong>: testigo
          ámbar parpadeante. Empieza a buscar dónde rellenar.
        </li>
        <li>
          <strong>Tercer aviso (0 km, depósito vacío)</strong>: el coche
          sigue funcionando hasta apagarlo, pero NO volverá a arrancar
          hasta que rellenes mínimo unos 4-5 litros.
        </li>
      </ul>

      <Callout type="warn" title="Si te quedas sin AdBlue">
        El bloqueo es legal y todos los coches Euro 6 lo aplican. Si tienes
        el coche bloqueado en medio de un viaje, la única solución es que
        un taller o asistencia te lleve una garrafa para rellenar. NUNCA
        sustituyas AdBlue por agua del grifo, orina, ni nada similar — el
        catalizador SCR se daña permanentemente y su reparación supera los
        2.000 €.
      </Callout>

      <h2 id="errores-comunes">Errores comunes a evitar</h2>
      <ul>
        <li>
          <strong>Confundir la tapa del AdBlue con la del diésel</strong>:
          si echas diésel en el depósito de AdBlue, NO arranques. Llama a
          un taller para drenar.
        </li>
        <li>
          <strong>Echar AdBlue en el depósito de diésel</strong>: lo mismo
          al revés. Una urea diluida en diésel funde inyectores y bomba de
          alta. Drenado obligatorio antes de arrancar.
        </li>
        <li>
          <strong>Comprar AdBlue de marca dudosa</strong>: siempre con
          certificación ISO 22241. Un AdBlue de baja calidad puede tapar
          los conductos del sistema SCR.
        </li>
        <li>
          <strong>Guardar la garrafa al sol o sobre 30 °C</strong>: el
          AdBlue se descompone con el calor. Si vas a comprar para uso
          futuro, guárdalo en lugar fresco.
        </li>
      </ul>

      <AppCta
        title="Busca gasolineras con AdBlue"
        body="Carburantes muestra el precio del AdBlue en cada estación donde el Ministerio lo registra. Filtra por combustible para ver solo las que tienen surtidor de AdBlue."
        href="/"
        linkLabel="Ver gasolineras con AdBlue"
      />

      <InternalLinks
        title="Más sobre combustible y mantenimiento"
        links={[
          { href: "/guias/diesel-a-vs-premium", label: "Diésel A, premium, B y C" },
          { href: "/guias/etiqueta-dgt-combustible", label: "Etiqueta DGT y combustible" },
          { href: "/guias/bonificacion-gasoleo-profesional", label: "Bonificación gasóleo profesional" },
          { href: "/guias/conducir-ahorrar-combustible", label: "Conducir para ahorrar combustible" },
        ]}
      />
    </>
  );
}

export default guide;
