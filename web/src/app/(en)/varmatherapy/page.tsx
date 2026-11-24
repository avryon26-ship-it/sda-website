import type { Metadata } from 'next';
import { getContent } from '@/lib/content';
import { TherapyView } from '@/components/InfoPages';
const c = getContent('en');
export const metadata: Metadata = { title: c.seo.varmatherapy.title, description: c.seo.varmatherapy.description, alternates: { canonical: '/varmatherapy', languages: { en: '/varmatherapy', ta: '/ta/varmatherapy' } } };
export default function Page() { return <TherapyView locale="en" kind="varma" />; }
