// Skeleton para /provincia/:id/:slug. Igual filosofía que el de municipio:
// el shell entero (header + grid) sale en ms, el contenido entra cuando
// MITECO devuelve los ~8000 municipios.

export default function Loading() {
  return (
    <main id="main" className="province" aria-label="Cargando provincia">
      <div className="province__head">
        <span className="skeleton" style={{ width: "30%", height: 14 }} />
        <span
          className="skeleton"
          style={{ display: "block", width: "70%", height: 30, marginTop: 8 }}
        />
        <span
          className="skeleton"
          style={{ display: "block", width: "50%", height: 14, marginTop: 8 }}
        />
      </div>
      <ul className="province__list" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, i) => (
          <li key={i}>
            <span
              className="skeleton"
              style={{ display: "block", height: 52, borderRadius: "var(--r)" }}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
