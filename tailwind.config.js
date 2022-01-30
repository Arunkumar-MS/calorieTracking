module.exports = {
  purge: {
    enabled: true,
    preserveHtmlElements: false,
    content:[
    './src//**//*.tsx',
    './pages//**//*.tsx',
  ]},
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ]
}