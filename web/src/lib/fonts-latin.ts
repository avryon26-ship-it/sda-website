// Decided: Instrument Serif (display) + Hanken Grotesk (body). Self-hosted and subset by next/font.
import { Instrument_Serif, Hanken_Grotesk } from 'next/font/google';
export const instrument = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--f-instrument', display: 'swap' });
export const hanken = Hanken_Grotesk({ subsets: ['latin'], variable: '--f-hanken', display: 'swap' });
