import type { Metadata } from 'next';
import { getContent } from '@/lib/content';
import { GalleryView } from '@/components/InfoPages';
const c = getContent('ta');
export const metadata: Metadata = { title: c.seo.gallery.title, description: c.seo.gallery.description, alternates: { canonical: '/ta/gallery', languages: { en: '/gallery', ta: '/ta/gallery' } } };
export default function Page() { return <GalleryView locale="ta" />; }
