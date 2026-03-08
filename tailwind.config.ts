import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0D1B2A', 800: '#122233', 700: '#1a3048' },
        cyan: { DEFAULT: '#00B4D8', dark: '#0096b4' },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-code': '#00B4D8',
            code: {
              color: '#00B4D8',
              background: '#f1f5f9',
              padding: '0.15em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '500',
              '&::before': { content: 'none' },
              '&::after': { content: 'none' },
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
