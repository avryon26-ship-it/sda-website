import type { Metadata } from 'next';
import TrackView from '@/components/shop/TrackView';
import { ui } from '@/lib/ui';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: ui('ta').trackTitle, robots: { index: false } };
export default async function Page({ params }: { params: Promise<{ id: string }> }) { return <TrackView locale="ta" id={(await params).id} />; }
