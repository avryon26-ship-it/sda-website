import type { Metadata } from 'next';
import { getContent } from '@/lib/content';
import ProductsView from '@/components/shop/ProductsView';
const c = getContent('en');
export const metadata: Metadata = { title: c.seo.products.title, description: c.seo.products.description, alternates: { canonical: '/products', languages: { en: '/products', ta: '/ta/products' } } };
export default function Page() { return <ProductsView locale="en" />; }
