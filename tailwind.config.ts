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

        black: "#0d0d0d",
        background: "#191919",
        primary: "#151328",
        secondary: "#1F2544",
        accent: "#9E3333",
        neutral: "#F4DFC8",
        white: "#D9ECF2",


      }
    },
  },
  plugins: [require('tailwindcss-patterns'),],
}
export default config
