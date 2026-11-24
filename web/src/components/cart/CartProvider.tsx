'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/content';
import { ui } from '@/lib/ui';
import QuickConsult from './QuickConsult';

export type CartProduct = { slug: string; name: string; category: string; image: string };
export type Line = { slug: string; qty: number };
type Ctx = {
  lines: Line[]; count: number; products: Map<string, CartProduct>; locale: Locale; ready: boolean;
  add: (slug: string, qty?: number) => void; setQty: (slug: string, qty: number) => void; remove: (slug: string) => void; clear: () => void;
  has: (slug: string) => boolean; open: () => void; close: () => void; isOpen: boolean;
  openConsult: (concern?: string) => void;
};
const CartCtx = createContext<Ctx | null>(null);
const KEY = 'sda-cart-v1';

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error('useCart outside CartProvider');
  return c;
}

/** The consultation cart. Lives in this browser only (localStorage) until the patient sends it to the doctor. */
export default function CartProvider({ locale, catalogue, consultHref, children }: { locale: Locale; catalogue: CartProduct[]; consultHref: string; children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [ready, setReady] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [toast, setToast] = useState<{ slug: string; n: number } | null>(null);
  const [consult, setConsult] = useState<{ open: boolean; concern?: string }>({ open: false });
  const closeConsult = useCallback(() => setConsult(c => ({ ...c, open: false })), []);
  const products = useMemo(() => new Map(catalogue.map(p => [p.slug, p])), [catalogue]);
  const pathname = usePathname();

  useEffect(() => {
    try { const v = JSON.parse(localStorage.getItem(KEY) || '[]'); if (Array.isArray(v)) setLines(v.filter((l: Line) => l && typeof l.slug === 'string')); } catch { /* private mode */ }
    setReady(true);
    const onStorage = (e: StorageEvent) => { if (e.key === KEY) try { setLines(JSON.parse(e.newValue || '[]')); } catch { /* ignore */ } };
    addEventListener('storage', onStorage);
    return () => removeEventListener('storage', onStorage);
  }, []);
  useEffect(() => { if (ready) try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch { /* ignore */ } }, [lines, ready]);
  useEffect(() => { setOpen(false); setConsult(c => ({ ...c, open: false })); }, [pathname]);

  const toastTimer = useRef<number>(undefined);
  const add = useCallback((slug: string, qty = 1) => {
    setLines(ls => {
      const f = ls.find(l => l.slug === slug);
      return f ? ls.map(l => (l.slug === slug ? { ...l, qty: Math.min(10, l.qty + qty) } : l)) : [...ls, { slug, qty: Math.min(10, qty) }];
    });
    setToast(t => ({ slug, n: (t?.n ?? 0) + 1 }));
    clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3200);
  }, []);
  const setQty = useCallback((slug: string, qty: number) => setLines(ls => (qty <= 0 ? ls.filter(l => l.slug !== slug) : ls.map(l => (l.slug === slug ? { ...l, qty: Math.min(10, qty) } : l)))), []);
  const remove = useCallback((slug: string) => setLines(ls => ls.filter(l => l.slug !== slug)), []);
  const clear = useCallback(() => setLines([]), []);
  const visible = lines.filter(l => products.has(l.slug));
  const count = visible.reduce((s, l) => s + l.qty, 0);

  const value: Ctx = {
    lines: visible, count, products, locale, ready, add, setQty, remove, clear,
    has: s => visible.some(l => l.slug === s), open: () => setOpen(true), close: () => setOpen(false), isOpen,
    openConsult: (concern?: string) => setConsult({ open: true, concern }),
  };
  return (
    <CartCtx.Provider value={value}>
      {children}
      <CartDrawer consultHref={consultHref} />
      <QuickConsult open={consult.open} concern={consult.concern} locale={locale} onClose={closeConsult} />
      {toast && !isOpen && <Toast key={toast.n} slug={toast.slug} onView={() => { setToast(null); setOpen(true); }} />}
    </CartCtx.Provider>
  );
}

function Toast({ slug, onView }: { slug: string; onView: () => void }) {
  const { products, locale, count } = useCart();
  const t = ui(locale);
  const p = products.get(slug);
  if (!p) return null;
  return (
    <div className="cart-toast" role="status">
      <div className="relative h-12 w-12 flex-none overflow-hidden rounded-[3px] bg-paper2"><Image src={`/${p.image}`} alt="" fill sizes="48px" className="object-cover" /></div>
      <div className="min-w-0 flex-1">
        <p className="label text-sage">{t.added} · {t.items(count)}</p>
        <p className="truncate text-[0.95rem]">{p.name}</p>
      </div>
      <button type="button" className="btn btn-primary !min-h-[42px] !px-4 text-[0.9rem]" onClick={onView}>{t.cart}</button>
    </div>
  );
}

export function QtyStepper({ value, onChange, label, small }: { value: number; onChange: (n: number) => void; label: string; small?: boolean }) {
  return (
    <div className={`qty ${small ? 'qty-sm' : ''}`} role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(value - 1)} aria-label="−1">−</button>
      <output aria-live="polite">{value}</output>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= 10} aria-label="+1">+</button>
    </div>
  );
}

function CartDrawer({ consultHref }: { consultHref: string }) {
  const { isOpen, close, lines, products, setQty, remove, count, locale } = useCart();
  const t = ui(locale);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); };
  }, [isOpen, close]);
  const shop = locale === 'ta' ? '/ta/products' : '/products';
  return (
    <div className="drawer" data-open={isOpen} aria-hidden={!isOpen}>
      <button type="button" className="drawer-scrim" tabIndex={-1} aria-label="Close" onClick={close} />
      <div ref={panel} className="drawer-panel" role="dialog" aria-modal="true" aria-label={t.cartTitle} tabIndex={-1}>
        <div className="flex items-center justify-between gap-4 border-b border-[var(--rule)] px-6 py-5">
          <div>
            <p className="label text-moss">{t.items(count)}</p>
            <h2 className="mt-1" style={{ fontSize: 'var(--fs-h3)' }}>{t.cartTitle}</h2>
          </div>
          <button type="button" className="menu-btn" onClick={close} tabIndex={isOpen ? 0 : -1}>
            <span className="sr-only">Close</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
          </button>
        </div>
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center gap-5 px-6 py-10">
            <JarIcon className="h-20 w-auto text-moss" />
            <h3 style={{ fontSize: 'var(--fs-h3)' }}>{t.cartEmpty}</h3>
            <p className="max-w-sm text-moss">{t.cartEmptyBody}</p>
            <Link href={shop} className="btn btn-primary" tabIndex={isOpen ? 0 : -1}>{t.browse}</Link>
          </div>
        ) : (
          <>
            <ul className="m-0 flex-1 list-none overflow-y-auto p-0 px-6">
              {lines.map(l => {
                const p = products.get(l.slug)!;
                return (
                  <li key={l.slug} className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-[var(--rule)] py-5">
                    <Link href={`${shop}/${p.slug}`} className="relative aspect-square overflow-hidden rounded-[3px] bg-paper2" tabIndex={isOpen ? 0 : -1}>
                      <Image src={`/${p.image}`} alt="" fill sizes="72px" className="object-cover" />
                    </Link>
                    <div className="min-w-0">
                      <p className="label text-moss">{p.category}</p>
                      <p className="mt-1 font-display text-[1.25rem] leading-tight">{p.name}</p>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <QtyStepper small value={l.qty} onChange={n => setQty(l.slug, n)} label={`${t.qty}: ${p.name}`} />
                        <button type="button" className="text-[0.85rem] font-semibold text-moss underline underline-offset-4" onClick={() => remove(l.slug)} tabIndex={isOpen ? 0 : -1}>{t.remove}</button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-[var(--ink)] bg-paper2 px-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-5">
              <p className="flex gap-3 text-[0.9rem] leading-snug text-moss"><ShieldIcon className="mt-0.5 h-5 w-5 flex-none" />{t.notAnOrder}</p>
              <Link href={consultHref} className="btn btn-primary mt-5 w-full justify-center" tabIndex={isOpen ? 0 : -1}>{t.sendToDoctor} <Arrow /></Link>
              <button type="button" onClick={close} className="mt-3 w-full py-2 text-center text-[0.92rem] font-semibold underline underline-offset-4" tabIndex={isOpen ? 0 : -1}>{t.continue}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export const Arrow = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
export function ShieldIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3 4.5 6v5.5c0 4.4 3.1 8.2 7.5 9.5 4.4-1.3 7.5-5.1 7.5-9.5V6L12 3Z" /><path d="m8.8 12.2 2.2 2.2 4.4-4.6" /></svg>;
}
export function JarIcon({ className }: { className?: string }) {
  return <svg className={`botanical ${className ?? ''}`} viewBox="0 0 64 80" aria-hidden="true"><path d="M20 6h24v8H20z" /><path d="M16 14h32c3 0 5 2 5 5v48c0 4-3 7-7 7H18c-4 0-7-3-7-7V19c0-3 2-5 5-5Z" /><path d="M18 34h28v20H18z" /><path d="M32 39c-4 3-4 8 0 11 4-3 4-8 0-11Z" /></svg>;
}
