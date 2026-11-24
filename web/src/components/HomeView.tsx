import Image from 'next/image';
import Link from 'next/link';
import { type Locale, getContent, localePath, telHref } from '@/lib/content';
import { productMeta, CONCERNS } from '@/lib/ui';
import Rich from './Rich';
import { ConsultButton } from './cart/CartButtons';
import ProductCard from './shop/ProductCard';
import { Tulsi, Neem, Lotus, Turmeric } from './Botanicals';

const src = (p: string) => `/${p}`;
const Arrow = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
const Check = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7" /></svg>;

const H = {
  en: {
    badge: 'Free consultation call',
    h1: 'Natural healing, *guided by our doctor.*',
    lead: 'Ayurveda, Siddha and Varma care in Tirunelveli. Tell us what is troubling you and the doctor calls you back, free, before anything is prescribed.',
    talk: 'Talk to the doctor',
    free: 'free',
    shop: 'Shop herbal remedies',
    trust: [['18+', 'years of practice'], ['9', 'own herbal remedies'], ['0', 'payment online']],
    docCard: 'Managing Director',
    bubble: 'Calls back at your chosen time',
    concernH: 'What is troubling you?',
    concernL: 'Tap one. The doctor will call you about it.',
    howH: 'Three simple steps',
    how: [['Tell us', 'Tap “Talk to the doctor” or add remedies to your cart. Two minutes, no account.'], ['The doctor calls', 'He listens to your health, food, sleep and medicines, in Tamil or English.'], ['Get your plan', 'Collect suitable remedies from our pharmacy, or visit for therapy.']],
    therH: 'Therapies at the hospital',
    therL: 'Traditional, hands-on care, planned for one person at a time.',
    docH: 'Meet the doctor',
    docQ: 'Nothing is prescribed before I have listened to you. Some days, that conversation is the whole visit.',
    docCta: 'Request a call from him',
    shopH: 'From our own pharmacy',
    shopL: 'Add to cart and send it to the doctor. He confirms what suits you before anything is given.',
    shopAll: 'See all remedies',
    whyH: 'Why families choose us',
    why: [['Consultation first', 'The doctor speaks with you before any remedy or therapy.'], ['Our own pharmacy', 'The Narmadha range is prepared under the same roof.'], ['Traditional therapies', 'Panchakarma, Varma, Elakizhi and yoga, done by hand.'], ['Alongside your doctor', 'Supportive care. We never ask you to stop your medicines.']],
    placeH: 'Inside the hospital',
    faqH: 'Questions people ask',
    endH: 'Not sure where to start?',
    endL: 'Tell the doctor what is troubling you. He will call you back, free.',
    orCall: 'or call',
  },
  ta: {
    badge: 'இலவச ஆலோசனை அழைப்பு',
    h1: 'இயற்கை நலம், *மருத்துவரின் வழிகாட்டலில்.*',
    lead: 'திருநெல்வேலியில் ஆயுர்வேதம், சித்தம், வர்ம சிகிச்சை. உங்கள் பிரச்சினையைச் சொல்லுங்கள், மருத்துவர் இலவசமாக அழைப்பார்.',
    talk: 'மருத்துவரிடம் பேசுங்கள்',
    free: 'இலவசம்',
    shop: 'மூலிகைப் பொருட்கள்',
    trust: [['18+', 'ஆண்டு அனுபவம்'], ['9', 'சொந்த மூலிகைப் பொருட்கள்'], ['0', 'ஆன்லைன் கட்டணம்']],
    docCard: 'நிர்வாக இயக்குநர்',
    bubble: 'நீங்கள் சொல்லும் நேரத்தில் அழைப்பார்',
    concernH: 'உங்கள் பிரச்சினை என்ன?',
    concernL: 'ஒன்றைத் தொடுங்கள். மருத்துவர் அழைப்பார்.',
    howH: 'மூன்று எளிய படிகள்',
    how: [['சொல்லுங்கள்', '“மருத்துவரிடம் பேசுங்கள்” என்பதைத் தொடுங்கள் அல்லது பொருட்களைக் கூடையில் சேர்க்கவும்.'], ['மருத்துவர் அழைப்பார்', 'உங்கள் உடல்நலம், உணவு, தூக்கம், மருந்துகள் பற்றிக் கேட்பார்.'], ['உங்கள் திட்டம்', 'பொருத்தமான மருந்துகளை மருந்தகத்தில் பெறலாம், அல்லது சிகிச்சைக்கு வரலாம்.']],
    therH: 'மருத்துவமனையில் சிகிச்சைகள்',
    therL: 'ஒவ்வொருவருக்கும் தனியாகத் திட்டமிடப்படும் பாரம்பரிய சிகிச்சை.',
    docH: 'மருத்துவரைச் சந்தியுங்கள்',
    docQ: 'உங்களைக் கேட்காமல் எதையும் பரிந்துரைப்பதில்லை. சில நாட்களில் அந்த உரையாடலே முழு வருகை.',
    docCta: 'அவரிடம் அழைப்பு கோருங்கள்',
    shopH: 'எங்கள் சொந்த மருந்தகத்திலிருந்து',
    shopL: 'கூடையில் சேர்த்து மருத்துவருக்கு அனுப்புங்கள். பொருத்தமானதை அவர் உறுதி செய்வார்.',
    shopAll: 'அனைத்துப் பொருட்களும்',
    whyH: 'குடும்பங்கள் எங்களைத் தேர்வு செய்வது ஏன்',
    why: [['முதலில் ஆலோசனை', 'எந்த மருந்துக்கும் முன் மருத்துவர் உங்களுடன் பேசுவார்.'], ['சொந்த மருந்தகம்', 'நர்மதா பொருட்கள் இங்கேயே தயாரிக்கப்படுகின்றன.'], ['பாரம்பரிய சிகிச்சைகள்', 'பஞ்சகர்மா, வர்மம், இலைக்கிழி, யோகா.'], ['உங்கள் மருத்துவருடன்', 'துணை சிகிச்சை. உங்கள் மருந்துகளை நிறுத்தச் சொல்வதில்லை.']],
    placeH: 'மருத்துவமனைக்குள்',
    faqH: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    endH: 'எங்கே தொடங்குவது என்று தெரியவில்லையா?',
    endL: 'உங்கள் பிரச்சினையை மருத்துவரிடம் சொல்லுங்கள். அவர் இலவசமாக அழைப்பார்.',
    orCall: 'அல்லது அழைக்கவும்',
  },
};

export default function HomeView({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const t = H[locale];
  const L = (p: string) => localePath(locale, p);
  const doc = c.doctors[0];
  const featured = ['narmadha-pain-care-oil', 'narmadha-kesha-raksha-oil', 'narmadha-bathing-soap', 'narmadha-seerana-sanjeevi-sooranam']
    .map(s => c.products.find(p => p.slug === s)!)
    .map(p => ({ slug: p.slug, name: p.name, category: p.category, summary: p.summary, image: p.image, href: L(`/products/${p.slug}`), form: productMeta[p.slug]?.form[locale], pack: productMeta[p.slug]?.pack }));
  const therapies = [
    { href: '/panchakarma', title: c.panchakarma.h1, body: c.offerings.tabs[0].summary, img: 'images/clinic/potli-therapy-session.webp' },
    { href: '/varmatherapy', title: c.varmatherapy.h1, body: c.home.pillars[1].body, img: 'images/clinic/varma-therapy-session.webp' },
    { href: '/offerings#de-stress', title: c.offerings.tabs[1].title, body: c.offerings.tabs[1].summary, img: 'images/clinic/body-therapy-session.webp' },
    { href: '/yoga-meditation', title: c.yoga.h1, body: c.home.pillars[2].body, img: 'images/clinic/yoga-meditation-hilltop.webp' },
    { href: '/treatments', title: c.nav.treatments, body: c.treatments.items.slice(0, 4).map(i => i.short).join(', ') + '…', img: 'images/clinic/shoulder-therapy-session.webp' },
  ];
  const gallery = ['team-green-uniform-pharmacy', 'therapists-preparing-herbs', 'lamp-and-flower-altar', 'therapists-in-white-coats', 'managing-director-in-pharmacy', 'therapists-grinding-herbs'];
  const whyArt = [Tulsi, Neem, Turmeric, Lotus];

  return (
    <main id="main" className="overflow-x-clip">
      {/* ============ HERO ============ */}
      <section className="relative">
        <div className="hero-glow" aria-hidden="true" />
        <div className="wrap relative grid items-center gap-8 pb-10 pt-6 md:pb-16 md:pt-12 lg:grid-cols-12 lg:gap-12 lg:pb-24">
          <div className="lg:col-span-6">
            <p className="fade-up inline-flex items-center gap-2 rounded-full border border-[var(--rule)] bg-card px-3 py-1.5 text-[0.82rem] font-semibold">
              <span className="relative flex h-2 w-2"><span className="absolute h-full w-full animate-ping rounded-full bg-leaf opacity-60" /><span className="relative h-2 w-2 rounded-full bg-leaf" /></span>
              {t.badge} · {c.site.city}
            </p>
            <h1 className="fade-up mt-5" style={{ ['--delay' as string]: '80ms', fontSize: 'clamp(2.6rem, 11vw, 5.4rem)', lineHeight: 0.98 }}><Rich t={t.h1} /></h1>
            <p className="fade-up mt-5 max-w-lg text-[1.05rem] leading-relaxed text-moss md:text-[1.15rem]" style={{ ['--delay' as string]: '160ms' }}>{t.lead}</p>
            <div className="fade-up mt-7 grid gap-3 sm:flex sm:flex-wrap" style={{ ['--delay' as string]: '240ms' }}>
              <ConsultButton className="btn btn-primary justify-center !min-h-[58px] !px-7 text-[1.05rem]">{t.talk} <span className="rounded-full bg-ink px-2 py-0.5 text-[0.72rem] font-bold uppercase tracking-wide text-paper">{t.free}</span></ConsultButton>
              <Link href={L('/products')} className="btn btn-ghost justify-center !min-h-[58px]">{t.shop}<Arrow /></Link>
            </div>
            <dl className="fade-up mt-8 grid grid-cols-3 gap-2 sm:max-w-md" style={{ ['--delay' as string]: '320ms' }}>
              {t.trust.map(([v, k]) => (
                <div key={k} className="rounded-2xl bg-card px-3 py-3 text-center shadow-[var(--shadow)]">
                  <dt className="sr-only">{k}</dt>
                  <dd className="m-0 font-display text-[1.9rem] leading-none">{v}</dd>
                  <p className="mt-1 text-[0.72rem] leading-tight text-moss">{k}</p>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative lg:col-span-6">
            <div className="clip-reveal relative mx-auto aspect-[4/4.4] w-full max-w-[30rem] overflow-hidden rounded-[28px] bg-ink">
              <Image src={src(doc.image!)} alt={`${doc.name}, ${doc.jobTitle}`} fill priority fetchPriority="high" sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover object-top" />
              <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-2xl bg-paper p-3 shadow-[var(--shadow)]">
                <div className="grid h-11 w-11 flex-none place-items-center rounded-full bg-leaf text-paper"><Check /></div>
                <div className="min-w-0">
                  <p className="font-semibold leading-tight">{doc.name}</p>
                  <p className="truncate text-[0.82rem] text-moss">{t.docCard} · {doc.experience}</p>
                </div>
              </div>
            </div>
            <div className="float-a absolute -left-1 top-6 hidden rounded-2xl bg-card px-4 py-3 shadow-[var(--shadow)] sm:block lg:-left-8">
              <p className="text-[0.75rem] font-semibold uppercase tracking-wider text-moss">WhatsApp · {c.cta.call}</p>
              <p className="mt-0.5 font-display text-[1.25rem] leading-tight">{t.bubble}</p>
            </div>
            <div className="float-b absolute -right-1 top-[38%] hidden w-28 overflow-hidden rounded-2xl bg-card p-2 shadow-[var(--shadow)] sm:block lg:-right-6">
              <div className="relative aspect-square overflow-hidden rounded-xl"><Image src="/images/products/narmadha-bathing-soap.webp" alt="" fill sizes="112px" className="object-cover" /></div>
              <p className="mt-1.5 text-center text-[0.75rem] font-semibold leading-tight">Narmadha</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONCERNS ============ */}
      <section className="wrap pb-14 md:pb-20">
        <div className="rounded-[28px] bg-ink p-5 text-paper sm:p-8 md:p-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-[2rem] leading-none md:text-[2.8rem]">{t.concernH}</h2>
            <p className="text-[0.95rem] text-sage">{t.concernL}</p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            {CONCERNS[locale].map(x => (
              <ConsultButton key={x} concern={x} className="concern-tile">
                <span>{x}</span><Arrow s={16} />
              </ConsultButton>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="wrap pb-16 md:pb-24">
        <h2 className="text-[2.1rem] leading-none md:text-[3rem]">{t.howH}</h2>
        <ol className="m-0 mt-7 grid list-none gap-3 p-0 md:grid-cols-3 md:gap-5">
          {t.how.map(([h, b], i) => (
            <li key={h} className="relative flex gap-4 rounded-3xl bg-card p-5 shadow-[var(--shadow)] md:block md:p-7" data-reveal="" style={{ ['--d' as string]: `${i * 90}ms` }}>
              <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-turmeric font-display text-[1.5rem] md:h-14 md:w-14">{i + 1}</span>
              <div>
                <h3 className="text-[1.5rem] leading-tight md:mt-5 md:text-[1.8rem]">{h}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-snug text-moss">{b}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ============ THERAPIES ============ */}
      <section className="pb-16 md:pb-24">
        <div className="wrap flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-[2.1rem] leading-none md:text-[3rem]">{t.therH}</h2>
            <p className="mt-2 max-w-md text-moss">{t.therL}</p>
          </div>
          <Link href={L('/treatments')} className="link font-semibold">{c.cta.viewAll} →</Link>
        </div>
        <div className="snap-row mt-7">
          {therapies.map(th => (
            <Link key={th.href} href={L(th.href)} className="ther-card group">
              <Image src={src(th.img)} alt="" fill sizes="(min-width: 1024px) 22rem, 78vw" className="object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="ther-shade" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-paper">
                <h3 className="text-[1.75rem] leading-none">{th.title}</h3>
                <p className="mt-2 line-clamp-2 text-[0.9rem] text-[rgb(244_236_221/0.88)]">{th.body}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-[0.88rem] font-semibold">{c.cta.learnMore}<Arrow s={14} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ DOCTOR ============ */}
      <section className="wrap pb-16 md:pb-24">
        <div className="grid overflow-hidden rounded-[28px] bg-leaf text-paper md:grid-cols-2">
          <div className="relative aspect-[4/3.6] md:aspect-auto md:min-h-[30rem]">
            <Image src="/images/clinic/managing-director-in-pharmacy.webp" alt={doc.name} fill sizes="(min-width: 768px) 46vw, 92vw" className="object-cover" loading="lazy" />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-sage">{t.docH}</p>
            <h2 className="mt-3 text-[2.4rem] leading-none md:text-[3.2rem]">{doc.name}</h2>
            <p className="mt-2 text-sage">{doc.jobTitle} · {doc.experience}</p>
            <blockquote className="m-0 mt-6 border-l-2 border-turmeric pl-4 font-display text-[1.45rem] leading-snug md:text-[1.7rem]">“{t.docQ}”</blockquote>
            <ConsultButton className="btn btn-primary mt-8 w-full justify-center sm:w-fit">{t.docCta}<Arrow /></ConsultButton>
          </div>
        </div>
      </section>

      {/* ============ SHOP ============ */}
      <section className="wrap pb-16 md:pb-24">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-[2.1rem] leading-none md:text-[3rem]">{t.shopH}</h2>
            <p className="mt-2 max-w-lg text-moss">{t.shopL}</p>
          </div>
          <Link href={L('/products')} className="link hidden font-semibold sm:inline-block">{t.shopAll} →</Link>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {featured.map(p => <ProductCard key={p.slug} p={p} />)}
        </div>
        <Link href={L('/products')} className="btn btn-ghost mt-6 w-full justify-center sm:hidden">{t.shopAll}<Arrow /></Link>
      </section>

      {/* ============ WHY US ============ */}
      <section className="bg-mint py-16 md:py-24">
        <div className="wrap">
          <h2 className="text-[2.1rem] leading-none md:text-[3rem]">{t.whyH}</h2>
          <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {t.why.map(([h, b], i) => {
              const Art = whyArt[i];
              return (
                <li key={h} className="flex gap-4 rounded-3xl bg-card p-5 shadow-[var(--shadow)] lg:block lg:p-6" data-reveal="" style={{ ['--d' as string]: `${i * 80}ms` }}>
                  <Art className="h-14 w-auto flex-none text-leaf lg:h-20" />
                  <div><h3 className="text-[1.4rem] leading-tight lg:mt-4">{h}</h3><p className="mt-1 text-[0.93rem] leading-snug text-moss">{b}</p></div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ============ PLACE ============ */}
      <section className="py-16 md:py-24">
        <div className="wrap flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-[2.1rem] leading-none md:text-[3rem]">{t.placeH}</h2>
          <Link href={L('/gallery')} className="link font-semibold">{c.nav.gallery} →</Link>
        </div>
        <div className="snap-row mt-7">
          {gallery.map(g => (
            <Link key={g} href={L('/gallery')} className="relative aspect-[4/5] w-[62vw] max-w-[17rem] flex-none snap-start overflow-hidden rounded-3xl bg-paper2">
              <Image src={`/images/clinic/${g}.webp`} alt="" fill sizes="17rem" className="object-cover" loading="lazy" />
            </Link>
          ))}
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="wrap grid gap-8 pb-16 md:grid-cols-12 md:pb-24">
        <h2 className="text-[2.1rem] leading-none md:col-span-4 md:text-[3rem]">{t.faqH}</h2>
        <div className="md:col-span-8">
          {c.faq.map(f => (
            <details key={f.q} className="faq-card">
              <summary>{f.q}<svg className="plus" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg></summary>
              <p className="pb-5 pr-6 text-[0.98rem] text-moss">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ============ END CTA ============ */}
      <section className="wrap pb-6">
        <div className="relative overflow-hidden rounded-[28px] bg-ink px-6 py-10 text-center text-paper sm:px-10 md:py-16">
          <div className="mx-auto mb-6 flex w-fit -space-x-3">
            {['images/doctors/s-rajkapoor.webp', 'images/clinic/therapists-in-white-coats.webp', 'images/doctors/mrs-r-shanthi.webp'].map(i => (
              <div key={i} className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-ink bg-paper2"><Image src={src(i)} alt="" fill sizes="56px" className="object-cover object-top" loading="lazy" /></div>
            ))}
          </div>
          <h2 className="text-[2.3rem] leading-none md:text-[3.4rem]">{t.endH}</h2>
          <p className="mx-auto mt-4 max-w-md text-[rgb(244_236_221/0.85)]">{t.endL}</p>
          <ConsultButton className="btn btn-primary mx-auto mt-8 w-full max-w-sm justify-center !min-h-[58px] text-[1.05rem]">{t.talk}<Arrow /></ConsultButton>
          <p className="mt-4 text-[0.92rem] text-sage">{t.orCall} <a href={telHref(c.site.phones[0])} className="font-semibold text-paper underline underline-offset-4">{c.site.phones[0]}</a></p>
        </div>
      </section>
    </main>
  );
}
