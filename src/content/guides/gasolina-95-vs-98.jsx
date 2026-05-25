import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "gasolina-95-vs-98";
const title = "Gasolina 95 vs 98: diferencias, cuál usar y si compensa pagar más";
const description =
  "Octanaje, aditivos y compatibilidad. Te explicamos cuándo conviene la gasolina 98 sobre la 95 y cuánto dinero ahorras o pierdes al cambiar.";

const guide = {
  slug,
  title,
  seoTitle: "Gasolina 95 vs 98: cuál usar · Guía Carburantes",
  description,
  category: "tipos-combustible",
  datePublished: "2026-05-25",
  dateModified: "2026-05-25",
  readingMinutes: 6,
  keywords: [
    "gasolina 95 vs 98",
    "diferencia gasolina 95 y 98",
    "octanaje gasolina",
    "gasolina sin plomo 98 cuándo usar",
    "gasolina premium merece la pena",
  ],
  mentions: [
    { "@type": "Thing", name: "Gasolina 95 E5" },
    { "@type": "Thing", name: "Gasolina 98 E5" },
    { "@type": "Thing", name: "Octanaje" },
  ],
  faq: [
    {
      q: "¿Mi coche puede usar gasolina 95 si pide 98?",
      a: "Solo si el fabricante lo permite expresamente en el manual. Muchos motores deportivos modernos (BMW M, AMG, Porsche, Audi RS) requieren 98 o superior por su alta relación de compresión. Usar 95 en ellos provoca picado de motor y, a largo plazo, daños en pistones y válvulas. En coches normales sí se puede usar 95 sin problemas.",
    },
    {
      q: "¿Si meto 98 en un coche que pide 95 va a ir mejor?",
      a: "Casi imperceptiblemente. En un motor diseñado para 95, el 98 no aporta más potencia ni reduce consumo de forma medible. Sí incorpora más aditivos detergentes en muchas marcas, lo que ayuda a mantener limpios los inyectores; pero el sobrecoste no se compensa con ahorro.",
    },
    {
      q: "¿Cuánto más cara es la gasolina 98 que la 95?",
      a: "Entre 8 y 15 céntimos por litro de media en España. En un depósito de 55 litros, eso son 4-8 € más cada lleno. Si repostas 3 veces al mes, hablamos de 150-300 € extra al año.",
    },
    {
      q: "¿Qué es la E5 y la E10 que aparece junto al 95 y 98?",
      a: "El número (5 o 10) indica el porcentaje máximo de bioetanol mezclado en la gasolina. La E5 (5 %) es la habitual en España y compatible con todos los coches. La E10 (10 %) se está implantando en Europa y es compatible con la mayoría de coches fabricados desde 2011. Consulta el manual si tienes dudas.",
    },
    {
      q: "¿Puedo mezclar gasolina 95 y 98 en el mismo depósito?",
      a: "Sí, sin ningún problema. El resultado es una mezcla con octanaje intermedio. Si llenas medio depósito de cada una, obtienes un combustible equivalente a una gasolina ~96-97. Es perfectamente seguro.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        La diferencia entre gasolina 95 y 98 es el <strong>octanaje</strong>:
        el 98 resiste mejor la compresión sin auto-encenderse, lo que lo hace
        necesario en motores deportivos de alta compresión. En un coche
        normal diseñado para 95, meter 98 no aporta más potencia ni reduce
        consumo de forma apreciable — solo añade unos aditivos detergentes
        y un sobrecoste de 8 a 15 céntimos por litro.
      </Answer>

      <Tldr
        items={[
          "Gasolina 95: válida para el 95 % de coches en España.",
          "Gasolina 98: obligatoria solo en motores deportivos de alta compresión.",
          "Diferencia de precio: 8-15 céntimos/litro (300 € extra al año si la usas siempre sin necesidad).",
          "Mezclar ambas en el depósito es perfectamente seguro.",
        ]}
      />

      <h2 id="que-es-octanaje">¿Qué es el octanaje y por qué importa?</h2>
      <p>
        El octanaje (también llamado RON, <em>Research Octane Number</em>) mide
        la resistencia de la gasolina a auto-encenderse cuando se comprime.
        Un motor de gasolina funciona aspirando una mezcla aire/gasolina,
        comprimiéndola y prendiéndola con la chispa de la bujía en el momento
        exacto. Si la gasolina tiene poco octanaje y el motor la comprime
        demasiado, se auto-enciende <em>antes</em> de la chispa — eso se
        llama «picado» o «detonación» y suena como golpecillos metálicos en
        ralentí o aceleración.
      </p>
      <p>
        Cuanto más alto el octanaje, más se puede comprimir la gasolina sin
        que se auto-encienda. Los motores deportivos modernos aprovechan esa
        resistencia comprimiendo más, lo que les permite extraer más
        potencia. Por eso esos motores <em>exigen</em> 98 o superior: con 95
        no podrían comprimir tanto sin dañarse.
      </p>

      <CompareTable
        caption="Gasolina 95 vs Gasolina 98 (datos típicos en España, 2026)"
        headers={["Característica", "Gasolina 95 E5", "Gasolina 98 E5"]}
        rows={[
          ["Octanaje (RON)", "95", "98"],
          ["Bioetanol", "hasta 5 %", "hasta 5 %"],
          ["Precio medio", "~1,55 €/L", "~1,68 €/L"],
          ["Diferencia", "—", "+8 a +15 cént/L"],
          ["Compatibilidad", "Casi todos los coches", "Todos los coches"],
          ["Aditivos detergentes", "Estándar", "Más cantidad (marcas premium)"],
        ]}
      />

      <h2 id="que-gasolina-pide-mi-coche">¿Qué gasolina pide mi coche?</h2>
      <p>
        El dato exacto siempre aparece en dos sitios:
      </p>
      <ul>
        <li>
          El manual de usuario del coche, en la sección de combustibles.
        </li>
        <li>
          Una pegatina en la <strong>tapa del depósito</strong> con el
          símbolo «E5» o «E10» y el RON mínimo (por ejemplo «RON 95» o «RON
          98»).
        </li>
      </ul>
      <p>
        Como regla general:
      </p>
      <ul>
        <li>
          <strong>Coches normales (utilitarios, compactos, SUV familiares)</strong>:
          piden 95. Son la mayoría del parque español.
        </li>
        <li>
          <strong>Algunos coches con motor turbo más exigente</strong>: el
          manual indica «mínimo 95, recomendado 98». Puedes usar 95, pero el
          motor reducirá ligeramente la potencia (el sensor de picado se
          adelanta para protegerlo). Con 98 rinde lo que el fabricante diseñó.
        </li>
        <li>
          <strong>Deportivos y altas prestaciones</strong> (BMW M, Mercedes
          AMG, Audi RS, Porsche, supercoches): exigen 98 o 100. Usar 95 puede
          provocar picado y daños progresivos.
        </li>
        <li>
          <strong>Motos deportivas modernas</strong>: muchas piden 95 mínimo,
          algunas top de gama 98.
        </li>
      </ul>

      <Callout type="warn" title="Cuando NO debes bajar a 95">
        Si tu coche pide expresamente 98 y le metes 95, el motor lo detecta
        por su sensor de picado y reduce avance de encendido — gastas algo
        más, pierdes potencia y, a largo plazo, dañas el motor. Si usas 95
        en un motor que pide 98, hazlo solo de forma excepcional (por
        ejemplo, no encontrar 98 en mitad de la noche).
      </Callout>

      <h2 id="98-en-coche-de-95">¿Y al revés? ¿98 en un coche que pide 95?</h2>
      <p>
        Es seguro pero económicamente cuestionable. El motor diseñado para
        95 está preparado con una relación de compresión concreta y un
        avance de encendido fijo: meterle un combustible de mayor octanaje
        no le da más potencia ni reduce consumo de forma medible.
      </p>
      <p>
        Lo único que aporta el 98 a un motor que pide 95 son los aditivos
        detergentes adicionales que algunas marcas (Repsol Efitec 98, Cepsa
        Óptima 98, BP Ultimate, Galp G-Force) incorporan a sus gamas
        premium. Estos aditivos ayudan a mantener limpios los inyectores y
        la cámara de combustión — pero el beneficio práctico en un coche
        moderno bien mantenido es marginal.
      </p>
      <p>
        <strong>La estrategia inteligente</strong>: si quieres aprovechar
        los aditivos sin pagar el extra siempre, mete un depósito de 98
        cada cuatro o cinco repostajes de 95. Consigues casi el mismo efecto
        de limpieza a una fracción del coste.
      </p>

      <h2 id="e5-e10">El sufijo E5 y la llegada del E10</h2>
      <p>
        El «E5» o «E10» que aparece junto al octanaje indica el porcentaje
        máximo de bioetanol mezclado en la gasolina. El bioetanol se produce
        a partir de cereales o caña de azúcar y forma parte del compromiso
        europeo de reducir emisiones de CO₂.
      </p>
      <ul>
        <li>
          <strong>E5</strong>: hasta 5 % de bioetanol. Es la gasolina
          estándar en España. Compatible con todos los coches.
        </li>
        <li>
          <strong>E10</strong>: hasta 10 % de bioetanol. Es la nueva
          gasolina europea «estándar» desde 2011. España aún no la ha
          implantado masivamente, pero países como Francia, Alemania o
          Bélgica ya la venden como gasolina por defecto.
        </li>
      </ul>
      <p>
        Si viajas a otro país europeo y dudas, en{" "}
        <Link href="/guias/bioetanol-e5-vs-e10">esta guía explicamos en
        detalle la compatibilidad E10</Link> y cómo comprobar la pegatina del
        manual.
      </p>

      <h2 id="conclusion">Conclusión práctica</h2>
      <p>
        Para el 95 % de conductores españoles, la respuesta es sencilla:
        usar la gasolina <strong>95 E5 (o E10 si tu coche es de 2011 o
        posterior y la encuentras)</strong> es la opción correcta. Solo si tu
        manual indica claramente «98 RON mínimo» debes usar gasolina 98.
      </p>
      <p>
        El sobrecoste de usar 98 «por si acaso» en un coche que pide 95
        ronda los <strong>250-300 € al año</strong> en un usuario medio. Esos
        300 € rinden mucho más invertidos en una buena revisión cada 20.000
        km que en aditivos detergentes a granel.
      </p>

      <AppCta
        title="Compara precios de gasolina 95 y 98 cerca"
        body="En Carburantes verás los dos precios lado a lado en cada estación. Filtra por combustible para ordenar por el que más te interesa."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Más sobre tipos de combustible"
        links={[
          { href: "/guias/diesel-a-vs-premium", label: "Diésel A, premium, B y C: diferencias" },
          { href: "/guias/bioetanol-e5-vs-e10", label: "Bioetanol E5 vs E10: compatibilidad" },
          { href: "/guias/que-es-el-adblue", label: "Qué es el AdBlue y cuándo rellenarlo" },
          { href: "/guias/coche-diesel-o-gasolina", label: "Diésel o gasolina: cuál comprar en 2026" },
        ]}
      />
    </>
  );
}

export default guide;
