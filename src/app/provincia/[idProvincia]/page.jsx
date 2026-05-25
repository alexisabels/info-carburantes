import { redirect } from "next/navigation";
import { getProvinciaContext } from "../../../lib/provincias";

// Ruta canónica = /provincia/[id]/[slug]. Si llega sin slug resolvemos el
// nombre en servidor y hacemos 308. Si la provincia no existe caemos al
// índice de provincias.

export const dynamicParams = true;
export const revalidate = 86400;

export default async function ProvinciaByIdPage({ params }) {
  const { idProvincia } = await params;
  const ctx = await getProvinciaContext(idProvincia);
  if (ctx.slug) {
    redirect(`/provincia/${idProvincia}/${ctx.slug}`);
  }
  redirect("/provincias");
}
