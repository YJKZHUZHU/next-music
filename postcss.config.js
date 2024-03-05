module.exports = {
  plugins: {
    tailwindcss: {
      // rootValue: 375 / 10,
    },
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 375 / 10,
      unitPrecision: 5,
      propList: ["*"],
      selectorBlackList: [/^.html/], //排除html样式
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
    },
  },
}
