"use client"
import { useEffect, useMemo, useState } from "react"
import { songs, resource, ISongsItem, IResourceItem,recommendSongs } from "@/api/home"
import { Swiper, Image } from "antd-mobile"
import Skeleton from "react-loading-skeleton"
import { tranNumber } from "@/utils/tranNumber"
import { Triangle } from "@/components"

const skeletonArr = [...new Array(4).keys()]

const Empty = () => {
  return (
    <>
      {skeletonArr.map((d) => {
        return (
          <div key={d} className="w-[140px]  flex flex-col gap-[8px]">
            <Skeleton className="w-[140px] h-[140px]" />
            <Skeleton className="h-[14px]" count={2} />
          </div>
        )
      })}
    </>
  )
}

function RecommendedPlaylist() {
  const [bannerList, setBannerList] = useState<ISongsItem[]>([])
  const [list, setList] = useState<IResourceItem[]>([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  const getSongs = async () => {
    try {
      const res = await songs({ limit: 3 })
      setBannerList(res.data.result)
    } catch (error) {
      console.log("error", error)
    }
  }

  const getResource = async () => {
    try {
      const res = await resource()
      if (res.data.recommend.length > 5) {
        setList(res.data.recommend.slice(0, 5))
      } else {
        setList(res.data.recommend)
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  const getData = async () => {
    try {
      setLoading(true)
      await Promise.race([getSongs(), getResource()])
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const swiperItems = useMemo(() => {
    return bannerList.map((item) => (
      <Swiper.Item key={item.id} className=" relative">
        <Image className="rounded-[16px] h-[140px]" lazy height={140} src={item.picUrl!} alt="" />
        <div className="absolute right-[8px] top-[4px] flex items-center gap-[4px]">
          <Triangle />
          <span className="text-[#ffffff] text-[12px] font-[600]">
            {tranNumber(item.playCount)}
          </span>
        </div>
      </Swiper.Item>
    ))
  }, [bannerList])

  const renderIndicator = (_: number, current: number) => {
    setTimeout(() => {
      bannerList.length !== 0 && setIndex(current)
    }, 0)

    return null
  }

  const padding = loading || bannerList.length === 0 || list.length === 0

  useEffect(() => {
    getData()
    recommendSongs()
  }, [])

  return (
    <div className="scrollbar-hide overflow-x-scroll  px-[24px] ">
      <div className="flex gap-[16px]  w-[920px]">
        {padding ? (
          <Empty />
        ) : (
          <>
            <div className=" flex flex-col w-[140px]">
              <Swiper
                loop
                autoplay
                indicator={renderIndicator}
                direction="vertical"
                className="!rounded-[16px] !h-[140px]">
                {swiperItems}
              </Swiper>
              <div className="mt-[8px] text-[14px] leading-[18px] text-[#121212]">
                {bannerList[index]?.name}
              </div>
            </div>
            {list.map((item) => {
              return (
                <div key={item.id} className="w-[140px] relative">
                  <Image
                    className="rounded-[16px] h-[140px]"
                    lazy
                    height={140}
                    src={item.picUrl!}
                    alt=""
                  />
                  <div className="absolute right-[8px] top-[4px] flex items-center gap-[4px]">
                    <Triangle />
                    <span className="text-[#ffffff] text-[12px] font-[600]">
                      {tranNumber(item.playcount)}
                    </span>
                  </div>

                  <div className="mt-[8px] text-[14px] leading-[18px] text-[#121212] line-clamp-2">
                    {item.name}
                  </div>
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}

export default RecommendedPlaylist
