import type { Metadata } from 'next';
import { getContent } from '@/lib/content';
import { ContactView } from '@/components/InfoPages';
const c = getContent('en');
export const metadata: Metadata = { title: c.seo.contact.title, description: c.seo.contact.description, alternates: { canonical: '/contact-us', languages: { en: '/contact-us', ta: '/ta/contact-us' } } };
export default function Page() { return <ContactView locale="en" />; }
