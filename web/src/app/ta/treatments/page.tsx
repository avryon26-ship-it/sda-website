import type { Metadata } from 'next';
import { getContent } from '@/lib/content';
import { TreatmentsView } from '@/components/InfoPages';
const c = getContent('ta');
export const metadata: Metadata = { title: c.seo.treatments.title, description: c.seo.treatments.description, alternates: { canonical: '/ta/treatments', languages: { en: '/treatments', ta: '/ta/treatments' } } };
export default function Page() { return <TreatmentsView locale="ta" />; }
