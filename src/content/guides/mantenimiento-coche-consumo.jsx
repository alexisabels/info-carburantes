import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "mantenimiento-coche-consumo";
const title = "Cómo el mantenimiento del coche influye en tu consumo";
const description =
  "Filtros sucios, aceite inadecuado, bujías gastadas o sensores en mal estado disparan el consumo. Te explicamos qué partes del mantenimiento te ahorran gasolina.";

const guide = {
  slug,
  title,
  seoTitle: "Mantenimiento y consumo de combustible · Guía",
  description,
  category: "conduccion",
  datePublished: "2026-05-20",
  dateModified: "2026-05-20",
  readingMinutes: 6,
  keywords: [
    "mantenimiento consumo combustible",
    "filtro aire consumo",
    "aceite y consumo",
    "bujías consumo",
    "revisión coche ahorrar gasolina",
  ],
  mentions: [
    { "@type": "Thing", name: "Filtro de aire" },
    { "@type": "Thing", name: "Bujías" },
    { "@type": "Thing", name: "Aceite" },
  ],
  faq: [
    {
      q: "¿Un filtro de aire sucio aumenta el consumo?",
      a: "Sí. El motor necesita una proporción correcta de aire y combustible para quemar bien la gasolina. Si el filtro de aire está saturado de polvo y hojas, entra menos aire, la mezcla se enriquece de gasolina y el motor desperdicia combustible para dar la misma potencia. En coches modernos de inyección la centralita compensa parte de la falta de aire, pero igualmente notarás tirones, menos respuesta y un consumo algo mayor. Un filtro de aire de papel cuesta de media entre 10 y 25 euros y se cambia cada 15.000 a 30.000 kilómetros, o antes si circulas por zonas con mucho polvo o caminos sin asfaltar.",
    },
    {
      q: "¿El aceite influye en el consumo?",
      a: "Sí, aunque de forma más discreta que el filtro de aire. Un aceite viejo, degradado o de viscosidad inadecuada genera más rozamiento interno entre las piezas del motor, y ese rozamiento se traduce en combustible quemado para vencerlo. Usar exactamente la viscosidad que indica el fabricante (por ejemplo 0W-20 o 5W-30) y respetar los intervalos de cambio mantiene el motor girando con la menor fricción posible. Poner un aceite más espeso del recomendado pensando que protege más suele aumentar ligeramente el consumo, sobre todo en frío.",
    },
    {
      q: "¿Las bujías afectan al gasto?",
      a: "En motores de gasolina, mucho. La bujía produce la chispa que enciende la mezcla; si está gastada, sucia o con la separación de electrodos incorrecta, la chispa es débil y parte de la gasolina no se quema del todo. Eso provoca fallos de encendido, marcha irregular en ralentí, pérdida de potencia y mayor consumo. Cambiar las bujías cuando toca (según tipo, cada 30.000 a 100.000 kilómetros) es una de las reparaciones más baratas con efecto directo en el gasto. Los motores diésel no llevan bujías de encendido, sino calentadores, que influyen sobre todo en el arranque en frío.",
    },
    {
      q: "¿Cada cuánto revisar para gastar menos?",
      a: "Sigue el plan de mantenimiento del fabricante, que suele marcar una revisión cada 15.000 o 20.000 kilómetros, o una vez al año si haces pocos kilómetros. Entre revisiones, vigila tú mismo lo barato y rápido: la presión de los neumáticos cada dos o tres semanas, el aspecto del filtro de aire de vez en cuando y cualquier testigo que se encienda en el cuadro. La pieza que más rentabiliza el dinero invertido suele ser la combinación de neumáticos bien inflados, aceite y filtros en buen estado y bujías o inyectores limpios.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Un coche bien mantenido puede consumir notablemente menos que el mismo
        coche descuidado. <strong>Filtros sucios, aceite degradado, bujías
        gastadas y sensores en mal estado</strong> obligan al motor a quemar
        más gasolina para dar la misma potencia. La buena noticia: casi todo
        es mantenimiento barato y previsible. Respetar el plan del fabricante
        y vigilar cuatro cosas (aire, aceite, encendido y neumáticos) suele
        recuperar buena parte del consumo que se había ido escapando.
      </Answer>

      <Tldr
        items={[
          "Un filtro de aire saturado enriquece la mezcla y sube el consumo; cambiarlo cuesta poco.",
          "El aceite correcto y al día reduce el rozamiento interno del motor.",
          "Bujías o inyectores sucios queman peor la gasolina y disparan el gasto.",
          "Los sensores (lambda, caudalímetro) le dicen a la centralita cuánta gasolina inyectar; si fallan, gastas de más.",
          "El combo más rentable: neumáticos a presión + aceite y filtros al día + encendido sano.",
        ]}
      />

      <h2 id="por-que-gasta-mas">Por qué un coche descuidado gasta más</h2>
      <p>
        Un motor de combustión es, en el fondo, una máquina que convierte
        gasolina o diésel en movimiento. Cada cosa que le pones más difícil
        ese trabajo —más rozamiento, peor mezcla, peor chispa, peor
        información para la centralita— se paga en litros de más. El consumo
        no se dispara de golpe: sube poco a poco, de forma que te acostumbras
        a repostar un poco antes sin darte cuenta de por qué.
      </p>
      <p>
        Hay tres familias de causas que conviene tener claras:
      </p>
      <ul>
        <li>
          <strong>Resistencia mecánica</strong>: rozamiento interno por aceite
          viejo, frenos que rozan, neumáticos deshinchados. El motor gasta
          energía solo en vencer esa resistencia.
        </li>
        <li>
          <strong>Mala combustión</strong>: la mezcla aire/combustible no se
          quema del todo por culpa de un filtro sucio, bujías gastadas o
          inyectores con depósitos. Parte del combustible se desperdicia.
        </li>
        <li>
          <strong>Mala información</strong>: la centralita decide cuánta
          gasolina inyectar a partir de lo que le dicen los sensores. Si un
          sensor miente, la centralita se equivoca y suele pecar por exceso.
        </li>
      </ul>
      <p>
        La mayoría de estos problemas no encienden ningún testigo de avería
        hasta que están avanzados. Por eso el mantenimiento preventivo —
        revisar antes de que falle— es lo que de verdad ahorra. Es la misma
        lógica que aplicar una{" "}
        <Link href="/guias/conducir-ahorrar-combustible">conducción
        eficiente</Link>: pequeños hábitos que, sumados, se notan en el
        depósito.
      </p>

      <h2 id="filtros">Filtros de aire y de combustible</h2>
      <p>
        El <strong>filtro de aire</strong> es la pieza con mejor relación
        entre lo que cuesta y lo que ahorra. Su trabajo es dejar pasar aire
        limpio al motor reteniendo polvo, insectos y hojas. Con el uso se va
        saturando, y cuando está muy obstruido entra menos aire del que el
        motor necesita. El resultado es una mezcla demasiado rica en gasolina:
        el motor quema combustible que no aprovecha del todo.
      </p>
      <ul>
        <li>
          <strong>Cuándo cambiarlo</strong>: de media cada 15.000 a 30.000 km,
          y antes si circulas por caminos sin asfaltar o zonas polvorientas.
        </li>
        <li>
          <strong>Cuánto cuesta</strong>: en torno a 10-25 € la pieza; muchos
          modelos permiten cambiarlo tú mismo en cinco minutos sin
          herramientas.
        </li>
        <li>
          <strong>Cómo comprobarlo</strong>: sácalo y míralo a contraluz. Si
          no pasa la luz y está gris oscuro, toca cambiarlo.
        </li>
      </ul>
      <p>
        El <strong>filtro de combustible</strong> trabaja por dentro:
        retiene impurezas de la gasolina o el diésel antes de que lleguen a
        los inyectores. Cuando se obstruye, el motor recibe menos caudal del
        que debería, pierde fuerza y puede dar tirones a alta carga. Su efecto
        sobre el consumo es más indirecto que el del filtro de aire, pero un
        filtro de combustible muy sucio acaba forzando la bomba y empeorando
        la entrega. Se cambia según el plan del fabricante, normalmente en la
        revisión grande.
      </p>

      <Callout type="info" title="No confundas filtros">
        El filtro de habitáculo (el del aire que respiras dentro del coche,
        a menudo con carbón activo) no tiene nada que ver con el consumo: solo
        afecta a la calidad del aire de la ventilación. El que importa para el
        gasto es el filtro de aire del motor.
      </Callout>

      <h2 id="aceite-viscosidad">Aceite y su viscosidad</h2>
      <p>
        El aceite lubrica el motor y reduce el rozamiento entre piezas que
        giran y rozan miles de veces por minuto. Cuando está viejo o
        degradado pierde propiedades, el rozamiento aumenta y el motor tiene
        que quemar algo más de combustible para mover las mismas piezas. No es
        el factor más espectacular, pero es constante: actúa en cada
        kilómetro.
      </p>
      <p>
        La clave está en la <strong>viscosidad</strong>, ese código del tipo
        0W-20, 5W-30 o 5W-40 que indica cómo de fluido es el aceite en frío y
        en caliente. El fabricante calcula la viscosidad exacta para que el
        motor gire con la mínima fricción posible. Dos errores frecuentes:
      </p>
      <ul>
        <li>
          <strong>Poner un aceite más espeso del recomendado</strong> pensando
          que «protege más». En realidad cuesta más moverlo, sobre todo en los
          primeros minutos en frío, y eso se traduce en algo más de consumo.
        </li>
        <li>
          <strong>Estirar el cambio de aceite</strong> más allá de lo que
          marca el plan. Un aceite agotado lubrica peor y, además del consumo,
          acelera el desgaste del motor.
        </li>
      </ul>
      <p>
        La regla es sencilla: usa exactamente la viscosidad y la norma que pide
        tu manual, y cámbialo cuando toque. Es de los gestos más baratos para
        mantener el consumo a raya, especialmente en trayectos cortos con
        muchos arranques en frío, donde el motor pasa más tiempo en su fase
        menos eficiente (lo vemos en la guía sobre{" "}
        <Link href="/guias/ralenti-arranque-frio-consumo">ralentí y arranque
        en frío</Link>).
      </p>

      <h2 id="bujias-inyectores-sensores">Bujías, inyectores y sensores</h2>
      <p>
        Aquí es donde un mantenimiento descuidado se nota más en motores de
        gasolina. Las <strong>bujías</strong> generan la chispa que enciende
        la mezcla en cada cilindro. Con el tiempo se desgastan, se ensucian y
        la separación entre electrodos cambia; la chispa se vuelve débil y
        parte del combustible no llega a quemarse. Notarás ralentí irregular,
        tirones al acelerar, mayor consumo y, en casos avanzados, el testigo de
        avería del motor.
      </p>
      <ul>
        <li>
          <strong>Intervalo</strong>: muy variable según el tipo. Las de
          cobre se cambian antes; las de platino o iridio aguantan mucho más,
          a veces 90.000-100.000 km. Consulta tu manual.
        </li>
        <li>
          <strong>Diésel</strong>: no llevan bujías de encendido sino
          calentadores, que influyen sobre todo en el arranque en frío, no en
          el consumo en marcha.
        </li>
      </ul>
      <p>
        Los <strong>inyectores</strong> pulverizan el combustible dentro del
        cilindro. Si acumulan depósitos, pulverizan peor y la combustión
        empeora. Mantenerlos limpios con combustible de calidad y, si tu
        mecánico lo recomienda, alguna limpieza puntual, ayuda a sostener el
        consumo. Sobre si los productos de bote cumplen lo que prometen,
        conviene leer{" "}
        <Link href="/guias/aditivos-combustible-sirven">nuestra guía sobre los
        aditivos de combustible</Link> antes de gastar dinero en ellos.
      </p>
      <p>
        Por último, los <strong>sensores</strong>. La centralita decide cuánta
        gasolina inyectar a partir de lo que le dicen el caudalímetro (cuánto
        aire entra) y la sonda lambda (cuánto oxígeno queda en el escape). Si
        uno de estos sensores está sucio o averiado, la centralita recibe
        datos falsos y suele compensar inyectando de más para no dañar el
        motor. Un caudalímetro sucio o una sonda lambda vieja son causas
        clásicas de un consumo que sube «sin explicación».
      </p>

      <CompareTable
        caption="Mantenimiento y su impacto en el consumo (datos típicos en España, 2026)"
        headers={["Elemento", "Coste orientativo", "Cuándo revisar", "Efecto en consumo"]}
        rows={[
          ["Filtro de aire", "~10-25 €", "15.000-30.000 km", "Alto si está muy sucio"],
          ["Aceite (viscosidad correcta)", "~40-90 € el cambio", "Según plan / 1 año", "Constante, moderado"],
          ["Bujías (gasolina)", "~30-80 €", "30.000-100.000 km", "Alto si están gastadas"],
          ["Filtro de combustible", "~15-40 €", "Revisión grande", "Indirecto"],
          ["Sensores (lambda, caudalímetro)", "Variable", "Si hay síntomas/avería", "Alto si fallan"],
        ]}
      />

      <h2 id="lo-que-mas-rentabiliza">El mantenimiento que más rentabiliza</h2>
      <p>
        Si tuvieras que priorizar con poco presupuesto, el orden por relación
        ahorro/coste suele ser este:
      </p>
      <ul>
        <li>
          <strong>Presión de neumáticos</strong>: gratis y de efecto inmediato.
          Es lo primero que debes vigilar; lo desarrollamos en la guía de{" "}
          <Link href="/guias/presion-neumaticos-consumo">presión de
          neumáticos y consumo</Link>.
        </li>
        <li>
          <strong>Filtro de aire</strong>: barato, rápido y con efecto claro
          cuando está saturado.
        </li>
        <li>
          <strong>Aceite correcto y al día</strong>: protege el motor y
          mantiene el rozamiento bajo de forma constante.
        </li>
        <li>
          <strong>Encendido sano</strong>: bujías e inyectores limpios para
          que toda la gasolina se queme.
        </li>
        <li>
          <strong>Sensores</strong>: solo si hay síntomas o el consumo sube
          sin causa aparente; aquí ya conviene un diagnóstico.
        </li>
      </ul>
      <p>
        La forma más sensata de no olvidarte de nada es seguir el plan de
        mantenimiento del fabricante (de media, una revisión cada 15.000-20.000
        km o una vez al año si haces pocos kilómetros) y, entre medias,
        vigilar tú lo barato y rápido. Ese hábito, sumado a una conducción
        suave, es lo que de verdad mantiene el consumo bajo control mes a mes.
      </p>
      <p>
        Y el otro lado de la ecuación: por mucho que cuides el coche, dónde
        repostas también pesa. Llenar siempre en la estación más cara de tu
        zona se come buena parte de lo que ahorras con el mantenimiento. Antes
        de cada lleno, vale la pena comparar el precio real cerca de ti.
      </p>

      <AppCta
        title="Compara el precio real cerca de ti antes de repostar"
        body="Cuidar el coche reduce el consumo; elegir bien la gasolinera reduce el precio por litro. En Carburantes ves los precios oficiales del Ministerio de las estaciones cercanas. Pulsa «Cerca de mí» o busca por municipio."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/presion-neumaticos-consumo", label: "Presión de neumáticos" },
          { href: "/guias/conducir-ahorrar-combustible", label: "Conducir para ahorrar" },
          { href: "/guias/aditivos-combustible-sirven", label: "¿Sirven los aditivos?" },
        ]}
      />
    </>
  );
}

export default guide;
