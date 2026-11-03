/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eefcf5',
          100: '#d7f7e6',
          200: '#b2efcf',
          300: '#7de2af',
          400: '#43cd8b',
          500: '#1db16f',
          600: '#128f57',
          700: '#107147',
          800: '#11593a',
          900: '#104931',
        }
      }
    },
  },
  plugins: [],
}
