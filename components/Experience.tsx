'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Residences from './Residences';
import LowerSections from './LowerSections';
import SiteOverlay from './SiteOverlay';
import HeroSequence from './HeroSequence';
import data from '@/lib/site-data.json';

gsap.registerPlugin(ScrollTrigger);
export default function Experience() {
 const [entered,setEntered]=useState(false);
 const [category,setCategory]=useState('villas');
 const [hovered,setHovered]=useState<string|null>(null);
 const [loading,setLoading]=useState(true);
 const [loadProgress,setLoadProgress]=useState(0);
 const hero=useRef<HTMLElement>(null);
 const enter=(value:string)=>{setCategory(value);const url=new URL(window.location.href);url.searchParams.set('category',value);window.history.replaceState({},'',url);window.dispatchEvent(new CustomEvent('category-change',{detail:value}));if(document.querySelector('.entrance'))gsap.to('.entrance',{autoAlpha:0,duration:.8,ease:'power2.inOut',onComplete:()=>setEntered(true)});else setEntered(true);};
 useEffect(()=>{const progress={value:0};const animation=gsap.to(progress,{value:100,duration:1.25,ease:'power2.out',onUpdate:()=>setLoadProgress(Math.round(progress.value)),onComplete:()=>{setLoading(false);const initial=new URLSearchParams(window.location.search).get('category');if(initial==='villas'||initial==='residences')enter(initial)}});return()=>{animation.kill()}},[]);
 useEffect(()=>{document.body.style.overflow=entered?'':'hidden';return()=>{document.body.style.overflow='';}},[entered]);
 useEffect(()=>{
  const change=(event:Event)=>{const value=(event as CustomEvent).detail;setCategory(value);const url=new URL(window.location.href);url.searchParams.set('category',value);window.history.replaceState({},'',url)};
  window.addEventListener('category-change',change);
  const ctx=gsap.context(()=>{
   const mm=gsap.matchMedia();
   mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)',()=>{
    const tl=gsap.timeline({scrollTrigger:{trigger:hero.current,start:'top top',end:'bottom bottom',scrub:1}});
    tl.to('.hero-brand',{scale:.114,y:-16,opacity:0,duration:.8},0)
      .to('.hero-introduction',{opacity:0,y:-35,duration:.5},0)
      .to('.hero-scroll-label',{opacity:0,duration:.3},0)
      .fromTo('.hero-statement',{opacity:0,y:65},{opacity:1,y:0,duration:.7},.45)
      .to('.hero-shade',{opacity:.5,duration:.7},.45)
      .to('.hero-statement',{opacity:0,y:-70,duration:.6},1.6)
      .fromTo('.hero-meet',{opacity:0,y:55},{opacity:1,y:0,duration:.7},2.05)
      .to('.hero-shade',{opacity:.25,duration:.7},2.05)
      .fromTo('.hero-pin',{opacity:0,scale:.6},{opacity:1,scale:1,duration:.6},2.3);
   });
   gsap.fromTo('.concept-title',{opacity:.2,y:35},{opacity:1,y:0,scrollTrigger:{trigger:'.concept-section',start:'top 70%',end:'center 65%',scrub:1}});
  });
  return()=>{ctx.revert();window.removeEventListener('category-change',change)};
 },[]);
 return <>
 <SiteOverlay entered={entered} category={category}/>
 <main>
 <section className="hero-section" data-header-color="light" ref={hero} id="home">
  <div className="hero-sticky">
   <HeroSequence/>
   <div className="hero-shade"/>
   <img className="hero-brand" src="/logo_big.svg" alt="Horizonte"/>
   <p className="hero-introduction">{data.page.hero.title}</p>
   <div className="hero-statement">Panoramic <em>views</em>, spacious layouts, <em>gated</em> community — spending time <em>at</em> home is simply <em>a</em> pleasure.</div>
   <div className="hero-meet">Meet<br/><em>the</em> horizonte</div>
   <a className={`hero-pin pin-villas ${category==='villas'?'is-active':''}`} href="/selection?category=villas">Villas</a>
   <a className={`hero-pin pin-residences ${category==='residences'?'is-active':''}`} href="/selection?category=residences">Residences</a>
   <a href="#concept" className="hero-scroll-label">Scroll down <span>↓</span></a>
  </div>
 </section>
 <section className="concept-section" id="concept" data-header-color="dark">
  <p className="eyebrow">Concept</p>
  <div className="concept-title">{data.page.concept.title}</div>
 </section>
 <Residences/>
 <LowerSections/>
 </main>
 {!entered&&<div className={`entrance ${loading?'is-loading':''}`}>
  <div className="entrance-sketch"/>
  <div className="entrance-glow"/>
  {loading?<div className="loading-logo"><img src="/logo_small.svg" alt="Horizonte"/><span>Loading… <b>{loadProgress}</b> %</span></div>:<div className="entrance-options">
   {['villas','residences'].map((type)=><button className={`entrance-option ${hovered===type?'is-hovered':''}`} key={type} onMouseEnter={()=>setHovered(type)} onMouseLeave={()=>setHovered(null)} onClick={()=>enter(type)}><span className="entrance-photo"><img src={type==='villas'?'/reference-assets/6_1_be3e04ecb1.webp':'/reference-assets/2_floors_villa_road_sky_a44c8ac337.jpg'} alt=""/></span><span className="entrance-title">{type}</span><span className="entrance-select">Select <span>↗</span></span></button>)}
  </div>}
 </div>}
 </>;
}
