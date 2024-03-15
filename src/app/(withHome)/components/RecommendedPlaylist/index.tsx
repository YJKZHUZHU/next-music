"use client"
import { useState } from "react"
import { Swiper, Image } from "antd-mobile"
import Skeleton from "react-loading-skeleton"
import { tranNumber } from "@/utils/tranNumber"
import { IRecommendedItem, useRecommendedPlay } from "@/store/homePage"
import { Triangle } from "@/components"

const skeletonArr = [...new Array(6).keys()]

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
  const [index, setIndex] = useState<Record<string, number>>({})

  const { title, list } = useRecommendedPlay()

  const swiperItems = (resources: IRecommendedItem[]) => {
    return resources.map((item) => (
      <Swiper.Item key={item.resourceId} className=" relative">
        <Image
          className="rounded-[16px] h-[140px]"
          lazy
          height={140}
          src={item.uiElement.image.imageUrl!}
          alt=""
        />
        <div className="absolute right-[8px] top-[4px] flex items-center gap-[4px]">
          <Triangle />
          <span className="text-[#ffffff] text-[12px] font-[600]">
            {tranNumber(item.resourceExtInfo?.playCount)}
          </span>
        </div>
      </Swiper.Item>
    ))
  }

  const renderIndicator = (current: number, id: string) => {
    setTimeout(() => {
      setIndex({ ...index, [id]: current })
    }, 0)

    return null
  }
  const renderTitle = (item: IRecommendedItem[], id: string) => {
    const current = index[id]
    return item[current]?.uiElement?.mainTitle?.title
  }

  return (
    <>
      <div className=" flex justify-between items-center gap-[12px] px-[24px]">
        <span className=" text-[18px] text-[#121212]  font-[500]">{title}</span>
        <span className=" text-[14px] text-[#FB233B] leading-[20px]">查看全部</span>
      </div>
      <div className="scrollbar-hide overflow-x-scroll  px-[24px] ">
        <div className="flex gap-[16px]  w-[920px]">
          {list.length === 0 ? (
            <Empty />
          ) : (
            <>
              {list.map((item) => {
                // 轮播
                if (item.creativeType === "scroll_playlist") {
                  return (
                    <div key={item.creativeId} className="flex flex-col w-[140px]">
                      <Swiper
                        allowTouchMove={false}
                        loop
                        autoplay
                        indicator={(_: number, current: number) =>
                          renderIndicator(current, item.creativeId)
                        }
                        direction="vertical"
                        className="!rounded-[16px] !h-[140px]">
                        {swiperItems(item.resources)}
                      </Swiper>
                      <div className="mt-[8px] text-[14px] leading-[18px] text-[#121212] line-clamp-2 animate-out fade-in">
                        {renderTitle(item.resources, item.creativeId)}
                      </div>
                    </div>
                  )
                }
                return (
                  <div key={item.creativeId} className="w-[140px] relative">
                    <Image
                      className="rounded-[16px] h-[140px]"
                      lazy
                      height={140}
                      src={item.uiElement.image.imageUrl}
                      alt=""
                    />
                    <div className="absolute right-[8px] top-[4px] flex items-center gap-[4px]">
                      <Triangle />
                      <span className="text-[#ffffff] text-[12px] font-[600]">
                        {tranNumber(item.resources[0]?.resourceExtInfo?.playCount)}
                      </span>
                    </div>

                    <div className="mt-[8px] text-[14px] leading-[18px] text-[#121212] line-clamp-2">
                      {item.uiElement.mainTitle.title}
                    </div>
                  </div>
                )
              })}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default RecommendedPlaylist
