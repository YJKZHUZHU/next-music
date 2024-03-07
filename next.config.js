const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src")],
  },
  transpilePackages: ["antd-mobile"],
  reactStrictMode: false, // 关闭该特性，nextjs 18 useEffect 会执行两次
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
