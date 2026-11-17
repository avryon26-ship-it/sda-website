import { Noto_Serif_Tamil, Noto_Sans_Tamil } from 'next/font/google';
export const taSerif = Noto_Serif_Tamil({ subsets: ['tamil'], weight: ['400', '500', '600'], variable: '--f-ta-serif', display: 'swap' });
export const taSans = Noto_Sans_Tamil({ subsets: ['tamil'], weight: ['400', '500', '600'], variable: '--f-ta-sans', display: 'swap' });
