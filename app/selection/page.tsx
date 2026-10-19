import SelectionExplorer from "@/components/SelectionExplorer";
export const metadata = { title: "Villas and Residences — Horizonte Village" };
export default async function SelectionPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  return <SelectionExplorer initialCategory={category === "residences" ? "residences" : "villas"} />;
}
