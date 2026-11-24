import Image from 'next/image';
import Link from 'next/link';
import { type Locale, getContent, localePath, waLink, telHref, mapsUrl, consultMsg } from '@/lib/content';
import { ui } from '@/lib/ui';
import images from '@/content/images.json';
import { PageHead, Sec, Arrow, CartFlow, ClosingCta } from './Common';
import GalleryGrid, { type Shot } from './GalleryGrid';
import ConsultForm from './shop/ConsultForm';
import { Tulsi, Neem, Lotus, Turmeric, Ashwagandha } from './Botanicals';

const img = (p: string) => `/${p}`;
const T = (l: Locale, en: string, ta: string) => (l === 'ta' ? ta : en);

/* ------------------------------------------------------------------ About */
export function AboutView({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const a = c.about;
  const people = c.doctors.filter(d => d.published);
  return (
    <main id="main">
      <PageHead locale={locale} crumb={c.nav.about} kicker={c.site.city} title={a.h1} lead={a.lead} />
      <section className="wrap grid gap-10 pb-24 md:grid-cols-12 md:pb-32">
        <figure className="m-0 md:col-span-6">
          <div className="relative overflow-hidden rounded-3xl aspect-[4/5] overflow-hidden" data-parallax=""><Image src="/images/clinic/team-in-reception.webp" alt={T(locale, 'The Sri Dhanvanthri team at reception', 'வரவேற்பறையில் ஸ்ரீ தன்வந்திரி குழு')} fill priority sizes="(min-width: 768px) 46vw, 92vw" className="object-cover" /></div>
        </figure>
        <div className="md:col-span-5 md:col-start-8 md:pt-16">
          <Sec n="01" label={T(locale, 'Our story', 'எங்கள் கதை')} />
          {a.story.map((p, i) => (
            <p key={i} className={i === 0 ? 'mt-10 font-display' : 'mt-6'} style={i === 0 ? { fontSize: 'var(--fs-h3)', lineHeight: 1.2 } : undefined}>{p}</p>
          ))}
        </div>
      </section>

      <section className="on-dark py-20 md:py-28">
        <div className="wrap">
          <Sec n="02" label={T(locale, 'What we stand for', 'எங்கள் நெறிகள்')} />
          <ol className="m-0 mt-12 grid list-none gap-12 p-0 md:grid-cols-3">
            {a.values.map((v, i) => {
              const Art = [Tulsi, Neem, Lotus][i];
              return (
                <li key={v.title} data-reveal="" style={{ ['--d' as string]: `${i * 100}ms` }}>
                  <Art className="h-28 w-auto text-sage" />
                  <h3 className="mt-6" style={{ fontSize: 'var(--fs-h3)' }}>{v.title}</h3>
                  <p className="mt-3 max-w-xs text-[rgb(244_236_221/0.85)]">{v.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="wrap py-24 md:py-32">
        <Sec n="03" label={a.teamHeading} />
        <div className="mt-14 grid gap-16 md:grid-cols-12">
          {people.map((d, i) => (
            <figure key={d.slug} className={`m-0 ${i === 0 ? 'md:col-span-6' : 'md:col-span-5 md:col-start-8 md:mt-32'}`} data-reveal="">
              <div className="relative overflow-hidden rounded-3xl aspect-[4/5] bg-ink">{d.image && <Image src={img(d.image)} alt={d.name} fill sizes="(min-width: 768px) 46vw, 92vw" className="object-cover object-top" loading="lazy" />}</div>
              <figcaption className="mt-6">
                <p className="label text-moss">{d.jobTitle}</p>
                <h3 className="mt-2" style={{ fontSize: 'var(--fs-h2)' }}>{d.name}</h3>
                <p className="mt-4 max-w-md">{d.bio}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <CartFlow locale={locale} compact />
      <ClosingCta locale={locale} />
    </main>
  );
}

/* ------------------------------------------------------------------ Treatments */
export function TreatmentsView({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const t = c.treatments;
  const photos = ['varma-therapy-session', 'potli-therapy-session', 'shoulder-therapy-session', 'body-therapy-session', 'therapists-preparing-herbs', 'therapists-grinding-herbs'];
  const programmes = [
    { href: '/panchakarma', title: c.panchakarma.h1, body: c.panchakarma.lead, image: c.panchakarma.image },
    { href: '/varmatherapy', title: c.varmatherapy.h1, body: c.varmatherapy.lead, image: c.varmatherapy.image },
    { href: '/yoga-meditation', title: c.yoga.h1, body: c.yoga.lead, image: c.yoga.image },
  ];
  return (
    <main id="main">
      <PageHead locale={locale} crumb={c.nav.treatments} kicker={T(locale, 'Services', 'சேவைகள்')} title={t.h1} lead={t.lead} />

      <section className="wrap pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {programmes.map((p, i) => (
            <Link key={p.href} href={localePath(locale, p.href)} className="group block no-underline" data-reveal="" style={{ ['--d' as string]: `${i * 90}ms` }}>
              <div className="relative overflow-hidden rounded-3xl aspect-[4/5] overflow-hidden bg-ink">
                <Image src={img(p.image)} alt="" fill sizes="(min-width: 768px) 31vw, 92vw" className="object-cover opacity-80 transition-transform duration-[900ms] ease-out group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-x-0 bottom-0 bg-ink p-5 text-paper">
                  <p className="label text-sage">0{i + 1}</p>
                  <h2 className="mt-2" style={{ fontSize: 'var(--fs-h3)' }}>{p.title}</h2>
                </div>
              </div>
              <p className="mt-4 line-clamp-3 text-[0.98rem] text-moss">{p.body}</p>
              <span className="link mt-3 inline-block font-semibold">{c.cta.learnMore} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="alt py-24 md:py-32">
        <div className="wrap">
          <Sec n="02" label={T(locale, 'Conditions we support', 'நாங்கள் உதவும் நிலைகள்')} />
          <ol className="m-0 mt-12 list-none p-0">
            {t.items.map((it, i) => (
              <li key={it.slug} id={it.slug} className="grid scroll-mt-28 gap-6 border-t border-[var(--rule)] py-10 md:grid-cols-12 md:items-center" data-reveal="">
                <span className="label text-moss md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="md:col-span-5" style={{ fontSize: 'var(--fs-h3)', lineHeight: 1.05 }}>{it.title}</h3>
                <p className="md:col-span-4">{it.body}</p>
                <div className="md:col-span-2 md:text-right">
                  <a href={waLink(c.site.whatsapp, consultMsg(locale, it.short))} className="link text-[0.92rem] font-semibold">{T(locale, 'Ask the doctor', 'மருத்துவரிடம் கேளுங்கள்')} ↗</a>
                </div>
                {i % 4 === 1 && (
                  <div className="relative hidden overflow-hidden rounded-3xl aspect-[21/8] overflow-hidden md:col-span-11 md:col-start-2 md:block">
                    <Image src={`/images/clinic/${photos[(i >> 1) % photos.length]}.webp`} alt="" fill sizes="80vw" className="object-cover" loading="lazy" />
                  </div>
                )}
              </li>
            ))}
          </ol>
          <p className="placeholder-note mt-12 max-w-3xl">{t.emergencyNote}</p>
        </div>
      </section>
      <ClosingCta locale={locale} />
    </main>
  );
}

/* ------------------------------------------------------------------ Offerings */
export function OfferingsView({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const o = c.offerings;
  const pics = ['potli-therapy-session', 'body-therapy-session', 'yoga-meditation-hilltop', 'therapists-preparing-herbs', 'lamp-and-flower-altar', 'shoulder-therapy-session', 'lamp-and-flower-altar-2', 'therapists-grinding-herbs'];
  const arts = [Tulsi, Neem, Turmeric, Ashwagandha, Lotus];
  return (
    <main id="main">
      <PageHead locale={locale} crumb={c.nav.offerings} kicker={T(locale, 'Programmes', 'திட்டங்கள்')} title={o.h1} lead={o.lead} />
      <nav aria-label={c.nav.offerings} className="wrap pb-10"><div className="chips">{o.tabs.map(tb => <a key={tb.slug} href={`#${tb.slug}`} className="chip no-underline">{tb.title}</a>)}</div></nav>
      {o.tabs.map((tb, i) => {
        const Art = arts[i % arts.length];
        const flip = i % 2 === 1;
        return (
          <section key={tb.slug} id={tb.slug} className={`scroll-mt-24 py-16 md:py-24 ${flip ? 'alt' : ''}`}>
            <div className="wrap grid items-center gap-10 md:grid-cols-12">
              <div className={`relative aspect-[4/3] overflow-hidden md:col-span-6 ${flip ? 'md:order-2 md:col-start-7' : ''}`} data-parallax="">
                <Image src={`/images/clinic/${pics[i % pics.length]}.webp`} alt="" fill sizes="(min-width: 768px) 46vw, 92vw" className="object-cover" loading={i < 1 ? 'eager' : 'lazy'} />
              </div>
              <div className={`md:col-span-5 ${flip ? 'md:order-1' : 'md:col-start-8'}`} data-reveal="">
                <div className="flex items-center gap-4"><span className="label text-moss">{String(i + 1).padStart(2, '0')} / {String(o.tabs.length).padStart(2, '0')}</span><Art className="h-12 w-auto text-moss" /></div>
                <h2 className="mt-4" style={{ fontSize: 'var(--fs-h2)' }}>{tb.title}</h2>
                <p className="mt-5 font-display" style={{ fontSize: 'var(--fs-lead)', lineHeight: 1.4 }}>{tb.summary}</p>
                <p className="mt-4 text-moss">{tb.body}</p>
                <a href={waLink(c.site.whatsapp, consultMsg(locale, tb.title))} className="btn btn-primary mt-8">{T(locale, 'Ask about this programme', 'இத்திட்டம் பற்றிக் கேளுங்கள்')}<Arrow /></a>
              </div>
            </div>
          </section>
        );
      })}
      <ClosingCta locale={locale} />
    </main>
  );
}

/* ------------------------------------------------------------------ Gallery */
export function GalleryView({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const shots: Shot[] = images.filter(i => i.file.startsWith('images/clinic/') && i.status === 'include').map(m => ({ src: img(m.file), w: m.width, h: m.height, alt: locale === 'ta' ? m.alt.ta : m.alt.en }));
  return (
    <main id="main">
      <PageHead locale={locale} crumb={c.nav.gallery} kicker={c.site.city} title={c.gallery.h1} lead={c.gallery.lead} />
      <section className="wrap pb-10">
        <GalleryGrid shots={shots} labels={{ open: T(locale, 'Open photo', 'பெரிதாகப் பார்'), close: c.nav.close, prev: T(locale, 'Previous', 'முந்தையது'), next: T(locale, 'Next', 'அடுத்தது') }} />
        <p className="mt-6 text-[0.9rem] text-moss">{c.gallery.note}</p>
      </section>
      <ClosingCta locale={locale} />
    </main>
  );
}

/* ------------------------------------------------------------------ Contact */
export function ContactView({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const a = c.site.address;
  const t = ui(locale);
  return (
    <main id="main">
      <PageHead locale={locale} crumb={c.nav.contact} kicker={c.site.city} title={c.contact.h1} lead={c.contact.lead} />
      <section className="wrap grid gap-16 pb-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Sec n="01" label={c.home.sections.visit} />
          <address className="mt-8 font-display not-italic" style={{ fontSize: 'var(--fs-h3)', lineHeight: 1.2 }}>{a.line1}, {a.line2}<br />{a.city}, {a.region} {a.postalCode}</address>
          <a href={mapsUrl(c)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-8">{c.home.mapLink}<Arrow /></a>
          <div className="mt-12 grid gap-2">
            <p className="label text-moss">{c.cta.call}</p>
            {c.site.phones.map(p => <a key={p} href={telHref(p)} className="font-display text-[1.8rem] leading-tight no-underline">{p}</a>)}
            <a href={`mailto:${c.site.email}`} className="mt-4 break-words">{c.site.email}</a>
            <a href={waLink(c.site.whatsapp, consultMsg(locale))} className="btn btn-primary mt-6 w-fit">{c.cta.freeConsult}<Arrow /></a>
          </div>
          <p className="placeholder-note mt-12">{c.home.hoursPlaceholder}</p>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Sec n="02" label={t.contactForm} />
          <p className="mt-8 max-w-md">{T(locale, 'Leave your number and a line about your concern. The clinic calls you back, usually the same day.', 'உங்கள் எண்ணையும் பிரச்சினையையும் தரவும். மருத்துவமனை உங்களைத் திரும்ப அழைக்கும்.')}</p>
          <div className="mt-8"><ConsultForm kind="callback" /></div>
        </div>
      </section>
      <section className="wrap pb-10">
        <div className="relative overflow-hidden rounded-3xl aspect-[21/9] overflow-hidden" data-parallax=""><Image src="/images/clinic/team-at-shopfront.webp" alt={c.home.hero.imageAlt} fill sizes="92vw" className="object-cover object-[50%_70%]" loading="lazy" /></div>
        <p className="caption mt-3 text-moss">{c.home.hero.caption}</p>
      </section>
    </main>
  );
}

/* ------------------------------------------------------------------ Varma / Yoga */
export function TherapyView({ locale, kind }: { locale: Locale; kind: 'varma' | 'yoga' }) {
  const c = getContent(locale);
  const v = c.varmatherapy, y = c.yoga;
  const page = kind === 'varma' ? v : y;
  const sections = kind === 'varma'
    ? [{ heading: T(locale, 'Overview', 'அறிமுகம்'), body: v.overview }, { heading: T(locale, 'The classes of Varmam', 'வர்மத்தின் வகைகள்'), body: v.classes.join(' · ') + '. ' + v.classesNote }, { heading: T(locale, 'What it is for', 'நோக்கம்'), body: v.benefits.join('. ') + '.' }]
    : y.sections;
  return (
    <main id="main">
      <PageHead locale={locale} crumb={page.h1} kicker={c.nav.treatments} title={page.h1} lead={page.lead} />
      <section className="wrap pb-20">
        <div className="relative overflow-hidden rounded-3xl aspect-[21/9] overflow-hidden" data-parallax=""><Image src={img(page.image)} alt="" fill priority sizes="92vw" className="object-cover" /></div>
      </section>
      <section className="wrap pb-20">
        {sections.map((s, i) => (
          <div key={s.heading} className="grid gap-6 border-t border-[var(--rule)] py-12 md:grid-cols-12" data-reveal="">
            <span className="label text-moss md:col-span-1">0{i + 1}</span>
            <h2 className="md:col-span-4" style={{ fontSize: 'var(--fs-h3)' }}>{s.heading}</h2>
            <p className="md:col-span-6 md:col-start-7" style={{ fontSize: '1.1rem' }}>{s.body}</p>
          </div>
        ))}
        <p className="placeholder-note mt-6 max-w-3xl">{page.caution}</p>
        <a href={waLink(c.site.whatsapp, consultMsg(locale, page.h1))} className="btn btn-primary mt-10">{c.cta.freeConsult}<Arrow /></a>
      </section>
      <ClosingCta locale={locale} />
    </main>
  );
}
