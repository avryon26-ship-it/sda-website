import type { Metadata } from 'next';
import { getContent } from '@/lib/content';
import { OfferingsView } from '@/components/InfoPages';
const c = getContent('en');
export const metadata: Metadata = { title: c.seo.offerings.title, description: c.seo.offerings.description, alternates: { canonical: '/offerings', languages: { en: '/offerings', ta: '/ta/offerings' } } };
export default function Page() { return <OfferingsView locale="en" />; }
