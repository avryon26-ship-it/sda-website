import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getContent } from '@/lib/content';
import ProductDetailView from '@/components/shop/ProductDetailView';
const c = getContent('ta');
export const dynamicParams = false;
export function generateStaticParams() { return c.products.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = c.products.find(x => x.slug === slug);
  return p ? { title: `${p.name} | ${c.site.shortName}`, description: p.summary, openGraph: { images: [{ url: '/' + p.image }] }, alternates: { canonical: `/ta/products/${p.slug}`, languages: { en: `/products/${p.slug}`, ta: `/ta/products/${p.slug}` } } } : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!c.products.some(p => p.slug === slug)) notFound();
  return <ProductDetailView locale="ta" slug={slug} />;
}
