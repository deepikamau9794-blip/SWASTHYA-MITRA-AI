/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#0B3C5D',
          navyDark: '#07253B',
          navyLight: '#14537D',
          saffron: '#FF9933',
          saffronDark: '#D97706',
          green: '#138808',
          ash: '#F4F6F8',
          border: '#D1D5DB',
        },
        triage: {
          green: '#059669',
          greenLight: '#D1FAE5',
          greenDark: '#065F46',
          amber: '#D97706',
          amberLight: '#FEF3C7',
          amberDark: '#92400E',
          red: '#DC2626',
          redLight: '#FEE2E2',
          redDark: '#991B1B',
        }
      },
      fontFamily: {
        sans: ['"Inter"', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
        hindi: ['"Noto Sans Devanagari"', '"Inter"', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ticker': 'ticker 30s linear infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
