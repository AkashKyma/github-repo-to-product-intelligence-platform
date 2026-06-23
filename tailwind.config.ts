import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#09111f",
        steel: "#5c677d",
        accent: "#57b2ff",
        accentSoft: "#dff1ff",
        success: "#168f65",
        warning: "#b86d11",
      },
      boxShadow: {
        panel: "0 20px 45px -25px rgba(15, 23, 42, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
