"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";

/**
 * Buscador/filtro en cliente para el hub de guías.
 *
 * SSR/SEO: este componente se renderiza también en servidor. TODAS las
 * secciones y enlaces de guía se emiten en el HTML inicial — el buscador
 * NO crea resultados desde cero en cliente, solo decide qué items se
 * muestran. Cuando no hay query (estado inicial y siempre en el HTML
 * servido) se muestra todo, así Google y los LLMs ven el índice completo.
 *
 * Solo recibe props serializables: `guides` (objetos planos con
 * slug/title/description/category/readingMinutes) y `categories`
 * (GUIDE_CATEGORIES). Nunca el campo Body (que es una función).
 */

// Normaliza para búsqueda tolerante a acentos y mayúsculas. Quitar
// diacríticos hace que "diesel" encuentre "diésel" y "comun" → "común".
function normalize(str) {
  return (str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export default function GuidesBrowser({ guides = [], categories = [] }) {
  const [query, setQuery] = useState("");
  const inputId = useId();

  // Índice de búsqueda precomputado una vez. Incluye el nombre de la
  // categoría para que "ahorro" o "mercado" filtren por sección.
  const catNameById = useMemo(() => {
    const m = new Map();
    for (const c of categories) m.set(c.id, c.name);
    return m;
  }, [categories]);

  const haystacks = useMemo(() => {
    const m = new Map();
    for (const g of guides) {
      m.set(
        g.slug,
        normalize(
          [g.title, g.description, catNameById.get(g.category) || ""].join(" ")
        )
      );
    }
    return m;
  }, [guides, catNameById]);

  // Secciones por categoría, en el orden de GUIDE_CATEGORIES, omitiendo las
  // vacías. Se calcula una vez; el filtrado solo decide visibilidad.
  const sections = useMemo(() => {
    return categories
      .map((cat) => ({
        cat,
        guides: guides.filter((g) => g.category === cat.id),
      }))
      .filter((s) => s.guides.length > 0);
  }, [categories, guides]);

  const q = normalize(query.trim());
  const filtering = q.length > 0;

  // Set de slugs que pasan el filtro. Sin query → null = "todos visibles".
  const matchSlugs = useMemo(() => {
    if (!filtering) return null;
    const set = new Set();
    for (const [slug, hay] of haystacks) {
      if (hay.includes(q)) set.add(slug);
    }
    return set;
  }, [filtering, q, haystacks]);

  const isVisible = (slug) => !matchSlugs || matchSlugs.has(slug);

  // Conteos dinámicos para el resumen y los títulos de sección.
  const totalVisible = filtering ? matchSlugs.size : guides.length;
  const visiblePerCat = (catGuides) =>
    filtering ? catGuides.filter((g) => matchSlugs.has(g.slug)).length : catGuides.length;

  const noResults = filtering && totalVisible === 0;

  return (
    <div className="guides__browser">
      <div className="guides__search">
        <label htmlFor={inputId} className="guides__search-label">
          Buscar guías
        </label>
        <div className="guides__search-field">
          <span className="guides__search-icon" aria-hidden="true">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            id={inputId}
            type="search"
            inputMode="search"
            autoComplete="off"
            spellCheck="false"
            enterKeyHint="search"
            className="guides__search-input"
            placeholder="Buscar por tema, combustible o categoría…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-describedby={`${inputId}-status`}
          />
          {query && (
            <button
              type="button"
              className="guides__search-clear"
              onClick={() => setQuery("")}
              aria-label="Borrar búsqueda"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
        <p
          id={`${inputId}-status`}
          className="guides__search-status"
          role="status"
          aria-live="polite"
        >
          {filtering
            ? `${totalVisible} ${totalVisible === 1 ? "guía" : "guías"} para «${query.trim()}»`
            : `${guides.length} guías en ${sections.length} categorías`}
        </p>
      </div>

      {/* Navegación por categorías. Se atenúa (no se elimina) durante el
          filtrado para no romper el layout ni el HTML servido. */}
      {sections.length > 1 && (
        <nav
          className="guides__nav"
          aria-label="Categorías de guías"
          hidden={filtering || undefined}
        >
          <ul className="guides__nav-list">
            {sections.map(({ cat, guides: catGuides }) => (
              <li key={cat.id} className="guides__nav-item">
                <a href={`#cat-${cat.id}`} className="guides__nav-link">
                  {cat.name}
                  <span className="guides__nav-count" aria-hidden="true">
                    {" "}
                    ({catGuides.length})
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {noResults && (
        <div className="guides__empty" role="status">
          <p className="guides__empty-title">Sin resultados para «{query.trim()}»</p>
          <p className="guides__empty-body">
            Prueba con otro término —el nombre de un combustible, «ahorro»,
            «precio» o «viaje»— o{" "}
            <button
              type="button"
              className="guides__empty-reset"
              onClick={() => setQuery("")}
            >
              borra la búsqueda
            </button>
            .
          </p>
        </div>
      )}

      {sections.map(({ cat, guides: catGuides }) => {
        const shown = visiblePerCat(catGuides);
        const sectionHidden = filtering && shown === 0;
        return (
          <section
            key={cat.id}
            className="guides__cat"
            aria-labelledby={`cat-${cat.id}`}
            hidden={sectionHidden || undefined}
          >
            <h2 id={`cat-${cat.id}`} className="guides__cat-title">
              {cat.name}
              <span className="guides__cat-count">
                {" "}
                · {shown} {shown === 1 ? "guía" : "guías"}
              </span>
            </h2>
            <p className="guides__cat-desc">{cat.description}</p>
            <ul className="guides__grid">
              {catGuides.map((g) => (
                <li
                  key={g.slug}
                  className="guides__card"
                  hidden={!isVisible(g.slug) || undefined}
                >
                  <Link href={`/guias/${g.slug}`} className="guides__card-link">
                    <h3 className="guides__card-title">{g.title}</h3>
                    <p className="guides__card-desc">{g.description}</p>
                    <span className="guides__card-meta">
                      {g.readingMinutes} min · Leer guía →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
