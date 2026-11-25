// Usage: node build-images.mjs <old-assets-dir> <content-dir>
// Reads the old site's assets (read-only), writes optimised WebP + reports into <content-dir>.
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { manifest, MAX_W, MAX_KB, excludedByPath, POSTER_REASON } from './manifest.mjs';
import { duotone, halftone } from './treat.mjs';

const [R, C] = process.argv.slice(2);
if (!R || !C) { console.error('usage: node build-images.mjs <assets> <content>'); process.exit(1); }
const IMG = path.join(C, 'images');
const NEWP = process.env.NEW_PRODUCTS_DIR || '/Users/ramvenkateshk/Documents/sda-website/images of new products';
fs.rmSync(IMG, { recursive: true, force: true });

/** crop700 = [x0,y0,x1,y1] measured on a 700px-wide preview of the source; scaled to the real pixels here. */
async function cropBox(srcPath, crop700) {
  const meta = await sharp(srcPath).metadata();
  const k = meta.width / 700;
  return { left: Math.round(crop700[0] * k), top: Math.round(crop700[1] * k), width: Math.round((crop700[2] - crop700[0]) * k), height: Math.round((crop700[3] - crop700[1]) * k) };
}
async function encode(srcPath, outPath, maxW, alpha, grade, crop700) {
  const box = crop700 ? await cropBox(srcPath, crop700) : null;
  let width = maxW;
  for (let attempt = 0; attempt < 8; attempt++) {
    for (let q = 82; q >= 40; q -= 6) {
      let pipe = sharp(srcPath).rotate(); if (box) pipe = pipe.extract(box); pipe = pipe.resize({ width, withoutEnlargement: true });
      // one-time warm grade: calm neon colours toward the paper palette (baked, never a live CSS filter)
      if (grade) pipe = pipe.modulate({ saturation: 0.74 }).recomb([[1.03, 0.0, 0.0], [0.0, 1.0, 0.0], [0.0, 0.0, 0.9]]);
      const buf = await pipe
        .webp({ quality: q, effort: 5, alphaQuality: alpha ? 80 : 100, smartSubsample: true })
        .toBuffer();
      if (buf.length <= MAX_KB * 1024) { fs.mkdirSync(path.dirname(outPath), { recursive: true }); fs.writeFileSync(outPath, buf); return { q, width, bytes: buf.length }; }
    }
    width = Math.round(width * 0.85);
  }
  throw new Error('cannot fit under budget: ' + srcPath);
}

async function encodeDuotone(srcPath, outPath, maxW, alpha) {
  let width = maxW;
  for (let attempt = 0; attempt < 8; attempt++) {
    for (let q = 78; q >= 40; q -= 6) {
      const d = await duotone(srcPath, width);
      const buf = await d.sharp.webp({ quality: q, effort: 5, alphaQuality: 80, smartSubsample: true }).toBuffer();
      if (buf.length <= MAX_KB * 1024) { fs.mkdirSync(path.dirname(outPath), { recursive: true }); fs.writeFileSync(outPath, buf); return { q, width, bytes: buf.length }; }
    }
    width = Math.round(width * 0.85);
  }
  throw new Error('cannot fit under budget: ' + srcPath);
}
/** Halftone twin (*.ht.webp) must stay under 150 KB. */
async function encodeHalftone(srcPath, outPath) {
  for (const [w, cell] of [[1000, 9], [1000, 10], [900, 10], [900, 11], [800, 11]]) {
    const h = await halftone(srcPath, w, cell);
    for (const q of [70, 60, 50]) { const buf = await h.sharp.webp({ quality: q, effort: 5 }).toBuffer(); if (buf.length <= 150 * 1024) { fs.writeFileSync(outPath, buf); return { bytes: buf.length, w: h.width, h: h.height }; } }
  }
  return null;
}
const rows = [];
for (const m of manifest) {
  const sp = m.abs ? path.join(NEWP, m.src) : path.join(R, m.src);
  if (!fs.existsSync(sp)) { console.error('MISSING', m.src); process.exit(1); }
  const meta = await sharp(sp).metadata();
  // every photograph gets the green duotone; logo, products and brand art are left in their own colours
  /* decided: original photographs, no tone, no filter */ const toned = false;
  const r = toned ? await encodeDuotone(sp, path.join(IMG, m.out), Math.min(m.maxW ?? MAX_W, MAX_W), m.alpha) : await encode(sp, path.join(IMG, m.out), Math.min(m.maxW ?? MAX_W, MAX_W), m.alpha, false, m.crop700);
  let ht = null;
  /* halftone twins removed: original photographs only */ if (false) { const hp = m.out.replace(/\.webp$/, '.ht.webp'); const hr = await encodeHalftone(sp, path.join(IMG, hp)); if (hr) ht = { file: 'images/' + hp, kb: Math.round(hr.bytes / 1024), width: hr.w, height: hr.h }; }
  const o = await sharp(path.join(IMG, m.out)).metadata();
  rows.push({ ...m, ht, srcW: meta.width, srcH: meta.height, outW: o.width, outH: o.height, kb: Math.round(r.bytes / 1024) });
}

// -------- brand icons (small PNGs, copied as-is) ----------------------------
const icons = [['fav/android-icon-192x192.png', 'brand/icon-192.png'], ['fav/logo512.png', 'brand/icon-512.png'], ['fav/apple-icon-180x180.png', 'brand/apple-touch-icon.png'], ['fav/favicon-32x32.png', 'brand/favicon-32.png']];
for (const [s, d] of icons) { const dp = path.join(IMG, d); fs.mkdirSync(path.dirname(dp), { recursive: true }); fs.copyFileSync(path.join(R, '..', s), dp); }

// -------- default social-share card: the logo on paper, 1200x630 --------
{
  const logo = await sharp(path.join(R, 'logo/log-large.png')).resize({ width: 820 }).png().toBuffer();
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#F4ECDD' } })
    .composite([{ input: logo, gravity: 'center' }]).jpeg({ quality: 88 }).toFile(path.join(IMG, 'brand/og-default.jpg'));
}

// -------- machine-readable manifest ----------------------------------------
fs.writeFileSync(path.join(C, 'images.json'), JSON.stringify(rows.map(r => ({
  file: 'images/' + r.out, ht: r.ht, width: r.outW, height: r.outH, kb: r.kb, status: r.status, category: r.cat, alt: { en: r.en, ta: r.ta }, source: r.src, note: r.note ?? null,
})), null, 2) + '\n');

// -------- photo-sources.md ---------------------------------------------------
const label = { include: 'Use', 'pending-confirmation': 'PENDING: owner must confirm', 'stock-unverified': 'HOLD: licence unknown', 'provisional-product': 'Provisional (replace with clean packshot)' };
let md = '# Photo sources\n\nEvery image in `content/images/`, where it came from in the old site (`public_html/assets/`), and its status.\n\n';
md += 'Statuses: **Use** = clinic\'s own photo; **PENDING** = identity/use needs the owner\'s confirmation; **HOLD** = looks like stock, licence unknown, not to go live until proven; **Provisional** = old marketing creative with text baked in.\n\n';
md += '| New file | Old source | Status | Size | Note |\n|---|---|---|---|---|\n';
for (const r of rows) md += `| \`${r.out}\` | \`${r.src}\` | ${label[r.status]} | ${r.outW}×${r.outH}, ${r.kb} KB | ${r.note ?? ''} |\n`;
md += '\nBrand icons `brand/icon-*.png`, `apple-touch-icon.png`, `favicon-32.png` were copied unchanged from the old `fav/` folder.\n';
fs.writeFileSync(path.join(C, 'photo-sources.md'), md);

// -------- excluded-images.md -------------------------------------------------
const oldAssets = manifest.filter(m => !m.abs); // the new-product photos live outside the old site
const used = new Set(oldAssets.map(m => m.src));
const skipDirs = new Set(['fontawesome', 'js', 'css', 'swiper', 'svg', 'icons']);
const all = [];
(function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) { if (!skipDirs.has(e.name)) walk(p); } else all.push(path.relative(R, p)); } })(R);

const hash = f => crypto.createHash('sha1').update(fs.readFileSync(path.join(R, f))).digest('hex');
const usedHashes = new Map(oldAssets.map(m => [hash(m.src), m.src]));
function reason(f) {
  if (excludedByPath[f]) return excludedByPath[f];
  const ext = path.extname(f).toLowerCase();
  if (['.psd', '.bat'].includes(ext)) return 'Design source / script, not a web image';
  if (['.woff', '.woff2'].includes(ext)) return 'Old web font; new site self-hosts different fonts';
  if (ext === '.mp4') return 'Video; deferred';
  const h = hash(f); if (usedHashes.has(h)) return `Exact duplicate of ${usedHashes.get(h)}, which is used`;
  if (f.startsWith('gallery/Old/')) return 'Older version of a gallery image (superseded by the numbered files in gallery/); many are early product ads';
  if (/^gallery\/\d+\.webp$/.test(f)) return POSTER_REASON;
  if (f.startsWith('slider/')) return 'Old homepage slider variant or unused slide; the new site uses its own hero photography';
  if (f.startsWith('bgs/') || f.startsWith('static/')) return 'Decorative background/texture from the old design';
  if (f.startsWith('faculties/rounded/')) return 'Other staff member: only the two named in the brief are published; add others only with their consent and details';
  if (f.startsWith('faculties/')) return 'Other staff member or uncropped original: not published without owner confirmation';
  if (f.startsWith('images/')) return 'Old template graphic (Kerala tourism, generic wellness) unrelated to this clinic';
  if (f.startsWith('logo/')) return 'Alternate logo/favicon variant; logo.png used';
  if (f.startsWith('banners/')) return 'Old page banner with text/logo baked in (and PSDs); new design uses full-bleed photography instead';
  if (f.startsWith('offerings/')) return 'Old offerings thumbnail or upload-named duplicate; low resolution';
  if (f.startsWith('other/')) return 'Old decorative or duplicate image (note: “narmatha-*” files duplicate the “narmadha-*” ones)';
  return 'Not used by the new design';
}
const ex = all.filter(f => !used.has(f)).sort().map(f => ({ f, kb: Math.round(fs.statSync(path.join(R, f)).size / 1024), why: reason(f) }));
let em = '# Excluded images\n\nEverything in the old `assets/` folder that is **not** in `content/images/`, with the reason. Fonts, JS, CSS and icon-font folders (`fontawesome`, `js`, `css`, `swiper`, `svg`, `icons`) are code, not photos, and are omitted from this list.\n\n';
const counts = {}; ex.forEach(e => counts[e.why] = (counts[e.why] || 0) + 1);
em += `${ex.length} files excluded of ${all.length} scanned (${(ex.reduce((a, e) => a + e.kb, 0) / 1024).toFixed(0)} MB).\n\n| File | Size | Reason |\n|---|---|---|\n`;
for (const e of ex) em += `| \`${e.f}\` | ${e.kb} KB | ${e.why} |\n`;
fs.writeFileSync(path.join(C, 'excluded-images.md'), em);

const tot = rows.reduce((a, r) => a + r.kb, 0);
console.log(`converted ${rows.length} images, total ${tot} KB, largest ${Math.max(...rows.map(r => r.kb))} KB; excluded ${ex.length}/${all.length}`);
