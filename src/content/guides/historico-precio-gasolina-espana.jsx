import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "historico-precio-gasolina-espana";
const title = "Evolución del precio de la gasolina en España";
const description =
  "Del subidón de 2022 a hoy: repasamos la evolución del precio de la gasolina y el diésel en España, qué la disparó y cómo seguir su histórico estación a estación.";

const guide = {
  slug,
  title,
  seoTitle: "Histórico del precio de la gasolina · Guía",
  description,
  category: "mercado",
  datePublished: "2026-05-26",
  dateModified: "2026-05-26",
  readingMinutes: 7,
  keywords: [
    "histórico precio gasolina españa",
    "evolución precio combustible",
    "precio gasolina 2022",
    "gráfico precio diésel",
  ],
  mentions: [
    { "@type": "Thing", name: "Diésel A" },
    { "@type": "Thing", name: "Gasolina 95" },
  ],
  faq: [
    {
      q: "¿Por qué subió tanto la gasolina en 2022?",
      a: "Por la combinación de tres factores que llegaron casi a la vez. Primero, la recuperación de la demanda tras la pandemia tensó un mercado del petróleo con poca oferta disponible. Segundo, la invasión de Ucrania en febrero de 2022 disparó el precio del crudo y, sobre todo, el del gas y el diésel, porque Rusia era un gran proveedor europeo. Tercero, el euro se debilitó frente al dólar, la moneda en la que se compra el petróleo, encareciendo cada barril en términos europeos. El resultado fue que la gasolina 95 y el diésel rozaron máximos históricos en torno a la primavera y el verano de 2022, llegando a superar de media los 2 euros por litro en muchas estaciones.",
    },
    {
      q: "¿La gasolina está más cara que nunca?",
      a: "En precio nominal, los máximos absolutos se vivieron en 2022, no ahora. Desde entonces los precios han bajado de aquellos picos, aunque siguen por encima de los niveles previos a 2021. Conviene tener en cuenta dos matices. Uno, que comparar precios de distintos años sin ajustar por inflación distorsiona la foto: un euro de 2012 no compra lo mismo que un euro de hoy. Y dos, que el precio cambia cada día y varía mucho de una estación a otra, así que la única cifra que de verdad importa es la del surtidor concreto donde repostas. Por eso conviene comparar el precio real en la app antes de llenar.",
    },
    {
      q: "¿Por qué el diésel a veces cuesta más que la gasolina?",
      a: "Durante décadas el diésel fue claramente más barato que la gasolina en España, sobre todo por una fiscalidad más baja. Eso cambió a partir de 2022. El diésel depende mucho del gasóleo de calefacción y de la industria, y Europa importaba buena parte de ese diésel de Rusia, así que la guerra encareció especialmente este carburante. A eso se sumó la menor capacidad de refino disponible para destilados. El resultado es que en algunos periodos el diésel se ha igualado o incluso ha superado a la gasolina 95 en el surtidor, algo que hace unos años habría sido impensable. La brecha vuelve a abrirse y cerrarse según el mercado, por lo que no hay una respuesta fija.",
    },
    {
      q: "¿Puedo ver el histórico de una gasolinera?",
      a: "El Ministerio publica los precios oficiales actualizados varias veces al día, y esos son los datos que usa Carburantes. La foto en directo de cada estación la tienes siempre en la app: precio actual de cada combustible, ordenado por el más barato de tu zona. Para tendencias de fondo (cómo evoluciona el precio medio en España o en tu provincia a lo largo de las semanas) lo más práctico es comparar de forma regular, repostar cuando veas la estación habitual por debajo de su precio típico y fijarte en si el conjunto del mercado sube o baja. La clave no es memorizar cifras pasadas, sino comparar el precio real cada vez que vas a llenar.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        El precio de la gasolina en España ha vivido una montaña rusa: tras años
        relativamente estables, el <strong>shock de 2022</strong> (recuperación
        pospandemia más la guerra de Ucrania) disparó la gasolina 95 y el diésel
        hasta máximos históricos por encima de los 2 €/litro de media, lo que
        forzó la famosa <strong>bonificación de 20 céntimos</strong>. Desde
        entonces los precios han bajado de aquellos picos, pero siguen por encima
        de los niveles previos a 2021, y el diésel ha dejado de ser siempre el
        carburante barato.
      </Answer>

      <Tldr
        items={[
          "Antes de 2021 la gasolina 95 se movía durante años en una banda relativamente estable.",
          "En 2022 se disparó por la guerra de Ucrania, la recuperación pospandemia y el euro débil, rozando los 2 €/L de media.",
          "El Gobierno aplicó una bonificación de 20 céntimos por litro durante buena parte de 2022.",
          "Desde 2023 los precios han bajado de aquellos máximos, sin volver del todo a los niveles de antes.",
          "El diésel se acercó e incluso superó a la gasolina, rompiendo décadas de ventaja diésel.",
        ]}
      />

      <h2 id="decada-subidas-bajadas">Una década de subidas y bajadas</h2>
      <p>
        Si miras hacia atrás una década, el precio del combustible en España no
        ha sido nunca una línea recta. En los años previos a 2021 la gasolina 95
        y el diésel se movían dentro de una banda relativamente reconocible:
        subían y bajaban con el precio del petróleo, con la estacionalidad
        (verano y Semana Santa más caros por la demanda de viajes) y con el tipo
        de cambio euro-dólar, pero sin saltos bruscos sostenidos.
      </p>
      <p>
        La razón es que el precio del surtidor se compone, a grandes rasgos, de
        tres bloques: el coste de la materia prima (el crudo y el producto
        refinado), los impuestos y el margen de distribución y venta. De esos
        tres, los impuestos son la parte más estable, así que casi toda la
        volatilidad que ves en el cartel de la gasolinera viene del precio del
        petróleo y del margen. Lo explicamos en detalle en{" "}
        <Link href="/guias/como-se-forma-precio-gasolina">
          cómo se forma el precio de la gasolina
        </Link>
        .
      </p>
      <p>
        Esa relativa calma se rompió en 2021. Conforme el mundo salía de la
        pandemia, la demanda de combustible se recuperó mucho más rápido que la
        oferta, que llevaba meses recortada. Los precios empezaron a tensarse
        durante todo 2021, y lo que vino después convirtió esa subida gradual en
        un sobresalto.
      </p>

      <h2 id="shock-2022-bonificacion">El shock de 2022 y la bonificación de 20 céntimos</h2>
      <p>
        La invasión de Ucrania en febrero de 2022 fue el detonante. El petróleo y
        el gas se dispararon ante el temor a quedarse sin suministro ruso, y el
        diésel sufrió especialmente porque Europa importaba buena parte de su
        gasóleo de Rusia. A la vez, el euro se debilitó frente al dólar (la moneda
        del petróleo), encareciendo cada barril para los compradores europeos. Las
        tres fuerzas empujaban en la misma dirección.
      </p>
      <p>
        El resultado fue uno de los episodios de precios más altos que se
        recuerdan. En la primavera y el verano de 2022, la gasolina 95 y el diésel
        superaron de media los <strong>2 €/litro</strong> en muchas estaciones,
        máximos nominales que no se habían visto antes. Llenar un depósito de 55
        litros pasó a costar bastante más de 100 euros en buena parte del país.
      </p>
      <p>
        Ante ese escenario, el Gobierno aprobó una medida que marcó el año: una{" "}
        <strong>bonificación de 20 céntimos por litro</strong>, financiada en
        parte por el Estado y en parte por las propias petroleras, que se aplicaba
        directamente en el ticket de la mayoría de estaciones durante buena parte
        de 2022. Para muchos conductores fue la primera vez que veían un descuento
        general en el surtidor.
      </p>

      <Callout type="note" title="Ojo al comparar precios de distintos años">
        Comparar el precio de la gasolina de hace diez años con el de hoy «en
        crudo» engaña, porque no descuenta la inflación: el dinero de entonces
        valía más. Cuando leas que la gasolina «está más cara que nunca», fíjate
        en si la cifra está ajustada por inflación o es nominal. El máximo
        nominal está en 2022; en términos reales la comparación es más matizada.
      </Callout>

      <h2 id="que-ha-pasado-desde-entonces">Qué ha pasado desde entonces</h2>
      <p>
        Pasado el pico de 2022, el mercado fue normalizándose poco a poco. La
        bonificación general se retiró, el petróleo bajó de aquellos máximos y los
        precios del surtidor aflojaron a lo largo de 2023 y 2024. Pero «aflojar»
        no significó volver al punto de partida: los carburantes se quedaron, de
        media, por encima de los niveles cómodos de antes de 2021.
      </p>
      <p>
        Lo que sí cambió de forma más visible fue el comportamiento del día a día.
        Tras el susto de 2022, mucha gente se acostumbró a comparar antes de
        repostar y a notar que la diferencia entre la estación más cara y la más
        barata de una misma ciudad puede ser de varios céntimos por litro, lo que
        en un lleno se traduce en euros reales. Si quieres entender qué empuja esas
        oscilaciones de corto plazo, lo desarrollamos en{" "}
        <Link href="/guias/por-que-sube-baja-precio-gasolina">
          por qué sube y baja el precio de la gasolina
        </Link>
        .
      </p>
      <ul>
        <li>
          <strong>El petróleo manda, pero con retraso.</strong> Cuando el crudo
          sube, el surtidor lo nota en pocos días; cuando baja, suele tardar algo
          más en reflejarse.
        </li>
        <li>
          <strong>El euro-dólar pesa.</strong> Un euro débil encarece el petróleo
          aunque su precio en dólares no se mueva.
        </li>
        <li>
          <strong>Los impuestos ponen un suelo.</strong> Buena parte de lo que
          pagas son tributos, así que el precio rara vez baja tanto como cabría
          esperar cuando el crudo se desploma.
        </li>
      </ul>

      <h2 id="diesel-gasolina-cruzaron">Por qué el diésel y la gasolina se cruzaron</h2>
      <p>
        Durante décadas en España repostar diésel fue, casi por norma, más barato
        que repostar gasolina. La razón principal era fiscal: el gasóleo de
        automoción soportaba menos impuestos. Por eso medio país compró coches
        diésel pensando en el ahorro por kilómetro.
      </p>
      <p>
        Ese paradigma se tambaleó a partir de 2022. El diésel está muy ligado al
        gasóleo de calefacción y al consumo industrial, y Europa dependía mucho del
        producto ruso, así que la guerra lo encareció más que a la gasolina. En
        varios momentos el diésel se igualó e incluso superó a la gasolina 95 en el
        surtidor, algo que años atrás habría parecido un error de cartel.
      </p>

      <CompareTable
        caption="Diésel A vs Gasolina 95: cómo cambió la relación (datos típicos en España)"
        headers={["Periodo", "Diésel A", "Gasolina 95", "Relación habitual"]}
        rows={[
          ["Antes de 2021", "Más barato", "Más caro", "Diésel claramente por debajo"],
          ["Pico de 2022", "~2 €/L o más", "~2 €/L o más", "Diésel se iguala o supera"],
          ["Desde 2023", "Variable", "Variable", "Se cruzan según el mercado"],
        ]}
      />

      <p>
        ¿Significa esto que ya no compensa el diésel? Depende de cuánto conduzcas,
        del consumo de tu coche y del precio real del día. La cuenta ya no es
        automática como antes, y por eso conviene revisarla con datos actuales en
        lugar de dar por hecho la vieja ventaja diésel. Si te estás planteando la
        compra, lo abordamos en{" "}
        <Link href="/guias/coche-diesel-o-gasolina">
          coche diésel o gasolina
        </Link>{" "}
        y en{" "}
        <Link href="/guias/diesel-a-vs-premium">
          diésel A frente al premium
        </Link>
        .
      </p>

      <h2 id="como-ver-historico-estacion">Cómo ver el histórico de una estación</h2>
      <p>
        Lo más importante para tu bolsillo no es el gráfico de la última década,
        sino el precio que vas a pagar hoy. Carburantes lee los precios oficiales
        que el Ministerio publica varias veces al día y te muestra, para cada
        gasolinera, el precio actual de cada combustible. Así ves de un vistazo
        cuál es la estación más barata de tu zona en este momento.
      </p>
      <p>
        Para seguir la tendencia de fondo, lo práctico es convertir la comparación
        en hábito:
      </p>
      <ul>
        <li>
          Mira el precio de tu estación habitual cada vez que pasas y aprende cuál
          es su «precio típico». Cuando la veas por debajo, es buen momento para
          llenar.
        </li>
        <li>
          Compara con las estaciones cercanas para saber si tu zona está cara o
          barata respecto al conjunto. Las diferencias por comunidad las
          explicamos en{" "}
          <Link href="/guias/precio-carburante-por-comunidad">
            precio del carburante por comunidad
          </Link>
          .
        </li>
        <li>
          Fíjate en si el mercado en general sube o baja: si todas las estaciones
          encarecen a la vez, es el petróleo o el euro; si solo sube una, es su
          margen.
        </li>
      </ul>
      <p>
        Cualquier cifra concreta que leas en una guía como esta es orientativa y
        envejece rápido. El precio real de cada surtidor cambia a diario, así que
        la mejor manera de no pagar de más es comparar justo antes de repostar.
      </p>

      <AppCta
        title="Comprueba el precio real antes de repostar"
        body="Carburantes lee los datos oficiales del Ministerio varias veces al día. Busca por municipio o pulsa «Cerca de mí» para ver la gasolinera más barata de tu zona ahora mismo."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/por-que-sube-baja-precio-gasolina", label: "Por qué sube y baja la gasolina" },
          { href: "/guias/como-se-forma-precio-gasolina", label: "Cómo se forma el precio" },
          { href: "/guias/bonificacion-gasoleo-profesional", label: "Bonificación del gasóleo" },
        ]}
      />
    </>
  );
}

export default guide;
