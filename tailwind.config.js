/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  safelist: [],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--color-primary) / <alpha-value>)",
        },
        danger: {
          DEFAULT: "hsl(var(--color-danger) / <alpha-value>)",
        },
        success: {
          DEFAULT: "hsl(var(--color-success) / <alpha-value>)",
        },
        layout: {
          DEFAULT: "hsl(var(--layout) / <alpha-value>)",
          contrast: "hsl(var(--layout-contrast) / <alpha-value>)"
        },
        content: {
          DEFAULT: "hsl(var(--content) / <alpha-value>)",
          contrast: "hsl(var(--content-contrast) / <alpha-value>)"
        },
        background: {
          DEFAULT: "hsl(var(--background) / <alpha-value>)"
        }
      },
      animation: {
        'fade-in': 'fadeIn 250ms ease-in',
        'fade-in-down': 'fadeInDown 250ms ease-in',
        'heartbeat': 'heartBeat 350ms ease-in'
      },
      keyframes: {
        heartBeat: {
          '0%': {
            rotate: '90deg',
            transform: 'scale(1.3)',
            fill: "red"
          },
          '100%': {
            rotate: '90deg',
            transform: 'scale(1)'
          }
        },
        fadeIn: {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' }
        },
        fadeInDown: {
          '0%': {
            transform: 'translateY(-10px)',
            opacity: '0%'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '100%'
          }
        }
      }
    },
  },
  plugins: [],
}
