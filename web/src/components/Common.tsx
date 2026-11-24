import Link from 'next/link';
import { type Locale, getContent, localePath } from '@/lib/content';
import { ui } from '@/lib/ui';
import Rich from './Rich';

export const Arrow = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
export const Sec = ({ n, label }: { n: string; label: string }) => <div className="secno label"><span>{n}</span><span>{label}</span></div>;

export function Crumbs({ locale, trail }: { locale: Locale; trail: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="crumbs label">
      <Link href={localePath(locale, '/')}>{locale === 'ta' ? 'முகப்பு' : 'Home'}</Link>
      {trail.map(t => (
        <span key={t.label}><span aria-hidden="true"> / </span>{t.href ? <Link href={t.href}>{t.label}</Link> : <span>{t.label}</span>}</span>
      ))}
    </nav>
  );
}

/** Oversized editorial page title used by every inner page. */
export function PageHead({ locale, crumb, title, lead, kicker, children }: { locale: Locale; crumb: string; title: string; lead?: string; kicker?: string; children?: React.ReactNode }) {
  return (
    <header className="wrap pb-10 pt-6 md:pb-20 md:pt-8">
      <Crumbs locale={locale} trail={[{ label: crumb }]} />
      <div className="mt-6 grid gap-4 md:mt-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-8">
          {kicker && <p className="label text-moss">{kicker}</p>}
          <h1 className="fade-up mt-4" style={{ fontSize: 'clamp(2.4rem, 9vw, 6rem)', lineHeight: 1 }}><Rich t={title} /></h1>
        </div>
        {lead && <p className="text-moss md:col-span-4 md:pt-6" style={{ fontSize: 'var(--fs-lead)', lineHeight: 1.55 }}>{lead}</p>}
      </div>
      {children}
    </header>
  );
}

/** Four-step explanation of the consultation cart. Dark band. */
export function CartFlow({ locale, compact }: { locale: Locale; compact?: boolean }) {
  const t = ui(locale);
  return (
    <section className={`on-dark ${compact ? 'py-16 md:py-20' : 'py-20 md:py-28'}`}>
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 style={{ fontSize: 'var(--fs-h2)' }}>{t.flowLabel}</h2>
          <p className="max-w-sm text-[0.95rem] text-[rgb(244_236_221/0.8)]">{t.notAnOrder}</p>
        </div>
        <ol className="flow m-0 mt-12 list-none p-0">
          {t.flow.map((s, i) => (
            <li key={s.t} data-reveal="" style={{ ['--d' as string]: `${i * 90}ms` }}>
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-4" style={{ fontSize: 'var(--fs-h3)', lineHeight: 1.05 }}>{s.t}</h3>
              <p className="mt-3 max-w-xs text-[rgb(244_236_221/0.85)]">{s.b}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ClosingCta({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const t = ui(locale);
  return (
    <section className="wrap pb-8 pt-24 text-center md:pt-32">
      <p className="mx-auto max-w-4xl" style={{ fontFamily: 'var(--display)', fontSize: 'var(--fs-h1)', lineHeight: 1 }}><Rich t={locale === 'ta' ? 'முதலில் மருத்துவருடன் *பேசுங்கள்*.' : 'Come and *talk* to the doctor first.'} /></p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href={localePath(locale, '/products')} className="btn btn-primary">{t.browse}<Arrow /></Link>
        <a href={`tel:${c.site.phones[0].replace(/\s/g, '')}`} className="btn btn-ghost">{c.cta.call} · {c.site.phones[0]}</a>
      </div>
    </section>
  );
}
