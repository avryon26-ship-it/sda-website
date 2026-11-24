import Image from 'next/image';
import { type Locale, getContent, localePath } from '@/lib/content';
import { ui, productMeta } from '@/lib/ui';
import { PageHead, CartFlow, ClosingCta } from '../Common';
import { ShieldIcon } from '../cart/CartProvider';
import ProductGrid from './ProductGrid';

export default function ProductsView({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const t = ui(locale);
  const ta = locale === 'ta';
  const products = c.products.map(p => ({
    slug: p.slug, name: p.name, category: p.category, summary: p.summary, image: p.image,
    href: localePath(locale, `/products/${p.slug}`), form: productMeta[p.slug]?.form[locale], pack: productMeta[p.slug]?.pack,
  }));
  return (
    <main id="main">
      <PageHead locale={locale} crumb={c.nav.products} kicker={ta ? 'நர்மதா மூலிகை மருந்தகம்' : 'The Narmadha herbal pharmacy'}
        title={ta ? 'மூலிகைப் *பொருட்கள்*' : 'Herbal *remedies*, chosen with the doctor'} lead={c.narmadha.lead}>
        <div className="mt-8 grid gap-6 md:mt-12 md:grid-cols-12 md:items-stretch">
          <div className="relative hidden min-w-0 overflow-hidden rounded-[24px] md:col-span-8 md:block md:min-h-[24rem]" data-parallax="">
            <Image src="/images/clinic/managing-director-in-pharmacy.webp" alt={ta ? 'மருந்தகத்தில் நிர்வாக இயக்குநர்' : 'The managing director in the Sri Dhanvanthri pharmacy'} fill priority sizes="(min-width: 768px) 62vw, 92vw" className="object-cover object-[50%_35%]" />
          </div>
          <div className="assure flex gap-4 md:col-span-4 md:flex-col md:justify-between md:gap-6">
            <ShieldIcon className="h-9 w-9 flex-none md:h-10 md:w-10" />
            <div>
              <h2 style={{ fontSize: 'var(--fs-h3)', lineHeight: 1.05 }}>{t.reviewedBy}</h2>
              <p className="mt-3 text-[0.98rem]">{t.reviewedBody}</p>
            </div>
          </div>
        </div>
      </PageHead>

      <section className="wrap pb-20 md:pb-32">
        <ProductGrid locale={locale} products={products} />
      </section>

      <CartFlow locale={locale} />

      <section className="wrap grid gap-10 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <p className="label text-moss">{ta ? 'மருத்துவமனையில் மட்டும்' : 'At the hospital only'}</p>
          <h2 className="mt-4" style={{ fontSize: 'var(--fs-h2)' }}>{c.narmadha.elakizhi.heading}</h2>
          <p className="mt-6 max-w-md">{c.narmadha.elakizhi.body}</p>
        </div>
        <div className="relative overflow-hidden rounded-3xl aspect-[4/3] md:col-span-6 md:col-start-7">
          <Image src="/images/clinic/potli-therapy-session.webp" alt={ta ? 'மூலிகைக் கிழி சிகிச்சை' : 'Herbal leaf pouch therapy at the clinic'} fill sizes="(min-width: 768px) 46vw, 92vw" className="object-cover" loading="lazy" />
        </div>
      </section>
      <ClosingCta locale={locale} />
    </main>
  );
}
