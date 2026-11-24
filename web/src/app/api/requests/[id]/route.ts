import { NextResponse } from 'next/server';
import { STATUSES, updateRequest, type Status } from '@/lib/requests';
import { isDoctor } from '@/lib/doctorAuth';

export const dynamic = 'force-dynamic';

/** Doctor records the outcome of a call: status and an optional note the patient can read. */
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isDoctor())) return NextResponse.json({ error: 'unauthorised' }, { status: 401 });
  const { id } = await params;
  const b = (await req.json().catch(() => ({}))) as { status?: string; doctorNote?: string };
  const status = STATUSES.includes(b.status as Status) ? (b.status as Status) : undefined;
  const r = await updateRequest(id, { status, doctorNote: typeof b.doctorNote === 'string' ? b.doctorNote : undefined });
  if (!r) return NextResponse.json({ error: 'not found' }, { status: 404 });
  return NextResponse.json(r);
}
