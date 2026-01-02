module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        dark: "#18181b",
        yellow: "#ffe066",
        yellowDark: "#ffd60a",
      },
      borderRadius: {
        xl: "2rem",
      }
    },
  },
  plugins: [],
}