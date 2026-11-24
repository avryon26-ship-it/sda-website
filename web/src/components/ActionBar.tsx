import { type Locale, getContent, telHref } from '@/lib/content';
import { MobileBar } from './cart/CartButtons';
/** Phone-only: call, talk to the doctor (free call back), cart. */
export default function ActionBar({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  return <MobileBar call={telHref(c.site.phones[0])} callLabel={c.cta.call} talk={locale === 'ta' ? 'மருத்துவரிடம் பேசுங்கள்' : 'Talk to the doctor'} />;
}
