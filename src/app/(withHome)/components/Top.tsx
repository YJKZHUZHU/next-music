"use client"
import React, { useState } from "react"
import Image from "next/image"
import { useNickName } from "@/store/login"
import { Input, SearchBar } from "antd-mobile"
import classNames from "classnames"
import style from '../index.module.scss'

// function Top() {
//   const nickName = useNickName()
//   return (
//     <div className="px-[24px] flex justify-between items-center gap-[12px]">
//       <div className="flex flex-col gap-[3px]">
//         <span className=" text-[24px] text-[#121212] leading-[32px] font-[600]">
//           Hi {`${nickName || "游客"}`}
//         </span>
//         <span className=" text-[14px] leading-[20px] text-[#454545]">不早不晚，刚好是你</span>
//       </div>
//       <div className="w-[40px] h-[40px]  rounded-[50%] bg-[#F5F5F5] flex justify-center items-center">
//         <Image src="/home/history@2x.png" priority width={24} height={24} alt="" />
//       </div>
//     </div>
//   )
// }

function Top() {
  const nickName = useNickName()
  const [value, setValue] = useState('')
  return (
    <div className={classNames('flex items-center px-[16px] gap-[16px]', style.top)}>
      <Image src="/home/menu.png" width={24} height={24} alt="" />
      <SearchBar showCancelButton={(focus) => {
        return focus
      }} onlyShowClearWhenFocus={true} clearOnCancel={false} cancelText="搜索" style={{ '--border-radius': '18px', '--background': '#ffffff', '--adm-color-primary': 'transparent' }} className="flex-1 rounded-[18px]" placeholder='请输入内容' />
      {/* <Input
        placeholder='请输入内容'
        value={value}
        onChange={val => {
          setValue(val)
        }}
      /> */}
    </div>
  )
}


export default Top
