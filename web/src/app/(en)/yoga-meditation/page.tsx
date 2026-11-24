import type { Metadata } from 'next';
import { getContent } from '@/lib/content';
import { TherapyView } from '@/components/InfoPages';
const c = getContent('en');
export const metadata: Metadata = { title: c.seo.yoga.title, description: c.seo.yoga.description, alternates: { canonical: '/yoga-meditation', languages: { en: '/yoga-meditation', ta: '/ta/yoga-meditation' } } };
export default function Page() { return <TherapyView locale="en" kind="yoga" />; }
