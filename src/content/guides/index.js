// Registro central de guías. Cada guía vive en su propio módulo y aquí solo
// importamos la metadata (slug, título, descripción, fechas, categoría) +
// un loader perezoso al componente JSX del cuerpo. El loader evita que el
// bundle de /guias arrastre el cuerpo completo de las 15+ guías cuando
// solo necesitamos listarlas.

import diferenciaGasolina95Vs98 from "./gasolina-95-vs-98";
import diferenciaDieselAPremium from "./diesel-a-vs-premium";
import bioetanolE5VsE10 from "./bioetanol-e5-vs-e10";
import queEsElAdblue from "./que-es-el-adblue";
import glpAutogasEspana from "./glp-autogas-espana";
import gasolinerasLowCost from "./gasolineras-low-cost";
import mejorHoraDiaRepostar from "./mejor-hora-dia-repostar";
import conducirAhorrarCombustible from "./conducir-ahorrar-combustible";
import descuentosTarjetasGasolineras from "./descuentos-tarjetas-gasolineras";
import bonificacionGasoleoProfesional from "./bonificacion-gasoleo-profesional";
import comoSeFormaPrecioGasolina from "./como-se-forma-precio-gasolina";
import etiquetaDgtCombustible from "./etiqueta-dgt-combustible";
import repostarPortugalFranciaAndorra from "./repostar-portugal-francia-andorra";
import gasolineras24Horas from "./gasolineras-24-horas";
import cocheDieselOGasolina from "./coche-diesel-o-gasolina";
// Ampliación 2026: 27 guías nuevas en 6 categorías.
import gncGasNaturalVehicular from "./gnc-gas-natural-vehicular";
import cocheHidrogenoEspana from "./coche-hidrogeno-espana";
import aditivosCombustibleSirven from "./aditivos-combustible-sirven";
import hvoCombustibleRenovable from "./hvo-combustible-renovable";
import cuantoSeAhorraComparandoGasolineras from "./cuanto-se-ahorra-comparando-gasolineras";
import llenoOMedioDeposito from "./lleno-o-medio-deposito";
import tarjetasCombustibleEmpresa from "./tarjetas-combustible-empresa";
import mereceLaPenaDesviarseRepostar from "./merece-la-pena-desviarse-repostar";
import gasolinerasSupermercado from "./gasolineras-supermercado";
import porQueSubeBajaPrecioGasolina from "./por-que-sube-baja-precio-gasolina";
import impuestosGasolinaEspana from "./impuestos-gasolina-espana";
import precioCarburantePorComunidad from "./precio-carburante-por-comunidad";
import margenGasolinerasPorLitro from "./margen-gasolineras-por-litro";
import historicoPrecioGasolinaEspana from "./historico-precio-gasolina-espana";
import meHeEquivocadoCombustible from "./me-he-equivocado-combustible";
import comoLeerPreciosSurtidor from "./como-leer-precios-surtidor";
import gasolinerasAutomaticasComoFuncionan from "./gasolineras-automaticas-como-funcionan";
import repostarCorrectamentePasos from "./repostar-correctamente-pasos";
import pagarGasolinaMovilApp from "./pagar-gasolina-movil-app";
import presionNeumaticosConsumo from "./presion-neumaticos-consumo";
import aireAcondicionadoConsumo from "./aire-acondicionado-consumo";
import velocidadConsumoAutovia from "./velocidad-consumo-autovia";
import ralentiArranqueFrioConsumo from "./ralenti-arranque-frio-consumo";
import mantenimientoCocheConsumo from "./mantenimiento-coche-consumo";
import ahorrarCombustibleViajeLargo from "./ahorrar-combustible-viaje-largo";
import repostarPuebloOCiudad from "./repostar-pueblo-o-ciudad";
import planificarRepostajesRuta from "./planificar-repostajes-ruta";
// Ampliación 2026 (tanda 2): 2 pilares + 24 spokes, categoría "normativa".
import tiposDeCombustibleGuiaCompleta from "./tipos-de-combustible-guia-completa";
import comoAhorrarEnCombustibleGuia from "./como-ahorrar-en-combustible-guia";
import cetanoOctanajeQueSignifican from "./cetano-octanaje-que-significan";
import dieselInviernoAnticongelante from "./diesel-invierno-anticongelante";
import biodieselB7B10Xtl from "./biodiesel-b7-b10-xtl";
import caducaLaGasolinaCuantoDura from "./caduca-la-gasolina-cuanto-dura";
import cocheElectricoVsGasolinaCoste from "./coche-electrico-vs-gasolina-coste";
import etanolCochesAntiguos from "./etanol-coches-antiguos";
import combustibleInviernoVerano from "./combustible-invierno-verano";
import gasolineraMasBarataCercaComoEncontrar from "./gasolinera-mas-barata-cerca-como-encontrar";
import cuantoCuestaLlenarElDeposito from "./cuanto-cuesta-llenar-el-deposito";
import pagoEfectivoVsTarjetaGasolinera from "./pago-efectivo-vs-tarjeta-gasolinera";
import calcularCosteCombustibleViaje from "./calcular-coste-combustible-viaje";
import porQueGasolinaMasCaraAutopista from "./por-que-gasolina-mas-cara-autopista";
import luzReservaCuantosKmQuedan from "./luz-reserva-cuantos-km-quedan";
import llenarDepositoDeMasRebosa from "./llenar-deposito-de-mas-rebosa";
import aguaEnElDepositoSintomas from "./agua-en-el-deposito-sintomas";
import consumoRealVsWltp from "./consumo-real-vs-wltp";
import estacionServicioVsUnidadSuministro from "./estacion-servicio-vs-unidad-suministro";
import distintivoAmbientalDgt from "./distintivo-ambiental-dgt";
import deducirIvaGasolinaAutonomo from "./deducir-iva-gasolina-autonomo";
import facturaGasolinaAutonomo from "./factura-gasolina-autonomo";
import repostarMotorEncendidoMulta from "./repostar-motor-encendido-multa";
import llevarGasolinaEnBidon from "./llevar-gasolina-en-bidon";
import reclamarCombustibleMalaCalidad from "./reclamar-combustible-mala-calidad";
import cooperativaAgricolaRepostarParticular from "./cooperativa-agricola-repostar-particular";

// Categorías editoriales: agrupan guías por intención de búsqueda. El orden
// aquí condiciona cómo se renderizan en el hub /guias.
export const GUIDE_CATEGORIES = [
  {
    id: "tipos-combustible",
    name: "Tipos de combustible",
    description:
      "Diferencias entre gasolinas 95, 98, diésel A y premium, bioetanol, AdBlue y GLP.",
  },
  {
    id: "ahorro",
    name: "Ahorrar al repostar",
    description:
      "Trucos, descuentos, horarios y comparativas para gastar menos en cada lleno.",
  },
  {
    id: "mercado",
    name: "Mercado y precios",
    description:
      "Cómo se forma el precio de la gasolina en España y cómo evoluciona.",
  },
  {
    id: "practico",
    name: "Guías prácticas",
    description:
      "Encontrar la gasolinera más barata, abierta 24 h, etiquetas DGT, decisiones de compra.",
  },
  {
    id: "conduccion",
    name: "Conducción y consumo",
    description:
      "Hábitos al volante y mantenimiento que reducen de verdad lo que gastas en combustible.",
  },
  {
    id: "viajes",
    name: "Viajes y rutas",
    description:
      "Dónde y cómo repostar cuando sales de ruta o viajas por España.",
  },
  {
    id: "normativa",
    name: "Normativa y trámites",
    description:
      "Etiqueta ambiental DGT, IVA y facturas, multas, transporte de combustible y otros trámites del día a día.",
  },
];

// Lista completa ordenada. La primera entrada es la "destacada" del hub.
// Para mover una guía de posición, cámbiala aquí.
export const GUIDES = [
  gasolinerasLowCost,
  mejorHoraDiaRepostar,
  diferenciaGasolina95Vs98,
  diferenciaDieselAPremium,
  bioetanolE5VsE10,
  conducirAhorrarCombustible,
  comoSeFormaPrecioGasolina,
  descuentosTarjetasGasolineras,
  cocheDieselOGasolina,
  repostarPortugalFranciaAndorra,
  bonificacionGasoleoProfesional,
  etiquetaDgtCombustible,
  gasolineras24Horas,
  queEsElAdblue,
  glpAutogasEspana,
  // ── Ampliación 2026 ──
  // Tipos de combustible
  gncGasNaturalVehicular,
  cocheHidrogenoEspana,
  aditivosCombustibleSirven,
  hvoCombustibleRenovable,
  // Ahorrar al repostar
  cuantoSeAhorraComparandoGasolineras,
  llenoOMedioDeposito,
  tarjetasCombustibleEmpresa,
  mereceLaPenaDesviarseRepostar,
  gasolinerasSupermercado,
  // Mercado y precios
  porQueSubeBajaPrecioGasolina,
  impuestosGasolinaEspana,
  precioCarburantePorComunidad,
  margenGasolinerasPorLitro,
  historicoPrecioGasolinaEspana,
  // Guías prácticas
  meHeEquivocadoCombustible,
  comoLeerPreciosSurtidor,
  gasolinerasAutomaticasComoFuncionan,
  repostarCorrectamentePasos,
  pagarGasolinaMovilApp,
  // Conducción y consumo
  presionNeumaticosConsumo,
  aireAcondicionadoConsumo,
  velocidadConsumoAutovia,
  ralentiArranqueFrioConsumo,
  mantenimientoCocheConsumo,
  // Viajes y rutas
  ahorrarCombustibleViajeLargo,
  repostarPuebloOCiudad,
  planificarRepostajesRuta,
  // ── Ampliación 2026 · tanda 2 ──
  // Pilares (cornerstone) primero en sus categorías
  tiposDeCombustibleGuiaCompleta,
  cetanoOctanajeQueSignifican,
  dieselInviernoAnticongelante,
  biodieselB7B10Xtl,
  caducaLaGasolinaCuantoDura,
  cocheElectricoVsGasolinaCoste,
  etanolCochesAntiguos,
  combustibleInviernoVerano,
  comoAhorrarEnCombustibleGuia,
  gasolineraMasBarataCercaComoEncontrar,
  cuantoCuestaLlenarElDeposito,
  pagoEfectivoVsTarjetaGasolinera,
  calcularCosteCombustibleViaje,
  porQueGasolinaMasCaraAutopista,
  // Guías prácticas
  luzReservaCuantosKmQuedan,
  llenarDepositoDeMasRebosa,
  aguaEnElDepositoSintomas,
  consumoRealVsWltp,
  estacionServicioVsUnidadSuministro,
  // Normativa y trámites
  distintivoAmbientalDgt,
  deducirIvaGasolinaAutonomo,
  facturaGasolinaAutonomo,
  repostarMotorEncendidoMulta,
  llevarGasolinaEnBidon,
  reclamarCombustibleMalaCalidad,
  cooperativaAgricolaRepostarParticular,
];

const BY_SLUG = new Map(GUIDES.map((g) => [g.slug, g]));

export function getGuide(slug) {
  return BY_SLUG.get(slug) || null;
}

export function getGuidesByCategory(categoryId) {
  return GUIDES.filter((g) => g.category === categoryId);
}

// Devuelve las guías "relacionadas" con una dada. Estrategia: misma categoría
// primero, luego el resto, sin incluir la propia guía. Limitamos a `max` para
// no saturar el HTML con un wall de enlaces (Google trata >100 internos por
// página como signal de spam baja calidad).
export function getRelatedGuides(slug, max = 4) {
  const current = getGuide(slug);
  if (!current) return [];
  const sameCat = GUIDES.filter(
    (g) => g.slug !== slug && g.category === current.category
  );
  const others = GUIDES.filter(
    (g) => g.slug !== slug && g.category !== current.category
  );
  return [...sameCat, ...others].slice(0, max);
}

export function categoryName(id) {
  const cat = GUIDE_CATEGORIES.find((c) => c.id === id);
  return cat ? cat.name : id;
}
