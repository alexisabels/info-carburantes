// Streaming skeleton para la ficha de gasolinera. Muestra la silueta de
// cabecera, precio principal, dos botones y dos bloques siguientes — la
// gente identifica "esto es una ficha" antes de que MITECO responda.

export default function Loading() {
  return (
    <main className="skeleton-detail" aria-label="Cargando gasolinera">
      <div className="skeleton-detail__head">
        <span className="skeleton skeleton-detail__avatar" />
        <div>
          <span className="skeleton skeleton-detail__title" />
          <span className="skeleton skeleton-detail__sub" />
        </div>
        <span className="skeleton skeleton-detail__fav" />
      </div>
      <span className="skeleton skeleton-detail__bigprice" />
      <div className="skeleton-detail__actions">
        <span className="skeleton skeleton-detail__btn" />
        <span className="skeleton skeleton-detail__btn" />
      </div>
      <span className="skeleton skeleton-detail__block" />
      <span className="skeleton skeleton-detail__block" />
    </main>
  );
}
