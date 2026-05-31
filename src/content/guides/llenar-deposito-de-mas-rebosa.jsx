import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "llenar-deposito-de-mas-rebosa";
const title = "Llenar el depósito de más: qué pasa si rebosa";
const description =
  "Seguir repostando tras el primer corte de la pistola puede dañar el sistema anticontaminación del coche. Te explicamos por qué no conviene rematar el depósito.";

const guide = {
  slug,
  title,
  seoTitle: "Llenar de más el depósito: ¿es malo? · Guía",
  description,
  category: "practico",
  datePublished: "2026-05-29",
  dateModified: "2026-05-29",
  readingMinutes: 5,
  keywords: [
    "llenar depósito de más",
    "rebosar gasolina depósito",
    "repostar tras el corte",
    "rematar el depósito malo",
  ],
  mentions: [
    { "@type": "Thing", name: "Canister" },
    { "@type": "Thing", name: "Vapores" },
  ],
  faq: [
    {
      q: "¿Es malo llenar el depósito hasta arriba?",
      a: "Llenar hasta que la pistola corta por primera vez es perfectamente normal y no daña nada: el corte está diseñado para eso. Lo que sí conviene evitar es seguir echando a chorritos para forzar más combustible después del corte. Ese exceso ocupa el espacio de expansión que necesita el depósito y puede empujar combustible líquido hacia el canister, la pieza que retiene los vapores de gasolina. A largo plazo eso puede saturar el canister, ensuciar válvulas y encender el testigo de avería del motor.",
    },
    {
      q: "¿Qué es el canister?",
      a: "El canister es un pequeño recipiente relleno de carbón activo que captura los vapores de combustible que se forman dentro del depósito, sobre todo con calor. En vez de soltarlos a la atmósfera, los retiene y luego el motor los aspira y los quema mientras conduces. Es una pieza clave del sistema anticontaminación de los coches modernos, tanto de gasolina como, en menor medida, de diésel. Si entra gasolina líquida porque has rematado el depósito, el carbón se empapa, pierde capacidad y puede acabar dañado.",
    },
    {
      q: "¿Por qué salta la pistola?",
      a: "La pistola tiene un pequeño orificio cerca de la punta conectado a un tubo de aire. Mientras el depósito se llena, ese orificio aspira aire. Cuando el combustible sube y tapa el orificio, cambia la presión y un mecanismo de vacío cierra la válvula de golpe, cortando el suministro. No es electrónico: es puramente mecánico y muy fiable. El corte se produce dejando a propósito un hueco de aire en la parte alta del depósito para que el combustible pueda dilatarse con el calor.",
    },
    {
      q: "¿Y si he rematado el depósito muchas veces?",
      a: "Una vez no pasa nada y de forma puntual tampoco suele dejar secuelas. El problema aparece cuando se convierte en costumbre repostaje tras repostaje. Los síntomas típicos son que se encienda el testigo de avería del motor, olor a gasolina cerca del coche, dificultad para repostar (la pistola corta una y otra vez) o un ligero aumento de consumo. Si notas algo de esto, llévalo al taller: revisar o sustituir un canister saturado es mucho más barato que ignorarlo. Lo mejor, de cara al futuro, es parar siempre en el primer corte.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        Cuando la pistola corta por primera vez, el depósito está lleno hasta
        su nivel de seguridad y debes <strong>parar ahí</strong>. Seguir
        echando combustible a chorritos para «rematarlo» llena el hueco de
        expansión que el coche reserva a propósito y puede empujar gasolina
        líquida hacia el <strong>canister</strong>, la pieza que retiene los
        vapores. Con el tiempo eso satura el sistema anticontaminación,
        enciende el testigo de avería y, en casos serios, obliga a cambiar
        piezas. Ganas un par de céntimos de gasolina y arriesgas una avería:
        no compensa.
      </Answer>

      <Tldr
        items={[
          "El primer corte de la pistola significa «depósito lleno y seguro»: para ahí.",
          "El coche deja a propósito un hueco de aire arriba para que el combustible se dilate con el calor.",
          "Rematar a chorritos empuja gasolina líquida al canister, que está diseñado solo para vapores.",
          "Un canister saturado enciende el testigo del motor y puede costar una reparación cara.",
          "Lo que ganas rematando son céntimos; lo que arriesgas es una avería evitable.",
        ]}
      />

      <h2 id="por-que-salta-el-corte">Por qué salta el corte de la pistola</h2>
      <p>
        El corte automático de la pistola no es magia ni electrónica: es un
        mecanismo de vacío sencillo y muy fiable. Cerca de la punta de la
        pistola hay un pequeño orificio conectado por un tubito a una válvula
        interna. Mientras el depósito se va llenando, ese orificio está
        aspirando aire sin problema. En el instante en que el combustible sube
        lo suficiente como para tapar el orificio, la presión cambia de golpe,
        el vacío acciona la válvula y el surtidor corta el caudal al instante.
      </p>
      <p>
        Lo importante es <em>dónde</em> se produce ese corte. El surtidor está
        calibrado para detenerse dejando a propósito un hueco de aire en la
        parte superior del depósito —lo que se conoce como volumen o cámara de
        expansión—. Ese hueco no es un defecto: es espacio reservado para que
        el combustible pueda dilatarse con el calor sin generar presión ni
        rebosar. La gasolina y el diésel se expanden notablemente cuando suben
        de temperatura, y un coche aparcado al sol en verano puede calentar el
        depósito varios grados en pocas horas.
      </p>
      <p>
        Por eso, cuando oyes el «clac» del primer corte, el coche te está
        diciendo que el depósito está lleno hasta su nivel de seguridad. No
        hay más sitio útil. Todo lo que metas a partir de ahí ocupa el hueco
        que el fabricante quería dejar vacío.
      </p>

      <h2 id="que-pasa-si-sigues-echando">Qué pasa si sigues echando</h2>
      <p>
        Mucha gente, tras el primer corte, vuelve a apretar el gatillo poco a
        poco para «cuadrar la cifra» o aprovechar al máximo el viaje a la
        gasolinera. El problema es que ese combustible extra no se queda
        tranquilo en el depósito: llena el espacio de expansión y queda
        peligrosamente cerca de las conexiones superiores del sistema de
        ventilación.
      </p>
      <p>
        Cuando el coche se calienta o lo aparcas en pendiente, ese combustible
        rebosado tiene un camino abierto hacia donde no debería ir: las
        tuberías de vapores y, al final de ese recorrido, el canister. El
        sistema está diseñado para gestionar <em>vapores</em> de gasolina, no
        líquido. En cuanto le llega gasolina en estado líquido, empieza el
        problema.
      </p>
      <p>Los efectos más habituales de rematar el depósito son:</p>
      <ul>
        <li>
          <strong>Saturación del canister:</strong> el carbón activo se empapa
          de gasolina líquida y pierde su capacidad de retener vapores.
        </li>
        <li>
          <strong>Testigo de avería del motor (check engine):</strong> el
          sistema detecta una fuga o un fallo en el circuito de vapores y
          enciende la luz. Es uno de los motivos más comunes de que se encienda
          sin causa aparente.
        </li>
        <li>
          <strong>Olor a gasolina</strong> alrededor del coche, sobre todo las
          horas siguientes al repostaje.
        </li>
        <li>
          <strong>Repostajes difíciles:</strong> la pistola corta una y otra
          vez incluso con el depósito medio vacío, porque la ventilación está
          obstruida.
        </li>
        <li>
          <strong>Ralentí inestable</strong> o ligero aumento de consumo si el
          motor aspira más vapores de los que su gestión espera.
        </li>
      </ul>
      <Callout type="warn" title="El derrame también es un riesgo directo">
        Si fuerzas tanto que la gasolina llega a rebosar por el cuello del
        depósito, además de manchar la chapa y la pintura (la gasolina ataca
        el barniz), estás derramando combustible inflamable en una zona con
        vapores. Es una práctica que prohíben las propias gasolineras. Si el
        surtidor ha cortado, déjalo cortado.
      </Callout>

      <h2 id="el-canister-y-los-vapores">El canister y los vapores</h2>
      <p>
        Para entender por qué rematar es contraproducente, hay que conocer al
        protagonista silencioso del depósito: el <strong>canister</strong>. Es
        un recipiente pequeño, normalmente de plástico, relleno de carbón
        activo. Su función es captar los vapores de combustible que se forman
        dentro del depósito —especialmente con calor— y evitar que se escapen a
        la atmósfera.
      </p>
      <p>
        El carbón activo es muy poroso y atrapa esos vapores como una esponja.
        Mientras conduces, una válvula (la válvula de purga) deja que el motor
        aspire esos vapores retenidos y los queme en la combustión, junto con
        el combustible normal. Así el coche no contamina soltando hidrocarburos
        al aire y, de paso, aprovecha hasta la última gota. Es una pieza
        central del sistema anticontaminación de los coches modernos,
        sobre todo de gasolina.
      </p>
      <p>
        El canister está diseñado para trabajar con <strong>vapor</strong>, no
        con líquido. Cuando rematas el depósito y la gasolina líquida le llega,
        el carbón se empapa: deja de absorber vapores, puede degradarse y, en
        los peores casos, partículas de carbón acaban llegando a sitios donde
        no deben. La reparación va desde limpiar y secar el sistema hasta
        sustituir el canister completo, una pieza que no siempre es barata ni
        rápida de cambiar según el modelo.
      </p>
      <p>
        Conviene no confundir esto con otros problemas del depósito, como tener{" "}
        <Link href="/guias/agua-en-el-deposito-sintomas">agua dentro del
        depósito</Link>, que tiene síntomas y causas distintas. Aquí el origen
        es puramente mecánico: meter más combustible del que cabe con margen.
      </p>

      <h2 id="dana-el-coche-rematar-el-deposito">¿Daña el coche rematar el depósito?</h2>
      <p>
        Hacerlo una vez no suele dañar nada, pero convertirlo en costumbre sí
        puede pasarle factura al sistema anticontaminación. El daño no es
        inmediato ni espectacular: es acumulativo. Repostaje tras repostaje,
        empujas un poco de combustible hacia un circuito que solo está
        preparado para vapores, hasta que el canister se satura y aparecen los
        síntomas.
      </p>
      <p>
        La diferencia frente a llenar simplemente hasta el primer corte es
        clara. Esta comparativa resume qué ganas y qué arriesgas en cada caso:
      </p>

      <CompareTable
        caption="Parar en el corte vs. rematar el depósito (datos típicos en España, 2026)"
        headers={["Aspecto", "Parar en el primer corte", "Seguir rematando"]}
        rows={[
          ["Combustible extra", "—", "Apenas ~0,5-1 litro (céntimos)"],
          ["Hueco de expansión", "Se respeta", "Se ocupa por completo"],
          ["Riesgo para el canister", "Ninguno", "Saturación progresiva"],
          ["Testigo de avería", "No", "Posible a medio plazo"],
          ["Riesgo de derrame", "Nulo", "Real con calor o pendiente"],
          ["Coste si hay avería", "0 €", "Reparación del sistema de vapores"],
        ]}
      />

      <p>
        Visto así, la cuenta no sale. El combustible que «ganas» rematando es
        ridículo —en torno a medio litro, unos céntimos— y desaparece en cuanto
        consumes los primeros kilómetros. A cambio, te expones a una reparación
        que cuesta bastante más que esos céntimos. Si lo que buscas es ahorrar
        de verdad, el dinero está en{" "}
        <Link href="/guias/cuanto-se-ahorra-comparando-gasolineras">comparar el
        precio entre gasolineras</Link>, no en exprimir el surtidor.
      </p>

      <Callout type="note" title="¿Y los coches con etiqueta de capacidad?">
        Algunos fabricantes admiten que tras el corte aún caben unas décimas de
        litro «de seguridad». Aun así, la recomendación general de los
        manuales es la misma: no insistir más allá del corte automático. Si
        tienes dudas con tu modelo concreto, el manual de usuario manda y, ante
        cualquier síntoma raro, conviene confirmarlo en el taller oficial.
      </Callout>

      <h2 id="como-repostar-bien">Cómo repostar bien</h2>
      <p>
        Evitar el problema es tan sencillo como respetar lo que te dice el
        surtidor. Estas son las pautas que marcan la diferencia:
      </p>
      <ul>
        <li>
          <strong>Para en el primer corte.</strong> Es la regla de oro. Cuando
          la pistola haga «clac», retírala. No vuelvas a apretar el gatillo
          para forzar más.
        </li>
        <li>
          <strong>Usa el bloqueo del gatillo con cabeza.</strong> El gancho que
          mantiene la pistola abierta es cómodo, pero confía en su corte
          automático y no te pongas a echar manualmente después.
        </li>
        <li>
          <strong>No persigas una cifra redonda.</strong> Que el ticket marque
          50,00 € exactos no merece arriesgar el canister. Deja el importe que
          salga.
        </li>
        <li>
          <strong>Reposta con el motor apagado</strong> y sin fumar ni usar el
          móvil pegado al surtidor: son normas de seguridad básicas, no
          opcionales.
        </li>
        <li>
          <strong>Si vas justo de tiempo o de dinero</strong>, recuerda que no
          siempre hace falta llenar a tope; aquí te ayudamos a decidir entre{" "}
          <Link href="/guias/lleno-o-medio-deposito">llenar o medio
          depósito</Link> según tu uso.
        </li>
      </ul>
      <p>
        Repostar bien es, en el fondo, una rutina de pocos segundos. Si quieres
        repasar el proceso completo —desde aparcar bien hasta cerrar el tapón—,
        tienes el detalle en la guía de{" "}
        <Link href="/guias/repostar-correctamente-pasos">cómo repostar paso a
        paso</Link>.
      </p>

      <AppCta
        title="Llena lo justo y en la gasolinera más barata"
        body="En Carburantes ves los precios oficiales del Ministerio actualizados cada media hora. Pulsa «Cerca de mí» o busca por municipio para repostar al mejor precio sin tener que rematar el depósito."
        href="/"
        linkLabel="Buscar gasolineras"
      />

      <InternalLinks
        title="Te puede interesar"
        links={[
          { href: "/guias/repostar-correctamente-pasos", label: "Cómo repostar paso a paso" },
          { href: "/guias/me-he-equivocado-combustible", label: "Me he equivocado de combustible" },
          { href: "/guias/lleno-o-medio-deposito", label: "¿Lleno o medio depósito?" },
        ]}
      />
    </>
  );
}

export default guide;
