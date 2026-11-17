import puppeteer from 'puppeteer-core';
const S = process.argv[2];
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--hide-scrollbars'] });
const p = await b.newPage(); await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://localhost:3100/', { waitUntil: 'networkidle0' }); await new Promise(r => setTimeout(r, 2500));
const log = {};
log.lenisActive = await p.evaluate(() => document.documentElement.classList.contains('lenis'));
for (const [name, sel, off] of [['story2', '#story', 1500], ['story3', '#story', 2500], ['how', '#how', 500]]) {
  await p.evaluate((s, o) => { const t = document.querySelector(s).getBoundingClientRect().top + scrollY; window.scrollTo(0, t + o); }, sel, off);
  await new Promise(r => setTimeout(r, 2200));
  await p.screenshot({ path: `${S}/st_${name}.jpg`, type: 'jpeg', quality: 78 });
}
log.activeFrame = await p.evaluate(() => [...document.querySelectorAll('[data-frame]')].map(f => f.getAttribute('data-on')));
log.parallaxScale = await p.evaluate(() => document.querySelector('[data-parallax] img')?.style.transform || 'none');
console.log(JSON.stringify(log));
await b.close();
