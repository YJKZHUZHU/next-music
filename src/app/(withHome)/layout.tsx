import { TabBar } from "./components"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "豆芽音乐",
  description: "豆芽音乐",
}

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" h-full flex flex-col">
      <div className="flex-1 pb-[50px] overflow-y-scroll bg-[#F3F6F9]">{children}</div>
      <div className="fixed z-[999] bottom-[-1px] w-[100%] bg-[#F3F6F9]">
        <TabBar />
      </div>
    </div>
  )
}
