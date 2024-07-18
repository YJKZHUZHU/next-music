"use client"
import { useMemo } from "react"
import Skeleton from "react-loading-skeleton"
import { tranNumber } from "@/utils/tranNumber"
import { useMgcPlaylist, useOfficialPlaylist } from "@/store/homePage"
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

function OfficialPlaylist() {

  const { title, list } = useOfficialPlaylist()


  const data: IDataItem[] = useMemo(() => {
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
      return {
        creativeType: d.creativeType,
        creativeId: d.creativeId,
        imageUrl: d.uiElement.image.imageUrl,
        playCount: d.resources[0]?.resourceExtInfo?.playCount,
        title: d.uiElement.mainTitle.title,
        resources: [],
        loop: d.resources.length > 1,
        autoplay: d.resources.length > 1,
      }
    })
  }, [JSON.stringify(list)])


  return (
    <>
      <div className=" flex justify-between items-center gap-[12px] px-[16px]">
        <span className=" text-[18px] text-[#121212]  font-[500]">{title}</span>
        <span className=" text-[14px] text-[#FB233B] leading-[20px]">查看全部</span>
      </div>
      <div className="scrollbar-hide overflow-x-scroll  px-[16px] ">
        <div className="flex gap-[16px] w-[920px]">
          {data.map((item) => {
            return (
              <div key={item.creativeId} className="flex flex-col w-[140px]">
                <div className=" relative !h-[140px]">
                  <NextImage className="rounded-[16px]" src={item.imageUrl} alt="" />
                  {item?.playCount && (
                    <div className="absolute right-[8px] top-[4px] flex items-center gap-[4px]">
                      <Triangle />
                      <span className="text-[#ffffff] text-[12px] font-[600]">
                        {tranNumber(item?.playCount)}
                      </span>
                    </div>
                  )}
                </div>
                {item.title ? (
                  <div className="mt-[8px] text-[14px] leading-[18px] text-[#121212] line-clamp-2 animate-out fade-in">
                    {item.title}
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

export default OfficialPlaylist
