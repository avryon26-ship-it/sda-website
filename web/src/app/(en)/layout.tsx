import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { cormorant, instrument, hanken, dmsans } from '@/lib/fonts-latin';
import { taSerif, taSans } from '@/lib/fonts-tamil';
import { SITE_URL } from '@/lib/content';

export const metadata: Metadata = { metadataBase: new URL(SITE_URL), robots: { index: false, follow: false } /* staging: switched on in the SEO phase */ };
export const viewport: Viewport = { themeColor: '#F4ECDD', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = [cormorant, instrument, hanken, dmsans, taSerif, taSans].map(f => f.variable).join(' ');
  return (
    <html lang="en" className={fonts}>
      <body>{children}</body>
    </html>
  );
}
