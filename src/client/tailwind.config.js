/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'radial-dark': 'radial-gradient(125% 125% at 50% 10%, #000 40%, #63e 100%)',
        'radial-light': 'radial-gradient(125% 125% at 50% 10%, #E3C6FD 30%, #8440C8 100%)'
      },
      colors: {
        primary: {
          light: '#000000',
          dark: '#E1C4FF',
        },
        button: {
          light: '#370E61',
          dark: '#7021BE'
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}