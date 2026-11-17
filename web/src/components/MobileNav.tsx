'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

type Item = { href: string; label: string };
export default function MobileNav({ items, menuLabel, closeLabel, wa, call }: { items: Item[]; menuLabel: string; closeLabel: string; wa: { href: string; label: string }; call: { href: string; label: string } }) {
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
        className="press inline-flex h-12 w-12 items-center justify-center rounded-full text-forest-900">
        <span className="sr-only">{open ? closeLabel : menuLabel}</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3.5 8h17M3.5 16h17" />}
        </svg>
      </button>
      <div id="mobile-menu" data-open={open} className="menu-sheet absolute inset-x-0 top-full border-b border-brass-500/30 bg-ivory shadow-[0_30px_50px_-20px_rgba(15,43,32,0.35)]">
        <nav aria-label="Mobile" className="px-5 pt-2">
          <ul className="m-0 list-none p-0">
            {items.map(i => (
              <li key={i.href} className="border-b border-forest-900/10 last:border-0">
                <Link href={i.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}
                  className="font-display flex items-center justify-between py-4 text-[1.6rem] text-forest-900 no-underline">
                  {i.label}<span aria-hidden="true" className="text-brass-500">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="grid grid-cols-2 gap-3 px-5 pb-6 pt-3">
          <a href={call.href} tabIndex={open ? 0 : -1} className="btn btn-outline press">{call.label}</a>
          <a href={wa.href} tabIndex={open ? 0 : -1} className="btn btn-brass press">WhatsApp</a>
        </div>
      </div>
    </div>
  );
}
