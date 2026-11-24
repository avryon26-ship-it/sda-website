import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { oldstd, newsreader, typew, hand } from '@/lib/fonts-latin';
import { taSerif, taSans } from '@/lib/fonts-tamil';
import { SITE_URL, catalogue, localePath } from '@/lib/content';
import CartProvider from '@/components/cart/CartProvider';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import ActionBar from '@/components/ActionBar';
import Motion from '@/components/Motion';

export const metadata: Metadata = { metadataBase: new URL(SITE_URL), icons: { icon: [{ url: '/images/brand/favicon-32.png', sizes: '32x32', type: 'image/png' }, { url: '/images/brand/icon-192.png', sizes: '192x192', type: 'image/png' }], apple: '/images/brand/apple-touch-icon.png' }, manifest: '/site.webmanifest', robots: { index: false, follow: false } };
export const viewport: Viewport = { themeColor: '#E9E6CF', width: 'device-width', initialScale: 1 };

export default function TamilLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ta" className={`${taSerif.variable} ${taSans.variable} ${oldstd.variable} ${newsreader.variable} ${typew.variable} ${hand.variable}`}>
      <body>
        <CartProvider locale="ta" catalogue={catalogue('ta')} consultHref={localePath('ta', '/consult')}>
        <a href="#main" className="skip-link">உள்ளடக்கத்திற்குச் செல்</a>
        <SiteHeader locale="ta" />
        {children}
        <SiteFooter locale="ta" />
        <ActionBar locale="ta" />
        <Motion />
        </CartProvider>
      </body>
    </html>
  );
}
