/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: {
          start: '#006494',
          end: '#0FA3B1',
        },
        accent: '#21D19F',
      },
    },
  },
  plugins: [],
};