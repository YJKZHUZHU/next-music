"use client"
import React, { useEffect } from "react"
import { usePathname } from "next/navigation"
import Script from "next/script"
import { useShallow } from "zustand/react/shallow"
import { useUserStore, useIsVip } from "@/store/user"
import { useLoginStore } from "@/store/login"
import { useRouter } from "next-nprogress-bar"
import { accountDetail, userDetail, anonimous, vipGrowthpoint, userLevel } from "@/api/user"
import { login, setLoginCache, EnumLocalStorage, getItem, setItem } from "@/utils/cache"
import { refreshLogin } from "@/utils/refreshLogin"
import { showVConsole } from "@/utils/env"

declare var VConsole: any

function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const update = useLoginStore((state) => state.update)

  const [setAccountInfo, setUserInfo, setVipInfo] = useUserStore(
    useShallow((state) => [state.setAccountInfo, state.setUserInfo, state.setVipInfo])
  )
  const pathName = usePathname()

  const isVip = useIsVip()

  console.log("isVip", isVip)

  // 账户信息
  const getAccountInfo = async () => {
    try {
      const res = await accountDetail()
      console.log("==账户信息==", res.data)
      res.success && setAccountInfo(res.data)
      if (res.success && res.data.profile && res.data.profile?.nickname!) {
        update({ nickName: res.data.profile.nickname! })
      }

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

  const getVipGrowthpoint = async () => {
    try {
      const res = await vipGrowthpoint()
      console.log("==vip信息==", res)
      if (res.success) {
        setVipInfo(res.data)
      }
    } catch (error) {
      console.log("error", error)
    }
  }



  const init = async () => {
    try {
      // !getItem(EnumLocalStorage.visitor) &&
      await refreshLogin()

      if (login()) {
        if (pathName.startsWith("/login")) {
          return router.replace("/")
        }
        // 已登录，设置账号和用户信息
        const result = await getAccountInfo()

        const userId = getItem(EnumLocalStorage.userId) as string
        result && userId && (await getUserDetail(+userId))
      }

      // 未登录，默认注册游客模式，获取用户ID
      // !pathName.startsWith("/login") && (await onRegister())

    } catch (error) {
      console.log('error', error)
    }

  }

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    isVip && getVipGrowthpoint()
  }, [isVip])

  return (
    <>
      {showVConsole && (
        <Script
          src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"
          onReady={() => {
            new VConsole()
          }}
        />
      )}

      {children}
    </>
  )
}

export default Template
