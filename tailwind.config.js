/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./styles/**/*.{css}"
  ],
  theme: {
    extend: {
      colors: {
        netflixBlack: "#141414",
        netflixRed: "#e50914",
        netflixGray: "#333333"
      },
      fontFamily: {
        sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
}
