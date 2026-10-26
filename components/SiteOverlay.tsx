'use client';
import { useEffect, useRef, useState } from 'react';
import data from '@/lib/site-data.json';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import './overlay.css';
import WaveButton from './WaveButton';
gsap.registerPlugin(CustomEase);
CustomEase.create('horizonte-menu', '.16,1,.3,1');
const asset=(url:string)=>'/reference-assets/'+url.split('/').pop();
export default function SiteOverlay({entered,category}:{entered:boolean;category:string}){
 const pathname=usePathname();const isHome=pathname==='/',isDetail=pathname.startsWith('/selection/');
 const [menu,setMenu]=useState(false),[wizard,setWizard]=useState(false),[cookie,setCookie]=useState(false),[dark,setDark]=useState(false),[smallLogo,setSmallLogo]=useState(false);
 const [menuMounted,setMenuMounted]=useState(false);
 const menuPanel=useRef<HTMLDivElement>(null);
 const [headerSolid,setHeaderSolid]=useState(false);
 const [headerHidden,setHeaderHidden]=useState(false);const lastScroll=useRef(0);
 const [step,setStep]=useState(0),[type,setType]=useState('Apartment'),[layout,setLayout]=useState(''),[budget,setBudget]=useState(''),[sent,setSent]=useState(false);
 const dialog=useRef<HTMLDivElement>(null);
 const openWizard=()=>{setWizard(true);setMenu(false);setStep(0);setSent(false)};
 useEffect(()=>{
  const onOpen=()=>openWizard();window.addEventListener('open-selector',onOpen);
  const onScroll=()=>{if(menu)return;const y=window.scrollY,threshold=isHome?window.innerHeight*.6:100;if(y>lastScroll.current&&y>threshold)setHeaderHidden(true);else if(y<lastScroll.current||y<=0)setHeaderHidden(false);setHeaderSolid(y>threshold);lastScroll.current=y;setSmallLogo(y>window.innerHeight*.5);const section=Array.from(document.querySelectorAll<HTMLElement>('[data-header-color]')).find(el=>{const r=el.getBoundingClientRect();return r.top<=70&&r.bottom>70});setDark(section?section.dataset.headerColor==='dark':isDetail)};
  onScroll();window.addEventListener('scroll',onScroll,{passive:true});
  return()=>{window.removeEventListener('open-selector',onOpen);window.removeEventListener('scroll',onScroll)};
 },[isDetail,isHome,menu]);
 useEffect(()=>{if(entered&&!localStorage.getItem('horizonte-cookie-choice')){const t=setTimeout(()=>setCookie(true),2000);return()=>clearTimeout(t)}},[entered]);
 useEffect(()=>{if(!entered)return;const t=setTimeout(()=>{if(!sessionStorage.getItem('horizonte-wizard-seen')){openWizard();sessionStorage.setItem('horizonte-wizard-seen','1')}},45000);return()=>clearTimeout(t)},[entered]);
 useEffect(()=>{
  if(!entered||(!menu&&!wizard))return;
  const previousFocus=document.activeElement as HTMLElement|null;
  const previousOverflow=document.body.style.overflow;
  document.body.style.overflow='hidden';
  const frame=requestAnimationFrame(()=>{if(wizard)dialog.current?.focus();else document.querySelector<HTMLElement>('#site-menu a')?.focus()});
  const escape=(e:KeyboardEvent)=>{
   if(e.key==='Escape'){setWizard(false);setMenu(false)}
   if(e.key==='Tab'){
    const scope=wizard?dialog.current:document.getElementById('site-menu');
    const nodes=Array.from(scope?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,select,textarea,[tabindex="0"]')||[]);
    if(menu){const close=document.querySelector<HTMLElement>('.menu-toggle');if(close)nodes.unshift(close)}
    if(!nodes.length)return;
    const first=nodes[0],last=nodes[nodes.length-1];
    if(!nodes.includes(document.activeElement as HTMLElement)||(e.shiftKey&&document.activeElement===first)){e.preventDefault();(e.shiftKey?last:first).focus()}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
   }
  };
  document.addEventListener('keydown',escape);
  return()=>{cancelAnimationFrame(frame);document.removeEventListener('keydown',escape);document.body.style.overflow=previousOverflow;previousFocus?.focus({preventScroll:true})};
 },[menu,wizard,entered,menuMounted]);
 useEffect(()=>{if(wizard){const frame=requestAnimationFrame(()=>dialog.current?.focus());return()=>cancelAnimationFrame(frame)}},[wizard,step,sent]);
 useEffect(()=>{
  if(menu&&!menuMounted){setMenuMounted(true);return}
  if(!menuPanel.current)return;
  const panel=menuPanel.current;
  const wrapper=panel.querySelector('.hv-menu-wrapper');
  const footer=panel.querySelector('.hv-menu-footer');
  const shade=panel.querySelector('.hv-menu-shade');
  const duration=window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:1.2;
  if(!panel.dataset.initialized){gsap.set([wrapper,footer],{y:0,yPercent:-100});panel.dataset.initialized='true'}
  const timeline=gsap.timeline({onComplete:()=>{if(!menu)setMenuMounted(false)}})
    .to(wrapper,{yPercent:menu?0:-100,duration,ease:'horizonte-menu'},0)
    .to(footer,{yPercent:menu?0:-100,duration,ease:'horizonte-menu'},0)
    .to(shade,{opacity:menu?1:0,duration,ease:'horizonte-menu'},0);
  return()=>{timeline.kill()};
 },[menu,menuMounted]);
 const acceptCookies=(value:string)=>{localStorage.setItem('horizonte-cookie-choice',value);setCookie(false)};
 const cards=step===0?data.common.popup.step1.categories:step===1?(data.common.popup.step2.types.find(v=>v.typeName===type)?.list||[]):(data.common.popup.step3.budgets.find(v=>v.typeName===type)?.list||[]);
 const choose=(title:string)=>{if(step===0)setType(title);else if(step===1)setLayout(title);else setBudget(title);setStep(step+1)};
 return <>
 <header inert={!entered} className={`site-header ${headerSolid||isDetail||menu?'ink':''} ${menu?'menu-visible':''} ${entered?'is-visible':''} ${headerHidden&&!menu&&!wizard?'is-hidden':''}`}>
  <div className="header-left"><button className="menu-toggle" aria-label={menu?'Close menu':'Open menu'} aria-expanded={menu} onMouseEnter={event=>{if(menu||window.innerWidth<1025)return;event.currentTarget.querySelectorAll('.hamburger i').forEach((line,index)=>{gsap.set(line,{transition:'none'});gsap.timeline().to(line,{ease:'horizonte-menu',delay:index*.1,keyframes:[{xPercent:150,duration:.6},{visibility:'hidden',xPercent:-100-50*index,duration:0},{visibility:'visible',xPercent:-30*index,x:0,duration:.05,clearProps:'all'}]})})}} onClick={()=>setMenu(!menu)}><span className={`hamburger ${menu?'active':''}`}><i/><i/></span><span>{menu?'Close':'Menu'}</span></button><a className="header-object" href={`/selection?category=${category}`}>Select an object</a><a className="header-plan" href="/genplan">General Plan</a></div>
  <a href={isHome?"#home":"/"} aria-label="Horizonte home" className={`header-logo ${smallLogo||menu||!isHome?'show':''}`} onClick={()=>setMenu(false)}><img src="/logo_big.svg" alt="Horizonte"/></a>
  <div className="header-right"><a href="tel:+34951870700">+34 (951) 870-700</a><a href="https://horizonte-village.com/es" lang="es" aria-label="Español">es</a><span className="header-divider"/><a href="https://horizonte-village.com/login">Agent Portal</a></div>
  <a className="mobile-plans" href={`/selection?category=${category}`}>Floor plans</a>
 </header>
 {entered&&!menu&&!wizard&&<>{isHome&&<div className={`floating-category ${dark?'is-dark':''}`} aria-label="Property category">{['villas','residences'].map(value=><button key={value} aria-pressed={category===value} onClick={()=>window.dispatchEvent(new CustomEvent('category-change',{detail:value}))}>{value}</button>)}</div>}<a className="floating-whatsapp" href="https://wa.me/+34951870700" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><WaveButton size="small" theme={dark?'dark':'light'} className="no-hover"><img src="/reference-assets/whatsapp_a6d988a847.svg" alt=""/></WaveButton></a></>}
 {menuMounted&&<div className="hv-menu" id="site-menu" ref={menuPanel} role="dialog" aria-modal="true" aria-label="Main navigation">
  <div className="hv-menu-wrapper">
   <div className="hv-menu-body"><div className="hv-menu-header-gap"/>
    <div className="hv-menu-mobile-header"><div><a href="https://horizonte-village.com/es" lang="es">es</a><span/><a href="https://horizonte-village.com/login">Agent portal</a></div><a href="/genplan">General plan</a></div>
    <div className="hv-menu-main">
     <nav className="hv-menu-nav" aria-label="Main pages">
      <div><a href="/" className="hv-menu-link" onClick={()=>setMenu(false)}><span>Home</span><span aria-hidden="true">Home</span></a></div>
      <div className="hv-menu-property-row"><a href="/selection?category=villas" className="hv-menu-link" onClick={()=>setMenu(false)}><span>Villas</span><span aria-hidden="true">Villas</span></a><span className="hv-menu-slash">/</span><a href="/selection?category=residences" className="hv-menu-link" onClick={()=>setMenu(false)}><span>Residences</span><span aria-hidden="true">Residences</span></a></div>
      <div className="hv-menu-about-row"><a href="/#architecture" className="hv-menu-link" onClick={()=>setMenu(false)}><span>About</span><span aria-hidden="true">About</span></a><div className="hv-menu-subnav">{[['Investment','/#concept'],['Team','/#architecture'],['Partners','/#architecture']].map(([label,href])=><a href={href} key={label} onClick={()=>setMenu(false)}>{label}</a>)}</div></div>
      <div><a href="/#contact" className="hv-menu-link" onClick={()=>setMenu(false)}><span>Contact</span><span aria-hidden="true">Contact</span></a></div>
     </nav>
     <a className="hv-menu-picture" href="/genplan"><img src="/reference-assets/Gen_plan_1_c41a75f279_8f2ed8588a.webp" alt="Clubhouse of Horizonte Village in Mijas"/><div className="hv-menu-gradient"/><div className="hv-menu-picture-content"><div><p className="hv-menu-caption">VISUAL Selection</p><h2><i>It’s</i> easier <i>to</i> choose <i>when</i> you’<i>re</i> inside</h2></div><span className="hv-menu-genplan">Select on genplan</span></div></a>
    </div>
   </div>
   <div className="hv-menu-footer"><div className="hv-menu-contacts"><div><p>Phone</p><a href="tel:+34951870700">+34 (951) 870-700</a></div><div><p>Email</p><a href="mailto:info@horizonte-village.com">info@horizonte-village.com</a></div></div><div className="hv-menu-socials"><p>Socials</p><div>{data.common.contactData.socials.map((social,index)=><span key={social.name}>{index>0&&<b>/</b>}<a href={social.link} target="_blank" rel="noreferrer">{social.name}</a></span>)}</div></div></div>
  </div>
  <button className="hv-menu-shade" aria-label="Close menu" onClick={()=>setMenu(false)} tabIndex={-1}/>
 </div>}
 {cookie&&entered&&!wizard&&<aside className="cookie-banner" aria-label="Cookie preferences"><p>This website uses cookies to ensure you get the best experience on website</p><div><a href="/privacy-policy">Read more</a><button className="solid-button" onClick={()=>acceptCookies('accepted')}>Accept</button></div></aside>}
 {wizard&&<div className="wizard-backdrop" onClick={e=>{if(e.target===e.currentTarget)setWizard(false)}}><div className="wizard" ref={dialog} role="dialog" aria-modal="true" aria-labelledby="wizard-title" tabIndex={-1}><div className="wizard-top"><span>Find your home</span><span>{sent?'Complete':`${Math.min(step+1,4)} / 4`}</span><button onClick={()=>setWizard(false)} aria-label="Close property selector">×</button></div>
 {sent?<div className="wizard-thanks"><h2 id="wizard-title">Your preferences<br/><small>are</small> ready</h2><p>Your selection has been saved in this browser. Contact our team to discuss your future home.</p><a className="solid-button" href={`mailto:info@horizonte-village.com?subject=My%20Horizonte%20home&body=${encodeURIComponent(`${type}, ${layout}, ${budget}`)}`}>Email our team ↗</a><button onClick={()=>setWizard(false)}>Back to Horizonte</button></div>:step<3?<div className="wizard-body"><h2 id="wizard-title">{step===0?<>Choose your perfect<br/>property that awaits you.</>:step===1?<>Select your dream<br/>home layout</>:<>Find your perfect<br/>price range</>}</h2><p>Choose the specific type<br/>of villa or apartment.</p><div className={`wizard-cards step-${step}`}>{cards.map((card,i)=><button key={card.title} onClick={()=>choose(card.title)}>{step<2?<div className="wizard-photo"><img src={asset(card.photo.original)} alt={card.title}/></div>:<div className="wizard-price"><span>{card.title}</span><div style={{height:`${5+i*4}rem`}}/></div>}<span>{card.title}<b>↗</b></span></button>)}</div>{step>0&&<button className="wizard-back" onClick={()=>setStep(step-1)}>← Back</button>}</div>:<div className="wizard-form"><div><h2 id="wizard-title">Leave your<br/>contact details</h2><p>{type} · {layout}<br/>{budget}</p><form onSubmit={e=>{e.preventDefault();const form=new FormData(e.currentTarget);localStorage.setItem('horizonte-home-request',JSON.stringify({type,layout,budget,name:form.get('name'),email:form.get('email')}));setSent(true)}}><label>Your name<input name="name" required autoComplete="name"/></label><label>Email address<input name="email" type="email" required autoComplete="email"/></label><label>Phone number<input name="phone" type="tel" autoComplete="tel"/></label><label className="wizard-consent"><input type="checkbox" required/>I agree to the <a href="/privacy-policy">privacy policy</a>.</label><button className="solid-button" type="submit">Save my request ↗</button><small>Your request is saved locally. You can then email it to the team.</small></form><button className="wizard-back" onClick={()=>setStep(2)}>← Back</button></div><img src="/reference-assets/tablet_eb6616c78a_250f341f39.webp" alt="Horizonte Village residences"/></div>}
 </div></div>}
 </>;
}
