"use client"
import React, { FC, useCallback } from "react"
import { useSimilarityRecommended, useSimilarityRecommendedLoading } from "@/store/homePage"
import Image from "next/image"
import { Triangle, SkeletonImage } from "@/components"
import classNames from "classnames"
import Skeleton from "react-loading-skeleton"

interface Props {
  onRefresh: () => void
}

const skeletonArr = [[...new Array(3).keys()], [...new Array(3).keys()]]

const Empty = () => {
  return (
    <>
      {skeletonArr.map((item, index) => {
        return (
          <div className="w-320  flex flex-col gap-8" key={index}>
            {item.map((d) => {
              return (
                <div className="w-320 flex gap-8" key={d}>
                  <Skeleton height={80} width={80} className=" rounded-[8px]" />
                  <div className="flex-1 flex flex-col gap-4 mr-8">
                    <Skeleton height={16} />
                    <Skeleton height={16} width="80%" />
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </>
  )
}

const SimilarityRecommended: FC<Props> = (props) => {
  const { onRefresh } = props
  const loading = useSimilarityRecommendedLoading()
  const { list, title, button } = useSimilarityRecommended()

  console.log("loading", loading)

  const renderList = useCallback(() => {
    return (
      <>
        {list.map((item, index) => {
          return (
            <div key={index} className="w-320  flex flex-col gap-8">
              {item.resources.map((d) => {
                return (
                  <div className="w-320 flex gap-8" key={d.resourceId}>
                    <SkeletonImage
                      imageProps={{ src: d.uiElement?.image?.imageUrl, className: "rounded-[8px]" }}
                    />

                    <div className="flex-1 flex flex-col gap-4 mr-8">
                      <span className=" line-clamp-1 font-[600] text-[#343648]">
                        {d?.uiElement?.mainTitle?.title}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className=" text-10 bg-[#F2E4E9] text-[#D92D42] rounded-[6px] px-4">
                          {d?.uiElement?.subTitle?.titleType === "songRcmdTag"
                            ? d?.uiElement?.subTitle?.title
                            : "SQ"}
                        </span>
                        <span className=" line-clamp-1 text-12">
                          {d?.resourceExtInfo?.artists?.map((s: any) => s.name)}
                        </span>
                      </div>
                    </div>
                    {d.resourceExtInfo?.song?.videoInfo?.video && (
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
      </>
    )
  }, [list])

  const renderTop = useCallback(() => {
    return (
      <>
        <div onClick={onRefresh} className="flex items-center gap-[4px]">
          <Image
            priority
            className={classNames({ ["animate-spin"]: loading })}
            src="/home/reload.png"
            width={18}
            height={18}
            alt=""
          />
          <span className="text-[18px] text-[#121212] font-[500] line-clamp-1">{title}</span>
        </div>
        <div className="flex-1 ml-8">
          <div className="flex items-center gap-2 bg-[#E6E8EC] rounded-[24px] px-12 py-2 w-[max-content] ">
            <Triangle color="#2E3348" size={5} />
            <span className="text-[#313849] text-14">{button?.text || "播放"}</span>
          </div>
        </div>
      </>
    )
  }, [title, button, loading])

  return (
    <>
      <div className="flex  items-center  px-[24px]">
        {list.length === 0 ? <Skeleton width={300} height={18} /> : renderTop()}
      </div>

      <div className="scrollbar-hide overflow-x-scroll  px-[24px]">
        <div className="flex gap-8   flex-nowrap">
          {list.length === 0 ? <Empty /> : renderList()}
        </div>
      </div>
    </>
  )
}

export default SimilarityRecommended
