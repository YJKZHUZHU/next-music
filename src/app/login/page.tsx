"use client"
import { Button, DotLoading } from "antd-mobile"
import Image from "next/image"
import { anonimous } from "@/api/user"
import { useRouter } from "next-nprogress-bar"
import { loginStatus } from "@/api/user"
import styles from "./index.module.scss"
import { useEffect, useState } from "react"
import { Metadata } from "next"
import { useUserStore } from "@/store/user"
import { EnumLocalStorage, setItem, setLoginCache } from "@/utils/cache"

function Login() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const onLoginLink = (type: "phone" | "email") => {
    router.push(`/login/${type}`)
  }

  const onRegister = async () => {
    try {
      setLoading(true)
      const res = await anonimous()
      console.log("res--", res)
      setLoading(false)
      if (res.success) {
        setLoginCache(true, false, res.data.userId, res.data.cookie)

        location.href = "/"
      }
    } catch (error) {
      console.log("error", error)
    }
  }
  return (
    <div className="bg-white h-[100vh] flex flex-col px-[24px]">
      <div className=" text-[14px] text-[#FB233B] text-right mt-[16px]" onClick={onRegister}>
        {loading && <DotLoading color="#FB233B" />}
        <span>立即体验</span>
      </div>
      <div className={`${styles.logoMask} h-[362px]`}>
        <div className={`flex flex-col justify-end h-[362px] items-center ${styles.logoContainer}`}>
          <Image priority src="/login/logo@2x.png" width={80} height={80} alt="logo" />
          <p className="mt-[16px] text-[24px] text-[#292929] mb-[33px] leading-[32px]">
            不早不晚，刚好是你-豆芽音乐
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-[16px]">
        <Button
          disabled={loading}
          onClick={() => onLoginLink("phone")}
          className={styles.loginTypeButton}
          fill="solid">
          手机号登录
        </Button>
        <Button
          disabled={loading}
          onClick={() => onLoginLink("email")}
          className={styles.loginTypeButton}
          fill="solid">
          邮箱登录
        </Button>
      </div>
    </div>
  )
}
export default Login
