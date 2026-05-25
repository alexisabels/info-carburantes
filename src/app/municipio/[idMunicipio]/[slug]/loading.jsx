// Loading skeleton para /municipio/:id/:slug. Next.js lo streama mientras
// MITECO resuelve (3-8 s en cold) y devuelve el shell + skeleton en pocos
// ms — el TTFB percibido baja a casi cero y Google ya no ve la ruta como
// "lenta".

export default function Loading() {
  return (
    <main id="main">
      <div className="toolbar">
        <div className="toolbar__row">
          <span className="skeleton" style={{ width: 36, height: 36, borderRadius: "50%" }} />
          <div style={{ flex: 1, paddingLeft: 12 }}>
            <span
              className="skeleton"
              style={{ display: "block", width: "55%", height: 20 }}
            />
            <span
              className="skeleton"
              style={{ display: "block", width: "30%", height: 12, marginTop: 6 }}
            />
          </div>
        </div>
      </div>
      <ul className="skeleton-list" aria-label="Cargando gasolineras">
        {Array.from({ length: 8 }).map((_, i) => (
          <li key={i} className="skeleton-card">
            <span className="skeleton skeleton-card__logo" />
            <div className="skeleton-card__lines">
              <span className="skeleton skeleton-card__line-1" />
              <span className="skeleton skeleton-card__line-2" />
            </div>
            <span className="skeleton skeleton-card__price" />
          </li>
        ))}
      </ul>
    </main>
  );
}
