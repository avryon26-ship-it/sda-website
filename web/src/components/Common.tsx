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

/** Newspaper-style page head: crumbs as a dateline, clay kicker, heavy title, double rule, italic deck. */
export function PageHead({ locale, crumb, title, lead, kicker, children }: { locale: Locale; crumb: string; title: string; lead?: string; kicker?: string; children?: React.ReactNode }) {
  return (
    <header className="wrap pb-8 pt-5 md:pb-14 md:pt-8">
      <div className="dateline"><Crumbs locale={locale} trail={[{ label: crumb }]} /><span className="hidden sm:inline">{locale === 'ta' ? 'திருநெல்வேலி · வி.எம். சத்திரம்' : 'Tirunelveli · V.M. Chatram'}</span></div>
      <div className="mt-8 grid gap-5 md:mt-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-8">
          {kicker && <p className="kicker">{kicker}</p>}
          <h1 className="fade-up mt-3" style={{ fontSize: 'clamp(2.3rem, 8.5vw, 5.4rem)', lineHeight: 1.02 }}><Rich t={title} /></h1>
          <hr className="rule2 mt-6 max-w-md" />
        </div>
        {lead && <p className="italic text-moss md:col-span-4 md:pt-3" style={{ fontSize: 'var(--fs-lead)', lineHeight: 1.5 }}>{lead}</p>}
      </div>
      {children}
    </header>
  );
}

/** A photograph pasted onto the page: thin ink frame, paper margin, tape, typewriter caption. */
export function Fig({ children, caption, tape = true, className = '', ratio = 'aspect-[4/3]', no }: { children: React.ReactNode; caption?: string; tape?: boolean; className?: string; ratio?: string; no?: string }) {
  return (
    <figure className={`fig relative ${className}`}>
      {tape && <span className="tape" style={{ left: '38%', top: '-0.8rem' }} aria-hidden="true" />}
      <div className={`frame relative ${ratio}`}>{children}</div>
      {caption && <figcaption>{no ? `${no} ` : ''}{caption}</figcaption>}
    </figure>
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
    <section className="wrap pb-10 pt-20 text-center md:pt-28"><hr className="rule2 mx-auto mb-12 max-w-2xl" />
      <p className="mx-auto max-w-4xl" style={{ fontFamily: 'var(--display)', fontSize: 'var(--fs-h1)', lineHeight: 1 }}><Rich t={locale === 'ta' ? 'முதலில் மருத்துவருடன் *பேசுங்கள்*.' : 'Come and *talk* to the doctor first.'} /></p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href={localePath(locale, '/products')} className="btn btn-primary">{t.browse}<Arrow /></Link>
        <a href={`tel:${c.site.phones[0].replace(/\s/g, '')}`} className="btn btn-ghost">{c.cta.call} · {c.site.phones[0]}</a>
      </div>
    </section>
  );
}
