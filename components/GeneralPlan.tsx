"use client";

import { useEffect, useRef, useState } from "react";
import SiteOverlay from "./SiteOverlay";
import plan from "@/lib/genplan-data.json";
import shapes from "@/lib/plan-shapes.json";
import "./general-plan.css";

export function InteractivePlan({ embedded = false }: { embedded?: boolean }) {
  const container = useRef<HTMLElement>(null);
  const map = useRef<HTMLDivElement>(null);
  const drag = useRef<{ startX: number; position: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const [pan, setPan] = useState(0);
  const [active, setActive] = useState<{ kind: "villa" | "block"; index: number } | null>(null);
  const [block, setBlock] = useState<number | null>(null);
  const [floor, setFloor] = useState(1);
  const [modalReady, setModalReady] = useState(false);
  const tooltip = useRef<HTMLDivElement>(null);
  const modal = useRef<HTMLDivElement>(null);
  const activeVilla = active?.kind === "villa" ? plan.villas[active.index] : null;
  const activeBlock = active?.kind === "block" ? plan.sections[active.index] : null;
  const section = block === null ? null : plan.sections[block];
  const floorLots = section?.lots.filter(lot => lot.floorId === floor) || [];
  useEffect(() => {
    if (block === null) return;
    const overflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    setModalReady(true);
    const focusFrame = requestAnimationFrame(() => modal.current?.focus());
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setBlock(null);
      if (event.key === "Tab") {
        const nodes = modal.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex="0"]');
        if (!nodes?.length) return;
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (!modal.current?.contains(document.activeElement) || document.activeElement === modal.current || (event.shiftKey && document.activeElement === first)) { event.preventDefault(); (event.shiftKey ? last : first).focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", close);
    return () => { cancelAnimationFrame(focusFrame); document.body.style.overflow = overflow; window.removeEventListener("keydown", close); previousFocus?.focus({ preventScroll: true }); };
  }, [block]);
  function openBlock(index: number) { setBlock(index); setFloor(1); setActive(null); }
  return <>
    <section ref={container} className={`interactive-plan ${embedded ? "is-embedded" : "is-full-page"}`} id="general-plan" data-header-color="light" aria-label="Interactive general plan">
      <div ref={map} className="interactive-plan-map" style={{ transform: `translate(calc(-50% + ${pan}px), -50%)` }}
        onPointerDown={event => { event.preventDefault(); drag.current = { startX: event.clientX, position: pan, moved: false }; suppressClick.current = false; }}
        onDragStart={event => event.preventDefault()}
        onPointerMove={event => {
          if (!drag.current || !container.current || !map.current) return;
          if (Math.abs(event.clientX - drag.current.startX) > 5) { drag.current.moved = true; event.currentTarget.setPointerCapture(event.pointerId); }
          if (!drag.current.moved) return;
          const limit = Math.max(0, (map.current.clientWidth - container.current.clientWidth) / 2);
          setPan(Math.max(-limit, Math.min(limit, drag.current.position + event.clientX - drag.current.startX)));
        }}
        onPointerUp={() => { suppressClick.current = Boolean(drag.current?.moved); drag.current = null; }} onPointerCancel={() => { drag.current = null; }}
        onClickCapture={event => { if (suppressClick.current && event.detail !== 0) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}>
        <img className="interactive-plan-image" src="/images/genplan/plan.jpg" alt="Horizonte Village general plan: 23 villas and four residence blocks" loading={embedded ? "lazy" : "eager"} draggable={false} />
        {shapes.villas.map((shape, index) => <div key={shape.number} className={`plan-outline ${active?.kind === "villa" && active.index === index ? "is-active" : ""}`} style={{ left: `${shape.left}%`, top: `${shape.top}%`, width: `${shape.width}%` }} onMouseEnter={() => setActive({ kind: "villa", index })}>
          <a href={`/selection/${plan.villas[index].link}`} aria-label={`Explore villa ${plan.villas[index].number.trim()}`}><svg viewBox={shape.viewBox} fill="none"><path d={shape.d} /></svg></a>
          <button className="plan-marker" aria-label={`Show villa ${plan.villas[index].number.trim()} details`} onFocus={() => setActive({ kind: "villa", index })} onClick={() => setActive({ kind: "villa", index })}>{plan.villas[index].number.trim()}</button>
        </div>)}
        {shapes.blocks.map((shape, index) => <div key={shape.number} className={`plan-outline plan-block ${active?.kind === "block" && active.index === index ? "is-active" : ""}`} style={{ left: `${shape.left}%`, top: `${shape.top}%`, width: `${shape.width}%` }} onMouseEnter={() => setActive({ kind: "block", index })}>
          <button className="plan-block-shape" aria-label={`Explore residence block ${plan.sections[index].title}`} onClick={() => openBlock(index)}><svg viewBox={shape.viewBox} fill="none"><path d={shape.d} /></svg></button>
          <button className="plan-marker" aria-label={`Show residence block ${plan.sections[index].title}`} onFocus={() => setActive({ kind: "block", index })} onClick={() => openBlock(index)}>Block {plan.sections[index].title}</button>
        </div>)}
      </div>
      {embedded && <p className="plan-section-label">Genplan</p>}
      <div className="plan-map-shade" />
      {active && <div className="plan-info" ref={tooltip}>
        <button className="plan-info-close" aria-label="Close property information" onClick={() => setActive(null)}>×</button>
        {activeVilla ? <><p>{activeVilla.rooms.join(" ")}, {activeVilla.bathrooms.join(" ")}</p><p>{activeVilla.area} m²</p><h3><small>Villa</small> {activeVilla.number}</h3><a href={`/selection/${activeVilla.link}`}>Details ↗</a></> : activeBlock ? <><p>{new Set(activeBlock.lots.map(lot => lot.number)).size} apartments</p><h3><small>Block</small> {activeBlock.title}</h3><button onClick={() => openBlock(active.index)}>Details ↗</button></> : null}
      </div>}
      <p className="plan-drag-hint">← Drag to explore →</p>
      {!embedded && <a className="plan-catalog-link" href="/selection?category=villas">Floor plans ↗</a>}
    </section>
    {section && <div className={`plan-modal ${modalReady ? "is-ready" : ""}`} role="dialog" aria-modal="true" aria-labelledby="block-title">
      <button className="plan-modal-backdrop" aria-label="Close residence block" onClick={() => setBlock(null)} />
      <div className="plan-modal-panel" ref={modal} tabIndex={-1}><button className="plan-modal-close" aria-label="Close residence block" onClick={() => setBlock(null)}>×</button><p className="plan-modal-caption">Residences</p><h2 id="block-title">Block {section.title}</h2>
        <div className="plan-building"><img src={`/reference-assets/Block_${section.title}_${({ "1": "7db2080abb", "2": "da883c022b", "3": "7a48ba5bae", "4": "202d680ac9" } as Record<string, string>)[section.title]}.webp`} alt={`Residence block ${section.title}`} />
          <div className="plan-floor-stack">{[3, 2, 1].map(level => <button key={level} className={floor === level ? "is-active" : ""} onClick={() => setFloor(level)} aria-label={`Select ${level === 1 ? "ground" : level === 2 ? "first" : "second"} floor`}><span>{level === 1 ? "Ground floor" : level === 2 ? "First floor" : "Penthouse"}</span><i /></button>)}</div>
        </div>
        <div className="plan-floor-navigation">{plan.floors.map(level => <button key={level.id} className={floor === level.id ? "is-active" : ""} onClick={() => setFloor(level.id)} aria-pressed={floor === level.id}>{level.title}</button>)}</div>
        <div className="plan-apartments">{floorLots.map(lot => <a key={lot.id} href={`/selection/${lot.product_id}`}><span>No.{lot.number}</span><p>{lot.rooms}, {lot.bathrooms}</p><span>{lot.square} m²</span><b>↗</b></a>)}</div>
      </div>
    </div>}
  </>;
}

export default function GeneralPlan() {
  return <><SiteOverlay entered category="villas" /><InteractivePlan /></>;
}
