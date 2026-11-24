import type { Metadata } from 'next';
import { getContent } from '@/lib/content';
import { AboutView } from '@/components/InfoPages';
const c = getContent('en');
export const metadata: Metadata = { title: c.seo.about.title, description: c.seo.about.description, alternates: { canonical: '/about-us', languages: { en: '/about-us', ta: '/ta/about-us' } } };
export default function Page() { return <AboutView locale="en" />; }
