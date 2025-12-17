// tailwind.config.js (Optional for basic setup in v4, but useful for customization)
import type { Config } from 'tailwindcss';
import daisyui from "daisyui"
const config = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  darkMode: 'class', 
  daisyui: {
    themes: []
  }

} as Config;


export default config;