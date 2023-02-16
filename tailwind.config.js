/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        onyx: "#36393f",
        veryLightBlue: "#5966f3",
        white: "#ffffff",
        arsenic: "#40434c",
        silverFoil: "#aeb0b3",
        gray: "#b9bbbe",
        darkCharcoal: "#303136",
        black: "#000000",
        green: "#369958",
        spanishGray: '#96989e',
        outerSpace: '#42464E',
        red: '#ED4245'
      }
    }
  },
  plugins: [],
};
