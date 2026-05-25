import Link from "next/link";

// Bloque de "Respuesta corta" que abre cada guía. Es el patrón AEO clásico
// (answer engine optimization): un párrafo que cierra la query directamente,
// con un selector CSS predecible que se referencia en el speakable de
// JSON-LD. Los motores generativos (ChatGPT, Perplexity, Google SGE) tienden
// a citar este bloque palabra por palabra cuando la query encaja.
export function Answer({ children }) {
  return (
    <aside className="guide__answer" aria-label="Respuesta corta">
      <span className="guide__answer-label">Respuesta corta</span>
      <p className="guide__answer-body">{children}</p>
    </aside>
  );
}

// TL;DR opcional al inicio. Más telegráfico que Answer, ideal cuando hay
// varios puntos clave. También está incluido en el speakable selector.
export function Tldr({ items }) {
  if (!Array.isArray(items) || !items.length) return null;
  return (
    <aside className="guide__tldr" aria-label="Resumen">
      <span className="guide__tldr-label">En resumen</span>
      <ul>
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </aside>
  );
}

// Callout informativo / aviso. Tipo: "info" (verde) | "warn" (rojo) |
// "note" (gris). Sirve para destacar matices que un LLM pueda extraer
// como "dato verificado" y reduce la sensación de muro de texto.
export function Callout({ type = "info", title, children }) {
  return (
    <aside className={`guide__callout guide__callout--${type}`} role="note">
      {title && <strong className="guide__callout-title">{title}</strong>}
      <div className="guide__callout-body">{children}</div>
    </aside>
  );
}

// Tabla comparativa. La envolvemos en un wrapper que activa scroll horizontal
// en móvil sin romper la accesibilidad de la tabla nativa.
export function CompareTable({ headers, rows, caption }) {
  return (
    <div className="guide__table-wrap">
      <table className="guide__table">
        {caption && <caption className="guide__table-caption">{caption}</caption>}
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// CTA a la propia app — convierte tráfico de SEO en uso real. Sustituye al
// "anuncio" que normalmente aparece en un blog: aquí señalamos la utilidad
// pública del sitio (buscar precios reales).
export function AppCta({
  title = "Compara precios reales ahora",
  body = "Carburantes lee los datos del Ministerio cada media hora. Busca por municipio o pulsa «Cerca de mí» para ver las gasolineras más baratas de tu zona.",
  href = "/",
  linkLabel = "Buscar gasolineras",
}) {
  return (
    <aside className="guide__cta" aria-label="Usar la app">
      <h3 className="guide__cta-title">{title}</h3>
      <p className="guide__cta-body">{body}</p>
      <Link href={href} className="guide__cta-btn">
        {linkLabel} →
      </Link>
    </aside>
  );
}

// Lista de enlaces internos a marcas/provincias. Distribuye PageRank a las
// landing pages comerciales y le da contexto al lector ("aquí están las
// estaciones de esta marca en tu zona").
export function InternalLinks({ title, links }) {
  if (!Array.isArray(links) || !links.length) return null;
  return (
    <section className="guide__related" aria-labelledby="related-internal">
      <h3 id="related-internal" className="guide__related-title">
        {title || "Páginas relacionadas"}
      </h3>
      <ul className="guide__related-list">
        {links.map((l, i) => (
          <li key={i}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Sub-bloque FAQ dentro del cuerpo de una guía. La FAQ principal de la guía
// se renderiza fuera (al final), esto es para FAQs intermedias temáticas.
export function MiniFaq({ items }) {
  if (!Array.isArray(items) || !items.length) return null;
  return (
    <div className="guide__minifaq">
      {items.map((it, i) => (
        <details key={i} className="guide__minifaq-item">
          <summary>{it.q}</summary>
          <p>{it.a}</p>
        </details>
      ))}
    </div>
  );
}
