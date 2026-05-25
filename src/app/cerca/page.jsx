import MainContent from "../../components/MainContent";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Gasolineras cerca de mí o de una dirección · Carburantes",
  description:
    "Encuentra las gasolineras más baratas cerca de ti o de cualquier dirección de España. Compara precios de gasolina y diésel en tiempo real.",
  path: "/cerca",
});

export default function NearPage() {
  return <MainContent mode="near" />;
}
