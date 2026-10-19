'use client';
import { useEffect, useRef, useState } from 'react';
import data from '@/lib/site-data.json';
import { usePathname } from 'next/navigation';
const asset=(url:string)=>'/reference-assets/'+url.split('/').pop();
export default function SiteOverlay({entered,category}:{entered:boolean;category:string}){
 const pathname=usePathname();const isHome=pathname==='/',isDetail=pathname.startsWith('/selection/');
 const [menu,setMenu]=useState(false),[wizard,setWizard]=useState(false),[cookie,setCookie]=useState(false),[dark,setDark]=useState(false),[smallLogo,setSmallLogo]=useState(false);
 const [headerHidden,setHeaderHidden]=useState(false);const lastScroll=useRef(0);
 const [step,setStep]=useState(0),[type,setType]=useState('Apartment'),[layout,setLayout]=useState(''),[budget,setBudget]=useState(''),[sent,setSent]=useState(false);
 const dialog=useRef<HTMLDivElement>(null);
 const openWizard=()=>{setWizard(true);setMenu(false);setStep(0);setSent(false)};
 useEffect(()=>{
  const onOpen=()=>openWizard();window.addEventListener('open-selector',onOpen);
  const onScroll=()=>{const y=window.scrollY;setHeaderHidden(y>window.innerHeight*.7&&y>lastScroll.current+2);lastScroll.current=y;setSmallLogo(y>window.innerHeight*.5);const section=Array.from(document.querySelectorAll<HTMLElement>('[data-header-color]')).find(el=>{const r=el.getBoundingClientRect();return r.top<=70&&r.bottom>70});setDark(section?section.dataset.headerColor==='dark':isDetail)};
  onScroll();window.addEventListener('scroll',onScroll,{passive:true});
  return()=>{window.removeEventListener('open-selector',onOpen);window.removeEventListener('scroll',onScroll)};
 },[isDetail]);
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
 },[menu,wizard,entered]);
 useEffect(()=>{if(wizard){const frame=requestAnimationFrame(()=>dialog.current?.focus());return()=>cancelAnimationFrame(frame)}},[wizard,step,sent]);
 const acceptCookies=(value:string)=>{localStorage.setItem('horizonte-cookie-choice',value);setCookie(false)};
 const cards=step===0?data.common.popup.step1.categories:step===1?(data.common.popup.step2.types.find(v=>v.typeName===type)?.list||[]):(data.common.popup.step3.budgets.find(v=>v.typeName===type)?.list||[]);
 const choose=(title:string)=>{if(step===0)setType(title);else if(step===1)setLayout(title);else setBudget(title);setStep(step+1)};
 return <>
 <header className={`site-header ${dark||menu?'ink':''} ${menu?'menu-visible':''} ${entered?'is-visible':''} ${headerHidden&&!menu&&!wizard?'is-hidden':''}`}>
  <div className="header-left"><button className="menu-toggle" aria-label={menu?'Close menu':'Open menu'} aria-expanded={menu} onClick={()=>setMenu(!menu)}><span className={`hamburger ${menu?'active':''}`}><i/><i/></span><span>{menu?'Close':'Menu'}</span></button><a className="header-object" href={`/selection?category=${category}`}>Select an object</a><a className="header-plan" href="/genplan">General Plan</a></div>
  <a href={isHome?"#home":"/"} aria-label="Horizonte home" className={`header-logo ${smallLogo||menu||!isHome?'show':''}`} onClick={()=>setMenu(false)}><img src="/logo_big.svg" alt="Horizonte"/></a>
  <div className="header-right"><a href="tel:+34951870700">+34 (951) 870-700</a><span className="header-divider"/><a href="https://horizonte-village.com/es" lang="es" aria-label="Español">es</a><span className="header-divider"/><a href="https://horizonte-village.com/login">Agent Portal</a></div>
  <a className="mobile-plans" href={`/selection?category=${category}`}>Floor plans</a>
 </header>
 {entered&&!menu&&!wizard&&<>{isHome&&<div className={`floating-category ${dark?'is-dark':''}`} aria-label="Property category">{['villas','residences'].map(value=><button key={value} aria-pressed={category===value} onClick={()=>window.dispatchEvent(new CustomEvent('category-change',{detail:value}))}>{value}</button>)}</div>}<a className="floating-whatsapp" href="https://wa.me/+34951870700" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><img src="/reference-assets/whatsapp_a6d988a847.svg" alt=""/></a></>}
 {menu&&<div className="site-menu" id="site-menu"><div className="menu-main"><nav>{[['Concept','#concept'],['Villas / Residences','#features'],['Location','#location'],['Architecture','#architecture'],['Interiors','#interior'],['Lifestyle','#amenities'],['Journal','#journal'],['Contact','#contact']].map(([label,href])=><a key={href} href={isHome?href:`/${href}`} onClick={()=>setMenu(false)}>{label}<span>↗</span></a>)}</nav><div className="menu-picture"><img src="/reference-assets/Gen_plan_1_c41a75f279_8f2ed8588a.webp" alt="Horizonte Village"/><div><span className="eyebrow">Your new perspective</span><h2>It’s easier <small>to</small> choose<br/>when you’re inside</h2><a className="pill-button" href="/genplan">Explore the general plan ↗</a></div></div></div><div className="menu-contact"><div><span>Get in touch</span><a href="tel:+34951870700">+34 (951) 870-700</a><a href="mailto:info@horizonte-village.com">info@horizonte-village.com</a></div><div><span>Find us</span><a href="https://maps.google.com/?q=Mijas+Malaga+Spain" target="_blank" rel="noreferrer">Mijas, Malaga, Spain ↗</a></div><div><span>Follow us</span><a href="https://www.instagram.com/horizonte.village" target="_blank" rel="noreferrer">Instagram ↗</a></div></div></div>}
 {cookie&&entered&&!wizard&&<aside className="cookie-banner" aria-label="Cookie preferences"><p>This website uses cookies to ensure you get the best experience on website</p><div><a href="/privacy-policy">Read more</a><button className="solid-button" onClick={()=>acceptCookies('accepted')}>Accept</button></div></aside>}
 {wizard&&<div className="wizard-backdrop" onClick={e=>{if(e.target===e.currentTarget)setWizard(false)}}><div className="wizard" ref={dialog} role="dialog" aria-modal="true" aria-labelledby="wizard-title" tabIndex={-1}><div className="wizard-top"><span>Find your home</span><span>{sent?'Complete':`${Math.min(step+1,4)} / 4`}</span><button onClick={()=>setWizard(false)} aria-label="Close property selector">×</button></div>
 {sent?<div className="wizard-thanks"><h2 id="wizard-title">Your preferences<br/><small>are</small> ready</h2><p>Your selection has been saved in this browser. Contact our team to discuss your future home.</p><a className="solid-button" href={`mailto:info@horizonte-village.com?subject=My%20Horizonte%20home&body=${encodeURIComponent(`${type}, ${layout}, ${budget}`)}`}>Email our team ↗</a><button onClick={()=>setWizard(false)}>Back to Horizonte</button></div>:step<3?<div className="wizard-body"><h2 id="wizard-title">{step===0?<>Choose your perfect<br/>property that awaits you.</>:step===1?<>Select your dream<br/>home layout</>:<>Find your perfect<br/>price range</>}</h2><p>Choose the specific type<br/>of villa or apartment.</p><div className={`wizard-cards step-${step}`}>{cards.map((card,i)=><button key={card.title} onClick={()=>choose(card.title)}>{step<2?<div className="wizard-photo"><img src={asset(card.photo.original)} alt={card.title}/></div>:<div className="wizard-price"><span>{card.title}</span><div style={{height:`${5+i*4}rem`}}/></div>}<span>{card.title}<b>↗</b></span></button>)}</div>{step>0&&<button className="wizard-back" onClick={()=>setStep(step-1)}>← Back</button>}</div>:<div className="wizard-form"><div><h2 id="wizard-title">Leave your<br/>contact details</h2><p>{type} · {layout}<br/>{budget}</p><form onSubmit={e=>{e.preventDefault();const form=new FormData(e.currentTarget);localStorage.setItem('horizonte-home-request',JSON.stringify({type,layout,budget,name:form.get('name'),email:form.get('email')}));setSent(true)}}><label>Your name<input name="name" required autoComplete="name"/></label><label>Email address<input name="email" type="email" required autoComplete="email"/></label><label>Phone number<input name="phone" type="tel" autoComplete="tel"/></label><label className="wizard-consent"><input type="checkbox" required/>I agree to the <a href="/privacy-policy">privacy policy</a>.</label><button className="solid-button" type="submit">Save my request ↗</button><small>Your request is saved locally. You can then email it to the team.</small></form><button className="wizard-back" onClick={()=>setStep(2)}>← Back</button></div><img src="/reference-assets/tablet_eb6616c78a_250f341f39.webp" alt="Horizonte Village residences"/></div>}
 </div></div>}
 </>;
}
