import React from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "我的",
  description: "网易云音乐-我的",
}
function Layout({ children }: { children: React.ReactNode }) {
  return children
}

export default Layout
