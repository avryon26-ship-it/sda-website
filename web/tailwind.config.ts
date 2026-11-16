import type { Config } from 'tailwindcss';
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: '#F7F1E3', 2: '#EFE6D0', 3: '#E4D7B7' },
        forest: { 950: '#0E1F16', 900: '#14281D', 800: '#1F3D2B', 700: '#2C5A3F', 600: '#3B7552' },
        gold: { 300: '#E2C77A', 500: '#B8923A', 700: '#7A5A12' },
        ink: '#1B2A21',
      },
      fontFamily: { display: ['var(--font-display)', 'serif'], body: ['var(--font-body)', 'system-ui', 'sans-serif'] },
      borderRadius: { glass: '28px', 'glass-lg': '36px' },
    },
  },
  plugins: [],
} satisfies Config;
