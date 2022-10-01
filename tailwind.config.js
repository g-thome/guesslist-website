/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        onyx: '#36393f',
        veryLightBlue: '#5966f3',
        white: '#ffffff',
        arsenic: '#40434c',
        silverFoil: '#aeb0b3',
        gray: '#b9bbbe',
        darkCharcoal: '#363530'
      }
    },
  },
  plugins: [],
}
