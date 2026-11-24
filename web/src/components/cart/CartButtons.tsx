'use client';
import { useState } from 'react';
import { useCart, QtyStepper } from './CartProvider';
import { ui } from '@/lib/ui';

export function BagIcon({ className }: { className?: string }) {
  return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" /><path d="M9 10V6.5a3 3 0 0 1 6 0V10" /></svg>;
}

/** Header cart button with live count. */
export function CartButton({ className = '' }: { className?: string }) {
  const { count, open, locale, ready } = useCart();
  const t = ui(locale);
  return (
    <button type="button" onClick={open} className={`cart-btn ${className}`} aria-label={`${t.cart}, ${t.items(count)}`}>
      <BagIcon />
      {ready && count > 0 && <span key={count} className="cart-count">{count}</span>}
    </button>
  );
}

/** Compact add button for product cards. */
export function AddButton({ slug, className = '' }: { slug: string; className?: string }) {
  const { add, has, locale, open } = useCart();
  const t = ui(locale);
  const inCart = has(slug);
  return inCart ? (
    <button type="button" onClick={open} className={`btn btn-ghost justify-center ${className}`}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7" /></svg>{t.inCart}
    </button>
  ) : (
    <button type="button" onClick={() => add(slug)} className={`btn btn-primary justify-center ${className}`}>{t.add}</button>
  );
}

/** Product page: quantity + add. */
export function AddWithQty({ slug }: { slug: string }) {
  const { add, lines, locale, open } = useCart();
  const t = ui(locale);
  const [q, setQ] = useState(1);
  const current = lines.find(l => l.slug === slug)?.qty ?? 0;
  return (
    <div>
      <div className="flex flex-wrap items-stretch gap-3">
        <QtyStepper value={q} onChange={n => setQ(Math.max(1, n))} label={t.qty} />
        <button type="button" className="btn btn-primary min-w-[12rem] flex-1 justify-center" onClick={() => add(slug, q)}>{t.add}</button>
      </div>
      {current > 0 && (
        <p className="mt-3 text-[0.92rem] text-moss">
          {t.inCart}: {current} · <button type="button" className="font-semibold text-ink underline underline-offset-4" onClick={open}>{t.sendToDoctor}</button>
        </p>
      )}
    </div>
  );
}
