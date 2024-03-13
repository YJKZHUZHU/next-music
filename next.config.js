const path = require("path")

console.log("process.env", process.env)

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src")],
  },
  transpilePackages: ["antd-mobile"],
  reactStrictMode: false, // 关闭该特性，nextjs 18 useEffect 会执行两次
  images: {
    domains: ["p1.music.126.net", "p6.music.126.net", "p5.music.126.net"],
    // remotePatterns: ['/p1.music.126.net/'],
  },
  env: {
    V_CONSOLE: process.env.V_CONSOLE,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: "https://neteasecloudmusicapi.vercel.app:443/:path*",
  //     },
  //   ]
  // },
}

module.exports = nextConfig
