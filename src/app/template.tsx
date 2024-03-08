"use client"
import React, { useEffect } from "react"
import { usePathname } from "next/navigation"
import { shallow } from "zustand/shallow"
import { createWithEqualityFn } from "zustand/traditional"
import { useUserStore } from "@/store/user"
import { accountDetail, userDetail, loginStatus } from "@/api/user"
import { Metadata } from "next"
import { useLoginStatus } from "@/hooks/useLoginStatus"

function Template({ children }: { children: React.ReactNode }) {
  const [login, setAccountInfo, setUid, setLogin, setUserInfo] = useUserStore((state) => [
    state.login,
    state.setAccountInfo,
    state.setUid,
    state.setLogin,
    state.setUserInfo,
  ])
  const pathName = usePathname()

  const getLoginStatus = async () => {
    if (login) return
    try {
      const res = await loginStatus()
      console.log("ssss", res)
      const result = !!res.data.account
      setLogin(result)
      return result
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

        const userId = res.data.profile.userId
        userId && setUid(userId)
        return userId
      }
      return ""
    } catch (error) {
      console.log("error", error)
    }
  }

  // 用户信息
  const getUserDetail = async (userId: number) => {
    try {
      const res = await userDetail({ uid: String(userId) })
      console.log("用户信息", res)
      if (res.success) {
        setUserInfo(res.data)
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  const init = async () => {
    const loginStatus = await getLoginStatus()
    if (!loginStatus) return
    const userId = await getAccountInfo()
    userId && (await getUserDetail(userId))
  }

  useEffect(() => {
    init()
  }, [])

  return <div>{children}</div>
}

export default Template
