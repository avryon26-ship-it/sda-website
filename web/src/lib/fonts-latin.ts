// Both display faces and both body faces are loaded ONLY for the /design comparison.
// After approval the losing pair is deleted so production ships one display + one body face.
import { Cormorant_Garamond, Instrument_Serif, Hanken_Grotesk, DM_Sans } from 'next/font/google';
export const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500', '600'], style: ['normal', 'italic'], variable: '--f-cormorant', display: 'swap' });
export const instrument = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--f-instrument', display: 'swap' });
export const hanken = Hanken_Grotesk({ subsets: ['latin'], variable: '--f-hanken', display: 'swap' });
export const dmsans = DM_Sans({ subsets: ['latin'], variable: '--f-dmsans', display: 'swap' });
