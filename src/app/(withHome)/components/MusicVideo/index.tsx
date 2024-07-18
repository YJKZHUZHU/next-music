"use client"
import React, { FC, useCallback, useEffect, useRef } from "react"
import Skeleton from "react-loading-skeleton"
import { useMusicVideo, useMusicVideoLoading } from "@/store/homePage"
import Image from "next/image"
import BackgroundVideo from "next-video/background-video"
import classNames from "classnames"
import { NextImage } from "@/components"
import { rgbDataURL } from "@/utils/rgbDataURL"
import useElementVisible from "@/hooks/useElementVisible"
import VideoCard from "./components/VideoCard"

interface Props {
  onRefresh: () => void
}

const MusicVideo: FC<Props> = (props) => {
  const { onRefresh } = props
  const { list, title } = useMusicVideo()
  const loading = useMusicVideoLoading()
  const [isVisible, ref] = useElementVisible()
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const renderTop = useCallback(() => {
    return (
      <>
        <div onClick={onRefresh} className="flex items-center gap-[4px]">
          <Image
            className={classNames({ ["animate-spin"]: loading })}
            src="/home/reload.png"
            width={18}
            height={18}
            alt=""
          />
          <span className="text-[18px] text-[#121212] font-bold line-clamp-1">{title}</span>
        </div>
      </>
    )
  }, [title, loading])

  console.log("list0-", list)

  useEffect(() => {
    scrollRef.current?.addEventListener("scroll", () => {
      if (scrollRef.current?.scrollLeft) {
        console.log(
          "滚动了吗",
          (scrollRef.current?.scrollLeft / 125).toFixed(0),
          scrollRef.current?.scrollLeft
        )
      }
    })
  }, [])

  if (list.length === 0 && !loading) return null

  return (
    <>
      <div className="flex  items-center  px-[16px]">
        {list.length === 0 && loading ? <Skeleton width={300} height={18} /> : renderTop()}
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-hide overflow-x-scroll  px-[16px] flex gap-8  flex-nowrap">
        {list?.map((item) => {
          return <VideoCard item={item} key={item.id} />
        })}
      </div>
    </>
  )
}

export default MusicVideo
