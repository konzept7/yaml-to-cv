/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,hbs,css}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}