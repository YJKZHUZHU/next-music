"use client"
import { useUserStore } from "@/store/user"
import Image from "next/image"
import { HomeBanner, RecommendedPlaylist } from "./components"

export default function Home() {
  const [userInfo] = useUserStore((state) => [state.userInfo])


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
          <Image priority src="/home/history@2x.png" width={24} height={24} alt="" />
        </div>
      </div>
      <HomeBanner />

      <div className=" flex flex-col gap-[24px]  ">
        <div className=" flex justify-between items-center gap-[12px]">
          <span className=" text-[18px] text-[#121212] leading-[24px] font-[500]">推荐歌单</span>
          <span className=" text-[14px] text-[#FB233B] leading-[20px]">查看全部</span>
        </div>
        <RecommendedPlaylist />
      </div>
    </div>
  )
}
