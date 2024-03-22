'use client'
import React from "react"
import Image from "next/image"
import { useNickName } from "@/store/login"
import img from '../../../../../public/home/history@2x.png'



function Top() {
  const nickName = useNickName()
  return (
    <div className="px-[24px] flex justify-between items-center gap-[12px]">
      <div className="flex flex-col gap-[3px]">
        <span className=" text-[24px] text-[#121212] leading-[32px] font-[600]">
          Hi {`${nickName || "游客"}`}
        </span>
        <span className=" text-[14px] leading-[20px] text-[#454545]">不早不晚，刚好是你</span>
      </div>
      <div className="w-[40px] h-[40px]  rounded-[50%] bg-[#F5F5F5] flex justify-center items-center">
        {/* src="/home/history@2x.png" */}
        <Image src={img} priority width={24} height={24} alt="" />
      </div>
    </div>
  )
}

export default Top
