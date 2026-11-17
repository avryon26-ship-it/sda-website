import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { display, body } from '@/lib/fonts-latin';
import { SITE_URL } from '@/lib/content';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import ActionBar from '@/components/ActionBar';

export const metadata: Metadata = { metadataBase: new URL(SITE_URL), robots: { index: false, follow: false } /* staging: flipped on in the SEO phase */ };
export const viewport: Viewport = { themeColor: '#14281D', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <SiteHeader locale="en" altHref="/ta" />
        {children}
        <SiteFooter locale="en" />
        <ActionBar locale="en" />
      </body>
    </html>
  );
}
