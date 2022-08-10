/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ['./dist/*.html', './main/**/*.{ts,tsx, html,css,js}, "./**/*.{ts,html}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
