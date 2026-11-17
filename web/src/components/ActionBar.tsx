import { type Locale, getContent, waLink, telHref, consultMsg } from '@/lib/content';
/** Phone-only: most patients arrive on a phone and want to call or message. Flat paper, no glass. */
export default function ActionBar({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  return (
    <div className="actionbar" role="region" aria-label={c.cta.consult}>
      <a href={telHref(c.site.phones[0])} className="btn btn-ghost !min-h-[50px] justify-center !px-3">{c.cta.call}</a>
      <a href={waLink(c.site.whatsapp, consultMsg(locale))} className="btn btn-primary !min-h-[50px] justify-center !px-3">WhatsApp</a>
    </div>
  );
}
