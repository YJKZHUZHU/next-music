import React, { memo, useMemo } from "react"
import dayjs from "dayjs"
import Skeleton from "react-loading-skeleton"
import { NextImage } from "@/components"
import { ISourceItem } from "../hooks/useHomePageData"


interface Props {
  list: ISourceItem[]
}

function Resources(props: Props) {
  const { list = [] } = props
  console.log('入口')
  return (
    <div className="flex gap-8 scrollbar-hide overflow-x-scroll">
      {list?.map((item) => {
        return (
          <div className="flex flex-col items-center" key={item.resourceId}>
            {item.showtoday ? (
              <div className="relative w-[65px] h-[65px] rounded-[8px]">
                <span className="absolute text-16 text-white top-[25px] left-[23px] font-[600] z-1">
                  {dayjs().date()}
                </span>
                <NextImage className="rounded-[8px]" src={item.image} alt="" />
              </div>
            ) : (
              <div className="relative w-[65px] h-[65px]">
                <NextImage className="rounded-[8px]" src={item.image} alt="" />
              </div>
            )}
            {item.title ? (
              <span className="text-14 text-[#61646F]">{item.title}</span>
            ) : (
              <Skeleton className="h-[14px] w-65" count={1} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default memo(Resources)
