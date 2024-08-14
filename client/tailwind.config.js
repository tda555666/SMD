/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4338CA",
        secondary: "#6d62f5",
        tertiary: "#f5f5f5",
      },
      backgroundImage: {
        covertodo: "url('./src/assets/imgs/covertodo.jpg)",
      },
    },
  },
  plugins: [],
  experimental: {
    backdropFilter: true,
  },
};
