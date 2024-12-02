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
        agroGreen: "#4caf50",
        agroWhite: "#E8F5E9",
        Green50: "#F0F7EC",
        Green100: "#D1E7C5",
        Green200: "#B2D7A9",
        Green400: "#89C169",
        Green500: "#6BB244",
        Green600: "#61A23E",
        Green800: "#3B6225",
        Green900: "#2D4B1D",
        Grey50: "#E7E9E8",
        Grey100: "#B5BAB7",
        Grey200: "#919895",
        Grey300: "#5F6A64",
        Grey400: "#404D46",
        Grey500: "#102018",
        LightGry: "#0E1F16",
      },
      fontFamily: {
        urbanist: ["Urbanist", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        nunitoSans: ["Nunito Sans", "sans-serif"],
      },
      boxShadow: {
        custom:
          "0 16px 32px -4px rgba(16, 32, 24, 0.1), 0 2px 4px 0 rgba(16, 32, 24, 0.04)",
        "custom-hover":
          "0 24px 48px -8px rgba(16, 32, 24, 0.12), 0 2px 4px 0 rgba(16, 32, 24, 0.04)",
      },
    },
  },
  plugins: [],
};
