/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#512ec3',
        'bgColor': '#f5e70e',
        'secondary': '#f5e70e',
        'red': '#ea0000',
        'green': '#16b36e',
        'dark': '#333333',
        'gray': '#808080',
        'lightGray': '#727272',
        'light': '#f5f5f5',
        'darkWhite': '#ddd',
      },
      boxShadow: {
        'custom': '0px 16px 48px rgba(39, 39, 39, 0.1)',
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md: '2rem',
        lg: '3rem',
        xl: '4rem',
      },
    }
  },
  plugins: [],
}
