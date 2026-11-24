import type { Metadata } from 'next';
import ConsultView from '@/components/shop/ConsultView';
import { ui } from '@/lib/ui';
export const metadata: Metadata = { title: ui('ta').consultTitle, robots: { index: false } };
export default function Page() { return <ConsultView locale="ta" />; }
