import { TabBar } from "./components"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "豆芽音乐",
  description: "豆芽音乐",
}

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[100vh] flex flex-col">
      <div className="flex-1 pb-[50px] overflow-y-scroll">{children}</div>
      <div className="fixed bottom-[-1px] w-[100%] bg-white">
        <TabBar />
      </div>
    </div>
  )
}
