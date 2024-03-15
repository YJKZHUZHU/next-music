import React, { FC, useCallback } from "react"
import Skeleton from "react-loading-skeleton"
import { useMisicVideo, useMisicVideoLoading } from "@/store/homePage"
import Image from "next/image"
import classNames from "classnames"

interface Props {
  onRefresh: () => void
}

const MusicVideo: FC<Props> = (props) => {
  const { onRefresh } = props
  const { list, title } = useMisicVideo()
  const loading = useMisicVideoLoading()
  const renderTop = useCallback(() => {
    return (
      <>
        <div onClick={onRefresh} className="flex items-center">
          <Image
            className={classNames({ ["animate-spin"]: loading })}
            src="/home/reload.png"
            width={18}
            height={18}
            alt=""
          />
          <span className="text-[18px] text-[#121212] font-[500] line-clamp-1">{title}</span>
        </div>
      </>
    )
  }, [title, loading])

  return (
    <>
      <div className="flex  items-center  px-[24px]">
        {list.length === 0 ? <Skeleton width={300} height={18} /> : renderTop()}
      </div>

      <div className="scrollbar-hide overflow-x-scroll  px-[24px]">
        <div className="flex gap-8   flex-nowrap">
          {list?.map((item) => {
            return <div key={item.id}></div>
          })}
        </div>
      </div>
    </>
  )
}

export default MusicVideo
