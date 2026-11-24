import { NextResponse } from 'next/server';
import { checkPin, COOKIE, sessionToken } from '@/lib/doctorAuth';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { pin } = (await req.json().catch(() => ({}))) as { pin?: string };
  if (!checkPin(String(pin ?? ''))) {
    await new Promise(r => setTimeout(r, 600)); // slow down guessing
    return NextResponse.json({ error: 'wrong pin' }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, sessionToken(), { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 12 });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(COOKIE);
  return res;
}
