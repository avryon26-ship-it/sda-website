import Link from 'next/link';
import { type Locale, getContent, localePath, NAV, telHref } from '@/lib/content';

export default function SiteFooter({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const a = c.site.address;
  return (
    <footer className="mt-24 bg-forest-950 text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-semibold text-gold-300">{c.site.name}</p>
          <p className="mt-3 max-w-xs text-[0.95rem] text-cream/85">{c.site.tagline}</p>
        </div>
        <div>
          <p className="eyebrow !text-gold-300">{c.nav.contact}</p>
          <address className="mt-3 not-italic text-[0.95rem] leading-relaxed text-cream/90">
            {a.line1}, {a.line2}<br />{a.city}, {a.region} {a.postalCode}
          </address>
          <ul className="mt-3 list-none p-0">
            {c.site.phones.map(p => <li key={p}><a href={telHref(p)} className="inline-block py-1 text-cream no-underline hover:underline">{p}</a></li>)}
          </ul>
          <a href={`mailto:${c.site.email}`} className="mt-1 inline-block break-all py-1 text-cream no-underline hover:underline">{c.site.email}</a>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow !text-gold-300">{c.site.shortName}</p>
          <ul className="mt-3 list-none p-0">
            {NAV.map(n => <li key={n.path}><Link href={localePath(locale, n.path)} className="inline-block py-1 text-cream no-underline hover:underline">{c.nav[n.key]}</Link></li>)}
            <li><a href={c.site.facebook} rel="noopener noreferrer" className="inline-block py-1 text-cream no-underline hover:underline">Facebook</a></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-5 py-6 text-sm leading-relaxed text-cream/75">{c.site.disclaimer}</p>
      </div>
    </footer>
  );
}
