import type { Metadata } from 'next';
import { getContent } from '@/lib/content';
import { ContactView } from '@/components/InfoPages';
const c = getContent('ta');
export const metadata: Metadata = { title: c.seo.contact.title, description: c.seo.contact.description, alternates: { canonical: '/ta/contact-us', languages: { en: '/contact-us', ta: '/ta/contact-us' } } };
export default function Page() { return <ContactView locale="ta" />; }
