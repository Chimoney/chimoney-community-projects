/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        epilogue: 'Epilogue, sans-serif'
      },
      colors: {
        'veryDarkBlue': 'hsl(240, 12%, 13%)'
      },
      animation: {
        modalopen: 'fadein .2s ease-in',
        slidedown: 'slidedown .2s ease-in'
      },
      keyframes: {
        fadein: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        slidedown: {
          from: { opacity: 0, transform: 'translateY(-25%)'},
          to: { opacity: 1, transform: 'none'}
        }
      }
    },
  },
  plugins: [],
}
