import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "etiqueta-dgt-combustible";
const title = "Etiqueta DGT y combustible: qué pegatina te corresponde y por qué";
const description =
  "Etiquetas 0, ECO, C, B y A: te explicamos cuál se asigna según tipo de combustible y año del coche, y dónde puede o no entrar cada una en España.";

const guide = {
  slug,
  title,
  seoTitle: "Etiqueta DGT por combustible: 0, ECO, C, B · Guía",
  description,
  category: "practico",
  datePublished: "2026-05-25",
  dateModified: "2026-05-25",
  readingMinutes: 6,
  keywords: [
    "etiqueta DGT combustible",
    "etiqueta ECO diésel",
    "etiqueta cero coche eléctrico",
    "etiqueta C qué coches",
    "ZBE Madrid Barcelona",
  ],
  mentions: [
    { "@type": "Thing", name: "Etiqueta ambiental DGT" },
    { "@type": "Thing", name: "Zona de Bajas Emisiones" },
  ],
  faq: [
    {
      q: "¿Qué etiqueta DGT tiene un diésel de 2020?",
      a: "Etiqueta C si cumple norma Euro 6 (la mayoría de diéseles matriculados desde septiembre 2015). La etiqueta C permite la circulación libre por las ZBE actuales, aunque con restricciones progresivas previstas en muchas ciudades.",
    },
    {
      q: "¿Por qué los GLP e híbridos llevan etiqueta ECO y los diésel Euro 6 no?",
      a: "La DGT clasifica según emisiones reales y capacidad de funcionar parcialmente con energía baja en emisiones. Los GLP/GNC tienen menos NOx y partículas que un diésel; los híbridos pueden circular eléctricos a baja velocidad. Por eso obtienen ECO mientras un diésel Euro 6 se queda en C.",
    },
    {
      q: "¿Mi coche sin etiqueta puede entrar en Madrid?",
      a: "Depende. En la Almendra Central (Madrid Central) y otras ZBE de Madrid los coches sin etiqueta tienen restricciones progresivas. Los empadronados en la propia zona suelen tener permisos especiales. Consulta siempre la web del ayuntamiento concreto antes de circular.",
    },
    {
      q: "¿Cómo consigo la pegatina física?",
      a: "Se compra en Correos (5 €), en concesionarios o talleres adheridos, y en algunas gestorías. La DGT no obliga a llevarla en el cristal pero sí a tener asignada la categoría correspondiente en su base de datos, que es lo que consultan las cámaras de las ZBE.",
    },
    {
      q: "¿Hay etiqueta para coches con conversión a GLP?",
      a: "Sí. Un coche de gasolina convertido a bi-fuel GLP obtiene etiqueta ECO igual que un coche GLP de fábrica, siempre que la conversión esté homologada y el coche cumpla mínimo norma Euro 4.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        La DGT clasifica los coches en cinco categorías según sus emisiones:{" "}
        <strong>0 (azul)</strong> para eléctricos puros e híbridos enchufables
        con &gt;40 km de autonomía eléctrica;{" "}
        <strong>ECO (verde y azul)</strong> para híbridos no enchufables, GLP,
        GNC y enchufables &lt;40 km;{" "}
        <strong>C (verde)</strong> para gasolinas Euro 4 o superior y diéseles
        Euro 6; <strong>B (amarilla)</strong> para gasolinas Euro 3 y diéseles
        Euro 4-5; y <strong>sin etiqueta</strong> para anteriores. La etiqueta
        determina dónde puede circular el coche en las Zonas de Bajas Emisiones.
      </Answer>

      <Tldr
        items={[
          "5 categorías: 0, ECO, C, B y sin etiqueta.",
          "Depende del combustible Y del año de matriculación.",
          "Acceso a ZBE: 0 y ECO libres, C con restricciones progresivas, B/sin etiqueta cada vez más limitados.",
          "Coches GLP/GNC y conversiones homologadas: etiqueta ECO.",
        ]}
      />

      <h2 id="que-es">Qué es la etiqueta ambiental DGT</h2>
      <p>
        La etiqueta ambiental es un distintivo oficial creado por la
        Dirección General de Tráfico en 2016 que clasifica los vehículos
        según su impacto medioambiental. Su función principal es servir
        de criterio objetivo para las restricciones de circulación que
        cada ayuntamiento impone en sus Zonas de Bajas Emisiones (ZBE).
      </p>
      <p>
        Hay cinco categorías. Cuanto «mejor» la etiqueta, menos
        restricciones tendrás para acceder a centros urbanos, beneficios
        fiscales (impuesto de circulación, IVTM) y descuentos en
        aparcamiento regulado.
      </p>

      <h2 id="categorias">Las cinco categorías</h2>

      <h3>Etiqueta 0 (azul): eléctricos y enchufables</h3>
      <ul>
        <li>Vehículos eléctricos de batería (BEV).</li>
        <li>Vehículos eléctricos de autonomía extendida (REEV).</li>
        <li>
          Vehículos híbridos enchufables (PHEV) con más de 40 km de
          autonomía en modo eléctrico.
        </li>
        <li>Vehículos de pila de combustible (hidrógeno).</li>
      </ul>

      <h3>Etiqueta ECO (verde con franja azul)</h3>
      <ul>
        <li>Vehículos híbridos no enchufables (HEV) — Toyota Prius, etc.</li>
        <li>
          Vehículos híbridos enchufables (PHEV) con menos de 40 km de
          autonomía eléctrica.
        </li>
        <li>
          Vehículos de GLP (autogas) bi-fuel o de fábrica, mínimo Euro 4.
        </li>
        <li>Vehículos de GNC/GNL (gas natural), mínimo Euro 4.</li>
      </ul>

      <h3>Etiqueta C (verde)</h3>
      <ul>
        <li>
          <strong>Gasolina</strong>: matriculados desde enero 2006 (Euro 4 o
          superior).
        </li>
        <li>
          <strong>Diésel</strong>: matriculados desde septiembre 2015 (Euro 6).
        </li>
        <li>
          Vehículos pesados de gasolina o diésel que cumplan los estándares
          equivalentes.
        </li>
      </ul>

      <h3>Etiqueta B (amarilla)</h3>
      <ul>
        <li>
          <strong>Gasolina</strong>: matriculados entre enero 2001 y
          diciembre 2005 (Euro 3).
        </li>
        <li>
          <strong>Diésel</strong>: matriculados entre enero 2006 y agosto
          2015 (Euro 4 o Euro 5).
        </li>
      </ul>

      <h3>Sin etiqueta</h3>
      <ul>
        <li>
          <strong>Gasolina</strong>: matriculados antes de enero 2001.
        </li>
        <li>
          <strong>Diésel</strong>: matriculados antes de enero 2006.
        </li>
      </ul>

      <CompareTable
        caption="Resumen rápido por combustible y año"
        headers={["Combustible", "Antes 2001", "2001-2005", "2006-2015 (sep)", "Desde sep 2015"]}
        rows={[
          ["Gasolina", "Sin etiqueta", "B", "C", "C"],
          ["Diésel", "Sin etiqueta", "Sin etiqueta", "B", "C"],
          ["GLP / GNC (de fábrica o bi-fuel)", "Sin etiqueta", "ECO", "ECO", "ECO"],
          ["Híbrido (HEV o PHEV <40 km)", "—", "—", "ECO", "ECO"],
          ["Eléctrico puro / PHEV >40 km", "—", "—", "0", "0"],
        ]}
      />

      <h2 id="zbe">Restricciones en Zonas de Bajas Emisiones (ZBE)</h2>
      <p>
        Desde 2023 la Ley de Cambio Climático obliga a todos los
        municipios de más de 50.000 habitantes (más algunos menores) a
        establecer ZBE. Cada ayuntamiento define las restricciones, pero
        la lógica general es:
      </p>
      <ul>
        <li>
          <strong>Etiqueta 0</strong>: circulación libre por todas las ZBE,
          plaza gratuita en zonas SER en algunos ayuntamientos, ITV gratis
          en algunos casos.
        </li>
        <li>
          <strong>Etiqueta ECO</strong>: circulación libre por la mayoría
          de ZBE, descuento en SER/ORA en muchas ciudades.
        </li>
        <li>
          <strong>Etiqueta C</strong>: acceso libre en la mayoría de ZBE
          actualmente, con restricciones progresivas previstas (Madrid y
          Barcelona ya estudian limitarlas en 2027-2030).
        </li>
        <li>
          <strong>Etiqueta B</strong>: acceso restringido o prohibido en
          las ZBE de Madrid, Barcelona, Valencia, etc., salvo casos
          especiales (empadronados, vehículos comerciales con permiso).
        </li>
        <li>
          <strong>Sin etiqueta</strong>: acceso muy restringido o
          prohibido en la mayoría de ZBE.
        </li>
      </ul>

      <Callout type="info" title="ZBE de Madrid y Barcelona (resumen)">
        Madrid (Madrid 360 + Madrid Central): los coches sin etiqueta
        tienen acceso muy limitado dentro de la M-30; los B también
        están en proceso de restricción progresiva. Barcelona (ZBE
        Rondas): coches sin etiqueta no pueden circular dentro de las
        rondas en días laborables 7-20 h salvo permisos. Cada ZBE tiene
        su normativa y excepciones; consulta siempre la web del
        ayuntamiento.
      </Callout>

      <h2 id="como-conseguir">Cómo conseguir tu etiqueta</h2>
      <ul>
        <li>
          <strong>Comprar la pegatina</strong>: en oficinas de Correos
          (5 €), concesionarios, talleres adheridos o gestorías. No es
          obligatorio llevarla en el cristal, pero es buena idea para
          evitar dudas en controles.
        </li>
        <li>
          <strong>Consultar tu categoría</strong>: en la sede electrónica
          de la DGT, con la matrícula. La categoría está asignada
          automáticamente según los datos de la ficha técnica.
        </li>
        <li>
          <strong>Recategorización por conversión a GLP/GNC</strong>: si
          conviertes tu coche a bi-fuel, debes pasar una ITV específica
          y actualizar la ficha técnica para que la DGT te asigne ECO.
        </li>
      </ul>

      <h2 id="impacto-eleccion">Cómo influye la etiqueta en la elección del coche</h2>
      <p>
        Si vas a comprar coche y vives en una ciudad con ZBE estricta,
        la etiqueta debería pesar mucho en la decisión:
      </p>
      <ul>
        <li>
          Un coche eléctrico (0 azul) o híbrido enchufable PHEV te
          asegura acceso libre durante toda la vida útil del vehículo.
        </li>
        <li>
          Un coche GLP/GNC (etiqueta ECO) es la alternativa más asequible
          para garantizar acceso ZBE sin pasar al eléctrico.
        </li>
        <li>
          Un diésel Euro 6 (etiqueta C) hoy entra libremente pero, según
          municipio, puede tener problemas a partir de 2027-2030.
        </li>
        <li>
          Un coche con etiqueta B o sin etiqueta es muy difícil de
          recomendar si vives en una ciudad con ZBE actual o prevista.
        </li>
      </ul>

      <AppCta
        title="Encuentra gasolineras compatibles con tu coche"
        body="Filtra Carburantes por combustible (gasolina, diésel, GLP, AdBlue, GNC) para ver solo las estaciones útiles para tu vehículo."
        href="/"
        linkLabel="Buscar combustible"
      />

      <InternalLinks
        title="Más sobre combustible y compra"
        links={[
          { href: "/guias/glp-autogas-espana", label: "GLP autogas: precio, red y conversión" },
          { href: "/guias/coche-diesel-o-gasolina", label: "Diésel o gasolina: cuál comprar en 2026" },
          { href: "/guias/que-es-el-adblue", label: "Qué es el AdBlue" },
          { href: "/guias/diesel-a-vs-premium", label: "Diésel A, premium, B y C" },
        ]}
      />
    </>
  );
}

export default guide;
