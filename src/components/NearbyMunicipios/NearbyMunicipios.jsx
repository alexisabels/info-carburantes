import Link from "next/link";
import { slugify } from "../../utils/slug";
import { fetchMunicipiosPorProvinciaServer } from "../../lib/api-server";

// Server component que cuelga al final de la ficha de un municipio:
// "Otros municipios de {Provincia}" con 16 enlaces alfabéticos al resto
// de municipios de la misma provincia. Excluye el actual.
//
// Beneficio SEO: cada página gana 16 enlaces internos contextuales que
// distribuyen autoridad y crean una densa red de cross-linking dentro de
// cada provincia, lo que ayuda al crawl y al posicionamiento de cola larga.

const collator = new Intl.Collator("es", { sensitivity: "base" });
const MAX = 16;

export default async function NearbyMunicipios({
  idProvincia,
  provincia,
  currentIdMunicipio,
}) {
  if (!idProvincia) return null;
  const municipios = await fetchMunicipiosPorProvinciaServer(idProvincia);
  if (!municipios || municipios.length <= 1) return null;

  const others = municipios
    .filter((m) => m?.IDMunicipio && m?.Municipio)
    .filter((m) => String(m.IDMunicipio) !== String(currentIdMunicipio))
    .sort((a, b) => collator.compare(a.Municipio, b.Municipio))
    .slice(0, MAX);

  if (others.length === 0) return null;

  const provSlug = provincia ? slugify(provincia) : "";

  return (
    <nav className="nearby" aria-label="Otros municipios de la misma provincia">
      <h2 className="nearby__title">
        Otros municipios{provincia ? ` de ${provincia}` : ""}
      </h2>
      <ul className="nearby__list">
        {others.map((m) => {
          const slug = slugify(m.Municipio);
          const href = `/municipio/${m.IDMunicipio}/${slug}`;
          return (
            <li key={m.IDMunicipio} className="nearby__item">
              <Link href={href} className="nearby__link">
                {m.Municipio}
              </Link>
            </li>
          );
        })}
      </ul>
      {provincia && idProvincia && provSlug && (
        <p className="nearby__more">
          Ver todos los municipios de{" "}
          <Link href={`/provincia/${idProvincia}/${provSlug}`}>
            {provincia}
          </Link>
          .
        </p>
      )}
    </nav>
  );
}
