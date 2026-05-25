import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "repostar-portugal-francia-andorra";
const title = "Repostar en Portugal, Francia y Andorra: ¿compensa cruzar la frontera?";
const description =
  "Comparativa actualizada de precios de gasolina y diésel entre España y sus vecinos. Cuándo cruzar a Portugal, Francia o Andorra para repostar realmente ahorra dinero.";

const guide = {
  slug,
  title,
  seoTitle: "Repostar en Portugal, Francia y Andorra · Guía",
  description,
  category: "mercado",
  datePublished: "2026-05-25",
  dateModified: "2026-05-25",
  readingMinutes: 7,
  keywords: [
    "repostar Portugal precio",
    "gasolina Andorra barato",
    "diésel Francia frontera",
    "comparativa precios carburante España vecinos",
    "viajar a repostar",
  ],
  mentions: [
    { "@type": "Place", name: "Portugal" },
    { "@type": "Place", name: "Francia" },
    { "@type": "Place", name: "Andorra" },
  ],
  faq: [
    {
      q: "¿En qué país vecino es más barata la gasolina?",
      a: "Andorra es habitualmente el destino más barato (1,20-1,35 €/L de gasolina 95 en 2026, frente a 1,55 €/L en España). Le sigue Portugal en algunas regiones del interior, aunque su gasolina suele ser más cara o similar a España. Francia es siempre más cara.",
    },
    {
      q: "¿Cuántos litros puedo llevar de vuelta a España?",
      a: "Hasta 10 litros adicionales en bidón homologado y solo el contenido del depósito. Más cantidad puede considerarse contrabando y la Guardia Civil aplicar sanción. Esta norma rige para Andorra (tercer país) y, técnicamente, no se aplica entre países UE (Portugal/Francia) aunque allí también hay límites prácticos.",
    },
    {
      q: "¿Cuánto puedo ahorrar cruzando a Andorra desde Cataluña?",
      a: "Con la diferencia actual de ~25-30 céntimos por litro, llenar un depósito de 55 L ahorra ~15 €. Si vives a menos de 30-40 km de la frontera (Cerdanya, Pallars, Vall d'Aran), el viaje puede compensar combinado con otras compras. Para distancias mayores, el coste del viaje se come el ahorro.",
    },
    {
      q: "¿Es más barata la gasolina en Portugal que en España?",
      a: "Generalmente no. Portugal aplica impuestos al combustible similares o ligeramente superiores a España. En 2026 la gasolina 95 ronda los 1,65-1,75 €/L allí. El diésel puede estar más cerca o incluso ligeramente por debajo en zonas fronterizas, pero el viaje rara vez compensa solo por repostar.",
    },
    {
      q: "¿En Francia se puede pagar con tarjeta española en gasolinera desatendida?",
      a: "Sí, en la práctica casi siempre. Muchas low cost francesas son desatendidas y aceptan Visa/Mastercard contactless de cualquier país de la UE. En algunas, el surtidor preautoriza un importe mayor (90-150 €) que se ajusta al final del repostaje.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Cruzar la frontera para repostar solo compensa habitualmente en{" "}
        <strong>Andorra</strong>, donde la gasolina cuesta ~20-30 céntimos/L
        menos que en España gracias a su fiscalidad reducida. En{" "}
        <strong>Portugal</strong> los precios son similares o ligeramente
        más altos que en España, y en <strong>Francia</strong> son siempre
        bastante más caros. Solo si vives a menos de 40 km de la frontera
        andorrana o haces ya el viaje por otros motivos, el ahorro es real.
      </Answer>

      <Tldr
        items={[
          "Andorra: ~20-30 cént/L más barato. Compensa cerca de la frontera.",
          "Portugal: precios similares o algo más altos. No compensa viajar solo a repostar.",
          "Francia: precios bastante más altos que España. Nunca compensa.",
          "Límite legal de vuelta: contenido del depósito + 10 L en bidón homologado.",
        ]}
      />

      <h2 id="comparativa">Tabla comparativa actualizada</h2>
      <p>
        Precios medios aproximados a mayo 2026 (varían a diario; usa los
        oficiales del país antes de viajar). Datos en céntimos por litro.
      </p>

      <CompareTable
        caption="Comparativa de precios (€/L), mayo 2026"
        headers={["País", "Gasolina 95", "Diésel A", "Diferencia vs España"]}
        rows={[
          ["España (media)", "1,55", "1,45", "Referencia"],
          ["Andorra", "1,28", "1,21", "-20 a -30 cént/L"],
          ["Portugal", "1,72", "1,57", "+10 a +20 cént/L"],
          ["Francia", "1,86", "1,72", "+25 a +35 cént/L"],
          ["Gibraltar (excepción)", "1,12", "1,02", "-40 a -45 cént/L"],
        ]}
      />

      <h2 id="andorra">Andorra: el destino con ahorro real</h2>
      <p>
        Andorra es un principado independiente con fiscalidad muy reducida
        sobre el combustible. El IVA andorrano (IGI) es del 4,5 % frente
        al 21 % español, y los impuestos especiales son significativamente
        menores. Eso se traduce en precios de surtidor entre 20 y 30
        céntimos por litro por debajo de España.
      </p>
      <p>
        Las gasolineras andorranas se concentran en torno a Andorra la
        Vella, Pas de la Casa (frontera con Francia) y la N-145 hacia La
        Seu d&apos;Urgell. Aceptan euros, tarjetas españolas y suelen tener
        atendidas (con personal) los precios más bajos. Las
        consideraciones prácticas para cruzar:
      </p>
      <ul>
        <li>
          <strong>Distancia útil</strong>: vivir a menos de 30-40 km de la
          frontera (Cerdanya, La Seu, Pallars Sobirà, Vall d&apos;Aran lejana).
          A mayor distancia, el viaje específico se come el ahorro.
        </li>
        <li>
          <strong>Tráfico</strong>: en verano y festivos, las colas en la
          frontera (Toses, Pimorent, El Pas de la Casa) pueden ser de
          horas. Lo que ahorras en combustible lo pierdes en tiempo y en
          el propio consumo parado al ralentí.
        </li>
        <li>
          <strong>Combinar con otras compras</strong>: alcohol, tabaco,
          electrónica y combustible juntos sí compensan a muchos
          residentes del Pirineo, que hacen un viaje único cada mes o dos.
        </li>
      </ul>

      <Callout type="info" title="Límite legal al volver de Andorra">
        Andorra es <strong>tercer país</strong> (no UE). Al volver puedes
        traer: (1) el contenido del depósito habitual del coche y (2)
        hasta <strong>10 litros adicionales en bidón homologado</strong>{" "}
        para combustible. Más cantidad puede considerarse contrabando y
        sancionarse. La Guardia Civil de la frontera controla
        habitualmente, especialmente en operación retorno.
      </Callout>

      <h2 id="portugal">Portugal: depende de la zona</h2>
      <p>
        Sorprende a muchos viajeros: Portugal tiene impuestos al
        carburante <em>similares o superiores</em> a España. La gasolina
        95 ronda los 1,65-1,75 €/L en 2026. El diésel está más cerca de
        España y, en zonas fronterizas con menos competencia, puede estar
        ligeramente por debajo.
      </p>
      <p>
        Donde sí hay diferencia es en estaciones específicas justo en
        frontera (Repsol, BP, Galp portuguesas) que compiten activamente
        con las españolas para captar tráfico transfronterizo,
        ofreciendo descuentos o promociones puntuales. Para conductores
        fronterizos (Olivenza, Badajoz, Valencia de Alcántara, Salvaterra
        do Miño), conviene comparar antes de cruzar — a veces es más
        barato repostar en el lado español.
      </p>

      <h2 id="francia">Francia: nunca compensa</h2>
      <p>
        Francia es estructuralmente más cara que España en carburantes:
        impuestos especiales superiores y un IVA del 20 % que se aplica
        sobre una base ya alta. La gasolina 95 supera con frecuencia los
        1,80 €/L y el diésel los 1,70 €/L.
      </p>
      <p>
        Las únicas excepciones son algunas low cost francesas (E.Leclerc,
        Carrefour, Intermarché) que ofrecen precios muy competitivos
        dentro de Francia. Pero esos precios siguen estando por encima
        de los españoles, así que cruzar solo a repostar nunca tiene
        sentido económico.
      </p>
      <p>
        Si conduces por Francia camino de viaje, el truco para minimizar
        el gasto es repostar el depósito completo en España justo antes
        de cruzar y volver a llenarlo en la primera oportunidad al
        regresar.
      </p>

      <h2 id="gibraltar">Gibraltar: caso aparte</h2>
      <p>
        Gibraltar tiene fiscalidad propia y precios del combustible
        muy bajos: la gasolina puede llegar a 1,10-1,15 €/L, casi 40-45
        céntimos por debajo de España. La pega es la cola de salida
        (controles aduaneros) que en hora punta puede llegar a 2-3 horas
        y devorar cualquier ahorro. Solo compensa para residentes
        fronterizos (La Línea, Algeciras, San Roque) y solo cuando la
        cola es razonable.
      </p>

      <h2 id="como-decidir">Cómo decidir si te compensa cruzar</h2>
      <p>
        Hagamos los números. Asumamos un coche de 7 L/100 km y un
        depósito de 55 L:
      </p>
      <ul>
        <li>
          <strong>Ahorro por lleno en Andorra</strong>: 55 L × 0,25 €/L =
          <strong> 13,75 €</strong>.
        </li>
        <li>
          <strong>Coste del viaje (ida y vuelta, kilometraje y desgaste)</strong>:
          ~0,15 €/km. Para 50 km totales: 7,50 €. Para 100 km: 15 €.
        </li>
        <li>
          <strong>Conclusión</strong>: el ahorro neto solo es positivo si
          el viaje específico de ida + vuelta queda por debajo de 90-100
          km. Para residentes a 30 km o menos de la frontera, sí
          compensa. Para distancias mayores, solo compensa si el viaje
          ya estaba planeado por otros motivos.
        </li>
      </ul>

      <AppCta
        title="Compara antes de viajar"
        body="Antes de cruzar, comprueba el precio actualizado en España. Carburantes muestra los precios oficiales del Ministerio. Si tienes una gasolinera barata cerca, quizá no necesites moverte."
        href="/cerca"
        linkLabel="Ver precios cerca"
      />

      <InternalLinks
        title="Más sobre precios"
        links={[
          { href: "/guias/como-se-forma-precio-gasolina", label: "Cómo se forma el precio de la gasolina en España" },
          { href: "/guias/gasolineras-low-cost", label: "Gasolineras low cost: la alternativa sin cruzar fronteras" },
          { href: "/guias/mejor-hora-dia-repostar", label: "Mejor día y hora para repostar" },
          { href: "/guias/bonificacion-gasoleo-profesional", label: "Bonificación gasóleo profesional" },
        ]}
      />
    </>
  );
}

export default guide;
