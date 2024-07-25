const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src")],
  },
  transpilePackages: ["antd-mobile"],
  reactStrictMode: false, // 关闭该特性，nextjs 18 useEffect 会执行两次
  images: {
    // domains: ["p1.music.126.net", "p5.music.126.net", "p6.music.126.net"],
    // loader:'cloudinary',

    remotePatterns: [
      {
        hostname: "**",
      },
      // {
      //   // protocol: 'http',
      //   hostname: "**.music.126.net",
      // },
      // {
      //   hostname: "**.vodkgeyttp8.vod.126.net",
      // },
    ],
  },
  env: {
    V_CONSOLE: process.env.V_CONSOLE,
  },
  compress: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.douya-music.top/:path*",
      },
    ]
  },
}

module.exports = nextConfig
