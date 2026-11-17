import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { instrument, hanken } from '@/lib/fonts-latin';
import { taSerif, taSans } from '@/lib/fonts-tamil';
import { SITE_URL } from '@/lib/content';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import ActionBar from '@/components/ActionBar';
import Motion from '@/components/Motion';

export const metadata: Metadata = { metadataBase: new URL(SITE_URL), robots: { index: false, follow: false } };
export const viewport: Viewport = { themeColor: '#F4ECDD', width: 'device-width', initialScale: 1 };

export default function TamilLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ta" className={`${taSerif.variable} ${taSans.variable} ${instrument.variable} ${hanken.variable}`}>
      <body>
        <a href="#main" className="skip-link">உள்ளடக்கத்திற்குச் செல்</a>
        <SiteHeader locale="ta" />
        {children}
        <SiteFooter locale="ta" />
        <ActionBar locale="ta" />
        <Motion />
      </body>
    </html>
  );
}
