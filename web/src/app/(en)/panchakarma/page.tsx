import type { Metadata } from 'next';
import { getContent } from '@/lib/content';
import PanchakarmaView from '@/components/PanchakarmaView';

const c = getContent('en');
export const metadata: Metadata = {
  title: c.seo.panchakarma.title,
  description: c.seo.panchakarma.description,
  alternates: { canonical: '/panchakarma', languages: { en: '/panchakarma', ta: '/ta/panchakarma', 'x-default': '/panchakarma' } },
  openGraph: { title: c.seo.panchakarma.title, description: c.seo.panchakarma.description, url: '/panchakarma', locale: 'en_IN', type: 'website', images: ['/images/clinic/team-at-shopfront.webp'] },
};
export default function Page() { return <PanchakarmaView locale="en" />; }
