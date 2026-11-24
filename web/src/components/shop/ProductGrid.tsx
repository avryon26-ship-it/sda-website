'use client';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AddButton } from '../cart/CartButtons';
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
      <div className="grid gap-4 md:grid-cols-[1fr_20rem] md:items-center">
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
        <ul className="m-0 mt-12 grid list-none grid-cols-1 gap-x-8 gap-y-14 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <li key={p.slug} className="pcard" data-reveal="" style={{ ['--d' as string]: `${(i % 3) * 80}ms` }}>
              <div className="mb-4 flex items-baseline justify-between gap-4">
                <span className="label text-moss">{String(products.indexOf(p) + 1).padStart(2, '0')}</span>
                <span className="text-[0.85rem] text-moss">{[p.form, p.pack].filter(Boolean).join(' · ')}</span>
              </div>
              <Link href={p.href} className="pcard-img" tabIndex={-1} aria-hidden="true">
                <span className="pcard-tag">{p.category}</span>
                <Image src={`/${p.image}`} alt="" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw" />
              </Link>
              <h3 className="mt-5"><Link href={p.href}>{p.name}</Link></h3>
              <p className="mt-2 flex-1 text-[0.98rem] text-moss">{p.summary}</p>
              <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
                <AddButton slug={p.slug} />
                <Link href={p.href} className="btn btn-ghost relative z-[2] !px-4" aria-label={`${t.details}: ${p.name}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
