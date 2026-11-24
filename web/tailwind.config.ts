import type { Config } from 'tailwindcss';
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    // Only the brief's palette exists. No white, no black, no other hues.
    colors: {
      transparent: 'transparent', current: 'currentColor',
      paper: 'var(--paper)', paper2: 'var(--paper-2)',
      ink: 'var(--ink)', moss: 'var(--moss)', sage: 'var(--sage)',
      turmeric: 'var(--turmeric)', clay: 'var(--clay)',
      card: 'var(--card)', leaf: 'var(--leaf)', mint: 'var(--mint)', ola: 'var(--ola)',
    },
    extend: {
      borderRadius: { none: '0', sm: '2px', DEFAULT: '2px', md: '2px', lg: '3px', xl: '3px', '2xl': '3px', '3xl': '3px', full: '9999px' },
      fontFamily: { display: ['var(--display)', 'Georgia', 'serif'], body: ['var(--body)', 'system-ui', 'sans-serif'] },
      transitionTimingFunction: { out: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
} satisfies Config;
