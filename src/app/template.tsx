"use client"
import React, { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useUserStore } from "@/store/user"
import { accountDetail, userDetail, loginStatus } from "@/api/user"
import { Metadata } from "next"

function Template({ children }: { children: React.ReactNode }) {
  const [login, uid, setAccountInfo, setUid] = useUserStore((state) => [
    state.login,
    state.uid,
    state.setAccountInfo,
    state.setUid,
  ])
  const pathName = usePathname()
  console.log("params", pathName)

  const getLoginStatus = async () => {
    if (login) return
    try {
      const res = await loginStatus()
      // if()
      // if(res.data)
    } catch (error) {
      console.log("error", error)
    }
  }

  // 账户信息
  const getAccountInfo = async () => {
    try {
      const res = await accountDetail()
      if (res.success) {
        setAccountInfo(res.data)
        console.log("111", res.data.profile.userId)
        const userId = res.data.profile.userId
        userId && setUid(userId)
        userId && getUserDetail(userId)
      }
      console.log("res==", res.data)
    } catch (error) {
      console.log("error", error)
    }
  }

  // 用户信息
  const getUserDetail = async (userId: number) => {
    try {
      console.log("uid", userId)
      const res = await userDetail({ uid: String(userId) })
    } catch (error) {
      console.log("error", error)
    }
  }

  const init = async () => {
    await getLoginStatus()
    await getAccountInfo()
    // await getUserDetail()
  }

  useEffect(() => {
    init()
  }, [login])

  return <div>{children}</div>
}

export default Template
