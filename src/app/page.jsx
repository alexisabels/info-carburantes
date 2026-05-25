import MainContent from "../components/MainContent";
import { buildMetadata } from "../lib/seo";

export const metadata = buildMetadata({
  title: "Carburantes — Precios de gasolineras en España",
  description:
    "Consulta precios actualizados de gasolina y diésel en estaciones de servicio de España. Encuentra la gasolinera más barata cerca de ti en tiempo real.",
  path: "/",
});

export default function HomePage() {
  return <MainContent />;
}
