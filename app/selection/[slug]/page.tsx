import { notFound } from "next/navigation";
import PropertyDetail, { type PropertyDetailData } from "@/components/PropertyDetail";
import details from "@/lib/lot-details.json";
const allDetails = details as unknown as Record<string, Record<string, PropertyDetailData>>;
export function generateStaticParams() { return Object.keys(allDetails).map(slug => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const info = allDetails[slug]?.[slug]?.pageData.info;
  return { title: info ? `${info.type.title === "villas" ? "Villa" : "Residence"} ${info.number} — Horizonte Village` : "Property — Horizonte Village" };
}
export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = allDetails[slug]?.[slug];
  if (!detail?.pageData) notFound();
  return <PropertyDetail detail={detail} />;
}
