import Image from 'next/image';
import Link from 'next/link';
import { type Locale, getContent, localePath, waLink, telHref, consultMsg } from '@/lib/content';
import images from '@/content/images.json';
import Rich from './Rich';
import TreatmentIndex from './TreatmentIndex';
import GalleryGrid, { type Shot } from './GalleryGrid';
import { AddButton } from './cart/CartButtons';
import { MessageArt, LampArt, MortarArt, Tulsi, Neem } from './Botanicals';

const src = (p: string) => `/${p}`;
const Arrow = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

function Sec({ n, label }: { n: string; label: string }) {
  return <div className="secno label"><span>{n}</span><span>{label}</span></div>;
}
function LineHead({ lines, className = '', style }: { lines: string[]; className?: string; style?: React.CSSProperties }) {
  return (
    <h2 data-lines="" className={className} style={style}>
      {lines.map((l, i) => <span key={i} className="line" style={{ ['--i' as string]: i }}><span><Rich t={l} /></span></span>)}
    </h2>
  );
}

export default function HomeView({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const h = c.home;
  const S = h.sections;
  const wa = waLink(c.site.whatsapp, consultMsg(locale));
  const people = c.doctors.filter(d => d.published);

  // treatments: ten rows, photos cycle through the real clinic photographs
  const tPhotos = [
    ['images/clinic/potli-therapy-session.webp', 'Herbal potli therapy'], ['images/clinic/varma-therapy-session.webp', 'Varma therapy session'],
    ['images/clinic/shoulder-therapy-session.webp', 'Therapist treating the shoulder'], ['images/clinic/body-therapy-session.webp', 'Body therapy session'],
    ['images/clinic/therapists-preparing-herbs.webp', 'Preparing fresh herbs'], ['images/clinic/yoga-meditation-hilltop.webp', 'Meditation on a hilltop'],
    ['images/clinic/therapists-grinding-herbs.webp', 'Grinding medicinal leaves'], ['images/clinic/lamp-and-flower-altar.webp', 'Lamp and marigolds'],
  ];
  const rows = c.treatments.items.filter(i => i.slug !== 'motor-neuron-disease').map((it, n) => ({
    slug: it.slug, title: it.short, href: localePath(locale, `/treatments#${it.slug}`), img: src(tPhotos[n % tPhotos.length][0]), alt: tPhotos[n % tPhotos.length][1],
  }));

  const galleryFiles = ['clinic/team-green-uniform-pharmacy', 'clinic/therapists-preparing-herbs', 'clinic/lamp-and-flower-altar', 'clinic/potli-therapy-session', 'clinic/therapists-in-white-coats', 'clinic/managing-director-in-pharmacy', 'clinic/varma-therapy-session', 'clinic/therapists-grinding-herbs', 'clinic/team-in-reception', 'clinic/body-therapy-session'];
  const shots: Shot[] = galleryFiles.map(f => {
    const m = images.find(i => i.file === `images/${f}.webp`)!;
    return { src: src(m.file), w: m.width, h: m.height, alt: locale === 'ta' ? m.alt.ta : m.alt.en };
  });

  const arts = [MessageArt, LampArt, MortarArt];

  return (
    <main id="main">
      {/* ================= 00 Hero: the photograph is the LCP and is never animated ================= */}
      <section className="hero">
        <div className="hero-img"><Image src={src(h.hero.image)} alt={h.hero.imageAlt} fill priority fetchPriority="high" quality={72} sizes="100vw" /></div>
        <div className="hero-tone" aria-hidden="true" />
        <div className="wrap hero-body">
          <p className="label inline-block bg-ink px-3 py-2">{c.site.city} · {c.site.address.region}</p>
          <h1 className="lines mt-6">
            {h.hero.lines.map((l, i) => <span key={i} className="line" style={{ ['--i' as string]: i }}><span><Rich t={l} /></span></span>)}
          </h1>
          <div className="mt-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <a href={wa} className="btn btn-primary">{c.cta.freeConsult}<Arrow /></a>
            <p className="caption inline-block bg-ink px-3 py-2">{h.hero.caption}</p>
          </div>
        </div>
      </section>

      {/* ================= 01 Story: image pins, text steps scroll past ================= */}
      <section id="story" className="py-24 md:py-36" data-story>
        <div className="wrap">
          <Sec n="01" label={S.story} />
          <div className="story-grid mt-14">
            <div className="story-visual" aria-hidden="true">
              {h.story.map((st, i) => (
                <div key={st.image} className="frame" data-frame data-on={i === 0}>
                  <Image src={src(st.image)} alt="" fill sizes="50vw" className="object-cover" loading="lazy" />
                </div>
              ))}
            </div>
            <div className="story-steps">
              {h.story.map((st, i) => (
                <article key={st.title} data-step>
                  <figure className="story-mobile-fig" data-reveal="">
                    <div className="relative aspect-[4/3]"><Image src={src(st.image)} alt={st.alt} fill sizes="92vw" className="object-cover" loading="lazy" /></div>
                  </figure>
                  <p className="label text-moss">0{i + 1} · {st.kicker}</p>
                  <h3 className="mt-4" data-lines=""><span className="line"><span><Rich t={st.title} /></span></span></h3>
                  <p className="body mt-6 max-w-md text-[1.1rem]">{st.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 02 Treatments: an index, not an icon grid ================= */}
      <section className="alt py-24 md:py-36">
        <div className="wrap">
          <Sec n="02" label={S.treatments} />
          <div className="mt-14 grid gap-8 md:grid-cols-12">
            <LineHead lines={[S.treatments]} className="md:col-span-7" style={{ fontSize: 'var(--fs-h1)' }} />
            <p className="max-w-sm md:col-span-4 md:col-start-9 md:pt-8" style={{ fontSize: 'var(--fs-lead)', lineHeight: 1.55 }}>{S.treatmentsLead}</p>
          </div>
          <div className="mt-16"><TreatmentIndex rows={rows} more={c.cta.learnMore} /></div>
          <p className="mt-8 max-w-2xl text-[0.95rem] text-moss">{c.treatments.emergencyNote}</p>
        </div>
      </section>

      {/* ================= 03 How consultation works ================= */}
      <section id="how" className="on-dark py-24 md:py-36">
        <div className="wrap">
          <Sec n="03" label={S.how} />
          <LineHead lines={[S.how]} className="mt-14 max-w-3xl" style={{ fontSize: 'var(--fs-h1)' }} />
          <div className="relative mt-20">
            <svg className="botanical drawline pointer-events-none absolute left-0 top-[5.5rem] hidden w-full text-sage md:block" viewBox="0 0 1000 60" data-draw="" aria-hidden="true" focusable="false" style={{ strokeWidth: 1.2 }}>
              <path pathLength={1} d="M0 30C120 -6 230 66 340 30S560 -6 670 30S890 66 1000 30" />
            </svg>
            <ol className="relative m-0 grid list-none gap-16 p-0 md:grid-cols-3 md:gap-10">
              {h.howItWorks.steps.map((s, i) => {
                const Art = arts[i];
                return (
                  <li key={s.title} className={i === 1 ? 'md:mt-16' : i === 2 ? 'md:mt-6' : ''} data-reveal="" style={{ ['--d' as string]: `${i * 120}ms` }}>
                    <div className="inline-block bg-ink pr-4"><Art className="h-40 w-auto text-paper" /></div>
                    <p className="label mt-6 text-sage">0{i + 1} · {h.stepsArt[i]}</p>
                    <h3 className="mt-3" style={{ fontSize: 'var(--fs-h3)', lineHeight: 1.05 }}>{s.title}</h3>
                    <p className="mt-4 max-w-xs text-[rgb(244_236_221/0.88)]">{s.body}</p>
                  </li>
                );
              })}
            </ol>
          </div>
          <p className="mt-16 text-[0.95rem] text-[rgb(244_236_221/0.8)]">{h.howItWorks.note}</p>
        </div>
      </section>

      {/* ================= 04 People ================= */}
      <section className="py-24 md:py-36">
        <div className="wrap">
          <Sec n="04" label={S.people} />
          <div className="mt-14 grid gap-16 md:grid-cols-12 md:gap-y-0">
            {people.map((d, i) => (
              <figure key={d.slug} className={`m-0 ${i === 0 ? 'md:col-span-6' : 'md:col-span-5 md:col-start-8 md:mt-40'}`} data-reveal="">
                <div className="relative aspect-[4/5] bg-ink">
                  {d.image && <Image src={src(d.image)} alt={locale === 'ta' ? `${d.name} உருவப்படம்` : `Portrait of ${d.name}`} fill sizes="(min-width: 768px) 46vw, 92vw" className="object-cover object-top" loading="lazy" />}
                </div>
                <figcaption className="mt-6">
                  <p className="label text-moss">{d.jobTitle}</p>
                  <h3 className="mt-2" style={{ fontSize: 'var(--fs-h2)' }}>{d.name}</h3>
                  <p className="mt-4 max-w-md">{(h.peopleStory as Record<string, string>)[d.slug]}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 05 The place: masonry, soft parallax, lightbox ================= */}
      <section className="alt py-24 md:py-36">
        <div className="wrap">
          <Sec n="05" label={S.gallery} />
          <div className="mt-14 flex items-end justify-between gap-8">
            <LineHead lines={[S.gallery]} style={{ fontSize: 'var(--fs-h1)' }} />
            <Tulsi className="hidden h-44 w-auto text-moss md:block" />
          </div>
          <div className="mt-14"><GalleryGrid shots={shots} labels={{ open: locale === 'ta' ? 'பெரிதாகப் பார்' : 'Open photo', close: c.nav.close, prev: locale === 'ta' ? 'முந்தையது' : 'Previous', next: locale === 'ta' ? 'அடுத்தது' : 'Next' }} /></div>
          <p className="mt-6 text-[0.9rem] text-moss">{c.gallery.note}</p>
        </div>
      </section>

      {/* ================= 06 Products: jars on one shelf, one horizontal strip ================= */}
      <section className="py-24 md:py-36">
        <div className="wrap">
          <Sec n="06" label={S.products} />
          <div className="mt-14 grid gap-8 md:grid-cols-12">
            <LineHead lines={[S.products]} className="md:col-span-7" style={{ fontSize: 'var(--fs-h1)' }} />
            <p className="max-w-sm md:col-span-4 md:col-start-9 md:pt-8" style={{ fontSize: 'var(--fs-lead)', lineHeight: 1.55 }}>{S.productsLead}</p>
          </div>
          <div className="mt-16">
            <div className="strip" tabIndex={0} role="region" aria-label={S.products}>
              {c.products.map(p => {
                const href = localePath(locale, `/products/${p.slug}`);
                return (
                  <div key={p.slug} className="jar-item pcard w-[17rem] sm:w-[19rem]">
                    <Link href={href} className="pcard-img" tabIndex={-1} aria-hidden="true">
                      <span className="pcard-tag">{p.category}</span>
                      <Image src={src(p.image)} alt="" fill sizes="19rem" loading="lazy" />
                    </Link>
                    <h3 className="mt-4"><Link href={href}>{p.name}</Link></h3>
                    <p className="mt-1 line-clamp-2 flex-1 text-[0.95rem] text-moss">{p.summary}</p>
                    <AddButton slug={p.slug} className="mt-4 w-full" />
                  </div>
                );
              })}
            </div>
            <p className="mt-6 text-[0.95rem] text-moss">{h.howItWorks.note}</p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              <Link href={localePath(locale, '/products')} className="btn btn-primary">{c.cta.viewAll}<Arrow /></Link>
              <a href={wa} className="link font-semibold">{c.cta.consult}</a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 07 Voices: only with written permission ================= */}
      <section className="alt py-24 md:py-32">
        <div className="wrap">
          <Sec n="07" label={S.voices} />
          <div className="mt-12 grid items-start gap-10 md:grid-cols-12">
            <Neem className="hidden h-52 w-auto text-moss md:col-span-2 md:block" />
            <p className="placeholder-note md:col-span-8">{h.voicesPlaceholder}</p>
          </div>
        </div>
      </section>

      {/* ================= 08 FAQ ================= */}
      <section className="py-24 md:py-36">
        <div className="wrap grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4"><Sec n="08" label={S.faq} /><LineHead lines={[S.faq]} className="mt-10" style={{ fontSize: 'var(--fs-h1)' }} /></div>
          <div className="md:col-span-7 md:col-start-6 md:pt-16">
            {c.faq.map(f => (
              <details key={f.q} className="faq">
                <summary>{f.q}<svg className="plus" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg></summary>
                <p className="max-w-xl pb-8 text-[1.05rem]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Closing line ================= */}
      <section className="wrap pb-8 pt-4 text-center">
        <p className="mx-auto max-w-4xl" style={{ fontFamily: 'var(--display)', fontSize: 'var(--fs-h1)', lineHeight: 1 }}><Rich t={locale === 'ta' ? 'முதலில் மருத்துவருடன் *பேசுங்கள்*.' : 'Come and *talk* to the doctor first.'} /></p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href={wa} className="btn btn-primary">{c.cta.freeConsult}<Arrow /></a>
          <a href={telHref(c.site.phones[0])} className="btn btn-ghost">{c.cta.call} · {c.site.phones[0]}</a>
        </div>
      </section>
    </main>
  );
}
