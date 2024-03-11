import { logout } from "@/api/user"
import { removeLoginCache } from "@/utils/cache"

export const useLogout = () => {
  return async () => {
    try {
      const res = await logout()
      removeLoginCache()
      console.log("==退出登录==", res)
    } catch (error) {
      console.log("error", error)
    }
  }
}
