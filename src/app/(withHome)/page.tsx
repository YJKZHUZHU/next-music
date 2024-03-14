"use client"
import { homepage } from "@/api/home"
import { PullToRefresh } from "antd-mobile"
import { useHomePageStore } from "@/store/homePage"
import {
  HomeBanner,
  RecommendedPlaylist,
  Top,
  Resources,
  SimilarityRecommended,
} from "./components"
import { useEffect, useRef } from "react"

export default function Home() {
  const [setPageList, setLoading] = useHomePageStore((state) => [
    state.setPageList,
    state.setLoading,
  ])
  const cursor = useRef("")

  const getData = async (data: { refresh: boolean; cursor?: string }) => {
    try {
      setLoading(true)
      const res = await homepage(data)
      console.log("app首页数据", res)
      cursor.current = res.data.cursor
      setPageList(res.data.blocks)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("error", error)
    }
  }

  useEffect(() => {
    getData({ refresh: false })
  }, [])
  return (
    <PullToRefresh headHeight={50} onRefresh={() => getData({ refresh: true })}>
      <div className="flex flex-col  py-16 gap-24">
        <Top />

        <div className="px-[24px]">
          <HomeBanner />
        </div>
        <div className="px-[24px]">
          <Resources />
        </div>

        <div className=" flex flex-col gap-[24px]">
          <RecommendedPlaylist />
        </div>

        <div className="flex flex-col gap-[24px]">
          <SimilarityRecommended onRefresh={() => getData({ refresh: true })} />
        </div>
      </div>
    </PullToRefresh>
  )
}
