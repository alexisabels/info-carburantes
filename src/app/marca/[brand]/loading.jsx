// Skeleton para /marca/[brand]. La carga del listado nacional puede tardar
// 5-8 s en frío (5+ MB de MITECO); mientras tanto pintamos el shell + 6
// secciones simuladas para que el usuario sepa qué está esperando.

export default function Loading() {
  return (
    <main id="main" className="brand" aria-label="Cargando marca">
      <div className="brand__head">
        <span
          className="skeleton"
          style={{ display: "block", width: "20%", height: 14, marginBottom: 12 }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span
            className="skeleton"
            style={{ width: 56, height: 56, borderRadius: 12 }}
          />
          <span
            className="skeleton"
            style={{ display: "block", width: 220, height: 28 }}
          />
        </div>
        <span
          className="skeleton"
          style={{ display: "block", width: "60%", height: 14, marginTop: 14 }}
        />
      </div>
      <div className="brand__groups" aria-hidden="true">
        {Array.from({ length: 4 }).map((_, i) => (
          <section key={i} className="brand__group">
            <span
              className="skeleton"
              style={{ display: "block", width: "40%", height: 22, marginBottom: 12 }}
            />
            <ul className="brand__list">
              {Array.from({ length: 4 }).map((__, j) => (
                <li key={j} className="brand__item">
                  <span
                    className="skeleton"
                    style={{ display: "block", height: 44, borderRadius: "var(--r)" }}
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
