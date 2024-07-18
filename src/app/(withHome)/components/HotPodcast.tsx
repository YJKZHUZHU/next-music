import React, { FC, useCallback, useMemo } from "react"
import { useNewAlbumNewSong, useSimilarityRecommended, useSimilarityRecommendedLoading, useVoicelistRcmd } from "@/store/homePage"
import Image from "next/image"
import { Triangle, NextImage } from "@/components"
import classNames from "classnames"
import Skeleton from "react-loading-skeleton"
import { rgbDataURL } from "@/utils/rgbDataURL"



const skeletonArr = [[...new Array(3).keys()], [...new Array(3).keys()]]

interface IResources {
  resourceId: string
  imageUrl: string
  title: string
  titleType: string
  subTitle: string
  artists: string
  showPlayIcon: boolean
}

interface IDataItem {
  key: number
  resources: IResources[]
}

const HotPodcast: FC = () => {
  const { list, title } = useVoicelistRcmd()

  const data: IDataItem[] = useMemo(() => {
    if (list.length === 0) {
      return skeletonArr.map((item, index) => {
        return {
          key: index,
          resources: item.map((d) => {
            return {
              resourceId: String(d),
              imageUrl: rgbDataURL(235, 235, 235),
              title: "",
              titleType: "",
              subTitle: "",
              artists: "",
              showPlayIcon: false,
            }
          }),
        }
      })
    }
    return list.map((item, index) => {
      return {
        key: index,
        resources: item.resources.map((d) => {
          return {
            resourceId: d.resourceId,
            imageUrl: d.uiElement?.image?.imageUrl,
            title: d?.uiElement?.mainTitle?.title,
            titleType: d?.uiElement?.subTitle?.titleType,
            subTitle: d?.uiElement?.labelTexts[0],
            // subTitle:
            //   d?.uiElement?.subTitle?.titleType === "songRcmdTag"
            //     ? d?.uiElement?.subTitle?.title
            //     : "SQ",
            artists: d?.resourceExtInfo?.artists?.map((s: any) => s.name),
            showPlayIcon: !!d.resourceExtInfo?.song?.videoInfo?.video,
          }
        }),
      }
    })
  }, [list])



  return (
    <>
      <div className=" flex justify-between items-center gap-[12px] px-[16px]">
        <span className=" text-[18px] text-[#121212]  font-[500]">{title}</span>
        <span className=" text-[14px] text-[#FB233B] leading-[20px]">查看全部</span>
      </div>

      <div className="scrollbar-hide overflow-x-scroll  px-[16px]">
        <div className="flex gap-8   flex-nowrap">
          {data.map((item) => {
            return (
              <div key={item.key} className="w-320  flex flex-col gap-8">
                {item.resources.map((d) => {
                  return (
                    <div className="w-320 flex gap-8" key={d.resourceId}>
                      <div className="w-80 h-80 rounded-[8px] relative">
                        <NextImage src={d?.imageUrl} alt="" className="rounded-[8px]" />
                      </div>

                      <div className="flex-1 flex flex-col gap-4 mr-8">
                        {d?.title ? (
                          <span className="line-clamp-1 font-[600] text-[#343648]">{d?.title}</span>
                        ) : (
                          <Skeleton height={16} />
                        )}
                        {d?.subTitle ? (
                          <div className="flex items-center gap-2">
                            {
                              d?.subTitle && <span className=" text-10 bg-[#EED4D6] text-[#E13736] opacity-[0.8] rounded-[6px] px-4">
                                {d?.subTitle}
                              </span>
                            }
                            <span className=" line-clamp-1 text-12">{d?.artists}</span>
                          </div>
                        ) : (
                          <Skeleton height={16} width="80%" />
                        )}
                      </div>
                      {d?.showPlayIcon && (
                        <Image
                          className="self-center mr-8"
                          src="/home/play.png"
                          width={16}
                          height={16}
                          alt=""
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default HotPodcast
