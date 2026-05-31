"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Barra de progreso de lectura.
 *
 * Una línea finísima fija en el borde superior del viewport que refleja
 * cuánto del artículo ha recorrido el lector. Monocroma (var(--ink)),
 * sin gradiente ni color de marca.
 *
 * Mejora progresiva: sin JS la barra no existe (no se renderiza nada en
 * servidor visualmente relevante) y el artículo se lee igual. No recibe
 * el Body (que es una función) ni ninguna prop no serializable.
 *
 * Accesibilidad: la barra es puramente decorativa (la lee el ojo, no
 * aporta contenido), así que se marca aria-hidden y se respeta
 * prefers-reduced-motion desactivando la transición de ancho.
 *
 * `targetId` es el id del contenedor cuyo scroll medimos (por defecto el
 * <article>). Medimos el avance relativo a la parte legible: desde que la
 * cabecera del artículo entra hasta que su final llega al fondo del
 * viewport.
 */
export default function ReadingProgress({ targetId = "guide-article" }) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const article =
      document.getElementById(targetId) ||
      document.querySelector(".guide__article");
    if (!article) return;

    const compute = () => {
      rafRef.current = 0;
      const rect = article.getBoundingClientRect();
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      // Distancia total que el artículo puede recorrer bajo el viewport.
      // Cuando el top del artículo está en 0 y su bottom aún por debajo,
      // progreso 0; cuando el bottom alcanza el fondo del viewport, 100.
      const scrollable = rect.height - viewport;
      if (scrollable <= 0) {
        setProgress(1);
        return;
      }
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
      setProgress(scrolled / scrollable);
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [targetId]);

  return (
    <div className="guide-progress" aria-hidden="true">
      <div
        className="guide-progress__bar"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
