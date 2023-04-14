/** @type {import('tailwindcss').Config} */

// eslint-disable-line global-require
const lineClampPlugin = require("@tailwindcss/line-clamp");
const formsPlugin = require("@tailwindcss/forms");

const primary = "rgb(26 26 26)"; // #1a1a1a

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary,
        secondary: "rgb(26 26 26 / 50%)",
        tertiary: "#98A2B6",
        placeholder: "rgb(26 26 26 / 20%)",
        border: "rgb(26 26 26 / 10%)",
        input: "rgb(26 26 26 / 3%)",
        discord: "#5865F2",
        twitter: "#1D9BF0",
        telegram: "#38B0E3",
        error: "#EB5757",
      },
      backgroundImage: {
        rainbow:
          "conic-gradient(from 180deg at 50% 50%, #FF6161 0deg, #FFD361 70.5deg, #95FFA0 162.37deg, #95B9FF 233.62deg, #D795FF 310.5deg, #FF6161 360deg);",
        "reverse-rainbow":
          "conic-gradient(from 0deg at 48.18% 54.41%, #FF6161 0deg, #FFD361 70.5deg, #95FFA0 163.04deg, #95B9FF 233.62deg, #D795FF 310.5deg, #FF6161 360deg);",
        "gradient-radial":
          "radial-gradient(50% 50% at 50% 50%, var(--tw-gradient-stops));",
        "gradient-linear-red":
          "linear-gradient(90deg, #FF8177 0%, #FF867A 0%, #FF8C7F 21%, #F99185 52%, #CF556C 78%, #B12A5B 100%);",
        "gradient-linear-bluegreen":
          "linear-gradient(90deg, #30CFD0 0%, #330867 100%);",
        "gradient-white-blur":
          "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 138%)",
      },
      fontSize: {
        heading1: ["30px", "30px"],
        heading2: ["20px", "20px"],
        heading3: ["18px", "24px"],
        heading4: ["16px", "20px"],
        body: ["16px, 16px"],
        small: ["14px", "16px"],
        xsmall: ["10px", "12px"],
        lg: ["30px"],
      },
      borderRadius: {
        brand: "0.625rem",
      },
      keyframes: {
        "ping-finite": {
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
      },
      animation: {
        "ping-finite": "ping 500ms ease-out",
      },
      spacing: {
        1.25: "0.3125rem", // 5px
        6.4: "1.6rem", // 25px
        7.5: "1.875rem", // 30px
        12.5: "3.125rem", // 50px
      },
      maxWidth: { "1/3": "33.333333%" },
    },
  },
  plugins: [lineClampPlugin, formsPlugin],
};
