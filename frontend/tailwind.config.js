/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-white": "#DBEEFE",
        "light-grey": "#DDDCFE",
        primary: "#43358C",
        secondary: "#AA22FF",
        "light-blue": "#DCE4FE",
        "light-pink": "#F2CAFE",
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      display: ["focus-group"],
    },
  },
};
