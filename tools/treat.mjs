// Vintage photo treatments, shared by the image pipeline: green duotone (keeps alpha) and 45-degree halftone.
import sharp from 'sharp';
export const DARK = [42, 62, 48], LIGHT = [233, 236, 210];

export async function duotone(input, width, { quality = 76, alpha = false } = {}) {
  const { data, info } = await sharp(input).rotate().resize({ width, withoutEnlargement: true }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const n = info.width * info.height, g = new Uint8Array(n); const hist = new Uint32Array(256); let opaque = 0;
  for (let i = 0; i < n; i++) { const y = Math.round(0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2]); g[i] = y; if (data[i * 4 + 3] > 8) { hist[y]++; opaque++; } }
  const pct = p => { let c = 0; for (let v = 0; v < 256; v++) { c += hist[v]; if (c >= opaque * p) return v; } return 255; };
  const lo = pct(0.03), hi = Math.max(lo + 1, pct(0.97));
  const out = Buffer.alloc(n * 4);
  for (let i = 0; i < n; i++) {
    const t = Math.min(1, Math.max(0, (g[i] - lo) / (hi - lo)));
    for (let k = 0; k < 3; k++) out[i * 4 + k] = Math.round(DARK[k] + (LIGHT[k] - DARK[k]) * t);
    out[i * 4 + 3] = data[i * 4 + 3];
  }
  return { sharp: sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }), width: info.width, height: info.height };
}

/** Halftone: dots on a 45-degree lattice, radius ~ sqrt(darkness). Returns a sharp pipeline of the rasterised SVG. */
export async function halftone(input, width, cell) {
  const { data, info } = await sharp(input).rotate().resize({ width, withoutEnlargement: true }).flatten({ background: '#E9E6D2' }).greyscale().normalise({ lower: 3, upper: 97 }).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height, a = Math.PI / 4, ca = Math.cos(a), sa = Math.sin(a), R = Math.ceil((w + h) / cell), dots = [];
  for (let i = -R; i <= R; i++) for (let j = -R; j <= R; j++) {
    const x = w / 2 + (i * ca - j * sa) * cell, y = h / 2 + (i * sa + j * ca) * cell;
    if (x < 0 || y < 0 || x >= w || y >= h) continue;
    let s = 0, c = 0; for (let dy = -2; dy <= 2; dy += 2) for (let dx = -2; dx <= 2; dx += 2) { const xx = Math.min(w - 1, Math.max(0, Math.round(x + dx))), yy = Math.min(h - 1, Math.max(0, Math.round(y + dy))); s += data[yy * w + xx]; c++; }
    const r = cell * 0.74 * Math.sqrt(Math.max(0, 1 - s / c / 255));
    if (r > 0.5) dots.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}"/>`);
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="100%" height="100%" fill="rgb(${LIGHT})"/><g fill="rgb(${DARK})">${dots.join('')}</g></svg>`;
  return { sharp: sharp(Buffer.from(svg)), width: w, height: h };
}
