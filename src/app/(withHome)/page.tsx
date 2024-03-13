"use client"
import { Block, homepage } from "@/api/home"
import { PullToRefresh } from "antd-mobile"
import { NoSSR } from "@/components"
import { useHomePageStore } from "@/store/homePage"
import { HomeBanner, RecommendedPlaylist, Top, Resources } from "./components"
import { useEffect, useState } from "react"

export default function Home() {
  // const [pageList, setPageList] = useState<Block[]>([])
  const [setPageList, setLoading] = useHomePageStore((state) => [
    state.setPageList,
    state.setLoading,
  ])

  const getData = async () => {
    try {
      setLoading(true)
      const res = await homepage({ refresh: true })
      console.log("res--", res)
      setPageList(res.data.blocks)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("error", error)
    }
  }
  const onRefresh = async () => {
    try {
    } catch (error) {}
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <PullToRefresh onRefresh={onRefresh}>
      <div className="flex flex-col  py-16 gap-32">
        <Top />

        <div className="px-[24px]">
          <HomeBanner />
        </div>
        <div className="px-[24px]">
          <Resources />
        </div>

        <div className=" flex flex-col gap-[24px]  ">
          <div className=" flex justify-between items-center gap-[12px] px-[24px]">
            <span className=" text-[18px] text-[#121212] leading-[24px] font-[500]">推荐歌单</span>
            <span className=" text-[14px] text-[#FB233B] leading-[20px]">查看全部</span>
          </div>
          <RecommendedPlaylist />
        </div>
      </div>
    </PullToRefresh>
  )
}
