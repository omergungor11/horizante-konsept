"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { gsap } from "gsap";
import "./residences.css";

type Category = "villas" | "residences";
const exteriorPhotos = [
  {
    "src": "/reference-assets/Villa_e296e3f0dc_13_47_39_afb9006789.webp",
    "alt": "View from 1 storey villa of Horizonte Village project, new development located in Mijas",
    "type": "villas"
  },
  {
    "src": "/reference-assets/1_floor_villa_night_rose_sky_eeca58ca64_f90dd80d3d.webp",
    "alt": "1 storey villa of Horizonte Village project, new development located in Mijas",
    "type": "villas"
  },
  {
    "src": "/reference-assets/2_floors_villa_road_ba04a652e1_c44fbc0e7a.webp",
    "alt": "2 storey villa of Horizonte Village project, new development located in Mijas",
    "type": "villas"
  },
  {
    "src": "/reference-assets/Back_villa_9ce76d4030_854e522308.webp",
    "alt": "1 storey villa of Horizonte Village project, new development located in Mijas",
    "type": "villas"
  },
  {
    "src": "/reference-assets/1_floor_villa_44f9dab1b8_61b5bf9247.webp",
    "alt": "1 storey villa of Horizonte Village project, new development located in Mijas",
    "type": "villas"
  },
  {
    "src": "/reference-assets/2_floor_villa_14f51c9970_04e6d564f7.webp",
    "alt": "2 storey villa of Horizonte Village project, new development located in Mijas",
    "type": "villas"
  },
  {
    "src": "/reference-assets/Sunrise_residences_01c0436df2_560ad987a3.webp",
    "alt": "Residences of Horizonte Village project, new development located in Mijas",
    "type": "residences"
  },
  {
    "src": "/reference-assets/Penthouse_2234957cd2_4fc5bf010c.webp",
    "alt": "Seaview from residences of Horizonte Village project, new development located in Mijas",
    "type": "residences"
  },
  {
    "src": "/reference-assets/Residences_block_2_37ee8a5803_6b044d0b5d.webp",
    "alt": "Residences of Horizonte Village project, new development located in Mijas",
    "type": "residences"
  },
  {
    "src": "/reference-assets/1_no_m_508a82df02_8b04b915e9.webp",
    "alt": "Terrace of residences of Horizonte Village project, new development located in Mijas",
    "type": "residences"
  },
  {
    "src": "/reference-assets/3_2c32d9084a_16e0e4a7b7.webp",
    "alt": "Terrace of residences of Horizonte Village project, new development located in Mijas",
    "type": "residences"
  },
  {
    "src": "/reference-assets/4_569726825a_d0af65ec20.webp",
    "alt": "Terrace of residences of Horizonte Village project, new development located in Mijas",
    "type": "residences"
  },
  {
    "src": "/reference-assets/6_no_woman_4adabb4cd5_1fec58f525.webp",
    "alt": "Terrace of residences of Horizonte Village project, new development located in Mijas",
    "type": "residences"
  },
  {
    "src": "/reference-assets/7_0b6f504f75_601a930745.webp",
    "alt": "Terrace of residences of Horizonte Village project, new development located in Mijas",
    "type": "residences"
  }
];
const places = [
  {
    "id": 1,
    "title": "Malaga Airport (AGP)",
    "distance": "17",
    "text": "min drive by car",
    "src": "/reference-assets/malaga_airport_800px_opt_808fb16555_c2f41566df.webp",
    "x": 13.958333333333334,
    "y": 46.50349650349651
  },
  {
    "id": 2,
    "title": "Malaga Train Station \u201cMaria Zambrano\u201d",
    "distance": "25",
    "text": "min drive by car",
    "src": "/reference-assets/maria_zambrano_train_platform_min_91f4b1669e_5c2669fee7.webp",
    "x": 12.083333333333334,
    "y": 45.54195804195804
  },
  {
    "id": 7,
    "title": "Playa De Carvajal",
    "distance": "10",
    "text": "min drive by car",
    "src": "/reference-assets/2239019114b65704ffbb9877c7699b62_c6d9cd1aa8_13_41_22_1c1d864bcf.webp",
    "x": 32.013888888888886,
    "y": 42.74475524475525
  },
  {
    "id": 8,
    "title": "Golf Torrequebrada",
    "distance": "15",
    "text": "min drive by car",
    "src": "/reference-assets/img_3931_1309042857_64f7af6688_01a515ee63.webp",
    "x": 29.166666666666668,
    "y": 42.30769230769231
  },
  {
    "id": 11,
    "title": "QuironSalud Fuengirola",
    "distance": "10",
    "text": "min drive by car",
    "src": "/reference-assets/image00007_95cae00a26_00a61116bc.webp",
    "x": 37.84722222222222,
    "y": 45.54195804195804
  },
  {
    "id": 12,
    "title": "Shopping Mall Miramar",
    "distance": "10",
    "text": "min drive by car",
    "src": "/reference-assets/shopping_centre_miramar_8dbc2fe9b3_13_41_22_cc1c3c3548.webp",
    "x": 42.22222222222222,
    "y": 47.81468531468531
  },
  {
    "id": 14,
    "title": "Marbella",
    "distance": "20",
    "text": "min drive by car",
    "src": "/reference-assets/marbella_club_beach_37a76796fc_ae996b9e31.webp",
    "x": 49.30555555555556,
    "y": 50.0
  },
  {
    "id": 6,
    "title": "Restaurant SOLLO (One Michelin Star)",
    "distance": "5",
    "text": "min drive by car",
    "src": "/reference-assets/sollo_FIL_Eminimizer_f3e7cf10c5_13_41_22_297995cc41.webp",
    "x": 33.125,
    "y": 42.91958041958042
  },
  {
    "id": 3,
    "title": "Malaga Fortress \u201cAlcazaba\u201d",
    "distance": "30",
    "text": "min drive by car",
    "src": "/reference-assets/MVC_110390222_Gibralfaro_Malaga_Andalucia_com_d950c33a29_d18c04c920.webp",
    "x": 7.916666666666666,
    "y": 47.63986013986014
  },
  {
    "id": 4,
    "title": "Malaga Museum of Pablo Picasso",
    "distance": "35",
    "text": " min drive by car",
    "src": "/reference-assets/HOME_01_2448_X1440_7f2a58901a_8311246d59_af0ced3ef4.webp",
    "x": 5.555555555555555,
    "y": 46.32867132867133
  },
  {
    "id": 5,
    "title": "Outlet Village \u201cPlaza Mayor\u201d",
    "distance": "15",
    "text": "min drive by car",
    "src": "/reference-assets/plazamayor_ku6_D_U904746647790w_G_1248x770_Diario_Sur_acdb85fb3b_13_41_22_ddb2b943fb.webp",
    "x": 14.444444444444443,
    "y": 45.10489510489511
  },
  {
    "id": 9,
    "title": "Butterfly Park Benalmadena",
    "distance": "5",
    "text": "min drive by car",
    "src": "/reference-assets/2515_1484165511_ca9c276fee_ce7e420ef2.webp",
    "x": 30.416666666666664,
    "y": 45.8041958041958
  },
  {
    "id": 10,
    "title": "Golf Club Villa Padierna",
    "distance": "45",
    "text": "min drive by car",
    "src": "/reference-assets/06a7de67cb8cbe61de13d2bb08397804_1_1_5684c439fd.webp",
    "x": 52.77777777777778,
    "y": 50.349650349650354
  },
  {
    "id": 13,
    "title": "Theme Park \u201cAventura Amazonia\u201d",
    "distance": "20",
    "text": "min drive by car",
    "src": "/reference-assets/5_1_8317017151_3de2475fc1.webp",
    "x": 47.36111111111111,
    "y": 49.21328671328671
  },
  {
    "id": 15,
    "title": "Marbella Club Hotel",
    "distance": "30",
    "text": "min drive by car",
    "src": "/reference-assets/mch_mar_2018347_a1_opt_wide_7ff23d4bb5_5f79b7f80e.webp",
    "x": 50.97222222222222,
    "y": 51.048951048951054
  },
  {
    "id": 16,
    "title": "Puente Romano resort",
    "distance": "30",
    "text": "min drive by car",
    "src": "/reference-assets/sea_grill_swimming_pool_d36d35a987_a8c82fa0f1.webp",
    "x": 51.31944444444444,
    "y": 52.09790209790209
  },
  {
    "id": 17,
    "title": "Puerto Banus",
    "distance": "35",
    "text": "min drive by car",
    "src": "/reference-assets/346109_Puerto_Banus_Marina_252ecd6acf_13_41_22_7ab61acfe6.webp",
    "x": 54.02777777777777,
    "y": 51.48601398601399
  },
  {
    "id": 18,
    "title": "Zoo Selwo Aventura",
    "distance": "45",
    "text": "min drive by car",
    "src": "/reference-assets/selwo_pack_78ce90cfd6_e4bea37c34.webp",
    "x": 52.63888888888889,
    "y": 51.83566433566433
  },
  {
    "id": 19,
    "title": "Estepona",
    "distance": "45",
    "text": "min drive by car",
    "src": "/reference-assets/arc_25058_g_51044a4fbb.webp",
    "x": 62.56944444444444,
    "y": 50.349650349650354
  },
  {
    "id": 20,
    "title": "Sotogrande",
    "distance": "1",
    "text": "hour drive by car",
    "src": "/reference-assets/147433_076c6b839a_13_41_22_fbb6cc1123.webp",
    "x": 75.0,
    "y": 45.19230769230769
  },
  {
    "id": 21,
    "title": "Gibraltar",
    "distance": "70",
    "text": "min drive by car",
    "src": "/reference-assets/aerial_view_of_our_marina_5c64199633_522276e01f.webp",
    "x": 80.34722222222223,
    "y": 41.43356643356643
  },
  {
    "id": 22,
    "title": "Tarifa",
    "distance": "85",
    "text": "min drive by car",
    "src": "/reference-assets/gr_cms_media_featured_images_playas_de_tarifa_f00c1559_6111_4501_a819_edc6d348ae8e_portada_4e622ad4c8_13_41_22_cab5fd63c4.webp",
    "x": 93.61111111111111,
    "y": 41.43356643356643
  }
];
const quote = "\u201cEach residence is strategically positioned to maximize these stunning views, allowing residents to admire the rolling hills, verdant forests, and towering peaks that paint a mesmerizing backdrop to their daily lives.\u201d";
const architectureDescription = "From every vantage point within the property, residents are treated to a visual symphony of nature's beauty that constantly evolves with the changing colors of the sky and seasons. Embrace the harmonious blend of city convenience and mountain tranquility while reveling in the awe-inspiring landscapes that stretch out before you.";
const panoramaUrl = "https://momento360.com/e/u/9cf81dc3f1304e99a159f7f561782bfc?utm_campaign=embed&utm_source=other&heading=-16.4&pitch=3.4&field-of-view=100&size=medium&display-plan=true";

function Arrow({ back = false }: { back?: boolean }) {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true" style={{ transform: back ? "rotate(180deg)" : undefined }}><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1" /></svg>;
}

export default function Residences() {
  const [category, setCategory] = useState<Category>("villas");
  const [slide, setSlide] = useState(0);
  const [activePlace, setActivePlace] = useState<number | null>(null);
  const [panorama, setPanorama] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioTime, setAudioTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioError, setAudioError] = useState(false);
  const photoRef = useRef<HTMLDivElement>(null);
  const placeTrack = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panoramaFrame = useRef<HTMLIFrameElement>(null);
  const panoramaTrigger = useRef<HTMLButtonElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const [panOffset, setPanOffset] = useState(50);
  const panDrag = useRef<{ x: number; offset: number; moved: boolean } | null>(null);
  const suppressPanClick = useRef(false);
  const suppressCardClick = useRef(false);
  const mapDrag = useRef<{ x: number; scroll: number; moved: boolean } | null>(null);
  const photos = exteriorPhotos.filter(photo => photo.type === category);

  useEffect(() => {
    const change = (event: Event) => {
      const raw = (event as CustomEvent).detail;
      const value = typeof raw === "string" ? raw : raw?.category;
      if (value === "villas" || value === "residences") { setCategory(value); setSlide(0); }
    };
    window.addEventListener("category-change", change);
    return () => window.removeEventListener("category-change", change);
  }, []);

  useEffect(() => {
    if (!photoRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animation = gsap.fromTo(photoRef.current, { opacity: 0.35, scale: 1.035 }, { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out" });
    return () => { animation.kill(); };
  }, [slide, category]);

  useEffect(() => {
    if (!panorama) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPanorama(false);
      if (event.key === "Tab" && !event.shiftKey && document.activeElement === closeRef.current) { event.preventDefault(); panoramaFrame.current?.focus(); }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", key);
      panoramaTrigger.current?.focus({ preventScroll: true });
    };
  }, [panorama]);

  const changeSlide = (direction: number) => setSlide(current => (current + direction + photos.length) % photos.length);
  const changeCategory = (value: Category) => {
    setCategory(value); setSlide(0);
    window.dispatchEvent(new CustomEvent("category-change", { detail: value }));
  };
  const selectPlace = (id: number, scroll = false) => {
    setActivePlace(id);
    if (scroll && placeTrack.current) {
      const card = placeTrack.current.querySelector<HTMLElement>(`[data-place="${id}"]`);
      if (card) placeTrack.current.scrollTo({ left: card.offsetLeft - parseFloat(getComputedStyle(placeTrack.current).paddingLeft), behavior: "smooth" });
    }
  };
  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) { try { await audio.play(); setPlaying(true); setAudioError(false); } catch { setAudioError(true); } }
    else { audio.pause(); setPlaying(false); }
  };
  const finishSwipe = (event: PointerEvent<HTMLDivElement>) => {
    const start = swipe.current;
    if (start && Math.abs(event.clientX - start.x) > 45 && Math.abs(event.clientX - start.x) > Math.abs(event.clientY - start.y)) changeSlide(event.clientX < start.x ? 1 : -1);
    swipe.current = null;
  };
  const spokenText = (text: string, preceding = 0) => {
    let position = preceding;
    const spoken = duration ? audioTime / duration * (quote.length + architectureDescription.length) : 0;
    return text.split(" ").map((word, index) => {
      const start = position;
      position += word.length + 1;
      return <span key={index} className={spoken > start ? "res-spoken" : undefined}>{word}{" "}</span>;
    });
  };
  const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

  return <div className="residences-sections">
    <section id="features" className="res-exterior" aria-label="Property gallery" data-header-color="light">
      <div className="res-exterior-photo" tabIndex={0} role="group" aria-label="Gallery. Use left and right arrow keys to change image."
        onKeyDown={event => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); changeSlide(event.key === "ArrowLeft" ? -1 : 1); } }}
        onPointerDown={event => { if (event.button !== 0) return; swipe.current = { x: event.clientX, y: event.clientY }; event.currentTarget.setPointerCapture(event.pointerId); }}
        onPointerUp={finishSwipe} onPointerCancel={() => { swipe.current = null; }}>
        <div className="res-photo-layer" ref={photoRef}>
          <img className="res-gallery-blur" src={photos[slide].src} alt="" draggable={false} />
          <img className="res-gallery-image" src={photos[slide].src} alt={photos[slide].alt} draggable={false} />
        </div>
      </div>
      <div className="res-gallery-lines" aria-hidden="true" />
      <div className="res-gallery-switch">
        <div className="res-category-toggle" aria-label="Property type">
          <button className={category === "villas" ? "is-active" : ""} aria-pressed={category === "villas"} onClick={() => changeCategory("villas")}>Villas</button>
          <button className={category === "residences" ? "is-active" : ""} aria-pressed={category === "residences"} onClick={() => changeCategory("residences")}>Residences</button>
        </div>
        <span className="res-mono">Gallery</span>
      </div>
      <div className="res-gallery-controls">
        <p className="res-gallery-count" aria-live="polite"><span>{String(slide + 1).padStart(2, "0")}</span><span> / {String(photos.length).padStart(2, "0")}</span></p>
        <div className="res-gallery-arrows"><button className="res-circle" onClick={() => changeSlide(-1)} aria-label="Previous gallery image"><Arrow back /></button><button className="res-circle" onClick={() => changeSlide(1)} aria-label="Next gallery image"><Arrow /></button></div>
      </div>
    </section>

    <section id="location" className="res-location" aria-label="Location and nearby places" data-header-color="dark">
      <div className="res-map">
        <img src="/images/main/map.webp" alt="Map of the Costa del Sol surrounding Horizonte Village" loading="lazy" />
        <a className="res-map-home" href="/genplan" aria-label="Explore Horizonte Village masterplan"><img src="/logo_small.svg" alt="Horizonte Village" /></a>
        {places.map(place => <button key={place.id} className={`res-map-pin ${activePlace === place.id ? "is-active" : ""}`} style={{ left: `${place.x}%`, top: `${place.y}%` }} aria-label={place.title} title={place.title} aria-pressed={activePlace === place.id} onClick={() => selectPlace(place.id, true)}><span /></button>)}
      </div>
      <div className="res-location-heading"><div><h2>Prime location <i>between</i> Mijas, Benalmadena, <i>and</i> Fuengirola <i>on the</i> picturesque <i>coastline of</i> Spain</h2><a href="https://maps.google.com/?q=Horizonte+Village+Mijas" target="_blank" rel="noreferrer" className="res-map-link res-mono">See on map <span>↗</span></a></div><p className="res-mono">Mijas, Malaga, Spain</p></div>
      <div className="res-place-track" ref={placeTrack}
        onPointerDown={event => { if (event.pointerType !== "mouse" || event.button !== 0) return; mapDrag.current = { x: event.clientX, scroll: event.currentTarget.scrollLeft, moved: false }; suppressCardClick.current = false; }}
        onPointerMove={event => {
          const drag = mapDrag.current;
          if (!drag) return;
          if (Math.abs(event.clientX - drag.x) > 5) { drag.moved = true; event.currentTarget.setPointerCapture(event.pointerId); }
          if (drag.moved) event.currentTarget.scrollLeft = drag.scroll - (event.clientX - drag.x);
        }}
        onPointerUp={() => { suppressCardClick.current = Boolean(mapDrag.current?.moved); mapDrag.current = null; }}
        onPointerCancel={() => { mapDrag.current = null; }}
        onPointerLeave={() => { if (!mapDrag.current?.moved) mapDrag.current = null; }}
        onClickCapture={event => { if (event.detail !== 0 && suppressCardClick.current) { event.preventDefault(); event.stopPropagation(); suppressCardClick.current = false; } }}>
        {places.map(place => <button key={place.id} data-place={place.id} className={`res-place-card ${activePlace === place.id ? "is-active" : ""}`} onMouseEnter={() => { if (!mapDrag.current) selectPlace(place.id); }} onFocus={() => selectPlace(place.id)} onClick={() => selectPlace(place.id)} aria-pressed={activePlace === place.id}>
          <img src={place.src} alt="" loading="lazy" draggable={false} />
          <span className="res-place-distance"><strong>{place.distance}</strong><span className="res-mono">{place.text}</span></span>
          <span className="res-place-title">{place.title}</span><span className="res-place-icon" aria-hidden="true">↗</span>
        </button>)}
      </div>
    </section>

    <section id="architecture" className="res-architecture" data-header-color="dark">
      <p className="res-mono res-architecture-label">Architecture</p>
      <img className="res-architecture-image" src="/images/main/architecture.webp" alt="Horizonte architecture" loading="lazy" />
      <div className="res-quote-wrap"><h2 className="res-quote">{spokenText(quote)}</h2><button className="res-audio-play" onClick={toggleAudio} aria-label={playing ? "Pause architecture audio" : "Play architecture audio"}><span>{playing ? "Pause" : "Play"}</span><span className="res-audio-play-ring" /></button></div>
      <p className="res-architecture-description">{spokenText(architectureDescription, quote.length)}</p>
      <audio ref={audioRef} src="/reference-assets/Each_residence_is_strateg_2_36e611776e.wav" preload="metadata" onLoadedMetadata={event => setDuration(event.currentTarget.duration)} onTimeUpdate={event => setAudioTime(event.currentTarget.currentTime)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setAudioError(true)} onEnded={() => setPlaying(false)} />
      <div className="res-audio-track"><button className="res-mobile-audio" onClick={toggleAudio} aria-label={playing ? "Pause architecture audio" : "Play architecture audio"}>{playing ? "Ⅱ" : "▷"}</button><span className="res-mono">{formatTime(audioTime)}</span><button className="res-waveform" role="slider" aria-label="Seek architecture audio" aria-valuemin={0} aria-valuemax={Math.round(duration)} aria-valuenow={Math.round(audioTime)} onKeyDown={event => { if (audioRef.current && (event.key === "ArrowLeft" || event.key === "ArrowRight")) { event.preventDefault(); audioRef.current.currentTime = Math.max(0, Math.min(duration, audioTime + (event.key === "ArrowRight" ? 5 : -5))); } }} onClick={event => {
        const rect = event.currentTarget.getBoundingClientRect();
        if (audioRef.current && duration) audioRef.current.currentTime = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)) * duration;
      }}>{Array.from({ length: 90 }, (_, index) => <span key={index} className={duration && index / 90 < audioTime / duration ? "played" : ""} style={{ height: `${(10 + Math.abs(Math.sin(index * 1.4) * Math.cos(index * 0.21)) * 90).toFixed(2)}%` }} />)}</button><span className="res-mono res-duration">{formatTime(duration)}</span></div>
      {audioError && <p className="res-mono" role="status">Audio could not be played. Please try again.</p>}
      <p className="res-author">Huete Arquitectos &amp; Atmosphere Projects</p><p className="res-mono res-author-caption">Author of the project</p>
    </section>

    <section id="panorama" className="res-panorama" data-header-color="light">
      <button ref={panoramaTrigger} className="res-panorama-open" onClick={() => { if (!suppressPanClick.current) setPanorama(true); suppressPanClick.current = false; }} aria-label="Explore panorama"
        onPointerDown={event => { if (event.button !== 0) return; panDrag.current = { x: event.clientX, offset: panOffset, moved: false }; suppressPanClick.current = false; event.currentTarget.setPointerCapture(event.pointerId); }}
        onPointerMove={event => { const drag = panDrag.current; if (!drag) return; const delta = event.clientX - drag.x; if (Math.abs(delta) > 5) drag.moved = true; setPanOffset(Math.max(0, Math.min(100, drag.offset - delta / event.currentTarget.clientWidth * 100))); }}
        onPointerUp={() => { suppressPanClick.current = Boolean(panDrag.current?.moved); panDrag.current = null; }} onPointerCancel={() => { panDrag.current = null; }}>
        <img style={{ objectPosition: `${panOffset}% center`, transformOrigin: `${panOffset}% center` }} draggable={false} src="/images/main/panorama.jpg" alt="Panoramic view of the coast from Horizonte Village" loading="lazy" />
        <span className="res-panorama-shade" /><span className="res-panorama-title">View <i>of the</i> panorama</span><span className="res-panorama-explore res-mono">Explore<br />panorama <span>↗</span></span>
      </button>
    </section>
    {panorama && <div className="res-panorama-modal" role="dialog" aria-modal="true" aria-label="Horizonte panorama viewer"><span className="res-focus-guard" tabIndex={0} onFocus={() => closeRef.current?.focus()} /><iframe ref={panoramaFrame} title="Interactive Horizonte panorama" src={panoramaUrl} allow="xr-spatial-tracking; fullscreen" allowFullScreen /><button ref={closeRef} className="res-circle res-modal-close" onClick={() => setPanorama(false)} aria-label="Close panorama">×</button></div>}
  </div>;
}
