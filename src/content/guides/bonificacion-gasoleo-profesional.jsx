import Link from "next/link";
import { Answer, Tldr, Callout, AppCta, InternalLinks } from "./_components";

const slug = "bonificacion-gasoleo-profesional";
const title = "Bonificación del gasóleo profesional: requisitos y cómo solicitarla";
const description =
  "Si tienes vehículo de transporte de mercancías o autobús, puedes recuperar 4,9 céntimos por cada litro de diésel. Te explicamos requisitos, importes y trámite.";

const guide = {
  slug,
  title,
  seoTitle: "Devolución diésel profesional: cómo cobrarla · Guía",
  description,
  category: "ahorro",
  datePublished: "2026-05-25",
  dateModified: "2026-05-25",
  readingMinutes: 6,
  keywords: [
    "bonificación gasóleo profesional",
    "devolución diésel transporte",
    "céntimo sanitario",
    "Hacienda devolución carburante autónomo",
    "AEAT diésel profesional",
  ],
  mentions: [
    { "@type": "Thing", name: "Bonificación gasóleo profesional" },
    { "@type": "Organization", name: "AEAT" },
  ],
  faq: [
    {
      q: "¿Quién tiene derecho a la bonificación del gasóleo profesional?",
      a: "Los vehículos de transporte de mercancías de más de 7,5 toneladas, los autobuses de servicio público regular o discrecional y los taxis. El vehículo debe estar dado de alta en el censo de gasóleo profesional de la AEAT y haber repostado en una estación adherida.",
    },
    {
      q: "¿Cuánto se devuelve por cada litro?",
      a: "En 2026 son 4,9 céntimos por litro, financiados con parte del impuesto especial sobre hidrocarburos. La cuantía la actualiza cada año el Ministerio de Hacienda en los Presupuestos Generales del Estado.",
    },
    {
      q: "¿Los autónomos del transporte pueden solicitarla?",
      a: "Sí, siempre que su vehículo cumpla los requisitos (categoría y peso). Camiones de mercancías de más de 7,5 t, autobuses y taxis con autónomos titulares están incluidos. Furgonetas comerciales por debajo del límite NO entran.",
    },
    {
      q: "¿Tengo que pagar primero y reclamar luego?",
      a: "Sí. Repostas a precio público, las gasolineras envían los datos a la AEAT a través de la tarjeta gasóleo profesional vinculada, y la AEAT abona trimestralmente el importe acumulado en la cuenta del titular.",
    },
    {
      q: "¿En qué gasolineras puedo repostar?",
      a: "En cualquier estación adherida al sistema de gasóleo profesional (la mayoría de las grandes redes lo están: Repsol, Cepsa, BP, Galp, etc., a través de tarjetas específicas Solred, Andamur, DKV, BP Plus, etc.).",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        La bonificación del gasóleo profesional es una <strong>devolución
        parcial del impuesto especial</strong> que la Agencia Tributaria
        abona a los titulares de camiones de más de 7,5 toneladas, autobuses
        y taxis. En 2026 son <strong>4,9 céntimos por litro</strong>{" "}
        repostado, hasta un máximo de 50.000 litros al año por vehículo. Se
        cobra automáticamente trimestralmente si se reposta en gasolineras
        adheridas y con una tarjeta vinculada al censo.
      </Answer>

      <Tldr
        items={[
          "Devolución: 4,9 céntimos/L. Máximo 50.000 L/año por vehículo.",
          "Beneficiarios: camiones >7,5 t, autobuses, taxis.",
          "Trámite: alta en censo AEAT + tarjeta gasóleo profesional.",
          "Cobro: automático y trimestral en cuenta bancaria del titular.",
        ]}
      />

      <h2 id="que-es">Qué es la bonificación del gasóleo profesional</h2>
      <p>
        El precio del diésel en España incluye varios impuestos: IVA (21 %)
        y el Impuesto Especial sobre Hidrocarburos (IEH), que es un tributo
        específico de unos 37 céntimos por litro. Una parte de ese
        impuesto, los <strong>4,9 céntimos por litro</strong>, se devuelve
        a determinados profesionales del transporte como compensación por
        el coste del combustible en su actividad.
      </p>
      <p>
        Este mecanismo se conoce como «bonificación del gasóleo profesional»
        o, históricamente, «céntimo sanitario» (aunque este último término
        técnicamente corresponde a otro tributo ya desaparecido). Está
        regulado por la Ley 38/1992 de Impuestos Especiales y el Real
        Decreto que la desarrolla.
      </p>

      <h2 id="quien-puede">Quién puede solicitarla</h2>
      <p>
        Los beneficiarios son los titulares de vehículos que cumplan
        TODAS las siguientes condiciones:
      </p>
      <ul>
        <li>
          <strong>Categoría y peso del vehículo</strong>:
          <ul>
            <li>
              Camiones de transporte de mercancías de masa máxima autorizada
              (MMA) <strong>superior a 7,5 toneladas</strong>.
            </li>
            <li>
              <strong>Autobuses</strong> de servicio público regular,
              discrecional o turístico.
            </li>
            <li>
              <strong>Taxis</strong> con licencia de actividad.
            </li>
          </ul>
        </li>
        <li>
          <strong>Vehículo registrado</strong> en el censo de gasóleo
          profesional de la AEAT.
        </li>
        <li>
          <strong>Repostaje con tarjeta vinculada</strong> al censo (Solred
          Profesional, Andamur, DKV, BP Plus, Cepsa Star, Galp Frota, entre
          otras).
        </li>
      </ul>

      <Callout type="warn" title="Furgonetas y comerciales no entran">
        Las furgonetas de hasta 3,5 t y los camiones ligeros entre 3,5 y
        7,5 t <strong>NO tienen derecho</strong> a esta bonificación. Es
        una limitación del régimen, pensado para el transporte pesado y
        público. Sí pueden, por supuesto, beneficiarse de descuentos
        comerciales de las tarjetas profesionales (Solred, Andamur, BP
        Plus, etc.).
      </Callout>

      <h2 id="como-solicitar">Cómo se solicita y se cobra</h2>
      <p>
        El proceso tiene tres pasos:
      </p>
      <ol>
        <li>
          <strong>Alta del vehículo en el censo de la AEAT</strong>. Se
          hace en la sede electrónica de la Agencia Tributaria con
          certificado digital. La empresa o autónomo titular debe aportar
          ficha técnica del vehículo y certificado de la categoría
          (transporte de mercancías, autobús, taxi).
        </li>
        <li>
          <strong>Alta en una tarjeta gasóleo profesional</strong>{" "}
          (Solred, Andamur, BP Plus, Cepsa Star, DKV, etc.) y vinculación
          de la tarjeta al censo AEAT. Cada estación de servicio adherida
          informa a la AEAT de los litros repostados con esa tarjeta.
        </li>
        <li>
          <strong>Repostaje normal en gasolineras adheridas</strong>. Pagas
          a precio público. Trimestralmente la AEAT calcula los litros
          repostados (con el límite de 50.000 L/año por vehículo), aplica
          los 4,9 céntimos/L y abona el importe directamente en la cuenta
          bancaria del titular.
        </li>
      </ol>

      <h2 id="cuanto-se-cobra">Cuánto se cobra en la práctica</h2>
      <p>
        Hagamos los números para un camión que reposta 40.000 litros al año:
      </p>
      <ul>
        <li>40.000 L × 0,049 €/L = <strong>1.960 € anuales devueltos</strong>.</li>
        <li>Cobrados trimestralmente: ~490 € cada tres meses.</li>
      </ul>
      <p>
        Para un taxi de 30.000 km al año con consumo medio de 7 L/100 km:
      </p>
      <ul>
        <li>2.100 L × 0,049 €/L = <strong>~103 € anuales devueltos</strong>.</li>
      </ul>
      <p>
        Cifras modestas a título individual, pero relevantes para flotas
        grandes: una empresa con 50 camiones puede recuperar ~100.000 €
        al año.
      </p>

      <h2 id="cambios-2026">Cambios recientes y para 2026</h2>
      <p>
        La cuantía de la bonificación se actualiza cada año en los
        Presupuestos Generales del Estado. En los últimos años se ha
        mantenido estable en 4,9 céntimos/L. El límite de 50.000 litros
        anuales por vehículo se introdujo para evitar abusos en flotas
        muy intensivas.
      </p>
      <p>
        La normativa europea sobre subvenciones al combustible fósil
        presiona para reducir progresivamente estas ayudas, así que es
        previsible que en los próximos años se introduzcan ajustes o
        condicionantes vinculados a Euro 7 y a la transición hacia
        combustibles renovables.
      </p>

      <h2 id="otras-bonificaciones">Otras bonificaciones y ayudas</h2>
      <ul>
        <li>
          <strong>Bonificación del gasóleo agrícola</strong>: el gasóleo B
          tintado rojo ya está bonificado fiscalmente en origen y se
          vende ~25-30 céntimos más barato que el A. No es una devolución
          posterior, es directamente en el precio.
        </li>
        <li>
          <strong>Ayudas a flota cero/bajas emisiones (MOVES)</strong>:
          subvenciones del IDAE para adquisición de camiones y autobuses
          eléctricos, GNL o GLP.
        </li>
        <li>
          <strong>Tarjetas profesionales con descuento comercial</strong>:
          además de la bonificación fiscal, las propias tarjetas Solred,
          Andamur, DKV, etc. aplican <Link href="/guias/descuentos-tarjetas-gasolineras">descuentos comerciales de
          5-15 céntimos por litro</Link> que se acumulan con la devolución
          AEAT.
        </li>
      </ul>

      <AppCta
        title="Compara precios para flotas y autónomos"
        body="Aunque tu tarjeta profesional te aplique descuento, el punto de partida importa. Carburantes muestra los precios públicos actualizados de cada estación para que elijas dónde repostar."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Más para flotas y profesionales"
        links={[
          { href: "/guias/descuentos-tarjetas-gasolineras", label: "Tarjetas y apps de descuento" },
          { href: "/guias/diesel-a-vs-premium", label: "Diésel A, premium, B y C" },
          { href: "/guias/gasolineras-24-horas", label: "Gasolineras 24 horas" },
          { href: "/guias/repostar-portugal-francia-andorra", label: "Repostar en países vecinos" },
        ]}
      />
    </>
  );
}

export default guide;
