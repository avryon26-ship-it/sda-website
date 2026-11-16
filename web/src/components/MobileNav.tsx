'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

type Item = { href: string; label: string };
export default function MobileNav({ items, menuLabel, closeLabel, consult }: { items: Item[]; menuLabel: string; closeLabel: string; consult: { href: string; label: string } }) {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  return (
    <div className="lg:hidden">
      <button ref={btn} type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(o => !o)}
        className="press inline-flex h-12 w-12 items-center justify-center rounded-full border border-forest-800/20 bg-white/50 text-forest-900">
        <span className="sr-only">{open ? closeLabel : menuLabel}</span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
        </svg>
      </button>
      <div id="mobile-menu" data-open={open} className="menu-panel glass absolute left-4 right-4 top-[calc(100%+10px)] p-3">
        <nav aria-label="Mobile">
          <ul className="m-0 list-none p-0">
            {items.map(i => (
              <li key={i.href}>
                <Link href={i.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}
                  className="block rounded-2xl px-4 py-3 text-lg font-medium text-ink no-underline hover:bg-white/60">{i.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <a href={consult.href} tabIndex={open ? 0 : -1} className="btn btn-primary press mt-2 w-full">{consult.label}</a>
      </div>
    </div>
  );
}
