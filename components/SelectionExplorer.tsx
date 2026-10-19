"use client";

import { useEffect, useMemo, useState } from "react";
import SiteOverlay from "./SiteOverlay";
import selection from "@/lib/selection-data.json";
import "./selection.css";

export type PropertyCategory = "villas" | "residences";
export type PropertyLot = {
  number: string; area: string; type: number; rooms: string[]; bathrooms: string[];
  commissioning: string; link: string; images: { original: string; alt: string }[]; storeyId?: number;
};
export const localAsset = (url: string) => `/reference-assets/${url.split("/").pop()}`;

export function PropertyCard({ lot }: { lot: PropertyLot }) {
  return <a className="selection-card" href={`/selection/${lot.link}`}>
    <span className="selection-card-number">No.{lot.number.trim()}</span>
    <div className="selection-card-image"><img src={localAsset(lot.images[0].original)} alt={`Floor plan of property ${lot.number.trim()}`} loading="lazy" /></div>
    <div className="selection-card-bottom"><p>{lot.rooms[0]}-bedrooms, {lot.bathrooms[0]} bathrooms<br /><span>{lot.area} m²</span></p><span className="selection-round">↗</span></div>
  </a>;
}

export function SubpageFooter() {
  return <footer className="subpage-footer">
    <div><span>Contact sales office</span><a href="tel:+34951870700">+34 (951) 870-700</a><a href="mailto:info@horizonte-village.com">info@horizonte-village.com</a></div>
    <a href="/" aria-label="Horizonte home"><img src="/logo_big.svg" alt="Horizonte" /></a>
    <div className="subpage-footer-meta"><span>Mijas, Malaga, Spain</span><a href="/privacy-policy">Privacy policy</a><a href="/terms-of-use">Terms of use</a><span>© Horizonte — 2026</span></div>
  </footer>;
}

export function SubpageContact() {
  const [ready, setReady] = useState(false);
  return <section className="subpage-contact" id="contact">
    <h2>Trust us <i>to</i> guide <i>you</i><br /><i>to your</i> future home</h2>
    <p>Our specialist will contact you as soon as possible.</p>
    <form onSubmit={event => { event.preventDefault(); setReady(true); }}>
      <input name="name" autoComplete="name" placeholder="Your name..." aria-label="Your name" required minLength={2} />
      <input name="phone" autoComplete="tel" type="tel" placeholder="Phone number..." aria-label="Phone number" required minLength={4} />
      <button type="submit">Request a call ↗</button>
    </form>
    {ready && <p role="status">Contact our sales office at <a href="mailto:info@horizonte-village.com">info@horizonte-village.com ↗</a></p>}
    <small>By sending your request, you&apos;re agreeing to our <a href="/privacy-policy">privacy policy</a>. We promise to keep your personal information safe and secure.</small>
  </section>;
}

export default function SelectionExplorer({ initialCategory = "villas" }: { initialCategory?: PropertyCategory }) {
  const [category, setCategory] = useState<PropertyCategory>(initialCategory);
  const [rooms, setRooms] = useState<string[]>([]);
  const [storeys, setStoreys] = useState<number[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const current = selection[category];
  const lots = current.lots as PropertyLot[];
  const filtered = useMemo(() => lots.filter(lot => (!rooms.length || rooms.includes(lot.rooms[0])) && (!storeys.length || storeys.includes(lot.storeyId || 0))), [lots, rooms, storeys]);
  useEffect(() => {
    if (window.matchMedia("(max-width: 1023px)").matches) setFiltersOpen(false);
    const handler = (event: Event) => {
      const next = (event as CustomEvent).detail;
      if (next === "villas" || next === "residences") { setCategory(next); setRooms([]); setStoreys([]); }
    };
    window.addEventListener("category-change", handler);
    return () => window.removeEventListener("category-change", handler);
  }, []);
  function changeCategory(next: PropertyCategory) {
    setCategory(next); setRooms([]); setStoreys([]);
    window.history.replaceState(null, "", `/selection?category=${next}`);
    window.dispatchEvent(new CustomEvent("category-change", { detail: next }));
  }
  function toggle<T>(values: T[], value: T) { return values.includes(value) ? values.filter(v => v !== value) : [...values, value]; }
  return <div className="selection-page">
    <SiteOverlay entered category={category} />
    <section className="selection-hero" data-header-color="light">
      <img className="selection-hero-image" src={category === "villas" ? "/reference-assets/Gen_plan_1_c41a75f279_8f2ed8588a.webp" : "/reference-assets/Penthouse_2234957cd2_4fc5bf010c.webp"} alt="Horizonte Village in the hills of Costa del Sol" />
      <div className="selection-hero-shade" />
      <h1>{(["villas", "residences"] as const).map(value => <button key={value} aria-pressed={category === value} className={category === value ? "is-selected" : ""} onClick={() => changeCategory(value)}>{value}</button>)}</h1>
      <a className="selection-visual-link" href={`/genplan?category=${category}`}><span>Visual<br />selection</span></a>
    </section>
    <section className={`selection-filters ${filtersOpen ? "is-open" : ""}`} aria-label="Property filters">
      <div className="selection-filter-content">
        <div><p>Rooms</p><div className="selection-filter-options">{current.filtersData.rooms.map(room => <button className={rooms.includes(room.title) ? "is-selected" : ""} key={room.id} onClick={() => setRooms(toggle(rooms, room.title))} aria-pressed={rooms.includes(room.title)}>{room.title}<small> br</small></button>)}</div></div>
        <div><p>Type</p><div className="selection-filter-options">{current.filtersData.storeys.map(storey => <button key={storey.id} className={storeys.includes(storey.id) ? "is-selected" : ""} onClick={() => setStoreys(toggle(storeys, storey.id))} aria-pressed={storeys.includes(storey.id)}>{storey.title}</button>)}</div></div>
        <div className="selection-available"><p>{category} available</p><span aria-live="polite">{filtered.length.toString().padStart(2, "0")}</span></div>
      </div>
      <div className="selection-filter-bar">{(rooms.length > 0 || storeys.length > 0) && <button onClick={() => { setRooms([]); setStoreys([]); }}>Reset filters ×</button>}<button onClick={() => setFiltersOpen(!filtersOpen)} aria-expanded={filtersOpen}>{filtersOpen ? "Close" : "Open"} filter</button></div>
    </section>
    <div className="selection-grid">{filtered.map(lot => <PropertyCard lot={lot} key={lot.link} />)}{!filtered.length && <p className="selection-empty">No properties match this combination.<button onClick={() => { setRooms([]); setStoreys([]); }}>View all {category} ↗</button></p>}</div>
    <div className="selection-events">{current.pageData.promos.map((promo, index) => <article key={index}><img src={localAsset(promo.image.original)} alt={promo.image.alt} loading="lazy" /><h2>{promo.title}</h2><p>{promo.description}</p></article>)}</div>
    <SubpageContact /><SubpageFooter />
  </div>;
}
