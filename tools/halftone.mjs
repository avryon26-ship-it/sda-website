// Bakes the vintage photo treatments used on the mood board: node halftone.mjs <in> <outPrefix> <width> [cell]
import sharp from 'sharp';
const [inp, out, widthS, cellS] = process.argv.slice(2);
const W = +widthS, cell = +(cellS ?? 8);
const DARK = [42, 62, 48], LIGHT = [233, 236, 210];   // faded ink green -> pale celadon paper
const base = sharp(inp).rotate().resize({ width: W }).greyscale().normalise({ lower: 3, upper: 97 });
const { data, info } = await base.raw().toBuffer({ resolveWithObject: true });
const w = info.width, h = info.height;
// 1) duotone
const rgb = Buffer.alloc(w * h * 3);
for (let i = 0; i < w * h; i++) { const t = data[i] / 255; for (let k = 0; k < 3; k++) rgb[i * 3 + k] = Math.round(DARK[k] + (LIGHT[k] - DARK[k]) * t); }
await sharp(rgb, { raw: { width: w, height: h, channels: 3 } }).webp({ quality: 74 }).toFile(`${out}-duotone.webp`);
// 2) halftone: dots on a 45-degree lattice, radius proportional to darkness
const dots = []; const a = Math.PI / 4, ca = Math.cos(a), sa = Math.sin(a);
const R = Math.ceil((w + h) / cell);
for (let i = -R; i <= R; i++) for (let j = -R; j <= R; j++) {
  const x = w / 2 + (i * ca - j * sa) * cell, y = h / 2 + (i * sa + j * ca) * cell;
  if (x < 0 || y < 0 || x >= w || y >= h) continue;
  // average a small neighbourhood for smoother dots
  let s = 0, n = 0; for (let dy = -2; dy <= 2; dy += 2) for (let dx = -2; dx <= 2; dx += 2) { const xx = Math.min(w - 1, Math.max(0, Math.round(x + dx))), yy = Math.min(h - 1, Math.max(0, Math.round(y + dy))); s += data[yy * w + xx]; n++; }
  const d = 1 - s / n / 255; const r = cell * 0.74 * Math.sqrt(Math.max(0, d));
  if (r > 0.45) dots.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}"/>`);
}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="100%" height="100%" fill="rgb(${LIGHT})"/><g fill="rgb(${DARK})">${dots.join('')}</g></svg>`;
await sharp(Buffer.from(svg)).webp({ quality: 78 }).toFile(`${out}-halftone.webp`);
console.log(out, `${w}x${h}`, dots.length, 'dots');
