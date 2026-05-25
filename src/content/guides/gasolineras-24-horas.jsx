import Link from "next/link";
import { Answer, Tldr, Callout, AppCta, InternalLinks } from "./_components";

const slug = "gasolineras-24-horas";
const title = "Gasolineras 24 horas: cómo encontrarlas y qué esperar";
const description =
  "Encuentra estaciones de servicio abiertas 24 horas en cualquier ciudad de España, qué servicios siguen disponibles de madrugada y diferencias entre atendida y desatendida nocturna.";

const guide = {
  slug,
  title,
  seoTitle: "Gasolineras 24 horas cerca: cómo encontrarlas · Guía",
  description,
  category: "practico",
  datePublished: "2026-05-25",
  dateModified: "2026-05-25",
  readingMinutes: 5,
  keywords: [
    "gasolinera 24 horas cerca",
    "estación de servicio abierta noche",
    "gasolinera abierta madrugada",
    "gasolineras desatendidas 24h",
    "repostar de noche",
  ],
  mentions: [
    { "@type": "Thing", name: "Gasolinera 24 horas" },
  ],
  faq: [
    {
      q: "¿Cómo encuentro una gasolinera 24 horas cerca de mí ahora mismo?",
      a: "Pulsa 'Cerca de mí' en Carburantes y mira el horario que aparece en cada ficha. Las estaciones con horario 'L-D 24 H' están abiertas 24 horas todos los días. La mayoría de Ballenoil, Plenoil, Repsol grandes, Cepsa de autopista y las desatendidas de hipermercado abren toda la noche.",
    },
    {
      q: "¿Las gasolineras 24 horas son siempre desatendidas de noche?",
      a: "No siempre. Las grandes (Repsol, Cepsa, BP de carretera principal) suelen tener personal toda la noche. Las low cost (Ballenoil, Plenoil, Petroprix) son desatendidas todo el día, así que de noche el funcionamiento es idéntico al diurno: pagas con tarjeta o app en el surtidor.",
    },
    {
      q: "¿Puedo pagar en efectivo en una gasolinera 24h de noche?",
      a: "Si está atendida con personal, sí (entrando dentro de la cabina blindada). Si es desatendida, necesitas tarjeta bancaria o app. Algunas grandes urbanas ponen el surtidor en modo desatendido tras las 22:00, así que conviene llevar tarjeta de respaldo siempre que repostes de noche.",
    },
    {
      q: "¿La tienda y el café están abiertos toda la noche?",
      a: "Generalmente no. Aunque el surtidor funcione 24 h, la tienda interior puede cerrar a las 22:00 o 24:00, especialmente en estaciones urbanas. En autopista y áreas de servicio grandes (Repsol Smart, Cepsa Premium) la tienda suele mantenerse abierta toda la noche.",
    },
    {
      q: "¿Es peligroso repostar en una gasolinera desatendida de madrugada?",
      a: "Estadísticamente las gasolineras desatendidas modernas son muy seguras: están bien iluminadas, con cámaras de vigilancia, y no hay caja con efectivo (lo que reduce el riesgo de atraco). Si te sientes inseguro, las grandes atendidas con personal y otros clientes son siempre opción.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Para encontrar una gasolinera 24 horas cerca, abre{" "}
        <Link href="/cerca">Carburantes</Link> y mira el horario en cada
        estación: las que indican <em>L-D 24 H</em> están abiertas todos los
        días sin cierre. En ciudades grandes hay decenas; en pueblos
        pequeños puede no haber ninguna y conviene planificar. La mayoría
        de las low cost (Ballenoil, Plenoil, Petroprix) y muchas grandes
        de marca operan 24 h, aunque de noche puede ser <em>desatendidas</em>{" "}
        (pago solo con tarjeta).
      </Answer>

      <Tldr
        items={[
          "Filtra por horario 'L-D 24 H' en Carburantes para ver solo las 24 h.",
          "Low cost (Ballenoil, Plenoil...) suelen ser desatendidas 24 h.",
          "Grandes urbanas: muchas atendidas hasta las 22-24 h, desatendidas después.",
          "De madrugada lleva siempre tarjeta bancaria — el efectivo no funciona.",
        ]}
      />

      <h2 id="como-encontrar">Cómo encontrar una abierta cerca ahora</h2>
      <p>
        En Carburantes, cada gasolinera muestra su horario tal como lo
        declara al Ministerio. Hay tres patrones habituales:
      </p>
      <ul>
        <li>
          <strong>L-D 24 H</strong>: abierta 24 horas, los 7 días de la
          semana. Esta es la categoría «true 24 horas».
        </li>
        <li>
          <strong>L-D 06:00-22:00</strong> (o similar): horario amplio
          pero con cierre nocturno. Útil de día y para reposo temprano,
          pero no si te quedas tirado a las 3 AM.
        </li>
        <li>
          <strong>L-V 07:00-21:00 / S 09:00-14:00</strong>: estación
          urbana de oficina o pueblo pequeño. No es opción para
          madrugada ni fines de semana tarde.
        </li>
      </ul>
      <p>
        Para filtrar rápido las 24 horas, pulsa{" "}
        <Link href="/cerca">«Cerca de mí»</Link> y revisa el horario en
        la lista — viene visible en cada ficha. En la página de un{" "}
        <Link href="/municipio">municipio</Link> concreto puedes ordenar
        por precio y mirar el horario después.
      </p>

      <Callout type="info" title="Truco para viajes nocturnos">
        Si haces ruta de noche por autopista, planifica un repostaje
        estratégico antes de la medianoche en una zona urbana con
        muchas estaciones grandes — Madrid, Barcelona, Valencia,
        Zaragoza, etc.). En tramos rurales de la A-3, A-66, AP-7
        las opciones nocturnas se reducen mucho.
      </Callout>

      <h2 id="atendida-vs-desatendida-noche">Atendida vs desatendida de noche</h2>
      <p>
        Una gasolinera 24 h puede tener dos modos de funcionamiento de
        madrugada:
      </p>

      <h3>Atendida (con personal)</h3>
      <p>
        Suele ser de marca grande (Repsol Smart, Cepsa Premium, BP, Galp
        de autopista, áreas de servicio de la AP-7, A-2, A-4, etc.).
        Ofrece:
      </p>
      <ul>
        <li>
          Persona dentro de una cabina blindada que opera surtidor y
          tienda.
        </li>
        <li>Pago en efectivo o tarjeta.</li>
        <li>Tienda con alimentos, bebidas, café.</li>
        <li>Baño, agua, posiblemente ducha (en grandes áreas).</li>
      </ul>

      <h3>Desatendida (sin personal)</h3>
      <p>
        Es lo normal en las{" "}
        <Link href="/guias/gasolineras-low-cost">low cost</Link>{" "}
        (Ballenoil, Plenoil, Petroprix, EasyGas) y también en muchas
        grandes urbanas tras la medianoche. Funciona:
      </p>
      <ul>
        <li>
          Pago directamente en el surtidor con tarjeta bancaria o app.
        </li>
        <li>No hay tienda, ni café, ni personal.</li>
        <li>Iluminación + cámaras de vigilancia 24 h.</li>
        <li>Botón de emergencia conectado a centralita en algunas.</li>
      </ul>

      <h2 id="seguridad">¿Es seguro repostar de madrugada?</h2>
      <p>
        Sí, en términos generales. Las gasolineras 24 h modernas
        cumplen estándares de seguridad altos:
      </p>
      <ul>
        <li>
          Las desatendidas no almacenan efectivo, lo que las hace muy
          poco atractivas para atracos.
        </li>
        <li>
          Las atendidas tienen cabinas blindadas con cristal
          antibalas y caja fuerte con apertura retardada.
        </li>
        <li>
          Cámaras de vigilancia conectadas habitualmente con la central
          de la marca, con grabación 24 h.
        </li>
        <li>
          Iluminación muy potente que cubre todo el área de surtidor.
        </li>
      </ul>
      <p>
        Aun así, conviene aplicar el sentido común habitual: aparcar
        en el surtidor más iluminado, cerrar el coche mientras pagas si
        es desatendida, y no aceptar ayuda no solicitada de
        desconocidos.
      </p>

      <h2 id="que-no-encontraras">Lo que NO encontrarás a las 3 AM</h2>
      <p>
        Aunque la estación esté abierta y puedas repostar, algunos
        servicios suelen cerrar:
      </p>
      <ul>
        <li>
          <strong>Tienda interior</strong> en estaciones urbanas:
          muchas cierran a las 22:00 o 00:00 aunque el surtidor siga
          abierto.
        </li>
        <li>
          <strong>Túnel de lavado</strong>: rara vez abierto de noche.
        </li>
        <li>
          <strong>Pago en efectivo</strong>: si el resto está en modo
          desatendido nocturno.
        </li>
        <li>
          <strong>Servicio de mecánico/cambio de aceite</strong>: salvo
          en áreas de servicio muy grandes de carretera principal.
        </li>
        <li>
          <strong>Atención al cliente para incidencias</strong>: si la
          tarjeta da error, en una desatendida solo queda llamar al
          número de atención que aparece en el surtidor (suele atender
          una centralita).
        </li>
      </ul>

      <h2 id="alternativas">Si no hay 24 h cerca</h2>
      <p>
        En pueblos pequeños y carreteras secundarias puede no haber
        ninguna gasolinera 24 h en 50 km a la redonda. Las
        alternativas:
      </p>
      <ul>
        <li>
          Antes de viajar de noche por zonas rurales, comprueba la
          ruta y planifica el repostaje en una ciudad grande de paso.
        </li>
        <li>
          Apps oficiales de la DGT y de las marcas (Waylet de Repsol,
          BPme, etc.) tienen mapa de estaciones 24 h.
        </li>
        <li>
          Lleva siempre el depósito por encima de un cuarto si
          conduces de noche por rutas secundarias. Quedarte sin
          combustible en mitad de la nada a las 3 AM es un mal
          recuerdo seguro.
        </li>
      </ul>

      <AppCta
        title="Encuentra una abierta ahora"
        body="Pulsa 'Cerca de mí' y revisa el horario de cada estación. Carburantes muestra el horario declarado al Ministerio en cada ficha."
        href="/cerca"
        linkLabel="Ver gasolineras cerca"
      />

      <InternalLinks
        title="Más guías prácticas"
        links={[
          { href: "/guias/gasolineras-low-cost", label: "Gasolineras low cost (casi todas 24 h)" },
          { href: "/guias/mejor-hora-dia-repostar", label: "Mejor día y hora para repostar" },
          { href: "/guias/conducir-ahorrar-combustible", label: "Conducir para ahorrar combustible" },
          { href: "/guias/etiqueta-dgt-combustible", label: "Etiqueta DGT por combustible" },
        ]}
      />
    </>
  );
}

export default guide;
