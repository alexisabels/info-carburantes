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
