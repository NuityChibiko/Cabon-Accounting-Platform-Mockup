// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- จุดนี้สำคัญมาก
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
