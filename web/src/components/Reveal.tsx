'use client';
import { useEffect, useRef, type ReactNode, type ElementType } from 'react';

/** Scroll-triggered reveal. Content is visible by default (SEO, no-JS, reduced motion);
 *  only elements still below the fold are hidden on mount, then sprung in when they enter. */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }: { children: ReactNode; delay?: number; as?: ElementType; className?: string }) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.92) return; // already on screen: leave visible, no flash
    el.setAttribute('data-reveal', 'pre');
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { requestAnimationFrame(() => el.setAttribute('data-reveal', 'in')); io.disconnect(); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={className} style={{ ['--d' as string]: `${delay}ms` }}>{children}</Tag>;
}
