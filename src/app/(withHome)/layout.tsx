import { TabBar } from "./components"

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[100%] ">
      <div>{children}</div>
      <div className=" fixed bottom-[0px] w-[100vw]">
        <TabBar />
      </div>
    </div>
  )
}
