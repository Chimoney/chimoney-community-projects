/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        slideup: 'slideup .5s ease-in'
      },
      keyframes: {
        slideup: {
          from: { opacity: 0, transform: 'translateY(25%)' },
          to: { opacity: 1, transform: 'none' },
        },
      }
    },
  },
  plugins: [],
}
