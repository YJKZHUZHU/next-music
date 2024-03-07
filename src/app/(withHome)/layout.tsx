import { TabBar } from "./components"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "豆芽音乐-发现",
  description: "豆芽音乐-发现",
}

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[100%] ">
      <div>{children}</div>
      <div className="fixed bottom-[0px] w-[100vw]">
        <TabBar />
      </div>
    </div>
  )
}
