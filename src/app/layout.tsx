import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "@/app/global.scss"
import dynamic from "next/dynamic"
import Providers from "@/components/ProgressBarProvider"
import Head from "next/head"
import { Analytics } from "@vercel/analytics/react"
import classNames from "classnames"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "豆芽音乐",
    absolute: "",
  },
  description: "豆芽音乐",
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  dynamic(() => import("amfe-flexible"), {
    ssr: false,
  })

  return (
    <html lang="zh-CN" style={{ fontSize: "37.5px" }} className="scrollbar-hide h-full overflow-hidden">
      <body className={classNames('scrollbar-hide h-full', inter.className)}>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
