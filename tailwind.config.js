/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  safelist: [],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 250ms ease-in'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' }
        }
      }
    },
  },
  plugins: [],
}
