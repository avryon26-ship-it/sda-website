'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { altPath, type Locale } from '@/lib/content';

type Item = { href: string; label: string };
export default function HeaderClient({ locale, home, title, sub, items, labels, wa, call }: {
  locale: Locale; home: string; title: string; sub: string; items: Item[];
  labels: { menu: string; close: string; language: string; consult: string; callUs: string };
  wa: string; call: string;
}) {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const pathname = usePathname() || '/';
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  const alt = altPath(locale, pathname);
  return (
    <header className="site-header">
      <div className="wrap bar">
        <Link href={home} className="wordmark" aria-label={title}>{title}<span className="label ml-3 hidden text-moss sm:inline">{sub}</span></Link>
        <nav aria-label="Main" className={`hidden items-center gap-7 ${locale === 'ta' ? 'xl:flex' : 'lg:flex'}`}>
          {items.map(i => <Link key={i.href} href={i.href} className="navlink" aria-current={pathname === i.href ? 'page' : undefined}>{i.label}</Link>)}
        </nav>
        <div className="flex items-center gap-3">
          <Link href={alt} lang={locale === 'en' ? 'ta' : 'en'} hrefLang={locale === 'en' ? 'ta' : 'en'} className="langlink">{labels.language}</Link>
          <a href={wa} className={`btn btn-primary hidden !min-h-[46px] !px-5 text-[0.92rem] ${locale === 'ta' ? '2xl:inline-flex' : 'xl:inline-flex'}`}>{labels.consult}</a>
          <button ref={btn} type="button" className={`menu-btn ${locale === 'ta' ? 'xl:hidden' : 'lg:hidden'}`} aria-expanded={open} aria-controls="menu-overlay" onClick={() => setOpen(true)}>
            <span className="sr-only">{labels.menu}</span>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true"><path d="M3 8h18M3 16h18" /></svg>
          </button>
        </div>
      </div>
      <div id="menu-overlay" className={`overlay ${locale === 'ta' ? 'xl:hidden' : 'lg:hidden'}`} data-open={open} role="dialog" aria-modal="true" aria-label={labels.menu} hidden={false}>
        <div className="wrap flex h-16 items-center justify-between">
          <span className="wordmark">{title}</span>
          <button type="button" className="menu-btn" onClick={() => { setOpen(false); btn.current?.focus(); }} tabIndex={open ? 0 : -1}>
            <span className="sr-only">{labels.close}</span>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
          </button>
        </div>
        <nav aria-label="Mobile" className="wrap pb-10 pt-6">
          {items.map((i, n) => (
            <Link key={i.href} href={i.href} className="big" tabIndex={open ? 0 : -1}><span className="n">0{n + 1}</span>{i.label}</Link>
          ))}
          <div className="mt-10 grid gap-3">
            <a href={wa} className="btn btn-primary justify-center" tabIndex={open ? 0 : -1}>{labels.consult}</a>
            <a href={call} className="btn btn-ghost justify-center" tabIndex={open ? 0 : -1}>{labels.callUs}</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
