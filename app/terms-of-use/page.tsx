import LegalPage from "@/components/LegalPage";
import content from "@/lib/terms-data.json";
export const metadata = { title: "Terms of Use — Horizonte Village" };
export default function TermsPage() { return <LegalPage content={content} />; }
