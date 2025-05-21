/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // Vite + React 구조 기준
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        blink: 'blink 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
