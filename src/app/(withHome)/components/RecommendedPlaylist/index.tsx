"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import { songs, resource, ISongsItem } from "@/api/home"
import { Swiper, Image, SwiperRef } from "antd-mobile"

function RecommendedPlaylist() {
  const [bannerList, setBannerList] = useState<ISongsItem[]>([])
  const swiperRef = useRef<SwiperRef>(null)

  const getSongs = async () => {
    try {
      const res = await songs({ limit: 3 })
      console.log("1111res--", res)
      setBannerList(res.data.result)
    } catch (error) {
      console.log("error", error)
    }
  }
  const verticalItems = useMemo(() => {
    return bannerList.map((item) => (
      <Swiper.Item key={item.id}>
        <div className=" h-[140px] rounded-[10px] relative">
          <Image className="rounded-[10px]" lazy height={140} src={item.picUrl!} alt="" />
        </div>
      </Swiper.Item>
    ))
  }, [bannerList])
  useEffect(() => {
    getSongs()
    resource()
  }, [])
  const index = useMemo(() => {
    console.log(swiperRef.current)
    return 1
  }, [bannerList])
  return (
    <div>
      {index}
      <div className=" flex flex-col">
        <Swiper
          ref={swiperRef}
          loop
          autoplay
          indicator={false}
          direction="vertical"
          className="!rounded-[10px] !h-[140px] !w-[140px]">
          {verticalItems}
        </Swiper>
      </div>
    </div>
  )
}

export default RecommendedPlaylist
