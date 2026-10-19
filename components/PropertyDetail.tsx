"use client";

import { useEffect, useRef, useState } from "react";
import SiteOverlay from "./SiteOverlay";
import { localAsset, PropertyCard, PropertyCategory, PropertyLot, SubpageContact, SubpageFooter } from "./SelectionExplorer";
import "./property-detail.css";

type Photo = { original: string; alt: string };
export type PropertyDetailData = {
  pageData: {
    info: { object: string; number: string; rooms: string[]; bathrooms: string[]; area: string; commissioning: string; type: { id: number; title: string }; pdf: string | null };
    main: { layouts: { title: string; image: Photo }[]; compass: number };
    features: { image: Photo }[];
    similar_title: string;
  };
  similarLots: PropertyLot[];
};

export default function PropertyDetail({ detail }: { detail: PropertyDetailData }) {
  const { info, main, features } = detail.pageData;
  const category: PropertyCategory = info.type.title === "villas" ? "villas" : "residences";
  const [floor, setFloor] = useState(0);
  const [slide, setSlide] = useState(0);
  const [full, setFull] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [shared, setShared] = useState(false);
  const drag = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const current = main.layouts[floor];
  useEffect(() => {
    if (!full) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (event: KeyboardEvent) => { if (event.key === "Escape") setFull(false); };
    window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = before; window.removeEventListener("keydown", key); };
  }, [full]);
  async function share() {
    try {
      if (navigator.share) await navigator.share({ title: `${category === "villas" ? "Villa" : "Residence"} ${info.number} — Horizonte`, url: window.location.href });
      else { await navigator.clipboard.writeText(window.location.href); setShared(true); }
    } catch { setShared(false); }
  }
  return <div className="property-detail">
    <SiteOverlay entered category={category} />
    <section className="property-main" data-header-color="dark">
      <aside className="property-information">
        <p className="property-number" dangerouslySetInnerHTML={{ __html: info.object }} />
        <h1><span>{info.rooms[0]}<small>-{info.rooms[1]}, </small>{info.bathrooms[0]}<small> {info.bathrooms[1]}</small></span><span>{info.area}<small> m²</small></span></h1>
        <button className="property-book" onClick={() => window.dispatchEvent(new Event("open-selector"))}>Book</button>
        <div className="property-info-bottom"><button className="selection-round" aria-label="Share property" onClick={share}>↗</button><a href={`/selection?category=${category}`}>See more options</a></div>
        {shared && <p className="property-share-status" role="status">Link copied</p>}
      </aside>
      <div className="property-layout">
        <button className="property-layout-image" aria-label="Open full screen floor plan" onClick={() => { setFull(true); setZoom(1); setPan({ x: 0, y: 0 }); }}><img src={localAsset(current.image.original)} alt={`${category === "villas" ? "Villa" : "Residence"} ${info.number} — ${current.title}`} /></button>
        <div className="property-compass" style={{ transform: `rotate(${main.compass || 0}deg)` }}>N<br /><span>↗</span></div>
        <a className="property-panorama" href="/#panorama"><img src="/reference-assets/Gen_plan_1_c41a75f279_8f2ed8588a.webp" alt="Horizonte panorama" /><span>Panorama</span><b className="selection-round">+</b></a>
        <div className="property-floor-tabs" aria-label="Floor plans">{main.layouts.map((layout, index) => <button key={index} className={floor === index ? "is-active" : ""} onClick={() => setFloor(index)} aria-pressed={floor === index}>{layout.title}</button>)}</div>
      </div>
    </section>
    {features.length > 0 && <section className="property-gallery" aria-label="Property gallery">
      {features.map((feature, index) => <img key={index} className={index === slide ? "is-active" : ""} src={localAsset(feature.image.original)} alt={feature.image.alt || `Property ${info.number}`} loading="lazy" />)}
      <div className="property-gallery-controls"><span>{(slide + 1).toString().padStart(2, "0")}<small> / {features.length.toString().padStart(2, "0")}</small></span><div><button className="selection-round" aria-label="Previous photo" onClick={() => setSlide((slide - 1 + features.length) % features.length)}>←</button><button className="selection-round" aria-label="Next photo" onClick={() => setSlide((slide + 1) % features.length)}>→</button></div></div>
    </section>}
    <section className="property-similar"><h2 dangerouslySetInnerHTML={{ __html: detail.pageData.similar_title }} /><p>Similar {category}</p><div className="selection-grid">{detail.similarLots.map(lot => <PropertyCard lot={lot} key={lot.link} />)}</div></section>
    <SubpageContact /><SubpageFooter />
    {full && <div className="property-fullscreen" role="dialog" aria-modal="true" aria-label="Full screen floor plan">
      <div className="property-fullscreen-toolbar"><p>{category === "villas" ? "Villa" : "Residence"} {info.number} — {current.title}</p><div><button className="selection-round" aria-label="Zoom out" onClick={() => setZoom(Math.max(1, zoom - .25))}>−</button><button className="selection-round" aria-label="Zoom in" onClick={() => setZoom(Math.min(3, zoom + .25))}>+</button><button className="selection-round" aria-label="Close full screen" onClick={() => setFull(false)}>×</button></div></div>
      <div className="property-zoom-canvas" onPointerDown={event => { drag.current = { x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y }; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerMove={event => { if (drag.current) setPan({ x: drag.current.panX + event.clientX - drag.current.x, y: drag.current.panY + event.clientY - drag.current.y }); }} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}>
        <img src={localAsset(current.image.original)} alt={current.title} draggable={false} style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }} />
      </div>
      <div className="property-fullscreen-bottom"><div className="property-floor-tabs">{main.layouts.map((layout, index) => <button key={index} className={floor === index ? "is-active" : ""} onClick={() => { setFloor(index); setPan({ x: 0, y: 0 }); }}>{layout.title}</button>)}</div><a href={localAsset(current.image.original)} download>Download floor plan ↓</a></div>
    </div>}
  </div>;
}
