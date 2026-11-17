'use client';
import { useState } from 'react';
import Image from 'next/image';

/** Replays the signature reveals so they can be judged without reloading. */
export function MotionDemo() {
  const [run, setRun] = useState(0);
  return (
    <div>
      <button type="button" onClick={() => setRun(r => r + 1)} className="btn btn-ghost">
        Replay the reveals
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" /></svg>
      </button>
      <div key={run} className="mt-12 grid items-end gap-10 md:grid-cols-12">
        <h3 className="lines md:col-span-7" style={{ fontSize: 'var(--fs-h1)' }}>
          <span className="line" style={{ ['--i' as string]: 0 }}><span>Calm care,</span></span>
          <span className="line" style={{ ['--i' as string]: 1 }}><span><em>rooted</em> in</span></span>
          <span className="line" style={{ ['--i' as string]: 2 }}><span>Tirunelveli.</span></span>
        </h3>
        <div className="md:col-span-5">
          <div className="clip-reveal relative aspect-[4/5]" style={{ ['--delay' as string]: '350ms' }}>
            <Image src="/images/clinic/therapists-preparing-herbs.webp" alt="Therapists preparing fresh herbs on a stone grinder" fill sizes="(min-width: 768px) 38vw, 90vw" className="object-cover" />
          </div>
          <p className="fade-up label mt-3" style={{ ['--delay' as string]: '1100ms' }}>Image reveals with clip-path, never the hero</p>
        </div>
      </div>
    </div>
  );
}

const ROWS = [
  { n: '01', t: 'Panchakarma', ta: 'பஞ்சகர்மா', img: '/images/clinic/potli-therapy-session.webp', alt: 'Herbal potli therapy' },
  { n: '02', t: 'Varma therapy', ta: 'வர்ம சிகிச்சை', img: '/images/clinic/varma-therapy-session.webp', alt: 'Varma therapy session' },
  { n: '03', t: 'Back and joint care', ta: 'முதுகு, மூட்டு பராமரிப்பு', img: '/images/clinic/shoulder-therapy-session.webp', alt: 'Shoulder therapy' },
  { n: '04', t: 'Yoga and meditation', ta: 'யோகா, தியானம்', img: '/images/clinic/yoga-meditation-hilltop.webp', alt: 'Meditation on a hilltop' },
];

/** Treatments as an editorial index. Hover (desktop) or tap (touch) reveals the photo. No icon grid. */
export function TreatmentIndex() {
  const [open, setOpen] = useState<string | null>('02');
  return (
    <div>
      {ROWS.map(r => (
        <a key={r.n} href="#" role="button" aria-expanded={open === r.n} data-open={open === r.n} className="index-row"
          onClick={e => { e.preventDefault(); setOpen(o => (o === r.n ? null : r.n)); }}>
          <span className="n">{r.n}</span>
          <span><span className="t block">{r.t}</span><span className="label mt-2 block !normal-case !tracking-normal text-moss" lang="ta">{r.ta}</span></span>
          <svg className="arrow" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
          <span className="index-photo" aria-hidden="true"><Image src={r.img} alt="" fill sizes="384px" className="object-cover" /></span>
        </a>
      ))}
    </div>
  );
}
