import Link from 'next/link';
import { type Locale, getContent, localePath, NAV, telHref } from '@/lib/content';

export default function SiteFooter({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const a = c.site.address;
  return (
    <footer className="mt-28 bg-forest-950 text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-3xl text-brass-300">{c.site.name}</p>
          <p className="mt-4 max-w-xs text-[0.97rem] text-ivory/80">{c.site.tagline}</p>
        </div>
        <div>
          <p className="eyebrow on-dark">{c.nav.contact}</p>
          <address className="mt-4 not-italic text-[0.97rem] leading-relaxed text-ivory/90">
            {a.line1}, {a.line2}<br />{a.city}, {a.region} {a.postalCode}
          </address>
          <ul className="mt-3 list-none p-0">
            {c.site.phones.map(p => <li key={p}><a href={telHref(p)} className="inline-block py-1.5 text-ivory no-underline hover:underline">{p}</a></li>)}
          </ul>
          <a href={`mailto:${c.site.email}`} className="inline-block break-all py-1.5 text-ivory no-underline hover:underline">{c.site.email}</a>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow on-dark">{c.site.shortName}</p>
          <ul className="mt-4 list-none p-0">
            {NAV.map(n => <li key={n.path}><Link href={localePath(locale, n.path)} className="inline-block py-1.5 text-ivory no-underline hover:underline">{c.nav[n.key]}</Link></li>)}
            <li><a href={c.site.facebook} rel="noopener noreferrer" className="inline-block py-1.5 text-ivory no-underline hover:underline">Facebook</a></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-5 py-7 text-sm leading-relaxed text-ivory/70 lg:px-8">{c.site.disclaimer}</p>
      </div>
    </footer>
  );
}
