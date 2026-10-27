/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* پالت برند — همان مقادیر مستندشده در راهنمای طراحی */
        charcoal: '#111111',
        hearth: '#191715',
        ink: '#0B0A09',
        ivory: '#F6F0E7',
        muted: '#B7AEA3',
        amber: {
          DEFAULT: '#D99A43',
          soft: '#E9BE7B',
          deep: '#8A5A22',
        },
        burgundy: '#651F1F',
      },
      fontFamily: {
        sans: ['"Vazirmatn Variable"', 'Vazirmatn', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.75rem',
      },
      boxShadow: {
        ember: '0 24px 60px -32px rgba(217, 154, 67, 0.55)',
        panel: '0 40px 90px -50px rgba(0, 0, 0, 0.95)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'burn-in': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'ember-pulse': {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.06)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both',
        'burn-in': 'burn-in 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both',
        'ember-pulse': 'ember-pulse 4s ease-in-out infinite',
        'slow-zoom': 'slow-zoom 24s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};
