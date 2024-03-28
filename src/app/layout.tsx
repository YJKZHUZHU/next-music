import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/global.scss"
import dynamic from "next/dynamic"
import Providers from "@/components/ProgressBarProvider"
import Head from "next/head"
import { Analytics } from '@vercel/analytics/react';


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "豆芽音乐",
    absolute: "",
  },
  description: "豆芽音乐",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  setTimeout(() => {
    console.log("rest", '执行')
  }, 2000)
  dynamic(() => import("amfe-flexible"), {
    ssr: false,
  })

  return (
    <html lang="zh-CN" style={{ fontSize: "37.5px" }}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"></meta>
      </Head>
      <body className={inter.className}>
        <Providers>{children}<Analytics /></Providers>
      </body>
    </html>
  )
}
