/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif',],
        'open': ['Open Sans', 'sans-serif',],
        'poppins': ['Poppins', 'sans-serif',],
        
      },
      colors: {
        'primary': '#5F35F5',
      },
    },
  },
  plugins: [],
}
