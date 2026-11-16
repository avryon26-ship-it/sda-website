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

  return (
    <main id="main">
      {/* ---------------- Hero: photo + scrim + glass card ---------------- */}
      <section className="relative -mt-[84px] flex min-h-[88svh] items-end overflow-hidden bg-forest-950 pb-10 pt-32 sm:min-h-[92svh] sm:items-center sm:pb-16">
        <Image src="/images/stock-unverified/herbs-brass-pots-banner-2.webp" alt="" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="scrim absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="glass-dark max-w-2xl p-7 sm:p-10 rounded-glass-lg">
            <p className="eyebrow !text-gold-300">{c.site.city} · {c.site.address.region}</p>
            <h1 className="mt-3 text-[2.15rem] font-semibold text-white sm:text-5xl">{h.hero.h1}</h1>
            <p className="mt-5 text-lg leading-relaxed text-cream/95">{h.hero.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={wa} className="btn btn-gold press">{c.cta.consult}</a>
              <a href={telHref(c.site.phones[0])} className="btn btn-ghost press">{c.cta.call} · {c.site.phones[0]}</a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Intro ---------------- */}
      <section className="mx-auto max-w-3xl px-5 pt-20 text-center sm:pt-28">
        <Reveal>
          <p className="eyebrow">{c.site.shortName}</p>
          <h2 className="mt-3 text-4xl font-semibold text-forest-900 sm:text-5xl">{h.intro.heading}</h2>
          <hr className="gold-rule mx-auto my-7 w-40" />
          <p className="text-lg text-ink/90">{h.intro.body}</p>
        </Reveal>
      </section>

      {/* ---------------- Pillars: photo cards with glass captions ---------------- */}
      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6" aria-label="Care at a glance">
        <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2">
          {h.pillars.map((p, i) => (
            <li key={p.href}>
              <Reveal delay={(i % 2) * 90}>
                <Link href={localePath(locale, p.href)} className="lift group relative block aspect-[4/3] overflow-hidden rounded-glass-lg bg-forest-900 no-underline shadow-xl">
                  <Image src={img(p.image)} alt="" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-[900ms] group-hover:scale-105" />
                  <div className="scrim absolute inset-0" aria-hidden="true" />
                  <div className="glass-lite absolute inset-x-3 bottom-3 z-10 p-5 sm:inset-x-4 sm:bottom-4">
                    <h3 className="text-2xl font-semibold text-forest-900">{p.title}</h3>
                    <p className="mt-1 text-[0.97rem] leading-snug text-ink/90">{p.body}</p>
                    <span className="mt-2 inline-block text-sm font-semibold text-gold-700">{c.cta.learnMore} →</span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------- How consultation works ---------------- */}
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <Reveal className="text-center">
          <h2 className="text-4xl font-semibold text-forest-900 sm:text-5xl">{h.howItWorks.heading}</h2>
        </Reveal>
        <ol className="m-0 mt-10 grid list-none gap-5 p-0 md:grid-cols-3">
          {h.howItWorks.steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 90} className="h-full">
                <div className="glass-lite lift h-full p-7">
                  <span className="font-display flex h-12 w-12 items-center justify-center rounded-full bg-forest-800 text-2xl font-semibold text-gold-300" aria-hidden="true">{i + 1}</span>
                  <h3 className="mt-4 text-2xl font-semibold text-forest-900">{s.title}</h3>
                  <p className="mt-2 text-ink/90">{s.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-center text-[0.95rem] text-ink/80">{h.howItWorks.note}</p>
      </section>

      {/* ---------------- People ---------------- */}
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="eyebrow">{c.about.teamHeading}</p>
          <h2 className="mt-3 text-4xl font-semibold text-forest-900 sm:text-5xl">{c.about.h1}</h2>
        </Reveal>
        <ul className="m-0 mx-auto mt-10 grid max-w-3xl list-none gap-5 p-0 sm:grid-cols-2">
          {doctors.map((d, i) => (
            <li key={d.slug}>
              <Reveal delay={i * 90} className="h-full">
                <div className="lift overflow-hidden rounded-glass-lg bg-forest-900 text-center shadow-xl">
                  <div className="relative mx-auto aspect-square w-full max-w-[320px] bg-forest-950">
                    {d.image && <Image src={img(d.image)} alt={locale === 'ta' ? `${d.name} உருவப்படம்` : `Portrait of ${d.name}`} fill sizes="320px" className="object-cover" />}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-white">{d.name}</h3>
                    <p className="mt-1 text-gold-300">{d.jobTitle}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-6 max-w-2xl text-center text-ink/85">{c.about.story[2]}</p>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="mx-auto mt-24 max-w-3xl px-4 sm:px-6">
        <Reveal className="text-center"><h2 className="text-4xl font-semibold text-forest-900 sm:text-5xl">FAQ</h2></Reveal>
        <div className="mt-8 grid gap-3">
          {c.faq.map((f, i) => (
            <Reveal key={f.q} delay={i * 40}>
              <details className="glass-lite px-6 py-4">
                <summary className="flex items-center justify-between gap-4 text-lg font-semibold text-forest-900">
                  {f.q}
                  <svg className="chev h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                </summary>
                <p className="mt-3 text-ink/90">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Closing CTA ---------------- */}
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-glass-lg bg-forest-900 px-6 py-14 text-center sm:px-14 sm:py-20">
            <Image src="/images/brand/dhanvanthri-illustration-banner.webp" alt="" fill sizes="1100px" className="object-cover opacity-25" />
            <div className="relative z-10">
              <h2 className="text-3xl font-semibold text-white sm:text-5xl">{c.contact.lead}</h2>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={wa} className="btn btn-gold press">{c.cta.consult}</a>
                <Link href={localePath(locale, '/contact-us')} className="btn btn-ghost press">{c.nav.contact}</Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
