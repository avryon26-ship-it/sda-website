import type { Metadata } from 'next';
import { getContent } from '@/lib/content';
import HomeView from '@/components/HomeView';

const c = getContent('en');
export const metadata: Metadata = {
  title: c.seo.home.title,
  description: c.seo.home.description,
  alternates: { canonical: '/', languages: { en: '/', ta: '/ta', 'x-default': '/' } },
  openGraph: { title: c.seo.home.title, description: c.seo.home.description, url: '/', locale: 'en_IN', type: 'website', images: [{ url: '/images/brand/og-default.jpg', width: 1200, height: 630, alt: c.site.name }] },
};
export default function Page() { return <HomeView locale="en" />; }
