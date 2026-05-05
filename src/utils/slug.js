// Convierte un nombre tipo "Mocejón" → "mocejon" para usar en URLs SEO.
// Determinístico: misma entrada produce siempre el mismo slug.
export const slugify = (str) =>
  String(str || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
