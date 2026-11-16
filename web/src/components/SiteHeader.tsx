import Link from 'next/link';
import Image from 'next/image';
import { type Locale, getContent, localePath, NAV, waLink } from '@/lib/content';
import MobileNav from './MobileNav';

export default function SiteHeader({ locale, altHref }: { locale: Locale; altHref: string }) {
  const c = getContent(locale);
  const items = NAV.map(n => ({ href: localePath(locale, n.path), label: c.nav[n.key] }));
  const consult = { href: waLink(c.site.whatsapp, locale === 'ta' ? 'வணக்கம், ஆலோசனை பெற விரும்புகிறேன்.' : 'Hello, I would like to consult the doctor.'), label: c.cta.consult };
  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="glass relative mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full py-2 pl-4 pr-2 sm:pl-5">
        <Link href={localePath(locale, '/')} className="flex items-center gap-3 no-underline" aria-label={c.site.name}>
          <Image src="/images/brand/logo.webp" alt="" width={44} height={44} className="h-11 w-11 rounded-full bg-forest-950 object-contain p-0.5" priority />
          <span className="font-display text-lg font-semibold leading-tight text-forest-900 sm:text-xl max-sm:max-w-[9.5rem]">
            {c.site.shortName}
          </span>
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="m-0 flex list-none items-center gap-1 p-0">
            {items.map(i => (
              <li key={i.href}><Link href={i.href} className="whitespace-nowrap rounded-full px-3.5 py-2 text-[0.95rem] font-medium text-ink no-underline transition-colors hover:bg-white/70">{i.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link href={altHref} hrefLang={locale === 'en' ? 'ta' : 'en'} lang={locale === 'en' ? 'ta' : 'en'} className="press rounded-full border border-forest-800/20 bg-white/50 px-4 py-2.5 text-sm font-semibold text-forest-900 no-underline">{c.nav.language}</Link>
          <a href={consult.href} className="btn btn-primary press hidden !min-h-[44px] whitespace-nowrap !px-5 xl:inline-flex">{c.cta.consult}</a>
          <MobileNav items={items} menuLabel={c.nav.menu} closeLabel={c.nav.close} consult={consult} />
        </div>
      </div>
    </header>
  );
}
