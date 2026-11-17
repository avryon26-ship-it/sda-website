'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/** All scroll behaviour lives here. Text and SVG are always in the HTML; this only enhances.
 *  - reveals + line masks + drawn lines + sticky-story: tiny IntersectionObserver code, every device
 *  - Lenis smooth scroll, GSAP parallax (max 8%) and scrubbed lines: loaded AFTER first paint, only on capable desktops
 *  - reduced motion: nothing is hidden, nothing animates */
export default function Motion() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const undo: Array<() => void> = [];
    const q = <T extends HTMLElement>(sel: string) => Array.from(document.querySelectorAll<T>(sel));

    // soft cross-fade on client-side navigation (never on the first load, so LCP is untouched)
    if (!first.current && !reduce) {
      document.getElementById('main')?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 520, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
    }
    first.current = false;

    // sticky story: active step swaps the pinned image
    for (const root of q('[data-story]')) {
      const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-step]'));
      const frames = Array.from(root.querySelectorAll<HTMLElement>('[data-frame]'));
      const so = new IntersectionObserver(es => {
        for (const e of es) if (e.isIntersecting) {
          const i = steps.indexOf(e.target as HTMLElement);
          frames.forEach((f, n) => f.setAttribute('data-on', String(n === i)));
        }
      }, { rootMargin: '-45% 0px -45% 0px' });
      steps.forEach(s => so.observe(s));
      undo.push(() => so.disconnect());
    }

    if (!reduce) {
      // reveals, line masks and drawn lines: hide only what is below the fold, then spring it in
      const io = new IntersectionObserver(es => {
        for (const e of es) if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          requestAnimationFrame(() => {
            if (el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', 'in');
            if (el.hasAttribute('data-lines')) el.setAttribute('data-lines', 'in');
            if (el.hasAttribute('data-draw') && el.getAttribute('data-draw') === 'pre') el.setAttribute('data-draw', 'in');
          });
          io.unobserve(el);
        }
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
      for (const el of q('[data-reveal],[data-lines],[data-draw]')) {
        if (el.getBoundingClientRect().top < innerHeight * 0.92) { if (el.hasAttribute('data-draw')) el.setAttribute('data-draw', 'in'); continue; }
        if (el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', 'pre');
        if (el.hasAttribute('data-lines')) el.setAttribute('data-lines', 'pre');
        if (el.hasAttribute('data-draw')) el.setAttribute('data-draw', 'pre');
        io.observe(el);
      }
      undo.push(() => io.disconnect());
    }

    // heavy motion: capable desktops only, after first paint
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const capable = !reduce && matchMedia('(pointer: fine)').matches && innerWidth >= 1024 && (navigator.hardwareConcurrency || 4) >= 6 && (mem === undefined || mem >= 4) && !saveData;
    let cancelled = false;
    if (capable) {
      const start = async () => {
        const [{ default: gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger'), import('lenis')]);
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis({ duration: 1.1, easing: t => 1 - Math.pow(1 - t, 3) });
        lenis.on('scroll', ScrollTrigger.update);
        const tick = (t: number) => lenis.raf(t * 1000);
        gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);
        // parallax: images drift at most 8% in total (-4% to +4%)
        for (const el of q('[data-parallax]')) {
          const img = el.querySelector('img'); if (!img) continue;
          gsap.set(img, { scale: 1.09 });
          gsap.fromTo(img, { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
        }
        // lines drawn as you scroll
        for (const el of q('.drawline')) {
          const paths = el.querySelectorAll('path'); if (!paths.length) continue;
          el.setAttribute('data-draw', 'scrub');
          gsap.fromTo(paths, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 45%', scrub: true } });
        }
        undo.push(() => { ScrollTrigger.getAll().forEach(t => t.kill()); gsap.ticker.remove(tick); lenis.destroy(); });
      };
      const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      const id = idle ? idle(() => { void start(); }, { timeout: 2500 }) : window.setTimeout(() => { void start(); }, 1500);
      undo.push(() => { cancelled = true; if (!idle) clearTimeout(id); });
    }
    return () => undo.forEach(f => f());
  }, [pathname]);

  return null;
}
