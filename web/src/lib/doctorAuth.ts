import crypto from 'crypto';
import { cookies } from 'next/headers';

/** The doctor's screen is behind a PIN. The cookie holds an HMAC of the PIN, never the PIN itself.
 *  Set DOCTOR_PIN and JWT_SECRET in web/.env.local (see ../.env.example). */
export const COOKIE = 'sda_doctor';
const pin = () => process.env.DOCTOR_PIN || (process.env.NODE_ENV !== 'production' ? '2468' : '');
const secret = () => process.env.JWT_SECRET || 'dev-only-secret-change-me';
const token = () => crypto.createHmac('sha256', secret()).update(`doctor:${pin()}`).digest('base64url');

export function checkPin(input: string) {
  const p = pin();
  if (!p) return false;
  const a = Buffer.from(String(input)), b = Buffer.from(p);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
export const sessionToken = token;
export async function isDoctor() {
  const v = (await cookies()).get(COOKIE)?.value;
  if (!v || !pin()) return false;
  const t = token();
  return v.length === t.length && crypto.timingSafeEqual(Buffer.from(v), Buffer.from(t));
}
