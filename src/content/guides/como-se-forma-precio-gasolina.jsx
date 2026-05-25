import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "como-se-forma-precio-gasolina";
const title = "Cómo se forma el precio de la gasolina en España: desglose 2026";
const description =
  "Más de la mitad del precio del carburante son impuestos. Te desglosamos el precio de un litro: crudo, refino, logística, márgenes, IVA e impuestos especiales.";

const guide = {
  slug,
  title,
  seoTitle: "Precio gasolina España: desglose por componentes · Guía",
  description,
  category: "mercado",
  datePublished: "2026-05-25",
  dateModified: "2026-05-25",
  readingMinutes: 7,
  keywords: [
    "cómo se forma precio gasolina España",
    "impuestos carburante España",
    "desglose precio gasolina",
    "impuesto especial hidrocarburos",
    "por qué sube la gasolina",
  ],
  mentions: [
    { "@type": "Thing", name: "Impuesto especial hidrocarburos" },
    { "@type": "Thing", name: "IVA" },
    { "@type": "Organization", name: "Brent" },
  ],
  faq: [
    {
      q: "¿Cuántos impuestos se pagan al repostar gasolina en España?",
      a: "Aproximadamente el 50-55 % del precio total. En 2026, sobre un precio público de 1,55 €/L de gasolina 95, unos 0,82-0,85 € son impuestos: 0,47 € de Impuesto Especial sobre Hidrocarburos (IEH) y 0,27 € de IVA al 21 %, además de los impuestos autonómicos y el céntimo verde residual.",
    },
    {
      q: "¿Cuánto cuesta el petróleo crudo en el precio final?",
      a: "Solo entre 0,30 € y 0,45 €/L de coste de crudo y refino en 2026, lo que representa un 20-30 % del precio final. El resto se distribuye entre logística, márgenes y, sobre todo, impuestos.",
    },
    {
      q: "¿Por qué la gasolina sube tan rápido cuando sube el petróleo y baja tan despacio cuando baja?",
      a: "Es el llamado 'efecto cohete y pluma': las distribuidoras trasladan al instante las subidas para proteger su margen, pero bajan más lentamente. La CNMC vigila este fenómeno pero ha resultado históricamente difícil de regular sin sanciones específicas.",
    },
    {
      q: "¿Por qué el diésel pagaba menos impuestos que la gasolina y ahora no?",
      a: "Históricamente España tenía una fiscalidad más baja para el diésel para favorecer al transporte y al sector primario. Desde 2024 la diferencia se ha reducido en cumplimiento de directivas europeas, y los impuestos especiales del diésel y la gasolina se han ido equiparando.",
    },
    {
      q: "¿Qué es el céntimo verde y sigue existiendo?",
      a: "El céntimo verde era un impuesto autonómico del Impuesto Especial sobre Hidrocarburos. La Unión Europea lo declaró ilegal en 2014 y España lo derogó como tal, pero buena parte de su cuantía se integró en el tramo estatal del IEH, así que en la práctica el conductor sigue pagando esa cantidad.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        El precio que pagas por un litro de gasolina en España se compone
        aproximadamente así (2026, ejemplo sobre 1,55 €/L de gasolina 95):
        <strong> 35 céntimos de crudo y refino</strong>,{" "}
        <strong>13 céntimos de logística y margen</strong>,{" "}
        <strong>47 céntimos de Impuesto Especial sobre Hidrocarburos
        (IEH)</strong> y <strong>27 céntimos de IVA</strong> al 21 %. Los
        impuestos suman más del 50 % del precio final.
      </Answer>

      <Tldr
        items={[
          "Impuestos: 50-55 % del precio final.",
          "Crudo + refino: 20-30 % del precio.",
          "Logística + margen distribuidor + minorista: ~10-15 %.",
          "IEH (impuesto especial) + IVA = más de 70 cént/L en gasolina.",
        ]}
      />

      <h2 id="desglose">El desglose pieza a pieza</h2>

      <CompareTable
        caption="Desglose orientativo de 1 litro de gasolina 95 en España (2026)"
        headers={["Componente", "Importe", "% del total"]}
        rows={[
          ["Crudo de petróleo", "~0,28 €", "18 %"],
          ["Coste de refino", "~0,07 €", "5 %"],
          ["Logística + transporte", "~0,05 €", "3 %"],
          ["Margen distribuidor mayorista", "~0,04 €", "2,5 %"],
          ["Margen minorista (gasolinera)", "~0,04 €", "2,5 %"],
          ["Impuesto Especial Hidrocarburos", "~0,47 €", "30 %"],
          ["Impuesto autonómico residual", "~0,02 €", "1,3 %"],
          ["IVA 21 %", "~0,27 €", "17,5 %"],
          ["TOTAL aproximado", "~1,55 €", "100 %"],
        ]}
      />

      <p>
        Los porcentajes varían día a día con la cotización del crudo y los
        ajustes de márgenes, pero la estructura general se mantiene:{" "}
        <strong>los impuestos pesan más que el propio combustible</strong>.
      </p>

      <h2 id="crudo">El crudo: el factor más volátil</h2>
      <p>
        El petróleo crudo es la materia prima de la gasolina y el diésel.
        Su precio se fija en mercados internacionales (Brent en Europa,
        WTI en EE.UU.) y oscila por:
      </p>
      <ul>
        <li>
          <strong>Política de la OPEP+</strong>: decisiones de los países
          productores sobre cuotas de extracción.
        </li>
        <li>
          <strong>Conflictos geopolíticos</strong>: guerras, sanciones,
          embargos sobre productores grandes (Rusia, Irán, Venezuela).
        </li>
        <li>
          <strong>Demanda global</strong>: crecimiento económico, transición
          energética, estacionalidad.
        </li>
        <li>
          <strong>Stocks estratégicos</strong>: liberaciones o llenados de
          las reservas estratégicas de EE.UU. y China.
        </li>
        <li>
          <strong>Tipo de cambio €/$</strong>: el crudo se cotiza en
          dólares, así que un euro fuerte abarata la gasolina y un euro
          débil la encarece.
        </li>
      </ul>

      <h2 id="refino-logistica">Refino, logística y márgenes</h2>
      <p>
        Refinar el crudo en gasolina y diésel cuesta unos 5-10 céntimos
        por litro. España tiene 9 refinerías (Repsol y Cepsa son los
        operadores principales) que cubren la mayor parte del consumo
        nacional. Lo que no se refina aquí se importa ya refinado de
        países como Holanda, Italia o EE.UU.
      </p>
      <p>
        El producto refinado se mueve por oleoducto, ferrocarril o
        camión cisterna hasta las estaciones de servicio. La logística
        añade ~5 céntimos por litro. Los márgenes del distribuidor
        mayorista y de la propia gasolinera (minorista) suelen estar
        entre 3 y 5 céntimos por litro cada uno, según la zona, la marca
        y el tipo de estación.
      </p>

      <Callout type="info" title="Por qué las low cost son más baratas">
        Las{" "}
        <Link href="/guias/gasolineras-low-cost">
          gasolineras low cost
        </Link>{" "}
        compran el mismo combustible en las mismas refinerías, pero
        funcionan con un margen minorista muy reducido (2-3 cént/L vs
        4-7 cént/L de las premium) y sin pagar royalties de marca. Esa
        compresión de márgenes explica la mayor parte de la diferencia
        de precio que ves en surtidor.
      </Callout>

      <h2 id="impuestos">Los impuestos: el componente mayor</h2>
      <p>
        España aplica dos impuestos principales al carburante:
      </p>

      <h3>1. Impuesto Especial sobre Hidrocarburos (IEH)</h3>
      <p>
        Es un impuesto específico que paga el distribuidor al sacar el
        producto de las refinerías o depósitos fiscales y que se traslada
        al precio final. Se compone de:
      </p>
      <ul>
        <li>
          <strong>Tramo estatal general</strong>: ~0,40 €/L para gasolina,
          ~0,30 €/L para diésel A.
        </li>
        <li>
          <strong>Tramo estatal especial</strong>: ~7 céntimos/L que en
          2014 absorbió el antiguo «céntimo sanitario» autonómico.
        </li>
        <li>
          <strong>Tramo autonómico residual</strong>: pequeño suplemento
          variable según comunidad autónoma (algunas lo aplican, otras no).
        </li>
      </ul>

      <h3>2. IVA</h3>
      <p>
        Sobre el precio sin IVA (que ya incluye el IEH) se aplica el IVA
        del 21 %. Es decir, pagas IVA sobre el impuesto especial — es lo
        que se denomina coloquialmente «doble imposición», legal en
        términos comunitarios pero criticada por automovilistas y
        transportistas.
      </p>

      <CompareTable
        caption="Carga fiscal sobre 1 L de gasolina y diésel (2026, orientativa)"
        headers={["Concepto", "Gasolina 95", "Diésel A"]}
        rows={[
          ["Precio antes de impuestos", "~0,48 €", "~0,45 €"],
          ["Impuesto Especial Hidrocarburos", "0,47 €", "0,37 €"],
          ["Impuesto autonómico residual", "0,02 €", "0,02 €"],
          ["IVA 21 %", "0,27 €", "0,24 €"],
          ["Total al consumidor", "1,55 €", "1,45 €"],
          ["% impuestos sobre el total", "55 %", "50 %"],
        ]}
      />

      <h2 id="cohete-pluma">El «efecto cohete y pluma»</h2>
      <p>
        Un fenómeno observado por consumidores, periodistas y la propia
        CNMC: cuando el precio del crudo sube, los céntimos llegan al
        surtidor en 24-48 horas; cuando baja, el descenso tarda una
        semana o más en reflejarse. Los expertos lo atribuyen a varias
        causas:
      </p>
      <ul>
        <li>
          Las distribuidoras se cubren ante futuras subidas trasladando
          las subidas inmediatamente.
        </li>
        <li>
          Las bajadas se aplican gradualmente para «recuperar margen»
          después de momentos de subida.
        </li>
        <li>
          El mercado minorista (gasolineras tradicionales con marca) es
          relativamente poco competitivo en muchas zonas rurales, lo que
          permite mantener precios al alza más tiempo.
        </li>
      </ul>
      <p>
        La aparición de las cadenas low cost ha presionado a la baja
        este efecto en zonas urbanas y corredores principales, pero
        sigue siendo visible en provincias con menos competencia.
      </p>

      <h2 id="por-que-tan-diferente">Por qué España es más cara o más barata que vecinos</h2>
      <p>
        Comparando precios entre países europeos, España está
        habitualmente <em>por debajo de la media</em>:
      </p>
      <ul>
        <li>
          <strong>Más barata</strong> que Francia, Italia, Alemania,
          Países Bajos.
        </li>
        <li>
          <strong>Similar</strong> a Portugal, aunque históricamente más
          cara que ellos.
        </li>
        <li>
          <strong>Más cara</strong> que Andorra (fiscalidad mínima) y
          algunos países del este.
        </li>
      </ul>
      <p>
        Estas diferencias se explican casi por completo por la fiscalidad:
        Holanda y Alemania tienen impuestos especiales más altos que
        España, mientras que Andorra tiene una imposición muy reducida.
        Más detalles en{" "}
        <Link href="/guias/repostar-portugal-francia-andorra">
          nuestra guía sobre repostar en países vecinos
        </Link>
        .
      </p>

      <AppCta
        title="Compara precios reales en tu zona"
        body="Toda esta teoría se traduce en diferencias de varios euros por depósito entre estaciones cercanas. Carburantes muestra el precio actual de cada una."
        href="/cerca"
        linkLabel="Buscar gasolineras cerca"
      />

      <InternalLinks
        title="Sigue aprendiendo"
        links={[
          { href: "/guias/repostar-portugal-francia-andorra", label: "Repostar en Portugal, Francia y Andorra" },
          { href: "/guias/gasolineras-low-cost", label: "Gasolineras low cost: ¿calidad igual?" },
          { href: "/guias/mejor-hora-dia-repostar", label: "Mejor día y hora para repostar" },
          { href: "/guias/bonificacion-gasoleo-profesional", label: "Bonificación gasóleo profesional" },
        ]}
      />
    </>
  );
}

export default guide;
