import Image from 'next/image';
import Link from 'next/link';
import { type Locale, getContent, localePath, waLink, consultMsg } from '@/lib/content';
import { ui, productMeta } from '@/lib/ui';
import { Crumbs, CartFlow } from '../Common';
import { ShieldIcon } from '../cart/CartProvider';
import { AddWithQty, AddButton } from '../cart/CartButtons';

export default function ProductDetailView({ locale, slug }: { locale: Locale; slug: string }) {
  const c = getContent(locale);
  const t = ui(locale);
  const ta = locale === 'ta';
  const i = c.products.findIndex(p => p.slug === slug);
  const p = c.products[i];
  const m = productMeta[slug];
  const related = [...c.products.filter(x => x.category === p.category && x.slug !== slug), ...c.products.filter(x => x.category !== p.category)].slice(0, 3);
  const shop = localePath(locale, '/products');

  return (
    <main id="main">
      <div className="wrap pt-8">
        <Crumbs locale={locale} trail={[{ label: c.nav.products, href: shop }, { label: p.name }]} />
      </div>

      <section className="wrap grid gap-10 pb-20 pt-10 md:grid-cols-12 md:gap-14 md:pb-28 md:pt-14">
        <figure className="m-0 md:col-span-6 lg:col-span-7">
          <div className="relative aspect-square overflow-hidden rounded-[3px] bg-paper2 md:sticky md:top-28">
            <Image src={`/${p.image}`} alt={p.name} fill priority sizes="(min-width: 1024px) 54vw, (min-width: 768px) 48vw, 92vw" className="object-cover" />
            <span className="pcard-tag">{p.category}</span>
          </div>
        </figure>

        <div className="md:col-span-6 lg:col-span-5">
          <p className="label text-moss">Narmadha · {String(i + 1).padStart(2, '0')} / {String(c.products.length).padStart(2, '0')}</p>
          <h1 className="mt-4" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', lineHeight: 0.98 }}>{p.name}</h1>
          <p className="mt-6" style={{ fontSize: 'var(--fs-lead)', lineHeight: 1.5 }}>{p.summary}</p>

          <dl className="facts mt-8">
            <div><dt className="label text-moss">{t.form}</dt><dd className="m-0 mt-1 font-semibold">{m?.form[locale] ?? '—'}</dd></div>
            <div><dt className="label text-moss">{t.use}</dt><dd className="m-0 mt-1 font-semibold">{m?.use[locale] ?? '—'}</dd></div>
            <div><dt className="label text-moss">{t.pack}</dt><dd className="m-0 mt-1 font-semibold">{m?.pack ?? (ta ? 'உறுதி செய்யப்படும்' : 'To confirm')}</dd></div>
          </dl>

          <div className="mt-8"><AddWithQty slug={slug} /></div>
          <a href={waLink(c.site.whatsapp, consultMsg(locale, p.name))} className="link mt-5 inline-block font-semibold">{t.askOnWa} ↗</a>

          <div className="assure mt-10 flex gap-4">
            <ShieldIcon className="h-8 w-8 flex-none" />
            <div>
              <p className="font-semibold">{t.reviewedBy}</p>
              <p className="mt-2 text-[0.95rem]">{t.reviewedBody}</p>
            </div>
          </div>

          <div className="mt-10">
            <details className="faq" open>
              <summary>{ta ? 'விவரம்' : 'About this product'}<Plus /></summary>
              <p className="pb-8 text-[1.02rem]">{p.description}</p>
            </details>
            <details className="faq">
              <summary>{t.facts}<Plus /></summary>
              <ul className="m-0 list-none p-0 pb-8">
                {p.factsNeeded.map(f => (
                  <li key={f} className="flex justify-between gap-4 border-b border-[var(--rule)] py-3 text-[0.98rem]"><span>{f}</span><span className="text-moss">{t.factsPending}</span></li>
                ))}
              </ul>
            </details>
            <details className="faq">
              <summary>{ta ? 'பணம் & பெறுதல்' : 'Payment and collection'}<Plus /></summary>
              <p className="pb-8 text-[1.02rem]">{t.notAnOrder}</p>
            </details>
          </div>
        </div>
      </section>

      <CartFlow locale={locale} compact />

      <section className="wrap py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 style={{ fontSize: 'var(--fs-h2)' }}>{t.related}</h2>
          <Link href={shop} className="link font-semibold">{c.cta.viewAll} →</Link>
        </div>
        <ul className="m-0 mt-12 grid list-none gap-x-8 gap-y-14 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {related.map(r => {
            const href = localePath(locale, `/products/${r.slug}`);
            return (
              <li key={r.slug} className="pcard">
                <Link href={href} className="pcard-img" tabIndex={-1} aria-hidden="true">
                  <span className="pcard-tag">{r.category}</span>
                  <Image src={`/${r.image}`} alt="" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw" loading="lazy" />
                </Link>
                <h3 className="mt-5"><Link href={href}>{r.name}</Link></h3>
                <p className="mt-2 flex-1 text-[0.98rem] text-moss">{r.summary}</p>
                <AddButton slug={r.slug} className="mt-5 w-full" />
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
const Plus = () => <svg className="plus" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>;
