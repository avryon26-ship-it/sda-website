'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart, QtyStepper, ShieldIcon, JarIcon, Arrow } from '../cart/CartProvider';
import { ui } from '@/lib/ui';
import { localePath } from '@/lib/content';

type Errs = Partial<Record<'name' | 'phone' | 'concern' | 'consent' | 'server', string>>;

/** Step 2 of the flow: patient details + the cart, sent to the doctor. Kind "callback" is the contact page variant (no cart). */
export default function ConsultForm({ kind = 'cart' }: { kind?: 'cart' | 'callback' }) {
  const { lines, products, setQty, remove, clear, locale, ready, count } = useCart();
  const t = ui(locale);
  const router = useRouter();
  const [errs, setErrs] = useState<Errs>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const isCart = kind === 'cart';

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = Object.fromEntries(f.entries()) as Record<string, string>;
    const phone = (v.phone || '').replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
    const er: Errs = {};
    if (!v.name?.trim()) er.name = t.errRequired;
    if (!/^[6-9]\d{9}$/.test(phone)) er.phone = t.errPhone;
    if (!isCart && !v.concern?.trim()) er.concern = t.errRequired;
    if (!v.consent) er.consent = t.errConsent;
    setErrs(er);
    if (Object.keys(er).length) {
      document.querySelector<HTMLElement>(`[name="${Object.keys(er)[0]}"]`)?.focus();
      return;
    }
    setBusy(true);
    try {
      const res = await fetch('/api/requests', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...v, phone, kind, locale, consent: true, items: isCart ? lines : [] }),
      });
      const j = await res.json();
      if (!res.ok || !j.id) throw new Error(j.error);
      if (isCart) { clear(); router.push(localePath(locale, `/track/${j.id}`)); }
      else setDone(true);
    } catch {
      setErrs({ server: t.errServer });
      setBusy(false);
    }
  }

  if (done) return <p className="assure text-[1.1rem]" role="status">{t.contactSent}</p>;
  if (isCart && ready && count === 0 && !busy) {
    return (
      <div className="assure flex flex-col items-start gap-5 p-8">
        <JarIcon className="h-16 w-auto text-moss" />
        <h2 style={{ fontSize: 'var(--fs-h3)' }}>{t.cartEmpty}</h2>
        <p className="max-w-md">{t.cartEmptyBody}</p>
        <Link href={localePath(locale, '/products')} className="btn btn-primary">{t.browse}<Arrow /></Link>
      </div>
    );
  }

  const field = (name: keyof Errs | null, label: string, input: React.ReactNode, hint?: string) => (
    <label className="field" data-err={!!(name && errs[name])}>
      <span>{label}</span>
      {input}
      {name && errs[name] ? <span className="err" id={`${name}-err`}>{errs[name]}</span> : hint ? <small>{hint}</small> : null}
    </label>
  );

  return (
    <form onSubmit={submit} noValidate className={isCart ? 'grid gap-12 lg:grid-cols-12 lg:gap-16' : ''}>
      <div className={isCart ? 'lg:col-span-7' : ''}>
        {isCart && <p className="label text-moss">01 · {t.you}</p>}
        <div className={`grid gap-6 sm:grid-cols-2 ${isCart ? 'mt-6' : ''}`}>
          <div className="sm:col-span-2">{field('name', t.name, <input name="name" autoComplete="name" required aria-invalid={!!errs.name} aria-describedby={errs.name ? 'name-err' : undefined} />)}</div>
          {field('phone', t.phone, <input name="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="98xxxxxxxx" required aria-invalid={!!errs.phone} aria-describedby={errs.phone ? 'phone-err' : undefined} />, t.phoneHint)}
          {isCart ? field(null, `${t.age} (${t.optional})`, <input name="age" type="number" inputMode="numeric" min={1} max={119} />) : field(null, `${t.city} (${t.optional})`, <input name="city" autoComplete="address-level2" />)}
          {isCart && <div className="sm:col-span-2">{field(null, `${t.city} (${t.optional})`, <input name="city" autoComplete="address-level2" />)}</div>}
          {isCart && (
            <fieldset className="m-0 border-0 p-0 sm:col-span-2">
              <legend className="mb-2 text-[0.95rem] font-semibold">{t.gender} <span className="font-normal text-moss">({t.optional})</span></legend>
              <div className="seg">{t.genders.map(g => <label key={g}><input type="radio" name="gender" value={g} /><span>{g}</span></label>)}</div>
            </fieldset>
          )}
          <div className="sm:col-span-2">{field('concern', isCart ? `${t.concern} (${t.optional})` : t.concern, <textarea name="concern" aria-invalid={!!errs.concern} />, t.concernHint)}</div>
          <fieldset className="m-0 border-0 p-0 sm:col-span-2">
            <legend className="mb-2 text-[0.95rem] font-semibold">{t.callTime}</legend>
            <div className="seg">{t.callTimes.map((g, i) => <label key={g}><input type="radio" name="callTime" value={g} defaultChecked={i === 3} /><span>{g}</span></label>)}</div>
          </fieldset>
          <fieldset className="m-0 border-0 p-0 sm:col-span-2">
            <legend className="mb-2 text-[0.95rem] font-semibold">{t.language}</legend>
            <div className="seg">{t.languages.map((g, i) => <label key={g}><input type="radio" name="language" value={g} defaultChecked={(locale === 'ta') === (i === 0)} /><span>{g}</span></label>)}</div>
          </fieldset>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />
          <div className="sm:col-span-2">
            <label className="check"><input type="checkbox" name="consent" value="1" aria-invalid={!!errs.consent} /><span>{t.consent}</span></label>
            {errs.consent && <p className="err mt-2 text-[0.88rem] font-semibold text-clay">{errs.consent}</p>}
          </div>
        </div>
        {!isCart && (
          <div className="mt-8">
            {errs.server && <p className="mb-4 font-semibold text-clay" role="alert">{errs.server}</p>}
            <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? t.sending : t.contactForm}<Arrow /></button>
          </div>
        )}
      </div>

      {isCart && (
        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="flex items-baseline justify-between">
              <p className="label text-moss">02 · {t.summary}</p>
              <Link href={localePath(locale, '/products')} className="text-[0.9rem] font-semibold underline underline-offset-4">{t.continue}</Link>
            </div>
            <ul className="m-0 mt-5 list-none border-t border-[var(--ink)] p-0">
              {lines.map(l => {
                const p = products.get(l.slug)!;
                return (
                  <li key={l.slug} className="grid grid-cols-[4rem_1fr_auto] items-center gap-4 border-b border-[var(--rule)] py-4">
                    <div className="relative aspect-square overflow-hidden rounded-[3px] bg-paper2"><Image src={`/${p.image}`} alt="" fill sizes="64px" className="object-cover" /></div>
                    <div className="min-w-0">
                      <p className="font-display text-[1.15rem] leading-tight">{p.name}</p>
                      <button type="button" onClick={() => remove(l.slug)} className="mt-1 text-[0.82rem] font-semibold text-moss underline underline-offset-4">{t.remove}</button>
                    </div>
                    <QtyStepper small value={l.qty} onChange={n => setQty(l.slug, n)} label={`${t.qty}: ${p.name}`} />
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-right text-[0.95rem] font-semibold">{t.items(count)}</p>
            <div className="assure mt-6 flex gap-3">
              <ShieldIcon className="h-6 w-6 flex-none" />
              <p className="text-[0.93rem] leading-snug">{t.notAnOrder}</p>
            </div>
            {errs.server && <p className="mt-4 font-semibold text-clay" role="alert">{errs.server}</p>}
            <button type="submit" className="btn btn-primary mt-6 w-full justify-center !min-h-[58px] text-[1.05rem]" disabled={busy}>{busy ? t.sending : t.submit}<Arrow /></button>
          </div>
        </aside>
      )}
    </form>
  );
}
