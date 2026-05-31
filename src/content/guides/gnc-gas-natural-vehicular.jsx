import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "gnc-gas-natural-vehicular";
const title = "GNC: gas natural vehicular, ¿una alternativa real al diésel?";
const description =
  "El gas natural comprimido (GNC) es de los combustibles más baratos para circular. Te contamos cómo funciona, qué coches lo usan y sus limitaciones.";

const guide = {
  slug,
  title,
  seoTitle: "GNC para coches: precio y ventajas · Guía Carburantes",
  description,
  category: "tipos-combustible",
  datePublished: "2026-05-12",
  dateModified: "2026-05-12",
  readingMinutes: 7,
  keywords: [
    "gnc gas natural vehicular",
    "coche gnc",
    "precio gnc",
    "gnc vs glp",
    "estaciones gnc españa",
  ],
  mentions: [
    { "@type": "Thing", name: "GNC" },
    { "@type": "Thing", name: "GLP" },
    { "@type": "Thing", name: "Gas natural" },
  ],
  faq: [
    {
      q: "¿GNC y GLP son lo mismo?",
      a: "No. El GNC es gas natural vehicular, básicamente metano comprimido a unos 200 bar, el mismo gas que llega a la cocina de casa por tubería. El GLP o autogás es una mezcla de propano y butano que se almacena líquida a baja presión y procede del refino del petróleo. Son combustibles distintos, con surtidores distintos, depósitos distintos y precios distintos. Un coche de GNC no puede repostar GLP ni al revés.",
    },
    {
      q: "¿Cuántas gasineras de GNC hay en España?",
      a: "Pocas y muy concentradas. A fecha de 2026 hablamos de un orden aproximado de unas 100 a 150 estaciones públicas de GNC en toda España, frente a las miles de gasolineras convencionales y al millar largo de puntos de GLP. Se concentran en grandes ciudades, polígonos y corredores logísticos como el eje Madrid-Barcelona. Por eso es imprescindible comprobar la cobertura en tu zona y en tus rutas habituales antes de comprar un coche de GNC.",
    },
    {
      q: "¿Es seguro el GNC?",
      a: "Sí. Los depósitos de GNC se fabrican con paredes muy gruesas, se homologan para soportar presiones muy superiores a las de uso y pasan inspecciones periódicas. Además, al ser más ligero que el aire, en caso de fuga el gas natural se dispersa hacia arriba en lugar de acumularse a ras de suelo como hace el GLP. En conjunto, un coche de GNC moderno y bien mantenido es tan seguro como uno de gasolina o diésel.",
    },
    {
      q: "¿Compensa comprar un coche de GNC?",
      a: "Depende sobre todo de dónde vivas y de cuántos kilómetros hagas. Si tienes una gasinera cerca, recorres muchos kilómetros al año y tus rutas pasan por zonas con red, el bajo precio del gas por kilómetro puede compensar el sobrecoste del coche en pocos años. Si vives lejos de cualquier estación o haces poca distancia, lo más probable es que no salga rentable y te convenga mirar GLP, gasolina o híbrido. Antes de decidir, calcula tu coste real comparando el precio del gas con el de la gasolina en tu zona.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        El <strong>GNC (gas natural comprimido)</strong> es metano comprimido,
        el mismo gas que llega a tu cocina, usado como combustible de
        automoción. Su gran baza es el <strong>precio por kilómetro</strong>:
        suele ser de los más baratos del mercado, por debajo del diésel y de
        la gasolina. Su gran límite es la red: en España hay muy pocas
        gasineras y muy concentradas, así que solo es una alternativa real al
        diésel si vives y te mueves cerca de ellas.
      </Answer>

      <Tldr
        items={[
          "GNC = metano comprimido a ~200 bar; no confundir con el GLP (propano/butano).",
          "Coste por kilómetro muy bajo, normalmente por debajo de diésel y gasolina.",
          "Red escasa: del orden de ~100-150 estaciones en España, muy concentradas en ciudades y corredores.",
          "Casi todos los coches de GNC son bifuel: llevan también un pequeño depósito de gasolina como respaldo.",
          "Compensa si haces muchos kilómetros y tienes gasinera cerca; si no, mira GLP, gasolina o híbrido.",
        ]}
      />

      <h2 id="que-es-el-gnc">Qué es el GNC y en qué se diferencia del GLP</h2>
      <p>
        El GNC es <strong>gas natural</strong> (esencialmente metano)
        comprimido a una presión muy alta, en torno a los 200 bar, para que
        quepa suficiente energía en el depósito del coche. Es el mismo gas
        que usas en casa para cocinar o calentar el agua; la diferencia es que
        para moverlo en un vehículo hay que comprimirlo muchísimo y guardarlo
        en botellas reforzadas.
      </p>
      <p>
        Es muy habitual confundirlo con el GLP o autogás, pero{" "}
        <strong>no son lo mismo</strong>. El GLP es una mezcla de propano y
        butano que procede del refino del petróleo, se almacena líquido a baja
        presión y tiene una red de repostaje bastante más extensa. Si te
        interesa esa otra opción, lo explicamos a fondo en la guía de{" "}
        <Link href="/guias/glp-autogas-espana">GLP (autogás): qué es y si
        compensa</Link>. Las diferencias clave:
      </p>
      <ul>
        <li>
          <strong>Origen</strong>: el GNC es gas natural (metano); el GLP es
          propano/butano del petróleo.
        </li>
        <li>
          <strong>Almacenamiento</strong>: el GNC va gaseoso a altísima
          presión; el GLP va líquido a presión baja.
        </li>
        <li>
          <strong>Surtidor</strong>: son boquillas y depósitos incompatibles
          entre sí. Un coche de GNC no reposta GLP ni viceversa.
        </li>
        <li>
          <strong>Etiqueta DGT</strong>: ambos suelen llevar etiqueta ECO,
          pero conviene comprobar la del modelo concreto. Lo repasamos en la
          guía de{" "}
          <Link href="/guias/etiqueta-dgt-combustible">la etiqueta DGT por
          combustible</Link>.
        </li>
      </ul>

      <h2 id="precio-y-ahorro">Cuánto cuesta y cuánto se ahorra</h2>
      <p>
        El gran atractivo del GNC es el <strong>coste por kilómetro</strong>.
        El gas natural se vende habitualmente en kilogramos (no en litros), y
        un kilo de GNC rinde muchos kilómetros. En la práctica, el coste de
        recorrer 100 km con GNC suele quedar claramente por debajo del de
        hacerlo con gasolina o diésel; de media puede rondar la mitad o menos
        del coste en gasolina, aunque <strong>depende de la estación y del
        momento</strong>.
      </p>
      <p>
        Hay que tener cuidado con las comparaciones rápidas: como el GNC se
        cobra por kilo y la gasolina por litro, no sirve mirar solo la cifra
        del cartel. Lo que importa es cuánto te cuesta <em>de verdad</em> cada
        100 km. Por eso, antes de fiarte de un precio teórico, conviene
        comparar el precio real del combustible en tu zona; te lo explicamos
        en{" "}
        <Link href="/guias/cuanto-se-ahorra-comparando-gasolineras">cuánto se
        ahorra comparando gasolineras</Link>.
      </p>

      <CompareTable
        caption="GNC vs GLP vs gasolina (datos típicos en España, 2026; orientativos)"
        headers={["Característica", "GNC", "GLP (autogás)", "Gasolina 95"]}
        rows={[
          ["Combustible", "Metano comprimido", "Propano/butano", "Gasolina"],
          ["Se vende por", "Kilogramo", "Litro", "Litro"],
          ["Coste por km", "Muy bajo", "Bajo", "Referencia"],
          ["Estaciones en España", "~100-150 (aprox.)", "Más de un millar", "Miles"],
          ["Etiqueta DGT habitual", "ECO", "ECO", "C"],
          ["Sobrecoste del coche", "Notable", "Moderado", "—"],
        ]}
      />

      <Callout type="note" title="Por qué casi todos los coches de GNC son «bifuel»">
        La mayoría de los turismos de GNC del mercado son <strong>bifuel</strong>:
        llevan los depósitos de gas natural y, además, un pequeño depósito de
        gasolina. El coche circula con gas mientras tiene y cambia
        automáticamente a gasolina cuando se agota o no encuentras gasinera.
        Esa gasolina de respaldo es justo lo que da tranquilidad ante una red
        de repostaje tan escasa.
      </Callout>

      <h2 id="coches-y-red">Qué coches usan GNC y cómo es la red de gasineras</h2>
      <p>
        En turismos, la oferta de GNC ha sido tradicionalmente reducida y
        viene casi siempre de fábrica (no es tan común convertir un coche de
        gasolina a GNC como sí ocurre con el GLP). Marcas como SEAT, Volkswagen,
        Audi, Škoda o Fiat han comercializado versiones de gas natural en
        modelos populares. Donde el GNC ha tenido más sentido es en{" "}
        <strong>flotas y vehículos pesados</strong>: autobuses urbanos,
        camiones de reparto y vehículos de servicios municipales que vuelven
        cada noche a una base con surtidor propio.
      </p>
      <p>
        Y aquí está el verdadero cuello de botella: la{" "}
        <strong>red pública de gasineras</strong>. A fecha de 2026 hablamos de
        un orden aproximado de unas 100 a 150 estaciones de GNC en toda España,
        una cifra muy pequeña frente a las miles de gasolineras convencionales.
        Además están muy concentradas:
      </p>
      <ul>
        <li>
          <strong>Grandes ciudades y áreas metropolitanas</strong>, sobre todo
          Madrid, Barcelona y Valencia.
        </li>
        <li>
          <strong>Polígonos y corredores logísticos</strong>, pensados más
          para camiones y flotas que para particulares.
        </li>
        <li>
          <strong>Bases de transporte</strong> (autobuses, municipales) con
          surtidor de uso interno, no siempre abierto al público.
        </li>
      </ul>
      <p>
        La consecuencia práctica es que, fuera de esos núcleos, puedes pasarte
        decenas o cientos de kilómetros sin un solo punto de repostaje de gas.
        Por eso, antes de comprar, lo sensato es comprobar qué hay en tu zona y
        en las rutas que repites; mira también si esas estaciones son{" "}
        <Link href="/guias/gasolineras-24-horas">gasolineras 24 horas</Link> o
        tienen horario limitado, porque condiciona mucho el día a día.
      </p>

      <h2 id="ventajas-inconvenientes">Ventajas e inconvenientes reales</h2>
      <p>
        Resumiendo sin adornos lo bueno y lo malo del gas natural vehicular:
      </p>
      <ul>
        <li>
          <strong>A favor — precio</strong>: coste por kilómetro muy bajo,
          normalmente por debajo del diésel y la gasolina.
        </li>
        <li>
          <strong>A favor — etiqueta ECO</strong>: acceso a zonas de bajas
          emisiones y, en algunos municipios, ventajas de aparcamiento o
          impuestos.
        </li>
        <li>
          <strong>A favor — emisiones</strong>: el gas natural emite menos
          CO₂ y muchas menos partículas que el diésel.
        </li>
        <li>
          <strong>En contra — red</strong>: muy pocas gasineras y muy
          concentradas. Es la limitación número uno.
        </li>
        <li>
          <strong>En contra — espacio y autonomía en gas</strong>: las
          botellas a presión ocupan sitio (a menudo restan maletero) y la
          autonomía solo con gas suele ser corta; por eso el respaldo de
          gasolina es casi obligado.
        </li>
        <li>
          <strong>En contra — sobrecoste del coche</strong>: las versiones de
          GNC suelen costar más de salida, lo que alarga el tiempo necesario
          para amortizar el ahorro.
        </li>
      </ul>

      <Callout type="warn" title="No te fíes solo del precio del cartel">
        El bajo coste por kilómetro del GNC pierde todo su sentido si tienes
        que desviarte 30 minutos para repostar o si dependes de una única
        estación que puede estar cerrada o averiada. Antes de dar el paso,
        valora también el coste de tu tiempo y la fiabilidad de la red, no solo
        los céntimos por kilo.
      </Callout>

      <h2 id="te-conviene">¿Te conviene el GNC?</h2>
      <p>
        El GNC puede ser una alternativa muy interesante al diésel, pero solo
        para un perfil concreto. Tiende a salir a cuenta si:
      </p>
      <ul>
        <li>
          Tienes una o varias <strong>gasineras cerca</strong> de casa, del
          trabajo o de tus rutas habituales.
        </li>
        <li>
          Recorres <strong>muchos kilómetros al año</strong>, de forma que el
          ahorro por kilómetro compense el sobrecoste del coche.
        </li>
        <li>
          Te mueves sobre todo por <strong>zonas con red</strong> (grandes
          ciudades, corredores logísticos) y entras en zonas de bajas
          emisiones.
        </li>
      </ul>
      <p>
        En cambio, si vives lejos de cualquier estación, haces poca distancia o
        viajas con frecuencia por zonas sin cobertura, lo más probable es que
        el GNC no te compense y te encajen mejor otras opciones: el{" "}
        <Link href="/guias/glp-autogas-espana">GLP</Link>, que tiene mucha más
        red; un coche de gasolina; un híbrido; o, mirando al futuro, el{" "}
        <Link href="/guias/coche-hidrogeno-espana">coche de hidrógeno</Link>. Y
        si tu duda real es entre los dos combustibles clásicos, te ayudamos a
        decidir en{" "}
        <Link href="/guias/coche-diesel-o-gasolina">diésel o gasolina: cuál
        comprar</Link>.
      </p>
      <p>
        La regla de oro es la de siempre: <strong>haz tus números con precios
        reales</strong>, no con cifras de folleto. Calcula tu coste por 100 km
        con gas y compáralo con el de la gasolina o el diésel en las estaciones
        a las que de verdad puedes llegar.
      </p>

      <AppCta
        title="Compara el precio del combustible cerca de ti"
        body="En Carburantes ves los precios oficiales del Ministerio actualizados cada media hora. Busca por municipio o pulsa «Cerca de mí» para saber cuánto cuesta repostar realmente en tu zona antes de decidirte por el GNC."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/glp-autogas-espana", label: "GLP (autogás): qué es y si compensa" },
          { href: "/guias/coche-hidrogeno-espana", label: "Coche de hidrógeno en España" },
          { href: "/guias/coche-diesel-o-gasolina", label: "Diésel o gasolina: cuál comprar" },
        ]}
      />
    </>
  );
}

export default guide;
