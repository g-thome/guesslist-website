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
    colors: {
      onyx: "#36393f",
      veryLightBlue: "#5966f3",
      white: "#ffffff",
      arsenic: "#40434c",
      silverFoil: "#aeb0b3",
      gray: "#b9bbbe",
      darkCharcoal: "#363530",
      black: "#000000",
      green: "#369958",
    },
  },
  plugins: [],
};
