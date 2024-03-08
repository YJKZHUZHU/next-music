/** 获取登录状态 */

import { loginStatus } from "@/api/user"
import { useUserStore } from "@/store/user"
import { shallow } from "zustand/shallow"
import { useEffect, useLayoutEffect } from "react"

export const useLoginStatus = () => {
  const [login, setLogin] = useUserStore((state) => [state.login, state.setLogin])
  const getLoginStatus = async () => {
    console.log("login", login)
    if (login) return
    try {
      const res = await loginStatus()
      setLogin(res.success)
    } catch (error) {
      console.log("error", error)
    }
  }

  useLayoutEffect(() => {
    getLoginStatus()
  }, [])
  return login
}
