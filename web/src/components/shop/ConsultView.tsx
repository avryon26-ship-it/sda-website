import { type Locale, getContent } from '@/lib/content';
import { ui } from '@/lib/ui';
import { Crumbs } from '../Common';
import ConsultForm from './ConsultForm';

export default function ConsultView({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const t = ui(locale);
  return (
    <main id="main" className="wrap pb-10 pt-8">
      <Crumbs locale={locale} trail={[{ label: c.nav.products, href: locale === 'ta' ? '/ta/products' : '/products' }, { label: t.sendToDoctor }]} />
      <header className="mt-10 grid gap-6 md:mt-14 md:grid-cols-12">
        <h1 className="md:col-span-7" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.8rem)', lineHeight: 0.98 }}>{t.consultTitle}</h1>
        <p className="md:col-span-4 md:col-start-9 md:pt-4" style={{ fontSize: 'var(--fs-lead)', lineHeight: 1.55 }}>{t.consultLead}</p>
      </header>
      <ol className="timeline mt-12 max-w-3xl" aria-label={t.flowLabel}>
        {t.steps.map((s, i) => <li key={s} data-done={i === 0} data-now={i === 0}>{s}</li>)}
      </ol>
      <hr className="rule mt-12" />
      <div className="mt-12"><ConsultForm /></div>
    </main>
  );
}
