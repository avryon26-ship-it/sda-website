import type { Metadata, Viewport } from 'next';
import { Old_Standard_TT, IM_Fell_English, Newsreader, Special_Elite, Caveat, Tiro_Tamil } from 'next/font/google';

// Mood board only. Several faces are loaded so they can be compared; production would keep three.
const oldStd = Old_Standard_TT({ subsets: ['latin'], weight: ['400', '700'], style: ['normal', 'italic'], variable: '--f-oldstd', display: 'swap' });
const fell = IM_Fell_English({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--f-fell', display: 'swap' });
const news = Newsreader({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--f-news', display: 'swap' });
const type = Special_Elite({ subsets: ['latin'], weight: '400', variable: '--f-type', display: 'swap' });
const hand = Caveat({ subsets: ['latin'], variable: '--f-hand', display: 'swap' });
const tiro = Tiro_Tamil({ subsets: ['tamil', 'latin'], weight: '400', style: ['normal', 'italic'], variable: '--f-tiro', display: 'swap' });

export const metadata: Metadata = { title: 'Mood board: the Gazette on palm leaf', robots: { index: false, follow: false } };
export const viewport: Viewport = { themeColor: '#E9E6CF', width: 'device-width', initialScale: 1 };

export default function BoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={[oldStd, fell, news, type, hand, tiro].map(f => f.variable).join(' ')}>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
