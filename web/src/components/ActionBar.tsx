import { type Locale, getContent, waLink, telHref } from '@/lib/content';

/** Phone-only sticky bar: most patients arrive on a phone and want to call or message. */
export default function ActionBar({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const wa = waLink(c.site.whatsapp, locale === 'ta' ? 'வணக்கம், ஆலோசனை பெற விரும்புகிறேன்.' : 'Hello, I would like to consult the doctor.');
  return (
    <div className="glass-bar fixed inset-x-0 bottom-0 z-40 !border-b-0 border-t lg:hidden">
      <div className="grid grid-cols-2 gap-3 px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3">
        <a href={telHref(c.site.phones[0])} className="btn btn-outline press !min-h-[50px] !px-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
          {c.cta.call}
        </a>
        <a href={wa} className="btn btn-brass press !min-h-[50px] !px-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" /></svg>
          WhatsApp
        </a>
      </div>
    </div>
  );
}
