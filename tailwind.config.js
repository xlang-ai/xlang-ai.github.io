/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        secondary: '#f5f2f1',
        brand: {
          lightBrown: '#F2E3AD',
          darkBrown: '#473422',
          limeBlue: '#74ecf1',
          offWhite: '#F5F5F5',
          offBlack: '#031425',
          dark: '#003871',
          dark2: '#174B81',
          primary: '#009CD5',
          primary2: '#6C4AAF',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
  important: true
};
