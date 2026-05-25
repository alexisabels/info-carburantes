import { Suspense } from "react";
import RoutePlanner from "../../components/RoutePlanner/RoutePlanner";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Planificar ruta y repostar más barato · Carburantes",
  description:
    "Planifica una ruta entre dos puntos en España y descubre las gasolineras más baratas a lo largo del trayecto. Filtra por combustible, marca y abierto ahora.",
  path: "/ruta",
});

export default function RutaPage() {
  // Suspense porque RoutePlanner usa useSearchParams (CSR bailout) — sin
  // este boundary, Next obliga a renderizar el árbol entero en cliente.
  return (
    <Suspense
      fallback={
        <div className="loading" role="status" aria-live="polite">
          <div className="loading__bar" aria-hidden="true" />
          <span>Cargando planificador…</span>
        </div>
      }
    >
      <RoutePlanner />
    </Suspense>
  );
}
