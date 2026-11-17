import type { Metadata } from 'next';
import Image from 'next/image';
import { Tulsi, Neem, Turmeric, Ashwagandha, Lotus, KolamRule } from '@/components/Botanicals';
import { MotionDemo, TreatmentIndex } from './Demos';

export const metadata: Metadata = { title: 'Design system proposal', robots: { index: false, follow: false } };

const swatches = [
  { n: 'Paper', v: '#F4ECDD', css: '--paper', role: 'Main background', c: 'Ink on it: 11.4 (AAA)', dark: false },
  { n: 'Deeper paper', v: '#E9DEC8', css: '--paper-2', role: 'Alternate sections, placeholders', c: 'Ink on it: 10.0 (AAA)', dark: false },
  { n: 'Ink green', v: '#1D3428', css: '--ink', role: 'All text, dark sections', c: 'Paper on it: 11.4 (AAA)', dark: true },
  { n: 'Moss', v: '#3D5A40', css: '--moss', role: 'Secondary text, small numerals', c: 'On paper: 6.5 (AA)', dark: true },
  { n: 'Sage', v: '#A9B89A', css: '--sage', role: 'Fills, plaques, lines on dark', c: 'On paper: 1.8 (decorative). On ink: 6.4', dark: false },
  { n: 'Turmeric', v: '#D4962E', css: '--turmeric', role: 'The one accent: primary button fill, selection', c: 'On paper: 2.2 (never text). Ink on it: 5.2', dark: false },
  { n: 'Clay', v: '#A5563A', css: '--clay', role: 'Rare: one word, one mark per page', c: 'On paper: 4.48 (24px+ or graphics only)', dark: true },
];

const scale = [
  ['Hero', '--fs-hero', 'clamp(3.4rem, 12.5vw, 9rem)', '55 / 200 / 144 px', 'Home headline only'],
  ['H1', '--fs-h1', 'clamp(2.9rem, 8.5vw, 6.5rem)', '46 / 140 / 104 px', 'Inner page titles'],
  ['H2', '--fs-h2', 'clamp(2.2rem, 5.6vw, 4.25rem)', '35 / 92 / 68 px', 'Section titles, treatment index'],
  ['H3', '--fs-h3', 'clamp(1.55rem, 3vw, 2.25rem)', '25 / 61 / 36 px', 'Step titles, product names'],
  ['Lead', '--fs-lead', 'clamp(1.15rem, 1.6vw, 1.4rem)', '18 / 23 / 22 px', 'Intro paragraphs'],
  ['Body', '--fs-body', '1.0625rem', '17 px', 'Reading text, line-height 1.75'],
  ['Label', '--fs-label', '0.75rem, +0.2em, caps', '12 px', 'Eyebrows, section numbers, UI'],
];

const space = [4, 8, 12, 16, 24, 32, 48, 64, 96, 144, 192];

const Sec = ({ n, title, children, dark = false, alt = false }: { n: string; title: string; children: React.ReactNode; dark?: boolean; alt?: boolean }) => (
  <section className={`py-20 md:py-28 ${dark ? 'on-dark' : alt ? 'alt' : ''}`}>
    <div className="wrap">
      <div className="secno label"><span>{n}</span><span>{title}</span></div>
      <div className="mt-12">{children}</div>
    </div>
  </section>
);

export default function DesignSystem() {
  return (
    <main>
      {/* ---------------- Cover ---------------- */}
      <header className="wrap pb-16 pt-14 md:pb-24 md:pt-24">
        <p className="label">Design system · Proposal for approval · Not yet built into pages</p>
        <h1 className="mt-8" style={{ fontSize: 'var(--fs-hero)' }}>Palm-leaf <em>and</em><br />morning light</h1>
        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <p className="md:col-span-6 md:col-start-6" style={{ fontSize: 'var(--fs-lead)', lineHeight: 1.6 }}>
            A warm paper world: palm-leaf manuscripts, ink lines, a dispensary at sunrise. Big serif type, real photographs of the real place, and nothing that looks like a template. Everything below is a live component, not a picture of one.
          </p>
        </div>
        <div className="mt-14"><KolamRule className="text-moss" /></div>
      </header>

      {/* ---------------- 01 Palette ---------------- */}
      <Sec n="01" title="Colour" alt>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {swatches.map(s => (
            <div key={s.css}>
              <div className="flex aspect-[4/3] items-end p-4" style={{ background: s.v, color: s.dark ? '#F4ECDD' : '#1D3428', border: '1px solid var(--rule)' }}>
                <span className="font-display text-3xl">{s.n}</span>
              </div>
              <p className="label mt-3">{s.v} · <span className="normal-case tracking-normal">{s.css}</span></p>
              <p className="mt-1 text-[0.95rem]">{s.role}</p>
              <p className="mt-1 text-[0.85rem] text-moss">{s.c}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 grid gap-8 border-t border-[var(--rule)] pt-10 md:grid-cols-3">
          <p><span className="label block">Hairlines</span>Ink at 15% opacity, 1px. The only way sections and rows are divided.</p>
          <p><span className="label block">Backgrounds</span>Paper with a 500-byte tiled grain; deeper paper for alternate bands; ink green for dark bands with paper-coloured text. No pure white, no pure black, no gradients. A paper-tone vignette on the hero only, if wanted.</p>
          <p><span className="label block">Contrast rules (computed)</span>Turmeric and sage are never text on paper (2.2 and 1.8). Turmeric is a fill with ink text (5.2), or text on ink green. Clay (4.48, just under 4.5) is limited to large type and graphics.</p>
        </div>
      </Sec>

      {/* ---------------- 02 Type ---------------- */}
      <Sec n="02" title="Typography: choose one display face and one body face">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="label">A · Cormorant Garamond</p>
            <p className="mt-4" style={{ fontFamily: 'var(--f-cormorant)', fontSize: 'clamp(3.4rem, 9vw, 7rem)', lineHeight: 0.95, letterSpacing: '-0.02em', fontWeight: 400 }}>Calm care, <em>rooted</em> in Tirunelveli</p>
            <p className="mt-6" style={{ fontFamily: 'var(--f-cormorant)', fontSize: '1.6rem', lineHeight: 1.2, fontWeight: 500 }}>Panchakarma, Varma and <em>herbal</em> care</p>
            <p className="mt-4 text-[0.95rem] text-moss">Classic, high-contrast and elegant. Hairlines get thin at small sizes, so it is used from 24px up only, at weight 400–500. Has real italics.</p>
          </div>
          <div>
            <p className="label">B · Instrument Serif</p>
            <p className="mt-4" style={{ fontFamily: 'var(--f-instrument)', fontSize: 'clamp(3.4rem, 9vw, 7rem)', lineHeight: 0.95, letterSpacing: '-0.02em' }}>Calm care, <em>rooted</em> in Tirunelveli</p>
            <p className="mt-6" style={{ fontFamily: 'var(--f-instrument)', fontSize: '1.6rem', lineHeight: 1.2 }}>Panchakarma, Varma and <em>herbal</em> care</p>
            <p className="mt-4 text-[0.95rem] text-moss">Narrower and more contemporary-editorial, with a sturdier stroke that holds up better on small phones. One weight (400), which suits the hand-set feel.</p>
          </div>
        </div>

        <div className="mt-16 grid gap-12 border-t border-[var(--rule)] pt-12 md:grid-cols-2">
          <div>
            <p className="label">Body · Hanken Grotesk</p>
            <p className="mt-4 max-w-md" style={{ fontFamily: 'var(--f-hanken)', fontSize: '1.0625rem', lineHeight: 1.75 }}>When you come to us, the doctor speaks with you first. We ask about your health, your food and your sleep, and only then suggest anything. 90037 77757.</p>
          </div>
          <div>
            <p className="label">Body · DM Sans</p>
            <p className="mt-4 max-w-md" style={{ fontFamily: 'var(--f-dmsans)', fontSize: '1.0625rem', lineHeight: 1.75 }}>When you come to us, the doctor speaks with you first. We ask about your health, your food and your sleep, and only then suggest anything. 90037 77757.</p>
          </div>
        </div>

        <div className="mt-16 grid gap-12 border-t border-[var(--rule)] pt-12 md:grid-cols-2" lang="ta">
          <div>
            <p className="label">Tamil display · Noto Serif Tamil</p>
            <p className="mt-4" style={{ fontFamily: 'var(--f-ta-serif)', fontSize: 'clamp(1.9rem, 4.2vw, 3.4rem)', lineHeight: 1.28, fontWeight: 500 }}>திருநெல்வேலியில் அமைதியான பராமரிப்பு</p>
          </div>
          <div>
            <p className="label">Tamil body · Noto Sans Tamil</p>
            <p className="mt-4 max-w-md" style={{ fontFamily: 'var(--f-ta-sans)', fontSize: '1.0625rem', lineHeight: 1.9 }}>மருத்துவர் முதலில் உங்களிடம் பேசுவார். உங்கள் ஆரோக்கியம், உணவு, உறக்கம் பற்றிக் கேட்ட பிறகே எதையும் பரிந்துரைப்பார்.</p>
          </div>
        </div>

        <div className="mt-16 grid gap-6 border-t border-[var(--rule)] pt-10 md:grid-cols-12">
          <p className="label md:col-span-3">My recommendation</p>
          <p className="md:col-span-8" style={{ fontSize: 'var(--fs-lead)', lineHeight: 1.55 }}><em className="font-display">Instrument Serif</em> for display and <strong>Hanken Grotesk</strong> for body. At hero size Instrument is more characterful and less “wedding invitation” than Cormorant; its sturdier strokes survive a 390px phone; and one weight keeps the page light (one font file). Cormorant is the safer, more classical choice if you prefer softness. Hanken has clearer numerals for phone numbers than DM Sans.</p>
        </div>

        <div className="mt-16 overflow-x-auto border-t border-[var(--rule)] pt-8">
          <table className="w-full min-w-[40rem] border-collapse text-left text-[0.92rem]">
            <thead><tr className="label"><th className="py-3 pr-4">Role</th><th className="pr-4">Token</th><th className="pr-4">Size</th><th className="pr-4">At 390 / 1440 / 820</th><th>Use</th></tr></thead>
            <tbody>
              {scale.map(r => <tr key={r[0]} className="border-t border-[var(--rule)] align-top">{r.map((c, i) => <td key={i} className="py-3 pr-4">{c}</td>)}</tr>)}
            </tbody>
          </table>
          <p className="mt-6 max-w-2xl text-[0.95rem] text-moss">Display type: weight 400, leading 0.98, tracking −2%, italic words for emphasis. Tamil words are long and wide, so Tamil display type is set at about 55% of the Latin size (a documented second scale: hero 40–90px, H1 35–67px, H2 29–46px) with leading 1.28 and no negative tracking. Found by testing: at 70% a single Tamil word overflowed its column. All fonts are self-hosted by next/font and subset (Latin and Tamil only).</p>
        </div>
      </Sec>

      {/* ---------------- 03 Spacing ---------------- */}
      <Sec n="03" title="Spacing and grid" alt>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="label">4px base scale (px)</p>
            <div className="mt-6 grid gap-2">
              {space.map(s => <div key={s} className="flex items-center gap-4"><span className="w-10 text-[0.8rem] text-moss">{s}</span><span className="h-3 bg-ink" style={{ width: s * 1.6 }} /></div>)}
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="label">Grid</p>
            <p className="mt-4">12 columns, max width 1472px, gutter <code>clamp(20px, 4vw, 56px)</code>. Sections breathe: 80px of vertical padding on phones, 112–144px on desktop. Blocks are deliberately placed off-grid: an image may start on column 2 and bleed off the right edge, a headline may sit on columns 1–8 with its caption on 9–12, three rows lower. Never three equal cards in a row.</p>
            <p className="mt-6">Touch targets are 48px or more. Reading width is capped near 62 characters. Body text never goes below 17px.</p>
          </div>
        </div>
      </Sec>

      {/* ---------------- 04 Components ---------------- */}
      <Sec n="04" title="Components">
        <div className="grid gap-16">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3"><p className="label">Buttons and links</p></div>
            <div className="flex flex-wrap items-center gap-5 md:col-span-9">
              <a href="#" className="btn btn-primary">Free consultation on WhatsApp<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
              <a href="#" className="btn btn-ghost">Call 90037 77757</a>
              <a href="#" className="link font-semibold">Read about Panchakarma</a>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3"><p className="label">Section number and rule</p></div>
            <div className="md:col-span-9"><div className="secno label"><span>01</span><span>Treatments</span></div></div>
          </div>

          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3"><p className="label">Treatments index<br /><span className="normal-case tracking-normal text-moss">Hover or tap a row</span></p></div>
            <div className="md:col-span-9"><TreatmentIndex /></div>
          </div>

          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3"><p className="label">Palm-leaf plaque</p></div>
            <div className="md:col-span-9"><span className="leaf-strip label">Morning consultations · Tirunelveli</span></div>
          </div>

          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3"><p className="label">Product on the shelf<br /><span className="normal-case tracking-normal text-moss">Not a shop: two actions</span></p></div>
            <div className="md:col-span-9">
              <div className="max-w-3xl">
                <div className="flex items-end gap-5 sm:gap-8">
                  {[['Bathing soap', 'குளியல் சோப்பு', 'w-[30%]', 'pb-0'], ['Pain care oil', 'வலி நிவாரண எண்ணெய்', 'w-[24%]', 'pb-0'], ['Kesha raksha oil', 'கேசரக்சா எண்ணெய்', 'w-[27%]', 'pb-0'], ['Omam water', 'ஓமவாட்டர்', 'w-[19%]', 'pb-0']].map(([e, t, w]) => (
                    <a key={e} href="#" className={`jar no-underline ${w}`} style={{ color: 'inherit' }}>
                      <div className="jar-lid" style={{ width: '50%' }} />
                      <div className="jar-body !w-full" style={{ paddingBlock: e === 'Omam water' ? '0.7rem' : e === 'Pain care oil' ? '1.6rem' : '1rem' }}>
                        <div className="jar-label"><p className="label !text-[0.6rem]">Narmadha</p><p className="font-display mt-1 text-[1.15rem] leading-tight sm:text-[1.35rem]">{e}</p><p className="mt-1 text-[0.8rem] text-moss" lang="ta">{t}</p></div>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="jar-shelf" />
                <div className="mt-5 flex flex-wrap items-center gap-5"><a href="#" className="btn btn-ghost !min-h-[48px] !px-4 text-[0.92rem]">Add to list</a><a href="#" className="link text-[0.92rem] font-semibold">Consult on WhatsApp</a><span className="label text-moss">Shown on hover / tap, and on each product page</span></div>
              </div>
              <p className="mt-6 max-w-xl text-[0.9rem] text-moss">Jars of different sizes on one continuous shelf, each with a paper label (never a grid of equal cards). Product photography replaces the drawn jar once clean packshots exist (the old ads carry claim text).</p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3"><p className="label">Photo placeholder<br /><span className="normal-case tracking-normal text-moss">Always labelled</span></p></div>
            <div className="grid gap-6 sm:grid-cols-2 md:col-span-9">
              <div className="placeholder aspect-[4/3]"><p className="label">Photo needed: hospital entrance at 7 a.m., doctor at the door</p></div>
              <div className="placeholder aspect-[4/3]"><p className="label">Photo needed: herbs drying on the terrace</p></div>
            </div>
          </div>
        </div>
      </Sec>

      {/* ---------------- 05 Illustration ---------------- */}
      <Sec n="05" title="Illustration: botanical line art, one stroke weight" dark>
        <div className="draw grid grid-cols-2 gap-x-6 gap-y-12 text-paper md:grid-cols-5" style={{ ['--len' as string]: 1400 }}>
          {[[Tulsi, 'Tulsi', 'துளசி'], [Neem, 'Neem', 'வேம்பு'], [Turmeric, 'Turmeric', 'மஞ்சள்'], [Ashwagandha, 'Ashwagandha', 'அமுக்கரா'], [Lotus, 'Lotus', 'தாமரை']].map(([C, e, t]) => {
            const Comp = C as typeof Tulsi;
            return <figure key={e as string} className="m-0 text-center"><Comp className="mx-auto h-56 w-auto" title={`${e} line drawing`} /><figcaption className="label mt-4">{e as string}<span className="mt-1 block !normal-case !tracking-normal text-sage" lang="ta">{t as string}</span></figcaption></figure>;
          })}
        </div>
        <div className="mt-16 grid items-center gap-10 border-t border-[rgb(244_236_221/0.2)] pt-12 md:grid-cols-12">
          <div className="md:col-span-5"><KolamRule className="text-sage" /><p className="label mt-3">Kolam divider (pulli dots and pinched loops)</p></div>
          <p className="md:col-span-6 md:col-start-7 text-[1.02rem] text-[rgb(244_236_221/0.9)]">All five plants are built from the same leaf shape at a constant 1.5px stroke with round ends, so they read as one hand. Used sparingly: as marginalia next to a heading, as a divider, as the loading mark. Each is about 1 KB of inline SVG. Lines can be drawn on as you scroll (stroke offset, no JavaScript needed for the effect itself).</p>
        </div>
      </Sec>

      {/* ---------------- 06 Layout study ---------------- */}
      <Sec n="06" title="Layout study: hero and story, not a template">
        <div className="relative grid gap-y-10 md:grid-cols-12 md:gap-x-6">
          <div className="relative md:col-span-8 md:row-span-2">
            <div className="relative aspect-[4/3] md:aspect-[16/11]">
              <Image src="/images/clinic/team-at-shopfront.webp" alt="The Sri Dhanvanthri team standing at the green shopfront of the herbal pharmacy" fill sizes="(min-width: 768px) 62vw, 100vw" className="object-cover" priority />
            </div>
            <p className="label mt-3 flex justify-between"><span>Provisional photo · hospital entrance, morning light wanted</span><span>Tirunelveli</span></p>
          </div>
          <div className="relative md:col-span-4 md:col-start-9 md:pt-24">
            <p className="label">01 · The doctor</p>
            <h3 className="mt-5 text-[clamp(2.2rem,4.4vw,3.6rem)]">We begin by <em>listening</em></h3>
            <p className="mt-5">Nothing is prescribed before the doctor has spoken with you, asked about your history and understood what you hope to improve.</p>
            <a href="#" className="btn btn-primary mt-8">Free consultation on WhatsApp</a>
          </div>
          <div className="relative -mt-12 md:col-span-3 md:col-start-8 md:-mt-52 md:translate-x-4">
            <div className="relative aspect-[4/5] border-8 border-paper"><Image src="/images/clinic/lamp-and-flower-altar-2.webp" alt="A brass lamp and marigolds" fill sizes="22vw" className="object-cover" /></div>
          </div>
        </div>
        <div className="mt-24 grid gap-8 border-t border-[var(--rule)] pt-12 md:grid-cols-12">
          <div className="md:col-span-3"><p className="label">Photo grade</p><p className="mt-3 text-[0.92rem] text-moss">The team photo above is shot under neon green and violet. A one-time warm grade, baked into the image file (not a live CSS filter), pulls every photo toward the paper palette.</p></div>
          <figure className="m-0 md:col-span-4"><div className="relative aspect-[4/3]"><Image src="/images/clinic/therapists-in-white-coats.webp" alt="Therapists in white coats, original colours" fill sizes="(min-width: 768px) 30vw, 90vw" className="object-cover" /></div><figcaption className="label mt-2">As supplied</figcaption></figure>
          <figure className="m-0 md:col-span-4"><div className="relative aspect-[4/3]"><Image src="/images/clinic/therapists-in-white-coats.webp" alt="Therapists in white coats, warm paper-toned grade" fill sizes="(min-width: 768px) 30vw, 90vw" className="object-cover" style={{ filter: 'saturate(0.62) sepia(0.2) contrast(0.97) brightness(1.02)' }} /></div><figcaption className="label mt-2">Warm grade (preview)</figcaption></figure>
        </div>
        <p className="mt-16 max-w-2xl text-[0.95rem] text-moss">Notice: one large photograph, a smaller one overlapping it, a headline that does not sit in a row, a label line with the place name, lots of empty paper. On phones the same pieces stack with the overlap kept as a small negative margin.</p>
      </Sec>

      {/* ---------------- 07 Motion ---------------- */}
      <Sec n="07" title="Motion: six signature moments, nothing else" alt>
        <MotionDemo />
        <div className="mt-16 grid gap-10 border-t border-[var(--rule)] pt-10 md:grid-cols-3">
          <div><p className="label">Easing and time</p><p className="mt-3">cubic-bezier(0.22, 1, 0.36, 1) everywhere. Reveals 600–1000ms, hovers 200–320ms. Only transform, opacity and clip-path animate.</p></div>
          <div><p className="label">The six moments</p><ol className="mt-3 list-decimal pl-5"><li>Headline mask reveal, line by line</li><li>Image clip-path reveal</li><li>One pinned story section</li><li>One horizontal strip</li><li>Parallax, 8% maximum</li><li>Thin lines drawn on scroll; soft cross-fade between pages</li></ol></div>
          <div><p className="label">Safety</p><p className="mt-3">Text is always in the HTML. The hero photo is never animated or delayed. Reduced motion: simple fades, no pinning. Low-end phones: no smooth-scroll library, no parallax. Lenis and GSAP load after first paint.</p></div>
        </div>
      </Sec>

      {/* ---------------- 08 Rules ---------------- */}
      <Sec n="08" title="Rules, budgets and what is still needed">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="label">Never</p>
            <ul className="mt-4 list-none space-y-2 p-0">
              {['Glass, blur, glow or drop-shadow cards', 'Gradients (except a paper-tone vignette)', 'Three equal cards in a row for core content', 'Stock photography, emoji or icon packs', 'Text in turmeric or sage on paper', 'Health claims: no “cure”, no “permanent”'].map(x => <li key={x} className="border-t border-[var(--rule)] pt-2">{x}</li>)}
            </ul>
          </div>
          <div>
            <p className="label">Budgets</p>
            <ul className="mt-4 list-none space-y-2 p-0">
              {['Mobile Lighthouse 90+ (performance, SEO, accessibility)', 'LCP under 2.5s on 4G; hero image never animated', '2 font families per language, subset and self-hosted', 'JavaScript for motion loaded after first paint', 'Grain texture 500 bytes; each plant about 1 KB'].map(x => <li key={x} className="border-t border-[var(--rule)] pt-2">{x}</li>)}
            </ul>
          </div>
          <div>
            <p className="label">Still needed from you</p>
            <ul className="mt-4 list-none space-y-2 p-0">
              {['Choice: Cormorant or Instrument; Hanken or DM Sans', 'Real hero photo: hospital or doctor, morning light', 'Photos: therapy room, herbs, pharmacy shelf, 2 portraits', 'Consent for patient and staff photos; stock licences', 'Doctor details and confirmed qualifications', 'Testimonials with written permission'].map(x => <li key={x} className="border-t border-[var(--rule)] pt-2">{x}</li>)}
            </ul>
          </div>
        </div>
      </Sec>
    </main>
  );
}
