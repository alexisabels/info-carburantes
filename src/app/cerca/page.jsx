import MainContent from "../../components/MainContent";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Gasolineras cerca de ti · Carburantes",
  description:
    "Encuentra las gasolineras más baratas cerca de tu ubicación en tiempo real. Compara precios de gasolina y diésel en España.",
  path: "/cerca",
});

export default function NearPage() {
  return <MainContent mode="near" />;
}
