import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#DB4444",
        gray: "#7D8184",
        "bg-color": "#f0f0f0",
      },
      borderWidth: {
        "1": "1px",
      },
      borderColor: {
        color: "#c4c4c4",
      },
      margin: {
        "100": "100px",
      },
      backgroundImage: {
        "hero-bg": "url('../assets/images/hero.jpg')",
        "hero-bg2": "url('../assets/images/hero2.jpg')",
        "signup-bg": "url('../assets/images/signup.svg')",
        "mastercard-bg": "url('../assets/images/mastercard.svg')",
        "visacard-bg": "url('../assets/images/visacard.svg')",
        "custom-gradient": "linear-gradient(to right, #DB4444 , #ca2b22 )",
      },
    },
  },
  plugins: [],
};
export default config;
