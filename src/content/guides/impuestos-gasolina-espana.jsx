import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "impuestos-gasolina-espana";
const title = "Cuántos impuestos pagas por un litro de gasolina en España";
const description =
  "Más de la mitad de lo que pagas por un litro son impuestos. Desglosamos el Impuesto de Hidrocarburos y el IVA y cuánto se queda Hacienda por repostaje.";

const guide = {
  slug,
  title,
  seoTitle: "Impuestos de la gasolina en España · Guía",
  description,
  category: "mercado",
  datePublished: "2026-05-22",
  dateModified: "2026-05-22",
  readingMinutes: 6,
  keywords: [
    "impuestos gasolina españa",
    "impuesto hidrocarburos",
    "iva gasolina",
    "cuántos impuestos litro gasolina",
  ],
  mentions: [
    { "@type": "Thing", name: "IVA" },
    { "@type": "Thing", name: "Impuesto sobre Hidrocarburos" },
  ],
  faq: [
    {
      q: "¿Qué porcentaje del precio son impuestos?",
      a: "En la gasolina 95, de media más de la mitad de lo que pagas en el surtidor son impuestos: aproximadamente entre el 50 % y el 55 % del precio total en España en 2026. Esa cifra sube cuando el precio del crudo baja (porque el Impuesto de Hidrocarburos es una cantidad fija por litro y pesa relativamente más) y baja cuando el crudo se dispara. Son dos tributos sumados: el Impuesto Especial sobre Hidrocarburos, que es una cantidad fija por litro, y el IVA del 21 %, que se aplica sobre el total. El diésel suele tener un porcentaje algo menor porque su impuesto fijo por litro es más bajo.",
    },
    {
      q: "¿Qué es el impuesto de hidrocarburos?",
      a: "El Impuesto Especial sobre Hidrocarburos es un impuesto que grava una cantidad fija de euros por cada mil litros de combustible, regulado por la normativa estatal de impuestos especiales y armonizado a nivel europeo. No es un porcentaje: pagas lo mismo de impuesto por litro tanto si la gasolina está cara como si está barata. En la gasolina 95 ronda, de media, los 47-50 céntimos por litro en España en 2026, sumando el tipo estatal general y el tramo autonómico ya unificado. Es la principal razón por la que el precio de la gasolina es mucho más estable que el del crudo del que procede.",
    },
    {
      q: "¿Se paga IVA sobre el impuesto?",
      a: "Sí. El IVA del 21 % se calcula sobre el precio final del litro, y ese precio ya incluye el Impuesto de Hidrocarburos. Es decir, pagas IVA también sobre la parte que es impuesto especial: un impuesto sobre otro impuesto. Por eso se habla coloquialmente del IVA como el impuesto del impuesto. El efecto es que, por cada euro de impuesto de hidrocarburos, acabas pagando además unos 21 céntimos de IVA encima de él.",
    },
    {
      q: "¿Por qué el diésel tiene menos impuestos?",
      a: "Históricamente el gasóleo de automoción ha tributado a un tipo fijo por litro inferior al de la gasolina, una política heredada de cuando se quería favorecer el transporte de mercancías y los vehículos diésel. Esa diferencia se ha ido recortando con los años para acercar ambos combustibles, pero todavía el impuesto fijo por litro del diésel es algo menor que el de la gasolina. Aun así, como el diésel suele tener un precio base distinto, la diferencia final en el surtidor es más pequeña de lo que mucha gente cree. La mejor forma de verlo es comparar el precio real de los dos en tu zona.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Cuando llenas el depósito, <strong>más de la mitad de lo que pagas
        son impuestos</strong>. Sobre cada litro de gasolina 95 recaen dos
        tributos: el <strong>Impuesto Especial sobre Hidrocarburos</strong>,
        una cantidad fija de unos 47-50 céntimos por litro que no cambia
        aunque suba o baje el crudo; y encima de todo, el <strong>IVA del
        21 %</strong>, que se aplica sobre el precio total — incluyendo el
        propio impuesto de hidrocarburos. En conjunto, en torno al 50-55 %
        del precio que ves en el surtidor acaba en Hacienda, no en la
        gasolinera ni en la petrolera.
      </Answer>

      <Tldr
        items={[
          "Más de la mitad del precio de la gasolina 95 son impuestos (~50-55 % de media, datos típicos en España 2026).",
          "El Impuesto de Hidrocarburos es fijo por litro (~47-50 cént/L en gasolina), no un porcentaje.",
          "El IVA del 21 % se aplica sobre el total, impuesto de hidrocarburos incluido: es el impuesto del impuesto.",
          "Como gran parte del precio es fijo, la gasolina se mueve mucho menos que el crudo del que procede.",
          "El diésel paga algo menos de impuesto fijo por litro, pero la diferencia final es menor de lo que parece.",
        ]}
      />

      <h2 id="precio-sin-impuestos">El precio sin impuestos</h2>
      <p>
        Antes de que Hacienda toque nada, un litro de gasolina tiene un
        coste «desnudo» que es bastante más bajo de lo que pagas. Ese precio
        base lo forman tres cosas: el coste del crudo y su refino, los
        márgenes de la cadena (logística, distribución y la propia
        gasolinera) y el transporte hasta la estación. Es la parte que
        explicamos a fondo en{" "}
        <Link href="/guias/como-se-forma-precio-gasolina">cómo se forma el
        precio de la gasolina</Link>.
      </p>
      <p>
        Para hacernos una idea con números típicos de 2026: si la gasolina 95
        se vende en torno a <strong>~1,55 €/L</strong> en el surtidor, el
        precio antes de impuestos ronda apenas los <strong>~0,70-0,75 €/L</strong>.
        El resto — más o menos otros 80 céntimos — es íntegramente fiscal.
        Las cifras concretas varían cada día según el mercado, así que lo
        sensato es <strong>comparar el precio real</strong> de tu zona en la
        app y quedarte con la proporción: aproximadamente la mitad para el
        producto, la mitad para el Estado.
      </p>

      <h2 id="impuesto-hidrocarburos">El Impuesto Especial de Hidrocarburos</h2>
      <p>
        Es el grueso de la carga fiscal y el más curioso, porque no es un
        porcentaje sino una <strong>cantidad fija por litro</strong>. Da
        igual que la gasolina esté a 1,40 € o a 1,90 €: el impuesto de
        hidrocarburos que pagas por ese litro es prácticamente el mismo. Está
        regulado por la normativa estatal de impuestos especiales y
        armonizado a escala europea, con un mínimo común que todos los países
        de la UE deben respetar.
      </p>
      <p>
        En la gasolina 95, sumando el tipo estatal general y el tramo que
        antes era autonómico y hoy está unificado, ronda los{" "}
        <strong>~47-50 céntimos por litro</strong> de media en España en 2026.
        En el diésel de automoción el tipo fijo es algo más bajo, por razones
        históricas que explicamos más abajo. Conviene retener tres ideas:
      </p>
      <ul>
        <li>
          <strong>Es fijo por litro</strong>: cuanto más barato esté el
          crudo, más pesa proporcionalmente este impuesto sobre el precio
          final, y al revés.
        </li>
        <li>
          <strong>No depende de la marca ni de la gasolinera</strong>: una
          low cost y una premium pagan exactamente el mismo impuesto de
          hidrocarburos por litro. Lo que cambia entre ellas es el margen,
          como vemos en{" "}
          <Link href="/guias/margen-gasolineras-por-litro">cuánto gana una
          gasolinera por litro</Link>.
        </li>
        <li>
          <strong>Existen devoluciones parciales</strong> para colectivos
          concretos, como el transporte profesional con la{" "}
          <Link href="/guias/bonificacion-gasoleo-profesional">bonificación
          del gasóleo profesional</Link>.
        </li>
      </ul>

      <Callout type="info" title="Por qué es un impuesto fijo y no un porcentaje">
        Que el impuesto sea una cantidad por litro y no un porcentaje tiene
        una consecuencia importante: Hacienda recauda lo mismo por litro
        vendido aunque el precio se desplome. En una crisis de precios bajos,
        la recaudación por litro se mantiene; lo que sube o baja por encima
        es el coste del producto y el IVA, que sí es proporcional.
      </Callout>

      <h2 id="iva-sobre-el-total">El IVA sobre el total (el impuesto del impuesto)</h2>
      <p>
        Encima de todo lo anterior se aplica el <strong>IVA del 21 %</strong>,
        el tipo general. Y aquí está el detalle que sorprende a casi todo el
        mundo: el IVA <strong>no se calcula sobre el precio del producto</strong>,
        sino sobre el <strong>precio final del litro, impuesto de
        hidrocarburos ya incluido</strong>.
      </p>
      <p>
        Dicho de otra forma: primero se suma el coste base más el impuesto de
        hidrocarburos, y sobre ese subtotal se aplica el 21 %. Estás pagando
        IVA también sobre la parte que ya era impuesto. Por eso se habla del
        IVA como <strong>«el impuesto del impuesto»</strong>: por cada euro
        de impuesto de hidrocarburos, acabas pagando además unos{" "}
        <strong>~21 céntimos extra</strong> de IVA encima de él.
      </p>
      <p>
        No es un truco contable raro: funciona igual que el IVA de la luz o
        del tabaco, donde también se grava un precio que ya lleva impuestos
        especiales dentro. Pero en la gasolina el efecto se nota mucho porque
        el impuesto especial es muy alto.
      </p>

      <h2 id="cuanto-se-queda-hacienda">Cuánto se queda Hacienda por litro</h2>
      <p>
        Vamos a desglosarlo con un litro de gasolina 95 a un precio típico de
        2026. Las cifras son aproximadas y redondeadas para que se entienda
        la estructura; el dato real de tu zona lo tienes siempre en la app.
      </p>

      <CompareTable
        caption="Desglose aproximado de un litro de gasolina 95 a ~1,55 €/L (datos típicos en España, 2026)"
        headers={["Concepto", "Importe aproximado", "Naturaleza"]}
        rows={[
          ["Coste del producto (crudo, refino, márgenes)", "~0,72 €", "Precio base"],
          ["Impuesto Especial de Hidrocarburos", "~0,47 €", "Impuesto fijo por litro"],
          ["Subtotal antes de IVA", "~1,19 €", "Base imponible del IVA"],
          ["IVA (21 % sobre el subtotal)", "~0,25 €", "Impuesto proporcional"],
          ["Precio final en surtidor", "~1,44-1,55 €", "Lo que pagas"],
          ["Total impuestos (hidrocarburos + IVA)", "~0,70-0,72 €", "≈ la mitad del total"],
        ]}
      />

      <p>
        La conclusión salta a la vista: de cada litro, <strong>en torno a la
        mitad va directamente a impuestos</strong>. En un depósito de 55
        litros, eso significa que aproximadamente <strong>~38-40 €</strong>
        de cada lleno acaban en Hacienda. Y si repostas tres veces al mes,
        estás pagando del orden de <strong>~1.300-1.400 € al año</strong>
        solo en impuestos sobre el combustible. Por eso, cuando comparas
        gasolineras, lo que realmente puedes optimizar es la <em>otra</em>
        mitad — el margen y el producto —, que es donde está la diferencia de
        precio entre unas estaciones y otras.
      </p>

      <h2 id="impuestos-precio-estable">Por qué los impuestos hacen el precio más estable</h2>
      <p>
        Aquí está la parte contraintuitiva. Mucha gente cree que la gasolina
        sube en la misma proporción que el petróleo, pero no es así, y la
        causa son justamente los impuestos. Como una parte enorme del precio
        es <strong>fija</strong> (el impuesto de hidrocarburos no se mueve con
        el crudo), las oscilaciones del barril se diluyen.
      </p>
      <p>
        Un ejemplo sencillo: si el coste del producto sube un 20 %, el precio
        en el surtidor <strong>no</strong> sube un 20 %, porque ese
        encarecimiento solo afecta a la mitad del precio que no es impuesto
        fijo. El impuesto de hidrocarburos sigue siendo el mismo euro por
        litro, y aunque el IVA sí amplifica un poco la subida (al ser
        proporcional), el resultado neto es que el surtidor se mueve mucho
        menos que el crudo. Es una de las razones que explicamos en{" "}
        <Link href="/guias/por-que-sube-baja-precio-gasolina">por qué sube y
        baja el precio de la gasolina</Link>.
      </p>
      <ul>
        <li>
          <strong>Amortigua las subidas</strong>: cuando el petróleo se
          dispara, el surtidor sube, pero proporcionalmente menos.
        </li>
        <li>
          <strong>Amortigua las bajadas</strong>: cuando el crudo se hunde, no
          esperes que la gasolina baje en la misma medida; el suelo fiscal
          impide que caiga tanto.
        </li>
        <li>
          <strong>Mantiene estable la recaudación</strong>: el Estado ingresa
          una cifra parecida por litro pase lo que pase con el mercado.
        </li>
      </ul>
      <p>
        Hay también un componente geográfico. Aunque el impuesto de
        hidrocarburos hoy esté unificado, el precio final no es idéntico en
        toda España por diferencias de transporte, competencia y márgenes
        locales. Lo vemos en detalle en{" "}
        <Link href="/guias/precio-carburante-por-comunidad">el precio del
        carburante por comunidad autónoma</Link>.
      </p>

      <AppCta
        title="Compara cuánto cuesta de verdad un litro cerca de ti"
        body="Los impuestos son iguales para todas las gasolineras, así que la diferencia de precio está en el resto. En Carburantes ves los precios oficiales del Ministerio de cada estación: busca por municipio o pulsa «Cerca de mí» y reposta en la más barata."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/como-se-forma-precio-gasolina", label: "Cómo se forma el precio" },
          { href: "/guias/por-que-sube-baja-precio-gasolina", label: "Por qué sube y baja la gasolina" },
          { href: "/guias/precio-carburante-por-comunidad", label: "Precio por comunidad autónoma" },
        ]}
      />
    </>
  );
}

export default guide;
