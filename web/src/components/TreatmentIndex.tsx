'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Row = { slug: string; title: string; href: string; img: string; alt: string };
/** Editorial index. Desktop: hover or focus reveals a photo. Touch: first tap reveals it, second tap opens the page. */
export default function TreatmentIndex({ rows, more }: { rows: Row[]; more: string }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div>
      {rows.map((r, i) => (
        <Link key={r.slug} href={r.href} className="index-row" data-open={open === r.slug}
          onClick={e => {
            if (matchMedia('(hover: none)').matches && open !== r.slug) { e.preventDefault(); setOpen(r.slug); }
          }}>
          <span className="n">{String(i + 1).padStart(2, '0')}</span>
          <span className="t">{r.title}</span>
          <svg className="arrow" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
          <span className="index-photo" aria-hidden="true"><Image src={r.img} alt="" fill sizes="(min-width: 1024px) 22rem, 90vw" className="object-cover" loading="lazy" /></span>
          <span className="sr-only">{r.alt}. {more}</span>
        </Link>
      ))}
    </div>
  );
}
