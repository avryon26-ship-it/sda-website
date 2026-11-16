// usage: node contact.mjs <outfile.jpg> <cell> <cols> <base> <file1> <file2> ...
import sharp from 'sharp'; import path from 'path';
const [out, cellS, colsS, base, ...files] = process.argv.slice(2);
const cell = +cellS, cols = +colsS, lab = 34, pad = 8;
const rows = Math.ceil(files.length / cols);
const W = cols * (cell + pad) + pad, H = rows * (cell + lab + pad) + pad;
const comps = [];
for (let i = 0; i < files.length; i++) {
  const f = files[i]; const x = pad + (i % cols) * (cell + pad), y = pad + Math.floor(i / cols) * (cell + lab + pad);
  try {
    const buf = await sharp(path.join(base, f)).rotate().resize(cell, cell, { fit: 'contain', background: '#222' }).jpeg({ quality: 80 }).toBuffer();
    comps.push({ input: buf, left: x, top: y });
  } catch (e) { /* skip unreadable */ }
  const name = f.length > 34 ? '…' + f.slice(-33) : f;
  const svg = `<svg width="${cell}" height="${lab}"><text x="2" y="22" font-size="17" font-family="Helvetica" fill="#fff">${i + 1}. ${name.replace(/&/g,'and')}</text></svg>`;
  comps.push({ input: Buffer.from(svg), left: x, top: y + cell });
}
await sharp({ create: { width: W, height: H, channels: 3, background: '#111' } }).composite(comps).jpeg({ quality: 78 }).toFile(out);
console.log(out, W + 'x' + H);
