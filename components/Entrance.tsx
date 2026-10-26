'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import './entrance.css';

gsap.registerPlugin(CustomEase, DrawSVGPlugin, MorphSVGPlugin);
CustomEase.create('horizonte-ease', '.16,1,.3,1');
CustomEase.create('horizonte-sketch', '.83,0,.17,1');

type Masks = { mask1: string[]; mask2: string[] };
type RawContour = number[] & { closed?: boolean };
type Category = 'villas' | 'residences';
const categories: Category[] = ['villas', 'residences'];
const photos = ['/reference-assets/6_1_be3e04ecb1.webp', '/reference-assets/2_floors_villa_road_sky_a44c8ac337.jpg'];

export default function Entrance({ onSelect }: { onSelect: (category: Category) => void }) {
  const root = useRef<HTMLDivElement>(null);
  const canvases = useRef<(HTMLCanvasElement | null)[]>([]);
  const images = useRef<HTMLImageElement[]>([]);
  const paths = useRef<SVGPathElement[]>([]);
  const masks = useRef<Masks[]>([]);
  const morphs = useRef<gsap.core.Tween[]>([]);
  const fades = useRef<gsap.core.Tween[]>([]);
  const selected = useRef(false);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<number[]>([]);
  const [sketch, setSketch] = useState('');

  useEffect(() => {
    let disposed = false;
    let loadProgress = window.innerWidth < 1024 ? 100 : 0;
    const elapsed = { value: 0 };
    const update = () => {
      if (disposed) return;
      const value = Math.min(Math.round(elapsed.value), loadProgress);
      setProgress(value);
      if (value === 100 && masks.current.length === 2 && images.current.every(image => image.complete && image.naturalWidth)) {
        const initial = new URLSearchParams(window.location.search).get('category');
        if (initial === 'villas' || initial === 'residences') finish(initial);
        else setLoading(false);
      }
    };
    const frameProgress = (event: Event) => { loadProgress = Math.min(100, Math.round((event as CustomEvent<number>).detail / 72 * 100)); update(); };
    window.addEventListener('hero-frame-progress', frameProgress);
    void Promise.all([
      fetch('/images/entrance-masks.json').then(response => response.json()).then((data: { SS: Masks; MS: Masks }) => { if (!disposed) masks.current = [data.SS, data.MS]; }),
      ...photos.map((src, index) => new Promise<void>(resolve => { const image = new Image(); images.current[index] = image; image.onload = () => resolve(); image.onerror = () => resolve(); image.src = src; })),
    ]).then(update);
    void fetch('/images/preloader-sketch.svg').then(response => response.text()).then(markup => { if (!disposed) setSketch(markup); });
    const timer = gsap.to(elapsed, { value: 100, duration: 5, ease: 'horizonte-ease', onUpdate: update });
    // The first priority frame can finish before this component mounts.
    const ready = document.querySelector<HTMLCanvasElement>('.hero-sequence canvas')?.dataset.loaded;
    if (ready) loadProgress = Math.min(100, Math.round(Number(ready) / 72 * 100));
    return () => { disposed = true; timer.kill(); window.removeEventListener('hero-frame-progress', frameProgress); morphs.current.forEach(tween => tween?.kill()); fades.current.forEach(tween => tween?.kill()); };
    // The entrance runs once; onSelectRef retains the current parent callback.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!sketch || !root.current) return;
    const svg = root.current.querySelector('.entry-sketch svg');
    const lines = svg?.querySelectorAll('path');
    if (!lines?.length) return;
    const tween = gsap.fromTo(lines, { drawSVG: 0 }, { drawSVG: '100%', duration: 5, ease: 'horizonte-sketch' });
    return () => { tween.kill(); };
  }, [sketch]);

  function draw(index: number, raw: RawContour[]) {
    const canvas = canvases.current[index], image = images.current[index];
    const context = canvas?.getContext('2d');
    if (!canvas || !context || !image?.naturalWidth) return;
    const ratio = canvas.width / 540;
    const width = canvas.width, height = canvas.height;
    const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
    const cropWidth = width / scale, cropHeight = height / scale;
    context.clearRect(0, 0, width, height);
    context.globalCompositeOperation = 'source-over';
    context.drawImage(image, (image.naturalWidth - cropWidth) / 2, (image.naturalHeight - cropHeight) / 2, cropWidth, cropHeight, 0, 0, width, height);
    context.fillStyle = 'rgba(0,0,0,.3)'; context.fillRect(0, 0, width, height);
    context.globalCompositeOperation = 'destination-in';
    context.beginPath();
    for (const contour of raw) {
      context.moveTo(contour[0] * ratio / 2, contour[1] * ratio / 2);
      for (let point = 2; point < contour.length; point += 6) context.bezierCurveTo(contour[point] * ratio / 2, contour[point + 1] * ratio / 2, contour[point + 2] * ratio / 2, contour[point + 3] * ratio / 2, contour[point + 4] * ratio / 2, contour[point + 5] * ratio / 2);
      if (contour.closed) context.closePath();
    }
    context.fillStyle = '#000'; context.fill('evenodd');
  }

  function reveal(index: number, touch = false) {
    const mask = masks.current[index], canvas = canvases.current[index];
    if (!mask || !canvas || (!touch && (window.innerWidth < 1025 || matchMedia('(hover: none)').matches))) return;
    fades.current[index]?.kill();
    const other = 1 - index;
    if (!touch) {
      fades.current[other]?.kill();
      fades.current[other] = gsap.to(canvases.current[other], { opacity: 0, duration: .4, ease: 'horizonte-ease' });
    }
    setActive(touch ? [0, 1] : [index]);
    gsap.set(canvas, { opacity: 1 });
    if (!paths.current[index]) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', mask.mask1[0]); paths.current[index] = path;
    }
    morphs.current[index]?.kill();
    morphs.current[index] = gsap.to(paths.current[index], {
      keyframes: [
        { morphSVG: { shape: mask.mask1[1], precompile: mask.mask1, updateTarget: false, render: (raw: RawContour[]) => draw(index, raw) }, duration: .8 },
        { morphSVG: { shape: mask.mask2[1], precompile: mask.mask2, updateTarget: false, render: (raw: RawContour[]) => draw(index, raw) }, duration: 1 },
      ],
      ease: 'horizonte-ease',
    });
  }

  useEffect(() => {
    if (loading) return;
    const ratio = window.devicePixelRatio || 1;
    canvases.current.forEach(canvas => { if (canvas) { canvas.width = 540 * ratio; canvas.height = 960 * ratio; } });
    if (window.innerWidth > 1024 && !matchMedia('(hover: none)').matches) return;
    const first = window.setTimeout(() => reveal(0, true), 200);
    const second = window.setTimeout(() => reveal(1, true), 400);
    return () => { clearTimeout(first); clearTimeout(second); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  function finish(category: Category) {
    if (selected.current) return;
    selected.current = true;
    gsap.to(root.current, { autoAlpha: 0, duration: .8, ease: 'horizonte-ease', onComplete: () => onSelectRef.current(category) });
  }

  return <div className="entry-preloader" ref={root}>
    <div className="entry-sketch" aria-hidden="true" dangerouslySetInnerHTML={{ __html: sketch }} />
    {loading ? <>
      <div className="entry-logo"><img src="/logo_small_dark.svg" alt="Horizonte" /></div>
      <div className="entry-loading"><p className="h2">Loading...</p><p className="h1 entry-number">{progress}<span>%</span></p></div>
    </> : <div className="entry-selector">
      {categories.map((category, index) => <button key={category} type="button" aria-label={`select ${category}`} className={`entry-option ${active.includes(index) ? 'hover' : ''}`} onPointerEnter={() => reveal(index)} onFocus={() => reveal(index)} onClick={() => finish(category)}>
        <canvas className="entry-canvas" ref={canvas => { canvases.current[index] = canvas; }} aria-hidden="true" />
        <span className="h1 entry-title">{category}</span>
        <span className="entry-button"><span className="entry-button-inner">Select</span></span>
      </button>)}
      <div className={`entry-divider ${active.includes(0) ? 'right' : active.includes(1) ? 'left' : ''}`} />
    </div>}
  </div>;
}
