import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "gasolineras-low-cost";
const title = "Gasolineras low cost en España: ¿es igual de buena la gasolina?";
const description =
  "Ballenoil, Plenoil, Petroprix y otras low cost venden hasta 15 céntimos más barato. Te contamos por qué y si la calidad del combustible cambia.";

const guide = {
  slug,
  title,
  // SEO title más corto: el H1 de la página puede ser largo, pero el <title>
  // del navegador conviene bajarlo de 60 chars para no recortarse en Google.
  seoTitle: "Gasolineras low cost: ¿el combustible es igual? · Guía",
  description,
  category: "ahorro",
  datePublished: "2026-05-25",
  dateModified: "2026-05-25",
  readingMinutes: 7,
  keywords: [
    "gasolineras low cost",
    "Ballenoil",
    "Plenoil",
    "Petroprix",
    "gasolineras baratas",
    "gasolineras desatendidas",
    "calidad combustible low cost",
  ],
  mentions: [
    { "@type": "Organization", name: "Ballenoil" },
    { "@type": "Organization", name: "Plenoil" },
    { "@type": "Organization", name: "Petroprix" },
    { "@type": "Organization", name: "Repsol" },
    { "@type": "Organization", name: "Cepsa" },
  ],
  faq: [
    {
      q: "¿La gasolina de las low cost es de peor calidad?",
      a: "No. Por ley, todo el carburante vendido en España debe cumplir las normas europeas EN 228 (gasolina) y EN 590 (diésel). Las low cost compran a las mismas refinerías que las grandes petroleras y el combustible es químicamente idéntico al de Repsol, Cepsa o BP.",
    },
    {
      q: "¿Por qué son hasta 15 céntimos más baratas?",
      a: "Tres motivos: (1) son desatendidas (sin personal en el surtidor, lo que ahorra ~3-4 céntimos/L en costes laborales), (2) no pagan royalties de marca a las grandes petroleras y (3) suelen tener una sola instalación sencilla sin tienda, túnel de lavado ni cafetería.",
    },
    {
      q: "¿Puedo pagar en efectivo en una low cost?",
      a: "Por norma general no. Casi todas las estaciones desatendidas funcionan solo con tarjeta o app propia. Algunas Ballenoil y Petroprix tienen cajeros que aceptan billetes, pero la opción más cómoda es la tarjeta bancaria contactless directamente en el surtidor.",
    },
    {
      q: "¿Mi seguro cubre repostar mal combustible en una low cost?",
      a: "Sí, igual que en cualquier otra gasolinera. El error humano de poner diésel en un coche de gasolina (o viceversa) lo cubre el seguro a todo riesgo y muchos seguros de terceros con cláusula específica. La marca de la estación no influye en la cobertura.",
    },
    {
      q: "¿Dañará mi coche repostar siempre en low cost?",
      a: "No hay ningún estudio independiente que lo demuestre. Los aditivos diferenciales que algunas marcas premium publicitan (mejor limpieza de inyectores, etc.) suponen una mejora marginal y, en cualquier caso, repostar un par de veces al año un combustible premium consigue el mismo efecto que hacerlo siempre.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Las gasolineras low cost (Ballenoil, Plenoil, Petroprix, EasyGas)
        venden el mismo combustible que Repsol, Cepsa o BP: por ley toda la
        gasolina y diésel vendidos en España cumplen las mismas normas europeas
        EN 228 y EN 590. La diferencia de hasta 15 céntimos por litro viene de
        no tener personal en el surtidor, de no pagar licencia de marca y de
        operar con instalaciones más simples — no de una calidad inferior.
      </Answer>

      <Tldr
        items={[
          "Mismo combustible: todas las gasolineras españolas se abastecen de las mismas refinerías y cumplen EN 228/EN 590.",
          "Hasta 15 céntimos más barato por litro = 7-12 € de ahorro por depósito.",
          "Son desatendidas: pago con tarjeta o app, sin tienda.",
          "Tu coche y tu seguro funcionan exactamente igual.",
        ]}
      />

      <h2 id="que-son">Qué es una gasolinera low cost</h2>
      <p>
        Una gasolinera «low cost» en España es una estación de servicio que
        opera con un modelo de negocio simplificado: sin personal en el
        surtidor (modelo desatendido), sin tienda, sin túnel de lavado y, casi
        siempre, sin pertenecer a una gran petrolera. El cliente paga
        directamente en el surtidor con tarjeta bancaria o con una app propia,
        y la estación se limita a vender combustible.
      </p>
      <p>
        Las principales cadenas low cost en España son{" "}
        <Link href="/marca/ballenoil">Ballenoil</Link>,{" "}
        <Link href="/marca/plenoil">Plenoil</Link>,{" "}
        <Link href="/marca/petroprix">Petroprix</Link> y{" "}
        <Link href="/marca/easygas">EasyGas</Link>. A ellas se suman las
        estaciones de hipermercados como{" "}
        <Link href="/marca/carrefour">Carrefour</Link>,{" "}
        <Link href="/marca/alcampo">Alcampo</Link>,{" "}
        <Link href="/marca/eroski">Eroski</Link> y{" "}
        <Link href="/marca/bonarea">BonÀrea</Link>, que también compiten en
        precio aunque suelen tener personal y horarios más restringidos.
      </p>

      <h2 id="por-que-baratas">Por qué son tan baratas</h2>
      <p>
        La diferencia de precio se explica por la estructura de costes, no por
        el producto. Una estación tradicional con personal, tienda y marca
        importante tiene unos costes operativos de entre <strong>4 y 7
        céntimos por litro</strong> superiores a una desatendida. A eso se
        suman los royalties por usar la marca y los aditivos diferenciales que
        algunas petroleras incorporan a sus gamas premium.
      </p>

      <CompareTable
        caption="Estructura aproximada de costes por litro vendido"
        headers={["Concepto", "Estación tradicional", "Low cost desatendida"]}
        rows={[
          ["Personal (atención surtidor + tienda)", "~3-4 céntimos", "0 céntimos"],
          ["Licencia de marca / royalties", "1-3 céntimos", "0 céntimos"],
          ["Aditivos premium", "1-2 céntimos", "0 céntimos"],
          ["Servicios accesorios (lavado, café)", "~1 céntimo", "0 céntimos"],
          ["Margen comercial neto", "5-8 céntimos", "3-5 céntimos"],
        ]}
      />

      <p>
        Suma todo eso y resulta una diferencia real de 8 a 15 céntimos por
        litro entre una low cost y una marca premium en la misma zona. En un
        depósito de 55 litros, eso significa entre <strong>4 y 8 €
        ahorrados</strong> en cada repostaje completo.
      </p>

      <h2 id="calidad-combustible">¿Es la misma calidad de combustible?</h2>
      <p>
        Sí. España importa la mayoría del crudo y lo refina principalmente en
        las refinerías de Cartagena, Tarragona, Castellón, Huelva, Bilbao y
        Coruña. Repsol, Cepsa, BP y las low cost compran el combustible base
        en esas mismas refinerías. Una vez sale de la refinería, todo cumple
        obligatoriamente con dos normas europeas:
      </p>
      <ul>
        <li>
          <strong>EN 228</strong>: especifica todos los parámetros físico-químicos
          que debe cumplir la gasolina sin plomo (octanaje, contenido de azufre,
          benceno, bioetanol, etc.).
        </li>
        <li>
          <strong>EN 590</strong>: hace lo propio para el diésel de automoción
          (cetanaje, contenido de azufre, FAME / biodiésel, viscosidad).
        </li>
      </ul>
      <p>
        La única diferencia química real entre el combustible de una low cost
        y el de una premium son los <em>aditivos detergentes</em> que algunas
        marcas añaden a sus gamas top (Repsol Efitec+, Cepsa Óptima, BP
        Ultimate, etc.). Estos aditivos pueden ofrecer una limpieza marginal
        del sistema de inyección, pero la propia industria reconoce que el
        impacto en el consumo y la durabilidad del motor es muy pequeño en un
        coche moderno bien mantenido.
      </p>

      <Callout type="info" title="¿Quieres lo mejor de ambos mundos?">
        Reposta el 90% del tiempo en low cost y, una o dos veces al año, mete
        un depósito de gasolina o diésel premium con aditivos. Para efectos
        prácticos consigues la limpieza de los aditivos sin pagar el extra
        cada lleno.
      </Callout>

      <h2 id="modelo-desatendido">El modelo desatendido: cómo funciona</h2>
      <p>
        La primera vez que repostas en una low cost puede resultar extraño no
        tener a nadie. El flujo es siempre el mismo:
      </p>
      <ol>
        <li>Aparcas al lado del surtidor que prefieras.</li>
        <li>
          Insertas la tarjeta bancaria contactless en el lector del propio
          surtidor (o pasas el móvil con Apple Pay / Google Pay).
        </li>
        <li>
          Eliges el combustible y, en algunas, un importe máximo (por ejemplo
          50 €). Si pides «full», se preautorizan unos 150 € y se ajusta al
          final.
        </li>
        <li>Repostas hasta que el surtidor se detenga.</li>
        <li>
          Cuelgas la pistola: el ticket sale por la pantalla o se envía por
          email/app.
        </li>
      </ol>
      <p>
        En estaciones más antiguas hay un cajero central donde se hace el pago
        antes de repostar; en las nuevas (Ballenoil, Plenoil) todo está en el
        propio surtidor. Casi ninguna acepta efectivo: si lo necesitas, busca
        una con cajero (la app{" "}
        <Link href="/cerca">Carburantes</Link> indica el horario, pero no
        siempre el medio de pago — consulta la web de la marca).
      </p>

      <h2 id="cuando-no-low-cost">Cuándo NO conviene una low cost</h2>
      <p>
        Aunque el ahorro es real, hay situaciones donde una estación tradicional
        compensa:
      </p>
      <ul>
        <li>
          <strong>Necesitas ayuda</strong>: si tienes movilidad reducida o vas a
          repostar por primera vez en una desatendida, las tradicionales con
          personal son más cómodas.
        </li>
        <li>
          <strong>No tienes tarjeta</strong>: muy poco común hoy, pero ocurre.
        </li>
        <li>
          <strong>Necesitas otros servicios</strong>: AdBlue, aire para los
          neumáticos, agua, lavado, cafetería, baño. Muchas low cost solo
          tienen el surtidor.
        </li>
        <li>
          <strong>Viajas por autopista de noche</strong>: las desatendidas en
          carretera son menos frecuentes; las áreas de servicio tradicionales
          siguen siendo la opción habitual.
        </li>
      </ul>

      <AppCta
        title="Encuentra la low cost más barata cerca"
        body="Pulsa 'Cerca de mí' o busca tu municipio para ver el precio actualizado de cada estación, ordenado de menor a mayor."
        href="/cerca"
        linkLabel="Ver gasolineras cerca"
      />

      <InternalLinks
        title="Marcas low cost en España"
        links={[
          { href: "/marca/ballenoil", label: "Gasolineras Ballenoil" },
          { href: "/marca/plenoil", label: "Gasolineras Plenoil" },
          { href: "/marca/petroprix", label: "Gasolineras Petroprix" },
          { href: "/marca/easygas", label: "Gasolineras EasyGas" },
          { href: "/marca/carrefour", label: "Carrefour (hipermercado)" },
          { href: "/marca/alcampo", label: "Alcampo (hipermercado)" },
          { href: "/marca/bonarea", label: "BonÀrea" },
        ]}
      />
    </>
  );
}

export default guide;
