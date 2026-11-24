import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { type Locale, getContent, localePath, telHref, waLink } from '@/lib/content';
import { ui } from '@/lib/ui';
import { getRequest } from '@/lib/requests';
import { Crumbs, Arrow } from '../Common';

const fmt = (iso: string, locale: Locale) => new Date(iso).toLocaleString(locale === 'ta' ? 'ta-IN' : 'en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' });

/** What the patient sees after sending a cart. Readable by anyone holding the reference, so it shows first name and items only. */
export default async function TrackView({ locale, id }: { locale: Locale; id: string }) {
  const r = await getRequest(id);
  if (!r) notFound();
  const c = getContent(locale);
  const t = ui(locale);
  const products = new Map(c.products.map(p => [p.slug, p]));
  const stage = r.status === 'new' ? 1 : r.status === 'called' ? 2 : 3;
  const first = r.name.split(' ')[0];
  const isNew = r.status === 'new';

  return (
    <main id="main" className="wrap pb-10 pt-8">
      <Crumbs locale={locale} trail={[{ label: t.reference + ' ' + r.id }]} />
      <section className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="label text-moss">{t.reference} · <span className="text-ink">{r.id}</span></p>
          <h1 className="mt-4" style={{ fontSize: 'clamp(2.6rem, 7vw, 5.4rem)', lineHeight: 0.95 }}>
            {isNew ? <>{locale === 'ta' ? `நன்றி, ${first}.` : `Thank you, ${first}.`}<br /><em className="text-moss">{t.trackTitle}</em></> : t.status[r.status]}
          </h1>
          <p className="mt-6 max-w-xl" style={{ fontSize: 'var(--fs-lead)', lineHeight: 1.55 }}>{isNew ? t.trackLead : t.statusBody[r.status]}</p>

          <ol className="timeline mt-12 max-w-2xl">
            {t.steps.map((s, i) => <li key={s} data-done={i <= stage} data-now={i === stage}>{s}</li>)}
          </ol>

          <div className="assure mt-12 max-w-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="pill" data-s={r.status}>{t.status[r.status]}</span>
              <span className="text-[0.9rem] text-moss">{t.submitted} {fmt(r.createdAt, locale)}</span>
            </div>
            <p className="mt-4">{t.statusBody[r.status]}</p>
            {r.doctorNote && r.status !== 'new' && (
              <div className="mt-5 border-t border-[var(--rule)] pt-5">
                <p className="label text-moss">{t.doctorNote}</p>
                <p className="mt-2 font-display text-[1.45rem] leading-snug">“{r.doctorNote}”</p>
              </div>
            )}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href={telHref(c.site.phones[0])} className="btn btn-ghost">{c.cta.call} · {c.site.phones[0]}</a>
            <a href={waLink(c.site.whatsapp, `${locale === 'ta' ? 'வணக்கம், என் கோரிக்கை எண்' : 'Hello, my request reference is'} ${r.id}`)} className="btn btn-primary">WhatsApp<Arrow /></a>
          </div>
        </div>

        {r.items.length > 0 && (<aside className="lg:col-span-4 lg:col-start-9">
          <p className="label text-moss">{t.summary} · {t.items(r.items.reduce((s, i) => s + i.qty, 0))}</p>
          <ul className="m-0 mt-5 list-none border-t border-[var(--ink)] p-0">
            {r.items.map(i => {
              const p = products.get(i.slug);
              return (
                <li key={i.slug} className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 border-b border-[var(--rule)] py-4">
                  <div className="relative aspect-square overflow-hidden rounded-[3px] bg-paper2">{p && <Image src={`/${p.image}`} alt="" fill sizes="56px" className="object-cover" />}</div>
                  <p className="font-display text-[1.1rem] leading-tight">{p?.name ?? i.name}</p>
                  <span className="font-semibold">× {i.qty}</span>
                </li>
              );
            })}
          </ul>
          <Link href={localePath(locale, '/products')} className="link mt-6 inline-block font-semibold">{t.continue} →</Link>
          <p className="mt-10 text-[0.88rem] text-moss">{locale === 'ta' ? 'இந்தப் பக்கத்தைச் சேமித்து வைக்கவும். மருத்துவர் ஆலோசனை கூறியதும் இங்கே புதுப்பிக்கப்படும்.' : 'Bookmark this page. It updates as soon as the doctor records his advice.'}</p>
        </aside>)}
      </section>
    </main>
  );
}
