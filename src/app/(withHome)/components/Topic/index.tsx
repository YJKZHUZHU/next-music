"use client"
import React, { useCallback, useMemo } from "react"
import Skeleton from "react-loading-skeleton"
import { useTopic } from "@/store/homePage"
import { Image } from "antd-mobile"

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
    return (
      <div className="flex items-center">
        <span className="text-[18px] text-[#121212] font-[500] line-clamp-1">{title}</span>
      </div>
    )
  }, [title])

  const wrapList = useMemo(() => {
    const target = list.map((item) => item.resources)
    return target.flat()
  }, [list])


  const getColor = useMemo(() => {
    const target = colorArr.sort(() => Math.random() - 0.5)
    return target
  }, [wrapList])

  return (
    <>
      <div className="flex  items-center  px-[24px]">
        {list.length === 0 ? <Skeleton width={300} height={18} /> : renderTop()}
      </div>

      <div className="scrollbar-hide overflow-x-scroll  px-[24px]">
        <div className="flex gap-8  flex-nowrap w-[fit-content]">
          {wrapList.map((item, index) => {
            return (
              <div
                key={item.resourceId}
                style={{ backgroundImage: getColor[index] }}
                className="flex flex-col w-280 p-8 rounded-[16px] h-120">
                <div className="flex items-center gap-2 mb-4">
                  <Image
                    src={item?.uiElement?.mainTitle?.titleImgUrl}
                    width={16}
                    height={16}
                    lazy
                    alt=""
                  />
                  <span className=" text-white font-[600] ">
                    {item?.uiElement?.mainTitle?.title}
                  </span>
                </div>
                <span className="text-10 text-white">{item?.uiElement?.subTitle?.title}</span>
                <div className="flex justify-between items-center gap-12">
                  <div className=" line-clamp-2 flex-1 text-white">
                    <span className="font-[600]">{item?.resourceExtInfo?.user?.nickname}:#</span>
                    <span>{item?.resourceExtInfo?.eventMsg}</span>
                  </div>

                  <Image
                    className=" rounded-[8px]"
                    src={item?.uiElement?.image?.imageUrl}
                    width={60}
                    height={60}
                    lazy
                    alt=""
                  />
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
