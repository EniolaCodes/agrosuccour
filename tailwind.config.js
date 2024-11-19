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
        Green50: "#F0F7EC",
        Green100: "#D1E7C5",
        Green500: "#6BB244",
        Green800: "#3B6225",
        Grey50: "#E7E9E8",
        Grey100: "#B5BAB7",
        Grey200: "#919895",
        Grey400: "#404D46",
        Grey500: "#102018",
      },
    },
  },
  plugins: [],
};
