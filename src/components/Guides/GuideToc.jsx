"use client";

import { useEffect, useState } from "react";

/**
 * Índice "En esta guía".
 *
 * Mejora progresiva: el índice se construye EN CLIENTE leyendo los
 * <h2 id> reales que el cuerpo del artículo (server-rendered) ya tiene en
 * el DOM. Si no hay JS, el componente no pinta nada y el artículo se lee
 * exactamente igual; el contenido y sus anclas viven en el HTML servido.
 *
 * No recibe el Body (una función) ni props no serializables. Solo lee el
 * DOM tras montar. `scopeSelector` acota dónde buscar los encabezados.
 *
 * Sección activa: un IntersectionObserver marca como activa la última
 * sección cuyo encabezado ha cruzado la zona de lectura. Respeta
 * prefers-reduced-motion (el scroll suave del navegador lo gobierna la
 * preferencia del SO vía `scroll-behavior` en CSS).
 *
 * Layout: en pantallas anchas el componente padre lo coloca como columna
 * lateral pegajosa; en móvil se muestra como bloque colapsable arriba
 * (<details>), cerrado por defecto para no robar el primer pliegue.
 */
export default function GuideToc({
  scopeSelector = ".guide__body",
  includeFaqId = "guide-faq",
}) {
  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState(null);

  // 1) Construir la lista a partir del DOM tras montar.
  useEffect(() => {
    const scope = document.querySelector(scopeSelector);
    if (!scope) return;

    const headings = Array.from(scope.querySelectorAll("h2[id]"));

    // Incluir el bloque "Preguntas frecuentes" si existe, como una entrada
    // más del índice (vive fuera del .guide__body pero es parte del artículo).
    const faqHeading = includeFaqId
      ? document.getElementById(includeFaqId)
      : null;
    const all = faqHeading ? [...headings, faqHeading] : headings;

    const list = all
      .filter((h) => h.id && (h.textContent || "").trim())
      .map((h) => ({ id: h.id, text: h.textContent.trim() }));

    setItems(list);
  }, [scopeSelector, includeFaqId]);

  // 2) Resaltar la sección activa al hacer scroll.
  useEffect(() => {
    if (!items.length || typeof IntersectionObserver === "undefined") return;

    const targets = items
      .map((it) => document.getElementById(it.id))
      .filter(Boolean);
    if (!targets.length) return;

    // La sección activa es la última cuyo encabezado ya cruzó la franja de
    // lectura (tercio superior del viewport). Recalculamos por geometría en
    // cada evento del observer: es robusto ante secciones más cortas que el
    // viewport, donde el simple isIntersecting daría saltos.
    const recompute = () => {
      let current = null;
      for (const t of targets) {
        const rect = t.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.3) current = t.id;
      }
      // Si ninguna ha cruzado aún (arriba del todo), resalta la primera.
      setActiveId(current || targets[0].id);
    };

    const observer = new IntersectionObserver(recompute, {
      // Franja de detección en el tercio superior del viewport.
      rootMargin: "0px 0px -70% 0px",
      threshold: [0, 1],
    });

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  // Dejamos que el ancla navegue de forma nativa (mejora progresiva), pero
  // actualizamos el estado activo de inmediato para dar feedback al toque.
  const handleClick = (id) => setActiveId(id);

  const list = (
    <ol className="guide-toc__list">
      {items.map((it) => (
        <li key={it.id} className="guide-toc__item">
          <a
            href={`#${it.id}`}
            className={
              activeId === it.id
                ? "guide-toc__link guide-toc__link--active"
                : "guide-toc__link"
            }
            aria-current={activeId === it.id ? "true" : undefined}
            onClick={() => handleClick(it.id)}
          >
            {it.text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <nav className="guide-toc" aria-label="En esta guía">
      {/* Móvil: bloque colapsable. Cerrado por defecto. */}
      <details className="guide-toc__mobile">
        <summary className="guide-toc__summary">
          <span>En esta guía</span>
          <span className="guide-toc__summary-icon" aria-hidden="true" />
        </summary>
        {list}
      </details>

      {/* Escritorio: índice siempre visible (la columna la hace sticky el CSS). */}
      <div className="guide-toc__desktop">
        <p className="guide-toc__title">En esta guía</p>
        {list}
      </div>
    </nav>
  );
}
