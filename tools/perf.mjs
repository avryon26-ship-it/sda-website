// Quick mobile check: Slow-4G-ish network + 4x CPU slowdown. (Lighthouse proper runs in the QA phase.)
import puppeteer from 'puppeteer-core';
const url = process.argv[2];
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
const p = await b.newPage();
await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await p.setUserAgent('Mozilla/5.0 (Linux; Android 12; Moto G Power) AppleWebKit/537.36 Chrome/124 Mobile Safari/537.36');
const cdp = await p.createCDPSession();
await cdp.send('Network.enable');
await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
let bytes = 0; const reqs = [];
cdp.on('Network.loadingFinished', e => { bytes += e.encodedDataLength; });
cdp.on('Network.requestWillBeSent', e => reqs.push(e.request.url));
await p.evaluateOnNewDocument(() => {
  window.__m = { lcp: 0, lcpEl: '', cls: 0 };
  new PerformanceObserver(l => { for (const e of l.getEntries()) { window.__m.lcp = e.startTime; window.__m.lcpEl = (e.element?.tagName || '') + ' ' + (e.url || '').split('/').pop().slice(0, 40); } }).observe({ type: 'largest-contentful-paint', buffered: true });
  new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__m.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
});
await p.goto(url, { waitUntil: 'networkidle0', timeout: 90000 });
await new Promise(r => setTimeout(r, 2500));
const m = await p.evaluate(() => window.__m);
const heavy = reqs.filter(u => /gsap|lenis|ScrollTrigger/i.test(u)).length;
console.log(JSON.stringify({ url, LCP_ms: Math.round(m.lcp), LCP_element: m.lcpEl.trim(), CLS: +m.cls.toFixed(4), transferred_KB: Math.round(bytes / 1024), requests: reqs.length, motionLibraryRequests: heavy }));
await b.close();
