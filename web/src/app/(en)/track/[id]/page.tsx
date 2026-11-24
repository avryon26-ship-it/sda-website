import type { Metadata } from 'next';
import TrackView from '@/components/shop/TrackView';
import { ui } from '@/lib/ui';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: ui('en').trackTitle, robots: { index: false } };
export default async function Page({ params }: { params: Promise<{ id: string }> }) { return <TrackView locale="en" id={(await params).id} />; }
