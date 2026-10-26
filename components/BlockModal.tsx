'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import WaveButton from './WaveButton';
import floors from '@/lib/floor-shapes.json';
import flats from '@/lib/flat-shapes.json';
import plan from '@/lib/genplan-data.json';
import './block-modal.css';

gsap.registerPlugin(CustomEase);
CustomEase.create('horizonte-ease', '.16,1,.3,1');

type Block = typeof plan.sections[number];
export default function BlockModal({ section, blockIndex, onClose }: { section: Block; blockIndex: number; onClose: () => void }) {
 const root = useRef<HTMLDivElement>(null), card = useRef<HTMLDivElement>(null);
 const [floor,setFloor]=useState<number|null>(null),[hoverFloor,setHoverFloor]=useState<number|null>(null),[hoverFlat,setHoverFlat]=useState<number|null>(null);
 const [mobile,setMobile]=useState(false);
 const shape=blockIndex%2===0?floors.basement:floors.regular;
 const lots=section.lots.filter(lot=>lot.floorId===(floor||0)+1);
 const lot=hoverFlat===null?null:lots[hoverFlat]||null;
 const hovered= floor===null?hoverFloor!==null:lot!==null;
 const originalFloor=plan.floors[floor??hoverFloor??0];
 useEffect(()=>{
  const element=root.current,previous=document.activeElement as HTMLElement|null,overflow=document.body.style.overflow;
  document.body.style.overflow='hidden';document.body.classList.add('block-modal-open');element?.focus();
  const media=matchMedia('(max-width:1023px)');const resize=()=>setMobile(media.matches);resize();media.addEventListener('change',resize);
  const tween=gsap.fromTo(element,{autoAlpha:0},{autoAlpha:1,duration:.6,ease:'horizonte-ease'});
  const key=(event:KeyboardEvent)=>{
   if(event.key==='Escape')close();
   if(event.key==='Tab'){
    const nodes=element?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[role="button"]');if(!nodes?.length)return;
    const first=nodes[0],last=nodes[nodes.length-1];
    if(document.activeElement===element||(event.shiftKey&&document.activeElement===first)){event.preventDefault();(event.shiftKey?last:first).focus()}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
   }
  };
  document.addEventListener('keydown',key);
  return()=>{tween.kill();document.body.style.overflow=overflow;document.body.classList.remove('block-modal-open');document.removeEventListener('keydown',key);media.removeEventListener('change',resize);previous?.focus({preventScroll:true})};
  // The modal is remounted for each selected block.
  // eslint-disable-next-line react-hooks/exhaustive-deps
 },[]);
 function close(){gsap.to(root.current,{autoAlpha:0,duration:.4,ease:'horizonte-ease',onComplete:onClose})}
 function openFloor(level:number){setFloor(level);setHoverFloor(null);setHoverFlat(null)}
 return <div ref={root} className="hv-block-modal" role="dialog" aria-modal="true" aria-label={`Block ${section.title} floor selection`} tabIndex={-1} onPointerMove={event=>{if(!mobile&&card.current)card.current.style.transform=`translate3d(${event.clientX}px,${event.clientY}px,0)`}}>
  <div className="block-background-pattern"/>
  {floor===null?<div className={`floors-scheme ${blockIndex%2===0?'with-basement':''}`}>
   {plan.floors.map((level,index)=><button className={`floor-button ${hoverFloor===index?'hidden':''}`} key={level.id} aria-label={`Show ${level.title} floor information`} onFocus={()=>setHoverFloor(index)} onClick={()=>{if(mobile)setHoverFloor(index);else openFloor(index)}}><WaveButton size="small" theme="dark" className="oval">{level.title}</WaveButton></button>)}
   <svg className="floors-svg" viewBox={`0 0 784 ${blockIndex%2===0?647:588}`} fill="none" aria-label="Isometric floor selection">
    {shape.groups.map(group=><g className={`floor ${hoverFloor===group.id?'active':''}`} role="button" tabIndex={0} key={group.id} aria-label={`Select ${plan.floors[group.id].title} floor`} onMouseEnter={()=>{if(!mobile)setHoverFloor(group.id)}} onMouseLeave={()=>{if(!mobile)setHoverFloor(null)}} onFocus={()=>setHoverFloor(group.id)} onClick={()=>{if(mobile)setHoverFloor(group.id);else openFloor(group.id)}} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();openFloor(group.id)}}} dangerouslySetInnerHTML={{__html:group.markup}}/>)}
    <g dangerouslySetInnerHTML={{__html:shape.extra}}/>
   </svg>
  </div>:<div className="floor-plan" key={floor}>
   <div className="floor-plan-inner"><img className="plan-photo" src={`/images/genplan/floors/block${blockIndex+1}/${['ground','first','second'][floor]}.webp`} alt={`Block ${section.title}, ${originalFloor.title} floor plan`} />
    {lots.map((item,index)=><div className="flat-item" data-flatno={item.number} key={item.id} onMouseEnter={()=>setHoverFlat(index)} onMouseLeave={()=>{if(!mobile)setHoverFlat(null)}} onClick={()=>setHoverFlat(index)}><a className="flat-link" href={`/selection/${item.product_id}`} aria-label={`View apartment ${item.number}`} onFocus={()=>setHoverFlat(index)} onClick={event=>{if(mobile){event.preventDefault();setHoverFlat(index)}}}/></div>)}
   </div>
   {lots.map((item,index)=><div className={`flat-outline ${hoverFlat===index?'active':''}`} key={item.id} aria-hidden="true" dangerouslySetInnerHTML={{__html:(flats as Record<string,string>)[item.number]||''}}/>)}
  </div>}
  {floor!==null&&<div className="floors-pagination"><button className="floor-button" aria-label="Select previous floor" disabled={floor===0} onClick={()=>openFloor(floor-1)}>↓</button>{plan.floors.map((level,index)=><button className={`floor-button ${floor===index?'active':''}`} key={level.id} aria-label={`Select ${level.title} floor`} aria-pressed={floor===index} onClick={()=>openFloor(index)}>{index+1}</button>)}<button className="floor-button" aria-label="Select next floor" disabled={floor===2} onClick={()=>openFloor(floor+1)}>↑</button></div>}
  <div className="back-button-wrapper"><button className="block-back" aria-label="Close residence block" onClick={close}>←</button><button className="block-name" onClick={()=>{setFloor(null);setHoverFlat(null);setHoverFloor(null)}}>Block {section.title}</button>{floor!==null&&<p className="h1 floor-name"><span>  /  </span>{originalFloor.title}</p>}</div>
  <div ref={card} className={`block-info-card ${hovered?'active':''} ${floor===null?'floor-select':''} ${mobile?'touch-device':''}`}>
   <span className="info-pointer"/><p className="info-title">{floor===null?`${section.lots.filter(item=>item.floorId===(hoverFloor||0)+1).length} apartments`:lot?`${lot.rooms}, ${lot.bathrooms}`:''}</p>
   <p className="info-description">{lot?`${lot.square} m²`:''}</p><p className="h1 info-name">{floor===null?originalFloor.title:<><i>no.</i> {lot?.number}</>}</p>
   {mobile&&(floor===null?<button className="info-link" onClick={()=>openFloor(hoverFloor||0)}>Details</button>:<a className="info-link" href={`/selection/${lot?.product_id}`}>Details</a>)}
  </div>
 </div>;
}
