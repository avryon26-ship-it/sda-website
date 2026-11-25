import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

/** Consultation requests (a cart sent to the doctor, or a call-back request from the contact page).
 *  Stored in one JSON file for the demo and the first launch. Swap for Postgres later: only this file changes. */
export type Status = 'new' | 'called' | 'approved' | 'visit' | 'declined';
export type Item = { slug: string; name: string; qty: number };
export type ConsultRequest = {
  id: string;
  kind: 'cart' | 'callback';
  createdAt: string;
  updatedAt: string;
  locale: 'en' | 'ta';
  name: string;
  phone: string;
  age?: number;
  gender?: string;
  city?: string;
  concern: string;
  callTime?: string;
  language?: string;
  items: Item[];
  status: Status;
  doctorNote?: string;
  history: { at: string; status: Status; note?: string }[];
  demo?: boolean;
};

const FILE = process.env.VERCEL ? '/tmp/requests.json' : path.join(process.cwd(), 'data', 'requests.json'); // Vercel disk is temporary: demo only
export const STATUSES: Status[] = ['new', 'called', 'approved', 'visit', 'declined'];

let queue: Promise<unknown> = Promise.resolve();
/** Serialise writes so two submissions at once cannot overwrite each other. */
function locked<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.catch(() => undefined);
  return run;
}

async function read(): Promise<ConsultRequest[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, 'utf8')) as ConsultRequest[];
  } catch {
    const seeded = seed();
    await write(seeded);
    return seeded;
  }
}
async function write(all: ConsultRequest[]) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  const tmp = `${FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(all, null, 2));
  await fs.rename(tmp, FILE);
}

/** Short, readable, hard-to-guess reference such as SDA-7K3QF9. */
function newId() {
  const abc = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  const b = crypto.randomBytes(6);
  return 'SDA-' + Array.from(b, x => abc[x % abc.length]).join('');
}

export async function listRequests() {
  const all = await read();
  return all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
export async function getRequest(id: string) {
  return (await read()).find(r => r.id === id) ?? null;
}
export function createRequest(input: Omit<ConsultRequest, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'history'>) {
  return locked(async () => {
    const all = await read();
    const now = new Date().toISOString();
    const r: ConsultRequest = { ...input, id: newId(), createdAt: now, updatedAt: now, status: 'new', history: [{ at: now, status: 'new' }] };
    all.push(r);
    await write(all);
    return r;
  });
}
export function updateRequest(id: string, patch: { status?: Status; doctorNote?: string }) {
  return locked(async () => {
    const all = await read();
    const r = all.find(x => x.id === id);
    if (!r) return null;
    const now = new Date().toISOString();
    if (patch.doctorNote !== undefined) r.doctorNote = patch.doctorNote.slice(0, 2000);
    if (patch.status && patch.status !== r.status) {
      r.status = patch.status;
      r.history.push({ at: now, status: patch.status, note: patch.doctorNote });
    }
    r.updatedAt = now;
    await write(all);
    return r;
  });
}

/** Demo queue so the doctor's screen is not empty the first time it opens. Every entry is marked demo. */
function seed(): ConsultRequest[] {
  const ago = (h: number) => new Date(Date.now() - h * 3600_000).toISOString();
  const mk = (id: string, h: number, r: Partial<ConsultRequest>): ConsultRequest => ({
    id, kind: 'cart', createdAt: ago(h), updatedAt: ago(h), locale: 'ta', name: '', phone: '', concern: '', items: [], status: 'new',
    history: [{ at: ago(h), status: 'new' }], demo: true, ...r,
  });
  return [
    mk('SDA-DEMO01', 0.4, { name: 'Lakshmi Narayanan', phone: '9840012345', age: 54, gender: 'Female', city: 'Palayamkottai', callTime: 'Evening (4 to 8)', language: 'Tamil',
      concern: 'Knee pain for about two years, worse on stairs. Taking a BP tablet every morning.',
      items: [{ slug: 'narmadha-pain-care-oil', name: 'Narmadha Pain Care Oil', qty: 2 }, { slug: 'narmadha-bathing-soap', name: 'Narmadha Ayurvedic Bathing Soap', qty: 1 }] }),
    mk('SDA-DEMO02', 2.2, { name: 'Arun Kumar', phone: '9443056789', age: 32, gender: 'Male', city: 'Tirunelveli Town', callTime: 'Afternoon (12 to 4)', language: 'English', locale: 'en',
      concern: 'Indigestion and bloating after meals for a few months. No regular medicines.',
      items: [{ slug: 'narmadha-seerana-sanjeevi-sooranam', name: 'Narmadha Seerana Sanjeevi Sooranam', qty: 1 }, { slug: 'narmadha-omam-water', name: 'Narmadha Omam Water', qty: 1 }] }),
    mk('SDA-DEMO03', 5, { name: 'Meena Subramanian', phone: '9566078901', age: 41, gender: 'Female', city: 'Thoothukudi', callTime: 'Morning (9 to 12)', language: 'Tamil',
      concern: 'Hair fall since my thyroid diagnosis last year. On thyroxine 50 mcg.',
      items: [{ slug: 'narmadha-kesha-raksha-oil', name: 'Narmadha Kesha Raksha Oil', qty: 1 }] }),
    mk('SDA-DEMO04', 26, { name: 'Rajesh Pandian', phone: '9787034567', age: 63, gender: 'Male', city: 'Ambasamudram', callTime: 'Any time', language: 'Tamil', status: 'visit',
      concern: 'Numbness in both feet. Diabetic for 15 years, on metformin and insulin.',
      doctorNote: 'Needs foot examination and sugar report before any internal medicine. Asked to visit on Saturday morning.',
      items: [{ slug: 'narmadha-pain-care-oil', name: 'Narmadha Pain Care Oil', qty: 1 }, { slug: 'narmadha-thakasa-sooranam', name: 'Narmadha Thakasa Sooranam', qty: 1 }],
      history: [{ at: ago(26), status: 'new' }, { at: ago(22), status: 'called' }, { at: ago(21.5), status: 'visit' }] }),
    mk('SDA-DEMO05', 50, { name: 'Priya Ramesh', phone: '9894023456', age: 28, gender: 'Female', city: 'V.M. Chatram', callTime: 'Evening (4 to 8)', language: 'English', locale: 'en', status: 'approved',
      concern: 'Dry skin and mild rashes in summer.',
      doctorNote: 'Patch test done on call guidance. Soap is fine. Collect from pharmacy.',
      items: [{ slug: 'narmadha-bathing-soap', name: 'Narmadha Ayurvedic Bathing Soap', qty: 3 }],
      history: [{ at: ago(50), status: 'new' }, { at: ago(47), status: 'called' }, { at: ago(46.8), status: 'approved' }] }),
  ];
}
