'use client';
import { memo, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Residences from './Residences';
import LowerSections from './LowerSections';
import SiteOverlay from './SiteOverlay';
import HeroSequence from './HeroSequence';
import Entrance from './Entrance';
import WaveButton from './WaveButton';
import data from '@/lib/site-data.json';
import './hero.css';

gsap.registerPlugin(ScrollTrigger, SplitText);

// SplitText owns these descendants after mount. Keep parent state updates from
// replacing the generated character spans through dangerouslySetInnerHTML.
const HeroTitles=memo(function HeroTitles(){
 return <div className="hero-main-titles">{data.page.hero.descriptions.map((html,index)=><div className={`h1 hero-main-title ${index===0?'hero-statement':'hero-meet'}`} key={html} dangerouslySetInnerHTML={{__html:html}}/>)}</div>;
});

export default function Experience() {
 const [entered,setEntered]=useState(false);
 const [category,setCategory]=useState('villas');
 const [showLocation,setShowLocation]=useState(false);
 const [isMobile,setIsMobile]=useState(false);
 useEffect(()=>{const media=matchMedia('(max-width:1023px)');const change=()=>setIsMobile(media.matches);change();media.addEventListener('change',change);return()=>media.removeEventListener('change',change)},[]);
 const hero=useRef<HTMLElement>(null);
 const enter=(value:string)=>{setCategory(value);const url=new URL(window.location.href);url.searchParams.set('category',value);window.history.replaceState({},'',url);window.dispatchEvent(new CustomEvent('category-change',{detail:value}));setEntered(true);};
 useEffect(()=>{document.body.style.overflow=entered?'':'hidden';if(entered)ScrollTrigger.refresh();return()=>{document.body.style.overflow='';}},[entered]);
 useEffect(()=>{
  const change=(event:Event)=>{const value=(event as CustomEvent).detail;setCategory(value);const url=new URL(window.location.href);url.searchParams.set('category',value);window.history.replaceState({},'',url)};
  window.addEventListener('category-change',change);
  let disposed=false;
  const splits:SplitText[]=[];
  const ctx=gsap.context(()=>{});
  void document.fonts.ready.then(()=>{
   if(disposed)return;
   ctx.add(()=>{
    const mm=gsap.matchMedia();
    mm.add('(min-width:1024px) and (prefers-reduced-motion:no-preference)',()=>{
     const desktopSplits:SplitText[]=[];
     const height=()=>window.innerHeight;
     const logo=hero.current?.querySelector<HTMLElement>('.hero-brand');
     if(logo)gsap.to(logo,{scale:152/1360,y:()=>-((logo?.offsetHeight||0)*152/1360)/2-(document.querySelector('header')?.getBoundingClientRect().height||0)*.3,ease:'none',scrollTrigger:{start:0,end:()=>height()*.5,scrub:true,invalidateOnRefresh:true,onLeave:()=>logo?.classList.add('hide'),onEnterBack:()=>logo?.classList.remove('hide')}});
     const intro=new SplitText('.hero-introduction',{type:'lines',tag:'span'});desktopSplits.push(intro);
     gsap.to(intro.lines,{yPercent:20,autoAlpha:0,duration:.8,stagger:-.15,scrollTrigger:{start:0,end:()=>height()*.5,scrub:true}});
     const titles=hero.current?.querySelectorAll<HTMLElement>('.hero-main-title');
     titles?.forEach((title,index)=>{
      const split=new SplitText(title,{type:'words,chars',tag:'span',wordsClass:'hero-word',charsClass:'hero-char'});desktopSplits.push(split);
      gsap.set([...split.chars,...split.words],{display:'inline-block'});
      const entrance=gsap.timeline();
      split.words.forEach(word=>{
       const chars=word.querySelectorAll('.hero-char');
       entrance.add(gsap.fromTo(chars,{opacity:0,scale:1.7},{opacity:1,scale:1,duration:.5,ease:'horizonte-ease',stagger:{each:.015,from:'edges'}}),`previous+=${Math.random()*.5}`);
      });
      ScrollTrigger.create({start:()=>height()*(index===0?.5:1),end:()=>height()*(index===0?.65:1.25),scrub:true,animation:entrance,onEnter:()=>{if(index===1){setShowLocation(true);gsap.to('.hero-pin',{autoAlpha:1,duration:.4,stagger:-.1,pointerEvents:'all'})}},onLeaveBack:()=>{if(index===1){setShowLocation(false);gsap.to('.hero-pin',{autoAlpha:0,duration:.4,stagger:-.1,pointerEvents:'none'})}}});
      if(index===0){
       const exit=gsap.timeline();
       split.words.forEach(word=>exit.add(gsap.fromTo(word.querySelectorAll('.hero-char'),{opacity:1,scale:1},{opacity:0,scale:.7,duration:.05,stagger:{each:.01,from:'edges'},immediateRender:false}),`previous+=${Math.random()*.5}`));
       ScrollTrigger.create({start:()=>height()*.85,end:()=>height(),scrub:true,animation:exit});
      }
     });
     gsap.set('.hero-main-titles',{opacity:1});
     gsap.to('.hero-background',{yPercent:30,ease:'none',scrollTrigger:{trigger:hero.current,start:'bottom bottom',end:'bottom top',scrub:true}});
     return()=>{desktopSplits.forEach(split=>split.revert());logo?.classList.remove('hide');setShowLocation(false);};
    });
    const concept=new SplitText('.concept-title',{type:'lines',tag:'span',autoSplit:true,onSplit:(split)=>gsap.from(split.lines,{yPercent:20,autoAlpha:0,duration:.8,stagger:.05,scrollTrigger:{trigger:'.concept-title',start:'top 90%',once:true}})});splits.push(concept);
   });
  });
  return()=>{disposed=true;ctx.revert();splits.forEach(split=>split.revert());window.removeEventListener('category-change',change)};
 },[]);
 return <>
 <SiteOverlay entered={entered} category={category}/>
 <main inert={!entered}>
 <section className="hero-section" data-header-color="light" ref={hero} id="home">
  <div className="hero-sticky">
   <div className="hero-background"><HeroSequence/><div className="hero-shade"/><div className="hero-gradient-top"/><div className="hero-gradient-bottom"/><img className="hero-brand" src="/logo_big.svg" alt="Horizonte"/></div>
   <HeroTitles/>
   <p className="h2 hero-introduction">{data.page.hero.title}</p>
   <div className="hero-selection-links"><a className={`hero-pin pin-villas ${category==='villas'?'is-active':''}`} href="/selection?category=villas"><WaveButton active={isMobile&&category==='villas'} className="hero-wave">Villas</WaveButton></a><a className={`hero-pin pin-residences ${category==='residences'?'is-active':''}`} href="/selection?category=residences"><WaveButton active={isMobile&&category==='residences'} className="hero-wave">Residences</WaveButton></a></div>
   {showLocation?<p className="hero-location"><span>Location</span>{data.page.hero.location}</p>:<p className="hero-scroll-label">Scroll down</p>}
  </div>
 </section>
 <section className="concept-section" id="concept" data-header-color="dark"><p className="eyebrow">{data.page.concept.smallDescription}</p><div className="h2 concept-title">{data.page.concept.title}</div></section>
 <Residences/>
 <LowerSections/>
 </main>
 {!entered&&<Entrance onSelect={enter}/>}
 </>;
}
