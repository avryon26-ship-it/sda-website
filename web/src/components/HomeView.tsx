import Image from 'next/image';
import Link from 'next/link';
import { type Locale, getContent, localePath, waLink, telHref } from '@/lib/content';
import Reveal from './Reveal';

const img = (p: string) => `/${p}`;

export default function HomeView({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const h = c.home;
  const wa = waLink(c.site.whatsapp, locale === 'ta' ? 'வணக்கம், ஆலோசனை பெற விரும்புகிறேன்.' : 'Hello, I would like to consult the doctor.');
  const doctors = c.doctors.filter(d => d.published);
  const chip1 = h.howItWorks.steps[1].title;
  const chip2 = `${h.pillars[0].title} · ${h.pillars[1].title}`;

  return (
    <main id="main">
      {/* ================= Hero: type first, arch photograph ================= */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-28 lg:pt-20">
          <div className="lg:col-span-7">
            <p className="eyebrow">{c.site.city} · {c.site.address.region}</p>
            <h1 className="display-1 mt-5 text-forest-900">{h.hero.h1}</h1>
            <hr className="hairline my-7 w-32 !mx-0" />
            <p className="max-w-xl text-[1.125rem] leading-[1.75] text-muted">{h.hero.lead}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={wa} className="btn btn-forest press">{c.cta.consult}</a>
              <a href={telHref(c.site.phones[0])} className="btn btn-outline press">{c.cta.call} · {c.site.phones[0]}</a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[400px] lg:col-span-5 lg:max-w-[440px]">
            <div className="arch pointer-events-none absolute -inset-3 border border-brass-500/60" aria-hidden="true" />
            <div className="arch relative aspect-[4/5] overflow-hidden bg-sand shadow-[0_40px_80px_-30px_rgba(15,43,32,0.45)]">
              <Image src="/images/clinic/lamp-and-flower-altar-2.webp" alt={locale === 'ta' ? 'மலர்களுடன் பாரம்பரிய குத்துவிளக்கு' : 'Traditional brass lamp with flowers and a framed picture of Lord Dhanvanthri'} fill priority sizes="(min-width: 1024px) 440px, 90vw" className="object-cover object-[50%_40%]" />
            </div>
            <div className="glass-pill absolute -left-2 bottom-20 rounded-full px-5 py-3 text-[0.95rem] font-semibold text-forest-900 sm:-left-8">{chip1}</div>
            <div className="glass-pill absolute -right-2 bottom-7 rounded-full px-5 py-3 text-[0.95rem] font-semibold text-forest-900 sm:-right-6">{chip2}</div>
          </div>
        </div>
      </section>

      {/* ================= Intro ================= */}
      <section className="mx-auto max-w-3xl px-5 py-16 text-center sm:py-24">
        <Reveal>
          <p className="eyebrow">{c.site.shortName}</p>
          <h2 className="display-2 mt-4 text-forest-900">{h.intro.heading}</h2>
          <hr className="hairline mx-auto my-8 w-32" />
          <p className="text-[1.125rem] leading-[1.85] text-muted">{h.intro.body}</p>
        </Reveal>
      </section>

      {/* ================= Care at a glance: editorial rows ================= */}
      <section className="bg-stone py-16 sm:py-24" aria-label="Care at a glance">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <ul className="m-0 grid list-none gap-14 p-0 lg:gap-24">
            {h.pillars.map((p, i) => (
              <li key={p.href}>
                <Reveal className="grid items-center gap-7 md:grid-cols-2 md:gap-14">
                  <Link href={localePath(locale, p.href)} className={`zoom relative block aspect-[5/4] overflow-hidden rounded-[28px] bg-sand shadow-[0_30px_60px_-30px_rgba(15,43,32,0.45)] ${i % 2 ? 'md:order-2' : ''}`} tabIndex={-1} aria-hidden="true">
                    <Image src={img(p.image)} alt="" fill sizes="(min-width: 768px) 560px, 92vw" className="object-cover" />
                  </Link>
                  <div className="md:max-w-md">
                    <span className="numeral">0{i + 1}</span>
                    <h3 className="display-3 mt-3 text-forest-900">{p.title}</h3>
                    <p className="mt-4 text-[1.0625rem] leading-[1.8] text-muted">{p.body}</p>
                    <Link href={localePath(locale, p.href)} className="mt-5 inline-flex min-h-[48px] items-center gap-2 border-b border-brass-500 pb-0.5 font-semibold text-brass-700 no-underline">{c.cta.learnMore} <span aria-hidden="true">→</span></Link>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= How consultation works ================= */}
      <section className="on-dark bg-forest-900 py-16 text-ivory sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <h2 className="display-2 max-w-2xl text-ivory">{h.howItWorks.heading}</h2>
          </Reveal>
          <ol className="m-0 mt-12 grid list-none gap-0 p-0 md:grid-cols-3 md:gap-10">
            {h.howItWorks.steps.map((s, i) => (
              <li key={s.title} className="border-t border-brass-500/50 py-8 md:py-9">
                <Reveal delay={i * 100}>
                  <span className="font-display text-5xl text-brass-300" aria-hidden="true">0{i + 1}</span>
                  <h3 className="display-3 mt-4 text-ivory">{s.title}</h3>
                  <p className="mt-3 text-[1.0625rem] leading-[1.8] text-ivory/80">{s.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-[0.95rem] text-ivory/70">{h.howItWorks.note}</p>
        </div>
      </section>

      {/* ================= People ================= */}
      <section className="mx-auto max-w-5xl px-5 py-20 sm:py-28 lg:px-8">
        <Reveal className="text-center">
          <p className="eyebrow">{c.about.teamHeading}</p>
          <h2 className="display-2 mt-4 text-forest-900">{c.about.h1}</h2>
        </Reveal>
        <ul className="m-0 mt-14 grid list-none gap-12 p-0 sm:grid-cols-2 sm:gap-8">
          {doctors.map((d, i) => (
            <li key={d.slug} className="text-center">
              <Reveal delay={i * 100}>
                <div className="arch relative mx-auto aspect-[4/5] w-full max-w-[290px] overflow-hidden bg-forest-900 shadow-[0_30px_60px_-30px_rgba(15,43,32,0.5)]">
                  {d.image && <Image src={img(d.image)} alt={locale === 'ta' ? `${d.name} உருவப்படம்` : `Portrait of ${d.name}`} fill sizes="290px" className="object-cover object-top" />}
                </div>
                <h3 className="display-3 mt-6 text-forest-900">{d.name}</h3>
                <p className="eyebrow mt-2">{d.jobTitle}</p>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-12 max-w-2xl text-center text-[1.0625rem] leading-[1.85] text-muted">{c.about.story[2]}</p>
      </section>

      {/* ================= FAQ ================= */}
      <section className="mx-auto max-w-3xl px-5 lg:px-8">
        <Reveal><h2 className="display-2 text-center text-forest-900">FAQ</h2></Reveal>
        <div className="mt-10 border-t border-forest-900/15">
          {c.faq.map(f => (
            <details key={f.q} className="border-b border-forest-900/15">
              <summary className="flex min-h-[64px] items-center justify-between gap-6 py-4 text-[1.0625rem] font-semibold text-forest-900">
                {f.q}
                <svg className="chev h-5 w-5 shrink-0 text-brass-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
              </summary>
              <p className="pb-6 pr-8 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ================= Closing call ================= */}
      <section className="mx-auto mt-24 max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="on-dark rounded-[32px] bg-forest-900 px-6 py-16 text-center sm:px-16 sm:py-24">
            <p className="eyebrow">{c.nav.contact}</p>
            <h2 className="display-2 mx-auto mt-4 max-w-2xl text-ivory">{c.contact.lead}</h2>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a href={wa} className="btn btn-brass press">{c.cta.consult}</a>
              <Link href={localePath(locale, '/contact-us')} className="btn btn-outline-light press">{c.nav.contact}</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
