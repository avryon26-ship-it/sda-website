// Decided: Old Standard TT (headlines), Newsreader (text), Special Elite (typewriter labels), Caveat (rare margin notes).
// Self-hosted and subset by next/font.
import { Old_Standard_TT, Newsreader, Special_Elite, Caveat } from 'next/font/google';
export const oldstd = Old_Standard_TT({ subsets: ['latin'], weight: ['400', '700'], style: ['normal', 'italic'], variable: '--f-oldstd', display: 'swap' });
export const newsreader = Newsreader({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--f-news', display: 'swap' });
export const typew = Special_Elite({ subsets: ['latin'], weight: '400', variable: '--f-type', display: 'swap' });
export const hand = Caveat({ subsets: ['latin'], weight: '500', variable: '--f-hand', display: 'swap', preload: false });
