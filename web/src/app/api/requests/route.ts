import { NextResponse } from 'next/server';
import { createRequest, listRequests } from '@/lib/requests';
import { isDoctor } from '@/lib/doctorAuth';
import en from '@/content/content.en.json';

export const dynamic = 'force-dynamic';
const names = new Map(en.products.map(p => [p.slug, p.name]));
const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

/** Patient sends a cart (or a call-back request). No payment, no account. */
export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return NextResponse.json({ error: 'bad json' }, { status: 400 }); }
  if (b.website) return NextResponse.json({ ok: true, id: 'SDA-THANKS' }); // honeypot

  const name = str(b.name, 80);
  const phone = str(b.phone, 20).replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
  const concern = str(b.concern, 1500);
  const kind = b.kind === 'callback' ? 'callback' : 'cart';
  const items = (Array.isArray(b.items) ? b.items : [])
    .map((i: { slug?: unknown; qty?: unknown }) => ({ slug: String(i?.slug ?? ''), qty: Math.max(1, Math.min(10, Number(i?.qty) || 1)) }))
    .filter(i => names.has(i.slug))
    .slice(0, 30)
    .map(i => ({ ...i, name: names.get(i.slug)! }));

  if (!name || !/^[6-9]\d{9}$/.test(phone) || !b.consent) return NextResponse.json({ error: 'invalid' }, { status: 422 });
  if (kind === 'cart' && !items.length) return NextResponse.json({ error: 'empty cart' }, { status: 422 });

  const age = Number(b.age);
  const r = await createRequest({
    kind, locale: b.locale === 'ta' ? 'ta' : 'en', name, phone, concern, items,
    age: Number.isFinite(age) && age > 0 && age < 120 ? Math.round(age) : undefined,
    gender: str(b.gender, 30) || undefined, city: str(b.city, 60) || undefined,
    callTime: str(b.callTime, 40) || undefined, language: str(b.language, 20) || undefined,
  });
  return NextResponse.json({ ok: true, id: r.id });
}

export async function GET() {
  if (!(await isDoctor())) return NextResponse.json({ error: 'unauthorised' }, { status: 401 });
  return NextResponse.json(await listRequests());
}
