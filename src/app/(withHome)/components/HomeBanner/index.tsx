"use client"
import { Swiper } from "antd-mobile"
import { useBanner, IBannerInfo } from "@/store/homePage"
import { FC, useMemo } from "react"
import { rgbDataURL } from "@/utils/rgbDataURL"
import { NextImage } from '@/components'
import Image from "next/image"

interface Props {
  className?: string
}


const HomeBanner: FC<Props> = (props) => {
  const { className } = props


  const bannerList = useBanner()


  const items = useMemo(() => {

    // 去除广告
    const target = bannerList.filter((item) => !!!item.adid)
    const list = (target.length === 0 ? [{ pic: rgbDataURL(235, 235, 235) }] : target) as IBannerInfo[]


    return list.map((item) => {
      const src = `${item.pic!}`
      return (
        <Swiper.Item key={src}>
          <div className="h-[160px] rounded-[10px] relative">
            {
              item.typeTitle && (<div className=" py-[2px] px-[3px] absolute bottom-[6px] right-[8px] bg-[#ffffff] rounded-[6px] text-[#121212] text-[12px]">
                {item.typeTitle}
              </div>)
            }
            <NextImage  className="rounded-[10px]" src={src} alt="" />

          </div>
        </Swiper.Item>
      )
    })
  }, [bannerList])



  return (
    <Swiper className={className} loop autoplay={false}>
      {items}
    </Swiper>
  )
}

export default HomeBanner
