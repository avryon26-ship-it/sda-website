import ProductArt from './ProductArt';
import Link from 'next/link';
import { AddButton } from '../cart/CartButtons';

export type CardProduct = { slug: string; name: string; category: string; summary: string; image: string; href: string; form?: string; pack?: string };

/** Shop card: two per row on phones, three or four on desktop. */
export default function ProductCard({ p, priority }: { p: CardProduct; priority?: boolean }) {
  return (
    <article className="pc group">
      <Link href={p.href} className="pc-img" tabIndex={-1} aria-hidden="true">
        <ProductArt p={p} sizes="(min-width: 1024px) 24vw, (min-width: 640px) 31vw, 46vw" priority={priority} />
        <span className="pc-tag">{p.category}</span>
      </Link>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="pc-title"><Link href={p.href}>{p.name.replace(/^Narmadha\s+/i, '')}</Link></h3>
        <p className="mt-1 text-[0.78rem] text-moss sm:text-[0.85rem]">{[p.form, p.pack].filter(Boolean).join(' · ') || p.category}</p>
        <p className="mt-2 hidden flex-1 text-[0.9rem] leading-snug text-moss sm:block">{p.summary}</p>
        <AddButton slug={p.slug} className="pc-btn mt-3" />
      </div>
    </article>
  );
}
