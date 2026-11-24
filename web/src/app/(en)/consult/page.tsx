import type { Metadata } from 'next';
import ConsultView from '@/components/shop/ConsultView';
import { ui } from '@/lib/ui';
export const metadata: Metadata = { title: ui('en').consultTitle, robots: { index: false } };
export default function Page() { return <ConsultView locale="en" />; }
