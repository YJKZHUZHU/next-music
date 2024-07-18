import React, { useCallback, useMemo } from "react"
import Skeleton from "react-loading-skeleton"
import { useTopic } from "@/store/homePage"
import { NextImage } from "@/components"
import { rgbDataURL } from "@/utils/rgbDataURL"

const colorArr = [
  "linear-gradient(#6C948A, #81ABA1)",
  "linear-gradient(#7F7F7F, #979797)",
  "linear-gradient(#887475, #9D8E91)",
  "linear-gradient(#926775, #AB8291)",
  "linear-gradient(#94826A, #AA9A82)",
  "linear-gradient(#6C7394, #7E89A7)",
]

function Topic() {
  const { list, title } = useTopic()

  const renderTop = useCallback(() => {
    if (!title) return <Skeleton width={300} height={18} />
    return (
      <div className="flex items-center">
        <span className="text-[18px] text-[#121212] font-[500] line-clamp-1">{title}</span>
      </div>
    )
  }, [title])

  const wrapList = useMemo(() => {
    if (list.length === 0) {
      return colorArr.map((_, index) => {
        return {
          resourceId: String(index),
          titleImgUrl: rgbDataURL(235, 235, 235),
          title: "",
          subTitle: "",
          nickname: "",
          eventMsg: "",
          imageUrl: rgbDataURL(235, 235, 235),
        }
      })
    }
    const target = list.map((item) => item.resources)
    return target.flat().map((item) => {
      return {
        resourceId: item?.resourceId,
        titleImgUrl: item?.uiElement?.mainTitle?.titleImgUrl,
        title: item?.uiElement?.mainTitle?.title,
        subTitle: item?.uiElement?.subTitle?.title,
        nickname: item?.resourceExtInfo?.user?.nickname,
        eventMsg: item?.resourceExtInfo?.eventMsg,
        imageUrl: item?.uiElement?.image?.imageUrl,
      }
    })
  }, [list])

  const getColor = useMemo(() => {
    const target = colorArr.sort(() => Math.random() - 0.5)
    return target
  }, [wrapList])

  return (
    <>
      <div className="flex  items-center  px-[16px]">{renderTop()}</div>

      <div className="scrollbar-hide overflow-x-scroll  px-[16px]">
        <div className="flex gap-8  flex-nowrap w-[fit-content]">
          {wrapList.map((item, index) => {
            return (
              <div
                key={item.resourceId}
                style={{ backgroundImage: getColor[index] }}
                className="flex flex-col w-280 p-8 rounded-[16px] h-120">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-16 h-16 relative">
                    <NextImage src={item?.titleImgUrl} alt="" />
                  </div>
                  {item?.title ? (
                    <span className=" text-white font-[600] ">{item?.title}</span>
                  ) : (
                    <Skeleton height={16} width={200} />
                  )}
                </div>
                {item?.subTitle ? (
                  <span className="text-10 text-white">{item?.subTitle}</span>
                ) : (
                  <Skeleton height={10} width={50} />
                )}
                <div className="flex justify-between items-center gap-12">
                  {item?.nickname ? (
                    <div className=" line-clamp-2 flex-1 text-white">
                      <span className="font-[600]">{item?.nickname}:#</span>
                      <span>{item?.eventMsg}</span>
                    </div>
                  ) : (
                    <Skeleton count={2} width={200} />
                  )}

                  <div className="w-60 h-60 relative rounded-[8px]">
                    <NextImage className="rounded-[8px]" src={item?.imageUrl} alt="" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Topic
