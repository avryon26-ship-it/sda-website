import Link from 'next/link';
import Image from 'next/image';
import { type Locale, getContent, localePath, NAV, waLink, telHref } from '@/lib/content';
import MobileNav from './MobileNav';

export default function SiteHeader({ locale, altHref }: { locale: Locale; altHref: string }) {
  const c = getContent(locale);
  const items = NAV.map(n => ({ href: localePath(locale, n.path), label: c.nav[n.key] }));
  const wa = { href: waLink(c.site.whatsapp, locale === 'ta' ? 'வணக்கம், ஆலோசனை பெற விரும்புகிறேன்.' : 'Hello, I would like to consult the doctor.'), label: c.cta.consult };
  const call = { href: telHref(c.site.phones[0]), label: c.cta.call };
  const title = locale === 'ta' ? c.site.shortName : 'Sri Dhanvanthri';
  const sub = locale === 'ta' ? c.site.city : `Ayurveda · ${c.site.city}`;
  return (
    <header className="glass-bar sticky top-0 z-50">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-5 lg:h-[72px] lg:px-8">
        <Link href={localePath(locale, '/')} className="flex items-center gap-3 no-underline" aria-label={c.site.name}>
          <Image src="/images/brand/logo.webp" alt="" width={56} height={40} className="hidden h-10 w-auto sm:block" priority />
          <span className="flex flex-col whitespace-nowrap leading-none">
            <span className={`font-display text-forest-900 lg:text-2xl ${locale === 'ta' ? 'text-[1.02rem]' : 'text-[1.35rem]'}`}>{title}</span>
            <span className="eyebrow mt-1 !text-[0.62rem] !tracking-[0.2em]">{sub}</span>
          </span>
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="m-0 flex list-none items-center gap-1 p-0">
            {items.map(i => (
              <li key={i.href}><Link href={i.href} className="whitespace-nowrap rounded-full px-4 py-2 text-[0.95rem] font-semibold text-ink no-underline transition-colors hover:bg-forest-900/5">{i.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-1 lg:gap-3">
          <Link href={altHref} hrefLang={locale === 'en' ? 'ta' : 'en'} lang={locale === 'en' ? 'ta' : 'en'} className="press rounded-full px-3 py-2.5 text-sm font-bold text-forest-900 no-underline ring-1 ring-forest-900/25">{c.nav.language}</Link>
          <a href={wa.href} className="btn btn-forest press hidden !min-h-[46px] !px-6 lg:inline-flex">{c.cta.consult}</a>
          <MobileNav items={items} menuLabel={c.nav.menu} closeLabel={c.nav.close} wa={wa} call={call} />
        </div>
      </div>
    </header>
  );
}
