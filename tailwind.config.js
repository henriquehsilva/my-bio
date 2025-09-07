/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontWeight: {
        'extralight': '200',
        'thin': '100',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'bounce': 'bounce 2s infinite',
      },
      letterSpacing: {
        'widest': '0.25em',
      },
    },
  },
  plugins: [],
};