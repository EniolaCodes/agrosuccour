/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
       agroLightGreen: "#C8E6C9",
       agroHeading: "#EEF5E2",
       agroText: "#9E9E9E",
       agroGreen: "#4caf50",
       agroWhite: "#E8F5E9",
      },
    },
  },
  plugins: [],
};
