import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "coche-diesel-o-gasolina";
const title = "¿Comprar coche diésel o gasolina en 2026? Pros, contras y números";
const description =
  "Diésel, gasolina, GLP, híbrido o eléctrico: qué te conviene en 2026 según kilometraje, ciudad, precio del combustible y normativa de ZBE.";

const guide = {
  slug,
  title,
  seoTitle: "Coche diésel o gasolina en 2026: qué comprar · Guía",
  description,
  category: "practico",
  datePublished: "2026-05-25",
  dateModified: "2026-05-25",
  readingMinutes: 8,
  keywords: [
    "comprar coche diésel o gasolina 2026",
    "qué coche comprar combustible",
    "diésel sigue mereciendo la pena",
    "híbrido vs gasolina",
    "coche eléctrico vs diésel coste",
  ],
  mentions: [
    { "@type": "Thing", name: "Coche diésel" },
    { "@type": "Thing", name: "Coche gasolina" },
    { "@type": "Thing", name: "Coche híbrido" },
    { "@type": "Thing", name: "Coche eléctrico" },
  ],
  faq: [
    {
      q: "¿Sigue mereciendo la pena un diésel en 2026?",
      a: "Solo para conductores de más de 20.000 km/año, mayoritariamente por autopista, sin restricciones de ZBE estrictas en su ciudad. Para usuarios urbanos de menos de 15.000 km/año, gasolina o híbrido suelen ser mejor opción por coste total y por etiqueta DGT (los diéseles Euro 6 son etiqueta C, no ECO).",
    },
    {
      q: "¿Un híbrido recupera el sobreprecio frente a gasolina?",
      a: "Depende del uso. En conductor urbano de 12.000-15.000 km/año, sí: el ahorro de combustible (~1,5 L/100 km) + etiqueta ECO + valor de reventa más alto suelen compensar el sobrecoste inicial de 2.000-4.000 €. En autopista a 120 km/h el híbrido no aporta tanto ahorro y se acerca a un gasolina equivalente.",
    },
    {
      q: "¿Qué etiqueta DGT tiene cada tipo?",
      a: "Eléctricos puros y enchufables >40 km: etiqueta 0 (azul). Híbridos no enchufables, GLP, GNC: ECO. Gasolinas Euro 4+ y diéseles Euro 6: C. Diéseles Euro 4-5: B. Te lo desglosamos en nuestra guía de etiquetas.",
    },
    {
      q: "¿Es mejor un GLP que un híbrido?",
      a: "Por inversión inicial, sí: convertir un coche de gasolina a GLP cuesta 1.500-2.500 €, frente a 2.500-5.000 € de sobreprecio de un híbrido. Por refinamiento y consumo en ciudad, el híbrido gana. Por autonomía total (gasolina + GLP), el GLP gana. Depende del perfil.",
    },
    {
      q: "¿Cuándo dejará de venderse el diésel en España?",
      a: "La UE prohibirá la venta de coches nuevos con motor de combustión a partir de 2035. Los diéseles y gasolinas existentes podrán seguir circulando indefinidamente (con las restricciones que cada ciudad imponga en sus ZBE). El mercado de segunda mano de combustión seguirá activo durante décadas.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        En 2026, la elección razonable es:{" "}
        <strong>gasolina o híbrido</strong> para conductores urbanos de
        menos de 15.000 km/año, <strong>diésel</strong> solo para
        conductores intensivos de más de 20.000 km/año mayoritariamente
        por autopista, <strong>GLP</strong> como alternativa económica
        con etiqueta ECO, y <strong>eléctrico</strong> si tienes
        posibilidad de cargar en casa o trabajo y haces menos de 200
        km/día.
      </Answer>

      <Tldr
        items={[
          "<15.000 km/año en ciudad: gasolina o híbrido.",
          ">20.000 km/año en autopista: diésel sigue siendo más rentable.",
          "Vives en ciudad con ZBE estricta: ECO mínimo (híbrido o GLP).",
          "Tienes garaje con enchufe: eléctrico (en uso urbano-periurbano).",
        ]}
      />

      <h2 id="contexto-2026">El contexto en 2026</h2>
      <p>
        El panorama del automóvil ha cambiado mucho en cinco años. Cuatro
        factores condicionan la decisión más que nunca:
      </p>
      <ul>
        <li>
          <strong>ZBE (Zonas de Bajas Emisiones)</strong>: obligatorias en
          municipios de más de 50.000 habitantes desde 2023. La etiqueta
          DGT determina dónde y cuándo puedes circular.
        </li>
        <li>
          <strong>Prohibición europea de combustión en 2035</strong>: solo
          afecta a coches NUEVOS. Los existentes podrán seguir circulando
          (sin matriculación nueva equivalente).
        </li>
        <li>
          <strong>Precios del crudo volátiles</strong>: gasolina y diésel
          fluctúan ±20 % al año por geopolítica.
        </li>
        <li>
          <strong>Madurez del coche eléctrico</strong>: autonomía real de
          400-500 km en utilitarios accesibles, infraestructura de carga
          en expansión.
        </li>
      </ul>

      <h2 id="comparativa">Comparativa por kilometraje anual</h2>
      <p>
        El coste total de propiedad (TCO) integra precio de compra,
        combustible, impuestos, seguro, mantenimiento y depreciación.
        Hagamos números para un coche compacto medio en España (2026):
      </p>

      <CompareTable
        caption="Coste por kilómetro estimado (5 años, todo incluido)"
        headers={["Tipo", "Precio compra", "10.000 km/año", "15.000 km/año", "25.000 km/año"]}
        rows={[
          ["Gasolina", "21.000 €", "0,32 €/km", "0,26 €/km", "0,22 €/km"],
          ["Diésel", "23.000 €", "0,34 €/km", "0,27 €/km", "0,21 €/km"],
          ["GLP bi-fuel", "22.500 €", "0,30 €/km", "0,24 €/km", "0,20 €/km"],
          ["Híbrido (HEV)", "24.000 €", "0,30 €/km", "0,25 €/km", "0,21 €/km"],
          ["Enchufable (PHEV)", "32.000 €", "0,38 €/km", "0,30 €/km", "0,24 €/km"],
          ["Eléctrico (BEV)", "30.000 €", "0,29 €/km", "0,22 €/km", "0,18 €/km"],
        ]}
      />

      <p>
        Cifras orientativas, suponiendo coches comparables y depreciación
        media nacional. Las conclusiones:
      </p>
      <ul>
        <li>
          <strong>Por debajo de 12.000 km/año</strong>: la gasolina es
          competitiva. El sobrecoste del diésel no se amortiza.
        </li>
        <li>
          <strong>Entre 12.000 y 20.000 km/año</strong>: híbrido o GLP
          son las opciones más equilibradas (consumo bajo + etiqueta ECO).
        </li>
        <li>
          <strong>Por encima de 20.000 km/año, mayoritariamente
          autopista</strong>: el diésel sigue siendo la opción más
          eficiente por consumo y autonomía.
        </li>
        <li>
          <strong>Eléctrico</strong>: gana en TCO si tienes cómo cargar
          en casa o trabajo a precio bajo (~0,10 €/kWh nocturno).
        </li>
      </ul>

      <h2 id="diesel-cuando">Cuándo todavía conviene un diésel</h2>
      <p>
        El diésel no está muerto, pero su perfil de uso se ha estrechado
        mucho. Conviene si cumples al menos dos de estos:
      </p>
      <ul>
        <li>
          Haces más de 20.000-25.000 km al año.
        </li>
        <li>Más del 70 % de los kilómetros son por autopista o nacional.</li>
        <li>
          Vives en una ciudad sin ZBE estricta o tienes garaje con
          permiso de circulación.
        </li>
        <li>
          Vas a conservar el coche más de 5 años (amortizar el sobrecoste
          inicial).
        </li>
      </ul>
      <p>
        Pega importante: el diésel Euro 6 obtiene <em>etiqueta C</em>,
        no ECO. En Madrid, Barcelona y otras ciudades con ZBE en
        evolución, los diéseles Euro 6 podrían tener restricciones
        crecientes a partir de 2027-2030. Si tu ciudad va por ese
        camino, valora muy bien la compra de un diésel nuevo en 2026.
      </p>

      <h2 id="gasolina-cuando">Gasolina: la opción por defecto</h2>
      <p>
        Para conductores urbanos de bajo y medio kilometraje, la
        gasolina es la opción razonable por defecto:
      </p>
      <ul>
        <li>Precio de compra menor que diésel, híbrido o eléctrico.</li>
        <li>Mantenimiento más barato (no DPF, no AdBlue, no inyectores costosos).</li>
        <li>Mecánicamente más simple y fiable a largo plazo.</li>
        <li>Etiqueta DGT C en modelos desde 2006 (acceso libre a la mayoría de ZBE actuales).</li>
      </ul>
      <p>
        Los inconvenientes: consumo mayor que diésel, autonomía menor,
        sin etiqueta ECO.
      </p>

      <h2 id="hibrido-cuando">Híbrido: la mejor relación coste/etiqueta</h2>
      <p>
        Un híbrido no enchufable (HEV) — el típico Toyota Yaris, Corolla,
        Hyundai Ioniq HEV — combina motor de gasolina con uno eléctrico
        pequeño que recupera energía en frenadas y asiste en
        aceleraciones. Sus ventajas:
      </p>
      <ul>
        <li>Consumo en ciudad ~30 % menor que gasolina equivalente.</li>
        <li>Etiqueta ECO automática (acceso ZBE).</li>
        <li>Sin necesidad de enchufar.</li>
        <li>Valor de reventa más alto que gasolinas equivalentes.</li>
      </ul>
      <p>
        Inconvenientes: sobrecoste de compra (2.000-4.000 € más que
        gasolina equivalente) y en autopista a 120 km/h el ahorro de
        consumo se reduce mucho. Compensa claramente para usuarios
        urbanos de 12-18.000 km/año.
      </p>

      <h2 id="glp-cuando">GLP: la alternativa económica</h2>
      <p>
        El GLP (autogas) tiene la mejor relación entre coste de compra
        y etiqueta ECO. Detalles completos en{" "}
        <Link href="/guias/glp-autogas-espana">la guía dedicada</Link>,
        pero en resumen:
      </p>
      <ul>
        <li>Combustible ~50 % más barato que gasolina.</li>
        <li>Conversión bi-fuel: 1.500-2.500 € sobre coche de gasolina.</li>
        <li>Etiqueta ECO automática.</li>
        <li>Red limitada de gasolineras (~800-900 en España).</li>
      </ul>

      <h2 id="electrico-cuando">Eléctrico: cuándo da el salto</h2>
      <p>
        El coche eléctrico (BEV) gana terreno cada año. Compensa si
        cumples al menos dos:
      </p>
      <ul>
        <li>
          Tienes garaje propio o aparcamiento de empresa con enchufe
          (carga a 0,08-0,12 €/kWh).
        </li>
        <li>El 90 % de tus desplazamientos diarios son inferiores a 200 km.</li>
        <li>
          Vives en una ciudad con ZBE estricta y aparcamiento regulado
          (los eléctricos suelen tener exención o descuento).
        </li>
        <li>
          Tu presupuesto inicial puede asumir +5.000-10.000 € respecto
          a un gasolina equivalente (que recuperas en 5-7 años).
        </li>
      </ul>
      <p>
        Sin enchufe propio y haciendo muchos viajes largos por zonas
        rurales con red de carga escasa, el eléctrico aún supone
        sacrificios prácticos importantes en 2026.
      </p>

      <Callout type="info" title="Decisión rápida en una frase">
        <strong>Urbano poco kilometraje</strong>: gasolina o híbrido.{" "}
        <strong>Urbano con ZBE estricta y enchufe en casa</strong>:
        eléctrico. <strong>Mixto urbano-interurbano alto kilometraje
        con poca ZBE</strong>: diésel todavía válido. <strong>Quieres
        etiqueta ECO con poca inversión</strong>: GLP.
      </Callout>

      <AppCta
        title="Cualquiera que sea tu elección, compara precios"
        body="Carburantes muestra precios de gasolina, diésel, GLP, AdBlue y GNC actualizados del Ministerio. Filtra por tu combustible favorito y ordena por precio."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Más para tu decisión de compra"
        links={[
          { href: "/guias/etiqueta-dgt-combustible", label: "Etiqueta DGT por combustible y año" },
          { href: "/guias/glp-autogas-espana", label: "GLP autogas: precio y red" },
          { href: "/guias/diesel-a-vs-premium", label: "Diésel A, premium, B y C" },
          { href: "/guias/gasolina-95-vs-98", label: "Gasolina 95 vs 98" },
          { href: "/guias/conducir-ahorrar-combustible", label: "Conducir para ahorrar combustible" },
        ]}
      />
    </>
  );
}

export default guide;
