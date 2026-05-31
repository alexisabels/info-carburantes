import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "cuanto-cuesta-llenar-el-deposito";
const title = "Cuánto cuesta llenar el depósito según tu coche";
const description =
  "¿Cuánto cuesta un lleno hoy? Te enseñamos a calcular el coste de llenar el depósito según su capacidad y el precio actual, y a comparar entre gasolineras.";

const guide = {
  slug,
  title,
  seoTitle: "Cuánto cuesta llenar el depósito · Guía",
  description,
  category: "ahorro",
  datePublished: "2026-05-28",
  dateModified: "2026-05-28",
  readingMinutes: 5,
  keywords: [
    "cuánto cuesta llenar el depósito",
    "precio lleno depósito",
    "coste repostar",
    "cuánto cuesta un lleno de gasolina",
  ],
  mentions: [{ "@type": "Thing", name: "Depósito" }],
  faq: [
    {
      q: "¿Cuánto cuesta llenar un depósito de 50 litros?",
      a: "Depende del precio del día y del combustible, pero como referencia: con un precio en torno a 1,55 euros el litro (gasolina 95 de media en España, 2026), llenar 50 litros sale por unos 77 o 78 euros. Si vas en diésel a un precio aproximado de 1,45 euros, ronda los 72 o 73 euros. Ten en cuenta que casi nunca repostas desde el depósito completamente vacío: si te queda un cuarto de depósito, solo metes unos 37 o 38 litros, es decir, unos 58 euros. Para el dato exacto del momento, compara el precio real en la app antes de salir.",
    },
    {
      q: "¿Cómo calculo el coste de mi lleno?",
      a: "Multiplica los litros que vas a meter por el precio por litro del combustible. La fórmula es litros multiplicado por euros por litro igual a coste. Si tu depósito es de 55 litros pero llegas con la reserva (te quedan unos 7 litros), repostarás unos 48 litros; a un precio aproximado de 1,55 euros saldría sobre 74 o 75 euros. La capacidad de tu depósito aparece en el manual del coche y el precio actualizado lo tienes en el surtidor o, mejor, comparado entre gasolineras en la app antes de elegir dónde parar.",
    },
    {
      q: "¿Cuánto cambia entre gasolineras?",
      a: "Más de lo que parece. Entre una estación de servicio cara de marca en autopista y una low cost o de supermercado puede haber diferencias de 10 a 20 céntimos por litro de media en España. En un lleno de 50 litros eso son entre 5 y 10 euros de diferencia por el mismo combustible. Repostando dos o tres veces al mes, esa diferencia se convierte en bastante dinero al año. Por eso conviene comparar el precio real cerca de ti antes de repostar, y no quedarte con la primera gasolinera que veas.",
    },
    {
      q: "¿Cuánto gasto al año?",
      a: "Para estimarlo, calcula tus kilómetros anuales, divídelos por los kilómetros que haces con un lleno y multiplica por el coste de cada lleno. Un conductor medio en España recorre en torno a 12.000 o 15.000 kilómetros al año. Con un coche que gasta unos 6 litros a los 100 y un precio aproximado de 1,55 euros el litro, eso supone alrededor de 1.100 a 1.400 euros al año en combustible. Comparando gasolineras y eligiendo siempre las más baratas de tu ruta puedes recortar fácilmente un 5 o un 10 por ciento de esa cifra.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        El coste de un lleno se calcula con una operación sencilla:{" "}
        <strong>litros que metes × precio por litro</strong>. Con un depósito
        típico de 50 litros y la gasolina 95 a un precio en torno a 1,55 €/L
        (media en España, 2026), un lleno completo ronda los{" "}
        <strong>77-78 €</strong>; en diésel, algo menos. Como rara vez repostas
        con el depósito vacío, en la práctica sueles pagar bastante menos por
        cada visita.
      </Answer>

      <Tldr
        items={[
          "Fórmula del lleno: litros a repostar × precio por litro.",
          "Depósitos típicos en España: 40-55 L en turismos; 60-90 L en SUV y furgonetas.",
          "Rara vez llenas desde vacío: con un cuarto de depósito ya solo metes ~75 % de la capacidad.",
          "Entre gasolinera cara y barata puede haber 10-20 cént/L: hasta 5-10 € por lleno.",
          "Compara el precio real en la app antes de repostar para no pagar de más.",
        ]}
      />

      <h2 id="de-que-depende">De qué depende el coste de un lleno</h2>
      <p>
        Aunque la idea de «llenar el depósito» suena a una cifra fija, lo que
        pagas cada vez depende de tres factores que cambian constantemente:
      </p>
      <ul>
        <li>
          <strong>Cuántos litros caben de verdad.</strong> No es lo mismo la
          capacidad nominal del depósito que los litros que realmente metes. Si
          llegas con un cuarto de tanque, solo repostas tres cuartas partes. El
          coste de cada visita varía según el nivel con el que llegues.
        </li>
        <li>
          <strong>El precio por litro del día.</strong> El precio del carburante
          se mueve casi a diario y varía mucho entre estaciones. Diez céntimos
          arriba o abajo por litro cambian el lleno en varios euros. Si te
          interesa entender por qué oscila, lo explicamos en{" "}
          <Link href="/guias/por-que-sube-baja-precio-gasolina">
            por qué sube y baja el precio de la gasolina
          </Link>
          .
        </li>
        <li>
          <strong>El tipo de combustible.</strong> El diésel suele ser algo más
          barato por litro que la gasolina 95, y la 98 más cara que ambas. El
          GLP (autogas) cuesta bastante menos por litro, aunque el consumo es
          mayor.
        </li>
      </ul>
      <p>
        Por eso no existe un «precio del lleno» universal: existe el tuyo, que
        depende de tu coche, de cuándo repostas y, sobre todo, de dónde lo
        haces.
      </p>

      <h2 id="capacidades-tipicas">Capacidades típicas de depósito</h2>
      <p>
        El primer dato que necesitas es cuánto cabe en tu depósito. La cifra
        exacta aparece en el manual del coche (suele estar en la ficha de
        características o en el apartado de repostaje). Estos son los rangos
        habituales en el parque español, como referencia aproximada:
      </p>

      <CompareTable
        caption="Capacidad de depósito y coste de un lleno completo (datos típicos en España, 2026)"
        headers={[
          "Tipo de vehículo",
          "Depósito aprox.",
          "Lleno gasolina 95 (~1,55 €/L)",
          "Lleno diésel (~1,45 €/L)",
        ]}
        rows={[
          ["Utilitario pequeño", "40-45 L", "~62-70 €", "~58-65 €"],
          ["Compacto / berlina media", "50-55 L", "~78-85 €", "~72-80 €"],
          ["SUV familiar", "55-65 L", "~85-100 €", "~80-94 €"],
          ["Furgoneta / monovolumen", "70-90 L", "~108-140 €", "~101-130 €"],
        ]}
      />

      <p>
        Son cifras de un depósito lleno por completo desde casi vacío. En el día
        a día casi nunca apuras tanto: la mayoría repostamos cuando salta la
        reserva o queda un cuarto de tanque, así que el desembolso real por
        visita suele ser un 20-30 % menor que el de la tabla.
      </p>

      <Callout type="info" title="Llenar entero o medio depósito">
        Llenar el depósito completo no encarece el combustible (pagas lo mismo
        por litro), pero sí añade peso, lo que sube ligeramente el consumo.
        Para un coche normal la diferencia es mínima; en{" "}
        <Link href="/guias/lleno-o-medio-deposito">
          lleno o medio depósito
        </Link>{" "}
        analizamos cuándo compensa cada estrategia.
      </Callout>

      <h2 id="como-calcular">Cómo calcular tu lleno hoy</h2>
      <p>
        El cálculo es directo. Necesitas dos datos: los litros que vas a meter y
        el precio por litro del combustible que usa tu coche.
      </p>
      <ul>
        <li>
          <strong>Fórmula:</strong> litros a repostar × precio por litro = coste
          del lleno.
        </li>
        <li>
          <strong>Litros que metes:</strong> capacidad del depósito menos lo que
          te queda. Si tu depósito es de 55 L y llegas con la reserva (unos 7
          L), repostarás alrededor de 48 L.
        </li>
        <li>
          <strong>Precio por litro:</strong> el del surtidor de ese día, que
          conviene haber comparado antes. No te fíes del precio del cartel de
          carretera sin verlo de cerca: a veces el grande es el del gasóleo y el
          tuyo es otro.
        </li>
      </ul>
      <p>
        Ejemplo práctico: depósito de 50 L, llegas con un cuarto (te quedan 12-13
        L), así que metes unos 37-38 L. A un precio aproximado de 1,55 €/L, el
        lleno te sale por unos <strong>58 €</strong>. Si esa misma mañana
        encontraras la gasolina a 1,42 €/L en una estación más barata de tu ruta,
        pagarías unos 54 €: cuatro euros menos por exactamente lo mismo.
      </p>
      <p>
        Otro ejemplo, esta vez con diésel: depósito de 60 L en un SUV familiar,
        llegas con algo menos de la mitad y metes unos 35 L. A un precio
        aproximado de 1,45 €/L, el repostaje sale por unos <strong>51 €</strong>.
        Si tu coche fuera de GLP, el cálculo es el mismo pero el precio por litro
        suele rondar la mitad; eso sí, recuerda que el consumo en autogas es
        mayor, así que el ahorro por kilómetro no es tan grande como sugiere el
        precio del litro.
      </p>
      <p>
        Para no hacer cuentas a mano cada vez, lo cómodo es ver el precio real
        actualizado en la app y dejar que sea ella quien te muestre cuánto
        cuesta el litro en cada gasolinera cercana antes de decidir dónde parar.
        Así te aseguras de partir del precio del momento y no de una media
        aproximada que puede quedarse corta o pasarse.
      </p>

      <h2 id="varia-segun-gasolinera">Cuánto varía según la gasolinera</h2>
      <p>
        Bastante: entre una estación cara y una barata suele haber unos{" "}
        <strong>10-20 céntimos por litro</strong> de media en España, lo que en un
        lleno de 50 litros se traduce en una diferencia aproximada de 5 a 10 €
        por el mismo combustible y el mismo día.
      </p>
      <p>
        Aquí está la parte donde más dinero se gana o se pierde. El mismo
        combustible puede costar muy distinto según dónde repostes. Entre una
        estación cara de marca en autopista y una{" "}
        <Link href="/guias/gasolineras-low-cost">gasolinera low cost</Link> o de
        supermercado es donde se concentra esa diferencia de precio.
      </p>
      <p>
        Y esa diferencia no es de calidad: todo el carburante que se vende en
        España cumple la misma norma, venga de una marca premium o de una
        automática sin personal. Lo que cambia es el modelo de negocio de cada
        estación, no lo que sale por el surtidor.
      </p>
      <p>
        Las más caras suelen ser las de autopista y las de marca en zonas de paso
        sin competencia cerca; las más baratas, las de supermercado, las
        cooperativas y las automáticas en polígonos. Si quieres ver el detalle de
        cuánto se recupera comparando, lo cuantificamos en{" "}
        <Link href="/guias/cuanto-se-ahorra-comparando-gasolineras">
          cuánto se ahorra comparando gasolineras
        </Link>
        .
      </p>

      <Callout type="note" title="Desviarte un poco puede compensar (o no)">
        Una gasolinera más barata a 2-3 minutos de tu ruta casi siempre
        compensa. Pero desviarte 15 minutos para ahorrar 3 euros no sale a
        cuenta si sumas el combustible y el tiempo del desvío. La regla práctica:
        compara primero y elige la más barata que ya te pille de paso.
      </Callout>

      <h2 id="cuanto-al-ano">Cuánto gastas al año</h2>
      <p>
        Como referencia, un conductor típico en España puede gastar alrededor de{" "}
        <strong>1.100-1.400 € al año</strong> en combustible, aunque la cifra
        depende mucho de los kilómetros que hagas, del consumo de tu coche y del
        precio que pagues por litro. Es una estimación orientativa, no un dato
        exacto.
      </p>
      <p>
        Más allá del lleno puntual, lo que de verdad pesa en el bolsillo es ese
        gasto anual. Para estimar el tuyo necesitas tres datos: tus kilómetros al
        año, el consumo medio de tu coche y el precio por litro.
      </p>
      <ul>
        <li>
          <strong>Kilómetros al año:</strong> un conductor medio en España
          recorre en torno a 12.000-15.000 km.
        </li>
        <li>
          <strong>Consumo:</strong> un coche moderno gasta de media unos 5-7 L a
          los 100 km, según tipo y conducción.
        </li>
        <li>
          <strong>Precio:</strong> en torno a 1,55 €/L para la gasolina 95 como
          referencia (media en España, 2026).
        </li>
      </ul>
      <p>
        Con esos números sale la horquilla orientativa que comentábamos arriba.
        La buena noticia es que una parte de ese gasto es evitable: comparando
        precios y repostando siempre en las estaciones más baratas de tu zona
        puedes recortar en torno a un 5-10 % sin cambiar nada de tu vida.
        Y si además aplicas hábitos de{" "}
        <Link href="/guias/conducir-ahorrar-combustible">
          conducción eficiente
        </Link>
        , el ahorro se nota todavía más.
      </p>
      <p>
        En resumen: el precio del litro no lo controlas, pero sí controlas dónde
        repostas. Y ahí es donde está el margen real de ahorro a lo largo del
        año.
      </p>

      <AppCta
        title="Calcula tu lleno con precios reales"
        body="En Carburantes ves el precio actualizado de cada gasolinera cercana, ordenadas por la más barata. Pulsa «Cerca de mí» o busca tu municipio y compara antes de repostar."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/cuanto-se-ahorra-comparando-gasolineras", label: "Cuánto se ahorra comparando" },
          { href: "/guias/calcular-coste-combustible-viaje", label: "Calcular el coste de un viaje" },
          { href: "/guias/gasolineras-low-cost", label: "Gasolineras low cost" },
        ]}
      />
    </>
  );
}

export default guide;
