'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/content';
import { CONCERNS } from '@/lib/ui';

const S = {
  en: { title: 'Talk to the doctor', sub: 'Free call back. No payment, no app.', concern: 'What is troubling you?', name: 'Your name', phone: 'Mobile number', time: 'When should he call?', times: ['Morning', 'Afternoon', 'Evening', 'Any time'], consent: 'The doctor may call me on this number.', send: 'Request a call', sending: 'Sending…', errName: 'Please enter your name.', errPhone: 'Please enter a 10-digit mobile number.', errConsent: 'Please tick this box.', errServer: 'Something went wrong. Please call us instead.', okTitle: 'Done. The doctor will call you.', okBody: 'Keep your phone nearby at the time you chose. Your reference is', track: 'See your request', close: 'Close', doc: 'S. Rajkapoor', docRole: 'Answers every request himself' },
  ta: { title: 'மருத்துவரிடம் பேசுங்கள்', sub: 'இலவச அழைப்பு. பணம் இல்லை, ஆப் இல்லை.', concern: 'உங்கள் பிரச்சினை என்ன?', name: 'உங்கள் பெயர்', phone: 'கைபேசி எண்', time: 'எப்போது அழைக்கலாம்?', times: ['காலை', 'மதியம்', 'மாலை', 'எப்போதும்'], consent: 'இந்த எண்ணில் மருத்துவர் அழைக்கலாம்.', send: 'அழைப்பைக் கோருங்கள்', sending: 'அனுப்புகிறது…', errName: 'பெயரை உள்ளிடவும்.', errPhone: '10 இலக்க எண்ணை உள்ளிடவும்.', errConsent: 'இதைத் தேர்வு செய்யவும்.', errServer: 'பிழை ஏற்பட்டது. தயவுசெய்து அழைக்கவும்.', okTitle: 'முடிந்தது. மருத்துவர் அழைப்பார்.', okBody: 'நீங்கள் தேர்ந்த நேரத்தில் கைபேசியை அருகில் வைத்திருங்கள். உங்கள் குறிப்பு எண்', track: 'கோரிக்கையைப் பார்', close: 'மூடு', doc: 'எஸ். ராஜ்கபூர்', docRole: 'ஒவ்வொரு கோரிக்கைக்கும் அவரே பதில் அளிக்கிறார்' },
};

/** Bottom sheet on phones, centred dialog on desktop. Creates a "callback" request on the doctor's desk. */
export default function QuickConsult({ open, concern, locale, onClose }: { open: boolean; concern?: string; locale: Locale; onClose: () => void }) {
  const t = S[locale];
  const chips = CONCERNS[locale];
  const [picked, setPicked] = useState<string[]>([]);
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    setPicked(concern ? [concern] : []);
    setErrs({}); setDone(null); setBusy(false);
    document.body.style.overflow = 'hidden';
    setTimeout(() => panel.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true }), 350);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); };
  }, [open, concern, onClose]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const phone = (v.phone || '').replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
    const er: Record<string, string> = {};
    if (!v.name?.trim()) er.name = t.errName;
    if (!/^[6-9]\d{9}$/.test(phone)) er.phone = t.errPhone;
    if (!v.consent) er.consent = t.errConsent;
    setErrs(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    try {
      const res = await fetch('/api/requests', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ kind: 'callback', locale, name: v.name, phone, callTime: v.callTime, website: v.website, consent: true, language: locale === 'ta' ? 'Tamil' : 'English', concern: [picked.join(', '), v.note].filter(Boolean).join('. ') }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error();
      setDone(j.id);
    } catch { setErrs({ server: t.errServer }); }
    setBusy(false);
  }

  return (
    <div className="sheet" data-open={open} aria-hidden={!open}>
      <button type="button" className="sheet-scrim" tabIndex={-1} aria-label={t.close} onClick={onClose} />
      <div ref={panel} className="sheet-panel" role="dialog" aria-modal="true" aria-label={t.title}>
        <div className="sheet-grip" aria-hidden="true" />
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-14 flex-none overflow-hidden rounded-full border-2 border-turmeric bg-ink">
              <Image src="/images/doctors/s-rajkapoor.webp" alt="" fill sizes="56px" className="object-cover object-top" />
            </div>
            <div>
              <h2 className="text-[1.75rem] leading-none">{t.title}</h2>
              <p className="mt-1 text-[0.9rem] text-moss">{t.sub}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="grid h-10 w-10 flex-none place-items-center rounded-full bg-paper2" tabIndex={open ? 0 : -1} aria-label={t.close}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>

        {done ? (
          <div className="py-8 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-leaf text-paper">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7" /></svg>
            </div>
            <h3 className="mt-5 text-[1.9rem] leading-tight">{t.okTitle}</h3>
            <p className="mx-auto mt-3 max-w-xs text-moss">{t.okBody} <b className="text-ink">{done}</b>.</p>
            <div className="mt-7 grid gap-3">
              <Link href={`${locale === 'ta' ? '/ta' : ''}/track/${done}`} className="btn btn-primary justify-center" onClick={onClose}>{t.track}</Link>
              <button type="button" className="btn btn-ghost justify-center" onClick={onClose}>{t.close}</button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="mt-6 grid gap-5">
            <fieldset className="m-0 border-0 p-0">
              <legend className="mb-2.5 text-[0.95rem] font-semibold">{t.concern}</legend>
              <div className="flex flex-wrap gap-2">
                {chips.map(c => {
                  const on = picked.includes(c);
                  return <button key={c} type="button" aria-pressed={on} onClick={() => setPicked(p => (on ? p.filter(x => x !== c) : [...p, c]))} className="concern-chip">{c}</button>;
                })}
              </div>
            </fieldset>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="field" data-err={!!errs.name}><span className="sr-only">{t.name}</span><input name="name" placeholder={t.name} autoComplete="name" tabIndex={open ? 0 : -1} />{errs.name && <span className="err">{errs.name}</span>}</label>
              <label className="field" data-err={!!errs.phone}><span className="sr-only">{t.phone}</span><input name="phone" type="tel" inputMode="tel" placeholder={t.phone} autoComplete="tel-national" tabIndex={open ? 0 : -1} />{errs.phone && <span className="err">{errs.phone}</span>}</label>
            </div>
            <fieldset className="m-0 border-0 p-0">
              <legend className="mb-2.5 text-[0.95rem] font-semibold">{t.time}</legend>
              <div className="seg">{t.times.map((x, i) => <label key={x}><input type="radio" name="callTime" value={x} defaultChecked={i === 3} tabIndex={open ? 0 : -1} /><span>{x}</span></label>)}</div>
            </fieldset>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />
            <div>
              <label className="check text-[0.92rem]"><input type="checkbox" name="consent" value="1" defaultChecked tabIndex={open ? 0 : -1} /><span>{t.consent}</span></label>
              {errs.consent && <p className="mt-1 text-[0.85rem] font-semibold text-clay">{errs.consent}</p>}
            </div>
            {errs.server && <p className="font-semibold text-clay" role="alert">{errs.server}</p>}
            <button type="submit" className="btn btn-primary w-full justify-center !min-h-[56px] text-[1.05rem]" disabled={busy} tabIndex={open ? 0 : -1}>{busy ? t.sending : t.send}</button>
          </form>
        )}
      </div>
    </div>
  );
}
