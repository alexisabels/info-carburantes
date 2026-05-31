import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "reclamar-combustible-mala-calidad";
const title = "Cómo reclamar si te echan combustible en mal estado";
const description =
  "Si tu coche falla tras repostar y sospechas del combustible, tienes derecho a reclamar. Te explicamos cómo actuar, qué pruebas guardar y ante quién reclamar.";

const guide = {
  slug,
  title,
  seoTitle: "Reclamar combustible en mal estado · Guía",
  description,
  category: "normativa",
  datePublished: "2026-05-29",
  dateModified: "2026-05-29",
  readingMinutes: 5,
  keywords: [
    "reclamar combustible mala calidad",
    "gasolina mala estropea coche",
    "reclamación gasolinera",
    "combustible adulterado reclamar",
  ],
  mentions: [
    { "@type": "Thing", name: "Reclamación" },
    { "@type": "Thing", name: "Consumo" },
  ],
  faq: [
    {
      q: "¿Puedo reclamar si la gasolina estropea mi coche?",
      a: "Sí. Si el combustible estaba en mal estado o adulterado y eso ha dañado tu vehículo, tienes derecho a reclamar a la gasolinera la reparación y los gastos asociados (grúa, taller, días sin coche). La clave es demostrar el vínculo entre el repostaje y la avería, por eso conviene guardar el ticket, parar el coche cuanto antes y pedir un informe del taller. La normativa de consumo y la de responsabilidad por productos defectuosos amparan al conductor, pero cada caso depende de las pruebas. Como esta materia puede cambiar, confirma los pasos con la oficina de consumo de tu comunidad.",
    },
    {
      q: "¿Qué pruebas necesito?",
      a: "Las básicas son el ticket o factura del repostaje (con fecha, hora, gasolinera y producto), un informe del taller que indique que la avería es compatible con combustible defectuoso y, a ser posible, una muestra del carburante del depósito tomada antes de vaciarlo. Suman mucho las fotos del surtidor y del cuentakilómetros, el extracto bancario del pago y los testigos si otros conductores tuvieron problemas el mismo día. Cuantas más pruebas objetivas reúnas y antes lo hagas, más sólida será la reclamación.",
    },
    {
      q: "¿Ante quién reclamo?",
      a: "Primero ante la propia gasolinera, mediante la hoja de reclamaciones oficial que están obligados a tener. Si no responden o lo rechazan, acude a la oficina municipal o autonómica de consumo (OMIC o dirección general de consumo de tu comunidad). Para combustible adulterado o fraude en el suministro también puedes avisar a la autoridad de metrología o industria de tu comunidad. Si la cuantía es alta o no hay acuerdo, la vía judicial o el arbitraje de consumo cierran el círculo. Confirma el organismo concreto, porque las competencias varían por comunidad.",
    },
    {
      q: "¿Quién paga la reparación?",
      a: "Si se demuestra que el combustible estaba defectuoso, paga la gasolinera o su distribuidor a través del seguro de responsabilidad civil. Debe cubrir la reparación de los daños causados y los gastos derivados razonables, como la grúa o un coche de sustitución si procede. Si no se puede probar que el carburante fue la causa, el coste recae en el conductor. Por eso las pruebas son decisivas. En cuantías pequeñas, tu propio seguro o la asistencia en carretera pueden adelantar gastos; revisa tu póliza y guarda todas las facturas.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Si tu coche empieza a fallar justo después de repostar y sospechas del
        carburante, <strong>tienes derecho a reclamar</strong>. Actúa rápido:
        para el vehículo, guarda el ticket y una muestra del combustible, pide
        un informe al taller y presenta una hoja de reclamaciones en la propia
        gasolinera. Si se prueba que el carburante estaba defectuoso, la
        estación responde de la reparación y los gastos.
      </Answer>

      <Tldr
        items={[
          "Sospecha del combustible si el coche falla en los primeros kilómetros tras repostar.",
          "Para cuanto antes: seguir conduciendo agrava el daño y debilita tu reclamación.",
          "Guarda ticket, una muestra del carburante, fotos del surtidor e informe del taller.",
          "Reclama primero a la gasolinera (hoja de reclamaciones) y luego a consumo de tu comunidad.",
          "Si se prueba el defecto, paga la estación o su seguro; si no, el coste recae en ti.",
        ]}
      />

      <h2 id="sintomas-mal-repostaje">Síntomas de un mal repostaje</h2>
      <p>
        El indicio más claro es la <strong>relación temporal</strong>: el coche
        funcionaba bien y empieza a fallar a los pocos minutos o kilómetros de
        haber repostado, casi siempre en una gasolinera distinta a la habitual.
        Cuanto más cerca del repostaje aparezcan los síntomas, más sólida es la
        sospecha de que el carburante es la causa.
      </p>
      <p>Los problemas típicos de un combustible en mal estado son:</p>
      <ul>
        <li>
          <strong>Tirones y pérdida de potencia</strong> al acelerar, como si el
          motor se ahogara.
        </li>
        <li>
          <strong>Ralentí inestable</strong>, el coche vibra o casi se cala
          parado en un semáforo.
        </li>
        <li>
          <strong>El motor se cala</strong> de forma repetida o no llega a
          arrancar después de repostar.
        </li>
        <li>
          <strong>Testigo de avería del motor</strong> encendido (la luz naranja
          del check engine) poco después de salir de la estación.
        </li>
        <li>
          <strong>Humo anómalo</strong> por el escape o un olor extraño a
          combustible mal quemado.
        </li>
        <li>
          <strong>Petardeos</strong> o golpeteo metálico (picado) que antes no
          hacía.
        </li>
      </ul>
      <p>
        Conviene distinguir dos situaciones distintas. Una es echar el carburante
        equivocado por error, que tiene su propio protocolo y explicamos en{" "}
        <Link href="/guias/me-he-equivocado-combustible">
          qué hacer si te has equivocado de combustible
        </Link>
        . Otra es repostar el producto correcto pero que esté en mal estado:
        agua, suciedad, mezcla incorrecta o adulteración. Una causa muy frecuente
        es la presencia de agua en el depósito de la estación, con síntomas
        parecidos a los de{" "}
        <Link href="/guias/agua-en-el-deposito-sintomas">
          el agua en el depósito de tu coche
        </Link>
        .
      </p>

      <Callout type="warn" title="No confundas síntomas con un fallo mecánico previo">
        Tirones, ralentí inestable o el testigo del motor también aparecen por
        averías normales (filtros, bujías, bomba de combustible). Si los
        síntomas surgen tras varios días o muchos kilómetros desde el repostaje,
        lo más probable es que sea el coche y no el carburante. La sospecha de
        combustible defectuoso se sostiene cuando el fallo es inmediato.
      </Callout>

      <h2 id="que-hacer-en-el-momento">Qué hacer en el momento</h2>
      <p>
        Lo primero, <strong>detén el coche en cuanto sea seguro</strong>. Cada
        kilómetro que recorras con un combustible defectuoso empuja la suciedad
        o el agua por todo el circuito (filtro, bomba, inyectores) y puede
        convertir una limpieza barata en una reparación cara. Seguir conduciendo
        también facilita que la gasolinera alegue que el daño es por otra causa.
      </p>
      <p>Pasos recomendados en orden:</p>
      <ul>
        <li>
          <strong>No vacíes ni repostes más</strong> antes de documentar el
          incidente. Necesitas el combustible sospechoso como prueba.
        </li>
        <li>
          <strong>Vuelve o llama a la gasolinera</strong> y comunica el problema
          en el momento. Pide que dejen constancia por escrito de tu aviso.
        </li>
        <li>
          <strong>Solicita la hoja de reclamaciones oficial</strong>. Están
          obligados a tenerla y a entregártela; describe los hechos con fecha,
          hora, surtidor y producto repostado.
        </li>
        <li>
          <strong>Llama a tu asistencia en carretera</strong> (la del seguro o
          la del fabricante) para mover el coche al taller sin arrancarlo más de
          lo necesario.
        </li>
        <li>
          <strong>Avisa al taller</strong> de tu sospecha para que tomen una
          muestra del combustible del depósito antes de vaciarlo.
        </li>
      </ul>
      <p>
        Si en la misma gasolinera ves o te enteras de que otros conductores han
        tenido problemas ese día, apunta sus datos: varios afectados en pocas
        horas es una de las pruebas más potentes de que el lote de carburante
        estaba en mal estado.
      </p>

      <h2 id="pruebas-que-debes-guardar">Pruebas que debes guardar</h2>
      <p>
        Una reclamación se gana o se pierde por las pruebas. El objetivo es
        demostrar dos cosas: que repostaste en esa estación ese día y que el
        carburante es <strong>compatible con la avería</strong> que ha sufrido tu
        coche. Reúne todo lo que puedas, y cuanto antes mejor.
      </p>

      <CompareTable
        caption="Pruebas para reclamar combustible en mal estado (orden de importancia típico)"
        headers={["Prueba", "Para qué sirve", "Cómo conseguirla"]}
        rows={[
          [
            "Ticket o factura",
            "Acredita fecha, hora, estación y producto",
            "Consérvalo; si lo perdiste, pide el extracto del pago con tarjeta",
          ],
          [
            "Informe del taller",
            "Vincula la avería con un combustible defectuoso",
            "Pídelo por escrito y detallado, con diagnóstico",
          ],
          [
            "Muestra del carburante",
            "Permite analizar agua, suciedad o adulteración",
            "Que el taller la tome del depósito antes de vaciarlo",
          ],
          [
            "Fotos y vídeo",
            "Surtidor, cuentakilómetros, testigos del cuadro",
            "Con el móvil, en el momento del incidente",
          ],
          [
            "Testigos / otros afectados",
            "Refuerza que el problema fue del lote",
            "Datos de contacto de otros conductores ese día",
          ],
        ]}
      />

      <p>
        Sobre la muestra del combustible: pídele al taller que la guarde en un
        recipiente limpio y precintado, anotando fecha y matrícula. Un análisis
        de laboratorio que detecte agua por encima de lo normal, partículas o una
        mezcla impropia es la prueba más difícil de rebatir. Guarda también las
        facturas de la grúa, del taller y de cualquier coche de sustitución: son
        gastos que podrás reclamar si prosperas.
      </p>

      <Callout type="info" title="Conserva el resto del depósito si puedes">
        Si el coche aún no se ha llevado al taller, no rellenes el depósito ni lo
        vacíes por tu cuenta. Ese combustible es la prueba física directa. Una
        vez analizado, ya podrás vaciar y limpiar el circuito con tranquilidad.
      </Callout>

      <h2 id="ante-quien-reclamar">Ante quién reclamar</h2>
      <p>
        La reclamación sigue una escalera: empieza por la propia estación y vas
        subiendo si no obtienes respuesta. Estos son los escalones habituales en
        España, aunque los nombres y competencias varían por comunidad autónoma.
      </p>
      <ul>
        <li>
          <strong>1. La gasolinera</strong>. Presenta la hoja de reclamaciones
          oficial y entrega una copia con tu informe del taller. Muchas estaciones
          tienen seguro de responsabilidad civil y resuelven en esta fase si las
          pruebas son claras.
        </li>
        <li>
          <strong>2. Consumo (OMIC o consumo autonómico)</strong>. Si la
          gasolinera no contesta en plazo o rechaza la reclamación, acude a la
          oficina municipal de información al consumidor o a la dirección general
          de consumo de tu comunidad. Tramitan la queja y pueden mediar.
        </li>
        <li>
          <strong>3. Industria o metrología</strong>. Para sospechas de fraude en
          el suministro, adulteración o que el surtidor no entrega la cantidad
          correcta, la autoridad de industria o metrología de tu comunidad puede
          inspeccionar la estación.
        </li>
        <li>
          <strong>4. Arbitraje de consumo o vía judicial</strong>. Si no hay
          acuerdo y la cuantía lo justifica, puedes acudir al sistema arbitral de
          consumo (gratuito y voluntario para ambas partes) o reclamar
          judicialmente.
        </li>
      </ul>
      <p>
        Como esta materia toca normativa de consumo y de responsabilidad civil,
        que puede cambiar y se aplica de forma distinta en cada comunidad,
        confirma el organismo y los plazos exactos con la oficina de consumo de
        tu zona. En reclamaciones de cierta cuantía o complejidad, vale la pena
        consultar con un abogado o una asociación de consumidores antes de
        firmar nada.
      </p>

      <h2 id="como-reforzar-tu-caso">Cómo reforzar tu caso</h2>
      <p>
        Más allá de las pruebas, hay detalles que marcan la diferencia entre una
        reclamación que prospera y otra que se desestima:
      </p>
      <ul>
        <li>
          <strong>Sé rápido y ordenado.</strong> Reclama en cuestión de días, con
          un relato cronológico claro: a qué hora repostaste, qué síntomas, qué
          hiciste, qué dijo el taller.
        </li>
        <li>
          <strong>No manipules el coche por tu cuenta.</strong> Si vacías o
          reparas antes de documentar, destruyes la prueba y la otra parte lo
          usará en tu contra.
        </li>
        <li>
          <strong>Pide siempre todo por escrito.</strong> El informe del taller,
          la copia sellada de la hoja de reclamaciones y cualquier respuesta de la
          gasolinera.
        </li>
        <li>
          <strong>Busca otros afectados.</strong> Un grupo de conductores con el
          mismo problema el mismo día convierte tu sospecha en algo casi
          incontestable.
        </li>
        <li>
          <strong>Elige bien dónde repostas.</strong> No es que las{" "}
          <Link href="/guias/gasolineras-low-cost">gasolineras low cost</Link>{" "}
          vendan peor combustible (en España todas cumplen la misma normativa de
          calidad), pero llevar un registro de dónde y cuándo repostas te ayuda a
          reconstruir el historial si surge un problema.
        </li>
      </ul>
      <p>
        En la práctica, los casos de combustible defectuoso son poco frecuentes:
        el carburante que se vende en España está sujeto a controles de calidad y
        las incidencias de un lote en mal estado suelen detectarse rápido. Pero
        cuando ocurren, actuar con método y pruebas es lo que te permite que la
        reparación no salga de tu bolsillo.
      </p>

      <AppCta
        title="Elige tu gasolinera con datos oficiales"
        body="Carburantes lee los precios del Ministerio cada media hora. Compara estaciones cerca de ti o por municipio y guarda dónde repostas; si algún día necesitas reclamar, tendrás claro cuándo y dónde echaste combustible."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/agua-en-el-deposito-sintomas", label: "Agua en el depósito" },
          { href: "/guias/me-he-equivocado-combustible", label: "Me he equivocado de combustible" },
          { href: "/guias/gasolineras-low-cost", label: "Gasolineras low cost" },
        ]}
      />
    </>
  );
}

export default guide;
