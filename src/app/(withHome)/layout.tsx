import { TabBar } from "./components"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "豆芽音乐",
  description: "豆芽音乐",
}

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[100vh] flex flex-col">
      <div className="flex-1 pb-[80px] bg-[#F4F4F4]">{children}</div>
      <div className="fixed bottom-[0px] w-[100vw] h-[80px] bg-white">
        <TabBar />
      </div>
    </div>
  )
}


