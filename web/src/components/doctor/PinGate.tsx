'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function PinGate() {
  const [pin, setPin] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  async function go(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr('');
    const res = await fetch('/api/doctor/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ pin }) });
    if (res.ok) location.reload();
    else { setErr('That PIN is not right. Try again.'); setBusy(false); setPin(''); }
  }
  return (
    <main className="grid min-h-svh place-items-center bg-ink px-4 text-paper">
      <form onSubmit={go} className="w-full max-w-sm">
        <span className="inline-block rounded-[3px] bg-paper p-2"><Image src="/images/brand/logo.webp" alt="Sri Dhanvanthri Ayurveda" width={640} height={296} className="h-[48px] w-auto" priority /></span>
        <h1 className="mt-10" style={{ fontSize: 'clamp(2.4rem, 8vw, 3.4rem)' }}>Doctor’s desk</h1>
        <p className="mt-3 text-[rgb(244_236_221/0.8)]">Enter your PIN to see consultation carts from patients.</p>
        <label className="mt-8 block">
          <span className="label text-sage">PIN</span>
          <input value={pin} onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 8))} inputMode="numeric" autoComplete="current-password" type="password" autoFocus
            className="mt-2 w-full rounded-[3px] border border-paper bg-transparent px-4 py-3 text-center font-display text-[2rem] tracking-[0.5em] text-paper outline-none focus:border-turmeric" aria-invalid={!!err} />
        </label>
        {err && <p className="mt-3 font-semibold text-turmeric" role="alert">{err}</p>}
        <button type="submit" disabled={busy || pin.length < 4} className="btn btn-primary mt-6 w-full justify-center disabled:opacity-50">{busy ? 'Checking…' : 'Open the desk'}</button>
      </form>
    </main>
  );
}
