import { Tiro_Tamil, Noto_Serif_Tamil } from 'next/font/google';
export const taSerif = Tiro_Tamil({ subsets: ['tamil'], weight: '400', style: ['normal', 'italic'], variable: '--f-ta-serif', display: 'swap' });
export const taSans = Noto_Serif_Tamil({ subsets: ['tamil'], weight: ['400', '500', '600'], variable: '--f-ta-sans', display: 'swap' });
