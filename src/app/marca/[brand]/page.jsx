import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchTodasLasEstacionesServer } from "../../../lib/api-server";
import { getBrand, KNOWN_BRANDS, stationBrand } from "../../../lib/brands";
import {
  buildMetadata,
  jsonLdBreadcrumb,
  jsonLdItemListGenerico,
} from "../../../lib/seo";
import { slugify } from "../../../utils/slug";
import { absoluteUrl } from "../../../lib/site";

export const dynamicParams = false;
export const revalidate = 3600;

// Pre-renderiza las 22 marcas al build: 22 páginas cacheadas en edge sin
// tocar MITECO en el primer click. dynamicParams=false bloquea slugs que
// no estén en la lista (404 nativo en lugar de 5 MB de JSON para nada).
export function generateStaticParams() {
  return KNOWN_BRANDS.map((b) => ({ brand: b.id }));
}

const collator = new Intl.Collator("es", { sensitivity: "base" });

async function loadBrandContext({ brand }) {
  const def = getBrand(brand);
  if (!def) return { def: null };

  const data = await fetchTodasLasEstacionesServer();
  const all = Array.isArray(data?.ListaEESSPrecio) ? data.ListaEESSPrecio : [];
  const fecha = data?.Fecha || null;

  // Filtrado por marca reusando la heurística de logos. Hace ~12 000 lookups
  // pero todos son O(1) con caché del Map en logoUtils.
  const stations = all.filter((e) => stationBrand(e) === def.id);

  // Agrupamos por provincia para que cada h2 alimente una keyword distinta
  // ("Repsol en Madrid", "Repsol en Barcelona", ...) y el listado escanee
  // bien en móvil.
  const byProvincia = new Map();
  for (const s of stations) {
    const key = `${String(s.IDProvincia || "")}__${s.Provincia || ""}`;
    if (!byProvincia.has(key)) {
      byProvincia.set(key, {
        idProvincia: String(s.IDProvincia || ""),
        provincia: s.Provincia || "",
        stations: [],
      });
    }
    byProvincia.get(key).stations.push(s);
  }
  const groups = Array.from(byProvincia.values()).sort((a, b) =>
    collator.compare(a.provincia, b.provincia)
  );
  for (const g of groups) {
    g.stations.sort((a, b) =>
      collator.compare(
        `${a.Municipio || ""} ${a.Dirección || ""}`,
        `${b.Municipio || ""} ${b.Dirección || ""}`
      )
    );
  }

  return { def, stations, groups, fecha };
}

export async function generateMetadata({ params }) {
  const { brand } = await params;
  const { def, stations } = await loadBrandContext({ brand });
  if (!def) {
    return buildMetadata({
      title: "Marca no encontrada · Carburantes",
      path: `/marca/${brand}`,
      noindex: true,
    });
  }
  const total = stations?.length || 0;
  return buildMetadata({
    title: `Gasolineras ${def.display} en España — Carburantes`,
    description: total
      ? `${total} gasolineras ${def.display} en España. Compara precios actualizados de gasolina y diésel.`
      : `Gasolineras ${def.display} en España con precios actualizados.`,
    path: `/marca/${def.id}`,
  });
}

export default async function MarcaPage({ params }) {
  const { brand } = await params;
  const { def, stations, groups, fecha } = await loadBrandContext({ brand });
  if (!def) notFound();

  const path = `/marca/${def.id}`;
  const url = absoluteUrl(path);
  const total = stations?.length || 0;

  const breadcrumbJsonLd = jsonLdBreadcrumb([
    { name: "Inicio", url: "/" },
    { name: "Marcas", url: "/marcas" },
    { name: def.display, url: path },
  ]);
  const itemListJsonLd = total
    ? jsonLdItemListGenerico(stations, {
        name: `Gasolineras ${def.display} en España`,
        url,
        max: 50,
      })
    : null;

  return (
    <main id="main" className="brand">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      )}

      <header className="brand__head">
        <nav className="brand__crumbs" aria-label="Migas">
          <Link href="/marcas">Marcas</Link>
          <span aria-hidden="true"> › </span>
          <span>{def.display}</span>
        </nav>
        <div className="brand__title-row">
          <span className="brand__logo">
            <img
              src={`/station-icons/logo_${def.id}.gif`}
              alt=""
              aria-hidden="true"
              width="56"
              height="56"
            />
          </span>
          <h1 className="brand__title">Gasolineras {def.display}</h1>
        </div>
        <p className="brand__sub">
          {total > 0
            ? `${total} estaciones en España${fecha ? ` · datos del Ministerio del ${fecha}` : ""}.`
            : "Sin datos del Ministerio en este momento."}
        </p>
      </header>

      {groups && groups.length > 0 ? (
        <div className="brand__groups">
          {groups.map((g) => {
            const provSlug = slugify(g.provincia);
            return (
              <section
                key={g.idProvincia || g.provincia}
                className="brand__group"
                aria-labelledby={`brand-prov-${g.idProvincia || provSlug}`}
              >
                <h2
                  id={`brand-prov-${g.idProvincia || provSlug}`}
                  className="brand__group-title"
                >
                  <Link
                    href={
                      g.idProvincia && provSlug
                        ? `/provincia/${g.idProvincia}/${provSlug}`
                        : "/provincias"
                    }
                  >
                    {def.display} en {g.provincia || "(provincia)"}
                  </Link>
                  <span className="brand__group-count">{g.stations.length}</span>
                </h2>
                <ul className="brand__list">
                  {g.stations.map((s) => {
                    const stationHref = `/gasolinera/${s.IDMunicipio}/${s.IDEESS}`;
                    return (
                      <li key={s.IDEESS} className="brand__item">
                        <Link href={stationHref} className="brand__link">
                          <span className="brand__addr">{s.Dirección}</span>
                          {s.Municipio && (
                            <span className="brand__muni">· {s.Municipio}</span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      ) : (
        <p className="brand__empty">
          No hemos podido cargar las estaciones de {def.display} ahora mismo.
          Vuelve a intentarlo en unos minutos.
        </p>
      )}
    </main>
  );
}
