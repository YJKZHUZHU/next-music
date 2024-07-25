"use client"
import { Swiper } from "antd-mobile"
import { IBannerInfo } from "@/store/homePage"
import { FC, useMemo } from "react"
import { NextImage } from "@/components"

interface Props {
  className?: string
  list: IBannerInfo[]
}

const HomeBanner: FC<Props> = (props) => {
  const { className, list } = props

  console.log('轮播')

  const items = useMemo(() => {

    return list?.map((item) => {
      const src = `${item.pic!}`
      return (
        <Swiper.Item key={src}>
          <div className="h-[160px] rounded-[10px] relative">
            {item.typeTitle && (
              <div className=" z-10 px-[2px] absolute bottom-[6px] text-[12px] right-[8px] bg-[#ffffff] rounded-[6px] text-[#2A1F4A]">
                {item.typeTitle}
              </div>
            )}
            <NextImage className="rounded-[10px]" src={src} alt="" />
          </div>
        </Swiper.Item>
      )
    })
  }, [list])

  return (
    <Swiper indicatorProps={{ color: 'white' }} className={className} loop autoplay={false}>
      {items}
    </Swiper>
  )
}

export default HomeBanner
