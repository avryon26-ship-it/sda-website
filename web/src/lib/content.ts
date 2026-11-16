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
