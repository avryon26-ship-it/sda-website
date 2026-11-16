import type { Metadata } from 'next';
import { getContent } from '@/lib/content';
import HomeView from '@/components/HomeView';

const c = getContent('en');
export const metadata: Metadata = {
  title: c.seo.home.title,
  description: c.seo.home.description,
  alternates: { canonical: '/', languages: { en: '/', ta: '/ta', 'x-default': '/' } },
  openGraph: { title: c.seo.home.title, description: c.seo.home.description, url: '/', locale: 'en_IN', type: 'website', images: ['/images/clinic/managing-director-portrait.webp'] },
};
export default function Home() { return <HomeView locale="en" />; }
