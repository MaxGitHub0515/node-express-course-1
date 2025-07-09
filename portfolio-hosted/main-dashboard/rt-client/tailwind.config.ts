// tailwind.config.js (Optional for basic setup in v4, but useful for customization)
import type { Config } from 'tailwindcss';
const config: Config = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class', 
  

}


export default config;