/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ['./dist/*.html'],
  theme: {
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
    },
    extend: {},
  },
  plugins: [],
}
