import Fuse from "fuse.js";

const FALLBACK_LOGO = "logo_generico.gif";

// Lista exacta derivada de los archivos reales en /public/station-icons/.
// Si añades un logo nuevo al filesystem, súmalo aquí.
const KNOWN_BRANDS = [
  "alcampo",
  "avia",
  "ballenoil",
  "bonarea",
  "bp",
  "campsa",
  "carrefour",
  "cepsa",
  "easygas",
  "eleclerc",
  "eroski",
  "galp",
  "meroil",
  "petrocat",
  "petronor",
  "petroprix",
  "plenoil",
  "q8",
  "repsol",
  "saras",
  "shell",
  "simply",
];

const logoMapping = KNOWN_BRANDS.map((name) => ({
  name,
  logo: `logo_${name}.gif`,
}));

// Aliases: solo variantes comunes que mapean a logos REALMENTE existentes.
// Clave normalizada (lowercase + sin tildes + sin puntuación) -> nombre del archivo.
const ALIASES = {
  // Repsol y variantes
  "repsol energy": "logo_repsol.gif",
  "repsol energy e station": "logo_repsol.gif",
  "estacion de servicio repsol": "logo_repsol.gif",
  // Cepsa y variantes (Moeve es la nueva marca de Cepsa)
  "cepsa express": "logo_cepsa.gif",
  "ds cepsa": "logo_cepsa.gif",
  "moeve": "logo_cepsa.gif",
  // BP
  "bp oil": "logo_bp.gif",
  "british petroleum": "logo_bp.gif",
  // Galp
  "galp energia": "logo_galp.gif",
  "galp energy": "logo_galp.gif",
  // Q8 / Kuwait
  "kuwait petroleum": "logo_q8.gif",
  // Shell / variantes (Esso pertenecía a ExxonMobil; mantenemos genérico salvo logo)
  "shell express": "logo_shell.gif",
  // Carrefour
  "carrefour express": "logo_carrefour.gif",
  "carrefour market": "logo_carrefour.gif",
  // E.Leclerc
  "e leclerc": "logo_eleclerc.gif",
  "leclerc": "logo_eleclerc.gif",
  // Petronor
  "red petronor": "logo_petronor.gif",
  // Bonarea
  "bon area": "logo_bonarea.gif",
  "bonarea agrupa": "logo_bonarea.gif",
  // Eroski
  "eroski gasolinera": "logo_eroski.gif",
  // Plenoil / Petroprix / Ballenoil low cost
  "plenoil low cost": "logo_plenoil.gif",
  "plenergy": "logo_plenoil.gif",
  // Avia
  "avia espana": "logo_avia.gif",
  // Simply / Alcampo (Auchan)
  "auchan": "logo_alcampo.gif",
  // Meroil
  "meroil sa": "logo_meroil.gif",
  // Petrocat
  "petrolis independents": "logo_petrocat.gif",
};

const fuse = new Fuse(logoMapping, {
  keys: ["name"],
  threshold: 0.35,
  includeScore: true,
  ignoreLocation: true,
  minMatchCharLength: 3,
});

// Marcas extra para el matching tipo "contiene" sin alias explícito.
const SET_KNOWN = new Set(KNOWN_BRANDS);

const COMBINING_MARKS = /[̀-ͯ]/g;

function normalizeName(name) {
  return String(name)
    .toLowerCase()
    .normalize("NFD")
    .replace(COMBINING_MARKS, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getLogoForGasolinera(name) {
  if (!name) {
    return FALLBACK_LOGO;
  }

  const normalizedName = normalizeName(name);
  if (!normalizedName) {
    return FALLBACK_LOGO;
  }

  // 1. Match exacto contra una marca conocida.
  if (SET_KNOWN.has(normalizedName)) {
    return `logo_${normalizedName}.gif`;
  }

  // 2. Match exacto contra alias.
  if (ALIASES[normalizedName]) {
    return ALIASES[normalizedName];
  }

  // 3. Alias por prefijo (ej. "cepsa express 24h" empieza por "cepsa express").
  for (const aliasKey of Object.keys(ALIASES)) {
    if (
      normalizedName === aliasKey ||
      normalizedName.startsWith(`${aliasKey} `) ||
      normalizedName.endsWith(` ${aliasKey}`) ||
      normalizedName.includes(` ${aliasKey} `)
    ) {
      return ALIASES[aliasKey];
    }
  }

  // 4. Marca conocida como token dentro del nombre (orden por longitud
  //    descendente para que "petronor" gane a "petro*" si ambos coinciden).
  const tokens = normalizedName.split(" ");
  const tokenSet = new Set(tokens);
  const sortedBrands = [...KNOWN_BRANDS].sort((a, b) => b.length - a.length);
  for (const brand of sortedBrands) {
    if (tokenSet.has(brand)) {
      return `logo_${brand}.gif`;
    }
  }

  // 5. Marca contenida como substring (cubre "bonarea" en "bonareadtm" raros).
  for (const brand of sortedBrands) {
    if (brand.length >= 4 && normalizedName.includes(brand)) {
      return `logo_${brand}.gif`;
    }
  }

  // 6. Fuzzy match con Fuse: primero la primera palabra, luego el nombre completo.
  const firstWord = tokens[0];
  let result = firstWord && firstWord.length >= 3 ? fuse.search(firstWord) : [];

  if (
    !result.length ||
    typeof result[0].score !== "number" ||
    result[0].score >= 0.35
  ) {
    result = fuse.search(normalizedName);
  }

  if (
    result.length > 0 &&
    typeof result[0].score === "number" &&
    result[0].score < 0.35
  ) {
    return result[0].item.logo;
  }

  // 7. Fallback explícito: cooperativas/marcas locales sin logo propio.
  return FALLBACK_LOGO;
}
