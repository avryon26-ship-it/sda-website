import type { Config } from 'tailwindcss';
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF6EC', stone: '#F1EADA', sand: '#E6DBC2',
        forest: { 950: '#0A1F17', 900: '#0F2B20', 800: '#17382B', 700: '#245041' },
        brass: { 300: '#D9BC7A', 500: '#B08D4A', 700: '#7A5C1E' },
        ink: '#1B241F', muted: '#4A554E',
      },
      fontFamily: { display: ['var(--font-display)', 'serif'], body: ['var(--font-body)', 'system-ui', 'sans-serif'] },
      borderRadius: { glass: '28px', 'glass-lg': '36px' },
    },
  },
  plugins: [],
} satisfies Config;
