/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      borderWidth: {
        '0.5': '0.5px',
        '1.5': '1.5px',
      },
      boxShadow:{
        'custom-bottom': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'custom-all': '0 0 10px 0 rgba(0, 0, 0, 0.1)',
      },
      backgroundColor:{
        'airbnb': '#EBEBEB',
      'airbnb-hover': '#DDDDDD',
      }
    },
  },
  plugins: [],
};
