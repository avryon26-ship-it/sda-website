import Image from 'next/image';
import Link from 'next/link';
import { type Locale, getContent, localePath, waLink, consultMsg } from '@/lib/content';
import Rich from './Rich';
import { Fig } from './Common';
import { Neem, Tulsi, Lotus, Turmeric, Ashwagandha } from './Botanicals';

const Arrow = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
const Sec = ({ n, label }: { n: string; label: string }) => <div className="secno label"><span>{n}</span><span>{label}</span></div>;

export default function PanchakarmaView({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const p = c.panchakarma;
  const ta = locale === 'ta';
  const L = ta
    ? { overview: 'அறிமுகம்', actions: 'ஐந்து செயல்கள்', prep: 'முன்னும் பின்னும்', who: 'நோக்கம்', care: 'கவனிக்க வேண்டியவை', faq: 'கேள்விகள்', home: 'முகப்பு', title: ['பஞ்சகர்மா,', 'ஐந்து *செயல்கள்*'], caption: 'பஞ்சகர்மா சிகிச்சையில் மூலிகைக் கிழி வைக்கப்படுகிறது' }
    : { overview: 'Overview', actions: 'The five actions', prep: 'Before and after', who: 'What it is for', care: 'Please note', faq: 'Questions', home: 'Home', title: ['Panchakarma,', 'five *actions*'], caption: 'An herbal potli applied during a Panchakarma session' };
  const wa = waLink(c.site.whatsapp, consultMsg(locale, ta ? 'பஞ்சகர்மா' : 'Panchakarma'));
  const marginalia = [Neem, Tulsi, Turmeric, Ashwagandha, Lotus];

  return (
    <main id="main">
      <div className="wrap pt-5">
        <div className="dateline"><nav aria-label="Breadcrumb" className="crumbs label"><Link href={localePath(locale, '/')}>{L.home}</Link><span aria-hidden="true"> / </span><span>{p.h1}</span></nav><span className="hidden sm:inline">{ta ? 'திருநெல்வேலி · வி.எம். சத்திரம்' : 'Tirunelveli · V.M. Chatram'}</span></div>
      </div>

      {/* Oversized title + asymmetric photograph */}
      <header className="wrap grid gap-10 pb-16 pt-8 md:grid-cols-12 md:pb-24 md:pt-12">
        <div className="md:col-span-8">
          <p className="kicker mb-3">{ta ? 'சிகிச்சை முறை' : 'The programme'}</p>
          <h1 className="lines" style={{ fontSize: 'var(--fs-hero)', lineHeight: 0.9 }}>
            <span className="sr-only">{p.h1}</span>
            {L.title.map((l, i) => <span key={i} className="line" aria-hidden="true" style={{ ['--i' as string]: i }}><span><Rich t={l} /></span></span>)}
          </h1>
          <hr className="rule2 mt-8 max-w-md" />
          <p className="mt-6 max-w-xl italic" style={{ fontSize: 'var(--fs-lead)', lineHeight: 1.55 }}>{p.lead}</p>
          <div className="mt-10"><a href={wa} className="btn btn-primary">{c.cta.freeConsult}<Arrow /></a></div>
        </div>
        <Fig className="md:col-span-4 md:col-start-9 md:mt-16" ratio="aspect-[3/4]" no={ta ? 'படம் 1.' : 'FIG. 1.'} caption={L.caption}>
          <Image src={`/${p.image}`} alt={L.caption} fill priority sizes="(min-width: 768px) 30vw, 92vw" className="object-cover" />
        </Fig>
      </header>

      <hr className="rule2" />

      {/* 01 overview */}
      <section className="wrap py-20 md:py-32">
        <Sec n="01" label={L.overview} />
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <p className="md:col-span-7 md:col-start-5" style={{ fontSize: 'var(--fs-h3)', lineHeight: 1.25, fontFamily: 'var(--display)' }}>{p.overview}</p>
        </div>
      </section>

      {/* 02 the five actions: a numbered list with botanical marginalia */}
      <section className="alt py-20 md:py-32">
        <div className="wrap">
          <Sec n="02" label={L.actions} />
          <ol className="m-0 mt-12 list-none p-0">
            {p.steps.map((s, i) => {
              const Art = marginalia[i];
              return (
                <li key={s.name} className="grid items-start gap-6 border-t border-[var(--rule)] py-10 md:grid-cols-12 md:gap-8 md:py-14" data-reveal="">
                  <span className="kicker md:col-span-1">0{i + 1}</span>
                  <h3 className="md:col-span-6" style={{ fontSize: 'var(--fs-h2)' }}>{s.name}</h3>
                  <p className="max-w-md md:col-span-4">{s.body}</p>
                  <Art className="hidden h-24 w-12 justify-self-end text-moss md:col-span-1 md:block" />
                </li>
              );
            })}
            <li className="border-t border-[var(--rule)]" aria-hidden="true" />
          </ol>
        </div>
      </section>

      {/* 03 before and after */}
      <section className="wrap py-20 md:py-32">
        <Sec n="03" label={L.prep} />
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <p className="max-w-xl md:col-span-6 md:col-start-5" style={{ fontSize: 'var(--fs-lead)', lineHeight: 1.6 }}>{p.preparation}</p>
        </div>
      </section>

      {/* 04 who / benefits, 05 caution */}
      <section className="on-dark py-20 md:py-32">
        <div className="wrap">
          <Sec n="04" label={L.who} />
          <ul className="m-0 mt-12 list-none p-0">
            {p.benefits.map((b, i) => (
              <li key={b} className="grid gap-4 border-t border-[rgb(244_236_221/0.2)] py-7 md:grid-cols-12"><span className="label text-sage md:col-span-1">0{i + 1}</span><p className="md:col-span-8" style={{ fontFamily: 'var(--display)', fontSize: 'var(--fs-h3)', lineHeight: 1.2 }}>{b}</p></li>
            ))}
          </ul>
          <div className="mt-20"><Sec n="05" label={L.care} /></div>
          <p className="mt-10 max-w-2xl" style={{ fontSize: 'var(--fs-lead)', lineHeight: 1.6 }}>{p.caution}</p>
        </div>
      </section>

      {/* 06 FAQ */}
      <section className="wrap py-20 md:py-32">
        <Sec n="06" label={L.faq} />
        <div className="mt-12 max-w-3xl md:ml-auto">
          {p.faq.map(f => (
            <details key={f.q} className="faq-card">
              <summary>{f.q}<svg className="plus" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg></summary>
              <p className="max-w-xl pb-8 text-[1.05rem]">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-16 flex flex-wrap items-center gap-6"><a href={wa} className="btn btn-primary">{c.cta.freeConsult}<Arrow /></a><p className="max-w-sm text-[0.92rem] text-moss">{c.site.disclaimer}</p></div>
      </section>
    </main>
  );
}
