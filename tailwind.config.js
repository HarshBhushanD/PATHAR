/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E88E5", // Blue
        secondary: "#FFC107", // Amber
        success: "#4CAF50", // Green
        background: "#F5F5F5", // Light Gray
        surface: "#FFFFFF", // White
        textPrimary: "#212121",
        textSecondary: "#616161",
        error: "#F44336",
      },
    },
  },
  plugins: [],
}
