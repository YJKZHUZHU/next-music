"use client"
import { Button } from "antd-mobile"
import Image from "next/image"
import { useRouter } from "next-nprogress-bar"
import { loginStatus } from "@/api/user"
import styles from "./index.module.scss"
import { useEffect } from "react"
import { Metadata } from "next"

// export const metadata: Metadata = {
//   title: "登录",
//   description: "登录",
// }

function Login() {
  const router = useRouter()
  const onLoginLink = (type: "phone" | "email") => {
    router.push(`/login/${type}`)
  }
  // useEffect(() => {
  //   loginStatus()
  // }, [])
  return (
    <div className="bg-white h-[100vh] flex flex-col px-[24px]">
      <p className=" text-[14px] text-[#FB233B] text-right mt-[16px]">立即体验</p>
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
          onClick={() => onLoginLink("phone")}
          className={styles.loginTypeButton}
          fill="solid">
          手机号登录
        </Button>
        <Button
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
