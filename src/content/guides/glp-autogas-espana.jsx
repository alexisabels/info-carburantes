import Link from "next/link";
import { Answer, Tldr, Callout, CompareTable, AppCta, InternalLinks } from "./_components";

const slug = "glp-autogas-espana";
const title = "GLP (autogas) en España: precio, consumo y red de gasolineras";
const description =
  "El GLP cuesta la mitad que la gasolina y obtiene etiqueta ECO. Te explicamos qué es, qué coches pueden convertirse y dónde repostar autogas en España.";

const guide = {
  slug,
  title,
  seoTitle: "GLP autogas en España: precio y red · Guía",
  description,
  category: "tipos-combustible",
  datePublished: "2026-05-25",
  dateModified: "2026-05-25",
  readingMinutes: 7,
  keywords: [
    "GLP autogas precio España",
    "qué es el GLP coche",
    "convertir coche a GLP",
    "gasolineras GLP cerca",
    "etiqueta ECO GLP",
  ],
  mentions: [
    { "@type": "Thing", name: "GLP" },
    { "@type": "Thing", name: "Autogas" },
    { "@type": "Thing", name: "Etiqueta ECO DGT" },
  ],
  faq: [
    {
      q: "¿Cuánto cuesta el GLP en España?",
      a: "Entre 0,85 € y 1,05 € por litro en 2026, aproximadamente la mitad del precio de la gasolina 95. El consumo de un coche GLP es ~15-20 % superior al de gasolina, así que el coste por kilómetro queda en torno al 40 % por debajo de la gasolina.",
    },
    {
      q: "¿Cualquier coche se puede convertir a GLP?",
      a: "Casi cualquier coche de gasolina con inyección puede transformarse a sistema bi-fuel (gasolina + GLP). Los diésel NO se convierten. La instalación cuesta entre 1.500 y 2.500 € en taller homologado e incluye depósito secundario, conmutador y kit de inyección.",
    },
    {
      q: "¿El coche GLP tiene etiqueta ECO?",
      a: "Sí. Todos los coches bi-fuel gasolina/GLP que cumplan al menos la norma Euro 4 obtienen etiqueta ECO de la DGT, lo que da acceso a las ZBE (Zonas de Bajas Emisiones) de Madrid, Barcelona y otras grandes ciudades, así como descuentos en aparcamiento regulado.",
    },
    {
      q: "¿Cuántas gasolineras tienen GLP en España?",
      a: "Alrededor de 800-900 estaciones de servicio venden GLP en 2026, repartidas por toda España con mayor concentración en áreas urbanas y corredores principales. La red es suficiente para uso cotidiano pero hay que planificar repostajes en rutas por zonas rurales.",
    },
    {
      q: "¿El GLP es seguro? ¿Y si hay un accidente?",
      a: "Sí, el GLP es muy seguro. Los depósitos están diseñados para resistir impactos y temperatura, llevan válvulas de sobrepresión que liberan gas en caso de incendio sin explosión, y la legislación obliga a inspecciones periódicas (cada 4 años en ITV). En la práctica, los coches GLP no son más peligrosos que los de gasolina.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <Answer>
        El <strong>GLP (Gas Licuado del Petróleo)</strong>, también llamado
        autogas, es una mezcla de propano y butano usada como combustible de
        automoción. Cuesta entre 0,85 y 1,05 €/L en España (la mitad que la
        gasolina), un coche convertido consume un 15-20 % más pero gasta
        ~40 % menos en combustible por kilómetro, obtiene <strong>etiqueta
        ECO</strong> de la DGT y se reposta en unas 800-900 gasolineras
        repartidas por todo el país.
      </Answer>

      <Tldr
        items={[
          "Precio: 0,85-1,05 €/L. ~40 % de ahorro real por kilómetro frente a gasolina.",
          "Etiqueta ECO DGT: acceso libre a ZBE de Madrid, Barcelona, etc.",
          "Instalación bi-fuel: 1.500-2.500 € en taller homologado.",
          "Red en España: ~800-900 estaciones (vs ~10.500 totales).",
        ]}
      />

      <h2 id="que-es">Qué es el GLP y por qué es tan barato</h2>
      <p>
        El GLP es una mezcla de hidrocarburos ligeros — principalmente
        <strong>propano (C₃H₈) y butano (C₄H₁₀)</strong> — subproducto del
        refino del petróleo y de la extracción de gas natural. Lo que aquí
        llamamos «gas butano» de las bombonas naranjas y el «autogas» que
        reposta tu coche son químicamente lo mismo, con proporciones
        ligeramente distintas según el uso.
      </p>
      <p>
        Es barato por dos razones: la materia prima es un subproducto que
        de otro modo se quemaría o se vendería como gas industrial, y la
        fiscalidad española lo bonifica para incentivar combustibles menos
        contaminantes. El impuesto especial sobre el GLP es de unos 6
        céntimos/L frente a ~37 céntimos/L del gasóleo o ~47 céntimos/L de
        la gasolina, lo que explica buena parte del diferencial de precio
        final.
      </p>

      <h2 id="ventajas">Ventajas del GLP en un coche</h2>
      <ul>
        <li>
          <strong>Ahorro real del 40 % por km</strong>: aun consumiendo
          15-20 % más volumen, el precio menor compensa con creces.
        </li>
        <li>
          <strong>Etiqueta ECO DGT</strong>: entrada libre a Madrid Central,
          Barcelona ZBE Rondas y todas las zonas urbanas restringidas.
          Descuentos en SER/ORA en muchas ciudades.
        </li>
        <li>
          <strong>Bi-fuel = autonomía duplicada</strong>: el coche conserva
          su depósito de gasolina y suma el de GLP. Con dos llenos puedes
          superar fácilmente los 800-1.000 km de autonomía.
        </li>
        <li>
          <strong>Emisiones más limpias</strong>: ~10 % menos CO₂, menos
          NOx que el diésel y prácticamente cero partículas en suspensión.
        </li>
        <li>
          <strong>Motor más silencioso y suave</strong>: el GLP quema con
          octanaje equivalente a 105-110, así que el motor funciona suave.
        </li>
      </ul>

      <h2 id="inconvenientes">Lo que hay que tener en cuenta</h2>
      <ul>
        <li>
          <strong>Inversión inicial</strong>: 1.500-2.500 € de instalación en
          taller homologado. Se amortiza en ~50.000-80.000 km según
          kilometraje.
        </li>
        <li>
          <strong>Espacio en el maletero</strong>: el depósito GLP suele
          alojarse en el hueco de la rueda de repuesto. Si tu coche tiene
          repuesto físico, lo perderás (queda un kit de inflado).
        </li>
        <li>
          <strong>Red más limitada</strong>: ~800-900 estaciones frente a
          ~10.500 totales. Suficiente en ciudad y autopista, escasa en
          rutas rurales. Como el coche es bi-fuel, puedes pasar a gasolina
          cuando no encuentres.
        </li>
        <li>
          <strong>Mantenimiento adicional</strong>: revisión específica del
          sistema GLP cada 30.000-40.000 km (cambio de filtro, válvulas) y
          peritaje obligatorio cada 4 años en ITV.
        </li>
        <li>
          <strong>Aparcamientos subterráneos</strong>: algunos prohíben
          coches de GLP por normativa anti-incendios local; consulta antes
          de fiarte solo del GLP si vives en finca con garaje subterráneo.
        </li>
      </ul>

      <h2 id="conversion">Conversión de un coche a GLP</h2>
      <p>
        Solo coches de <strong>gasolina con inyección</strong> (prácticamente
        todos desde mediados de los 90) pueden convertirse a bi-fuel. Los
        coches diésel no son convertibles. El proceso típico incluye:
      </p>
      <ol>
        <li>Instalación del depósito GLP (en rueda de repuesto o bajo el chasis).</li>
        <li>Cableado de inyectores adicionales en el colector de admisión.</li>
        <li>Centralita electrónica que gestiona la conmutación.</li>
        <li>Conmutador en salpicadero (a veces dentro de la pantalla).</li>
        <li>Homologación, pasada por ITV específica y actualización de ficha técnica.</li>
      </ol>
      <p>
        Solo talleres certificados pueden hacer la instalación y la garantía
        original del coche puede quedar afectada parcialmente (los
        componentes del sistema GLP los garantiza el instalador, no el
        fabricante del coche).
      </p>

      <CompareTable
        caption="Coste por 100 km: gasolina vs diésel vs GLP (2026, aprox.)"
        headers={["Combustible", "Precio €/L", "Consumo L/100km", "Coste €/100km"]}
        rows={[
          ["Gasolina 95", "1,55 €", "7,0 L", "10,85 €"],
          ["Diésel A", "1,45 €", "5,5 L", "7,98 €"],
          ["GLP (autogas)", "0,95 €", "8,5 L", "8,08 €"],
        ]}
      />

      <Callout type="info" title="GLP vs diésel: la cuenta clave">
        El GLP queda muy cerca del diésel en coste por km, pero suma la
        etiqueta ECO (acceso ZBE) que ningún diésel moderno tiene.
        Para uso urbano intenso en ciudades con restricciones, el GLP gana
        claramente.
      </Callout>

      <h2 id="donde-repostar">Dónde repostar GLP</h2>
      <p>
        En 2026 hay alrededor de 800-900 estaciones de servicio con GLP
        en España. Las marcas con más presencia en autogas son{" "}
        <Link href="/marca/repsol">Repsol</Link>,{" "}
        <Link href="/marca/cepsa">Cepsa</Link>,{" "}
        <Link href="/marca/bp">BP</Link>,{" "}
        <Link href="/marca/galp">Galp</Link> y operadores especializados
        como Avia, Disa y Petrocat en sus respectivos territorios. En las
        provincias más pobladas (Madrid, Barcelona, Valencia, Sevilla,
        Bilbao) el GLP es fácil de encontrar; en provincias rurales hay
        que planificar.
      </p>
      <p>
        En <Link href="/">Carburantes</Link> el GLP aparece como uno de los
        combustibles seleccionables. Cambia el filtro a «GLP» y la app te
        mostrará solo las estaciones de tu zona que lo venden, ordenadas
        por precio.
      </p>

      <h2 id="cuando-compensa">¿A quién le compensa el GLP?</h2>
      <p>
        Hagamos los números. Una conversión de 2.000 € se amortiza con el
        ahorro neto frente a gasolina. Asumiendo 4 €/100 km de ahorro
        (cálculo conservador):
      </p>
      <ul>
        <li>
          <strong>Conductor de 15.000 km/año</strong>: ahorro anual ~600 €.
          Amortización en ~3,3 años.
        </li>
        <li>
          <strong>Conductor de 25.000 km/año</strong>: ahorro anual ~1.000 €.
          Amortización en 2 años.
        </li>
        <li>
          <strong>Conductor urbano de 8.000 km/año</strong>: ahorro anual
          ~320 €. Amortización en más de 6 años; el GLP compensa solo si
          la etiqueta ECO te es imprescindible para entrar en ZBE.
        </li>
      </ul>
      <p>
        En resumen: el GLP es interesante para conductores de medio-alto
        kilometraje, sobre todo en zonas con ZBE activa, y como alternativa
        accesible a un coche eléctrico para quien no quiere o no puede dar
        el salto.
      </p>

      <AppCta
        title="Encuentra gasolineras con GLP cerca"
        body="Selecciona 'GLP' como combustible y Carburantes ordena por precio actualizado las estaciones de autogas de tu zona."
        href="/"
        linkLabel="Buscar GLP cerca"
      />

      <InternalLinks
        title="Más sobre combustibles y normativa"
        links={[
          { href: "/guias/etiqueta-dgt-combustible", label: "Etiqueta DGT según combustible" },
          { href: "/guias/coche-diesel-o-gasolina", label: "Diésel o gasolina (o GLP) en 2026" },
          { href: "/guias/gasolineras-low-cost", label: "Gasolineras low cost" },
          { href: "/guias/conducir-ahorrar-combustible", label: "Conducir para ahorrar combustible" },
        ]}
      />
    </>
  );
}

export default guide;
