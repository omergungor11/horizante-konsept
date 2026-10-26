"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FRAME_COUNT = 360;
export default function HeroSequence() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const mobile = useRef<HTMLImageElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px)", () => {
      const element = canvas.current, hero = element?.closest(".hero-section");
      if (!element || !hero) return;
      const context = element.getContext("2d");
      if (!context) return;
      let disposed = false, frame = 0, lastDrawn = -1, request = 0, loaded = 0;
      element.dataset.loaded = "0";
      const images: (HTMLImageElement | undefined)[] = new Array(FRAME_COUNT);
      const draw = () => {
        request = 0;
        if (disposed) return;
        let nearest = frame;
        if (!images[nearest]) for (let delta = 1; delta < FRAME_COUNT; delta++) {
          if (images[frame - delta]) { nearest = frame - delta; break; }
          if (images[frame + delta]) { nearest = frame + delta; break; }
        }
        const image = images[nearest];
        if (!image || lastDrawn === nearest) return;
        const scale = Math.max(element.width / image.naturalWidth, element.height / image.naturalHeight);
        const width = image.naturalWidth * scale, height = image.naturalHeight * scale;
        context.drawImage(image, (element.width - width) / 2, (element.height - height) / 2, width, height);
        lastDrawn = nearest;
      };
      const queueDraw = () => { if (!request && !disposed) request = requestAnimationFrame(draw); };
      const resize = () => {
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        element.width = Math.round(element.clientWidth * ratio); element.height = Math.round(element.clientHeight * ratio);
        lastDrawn = -1; queueDraw();
      };
      const observer = new ResizeObserver(resize); observer.observe(element); resize();
      const load = (index: number) => new Promise<void>(resolve => {
        if (disposed) { resolve(); return; }
        const image = new Image();
        image.onload = () => { if (!disposed) { images[index] = image; loaded++; element.dataset.loaded = String(loaded); window.dispatchEvent(new CustomEvent("hero-frame-progress", { detail: loaded })); queueDraw(); } resolve(); };
        image.onerror = () => resolve();
        image.src = `/images/main/sequence/frame-${index.toString().padStart(5, "0")}.webp`;
      });
      const loadFrames = async () => {
        await load(0);
        const priority = Array.from({ length: 72 }, (_, i) => i * 5).filter(i => i !== 0);
        const remainder = Array.from({ length: FRAME_COUNT }, (_, i) => i).filter(i => i % 5 !== 0);
        for (const batch of [priority, remainder]) {
          let next = 0;
          await Promise.all(Array.from({ length: 8 }, async () => { while (!disposed && next < batch.length) await load(batch[next++]); }));
        }
      };
      void loadFrames();
      const trigger = ScrollTrigger.create({ trigger: hero, start: "top top", end: "bottom bottom", onUpdate: self => { frame = Math.round(self.progress * (FRAME_COUNT - 1)); queueDraw(); } });
      return () => { disposed = true; cancelAnimationFrame(request); observer.disconnect(); trigger.kill(); images.length = 0; };
    });
    media.add("(max-width: 1023px)", () => {
      const image = mobile.current, hero = image?.closest(".hero-section");
      if (!image || !hero) return;
      const tween = gsap.to(image, { x: () => -Math.max(0, image.offsetWidth - window.innerWidth), ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom bottom", scrub: true, invalidateOnRefresh: true } });
      const loaded = () => ScrollTrigger.refresh(); image.addEventListener("load", loaded);
      return () => { tween.scrollTrigger?.kill(); tween.kill(); image.removeEventListener("load", loaded); };
    });
    return () => media.revert();
  }, []);
  return <div className="hero-sequence" aria-hidden="true"><canvas ref={canvas} /><img ref={mobile} className="hero-mobile-background" src="/images/genplan/plan.jpg" alt="" /></div>;
}
