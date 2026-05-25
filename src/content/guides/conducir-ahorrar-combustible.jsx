import Link from "next/link";
import { Answer, Tldr, Callout, AppCta, InternalLinks } from "./_components";

const slug = "conducir-ahorrar-combustible";
const title = "Cómo conducir para gastar menos combustible: 15 trucos reales";
const description =
  "Conducción eficiente probada: cómo reducir hasta un 20 % el consumo de tu coche con cambios pequeños. Estos hábitos los enseñan en autoescuela y en cursos profesionales.";

const guide = {
  slug,
  title,
  seoTitle: "Cómo conducir gastando menos: 15 trucos · Guía",
  description,
  category: "ahorro",
  datePublished: "2026-05-25",
  dateModified: "2026-05-25",
  readingMinutes: 8,
  keywords: [
    "cómo conducir gastar menos gasolina",
    "conducción eficiente trucos",
    "reducir consumo coche",
    "hipermilling España",
    "ahorrar combustible diésel",
  ],
  mentions: [
    { "@type": "Thing", name: "Conducción eficiente" },
    { "@type": "Thing", name: "Hipermilling" },
  ],
  howTo: {
    name: "Cómo conducir para gastar menos combustible",
    description: "15 hábitos de conducción eficiente que reducen el consumo entre un 15 % y un 20 %.",
    totalTime: "PT5M",
    steps: [
      { name: "Acelerar suavemente", text: "Acelera de forma progresiva sin pisar más del 60-70 % del recorrido del acelerador. Las arrancadas bruscas duplican el consumo instantáneo.", anchor: "trucos" },
      { name: "Mantener velocidad constante", text: "Usa el control de crucero en autopista y carreteras llanas. Las oscilaciones de velocidad gastan más combustible.", anchor: "trucos" },
      { name: "Anticipar frenadas", text: "Mira lejos. Soltar acelerador antes y dejar que el coche desacelere por inercia evita usar el motor para frenar.", anchor: "trucos" },
      { name: "Subir marcha antes", text: "En coches manuales, pasa a quinta o sexta cuanto antes (sobre 2.000 rpm en diésel, 2.500 en gasolina).", anchor: "trucos" },
      { name: "Reducir velocidad", text: "Ir a 110 km/h en lugar de 120 km/h reduce el consumo un 12-15 %. La resistencia del aire crece al cuadrado de la velocidad.", anchor: "trucos" },
    ],
  },
  faq: [
    {
      q: "¿Cuánto puedo ahorrar conduciendo mejor?",
      a: "Entre un 15 % y un 20 % menos consumo es perfectamente alcanzable aplicando hábitos básicos: acelerar suave, anticipar frenadas, mantener velocidad constante y subir marchas antes. Eso son ~200-350 € al año en un conductor medio español (15.000 km/año).",
    },
    {
      q: "¿Bajar la velocidad realmente compensa?",
      a: "Sí, mucho. La resistencia aerodinámica crece al cuadrado de la velocidad. Pasar de 120 a 110 km/h reduce el consumo entre un 12 y un 15 % y solo te hace tardar 5 minutos más cada 100 km.",
    },
    {
      q: "¿Conducir con el aire acondicionado gasta tanto?",
      a: "Sí, entre un 5 y un 15 % más consumo. Pero en ciudad o tráfico denso compensa frente a bajar las ventanillas. En autopista por encima de 90 km/h, el aire suele ser mejor que ventanillas bajadas (la resistencia aerodinámica gasta más que el A/A).",
    },
    {
      q: "¿Apagar el motor en semáforos ahorra?",
      a: "Si vas a estar parado más de 20-30 segundos, sí. Por debajo de eso, el consumo del arranque iguala al del ralentí. Por suerte, casi todos los coches modernos tienen sistema start-stop que lo hace automáticamente y considera múltiples variables.",
    },
    {
      q: "¿Llenar el depósito hace que gaste más por el peso?",
      a: "Sí, pero es despreciable. 50 L de combustible pesan ~40 kg, lo que aumenta el consumo aproximadamente un 0,2 %. Es muchísimo menos que el ahorro de tiempo y desplazamientos que supone llenar el depósito completo cuando vas a una gasolinera barata.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Aplicando 4-5 hábitos de conducción eficiente puedes reducir tu
        consumo de combustible entre un <strong>15 % y un 20 %</strong>: acelera
        progresivamente, mantén velocidad constante en autopista, anticipa
        las frenadas, sube de marcha antes y reduce 10 km/h tu velocidad
        de crucero. En un conductor medio español de 15.000 km/año eso son
        entre 200 y 350 € de ahorro anual en combustible.
      </Answer>

      <Tldr
        items={[
          "Ahorro real con buenos hábitos: 15-20 % menos consumo.",
          "Bajar 10 km/h en autopista = -12-15 % de consumo.",
          "Acelerar suave + anticipar frenadas = gran parte del ahorro.",
          "El uso del A/A vs ventanillas: A/A gana por encima de 90 km/h.",
        ]}
      />

      <h2 id="por-que-importa">Por qué importa la forma de conducir</h2>
      <p>
        Dos conductores pueden hacer exactamente el mismo recorrido en el
        mismo coche y consumir entre un 20 % y un 30 % distinto. Esa
        diferencia se traduce en ~400 € al año para un usuario medio. La
        conducción eficiente no es ir lento ni «conducir mal»: es
        anticipación + suavidad + uso correcto de la mecánica.
      </p>
      <p>
        Esta no es una guía teórica: los siguientes 15 hábitos son los
        mismos que enseñan los cursos profesionales de conducción
        eficiente del Idae (Instituto para la Diversificación y Ahorro de
        la Energía) y los cursos de seguridad de transportistas.
      </p>

      <h2 id="trucos">15 hábitos que sí funcionan</h2>

      <h3>1. Acelera suave y progresivamente</h3>
      <p>
        Las arrancadas bruscas son la principal fuga de combustible en
        ciudad. Cada vez que pisas el acelerador a fondo, los inyectores
        meten una cantidad enorme de combustible para acelerar al máximo.
        Acelerando al 60-70 % del recorrido del pedal consigues casi la
        misma aceleración con la mitad de combustible.
      </p>

      <h3>2. Cambia de marcha antes</h3>
      <p>
        Los motores modernos generan más par a bajas revoluciones. Lo
        ideal es subir marcha:
      </p>
      <ul>
        <li>Diésel: en torno a las 1.800-2.000 rpm.</li>
        <li>Gasolina: en torno a las 2.000-2.500 rpm.</li>
      </ul>
      <p>
        Muchos coches actuales tienen un indicador en el cuadro de mandos
        (una flechita ↑) que te avisa exactamente cuándo conviene cambiar.
        Si tienes cambio automático, deja que él decida — están
        programados para ser eficientes.
      </p>

      <h3>3. Mantén velocidad constante</h3>
      <p>
        Las oscilaciones de velocidad gastan combustible: acelerar y frenar
        repetidamente convierte energía cinética en calor en los frenos. En
        autopista y carreteras llanas, usa el control de crucero. La
        diferencia respecto a un conductor que «pisa y suelta» constantemente
        puede llegar al 10 % de consumo.
      </p>

      <h3>4. Anticipa las frenadas</h3>
      <p>
        Mira lejos. Si ves un semáforo en rojo a 200 metros, suelta el
        acelerador ya — el coche desacelerará por inercia y, en muchos
        casos, el semáforo cambiará antes de llegar. Frenar fuerte al
        último momento es energía desperdiciada.
      </p>

      <h3>5. Aprovecha el freno motor</h3>
      <p>
        En las bajadas largas, mantén una marcha engranada (no en punto
        muerto). En coches modernos, soltar el acelerador con una marcha
        engranada activa el corte de inyección: el motor consume
        literalmente <em>cero</em> combustible mientras el coche frena por
        su cuenta.
      </p>

      <h3>6. Reduce tu velocidad de crucero 10 km/h</h3>
      <p>
        Es el cambio más infravalorado. La resistencia del aire crece al
        cuadrado de la velocidad, así que pasar de 130 a 120 km/h reduce
        el consumo un 8-10 %; pasar de 120 a 110 km/h lo reduce un 12-15 %
        adicional. Y en términos de tiempo: 10 km/h menos solo te hace
        tardar 5 minutos más cada 100 km.
      </p>

      <h3>7. Mantén la presión correcta de los neumáticos</h3>
      <p>
        Un neumático con 0,5 bar menos de presión aumenta el consumo un
        2-4 %. Revisa la presión una vez al mes en cualquier gasolinera (el
        compresor suele ser gratis para clientes). La presión recomendada
        aparece en una pegatina en el marco de la puerta del conductor.
      </p>

      <h3>8. Quita la baca y el portabicis cuando no los uses</h3>
      <p>
        Una baca vacía aumenta el consumo entre un 5 % y un 15 % por la
        resistencia aerodinámica. Si solo la usas en vacaciones, no
        merece la pena el gasto extra durante el resto del año.
      </p>

      <h3>9. Sin peso muerto en el maletero</h3>
      <p>
        Cada 100 kg extra suben el consumo un 5 % aproximadamente. Vacía
        el maletero de cosas que no necesites: la silla del bebé que no
        usas, las herramientas que no llevas, la rueda de invierno que ya
        no toca.
      </p>

      <h3>10. Aire acondicionado: con criterio</h3>
      <p>
        El A/A consume entre un 5 % y un 15 % adicional. Pero por encima
        de 80-90 km/h, llevar las ventanillas bajadas <em>también</em>
        consume más por la resistencia aerodinámica que crean. La regla:
      </p>
      <ul>
        <li>Hasta 80 km/h: ventanillas bajadas si no hace mucho calor.</li>
        <li>Por encima de 80 km/h: A/A.</li>
        <li>En ciudad parado: el A/A pasa poco volumen por el motor.</li>
      </ul>

      <h3>11. Arranca sin pisar el embrague ni acelerar</h3>
      <p>
        Los motores modernos no necesitan precalentamiento ni pisotones
        de acelerador para arrancar. Arrancar y salir a velocidad
        moderada los primeros 2-3 km, sin revolucionar, es lo más
        eficiente y prolonga la vida del motor.
      </p>

      <h3>12. Usa el start-stop</h3>
      <p>
        Si tu coche lo lleva, no lo desactives. Apagar el motor más de 10
        segundos ahorra combustible y reduce emisiones en la ciudad. Los
        sistemas modernos están preparados para múltiples ciclos
        diarios.
      </p>

      <h3>13. Planifica los repostajes</h3>
      <p>
        No hagas viajes específicos para repostar a una gasolinera barata
        que esté lejos: la gasolina que gastas para llegar puede comerse
        el ahorro. Usa <Link href="/cerca">Carburantes</Link> para repostar
        en la más barata que ya esté en tu ruta diaria.
      </p>

      <h3>14. Mantén el coche en buen estado</h3>
      <p>
        Filtros sucios, bujías gastadas, aceite viejo: todos suben el
        consumo entre 3 % y 8 %. Las revisiones periódicas no son solo
        para evitar averías, también son una inversión directa en
        eficiencia.
      </p>

      <h3>15. Evita atajos en hora punta</h3>
      <p>
        Un atajo por ciudad llena de semáforos puede consumir el doble
        que la autopista equivalente. En ciudad, el consumo medio es
        ~50 % superior al de carretera por las paradas constantes.
      </p>

      <Callout type="info" title="Ahorro acumulado real">
        Aplicando solo los puntos 1, 3, 4, 6 y 7 (los más impactantes),
        un usuario medio puede pasar fácilmente de 7 L/100 km a 5,8
        L/100 km. En 15.000 km al año, eso son <strong>180 litros menos
        de combustible</strong> = ~280 € de ahorro anual. Sin cambiar
        de coche.
      </Callout>

      <h2 id="hipermilling">¿Y el hipermilling?</h2>
      <p>
        El <em>hipermilling</em> es llevar la conducción eficiente al
        extremo. Practicantes en EE.UU. consiguen reducir el consumo de
        sus coches hasta un 50 % respecto a la cifra homologada,
        empleando técnicas como:
      </p>
      <ul>
        <li>Conducir en punto muerto cuesta abajo (¡prohibido en España!).</li>
        <li>Aprovechar la rebufo de camiones (peligroso y multado).</li>
        <li>Sobreinflar los neumáticos (compromete agarre).</li>
      </ul>
      <p>
        La mayoría de técnicas hipermilling sacrifican seguridad o legalidad
        para ahorrar unos céntimos más. No las recomendamos. Los 15 puntos
        anteriores son sensatos, legales y suman entre un 15-20 % de
        ahorro sin renunciar a nada.
      </p>

      <AppCta
        title="Reposta en la más barata cerca"
        body="Combina conducción eficiente con repostar siempre al mejor precio. Carburantes te muestra las gasolineras de tu zona ordenadas por precio actualizado."
        href="/cerca"
        linkLabel="Ver gasolineras cerca"
      />

      <InternalLinks
        title="Sigue ahorrando"
        links={[
          { href: "/guias/gasolineras-low-cost", label: "Gasolineras low cost: ¿calidad igual?" },
          { href: "/guias/mejor-hora-dia-repostar", label: "Mejor día y hora para repostar" },
          { href: "/guias/descuentos-tarjetas-gasolineras", label: "Descuentos de tarjetas de gasolinera" },
          { href: "/guias/coche-diesel-o-gasolina", label: "Diésel o gasolina: cuál comprar" },
        ]}
      />
    </>
  );
}

export default guide;
