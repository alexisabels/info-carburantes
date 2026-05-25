import Link from "next/link";
import { buildMetadata, jsonLdBreadcrumb, jsonLdFAQ } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Preguntas frecuentes sobre precios de carburantes · Carburantes",
  description:
    "Resolvemos las dudas más habituales sobre precios de gasolina y diésel, horarios, marcas y descuentos en España.",
  path: "/preguntas-frecuentes",
});

// Cada par {q, a} acaba en el JSON-LD FAQPage y, además, se renderiza en
// la página como <h2>+<p>. Google premia que el mismo contenido viva en
// schema Y en HTML: si solo está en el schema lo trata como ilegítimo.
//
// El campo `guide` es opcional: si está, renderizamos un enlace a la guía
// completa correspondiente bajo cada respuesta. Esto distribuye PageRank
// internamente al cluster /guias y reduce el bounce rate de quien busca
// más profundidad.
const FAQS = [
  {
    q: "¿Cada cuánto se actualizan los precios?",
    a: "El Ministerio para la Transición Ecológica recibe los precios de las propias estaciones de servicio y los publica varias veces al día (aproximadamente cada media hora durante el horario laboral). Carburantes lee directamente esa fuente, así que verás siempre el último valor declarado.",
    guide: { href: "/guias/como-se-forma-precio-gasolina", label: "Cómo se forma el precio de la gasolina en España" },
  },
  {
    q: "¿Los precios incluyen IVA y descuentos?",
    a: "Sí. El precio que muestra el Ministerio es el precio final por litro en surtidor, IVA incluido. No descuenta promociones puntuales de tarjetas de fidelidad ni descuentos para clientes profesionales; solo el precio público.",
    guide: { href: "/guias/descuentos-tarjetas-gasolineras", label: "Descuentos con tarjetas y apps de fidelización" },
  },
  {
    q: "¿Por qué el precio de la app no coincide con el del surtidor?",
    a: "Pueden pasar varias horas entre que la gasolinera cambia el precio y lo comunica al Ministerio. Por eso, antes de repostar, conviene verificar el precio en el cartel exterior. La app es una guía muy fiable para comparar pero no sustituye al precio en el momento.",
    guide: { href: "/guias/mejor-hora-dia-repostar", label: "Mejor día y hora para repostar" },
  },
  {
    q: "¿Qué diferencia hay entre Diésel A, Diésel + y los gasóleos B y C?",
    a: "Diésel A es el gasóleo de automoción estándar para coches. Diésel + (o Premium) es la misma base con aditivos limpiadores que algunas marcas venden a un precio superior. Gasóleo B y C son combustibles agrícolas e industriales no aptos para vehículos de carretera, y por tanto no aparecen en la app.",
    guide: { href: "/guias/diesel-a-vs-premium", label: "Diésel A, premium, B y C: diferencias" },
  },
  {
    q: "¿Y la Gasolina 95 E5, 95 E10 y 98 E5?",
    a: "El número (95 o 98) indica el octanaje. La 'E5' o 'E10' indica el porcentaje máximo de bioetanol mezclado (5% o 10%). La E10 se está implantando progresivamente en Europa y es compatible con la mayoría de coches de gasolina fabricados desde 2011. Si tienes dudas, consulta el manual del fabricante.",
    guide: { href: "/guias/bioetanol-e5-vs-e10", label: "Gasolina E5 vs E10: compatibilidad" },
  },
  {
    q: "¿Por qué hay gasolineras 'restringidas'?",
    a: "Algunas estaciones son de acceso limitado: solo abastecen a cooperativas, flotas profesionales o empresas con tarjeta corporativa. La app las muestra con la etiqueta 'Restringida' y, por defecto, las filtra fuera del listado público.",
  },
  {
    q: "¿Cuál es la gasolinera más barata cerca de mí?",
    a: "Pulsa 'Cerca de mí' en la home: la app pide tu ubicación (no se envía a ningún servidor, solo se usa en tu dispositivo), busca las 50 estaciones más cercanas y las ordena por precio del combustible que hayas seleccionado.",
    guide: { href: "/guias/gasolineras-low-cost", label: "Gasolineras low cost: ¿calidad igual?" },
  },
  {
    q: "¿La app guarda mis datos o mi ubicación?",
    a: "No. No hay cuentas, ni cookies de seguimiento, ni analítica de terceros. La ubicación, si la usas, queda en el dispositivo. Tus gasolineras favoritas se guardan en el almacenamiento local del navegador.",
  },
  {
    q: "¿Por qué las gasolineras 'low cost' como Ballenoil o Plenoil son más baratas?",
    a: "Suelen operar como estaciones desatendidas (sin personal en el surtidor, pago con tarjeta o app), tienen menos gastos operativos y no pagan licencias de marca de las grandes petroleras. Esa estructura de costes inferior les permite vender más barato sin que la calidad del combustible cambie: por ley, todo el carburante vendido en España debe cumplir las mismas normas europeas.",
    guide: { href: "/guias/gasolineras-low-cost", label: "Guía completa de gasolineras low cost" },
  },
  {
    q: "¿Cuál es la mejor hora para repostar?",
    a: "El precio en surtidor es el mismo durante todo el día, pero los miércoles y jueves suelen ser los días con tarifas algo más bajas según los estudios de organizaciones de consumidores. Evita repostar los viernes por la tarde y festivos: la demanda dispara los precios el resto del fin de semana.",
    guide: { href: "/guias/mejor-hora-dia-repostar", label: "Mejor día y hora para repostar" },
  },
  {
    q: "¿Qué es el AdBlue y cuándo hay que rellenarlo?",
    a: "El AdBlue es una solución de urea al 32,5% que los coches diésel modernos inyectan en el escape para reducir emisiones. Se rellena en una tapa secundaria junto a la del diésel y un coche consume aproximadamente 1 litro cada 1.000-1.500 km. Si te quedas sin AdBlue, el coche no arrancará tras el siguiente apagado.",
    guide: { href: "/guias/que-es-el-adblue", label: "Guía completa del AdBlue" },
  },
  {
    q: "¿Por qué los coches GLP llevan etiqueta ECO?",
    a: "Porque el GLP (autogas) tiene menos emisiones de NOx y partículas que el diésel, y su CO₂ es ~10% inferior al de la gasolina. La DGT otorga etiqueta ECO a todos los coches GLP o GNC bi-fuel que cumplan al menos la norma Euro 4, lo que permite acceso libre a las Zonas de Bajas Emisiones de Madrid, Barcelona, Valencia y otras ciudades.",
    guide: { href: "/guias/glp-autogas-espana", label: "GLP autogas en España: precio y red" },
  },
];

export default function FAQPage() {
  const breadcrumbJsonLd = jsonLdBreadcrumb([
    { name: "Inicio", url: "/" },
    { name: "Preguntas frecuentes", url: "/preguntas-frecuentes" },
  ]);
  const faqJsonLd = jsonLdFAQ(FAQS);

  return (
    <main id="main" className="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="faq__head">
        <h1 className="faq__title">Preguntas frecuentes</h1>
        <p className="faq__lede">
          Lo que más nos preguntáis sobre precios de carburantes, marcas y el
          funcionamiento de la app. Para profundizar en cualquier tema,
          tenemos <Link href="/guias">guías completas en esta sección</Link>.
        </p>
      </header>

      <div className="faq__list">
        {FAQS.map((it, idx) => (
          <article key={idx} className="faq__item">
            <h2 className="faq__q">{it.q}</h2>
            <p className="faq__a">{it.a}</p>
            {it.guide && (
              <p className="faq__more">
                Leer más:{" "}
                <Link href={it.guide.href}>{it.guide.label}</Link>
              </p>
            )}
          </article>
        ))}
      </div>

      <footer className="faq__foot">
        <p>
          ¿Te falta una pregunta? Puedes proponerla en{" "}
          <a
            href="https://github.com/alexisabels/info-carburantes/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
        <p>
          Volver al <Link href="/">inicio</Link> · Ver{" "}
          <Link href="/guias">todas las guías</Link> · Ver el{" "}
          <Link href="/mapa-del-sitio">mapa del sitio</Link>.
        </p>
      </footer>
    </main>
  );
}
