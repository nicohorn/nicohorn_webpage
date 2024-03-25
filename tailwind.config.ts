import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        bg_texture: "url('/dark-concrete-texture-background.jpg')",
      },
      colors: {
        //Color palette here https://colorhunt.co/palette/a212321a183120615bdece9c
        black: "#0D0D0D",
        background: "#191919",
        primary: "#151328",
        secondary: "#1F2544",
        accent: "#9E3333",
        neutral: "#F4DFC8",
        white: "#D9ECF2",

      },
    },
    themes: {
      light: {
        black: "#D9ECF2",
        background: "#F4DFC8",
        primary: "#E7D9C9",
        secondary: "#C9C2B8",
        accent: "#B28E7B",
        neutral: "#4A4745",
        white: "#0D0D0D",
        error: "#FF7070",
        success: "#3BBF86",
        info: "#809FCD",


      },
      dark: {
        black: "#0D0D0D",
        background: "#191919",
        primary: "#151328",
        secondary: "#1F2544",
        accent: "#9E3333",
        neutral: "#F4DFC8",
        white: "#D9ECF2",
        error: "#A73232",
        success: "#067444",
        info: "#31507F",

      }
    }
  },
  plugins: [
    require('tailwindcss-patterns'),
    require('tailwind-theme-switcher'),
  ],
}

export default config