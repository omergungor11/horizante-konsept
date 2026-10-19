import SiteOverlay from "./SiteOverlay";
import { SubpageFooter } from "./SelectionExplorer";
import "./legal.css";

type LegalContent = { hero: { title: string; description: string; lastUpdate?: string }; info: { title: string; description: string }[] };
export default function LegalPage({ content }: { content: LegalContent }) {
  return <div className="legal-page"><SiteOverlay entered category="villas" />
    <article><header><h1>{content.hero.title}</h1>{content.hero.lastUpdate && <p>Last updated: {content.hero.lastUpdate}</p>}<div dangerouslySetInnerHTML={{ __html: content.hero.description }} /></header>
      {content.info.map((section, index) => <section key={index}><h2>{section.title}</h2><div dangerouslySetInnerHTML={{ __html: section.description }} /></section>)}
    </article><SubpageFooter />
  </div>;
}
