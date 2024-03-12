"use client"
import { EnumBannerType, IBanner, banner } from "@/api/home"
import { Swiper, Image } from "antd-mobile"
import Skeleton from "react-loading-skeleton"
import { FC, useEffect, useMemo, useState } from "react"

interface Props {
  className?: string
}
const HomeBanner: FC<Props> = (props) => {
  const { className } = props
  const [bannerList, setBannerList] = useState<IBanner[]>([])
  const [loading, setLoading] = useState(false)
  const items = useMemo(() => {
    return bannerList.map((item) => (
      <Swiper.Item key={item.url}>
        <div className=" h-[180px] rounded-[10px] relative">
          <div className=" py-[2px] px-[3px] absolute bottom-[6px] right-[8px] bg-[#ffffff] rounded-[6px] text-[#121212] text-[12px]">
            {item.typeTitle}
          </div>
          <Image className="rounded-[10px]" lazy height={180} src={item.pic!} alt="" />
        </div>
      </Swiper.Item>
    ))
  }, [bannerList])

  const getBanner = async () => {
    try {
      setLoading(true)
      const res = await banner({ type: EnumBannerType.iphone })

      if (res.success) {
        setBannerList(res.data.banners)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("error", error)
    }
  }

  useEffect(() => {
    getBanner()
  }, [])

  return (
    <>
      {loading || bannerList.length === 0 ? (
        <Skeleton className="h-[180px]" />
      ) : (
        <Swiper className={className} loop autoplay={false}>
          {items}
        </Swiper>
      )}
    </>
  )
}

export default HomeBanner
