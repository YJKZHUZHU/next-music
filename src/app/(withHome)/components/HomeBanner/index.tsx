"use client"
import { Swiper, Image } from "antd-mobile"
import { useLoading, useBanner, useResources } from "@/store/homePage"
import Skeleton from "react-loading-skeleton"
import { FC, useMemo } from "react"

interface Props {
  className?: string
}
const HomeBanner: FC<Props> = (props) => {
  const { className } = props

  const loading = useLoading()
  const bannerList = useBanner()
  const resources = useResources()
  console.log("resources", resources)

  const items = useMemo(() => {
    // 去除广告
    const target = bannerList.filter((item) => !!!item.adid)
    return target.map((item) => {
      return (
        <Swiper.Item key={item.url}>
          <div className="h-[160px] rounded-[10px] relative">
            <div className=" py-[2px] px-[3px] absolute bottom-[6px] right-[8px] bg-[#ffffff] rounded-[6px] text-[#121212] text-[12px]">
              {item.typeTitle}
            </div>
            <Image className="rounded-[10px]" lazy height="100%" src={item.pic!} alt="" />
          </div>
        </Swiper.Item>
      )
    })
  }, [bannerList])

  return (
    <>
      {bannerList.length === 0 ? (
        <Skeleton className="h-[160px]" />
      ) : (
        <Swiper className={className} loop autoplay={false}>
          {items}
        </Swiper>
      )}
    </>
  )
}

export default HomeBanner
