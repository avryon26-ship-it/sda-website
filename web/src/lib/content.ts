import en from '@/content/content.en.json';
import ta from '@/content/content.ta.json';

export type Locale = 'en' | 'ta';
export type Content = typeof en;
export const SITE_URL = 'https://sridhanvanthriayurveda.com';

export function getContent(locale: Locale): Content {
  return (locale === 'ta' ? ta : en) as Content;
}
/** English lives at the root, Tamil under /ta. No trailing slash. */
export function localePath(locale: Locale, path: string): string {
  const p = path === '/' ? '' : path;
  return locale === 'ta' ? `/ta${p}` || '/ta' : p || '/';
}
export const NAV = [
  { key: 'about', path: '/about-us' },
  { key: 'treatments', path: '/treatments' },
  { key: 'offerings', path: '/offerings' },
  { key: 'products', path: '/products' },
  { key: 'gallery', path: '/gallery' },
  { key: 'contact', path: '/contact-us' },
] as const;

export function waLink(number: string, text: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
export const telHref = (p: string) => `tel:${p.replace(/\s/g, '')}`;

export const mapsUrl = (c: Content) => {
  const a = c.site.address;
  const q = `Sri Dhanvanthri Ayurveda, ${a.line1}, ${a.line2}, ${a.city} ${a.postalCode}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
};
/** Alternate-language path for the language switch. */
export function altPath(locale: Locale, pathname: string): string {
  if (locale === 'en') return pathname === '/' ? '/ta' : `/ta${pathname}`;
  const p = pathname.replace(/^\/ta/, '');
  return p === '' ? '/' : p;
}
export const consultMsg = (locale: Locale, about?: string) =>
  locale === 'ta'
    ? `வணக்கம், ${about ? about + ' பற்றி ' : ''}மருத்துவரிடம் ஆலோசனை பெற விரும்புகிறேன்.`
    : `Hello, I would like to consult the doctor${about ? ' about ' + about : ''}.`;
