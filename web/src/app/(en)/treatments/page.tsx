import type { Metadata } from 'next';
import { getContent } from '@/lib/content';
import { TreatmentsView } from '@/components/InfoPages';
const c = getContent('en');
export const metadata: Metadata = { title: c.seo.treatments.title, description: c.seo.treatments.description, alternates: { canonical: '/treatments', languages: { en: '/treatments', ta: '/ta/treatments' } } };
export default function Page() { return <TreatmentsView locale="en" />; }
