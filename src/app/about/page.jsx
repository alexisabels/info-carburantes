import About from "../../components/About/About";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Sobre Carburantes · Precios de gasolineras en España",
  description:
    "Carburantes es un buscador de precios de combustible en España con datos oficiales del Ministerio. Sin cuentas, sin cookies de seguimiento, sin publicidad.",
  path: "/about",
});

export default function AboutPage() {
  return <About />;
}
