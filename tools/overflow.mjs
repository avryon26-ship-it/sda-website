import puppeteer from 'puppeteer-core';
const [url, w = '390'] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
const p = await b.newPage(); await p.setViewport({ width: +w, height: 844, isMobile: true, hasTouch: true });
await p.goto(url, { waitUntil: 'networkidle0' });
const out = await p.evaluate(() => { const W = document.documentElement.clientWidth; const r = [];
  document.querySelectorAll('body *').forEach(el => { const b = el.getBoundingClientRect(); if (b.width && b.right > W + 1 && getComputedStyle(el).position !== 'fixed' && !el.closest('.overlay') && !el.closest('.strip')) r.push(`${el.tagName.toLowerCase()}.${(el.className?.baseVal ?? el.className ?? '').toString().slice(0, 40)} right=${Math.round(b.right)} w=${Math.round(b.width)} :: ${(el.textContent || '').trim().slice(0, 30)}`); });
  return { W, scrollW: document.documentElement.scrollWidth, offenders: r.slice(0, 12) }; });
console.log(JSON.stringify(out, null, 1)); await b.close();
