"use client"
import { Swiper, Toast, Image } from "antd-mobile"
import { useUserStore } from "@/store/user"
import { EnumBannerType, IBanner, banner } from "@/api/home"
import { useEffect, useMemo, useState } from "react"

export default function Home() {
  const [bannerList, setBannerList] = useState<IBanner[]>([])
  const [userInfo] = useUserStore((state) => [state.userInfo])

  const items = useMemo(() => {
    return bannerList.map((item, index) => (
      <Swiper.Item key={item.url}>
        <div
          className=" h-[180px] rounded-[10px] relative"
          onClick={() => {
            Toast.show(`你点击了卡片 ${index + 1}`)
          }}>
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
    <div className="flex flex-col px-[24px] py-[16px] gap-[32px]">
      <div className=" flex justify-between items-center gap-[12px]">
        <div className="flex flex-col gap-[3px]">
          <span className=" text-[24px] text-[#121212] leading-[32px] font-[600]">
            Hai, {`${userInfo?.profile?.nickname || "游客"}`}
          </span>
          <span className=" text-[14px] leading-[20px] text-[ #454545]">不早不晚，刚好是你</span>
        </div>
        <div className="w-[40px] h-[40px]  rounded-[50%] bg-[#F5F5F5] flex justify-center items-center">
          <Image src="/home/history@2x.png" width={24} height={24} alt="" />
        </div>
      </div>
      <Swiper
        loop
        autoplay={false}
        onIndexChange={(i) => {
          console.log(i, "onIndexChange1")
        }}>
        {items}
      </Swiper>
      <div className=" flex flex-col gap-[24px]  ">
        <div className=" flex justify-between items-center gap-[12px]">
          <span className=" text-[18px] text-[#121212] leading-[24px] font-[500]">推荐歌单</span>
          <span className=" text-[14px] text-[#FB233B] leading-[20px]">查看全部</span>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  )
}
