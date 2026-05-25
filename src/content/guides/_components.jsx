import Link from "next/link";

// Diseño consciente: las guías son contenido editorial, no landing
// pages de marketing. Imitamos el tono de la app — hairlines, tipografía
// generosa, gris en lugar de color, sin píldoras ni labels uppercase.
//
// Los className `.guide__answer` y `.guide__tldr` se conservan porque
// el JSON-LD `speakable` apunta a ellos: queremos que voice assistants
// y LLMs lean exactamente esos bloques. Lo visible cambia, la semántica
// no.

// "Answer" — el párrafo de respuesta directa al inicio. Era una caja
// verde con label "RESPUESTA CORTA"; ahora es simplemente un párrafo
// con tipografía un poco más generosa. Sin caja, sin label.
export function Answer({ children }) {
  return <p className="guide__answer">{children}</p>;
}

// TL;DR — lista de puntos clave. Era una caja azul con label uppercase
// "EN RESUMEN"; ahora es una lista delimitada por hairlines arriba y
// abajo, sin label. El lector entiende por posición y tono lo que es.
export function Tldr({ items }) {
  if (!Array.isArray(items) || !items.length) return null;
  return (
    <ul className="guide__tldr" aria-label="Puntos clave">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

// Callout: nota lateral. Era tres variantes coloreadas (info verde,
// warn rojo, note gris); ahora todas se renderizan igual — superficie
// neutra muy ligera, sin borde de color. La jerarquía la pone el
// título en negrita y el cuerpo en texto normal.
//
// Conservamos la prop `type` por compatibilidad con las llamadas
// existentes, pero solo se usa como atributo data- para que el lector
// pueda inferirlo si lee el HTML (no hay diferencia visual).
export function Callout({ type = "info", title, children }) {
  return (
    <aside className="guide__callout" data-callout-type={type} role="note">
      {title && <strong className="guide__callout-title">{title}</strong>}
      <div className="guide__callout-body">{children}</div>
    </aside>
  );
}

// Tabla comparativa. Sin cambios funcionales: el wrapper permite scroll
// horizontal en móvil. El estilo visual se quita en la CSS.
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

// CTA a la app. Era un bloque verde centrado con botón pill verde;
// ahora es un panel discreto sobre fondo gris muy ligero, con el
// enlace como texto subrayado al estilo NYT/FT — sobrio y monocromo.
export function AppCta({
  title = "Compara precios reales ahora",
  body = "Carburantes lee los datos del Ministerio cada media hora. Busca por municipio o pulsa «Cerca de mí» para ver las gasolineras más baratas de tu zona.",
  href = "/",
  linkLabel = "Buscar gasolineras",
}) {
  return (
    <aside className="guide__cta" aria-label="Usar la app">
      <p className="guide__cta-title">{title}</p>
      <p className="guide__cta-body">{body}</p>
      <Link href={href} className="guide__cta-btn">
        {linkLabel} <span aria-hidden="true">→</span>
      </Link>
    </aside>
  );
}

// Enlaces internos a marcas/provincias. Antes eran píldoras
// redondeadas; ahora son enlaces de texto subrayado en una sola línea
// con separadores «·». Distribuye PageRank sin parecer un tag cloud.
export function InternalLinks({ title, links }) {
  if (!Array.isArray(links) || !links.length) return null;
  return (
    <section className="guide__related" aria-labelledby="related-internal">
      <p id="related-internal" className="guide__related-title">
        {title || "Páginas relacionadas"}
      </p>
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

// Mini FAQ con <details>. Sin estilo de marca, solo hairlines y
// tipografía. Se mantiene la interacción colapsable nativa.
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
