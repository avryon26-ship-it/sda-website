'use client';
import { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import { ui } from '@/lib/ui';
import type { Locale } from '@/lib/content';

export type GridProduct = { slug: string; name: string; category: string; summary: string; image: string; href: string; form?: string; pack?: string };

/** Filterable catalogue: category chips + search. Works without JS as a plain grid (all products render). */
export default function ProductGrid({ locale, products }: { locale: Locale; products: GridProduct[] }) {
  const t = ui(locale);
  const cats = useMemo(() => {
    const m = new Map<string, number>();
    products.forEach(p => m.set(p.category, (m.get(p.category) ?? 0) + 1));
    return Array.from(m);
  }, [products]);
  const [cat, setCat] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const shown = products.filter(p => (!cat || p.category === cat) && (!q || `${p.name} ${p.category} ${p.summary}`.toLowerCase().includes(q.toLowerCase())));

  return (
    <div>
      <div className="sticky top-16 z-20 -mx-[var(--gutter)] grid gap-3 bg-paper px-[var(--gutter)] py-3 md:static md:mx-0 md:grid-cols-[1fr_20rem] md:items-center md:bg-transparent md:px-0">
        <div className="chips" role="toolbar" aria-label="Categories">
          <button type="button" className="chip" aria-pressed={cat === null} onClick={() => setCat(null)}>{t.allProducts}<span className="n">{products.length}</span></button>
          {cats.map(([c, n]) => <button key={c} type="button" className="chip" aria-pressed={cat === c} onClick={() => setCat(cat === c ? null : c)}>{c}<span className="n">{n}</span></button>)}
        </div>
        <label className="search">
          <span className="sr-only">{t.search}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>
          <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder={t.search} />
        </label>
      </div>

      <p className="sr-only" aria-live="polite">{t.items(shown.length)}</p>
      {shown.length === 0 ? (
        <p className="placeholder-note mt-12">{t.noResults}</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((p, i) => <ProductCard key={p.slug} p={p} priority={i < 2} />)}
        </div>
      )}
    </div>
  );
}
