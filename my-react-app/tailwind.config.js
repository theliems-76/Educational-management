/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:
      {
        font: [ "Poppins", "serif"],
      },
      colors: {
        bgcolor: "#FFFFFF",
        primarycolor:"#0F62FE",
        secondcolor:"#25A249",
        thirdcolor:"#F1C21B",
        fourcolor:""
    },
  },
  plugins: [],
}
}