import LegalPage from "@/components/LegalPage";
import content from "@/lib/privacy-data.json";
export const metadata = { title: "Privacy Policy — Horizonte Village" };
export default function PrivacyPage() { return <LegalPage content={content} />; }
