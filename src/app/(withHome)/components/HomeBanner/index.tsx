'use client'
import { EnumBannerType, IBanner, banner } from "@/api/home"
import { Swiper, Image } from "antd-mobile"
import { useEffect, useMemo, useState } from "react"

function HomeBanner() {
  const [bannerList, setBannerList] = useState<IBanner[]>([])
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
      const res = await banner({ type: EnumBannerType.iphone })
      console.log("res--banner", res)
      if (res.success) {
        setBannerList(res.data.banners)
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    getBanner()
  }, [])
  return (
    <Swiper
      loop
      autoplay={false}
      onIndexChange={(i) => {
        console.log(i, "onIndexChange1")
      }}>
      {items}
    </Swiper>
  )
}

export default HomeBanner
