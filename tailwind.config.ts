const plugin = require("tailwindcss/plugin")
import type { Config } from "tailwindcss"
import { KeyValuePair, ResolvableTo } from "tailwindcss/types/config"

const setPx = () => {
  const array: any[] = [...new Array(1000).keys()]

  return array.reduce((map, _, index) => {
    map[index] = `${index}px`
    return map
  }, {} as ResolvableTo<KeyValuePair<string, string>>)
}

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      lineHeight: setPx(),
      gap: setPx(),
      fontSize: setPx(),
      padding: setPx(),
      margin: setPx(),
      width: setPx(),
      height: setPx(),
      borderWidth: setPx(),
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-scrollbar-hide"),
    // require("postcss-rem-to-responsive-pixel")({
    //   rootValue: 37.5,
    // }),
  ],
}
export default config
