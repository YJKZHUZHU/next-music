import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "登录",
  description: "豆芽音乐-登录",
}

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}

export default Layout
