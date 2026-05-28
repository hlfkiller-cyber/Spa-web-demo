/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        jade: {
          50: "#edf7f3",
          100: "#d7ede5",
          500: "#2f9276",
          600: "#26755f",
          700: "#205f50",
          950: "#0d2824"
        },
        rosewood: "#713f3c",
        champagne: "#f7e7c9",
        clay: "#b8765f",
        ink: "#17211f"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(47, 146, 118, 0.22)"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      }
    }
  },
  plugins: []
};
