import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/global.scss"
import dynamic from "next/dynamic"
import Providers from "@/components/ProgressBarProvider"
import Head from "next/head"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "豆芽音乐",
  description: "豆芽音乐",
  // viewport: {
  //   width: "device-width",
  //   initialScale: 1,
  //   maximumScale: 1,
  //   minimumScale: 1,
  //   userScalable: false,
  // },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  dynamic(() => import("amfe-flexible"), {
    ssr: false,
  })

  return (
    <html lang="en" style={{ fontSize: "37.5px" }}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"></meta>
      </Head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
