import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { displayTa, bodyTa } from '@/lib/fonts-tamil';
import { SITE_URL } from '@/lib/content';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export const metadata: Metadata = { metadataBase: new URL(SITE_URL), robots: { index: false, follow: false } };
export const viewport: Viewport = { themeColor: '#14281D', width: 'device-width', initialScale: 1 };

export default function TamilLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ta" className={`${displayTa.variable} ${bodyTa.variable}`}>
      <body>
        <a href="#main" className="skip-link">உள்ளடக்கத்திற்குச் செல்</a>
        <SiteHeader locale="ta" altHref="/" />
        {children}
        <SiteFooter locale="ta" />
        <FloatingWhatsApp locale="ta" />
      </body>
    </html>
  );
}
