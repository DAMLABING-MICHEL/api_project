const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./public/index.html",
    "./public/**/*.{html,js}"
  ],
  theme: {
    screens: {
      'xs': '480px',
      ...defaultTheme.screens,
    },
    extend: {
    
    },
  },
  plugins: [
  ],
}
