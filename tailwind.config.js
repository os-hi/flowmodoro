/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#18171a',
        'secondary': '#2a282e',
      }
    },
  },
  plugins: [],
}

