import Image from 'next/image';
import Link from 'next/link';
import { type Locale, getContent, localePath, telHref, waLink, consultMsg } from '@/lib/content';
import { productMeta, CONCERNS } from '@/lib/ui';
import { torn } from '@/lib/torn';
import { ht } from '@/lib/img';
import Rich from './Rich';
import { ConsultButton } from './cart/CartButtons';
import ProductCard from './shop/ProductCard';
import { MessageArt, LampArt, MortarArt, Tulsi, Neem, Lotus, KolamRule } from './Botanicals';

const src = (p: string) => `/${p}`;
const Arrow = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
const Sec = ({ n, label }: { n: string; label: string }) => <div className="secno label"><span>{n}</span><span>{label}</span></div>;

/** Words for this page. Facts that are not confirmed (years of practice, free) are not stated as numbers or badges. */
const H = {
  en: {
    kicker: 'Doctor first',
    deck: 'Nothing is prescribed until the doctor has *listened*.',
    lead: 'Ayurveda, Siddha and Varma care in V.M. Chatram, Tirunelveli. Tell us what is troubling you and the doctor calls you back, at the time you choose, before anything is given.',
    talk: 'Talk to the doctor',
    spTitle: 'The doctor calls you back',
    spBody: 'Tell us your concern and the best time to call. No payment is taken on this website.',
    stamp: 'No online payment',
    fig: 'FIG. 1.',
    concernH: 'What is troubling you?',
    concernL: 'Tap one. The doctor will call you about it.',
    storyTag: 'The story',
    howTag: 'How it works',
    howH: 'Three simple steps',
    how: [['Tell us', 'Tap “Talk to the doctor” or add remedies to your cart. Two minutes, no account.'], ['The doctor calls', 'He listens to your health, food, sleep and medicines, in Tamil or English.'], ['Your plan', 'If suitable, collect from the pharmacy. If not, he may ask you to visit.']],
    therTag: 'Therapies',
    therH: 'Therapies at the hospital',
    therL: 'Traditional, hands-on care, planned for one person at a time.',
    docTag: 'The doctor',
    docH: 'Meet the doctor',
    docQ: 'Nothing is prescribed before I have listened to you. Some days, that conversation is the whole visit.',
    docCta: 'Request a call from him',
    shopTag: 'Pharmacy',
    shopH: 'From our pharmacy',
    shopL: 'Add what you are curious about to your cart and send it to the doctor. He confirms what suits you before anything is given.',
    shopAll: 'All remedies',
    placeTag: 'The place',
    placeH: 'Inside the hospital',
    faqTag: 'Questions',
    faqH: 'Questions people ask',
    endH: 'Come and *talk* to the doctor first.',
    orCall: 'or call',
    datePlaces: 'Panchakarma · Varma · Yoga · Herbal',
  },
  ta: {
    kicker: 'முதலில் மருத்துவர்',
    deck: 'மருத்துவர் *கேட்கும்* வரை எதுவும் பரிந்துரைக்கப்படுவதில்லை.',
    lead: 'திருநெல்வேலி வி.எம். சத்திரத்தில் ஆயுர்வேதம், சித்தம், வர்ம சிகிச்சை. உங்கள் பிரச்சினையைச் சொல்லுங்கள்; எதுவும் வழங்கும் முன், நீங்கள் சொல்லும் நேரத்தில் மருத்துவர் அழைப்பார்.',
    talk: 'மருத்துவரிடம் பேசுங்கள்',
    spTitle: 'மருத்துவர் உங்களை அழைப்பார்',
    spBody: 'உங்கள் பிரச்சினையையும் அழைக்க ஏற்ற நேரத்தையும் சொல்லுங்கள். இந்த இணையதளத்தில் பணம் வாங்கப்படுவதில்லை.',
    stamp: 'ஆன்லைன் கட்டணம் இல்லை',
    fig: 'படம் 1.',
    concernH: 'உங்கள் பிரச்சினை என்ன?',
    concernL: 'ஒன்றைத் தொடுங்கள். மருத்துவர் அழைப்பார்.',
    storyTag: 'எங்கள் கதை',
    howTag: 'எப்படி',
    howH: 'மூன்று எளிய படிகள்',
    how: [['சொல்லுங்கள்', '“மருத்துவரிடம் பேசுங்கள்” என்பதைத் தொடுங்கள் அல்லது பொருட்களைக் கூடையில் சேர்க்கவும்.'], ['மருத்துவர் அழைப்பார்', 'உங்கள் உடல்நலம், உணவு, தூக்கம், மருந்துகள் பற்றிக் கேட்பார்.'], ['உங்கள் திட்டம்', 'பொருத்தமானால் மருந்தகத்தில் பெறலாம்; இல்லையெனில் வருமாறு கேட்கலாம்.']],
    therTag: 'சிகிச்சைகள்',
    therH: 'மருத்துவமனையில் சிகிச்சைகள்',
    therL: 'ஒவ்வொருவருக்கும் தனியாகத் திட்டமிடப்படும் பாரம்பரிய சிகிச்சை.',
    docTag: 'மருத்துவர்',
    docH: 'மருத்துவரைச் சந்தியுங்கள்',
    docQ: 'உங்களைக் கேட்காமல் எதையும் பரிந்துரைப்பதில்லை. சில நாட்களில் அந்த உரையாடலே முழு வருகை.',
    docCta: 'அவரிடம் அழைப்பு கோருங்கள்',
    shopTag: 'மருந்தகம்',
    shopH: 'எங்கள் மருந்தகத்திலிருந்து',
    shopL: 'விரும்பியதைக் கூடையில் சேர்த்து மருத்துவருக்கு அனுப்புங்கள். எதுவும் வழங்கும் முன் பொருத்தமானதை அவர் உறுதி செய்வார்.',
    shopAll: 'அனைத்துப் பொருட்களும்',
    placeTag: 'எங்கள் இடம்',
    placeH: 'மருத்துவமனைக்குள்',
    faqTag: 'கேள்விகள்',
    faqH: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    endH: 'முதலில் மருத்துவருடன் *பேசுங்கள்*.',
    orCall: 'அல்லது அழைக்கவும்',
    datePlaces: 'பஞ்சகர்மா · வர்மம் · யோகா · மூலிகை',
  },
};

export default function HomeView({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const t = H[locale];
  const L = (p: string) => localePath(locale, p);
  const wa = waLink(c.site.whatsapp, consultMsg(locale));
  const doc = c.doctors[0];
  const story = c.home.story;

  const featured = ['narmadha-pain-care-oil', 'narmadha-kesha-raksha-oil', 'narmadha-bathing-soap', 'narmadha-seerana-sanjeevi-sooranam']
    .map(s => c.products.find(p => p.slug === s)!)
    .map(p => ({ slug: p.slug, name: p.name, category: p.category, summary: p.summary, image: p.image, href: L(`/products/${p.slug}`), form: productMeta[p.slug]?.form[locale], pack: productMeta[p.slug]?.pack }));

  const therapies = [
    { href: '/panchakarma', title: c.panchakarma.h1, body: c.offerings.tabs[0].summary },
    { href: '/varmatherapy', title: c.varmatherapy.h1, body: c.home.pillars[1].body },
    { href: '/offerings#de-stress', title: c.offerings.tabs[1].title, body: c.offerings.tabs[1].summary },
    { href: '/yoga-meditation', title: c.yoga.h1, body: c.home.pillars[2].body },
    { href: '/treatments', title: c.nav.treatments, body: c.treatments.items.slice(0, 4).map(i => i.short).join(', ') + '…' },
  ];
  const gallery = ['team-green-uniform-pharmacy', 'therapists-preparing-herbs', 'lamp-and-flower-altar', 'therapists-in-white-coats', 'managing-director-in-pharmacy', 'therapists-grinding-herbs'];
  const arts = [MessageArt, LampArt, MortarArt];

  return (
    <main id="main" className="overflow-x-clip">
      {/* ============ FRONT PAGE ============ */}
      <section className="wrap pt-4 md:pt-6">
        <div className="dateline"><span>{c.site.city} · V.M. Chatram</span><span className="hidden sm:inline">{t.datePlaces}</span><a href={telHref(c.site.phones[0])} className="no-underline">{c.cta.call} {c.site.phones[0]}</a></div>

        <div className="mt-8 grid gap-10 md:mt-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="kicker fade-up">{t.kicker}</p>
            <h1 className="lines mt-4" style={{ fontSize: 'var(--fs-hero)', lineHeight: 0.98 }}>
              {c.home.hero.lines.map((l, i) => <span key={i} className="line" style={{ ['--i' as string]: i }}><span><Rich t={l} /></span></span>)}
            </h1>
            <hr className="rule2 mt-7 max-w-md" />
            <p className="fade-up mt-7 max-w-2xl" style={{ ['--delay' as string]: '120ms', fontFamily: 'var(--display)', fontStyle: 'italic', fontSize: 'clamp(1.35rem, 2.6vw, 2rem)', lineHeight: 1.25 }}><Rich t={t.deck} /></p>
            <p className="fade-up mt-5 max-w-xl text-[1.1rem] text-moss" style={{ ['--delay' as string]: '200ms' }}>{t.lead}</p>
            <div className="fade-up mt-8 grid gap-3 sm:flex sm:flex-wrap" style={{ ['--delay' as string]: '280ms' }}>
              <ConsultButton className="btn btn-primary justify-center !min-h-[56px]">{t.talk}<Arrow /></ConsultButton>
              <a href={wa} className="btn btn-ghost justify-center !min-h-[56px]">{c.cta.freeConsult}</a>
            </div>
          </div>

          {/* the photograph is the LCP (smooth duotone: faces in a group shot would be lost to halftone dots), never animated */}
          <div className="lg:col-span-5">
            <figure className="fig relative">
              <span className="tape" style={{ left: '38%', top: '-0.8rem' }} aria-hidden="true" />
              <div className="frame relative aspect-[4/3.4] sm:aspect-[4/3] lg:aspect-[4/4.6]">
                <Image src={src('images/clinic/team-at-shopfront.webp')} alt={c.home.hero.imageAlt} fill priority fetchPriority="high" sizes="(min-width: 1024px) 40vw, 94vw" className="object-cover" style={{ objectPosition: '50% 80%' }} />
              </div>
              <figcaption>{t.fig} {c.home.hero.caption}</figcaption>
            </figure>
            <div className="relative z-10 ml-auto mt-8 w-[92%] lg:w-[86%]">
              <div className="torn" style={{ ['--torn' as string]: torn('bottom', 40, 9, 5) }}>
                <p className="kicker">Stop press</p>
                <p className="mt-2" style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: '1.55rem', lineHeight: 1.08 }}>{t.spTitle}</p>
                <p className="mt-3 text-[1rem]">{t.spBody}</p>
                <ConsultButton className="btn btn-primary mb-3 mt-5 justify-center">{t.talk}<Arrow /></ConsultButton>
              </div>
              <span className="stamp absolute -right-2 -top-8">{t.stamp}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CLASSIFIEDS: what is troubling you ============ */}
      <section className="wrap py-16 md:py-24">
        <div className="classifieds">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 style={{ fontSize: 'var(--fs-h2)' }}>{t.concernH}</h2>
            <p className="kicker">{t.concernL}</p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            {CONCERNS[locale].map(x => (
              <ConsultButton key={x} concern={x} className="concern-tile"><span>{x}</span><Arrow s={16} /></ConsultButton>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 01 STORY: image pins, text scrolls ============ */}
      <section id="story" className="alt py-20 md:py-32" data-story>
        <div className="wrap">
          <Sec n="01" label={t.storyTag} />
          <div className="story-grid mt-12">
            <div className="story-visual" aria-hidden="true">
              {story.map((st, i) => (
                <div key={st.image} className="frame" data-frame data-on={i === 0}>
                  <Image src={ht(st.image)} alt="" fill sizes="50vw" className="object-cover" loading="lazy" />
                </div>
              ))}
            </div>
            <div className="story-steps">
              {story.map((st, i) => (
                <article key={st.title} data-step>
                  <figure className="story-mobile-fig fig" data-reveal="">
                    <div className="frame relative aspect-[4/3]"><Image src={ht(st.image)} alt={st.alt} fill sizes="92vw" className="object-cover" loading="lazy" /></div>
                  </figure>
                  <p className="kicker">0{i + 1} · {st.kicker}</p>
                  <h3 className="mt-3" data-lines=""><span className="line"><span><Rich t={st.title} /></span></span></h3>
                  <p className="body mt-5 max-w-md text-[1.12rem]">{st.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 02 HOW IT WORKS ============ */}
      <section id="how" className="py-20 md:py-32">
        <div className="wrap">
          <Sec n="02" label={t.howTag} />
          <h2 className="mt-8 max-w-3xl" data-lines="" style={{ fontSize: 'var(--fs-h1)' }}><span className="line"><span>{t.howH}</span></span></h2>
          <div className="relative mt-14">
            <svg className="botanical drawline pointer-events-none absolute left-0 top-[4.5rem] hidden w-full text-moss md:block" viewBox="0 0 1000 60" data-draw="" aria-hidden="true" focusable="false" style={{ strokeWidth: 1.2 }}>
              <path pathLength={1} d="M0 30C120 -6 230 66 340 30S560 -6 670 30S890 66 1000 30" />
            </svg>
            <ol className="relative m-0 grid list-none gap-14 p-0 md:grid-cols-3 md:gap-10">
              {t.how.map(([h, b], i) => {
                const Art = arts[i];
                return (
                  <li key={h} className={i === 1 ? 'md:mt-14' : i === 2 ? 'md:mt-5' : ''} data-reveal="" style={{ ['--d' as string]: `${i * 110}ms` }}>
                    <div className="patch inline-block pr-4"><Art className="h-32 w-auto text-ink" /></div>
                    <p className="kicker mt-5">0{i + 1}</p>
                    <h3 className="mt-2" style={{ fontSize: 'var(--fs-h3)' }}>{h}</h3>
                    <p className="mt-3 max-w-xs text-moss">{b}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* ============ 03 THERAPIES: leaves on one cord ============ */}
      <section className="alt py-20 md:py-32">
        <div className="wrap">
          <Sec n="03" label={t.therTag} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <h2 style={{ fontSize: 'var(--fs-h1)' }}>{t.therH}</h2>
              <p className="mt-5 max-w-sm text-moss">{t.therL}</p>
              <p className="hand mt-6 hidden lg:block">{locale === 'ta' ? 'ஒரு இலையைத் தொடுங்கள் →' : 'tap a leaf →'}</p>
              <Tulsi className="mt-6 hidden h-40 w-auto text-moss lg:block" />
            </div>
            <nav className="bundle lg:col-span-8" aria-label={t.therH}>
              {therapies.map((th, i) => (
                <Link key={th.href} href={L(th.href)}>
                  <span className="n">0{i + 1}</span><span className="t">{th.title}</span><span className="d line-clamp-2 max-w-[18rem]">{th.body}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* ============ 04 THE DOCTOR ============ */}
      <section className="py-20 md:py-32">
        <div className="wrap">
          <Sec n="04" label={t.docTag} />
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <figure className="fig lg:col-span-5">
              <span className="tape" style={{ left: '38%', top: '-0.8rem' }} aria-hidden="true" />
              <div className="frame relative aspect-[4/5] bg-ink">
                {doc.image && <Image src={src(doc.image)} alt={`${doc.name}, ${doc.jobTitle}`} fill sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover object-top" loading="lazy" />}
              </div>
              <figcaption>{doc.name} · {doc.jobTitle}</figcaption>
            </figure>
            <div className="lg:col-span-7">
              <h2 style={{ fontSize: 'var(--fs-h1)' }}>{t.docH}</h2>
              <blockquote className="m-0 mt-8 border-l-[3px] border-ink pl-6" style={{ fontFamily: 'var(--display)', fontStyle: 'italic', fontSize: 'clamp(1.5rem, 3vw, 2.4rem)', lineHeight: 1.25 }}>“{t.docQ}”</blockquote>
              <p className="kicker mt-6">{doc.name} · {doc.jobTitle}</p>
              <ConsultButton className="btn btn-primary mt-8 w-full justify-center sm:w-fit">{t.docCta}<Arrow /></ConsultButton>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 05 PHARMACY: labelled jars ============ */}
      <section className="alt py-20 md:py-32">
        <div className="wrap">
          <Sec n="05" label={t.shopTag} />
          <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 style={{ fontSize: 'var(--fs-h1)' }}>{t.shopH}</h2>
              <p className="mt-4 max-w-lg text-moss">{t.shopL}</p>
            </div>
            <Link href={L('/products')} className="link hidden font-semibold sm:inline-block">{t.shopAll} →</Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {featured.map(p => <ProductCard key={p.slug} p={p} />)}
          </div>
          <Link href={L('/products')} className="btn btn-ghost mt-8 w-full justify-center sm:hidden">{t.shopAll}<Arrow /></Link>
        </div>
      </section>

      {/* ============ 06 THE PLACE ============ */}
      <section className="py-20 md:py-32">
        <div className="wrap flex flex-wrap items-end justify-between gap-4">
          <div><Sec n="06" label={t.placeTag} /><h2 className="mt-8" style={{ fontSize: 'var(--fs-h1)' }}>{t.placeH}</h2></div>
          <Link href={L('/gallery')} className="link font-semibold">{c.nav.gallery} →</Link>
        </div>
        <div className="snap-row mt-10">
          {gallery.map(g => (
            <Link key={g} href={L('/gallery')} className="fig relative aspect-[4/5] w-[62vw] max-w-[17rem] flex-none snap-start border border-ink bg-paper2 p-[5px]">
              <span className="relative block h-full w-full"><Image src={src(`images/clinic/${g}.webp`)} alt="" fill sizes="17rem" className="object-cover" loading="lazy" /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ 07 FAQ ============ */}
      <section className="wrap grid gap-10 pb-16 md:grid-cols-12 md:pb-24">
        <div className="md:col-span-4"><Sec n="07" label={t.faqTag} /><h2 className="mt-8" style={{ fontSize: 'var(--fs-h2)' }}>{t.faqH}</h2><Lotus className="mt-8 hidden h-32 w-auto text-moss md:block" /></div>
        <div className="md:col-span-8">
          {c.faq.map(f => (
            <details key={f.q} className="faq-card">
              <summary>{f.q}<svg className="plus" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg></summary>
              <p className="max-w-xl pb-6 pr-6 text-[1.05rem] text-moss">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ============ closing line ============ */}
      <section className="wrap pb-6 pt-4 text-center">
        <div className="text-moss"><KolamRule /></div>
        <p className="mx-auto mt-10 max-w-4xl" style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 'var(--fs-h1)', lineHeight: 1.02 }}><Rich t={t.endH} /></p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ConsultButton className="btn btn-primary justify-center">{t.talk}<Arrow /></ConsultButton>
          <span className="text-moss">{t.orCall}</span>
          <a href={telHref(c.site.phones[0])} className="link text-[1.2rem] font-semibold">{c.site.phones[0]}</a>
        </div>
      </section>
    </main>
  );
}
