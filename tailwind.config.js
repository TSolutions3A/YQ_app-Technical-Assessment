// tailwind.config.js
const { heroui } = require("@heroui/theme"); // Or adjust if the path is different

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
      },
      colors: {
        custom: {
          100: "#f9f6fa",
          200: "#e4dee7",
          300: "#332b36",
          400: "#F3EFF5",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

module.exports = config;
