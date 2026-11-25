// Horizontal-overflow sweep over many routes and widths in one browser: node sweep.mjs <base>
import puppeteer from 'puppeteer-core';
const base = process.argv[2];
const routes = ['/','/ta','/about-us','/ta/about-us','/treatments','/ta/treatments','/offerings','/ta/offerings','/products','/panchakarma','/ta/panchakarma','/consult','/gallery','/ta/gallery','/contact-us','/ta/contact-us','/varmatherapy','/ta/varmatherapy','/yoga-meditation','/ta/yoga-meditation'];
const widths = [360, 390, 430, 820, 1024, 1440];
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
const bad = []; let n = 0;
for (const r of routes) {
  const p = await b.newPage();
  for (const w of widths) {
    await p.setViewport({ width: w, height: 800, isMobile: w < 800, hasTouch: w < 800 });
    let res; try { res = await p.goto(base + r, { waitUntil: "load", timeout: 120000 }); } catch (e) { bad.push(r + " TIMEOUT"); continue; }
    await new Promise(x => setTimeout(x, 450));
    const o = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    n++; if (o > 0 || res.status() >= 400) bad.push(`${r} @${w}: overflow ${o}px, status ${res.status()}`);
  }
  await p.close();
}
await b.close();
console.log(`${n} checks, ${bad.length} problems`); bad.forEach(x => console.log(' ', x));
