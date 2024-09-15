import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    screens: {
      "2xl": { max: "1320px" },
      xl: { max: "1080px" },
      lg: { max: "768px" },
      md: { max: "640px" },
      sm: { max: "480px" },
    },
    extend: {},
  },

  plugins: [],
};
export default config;
