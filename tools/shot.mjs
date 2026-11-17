// usage: node shot.mjs <url> <out-prefix> <width> [--mobile] [--reduced] [--noscroll] [--vh=900] [--seg=1400]
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
const [url, out, widthS, ...flags] = process.argv.slice(2);
const width = +widthS, mobile = flags.includes('--mobile'), reduced = flags.includes('--reduced'), noscroll = flags.includes('--noscroll');
const vh = +(flags.find(f => f.startsWith('--vh='))?.slice(5) ?? (mobile ? 844 : 900));
const seg = +(flags.find(f => f.startsWith('--seg='))?.slice(6) ?? 1400);
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--hide-scrollbars'] });
const page = await browser.newPage();
await page.setViewport({ width, height: vh, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
if (reduced) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
await page.goto(url, { waitUntil: 'load', timeout: 60000 });
await new Promise(r => setTimeout(r, 1800));
if (!noscroll) { // scroll like a visitor so every reveal fires, then return to top
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += Math.round(vh * 0.6)) { await page.evaluate(v => window.scrollTo(0, v), y); await new Promise(r => setTimeout(r, 140)); }
  await page.evaluate(() => window.scrollTo(0, 0)); await new Promise(r => setTimeout(r, 1500));
}
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
const buf = await page.screenshot({ fullPage: true, type: 'png' });
await browser.close();
const full = flags.find(f => f.startsWith('--full='))?.slice(7);
if (full) await sharp(buf).jpeg({ quality: 68 }).toFile(full);
const m = await sharp(buf).metadata();
const n = Math.ceil(m.height / seg);
for (let i = 0; i < n; i++) await sharp(buf).extract({ left: 0, top: i * seg, width: m.width, height: Math.min(seg, m.height - i * seg) }).jpeg({ quality: 80 }).toFile(`${out}_${i}.jpg`);
console.log(JSON.stringify({ width: m.width, height: m.height, segments: n, horizontalOverflowPx: overflow }));
