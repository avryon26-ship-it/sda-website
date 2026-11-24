'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import type { ConsultRequest, Status } from '@/lib/requests';

type P = { slug: string; name: string; image: string; category: string };
const LABEL: Record<Status, string> = { new: 'To review', called: 'Called', approved: 'Suitable', visit: 'Visit hospital', declined: 'Not suitable' };
const TABS: { key: string; label: string; match: (s: Status) => boolean }[] = [
  { key: 'todo', label: 'To call', match: s => s === 'new' },
  { key: 'called', label: 'Called', match: s => s === 'called' },
  { key: 'done', label: 'Advised', match: s => s === 'approved' || s === 'visit' || s === 'declined' },
  { key: 'all', label: 'All', match: () => true },
];
const QUICK = [
  'Suitable. Collect from the pharmacy.',
  'Please visit the hospital for a check-up first.',
  'Bring your latest reports when you visit.',
  'Not advised with your current medicines.',
];

function ago(iso: string, now: number) {
  const m = Math.max(0, Math.round((now - new Date(iso).getTime()) / 60000));
  if (m < 1) return 'just now';
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} h ago`;
  return `${Math.round(h / 24)} d ago`;
}
const initials = (n: string) => n.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();

export default function Desk({ initial, products, serverNow }: { initial: ConsultRequest[]; products: P[]; serverNow: number }) {
  const [list, setList] = useState(initial);
  const [tab, setTab] = useState('todo');
  const [q, setQ] = useState('');
  const [sel, setSel] = useState<string | null>(initial.find(r => r.status === 'new')?.id ?? initial[0]?.id ?? null);
  const [sheet, setSheet] = useState(false);
  const [now, setNow] = useState(serverNow);
  useEffect(() => { setNow(Date.now()); const id = setInterval(() => setNow(Date.now()), 30000); return () => clearInterval(id); }, []);
  const [fresh, setFresh] = useState<string[]>([]);
  const known = useRef(new Set(initial.map(r => r.id)));
  const pmap = useMemo(() => new Map(products.map(p => [p.slug, p])), [products]);

  // live queue: new carts appear without a reload
  const refresh = useCallback(async () => {
    const res = await fetch('/api/requests', { cache: 'no-store' });
    if (res.status === 401) { location.reload(); return; }
    if (!res.ok) return;
    const next: ConsultRequest[] = await res.json();
    const added = next.filter(r => !known.current.has(r.id)).map(r => r.id);
    added.forEach(id => known.current.add(id));
    if (added.length) {
      setFresh(f => [...f, ...added]);
      try { document.title = `(${added.length}) New cart · Doctor's desk`; } catch { /* ignore */ }
    }
    setList(next);
    setNow(Date.now());
  }, []);
  useEffect(() => {
    const id = setInterval(refresh, 8000);
    const onFocus = () => { void refresh(); document.title = "Doctor's desk · Sri Dhanvanthri"; };
    addEventListener('focus', onFocus);
    return () => { clearInterval(id); removeEventListener('focus', onFocus); };
  }, [refresh]);

  const counts = Object.fromEntries(TABS.map(t => [t.key, list.filter(r => t.match(r.status)).length]));
  const today = new Date(now).toDateString();
  const stats = [
    { k: 'Waiting for a call', v: list.filter(r => r.status === 'new').length },
    { k: 'Received today', v: list.filter(r => new Date(r.createdAt).toDateString() === today).length },
    { k: 'Advised to visit', v: list.filter(r => r.status === 'visit').length },
    { k: 'Approved', v: list.filter(r => r.status === 'approved').length },
  ];
  const t = TABS.find(x => x.key === tab)!;
  const shown = list.filter(r => t.match(r.status) && (!q || `${r.name} ${r.phone} ${r.city ?? ''} ${r.id}`.toLowerCase().includes(q.toLowerCase())));
  const cur = list.find(r => r.id === sel) ?? null;

  async function patch(id: string, body: { status?: Status; doctorNote?: string }) {
    setList(ls => ls.map(r => (r.id === id ? { ...r, ...body } as ConsultRequest : r)));
    const res = await fetch(`/api/requests/${id}`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    if (res.ok) { const r: ConsultRequest = await res.json(); setList(ls => ls.map(x => (x.id === id ? r : x))); }
  }
  const open = (id: string) => { setSel(id); setSheet(true); setFresh(f => f.filter(x => x !== id)); };

  return (
    <div className="desk">
      <header className="desk-top">
        <div className="wrap flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="rounded-[3px] bg-paper p-1"><Image src="/images/brand/logo.webp" alt="Sri Dhanvanthri" width={640} height={296} className="h-[34px] w-auto" priority /></span>
            <div className="hidden sm:block">
              <p className="font-display text-[1.35rem] leading-none">Doctor’s desk</p>
              <p className="text-[0.78rem] text-sage">{new Date(now).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 text-[0.85rem] text-sage md:inline-flex"><span className="inline-block h-2 w-2 animate-pulse rounded-full bg-turmeric" />Live</span>
            <a href="/" className="text-[0.9rem] font-semibold underline underline-offset-4">Website</a>
            <button type="button" className="btn btn-ghost !min-h-[40px] !border-paper !px-4 !text-paper text-[0.88rem]" onClick={async () => { await fetch('/api/doctor/login', { method: 'DELETE' }); location.reload(); }}>Sign out</button>
          </div>
        </div>
      </header>

      <div className="wrap pt-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label text-moss">Consultation carts</p>
            <h1 className="mt-2" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)' }}>Good {new Date(now).getHours() < 12 ? 'morning' : new Date(now).getHours() < 17 ? 'afternoon' : 'evening'}, Doctor.</h1>
          </div>
          <p className="max-w-sm text-[0.95rem] text-moss">Each cart is a patient waiting for your call. Call, then record your advice. The patient sees it on their tracking page.</p>
        </div>
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
          {stats.map(s => <div key={s.k} className="stat"><dt className="label text-moss">{s.k}</dt><dd className="v m-0 mt-2">{s.v}</dd></div>)}
        </dl>
      </div>

      <div className="wrap mt-10 grid gap-0 pb-16 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-10">
        {/* queue */}
        <section aria-label="Queue" className="min-w-0">
          <div className="tabs" role="tablist">
            {TABS.map(x => <button key={x.key} type="button" role="tab" aria-selected={tab === x.key} onClick={() => setTab(x.key)}>{x.label}<span className="n">{counts[x.key]}</span></button>)}
          </div>
          <label className="search mt-4 block">
            <span className="sr-only">Search patients</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>
            <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Name, phone, town or reference" />
          </label>
          <div className="mt-3 border-t border-[var(--ink)]">
            {shown.length === 0 && <p className="px-1 py-10 text-moss">Nothing here. {tab === 'todo' ? 'Every patient has been called.' : ''}</p>}
            {shown.map(r => (
              <button key={r.id} type="button" className="qrow" aria-current={r.id === sel} onClick={() => open(r.id)}>
                <div className="flex items-start gap-3">
                  <span className="avatar">{initials(r.name)}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="min-w-0 truncate font-semibold">{r.name}{fresh.includes(r.id) && <span className="ml-2 rounded-[3px] bg-turmeric px-1.5 py-0.5 align-middle text-[0.68rem] font-bold uppercase tracking-wider">New</span>}</p>
                      <span className="flex-none text-[0.8rem] text-moss">{ago(r.createdAt, now)}</span>
                    </div>
                    <p className="truncate text-[0.88rem] text-moss">{[r.age && `${r.age} y`, r.city, r.callTime].filter(Boolean).join(' · ')}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 pl-[54px]">
                  <p className="min-w-0 truncate text-[0.88rem]">{r.kind === 'callback' ? 'Call-back request' : r.items.map(i => i.name.replace(/^Narmadha\s+/, '')).join(', ')}</p>
                  <span className="pill flex-none" data-s={r.status}>{LABEL[r.status]}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* detail */}
        <section aria-label="Patient" className="desk-detail min-w-0" data-open={sheet}>
          {cur ? <Detail key={cur.id} r={cur} pmap={pmap} now={now} onPatch={b => patch(cur.id, b)} onBack={() => setSheet(false)} /> : <p className="py-20 text-moss">Select a patient.</p>}
        </section>
      </div>
    </div>
  );
}

function Detail({ r, pmap, now, onPatch, onBack }: { r: ConsultRequest; pmap: Map<string, P>; now: number; onPatch: (b: { status?: Status; doctorNote?: string }) => void; onBack: () => void }) {
  const [note, setNote] = useState(r.doctorNote ?? '');
  const [saved, setSaved] = useState(false);
  const total = r.items.reduce((s, i) => s + i.qty, 0);
  const tel = `tel:+91${r.phone}`;
  const wa = `https://wa.me/91${r.phone}?text=${encodeURIComponent(`Vanakkam ${r.name.split(' ')[0]}, this is Sri Dhanvanthri Ayurveda about your request ${r.id}.`)}`;
  const decide = (s: Status) => { onPatch({ status: s, doctorNote: note }); setSaved(true); setTimeout(() => setSaved(false), 2200); };

  return (
    <div className="border-[var(--ink)] pb-24 lg:border-t lg:pb-0">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--rule)] bg-paper px-4 py-3 lg:hidden">
        <button type="button" className="sheet-back items-center gap-2 font-semibold" onClick={onBack}>← Queue</button>
        <span className="pill" data-s={r.status}>{LABEL[r.status]}</span>
      </div>
      <div className="px-4 pt-6 lg:px-0">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="avatar !h-16 !w-16 !text-[1.2rem]">{initials(r.name)}</span>
            <div>
              <h2 style={{ fontSize: 'clamp(1.9rem, 3vw, 2.6rem)', lineHeight: 1 }}>{r.name}</h2>
              <p className="mt-1 text-moss">{[r.age && `${r.age} years`, r.gender, r.city].filter(Boolean).join(' · ')}</p>
            </div>
          </div>
          <div className="text-right text-[0.85rem] text-moss">
            <p className="font-semibold text-ink">{r.id}{r.demo && <span className="ml-2 rounded-[3px] border border-[var(--rule)] px-1.5 text-[0.7rem]">DEMO</span>}</p>
            <p>Received {ago(r.createdAt, now)}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-[1.4fr_1fr]">
          <a href={tel} className="btn btn-primary justify-center !min-h-[60px] text-[1.1rem]" onClick={() => { if (r.status === 'new') onPatch({ status: 'called' }); }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
            Call +91 {r.phone.replace(/(\d{5})(\d{5})/, '$1 $2')}
          </a>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-ghost justify-center !min-h-[60px]">WhatsApp</a>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-[0.92rem] sm:grid-cols-3">
          <div className="border-t border-[var(--rule)] pt-2"><dt className="label text-moss">Best time</dt><dd className="m-0 mt-1 font-semibold">{r.callTime ?? 'Any time'}</dd></div>
          <div className="border-t border-[var(--rule)] pt-2"><dt className="label text-moss">Language</dt><dd className="m-0 mt-1 font-semibold">{r.language ?? (r.locale === 'ta' ? 'Tamil' : 'English')}</dd></div>
          <div className="border-t border-[var(--rule)] pt-2"><dt className="label text-moss">Type</dt><dd className="m-0 mt-1 font-semibold">{r.kind === 'callback' ? 'Call back' : `Cart · ${total} items`}</dd></div>
        </dl>

        <div className="mt-8">
          <p className="label text-moss">Patient’s concern</p>
          <p className="mt-3 font-display text-[1.5rem] leading-snug">{r.concern ? `“${r.concern}”` : <span className="text-moss">No details given. Ask on the call.</span>}</p>
        </div>

        {r.items.length > 0 && (
          <div className="mt-8">
            <p className="label text-moss">Cart · {total} items</p>
            <ul className="m-0 mt-3 grid list-none gap-3 p-0 sm:grid-cols-2">
              {r.items.map(i => {
                const p = pmap.get(i.slug);
                return (
                  <li key={i.slug} className="flex items-center gap-3 rounded-[3px] border border-[var(--rule)] bg-paper2 p-2.5">
                    <div className="relative h-14 w-14 flex-none overflow-hidden rounded-[3px] bg-paper">{p && <Image src={`/${p.image}`} alt="" fill sizes="56px" className="object-cover" />}</div>
                    <div className="min-w-0 flex-1"><p className="text-[0.78rem] text-moss">{p?.category}</p><p className="font-semibold leading-tight">{i.name}</p></div>
                    <span className="font-display text-[1.5rem]">×{i.qty}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div className="mt-10 border-t border-[var(--ink)] pt-6">
          <div className="flex items-center justify-between gap-3">
            <p className="label">Your advice</p>
            {saved && <span className="text-[0.85rem] font-semibold text-moss" role="status">Saved. The patient can see this.</span>}
          </div>
          <label className="field mt-4">
            <span className="sr-only">Note for the patient</span>
            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="What you advised on the call. The patient sees this on their tracking page." />
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            {QUICK.map(s => <button key={s} type="button" className="chip !min-h-[36px] !text-[0.82rem]" onClick={() => setNote(n => (n ? `${n} ${s}` : s))}>+ {s}</button>)}
          </div>
          <div className="outcome mt-6">
            {(['approved', 'visit', 'declined'] as Status[]).map(s => (
              <button key={s} type="button" data-s={s} aria-pressed={r.status === s} onClick={() => decide(s)}>
                <b>{LABEL[s]}</b>
                <small>{s === 'approved' ? 'Ready to collect' : s === 'visit' ? 'See in person first' : 'Advise against'}</small>
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-[0.9rem]">
            {r.status === 'new' && <button type="button" className="font-semibold underline underline-offset-4" onClick={() => onPatch({ status: 'called' })}>Mark as called</button>}
            {r.status !== 'new' && <button type="button" className="font-semibold text-moss underline underline-offset-4" onClick={() => onPatch({ status: 'new' })}>Move back to “To call”</button>}
            <button type="button" className="font-semibold underline underline-offset-4" onClick={() => { onPatch({ doctorNote: note }); setSaved(true); setTimeout(() => setSaved(false), 2200); }}>Save note only</button>
            <a href={`/track/${r.id}`} target="_blank" className="font-semibold text-moss underline underline-offset-4">Patient’s view ↗</a>
          </div>
        </div>

        <div className="mt-10">
          <p className="label text-moss">History</p>
          <ol className="m-0 mt-3 list-none p-0 text-[0.9rem]">
            {[...r.history].reverse().map((h, n) => (
              <li key={n} className="flex justify-between gap-4 border-b border-[var(--rule)] py-2"><span>{LABEL[h.status]}</span><span className="text-moss">{new Date(h.at).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })}</span></li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
