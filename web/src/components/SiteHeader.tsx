import { type Locale, getContent, localePath, NAV, waLink, telHref, consultMsg } from '@/lib/content';
import HeaderClient from './HeaderClient';

export default function SiteHeader({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  return (
    <HeaderClient
      locale={locale}
      home={localePath(locale, '/')}
      title={locale === 'ta' ? 'ஸ்ரீ தன்வந்திரி' : 'Sri Dhanvanthri'}
      sub={locale === 'ta' ? c.site.city : `Ayurveda · ${c.site.city}`}
      items={NAV.map(n => ({ href: localePath(locale, n.path), label: c.nav[n.key] }))}
      labels={{ menu: c.nav.menu, close: c.nav.close, language: c.nav.language, consult: c.cta.freeConsult, callUs: `${c.cta.call} · ${c.site.phones[0]}` }}
      wa={waLink(c.site.whatsapp, consultMsg(locale))}
      call={telHref(c.site.phones[0])}
    />
  );
}
