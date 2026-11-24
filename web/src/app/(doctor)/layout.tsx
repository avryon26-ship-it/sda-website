import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { instrument, hanken } from '@/lib/fonts-latin';

export const metadata: Metadata = { title: "Doctor's desk · Sri Dhanvanthri", robots: { index: false, follow: false }, icons: { icon: '/images/brand/favicon-32.png' } };
export const viewport: Viewport = { themeColor: '#1D3428', width: 'device-width', initialScale: 1 };

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrument.variable} ${hanken.variable}`}>
      <body>{children}</body>
    </html>
  );
}
