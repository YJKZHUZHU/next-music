"use client"
import { Block, homepage } from "@/api/home"
import { PullToRefresh } from "antd-mobile"
import { EnumBlockCode, useHomePageStore } from "@/store/homePage"
import { useEffect, useRef } from "react"
import {
  HomeBanner,
  RecommendedPlaylist,
  Top,
  Resources,
  SimilarityRecommended,
  Topic,
  MusicVideo,
} from "./components"

export default function Home() {
  const [setPageList, setLoading, updatePageList, setBlockCodeLoading] = useHomePageStore(
    (state) => [
      state.setPageList,
      state.setLoading,
      state.updatePageList,
      state.setBlockCodeLoading,
    ]
  )
  const cursor = useRef("")

  const totalData = useRef<Block[]>([])

  const getData = async (data: { refresh: boolean; cursor?: string }) => {
    try {
      setLoading(true)
      const res = await homepage(data)
      console.log("==app首页数据==", res)
      cursor.current = res.data.cursor
      if (res.data.hasMore && cursor.current) {
        totalData.current = [...totalData.current, ...res.data.blocks]
        // 继续请求，知道数据全部请求完成
        getData({ refresh: false, cursor: cursor.current })
        return
      }

      setPageList(totalData.current)

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("error", error)
    }
  }

  const getOneData = async (refresh: boolean, blockCode: EnumBlockCode) => {
    try {
      setBlockCodeLoading(blockCode, true)

      const res = await homepage({
        refresh,
        cursor: JSON.stringify({
          offset: 0,
          blockCodeOrderList: [blockCode],
        }),
      })
      console.log(`==${blockCode}==数据`, res.data.blocks)

      const target = res.data.blocks.find((item) => item.blockCode === blockCode)
      target && updatePageList(target)

      setBlockCodeLoading(blockCode, false)
    } catch (error) {
      setBlockCodeLoading(blockCode, false)
      console.log("error", error)
    }
  }

  useEffect(() => {
    getData({
      refresh: false,
    })
  }, [])
  return (
    <PullToRefresh headHeight={50} onRefresh={() => getData({ refresh: true })}>
      <div className="flex flex-col  py-16 gap-24">
        <Top />

        <div className="px-[16px]">
          <HomeBanner />
        </div>
        <div className="px-[16px]">
          <Resources />
        </div>

        <div className=" flex flex-col gap-[16px]">
          <RecommendedPlaylist />
        </div>

        <div className="flex flex-col gap-[16px]">
          <SimilarityRecommended
            onRefresh={() => getOneData(true, EnumBlockCode.HOMEPAGE_BLOCK_STYLE_RCMD)}
          />
        </div>
        <div className="flex flex-col gap-[16px]">
          <Topic />
        </div>
        <div className="flex flex-col gap-[16px]">
          <MusicVideo onRefresh={() => getOneData(true, EnumBlockCode.HOMEPAGE_MUSIC_MLOG)} />
        </div>
      </div>
    </PullToRefresh>
  )
}
