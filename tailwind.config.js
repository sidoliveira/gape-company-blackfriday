/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#F90058',
          secondary: '#1B1C1C',
          white: '#FFFFFF',
          50: '#fef2f6',
          100: '#fde6ed',
          200: '#fccde0',
          300: '#f9a8c8',
          400: '#f472a6',
          500: '#F90058',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        gape: {
          pink: '#F90058',
          'pink-dark': '#be123c',
          dark: '#0a0a0a',
          'dark-soft': '#1B1C1C',
          white: '#FFFFFF',
          gray: '#6b7280',
          'gray-light': '#94a3b8',
          orange: '#F90058', // Mantendo compatibilidade
        },
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        bg: {
          DEFAULT: 'var(--bg)',
          soft: 'var(--bg-soft)',
          card: 'var(--bg-card)',
        },
        border: {
          DEFAULT: 'var(--border)',
          light: 'var(--border-light)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}