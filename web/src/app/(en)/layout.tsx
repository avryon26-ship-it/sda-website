import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { instrument, hanken } from '@/lib/fonts-latin';
import { SITE_URL } from '@/lib/content';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import ActionBar from '@/components/ActionBar';
import Motion from '@/components/Motion';

export const metadata: Metadata = { metadataBase: new URL(SITE_URL), robots: { index: false, follow: false } /* staging: switched on in the SEO phase */ };
export const viewport: Viewport = { themeColor: '#F4ECDD', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrument.variable} ${hanken.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <SiteHeader locale="en" />
        {children}
        <SiteFooter locale="en" />
        <ActionBar locale="en" />
        <Motion />
      </body>
    </html>
  );
}
