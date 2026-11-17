import Link from 'next/link';
import { type Locale, getContent, localePath, NAV, telHref, mapsUrl } from '@/lib/content';
import { KolamRule } from './Botanicals';

export default function SiteFooter({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const a = c.site.address;
  return (
    <footer className="on-dark mt-32 pb-24 lg:pb-10">
      <div className="wrap pt-20">
        <KolamRule className="text-sage" />
        <div className="mt-16 grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="label text-sage">{c.home.sections.visit}</p>
            <address className="mt-5 not-italic" style={{ fontSize: 'var(--fs-lead)', lineHeight: 1.5 }}>
              {a.line1}, {a.line2}<br />{a.city}, {a.region} {a.postalCode}
            </address>
            <a href={mapsUrl(c)} rel="noopener noreferrer" target="_blank" className="link mt-4 inline-block font-semibold">{c.home.mapLink} ↗</a>
            <p className="placeholder-note mt-8 max-w-sm">{c.home.hoursPlaceholder}</p>
          </div>
          <div className="min-w-0 md:col-span-4 md:col-start-5">
            <p className="label text-sage">{c.nav.contact}</p>
            <ul className="mt-5 list-none p-0">
              {c.site.phones.map(p => <li key={p}><a href={telHref(p)} className="inline-block py-2 text-[1.15rem] no-underline">{p}</a></li>)}
              <li><a href={`mailto:${c.site.email}`} className="inline-block break-words py-2 text-[1rem] no-underline">{c.site.email}</a></li>
              <li><a href={c.site.facebook} rel="noopener noreferrer" target="_blank" className="inline-block py-2 no-underline">Facebook</a></li>
            </ul>
          </div>
          <nav aria-label="Footer" className="min-w-0 md:col-span-3 md:col-start-9">
            <p className="label text-sage">{c.site.shortName}</p>
            <ul className="mt-5 list-none p-0">
              {NAV.map(n => <li key={n.path}><Link href={localePath(locale, n.path)} className="inline-block py-2 no-underline">{c.nav[n.key]}</Link></li>)}
            </ul>
          </nav>
        </div>
        <p className="giant mt-20" aria-hidden="true">{locale === 'ta' ? c.site.shortName : 'Sri Dhanvanthri'}</p>
        <hr className="rule mt-10" />
        <p className="mt-6 max-w-4xl text-[0.88rem] leading-relaxed text-[rgb(244_236_221/0.75)]">{c.site.disclaimer}</p>
      </div>
    </footer>
  );
}
