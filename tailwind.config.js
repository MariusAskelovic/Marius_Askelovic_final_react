/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: '1rem',
    },
    fontFamily: {
      lato: ['Lato', 'sans-serif'],
    },
    transitionDuration: {
      200: '200ms',
      300: '300ms',
      400: '400ms',
      500: '500ms',
      700: '700ms',
    },
  },
  plugins: [],
};
