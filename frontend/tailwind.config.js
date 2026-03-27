/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0b1b3a',
          800: '#0d2147',
          700: '#112654',
        },
      },
    },
  },
  plugins: [],
}
