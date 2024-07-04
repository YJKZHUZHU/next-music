"use client"
import { useMemo, useState } from "react"
import { Swiper } from "antd-mobile"
import Skeleton from "react-loading-skeleton"
import { tranNumber } from "@/utils/tranNumber"
import { useRecommendedPlay } from "@/store/homePage"
import { Triangle, NextImage } from "@/components"
import { rgbDataURL } from "@/utils/rgbDataURL"

const skeletonArr = [...new Array(6).keys()]

interface IResources {
  imageUrl: string
  playCount?: number
  resourceId?: string
  title: string
}
interface IDataItem {
  creativeType: string
  creativeId: string
  imageUrl: string
  playCount?: number
  title?: string
  resources: IResources[]
  loop: boolean
  autoplay: boolean
}

function RecommendedPlaylist() {
  const [currentIndex, setCurrentIndex] = useState<Record<string, number>>({})

  const { title, list } = useRecommendedPlay()

  const swiperItems = (resources: IResources[], imageUrl: string) => {
    return resources.map((item) => (
      <Swiper.Item key={item.resourceId} className=" relative !h-[140px]">
        <NextImage className="rounded-[16px]" src={item.imageUrl || imageUrl} alt="" />
        {item?.playCount && (
          <div className="absolute right-[8px] top-[4px] flex items-center gap-[4px]">
            <Triangle />
            <span className="text-[#ffffff] text-[12px] font-[600]">
              {tranNumber(item?.playCount)}
            </span>
          </div>
        )}
      </Swiper.Item>
    ))
  }

  const data: IDataItem[] = useMemo(() => {
    setCurrentIndex({})
    if (list.length === 0) {
      return skeletonArr.map((d) => {
        return {
          creativeType: String(d),
          creativeId: String(d),
          imageUrl: rgbDataURL(235, 235, 235),
          playCount: undefined,
          title: "",
          resources: [
            {
              imageUrl: rgbDataURL(235, 235, 235),
              playCount: undefined,
              resourceId: String(d),
              title: "",
            },
          ],
          loop: false,
          autoplay: false,
        }
      })
    }
    return list.map((d) => {
      // setCurrentIndex({ ...currentIndex, [d.creativeId]: 0 })
      return {
        creativeType: d.creativeType,
        creativeId: d.creativeId,
        imageUrl: d.uiElement.image.imageUrl,
        playCount: d.resources[0]?.resourceExtInfo?.playCount,
        title: d.uiElement.mainTitle.title,
        resources: d.resources.map((item, index) => {
          console.log("item---", item)
          return {
            imageUrl: item.uiElement.image.imageUrl,
            playCount: item.resourceExtInfo?.playCount,
            resourceId: item.resourceId,
            title: item?.uiElement?.mainTitle?.title,
          }
        }),
        loop: d.resources.length > 1,
        autoplay: d.resources.length > 1,
      }
    })
  }, [JSON.stringify(list)])

  const renderTitle = (source: IResources[], id: string) => {
    if (Object.keys(currentIndex).length === 0) {
      setCurrentIndex({ [id!]: 0 })
    }
    console.log("currentIndex", currentIndex, id, source)
    const current = currentIndex[id]

    return source[current]?.title
  }

  return (
    <>
      <div className=" flex justify-between items-center gap-[12px] px-[24px]">
        <span className=" text-[18px] text-[#121212]  font-[500]">{title}</span>
        <span className=" text-[14px] text-[#FB233B] leading-[20px]">查看全部</span>
      </div>
      <div className="scrollbar-hide overflow-x-scroll  px-[24px] ">
        <div className="flex gap-[16px] w-[920px]">
          {data.map((item) => {
            return (
              <div key={item.creativeId} className="flex flex-col w-[140px]">
                <Swiper
                  allowTouchMove={false}
                  loop={item.loop}
                  autoplay={item.autoplay}
                  indicator={false}
                  onIndexChange={(current) =>
                    setCurrentIndex({ ...currentIndex, [item.creativeId]: current })
                  }
                  direction="vertical"
                  className="!rounded-[16px] !h-[140px]">
                  {swiperItems(item.resources, item.imageUrl)}
                </Swiper>
                {item.title ? (
                  <div className="mt-[8px] text-[14px] leading-[18px] text-[#121212] line-clamp-2 animate-out fade-in">
                    {item.loop ? renderTitle(item.resources, item.creativeId) : item.title}
                  </div>
                ) : (
                  <>
                    <Skeleton height={16} />
                    <Skeleton height={16} width="70%" />
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default RecommendedPlaylist
