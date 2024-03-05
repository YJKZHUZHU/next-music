const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src")],
  },
  transpilePackages: ["antd-mobile"],
  reactStrictMode: true,
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
