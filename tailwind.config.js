/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#f5f2f1",
        brand: {
          lightBrown: "#F2E3AD",
          darkBrown: "#473422",
          limeBlue: "#74ecf1",
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
