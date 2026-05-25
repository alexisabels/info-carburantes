import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "bioetanol-e5-vs-e10";
const title = "Gasolina E5 vs E10: qué significa y si tu coche es compatible";
const description =
  "El E5 y el E10 indican el porcentaje de bioetanol. Te explicamos qué es, qué coches son compatibles con E10 y por qué Europa avanza hacia ella.";

const guide = {
  slug,
  title,
  seoTitle: "Gasolina E5 vs E10: compatibilidad · Guía Carburantes",
  description,
  category: "tipos-combustible",
  datePublished: "2026-05-25",
  dateModified: "2026-05-25",
  readingMinutes: 5,
  keywords: [
    "gasolina E5 vs E10",
    "bioetanol coche",
    "gasolina E10 compatibilidad",
    "qué es la E10",
    "diferencia E5 E10",
  ],
  mentions: [
    { "@type": "Thing", name: "Bioetanol" },
    { "@type": "Thing", name: "Gasolina 95 E10" },
  ],
  faq: [
    {
      q: "¿Es la E10 obligatoria en España?",
      a: "Aún no. La E10 está disponible en muchas estaciones de la Unión Europea y es la gasolina por defecto en países como Francia, Alemania o Bélgica desde 2019-2023. En España coexisten E5 y E10, pero la transición a E10 obligatoria está prevista a medio plazo como parte del compromiso europeo de descarbonización.",
    },
    {
      q: "¿Cómo sé si mi coche es compatible con E10?",
      a: "Mira la pegatina de la tapa del depósito. Si pone 'E10' tachado o solo 'E5', NO es compatible. Si pone 'E10' a secas, sí lo es. Como norma general, todos los coches de gasolina fabricados desde 2011 cumplen con E10; consulta la lista oficial de tu marca en caso de duda.",
    },
    {
      q: "¿Qué pasa si meto E10 en un coche solo compatible con E5?",
      a: "Un solo depósito ocasional no causa daños inmediatos en la mayoría de casos. El uso continuado sí puede deteriorar componentes del sistema de combustible (juntas, tuberías, depósito) que no estén preparados para concentraciones altas de etanol, ya que este es ligeramente corrosivo y absorbe humedad.",
    },
    {
      q: "¿La E10 da menos potencia o gasta más?",
      a: "Mínimamente. El bioetanol tiene un poder calorífico ~33 % menor que la gasolina pura, así que un 5 % adicional de etanol implica un consumo teórico ~1,6 % mayor. En la práctica, los coches modernos lo compensan y la diferencia notable suele estar por debajo del margen de error.",
    },
    {
      q: "¿Y motos, ciclomotores, cortacéspedes...?",
      a: "Muchos motores pequeños antiguos NO son compatibles con E10. Cortacéspedes, motosierras, motos clásicas, motonáutica: lee siempre el manual. Si el motor lleva carburador (en lugar de inyección), suele ser sensible a la E10 por el efecto corrosivo del etanol en juntas y diafragmas.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        El número en E5 o E10 indica el porcentaje máximo de{" "}
        <strong>bioetanol</strong> mezclado en la gasolina (5 % o 10 %). La E5
        es la habitual en España y compatible con todos los coches. La E10 es
        la nueva gasolina europea estándar desde 2011 y la mayoría de
        coches fabricados desde ese año son compatibles — pero
        siempre conviene comprobar la pegatina del depósito antes de la
        primera vez.
      </Answer>

      <Tldr
        items={[
          "El número = % máximo de bioetanol (5 o 10).",
          "E5: compatible con todos los coches. Estándar en España.",
          "E10: compatible con coches fabricados desde ~2011. Comprueba la pegatina.",
          "Diferencia de consumo: ~1,6 % más con E10 (apenas perceptible).",
        ]}
      />

      <h2 id="que-es-bioetanol">Qué es el bioetanol y por qué se mezcla con la gasolina</h2>
      <p>
        El bioetanol es alcohol etílico (el mismo del vino o el vodka, en
        términos químicos) producido a partir de biomasa: cereales,
        remolacha, caña de azúcar o residuos vegetales. Como combustible
        tiene tres características relevantes:
      </p>
      <ul>
        <li>
          <strong>Renovable y de balance neutro en CO₂</strong>: las plantas
          que se cultivan para producirlo absorbieron previamente el CO₂ que
          se libera al quemarlo.
        </li>
        <li>
          <strong>Alto octanaje</strong>: ~108 RON. Por eso al mezclarlo con
          gasolina se eleva el octanaje final ligeramente.
        </li>
        <li>
          <strong>Poder calorífico menor</strong> que la gasolina (~33 %
          menos). Para extraer la misma energía hace falta más volumen de
          mezcla.
        </li>
      </ul>
      <p>
        La Unión Europea lleva años fomentando su uso como mezcla con la
        gasolina convencional para reducir las emisiones netas de CO₂ del
        transporte. La normativa europea (Directiva 2009/30/CE y
        actualizaciones) permite hasta un 10 % de bioetanol mezclado en la
        gasolina vendida como combustible único — eso es la «E10».
      </p>

      <h2 id="e5-vs-e10">E5 vs E10: tabla comparativa</h2>
      <CompareTable
        caption="Diferencias entre E5 y E10 en España (2026)"
        headers={["Característica", "Gasolina E5", "Gasolina E10"]}
        rows={[
          ["Bioetanol máximo", "5 %", "10 %"],
          ["Disponibilidad en España", "Generalizada", "Creciente, no obligatoria aún"],
          ["Compatibilidad", "Todos los coches", "Coches desde ~2011"],
          ["Consumo relativo", "Referencia", "+1-2 % aprox."],
          ["Emisiones CO₂ ciclo completo", "Referencia", "-3-4 % aprox."],
          ["Precio en surtidor", "Estándar", "Mismo o muy similar"],
        ]}
      />

      <h2 id="es-mi-coche-compatible">¿Es mi coche compatible con E10?</h2>
      <p>
        Hay tres maneras de saberlo:
      </p>
      <ol>
        <li>
          <strong>Pegatina de la tapa del depósito</strong>: desde 2018 todos
          los coches nuevos en la UE llevan una pegatina junto a la tapa con
          un círculo y la letra «E» seguida del máximo soportado. Si pone
          «E10» (o «E5» y «E10»), tu coche acepta E10. Si solo pone «E5», o
          la pegatina tiene un círculo con «E10» tachado, NO uses E10.
        </li>
        <li>
          <strong>Manual del coche</strong>: en la sección «Combustibles»
          aparece el porcentaje máximo de bioetanol admitido.
        </li>
        <li>
          <strong>Web del fabricante</strong>: la mayoría de marcas mantienen
          una lista pública de modelos y años compatibles. Busca «[marca]
          E10 compatibilidad».
        </li>
      </ol>

      <Callout type="info" title="Regla rápida si no encuentras la pegatina">
        Coches de <strong>gasolina fabricados desde 2011</strong> en la UE
        son casi siempre compatibles con E10. Coches anteriores a 2000
        suelen NO serlo (componentes del sistema de combustible no
        diseñados para etanol). Entre 2000 y 2010, depende del modelo:
        consulta antes la web del fabricante.
      </Callout>

      <h2 id="riesgos-incompatibilidad">Qué pasa si meto E10 sin compatibilidad</h2>
      <p>
        El bioetanol es ligeramente corrosivo para algunos materiales
        (ciertos plásticos, gomas, aluminios) y absorbe humedad del aire
        más que la gasolina pura. En un coche no diseñado para soportar
        10 % de etanol:
      </p>
      <ul>
        <li>
          A corto plazo (un depósito ocasional): normalmente sin daños
          visibles inmediatos.
        </li>
        <li>
          A medio-largo plazo (uso continuado): degradación de juntas, tubos
          flexibles del sistema de combustible, posible obstrucción de
          inyectores o carburador, y en motos antiguas, daño en el propio
          depósito.
        </li>
      </ul>
      <p>
        Si has metido un depósito de E10 por error en un coche solo
        compatible con E5, no entres en pánico. Lo más sensato es vaciar
        el depósito en lo posible (consumiéndolo o haciendo que un taller lo
        drene) y volver a E5 cuanto antes.
      </p>

      <h2 id="motos-jardin">Motos, motosierras, cortacéspedes</h2>
      <p>
        Los motores pequeños son los más afectados por la E10. Marcas como
        Stihl, Honda Power Equipment o Husqvarna publican listas
        específicas: motos clásicas, motosierras antiguas, generadores
        portátiles, motores fuera-borda... muchos NO toleran E10.
      </p>
      <p>
        Para estos equipos lo más seguro es seguir usando E5 mientras esté
        disponible. Algunas marcas comercializan «gasolina de alta
        estabilidad» sin bioetanol específicamente para motores de jardín
        y náutica, aunque a precios muy superiores.
      </p>

      <h2 id="futuro">El futuro: E20 y combustibles sintéticos</h2>
      <p>
        La hoja de ruta europea contempla aumentar la proporción de
        biocarburantes en los próximos años. Algunos países ya prueban la
        E20 (20 % de bioetanol). En paralelo, los e-fuels (combustibles
        sintéticos generados con electricidad renovable + CO₂ atmosférico)
        ganan terreno como solución para mantener el parque actual de
        coches descarbonizando paulatinamente la flota.
      </p>

      <AppCta
        title="Compara precios de gasolina cerca"
        body="Carburantes muestra el precio de la gasolina 95 y 98 (E5/E10 según la estación) en cada surtidor de España."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Más sobre combustibles"
        links={[
          { href: "/guias/gasolina-95-vs-98", label: "Gasolina 95 vs 98: cuál usar" },
          { href: "/guias/diesel-a-vs-premium", label: "Diésel A, premium, B y C" },
          { href: "/guias/repostar-portugal-francia-andorra", label: "Repostar en Portugal, Francia y Andorra" },
          { href: "/guias/etiqueta-dgt-combustible", label: "Etiqueta DGT según combustible" },
        ]}
      />
    </>
  );
}

export default guide;
