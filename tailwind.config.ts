import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#cdff4e',
        'accent-dark': '#b4e63c',
        black: '#000000',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Display / Hero
        display: ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'display-sm': ['2.5rem', { lineHeight: '1.15', fontWeight: '700' }],
        // Headings
        h1: ['3rem', { lineHeight: '1.15', fontWeight: '700' }],
        h2: ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }],
        h3: ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        h4: ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        // Body
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        body: ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        // Section spacing
        section: '5rem',
        'section-lg': '6rem',
      },
      maxWidth: {
        container: '1160px',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.08), 0 0 0 1px rgba(205,255,78,0.15)',
        glow: '0 0 40px rgba(205,255,78,0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
