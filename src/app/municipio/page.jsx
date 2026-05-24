import MainContent from "../../components/MainContent";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Buscar por municipio · Carburantes",
  description:
    "Busca gasolineras por provincia y municipio en España. Compara precios actualizados de gasolina y diésel.",
  path: "/municipio",
});

export default function MunicipioPickerPage() {
  return <MainContent mode="manual" />;
}
