import { type Locale, getContent, waLink } from '@/lib/content';
export default function FloatingWhatsApp({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const href = waLink(c.site.whatsapp, locale === 'ta' ? 'வணக்கம், ஆலோசனை பெற விரும்புகிறேன்.' : 'Hello, I would like to consult the doctor.');
  return (
    <a href={href} aria-label={c.cta.consult} className="btn btn-primary press fixed bottom-4 right-4 z-40 !min-h-[56px] gap-2 !rounded-full !px-5 shadow-xl sm:bottom-6 sm:right-6">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" /></svg>
      <span className="hidden sm:inline">{c.cta.consult}</span>
    </a>
  );
}
