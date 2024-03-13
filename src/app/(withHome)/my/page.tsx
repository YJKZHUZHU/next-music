"use client"
import Image from "next/image"
import { useAvatarUrl, useFolloweds, useFollows, useVipLevel, useLevel } from "@/store/user"
import { Avatar } from "antd-mobile"
import { useNickName } from "@/store/login"

function Page() {
  const nickName = useNickName()
  const avatarUrl = useAvatarUrl()
  const followeds = useFolloweds()
  const follows = useFollows()
  const vipLevel = useVipLevel()

  const level = useLevel()

  return (
    <div className="px-24">
      <div className="bg-[#ffffff] rounded-[16px]  flex-col relative h-100 flex justify-center items-center mt-54">
        <Avatar
          src={avatarUrl!}
          className="!rounded-[50%] !w-60 !h-60 absolute top-0 left-[calc(50% - 30px)] top-[-30px]"
        />

        <div className=" font-[600] mt-20 flex items-center gap-4">
          <span className=" text-20">{nickName}</span>
          <Image
            className=" rounded-[16px]"
            src={`/vip/${vipLevel}.png`}
            width={48}
            height={16}
            alt=""
          />
        </div>
        <div className=" mt-8 flex gap-8 text-[#838382]">
          <span>{follows} 关注</span>
          <span>{followeds} 粉丝</span>
          <span>Lv.{level}</span>
        </div>
      </div>
    </div>
  )
}

export default Page
