'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { altPath, type Locale } from '@/lib/content';
import { CartButton } from './cart/CartButtons';
import { useCart } from './cart/CartProvider';

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
  const { openConsult } = useCart();
  const talk = locale === 'ta' ? 'மருத்துவரிடம் பேசுங்கள்' : 'Talk to the doctor';
  return (
    <header className="site-header">
      <div className="wrap bar">
        <Link href={home} className="inline-flex items-center" aria-label={`${title}, ${sub}`}>
          <Image src="/images/brand/logo.webp" alt="" width={640} height={296} priority sizes="(min-width: 1024px) 120px, 100px" className="h-[46px] w-auto lg:h-[54px]" />
        </Link>
        <nav aria-label="Main" className={`hidden items-center gap-7 ${locale === 'ta' ? 'xl:flex' : 'lg:flex'}`}>
          {items.map(i => <Link key={i.href} href={i.href} className="navlink" aria-current={pathname === i.href ? 'page' : undefined}>{i.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href={alt} lang={locale === 'en' ? 'ta' : 'en'} hrefLang={locale === 'en' ? 'ta' : 'en'} className="langlink">{labels.language}</Link>
          <button type="button" onClick={() => openConsult()} className={`btn btn-primary hidden !min-h-[46px] !px-5 text-[0.92rem] ${locale === 'ta' ? '2xl:inline-flex' : 'lg:inline-flex'}`}>{talk}</button>
          <CartButton />
          <button ref={btn} type="button" className={`menu-btn ${locale === 'ta' ? 'xl:hidden' : 'lg:hidden'}`} aria-expanded={open} aria-controls="menu-overlay" onClick={() => setOpen(true)}>
            <span className="sr-only">{labels.menu}</span>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true"><path d="M3 8h18M3 16h18" /></svg>
          </button>
        </div>
      </div>
      <div id="menu-overlay" className={`overlay ${locale === 'ta' ? 'xl:hidden' : 'lg:hidden'}`} data-open={open} role="dialog" aria-modal="true" aria-label={labels.menu} hidden={false}>
        <div className="wrap flex h-16 items-center justify-between">
          <Image src="/images/brand/logo.webp" alt={title} width={640} height={296} sizes="100px" className="h-[44px] w-auto rounded-[3px] bg-paper p-1" />
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
            <button type="button" onClick={() => { setOpen(false); openConsult(); }} className="btn btn-primary justify-center" tabIndex={open ? 0 : -1}>{talk}</button>
            <a href={wa} className="btn btn-ghost justify-center" tabIndex={open ? 0 : -1}>WhatsApp</a>
            <a href={call} className="btn btn-ghost justify-center" tabIndex={open ? 0 : -1}>{labels.callUs}</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
