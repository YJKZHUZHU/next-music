module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 375 / 10, // 1080px为设计稿大小
      unitPrecision: 5,
      propList: ["*"],
      selectorBlackList: [/^.html/], //排除html样式
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
    },
  },
}
