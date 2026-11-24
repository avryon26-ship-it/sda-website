import type { Metadata } from 'next';
import { getContent } from '@/lib/content';
import PanchakarmaView from '@/components/PanchakarmaView';

const c = getContent('en');
export const metadata: Metadata = {
  title: c.seo.panchakarma.title,
  description: c.seo.panchakarma.description,
  alternates: { canonical: '/panchakarma', languages: { en: '/panchakarma', ta: '/ta/panchakarma', 'x-default': '/panchakarma' } },
  openGraph: { title: c.seo.panchakarma.title, description: c.seo.panchakarma.description, url: '/panchakarma', locale: 'en_IN', type: 'website', images: [{ url: '/images/brand/og-default.jpg', width: 1200, height: 630, alt: c.site.name }] },
};
export default function Page() { return <PanchakarmaView locale="en" />; }
