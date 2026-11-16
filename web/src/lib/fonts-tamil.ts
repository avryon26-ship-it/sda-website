import { Noto_Serif_Tamil, Noto_Sans_Tamil } from 'next/font/google';
export const displayTa = Noto_Serif_Tamil({ subsets: ['tamil'], weight: ['500', '600', '700'], variable: '--font-display', display: 'swap' });
export const bodyTa = Noto_Sans_Tamil({ subsets: ['tamil'], weight: ['400', '500', '600'], variable: '--font-body', display: 'swap' });
