// Horizontal-overflow sweep over many routes and widths in one browser: node sweep.mjs <base>
import puppeteer from 'puppeteer-core';
const base = process.argv[2];
const routes = ['/', '/ta', '/about-us', '/treatments', '/offerings', '/products', '/products/narmadha-pain-care-oil', '/ta/products/narmadha-pain-care-oil', '/panchakarma', '/ta/panchakarma', '/consult', '/gallery', '/contact-us', '/varmatherapy', '/yoga-meditation', '/ta/about-us'];
const widths = [360, 390, 430, 820, 1024, 1440];
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
const bad = []; let n = 0;
for (const r of routes) {
  const p = await b.newPage();
  for (const w of widths) {
    await p.setViewport({ width: w, height: 800, isMobile: w < 800, hasTouch: w < 800 });
    const res = await p.goto(base + r, { waitUntil: 'load', timeout: 60000 });
    await new Promise(x => setTimeout(x, 450));
    const o = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    n++; if (o > 0 || res.status() >= 400) bad.push(`${r} @${w}: overflow ${o}px, status ${res.status()}`);
  }
  await p.close();
}
await b.close();
console.log(`${n} checks, ${bad.length} problems`); bad.forEach(x => console.log(' ', x));
