"use client"
import React, { useEffect } from "react"
import { usePathname } from "next/navigation"
import Script from "next/script"
import { useShallow } from "zustand/react/shallow"
import { useUserStore } from "@/store/user"
import { useRouter } from "next-nprogress-bar"
import { accountDetail, userDetail, anonimous } from "@/api/user"
import { login, setLoginCache, EnumLocalStorage, getItem } from "@/utils/cache"
import { refreshLogin } from "@/utils/refreshLogin"

declare var VConsole: any

function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const [setAccountInfo, setUserInfo] = useUserStore(
    useShallow((state) => [state.setAccountInfo, state.setUserInfo])
  )
  const pathName = usePathname()

  // 账户信息
  const getAccountInfo = async () => {
    try {
      const res = await accountDetail()
      console.log("==账户信息==", res.data)
      res.success && setAccountInfo(res.data)
      return res.success
    } catch (error) {
      console.log("error", error)
    }
  }

  // 用户信息
  const getUserDetail = async (userId: number) => {
    try {
      const res = await userDetail({ uid: String(userId) })
      console.log("==用户信息==", res)
      res.success && setUserInfo(res.data)
    } catch (error) {
      console.log("error", error)
    }
  }

  // 设置游客模式
  const onRegister = async () => {
    try {
      const res = await anonimous()
      setLoginCache(true, false, res.data.userId, res.data.cookie)
    } catch (error) {
      console.log("error", error)
    }
  }

  const init = async () => {
    await refreshLogin()
    // 已登录
    if (login() && pathName.startsWith("/login")) {
      // location.href = "/"
      router.replace("/")
      return
    }
    // 未登录，默认注册游客模式，获取用户ID
    !login() && !pathName.startsWith("/login") && (await onRegister())
    // 已登录，设置账号和用户信息
    if (login()) {
      const result = await getAccountInfo()
      const userId = getItem(EnumLocalStorage.userId) as string
      result && userId && (await getUserDetail(+userId))
    }
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <Script
        src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"
        onReady={() => {
          new VConsole()
        }}
      />
      {children}
    </>
  )
}

export default Template
