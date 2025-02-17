import Fuse from "fuse.js";

const logoMapping = [
  { name: "alcampo", logo: "logo_alcampo.gif" },
  { name: "avia", logo: "logo_avia.gif" },
  { name: "ballenoil", logo: "logo_ballenoil.gif" },
  { name: "bonarea", logo: "logo_bonarea.gif" },
  { name: "bp", logo: "logo_bp.gif" },
  { name: "campsa", logo: "logo_campsa.gif" },
  { name: "carrefour", logo: "logo_carrefour.gif" },
  { name: "cepsa", logo: "logo_cepsa.gif" },
  { name: "easygas", logo: "logo_easygas.gif" },
  { name: "eleclerc", logo: "logo_eleclerc.gif" },
  { name: "eroski", logo: "logo_eroski.gif" },
  { name: "galp", logo: "logo_galp.gif" },
  { name: "generico", logo: "logo_generico.gif" },
  { name: "meroil", logo: "logo_meroil.gif" },
  { name: "petrocat", logo: "logo_petrocat.gif" },
  { name: "petronor", logo: "logo_petronor.gif" },
  { name: "petroprix", logo: "logo_petroprix.gif" },
  { name: "plenoil", logo: "logo_plenoil.gif" },
  { name: "q8", logo: "logo_q8.gif" },
  { name: "repsol", logo: "logo_repsol.gif" },
  { name: "saras", logo: "logo_saras.gif" },
  { name: "shell", logo: "logo_shell.gif" },
  { name: "simply", logo: "logo_simply.gif" },
];

const fuse = new Fuse(logoMapping, {
  keys: ["name"],
  threshold: 0.3,
  includeScore: true,
});

function normalizeName(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, "");
}

export function getLogoForGasolinera(name) {
  const normalizedName = normalizeName(name);

  const firstWord = normalizedName.split(" ")[0];
  let result = fuse.search(firstWord);

  if (!result.length || result[0].score >= 0.4) {
    result = fuse.search(normalizedName);
  }

  if (result.length > 0 && result[0].score < 0.4) {
    return result[0].item.logo;
  }

  return "logo_generico.gif";
}
