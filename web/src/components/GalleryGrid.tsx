'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';

export type Shot = { src: string; w: number; h: number; alt: string };
/** Masonry with soft parallax (applied by Motion on capable desktops) and a native <dialog> lightbox. */
export default function GalleryGrid({ shots, labels }: { shots: Shot[]; labels: { open: string; close: string; prev: string; next: string } }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState(0);
  const show = (n: number) => { setI((n + shots.length) % shots.length); };
  const s = shots[i];
  return (
    <>
      <div className="masonry">
        {shots.map((p, n) => (
          <figure key={p.src}>
            <button type="button" aria-label={`${labels.open}: ${p.alt}`} data-parallax onClick={() => { setI(n); dlg.current?.showModal(); }}>
              <Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes="(min-width: 768px) 32vw, 48vw" className="h-auto w-full" loading="lazy" />
            </button>
          </figure>
        ))}
      </div>
      <dialog ref={dlg} className="lightbox" aria-label={s.alt} onClick={e => { if (e.target === dlg.current) dlg.current?.close(); }}
        onKeyDown={e => { if (e.key === 'ArrowRight') show(i + 1); if (e.key === 'ArrowLeft') show(i - 1); }}>
        <div className="relative">
          <Image src={s.src} alt={s.alt} width={s.w} height={s.h} sizes="96vw" className="mx-auto" />
          <div className="flex items-center justify-between gap-4 p-4">
            <p className="caption max-w-xl">{s.alt}</p>
            <div className="flex gap-2">
              <button type="button" className="btn btn-ghost !min-h-[48px] !px-4" onClick={() => show(i - 1)}>{labels.prev}</button>
              <button type="button" className="btn btn-ghost !min-h-[48px] !px-4" onClick={() => show(i + 1)}>{labels.next}</button>
              <button type="button" className="btn btn-primary !min-h-[48px] !px-4" onClick={() => dlg.current?.close()} autoFocus>{labels.close}</button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
