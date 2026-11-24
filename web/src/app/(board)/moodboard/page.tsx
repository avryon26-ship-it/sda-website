import Image from 'next/image';
import './board.css';
import { Tulsi, Neem, Turmeric, Ashwagandha, Lotus, KolamRule } from '@/components/Botanicals';

/* deterministic torn-paper edge (bottom or top) */
function torn(side: 'bottom' | 'top', n = 46, amp = 9, seed = 7) {
  let s = seed; const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) { const x = (i / n) * 100; const y = 2 + r() * amp; pts.push(side === 'bottom' ? `${x.toFixed(1)}% calc(100% - ${y.toFixed(1)}px)` : `${x.toFixed(1)}% ${y.toFixed(1)}px`); }
  return side === 'bottom' ? `polygon(0 0, 100% 0, ${pts.reverse().join(', ')})` : `polygon(${pts.join(', ')}, 100% 100%, 0 100%)`;
}

const swatches = [
  { n: 'Newsprint', v: '#E9E6CF', role: 'Page. Slightly yellowed green-grey', c: 'Ink on it 9.1 AAA', dark: false },
  { n: 'Aged newsprint', v: '#DDE0C4', role: 'Alternate bands', c: 'Ink on it 8.5 AAA', dark: false },
  { n: 'Celadon wash', v: '#D3DDC0', role: 'Panels, apothecary glass', c: 'Ink on it 8.1 AAA', dark: false },
  { n: 'Sage', v: '#B4C3A0', role: 'Tape, plaques, lines on dark. Never text on paper (1.5)', c: 'On ink 6.2 AA', dark: false },
  { n: 'Pistachio', v: '#F2F3E1', role: 'Lightest paper: labels, slips, cards', c: 'Ink on it 10.2 AAA', dark: false },
  { n: 'Palm leaf', v: '#D4CF9C', role: 'Leaf strips (ola)', c: 'Ink on it 7.2 AAA', dark: false },
  { n: 'Faded ink green', v: '#2A3E30', role: 'All text, dark bands', c: 'Newsprint on it 9.1 AAA', dark: true },
  { n: 'Moss', v: '#48623F', role: 'Secondary text, numerals', c: 'On newsprint 5.4 AA', dark: true },
  { n: 'Stamp red-brown', v: '#94402C', role: 'Stamps, one word, the string', c: 'On newsprint 5.5 AA', dark: true },
  { n: 'Turmeric', v: '#C28A2C', role: 'Tiny fills only (never text, never button label)', c: 'Ink on it 3.8 (decorative)', dark: false },
];

function Jar({ w, h, name, ta, lid = '#9a7b4a' }: { w: number; h: number; name: string; ta: string; lid?: string }) {
  return (
    <div className="mb-jar" style={{ width: w }}>
      <div style={{ position: 'relative', width: '100%' }}>
        <svg viewBox={`0 0 120 ${h}`} aria-hidden="true" focusable="false" className="botanical" style={{ color: '#2A3E30' }}>
          <rect x="34" y="2" width="52" height="16" rx="3" fill={lid} />
          <path d={`M30 18H90V30C90 36 112 40 112 58V${h - 10}C112 ${h - 4} 108 ${h - 2} 100 ${h - 2}H20C12 ${h - 2} 8 ${h - 4} 8 ${h - 10}V58C8 40 30 36 30 30Z`} fill="#D3DDC0" fillOpacity="0.75" />
          <path d={`M22 ${h * 0.5}V${h - 14}`} stroke="#F2F3E1" strokeWidth="3" strokeOpacity="0.8" />
        </svg>
        <div className="mb-label-paper" style={{ top: `${h > 190 ? 36 : 34}%` }}>
          <span className="mb-label" style={{ fontSize: '0.5rem' }}>Narmadha</span>
          <b>{name}</b>
          <span lang="ta" className="mb-ta">{ta}</span>
        </div>
      </div>
    </div>
  );
}

export default function MoodBoard() {
  return (
    <div className="mb">
      {/* ===================== MASTHEAD ===================== */}
      <header className="mb-wrap mb-mast">
        <div className="mb-label" style={{ fontSize: '0.7rem' }}>Mood board · Hybrid · For approval · Nothing on the live site has changed</div>
        <div className="mb-mast-ears" style={{ marginTop: '1.1rem' }}>
          <div className="mb-ear mb-label">Tirunelveli<br />Tamil Nadu</div>
          <Image src="/images/brand/logo-large.webp" alt="Sri Dhanvanthri Ayurveda Marunthagam" width={1200} height={555} priority sizes="400px" style={{ width: 'min(22rem, 52vw)', height: 'auto' }} />
          <div className="mb-ear mb-label">Doctor first.<br />Always.</div>
        </div>
        <div style={{ marginTop: '0.9rem' }}><hr className="mb-rule2" /></div>
        <div className="mb-dateline mb-label"><span>V.M. Chatram, Tirunelveli</span><span>Panchakarma · Varma · Yoga · Herbal</span><span>Call 90037 77757</span></div>
        <h1 style={{ fontSize: 'clamp(2.6rem, 9vw, 7.2rem)', margin: '2.2rem 0 0.6rem', textTransform: 'none' }}>The Gazette <em style={{ fontWeight: 400 }}>on palm leaf</em></h1>
        <p style={{ maxWidth: '40rem', margin: '0 auto 2rem', fontSize: '1.2rem' }}>A hybrid: newspaper structure for the pages, palm-leaf strips for the headings, apothecary labels for the products, and green halftone photographs.</p>
      </header>

      {/* ===================== 01 PALETTE ===================== */}
      <section className="mb-sec alt">
        <div className="mb-wrap">
          <div className="mb-label">01 · Colour: vintage light greens</div><hr className="mb-rule" style={{ margin: '0.6rem 0 2rem' }} />
          <div className="mb-grid4">
            {swatches.map(s => (
              <div key={s.n} className="mb-swatch">
                <div className="chip" style={{ background: s.v, color: s.dark ? '#E9E6CF' : '#2A3E30' }}>{s.n}</div>
                <div style={{ padding: '0.6rem 0.8rem', background: '#F2F3E1', fontSize: '0.88rem', lineHeight: 1.4 }}>
                  <div className="mb-label" style={{ fontSize: '0.68rem' }}>{s.v}</div>{s.role}<br /><span style={{ color: '#48623F' }}>{s.c}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mb-cols2" style={{ marginTop: '2.2rem', fontSize: '1rem' }}>
            The greens are washed and slightly grey, like old pharmacy walls, apothecary glass and aged newsprint. They are backgrounds and decoration. All reading text is faded ink green (9.1:1). Corrected from the first idea: moss was 4.36 (just under AA), so it is deepened to 5.4; turmeric cannot carry text (3.8), so every button is ink green with paper-coloured lettering. The stamp red-brown is used the way a rubber stamp is: one word, one mark, never body text.
          </p>
        </div>
      </section>

      {/* ===================== 02 TYPE ===================== */}
      <section className="mb-sec">
        <div className="mb-wrap">
          <div className="mb-label">02 · Type: letterpress, typewriter, handwriting</div><hr className="mb-rule" style={{ margin: '0.6rem 0 2rem' }} />
          <div className="mb-grid2">
            <div>
              <p className="mb-label">A · Old Standard TT (newspaper headline) · recommended</p>
              <p style={{ fontFamily: 'var(--f-oldstd)', fontWeight: 700, fontSize: 'clamp(2.6rem, 6vw, 4.6rem)', lineHeight: 1, margin: '0.6rem 0' }}>Care that begins by <em style={{ fontWeight: 400 }}>listening</em></p>
              <p style={{ fontFamily: 'var(--f-oldstd)', fontSize: '1.3rem', fontStyle: 'italic' }}>Panchakarma, Varma and herbal care in Tirunelveli</p>
            </div>
            <div>
              <p className="mb-label">B · IM Fell English (letterpress, softer)</p>
              <p style={{ fontFamily: 'var(--f-fell)', fontSize: 'clamp(2.6rem, 6vw, 4.6rem)', lineHeight: 1, margin: '0.6rem 0' }}>Care that begins by <em>listening</em></p>
              <p style={{ fontFamily: 'var(--f-fell)', fontSize: '1.3rem', fontStyle: 'italic' }}>Panchakarma, Varma and herbal care in Tirunelveli</p>
            </div>
          </div>
          <div className="mb-grid3" style={{ marginTop: '3rem', borderTop: '1px solid var(--rule)', paddingTop: '2rem' }}>
            <div><p className="mb-label">Body · Newsreader</p><p style={{ marginTop: '0.6rem' }}>When you come to us, the doctor speaks with you first. We ask about your health, your food and your sleep, and only then suggest anything. 90037 77757.</p></div>
            <div><p className="mb-label">Dateline, stamps · Special Elite</p><p className="mb-typew" style={{ marginTop: '0.6rem', fontSize: '0.95rem' }}>V.M. CHATRAM, TIRUNELVELI. CONSULTATION FIRST. NO PAYMENT ON THIS SITE.</p></div>
            <div><p className="mb-label">Margin notes · Caveat</p><p className="mb-hand" style={{ marginTop: '0.6rem' }}>ask the doctor first, then decide →</p></div>
          </div>
          <div className="mb-grid2" style={{ marginTop: '3rem', borderTop: '1px solid var(--rule)', paddingTop: '2rem' }} lang="ta">
            <div><p className="mb-label">Tamil display · Tiro Tamil (traditional print)</p><p className="mb-ta" style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', lineHeight: 1.3, marginTop: '0.6rem' }}>கேட்பதிலிருந்து தொடங்கும் பராமரிப்பு</p></div>
            <div><p className="mb-label">Tamil body</p><p className="mb-ta" style={{ fontSize: '1.15rem', lineHeight: 1.9, marginTop: '0.6rem' }}>மருத்துவர் முதலில் உங்களிடம் பேசுவார். உங்கள் ஆரோக்கியம், உணவு, உறக்கம் பற்றிக் கேட்ட பிறகே எதையும் பரிந்துரைப்பார்.</p></div>
          </div>
        </div>
      </section>

      {/* ===================== 03 PAPER CRAFT ===================== */}
      <section className="mb-sec alt">
        <div className="mb-wrap">
          <div className="mb-label">03 · Paper craft: the four details, used sparingly</div><hr className="mb-rule" style={{ margin: '0.6rem 0 2.4rem' }} />
          <div className="mb-grid3" style={{ alignItems: 'start' }}>
            <div style={{ position: 'relative' }}>
              <span className="mb-tape" style={{ left: '1.2rem', top: '-0.7rem' }} />
              <div className="mb-paper mb-torn" style={{ ['--torn' as string]: torn('bottom') }}>
                <p className="mb-label">Torn edge · tape</p>
                <p style={{ margin: '0.6rem 0 1.4rem', fontSize: '1.05rem' }}>Notes and pull-quotes sit on a torn scrap of lighter paper with a strip of tape. The edge is a pure CSS shape, so it costs nothing to load.</p>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <svg viewBox="0 0 200 200" width="180" height="180" className="mb-stampsvg" style={{ transform: 'rotate(-8deg)' }} role="img" aria-label="Rubber stamp: Sri Dhanvanthri Ayurveda, Tirunelveli, consultation first">
                <defs>
                  <path id="ring" d="M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0" />
                  <filter id="rough"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" /><feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" /></filter>
                </defs>
                <g filter="url(#rough)" fill="#94402C" stroke="#94402C">
                  <circle cx="100" cy="100" r="92" fill="none" strokeWidth="3" /><circle cx="100" cy="100" r="86" fill="none" strokeWidth="1" /><circle cx="100" cy="100" r="52" fill="none" strokeWidth="1" />
                  <text fontFamily="var(--f-type)" fontSize="13" letterSpacing="3.2" stroke="none"><textPath href="#ring" startOffset="0">SRI DHANVANTHRI · AYURVEDA · TIRUNELVELI ·</textPath></text>
                  <text x="100" y="96" textAnchor="middle" fontFamily="var(--f-type)" fontSize="15" letterSpacing="2" stroke="none">DOCTOR</text>
                  <text x="100" y="116" textAnchor="middle" fontFamily="var(--f-type)" fontSize="15" letterSpacing="2" stroke="none">FIRST</text>
                </g>
              </svg>
              <p className="mb-label" style={{ marginTop: '0.4rem' }}>Rubber stamp · lands when scrolled in</p>
              <div style={{ marginTop: '1.2rem' }}><span className="mb-stamp-rect">Consultation first</span></div>
            </div>
            <div>
              <p className="mb-label">Marginalia</p>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', marginTop: '0.8rem' }}>
                <Tulsi className="" title="Tulsi, woodcut-style line drawing" />
                <style>{`.mb-marg svg{width:70px;height:auto;color:#2A3E30}`}</style>
                <div className="mb-marg" style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-end' }}>
                  <Neem /><Turmeric />
                </div>
              </div>
              <p className="mb-hand" style={{ marginTop: '0.8rem' }}>tulsi, neem, turmeric: drawn once, used as margin sketches ↗</p>
            </div>
          </div>
          <div style={{ marginTop: '3rem', color: 'var(--moss)' }}><KolamRule /></div>
          <p className="mb-cols2" style={{ marginTop: '1.6rem', fontSize: '1rem' }}>Grain is a single tiled SVG (about 500 bytes) in ink green at low strength; the leaf fibre lines are another tiny tile. The kolam border stays from the earlier direction as a divider. One texture, one leaf motif and two stamps per page is the limit, so the site reads as crafted and not as scrapbook.</p>
        </div>
      </section>

      {/* ===================== 04 LEAF HEADINGS ===================== */}
      <section className="mb-sec">
        <div className="mb-wrap">
          <div className="mb-label">04 · Palm-leaf strips: headings, and the treatments as a bound bundle</div><hr className="mb-rule" style={{ margin: '0.6rem 0 2.4rem' }} />
          <div className="mb-grid2" style={{ alignItems: 'start', gap: '3rem' }}>
            <div>
              <div className="mb-leaf" style={{ display: 'block' }}><span className="mb-label" style={{ fontSize: '0.7rem', color: 'var(--moss)' }}>01 · The story</span><h2>We begin by <em style={{ fontWeight: 400 }}>listening</em></h2></div>
              <p style={{ marginTop: '1.4rem' }}>Every section heading is written on a leaf: fibre lines, two punched holes, rounded ends. On scroll the leaf unfolds (clip-path, 700 ms) and the title appears as if inked. Text is always in the HTML.</p>
              <p className="mb-hand" style={{ marginTop: '0.8rem' }}>no icons, no cards: just the leaf ↑</p>
            </div>
            <div>
              <div className="mb-bundle">
                {[['01', 'Panchakarma', 'பஞ்சகர்மா'], ['02', 'Varma therapy', 'வர்ம சிகிச்சை'], ['03', 'Back and joint care', 'முதுகு, மூட்டு'], ['04', 'Skin care', 'தோல் பராமரிப்பு'], ['05', 'Yoga and meditation', 'யோகா, தியானம்']].map(([n, t, ta]) => (
                  <div key={n} className="mb-leaf"><span className="n">{n}</span><span className="t">{t}</span><span lang="ta" className="mb-ta" style={{ marginLeft: 'auto', fontSize: '0.95rem', color: 'var(--moss)' }}>{ta}</span></div>
                ))}
              </div>
              <p className="mb-label" style={{ marginTop: '1.4rem' }}>Treatments: leaves strung on one cord. Tap a leaf to unfold its photograph.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 05 PHOTO TREATMENT ===================== */}
      <section className="mb-sec dark">
        <div className="mb-wrap">
          <div className="mb-label" style={{ color: '#B4C3A0' }}>05 · Photographs: the biggest practical win</div><hr className="mb-rule" style={{ margin: '0.6rem 0 2rem', borderTopColor: 'rgb(233 230 207 / 0.3)' }} />
          <div className="mb-grid3">
            {[['/images/clinic/team-at-shopfront.webp', 'As supplied: saturated, soft, uneven'], ['/moodboard/shopfront-duotone.webp', 'Green duotone: calm, one colour story'], ['/moodboard/shopfront-halftone.webp', 'Newsprint halftone: dots hide softness']].map(([s, c]) => (
              <figure key={s} className="mb-fig">
                <div className="mb-frame"><Image src={s} alt={c} width={1100} height={1100} sizes="(min-width: 800px) 30vw, 92vw" style={{ width: '100%', height: 'auto' }} /></div>
                <figcaption className="mb-cap" style={{ borderTopColor: 'rgb(233 230 207 / 0.3)' }}>{c}</figcaption>
              </figure>
            ))}
          </div>
          <p className="mb-cols2" style={{ marginTop: '2.4rem', fontSize: '1rem' }}>Our photos are 1000 px squares in mixed colours. A duotone or halftone treatment makes the whole set look chosen, and it is a one-time baking step, not a live filter. Real photographs by a photographer would be given the same treatment; the colour version can sit behind a tap (&ldquo;see the original&rdquo;). Note: the halftone files here are 270 to 390 KB, over budget; production versions would use coarser dots and smaller sizes (under 150 KB).</p>
        </div>
      </section>

      {/* ===================== 06 FRONT PAGE ===================== */}
      <section className="mb-sec">
        <div className="mb-wrap">
          <div className="mb-label">06 · Home as a front page (stacks to one column on phones)</div><hr className="mb-rule2" style={{ margin: '0.7rem 0 1.6rem' }} />
          <div className="mb-front">
            <aside>
              <p className="mb-label">In this issue</p>
              <ol style={{ listStyle: 'none', padding: 0, margin: '0.8rem 0 0', fontFamily: 'var(--head)', fontSize: '1.25rem' }}>
                {['The story', 'Treatments', 'How consultation works', 'The doctor and team', 'The place', 'From our pharmacy', 'Questions'].map((x, i) => (
                  <li key={x} style={{ borderTop: '1px solid var(--rule)', padding: '0.45rem 0', display: 'flex', gap: '0.8rem', alignItems: 'baseline' }}><span className="mb-label" style={{ color: 'var(--moss)' }}>0{i + 1}</span>{x}</li>
                ))}
              </ol>
              <div style={{ color: 'var(--ink)', marginTop: '1.6rem', maxWidth: 110 }}><Lotus /></div>
            </aside>
            <article className="mb-colrule" style={{ borderLeft: undefined }}>
              <p className="mb-label" style={{ color: 'var(--stamp)' }}>Front page · Doctor first</p>
              <h2 style={{ fontSize: 'clamp(2.6rem, 6.2vw, 5rem)', margin: '0.5rem 0 0.9rem' }}>Nothing is prescribed until the doctor has <em style={{ fontWeight: 400 }}>listened</em></h2>
              <p style={{ fontFamily: 'var(--head)', fontStyle: 'italic', fontSize: '1.3rem', lineHeight: 1.35 }}>At Sri Dhanvanthri Ayurveda in V.M. Chatram, every visit begins with a conversation about your health, your food and your sleep.</p>
              <hr className="mb-rule" style={{ margin: '1.2rem 0' }} />
              <figure className="mb-fig" style={{ position: 'relative' }}>
                <span className="mb-tape" style={{ left: '40%', top: '-0.8rem' }} />
                <div className="mb-frame"><Image src="/moodboard/herbs-halftone.webp" alt="Therapists preparing fresh herbs on a stone grinder, in green halftone" width={900} height={900} sizes="(min-width: 900px) 40vw, 92vw" style={{ width: '100%', height: 'auto' }} /></div>
                <figcaption className="mb-cap">FIG. 1. Fresh herbs are ground on stone in the courtyard. <span className="mb-hand" style={{ fontSize: '1.15rem' }}>(photo: placeholder)</span></figcaption>
              </figure>
              <div className="mb-cols2 mb-dropcap" style={{ marginTop: '1.4rem', fontSize: '1.05rem' }}>
                <p>Ayurveda, often called the science of life, looks at the whole person: body, mind, food, sleep and daily routine. Here, the doctor asks first and prescribes later. Some days the conversation is the whole visit. If something is not right for you, we will say so.</p>
              </div>
            </article>
            <aside>
              <div className="mb-paper mb-torn" style={{ ['--torn' as string]: torn('bottom', 36, 8, 3), background: '#F2F3E1' }}>
                <p className="mb-label" style={{ color: 'var(--stamp)' }}>Stop press</p>
                <p style={{ fontFamily: 'var(--head)', fontWeight: 700, fontSize: '1.6rem', lineHeight: 1.1, margin: '0.5rem 0 0.8rem' }}>Speak to the doctor first</p>
                <p style={{ fontSize: '1rem' }}>Message us on WhatsApp or call. No payment is taken on this website.</p>
                <p style={{ margin: '1.1rem 0 1.4rem' }}><a href="#" className="mb-btn">WhatsApp</a></p>
              </div>
              <div style={{ textAlign: 'center', marginTop: '1.6rem' }}><span className="mb-stamp-rect">No online shop</span></div>
              <p className="mb-hand" style={{ marginTop: '1rem' }}>an honest sentence, in the doctor&rsquo;s voice →</p>
            </aside>
          </div>
        </div>
      </section>

      {/* ===================== 07 APOTHECARY ===================== */}
      <section className="mb-sec alt">
        <div className="mb-wrap">
          <div className="mb-label">07 · Products: an apothecary shelf (not a shop)</div><hr className="mb-rule" style={{ margin: '0.6rem 0 2.4rem' }} />
          <div className="mb-shelf">
            <Jar w={150} h={190} name="Bathing soap" ta="குளியல் சோப்பு" />
            <Jar w={170} h={220} name="Pain care oil" ta="வலி நிவாரண எண்ணெய்" lid="#7b5f38" />
            <Jar w={135} h={170} name="Omam water" ta="ஓமவாட்டர்" />
            <Jar w={180} h={235} name="Kesha raksha oil" ta="கேசரக்சா எண்ணெய்" lid="#7b5f38" />
            <Jar w={140} h={180} name="Dried fig" ta="உலர் அத்தி" />
          </div>
          <p className="mb-cols2" style={{ marginTop: '1.6rem', fontSize: '1rem' }}>Each jar carries a pistachio paper label with a double rule, set in the same type as the rest. Tapping lifts the jar and shows two actions only: Add to list and Consult on WhatsApp. The labels never carry health claims or dosage; the old product posters were full of them. Real product photographs, once taken, would sit beside the drawn jar.</p>
        </div>
      </section>

      {/* ===================== 08 RX SLIP ===================== */}
      <section className="mb-sec">
        <div className="mb-wrap">
          <div className="mb-label">08 · The consultation request as a prescription slip</div><hr className="mb-rule" style={{ margin: '0.6rem 0 2.4rem' }} />
          <div className="mb-grid2" style={{ alignItems: 'start', gap: '3rem' }}>
            <div className="mb-rx">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="rx" aria-hidden="true">Rx</span>
                <span className="mb-label" style={{ textAlign: 'right' }}>Consultation request<br />Sri Dhanvanthri Ayurveda</span>
              </div>
              <div className="mb-field"><span>Name</span><i /></div>
              <div className="mb-field"><span>Phone</span><i /></div>
              <div className="mb-field"><span>Concern</span><i /></div>
              <div className="mb-field"><span>Products</span><i /></div>
              <div className="mb-perf" />
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '1.2rem' }}>
                <a href="#" className="mb-btn">Send to the doctor on WhatsApp</a>
                <span className="mb-stamp-rect" style={{ fontSize: '0.7rem' }}>Free · Doctor first</span>
              </div>
            </div>
            <div>
              <p style={{ fontSize: '1.1rem' }}>The same request that opens a pre-filled WhatsApp message and is saved for the doctor. Dotted lines instead of boxes, a margin rule, and a perforation above the button. Submitting stamps it &ldquo;Received&rdquo;.</p>
              <p className="mb-hand" style={{ marginTop: '1rem' }}>no &ldquo;Dr.&rdquo; anywhere until qualifications are confirmed ↑</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 09 RULES ===================== */}
      <section className="mb-sec dark">
        <div className="mb-wrap">
          <div className="mb-label" style={{ color: '#B4C3A0' }}>09 · Motion, rules and what carries over</div><hr className="mb-rule" style={{ margin: '0.6rem 0 2rem', borderTopColor: 'rgb(233 230 207 / 0.3)' }} />
          <div className="mb-grid3" style={{ fontSize: '1rem' }}>
            <div><p className="mb-label" style={{ color: '#B4C3A0' }}>Motion (few, slow, physical)</p><ul style={{ paddingLeft: '1.1rem', marginTop: '0.8rem' }}><li>Leaf unfolds (clip-path)</li><li>Headline inked in, line by line</li><li>Stamp lands once, then stays</li><li>Page change: soft cross-fade</li><li>Halftone sharpens into the photo</li></ul></div>
            <div><p className="mb-label" style={{ color: '#B4C3A0' }}>Restraint</p><ul style={{ paddingLeft: '1.1rem', marginTop: '0.8rem' }}><li>One texture, one leaf motif, two stamps per page</li><li>Plain paper behind all reading text</li><li>No glass, no gradients, no neon, no stock icons</li><li>Tamil gets more space, not smaller print</li></ul></div>
            <div><p className="mb-label" style={{ color: '#B4C3A0' }}>Carries over unchanged</p><ul style={{ paddingLeft: '1.1rem', marginTop: '0.8rem' }}><li>Your logo, in its own colours</li><li>All pages, URLs, SEO, Tamil, phone bar</li><li>Speed budget: textures are tiny tiles</li><li>Reduced motion, 44 px targets, contrast</li></ul></div>
          </div>
        </div>
      </section>
    </div>
  );
}
