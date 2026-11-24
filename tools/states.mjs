// Screenshots interactive states: node states.mjs <baseUrl> <outPrefix>
import puppeteer from 'puppeteer-core';
const [base, out] = process.argv.slice(2);
const wait = ms => new Promise(r => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
async function shot(name, { w = 390, h = 844, mobile = true, path = '/', fn = async () => {} } = {}) {
  const p = await b.newPage();
  await p.setViewport({ width: w, height: h, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1 });
  await p.goto(base + path, { waitUntil: 'load', timeout: 60000 }); await wait(1600);
  await fn(p); await wait(1000);
  await p.screenshot({ path: `${out}_${name}.jpg`, type: 'jpeg', quality: 80 });
  await p.close();
}
await shot('sheet', { fn: async p => { await p.evaluate(() => document.querySelector('.concern-tile')?.scrollIntoView({ block: 'center' })); await wait(500); await p.click('.concern-tile'); } });
await shot('cart', { fn: async p => { await p.evaluate(() => document.querySelector('.pc-btn')?.scrollIntoView({ block: 'center' })); await wait(600); await p.click('.pc-btn'); await wait(800); await p.click('.cart-btn'); } });
await shot('product', { path: '/products/narmadha-pain-care-oil' });
await shot('tamil', { path: '/ta' });
await shot('desktop-product', { w: 1440, h: 900, mobile: false, path: '/products/narmadha-pain-care-oil' });
await b.close(); console.log('states done');
