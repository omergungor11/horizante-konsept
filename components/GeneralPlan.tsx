"use client";

import { useRef, useState } from "react";
import SiteOverlay from "./SiteOverlay";
import BlockModal from "./BlockModal";
import WaveButton from "./WaveButton";
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
  const tooltip = useRef<HTMLDivElement>(null);
  const cursor = useRef({x:0,y:0});
  const isTouch = () => window.innerWidth < 1024 || matchMedia("(hover: none)").matches;
  const activeVilla = active?.kind === "villa" ? plan.villas[active.index] : null;
  const activeBlock = active?.kind === "block" ? plan.sections[active.index] : null;
  const section = block === null ? null : plan.sections[block];
  function openBlock(index: number) { setBlock(index); setActive(null); }
  return <>
    <section ref={container} className={`interactive-plan ${embedded ? "is-embedded" : "is-full-page"}`} id="general-plan" data-header-color="light" aria-label="Interactive general plan" onPointerMove={event=>{cursor.current={x:event.clientX,y:event.clientY};if(tooltip.current&&!isTouch())tooltip.current.style.transform=`translate3d(${event.clientX}px,${event.clientY}px,0)`}}>
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
        {shapes.villas.map((shape, index) => <div key={shape.number} className={`plan-outline ${active?.kind === "villa" && active.index === index ? "is-active" : ""}`} style={{ left: `${shape.left}%`, top: `${shape.top}%`, width: `${shape.width}%` }} onPointerEnter={event=>{if(event.pointerType==="mouse"&&!isTouch())setActive({kind:"villa",index})}} onPointerLeave={()=>{if(!isTouch())setActive(null)}}>
          <a href={`/selection/${plan.villas[index].link}`} aria-label={`Explore villa ${plan.villas[index].number.trim()}`} onClick={event=>{if(isTouch()){event.preventDefault();setActive({kind:"villa",index})}}}><svg viewBox={shape.viewBox} fill="none"><path d={shape.d} /></svg></a>
          <button className="plan-marker" aria-label={`Show villa ${plan.villas[index].number.trim()} details`} onFocus={() => setActive({ kind: "villa", index })} onClick={() => setActive({ kind: "villa", index })}><WaveButton size="small">{plan.villas[index].number.trim()}</WaveButton></button>
        </div>)}
        {shapes.blocks.map((shape, index) => <div key={shape.number} className={`plan-outline plan-block ${active?.kind === "block" && active.index === index ? "is-active" : ""}`} style={{ left: `${shape.left}%`, top: `${shape.top}%`, width: `${shape.width}%` }} onPointerEnter={event=>{if(event.pointerType==="mouse"&&!isTouch())setActive({kind:"block",index})}} onPointerLeave={()=>{if(!isTouch())setActive(null)}}>
          <button className="plan-block-shape" aria-label={`Explore residence block ${plan.sections[index].title}`} onClick={() => {if(isTouch())setActive({kind:"block",index});else openBlock(index)}}><svg viewBox={shape.viewBox} fill="none"><path d={shape.d} /></svg></button>
          <button className="plan-marker" aria-label={`Show residence block ${plan.sections[index].title}`} onFocus={() => setActive({ kind: "block", index })} onClick={() => {if(isTouch())setActive({kind:"block",index});else openBlock(index)}}><WaveButton size="small" className="oval">Block {plan.sections[index].title}</WaveButton></button>
        </div>)}
      </div>
      {embedded && <p className="plan-section-label">Genplan</p>}
      <div className="plan-map-shade" />
      {active && <div className="plan-info" ref={element=>{tooltip.current=element;if(element&&!isTouch())element.style.transform=`translate3d(${cursor.current.x}px,${cursor.current.y}px,0)`}}>
        <button className="plan-info-close" aria-label="Close property information" onClick={() => setActive(null)}>×</button>
        {activeVilla ? <><p>{activeVilla.rooms.join(" ")}, {activeVilla.bathrooms.join(" ")}</p><p>{activeVilla.area} m²</p><h3><small>Villa</small> {activeVilla.number}</h3><a href={`/selection/${activeVilla.link}`}>Details ↗</a></> : activeBlock ? <><p>{new Set(activeBlock.lots.map(lot => lot.number)).size} apartments</p><h3><small>Block</small> {activeBlock.title}</h3><button onClick={() => openBlock(active.index)}>Details ↗</button></> : null}
      </div>}
      <p className="plan-drag-hint">← Drag to explore →</p>
      {!embedded && <a className="plan-catalog-link" href="/selection?category=villas">Floor plans ↗</a>}
    </section>
    {section && block!==null && <BlockModal key={block} section={section} blockIndex={block} onClose={()=>setBlock(null)}/>}
  </>;
}

export default function GeneralPlan() {
  return <><SiteOverlay entered category="villas" /><InteractivePlan /></>;
}
