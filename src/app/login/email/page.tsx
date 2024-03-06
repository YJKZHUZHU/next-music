"use client"
import { NavBar, Form, Input, SearchBar, Checkbox, Button, NoticeBar } from "antd-mobile"
import React, { useMemo, useState } from "react"
import { useRouter } from "next-nprogress-bar"
import Image from "next/image"
import md5 from "md5"
import { loginByEmail, loginByPhone } from "@/api/user"
import Cookie from "js-cookie"
import { validateEmail } from "@/utils/validateEmail"

import { Header } from "../components"
import styles from "./index.module.scss"

function Email() {
  const router = useRouter()
  // 18470186610@163.com
  // Yjk@18470186610
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [rule, setRule] = useState({
    email: "",
    password: "",
    message: "",
  })

  const validateForm = () => {
    const info = Object.create(null)
    info.message = ""
    if (!email) {
      info.email = "请输入邮箱"
    }
    if (!validateEmail(email)) {
      info.email = "邮箱不合法"
    }
    if (!password) {
      info.password = "请输入密码"
    }

    setRule(info)
    if (Object.values(info).filter(Boolean).length === 0) {
      return true
    }
    return false
  }

  const onLogin = async () => {
    try {
      const validate = validateForm()
      if (!validate) return
      setLoading(true)
      const res = await loginByEmail({ email, md5_password: md5(password), timestamp: Date.now() })
      setLoading(false)
      if (res.success) {
        window.location.href = "/"
        return
      }
      setRule({
        ...rule,
        message: res.message,
      })
    } catch (error) {
      setLoading(false)
      console.log("error", error)
    }
  }
  const onInput = (val: string, update: (val: string) => void) => {
    update(val)
  }
  const active = useMemo(() => {
    return !!(email || password)
  }, [email, password])

  return (
    <div className="flex flex-col">
      <NavBar onBack={router.back}>邮箱登录</NavBar>
      <Header active={active} />

      <div className="px-[24px]">
        <div className="mt-[56px] flex flex-col items-center  ">
          <div className="w-[100%] h-[80px]">
            <div className="h-[56px] px-[16px] py-[16px] flex items-center  gap-[16px] bg-[#F1F2F2] rounded-[12px]">
              <Image
                className={!email ? " inline-block" : "hidden"}
                src="/login/email@2x.png"
                width={24}
                height={24}
                alt=""
              />
              <Image
                className={email ? " inline-block" : "hidden"}
                src="/login/email_active@2x.png"
                width={24}
                height={24}
                alt=""
              />
              <Input
                disabled={loading}
                value={email}
                onChange={(val) => onInput(val, setEmail)}
                placeholder="请输入邮箱"
              />
            </div>
            {rule.email && <div className="text-[#FB233B] px-[4px] mt-[2px]">{rule.email}</div>}
          </div>
          <div className="w-[100%] h-[80px]">
            <div className="h-[56px] px-[16px] py-[16px] flex items-center  gap-[16px] bg-[#F1F2F2] rounded-[12px]">
              <Image
                className={!password ? " inline-block" : "hidden"}
                src="/login/password@2x.png"
                width={24}
                height={24}
                alt=""
              />
              <Image
                className={password ? " inline-block" : "hidden"}
                src="/login/password_active@2x.png"
                width={24}
                height={24}
                alt=""
              />

              <Input
                value={password}
                onChange={(val) => onInput(val, setPassword)}
                placeholder="请输入密码"
                type={visiblePassword ? "text" : "password"}
                autoComplete="false"
                disabled={loading}
              />
              <Image
                onClick={() => setVisiblePassword(false)}
                className={visiblePassword ? " inline-block" : "hidden"}
                src="/login/eye@2x.png"
                width={24}
                height={24}
                alt=""
              />
              <Image
                onClick={() => setVisiblePassword(true)}
                className={!visiblePassword ? " inline-block" : "hidden"}
                src="/login/eye_close@2x.png"
                width={24}
                height={24}
                alt=""
              />
            </div>
            {rule.password && (
              <div className="text-[#FB233B] px-[4px] mt-[2px]">{rule.password}</div>
            )}
          </div>

          <div className="w-[100%] flex justify-between items-center text-[#7A7A7A] text-[14px]">
            <Checkbox className={styles.checkbox}>记住我</Checkbox>
            <span className=" leading-[20px]">忘记密码?</span>
          </div>
        </div>
        <Button
          disabled={!active}
          loading={loading}
          onClick={onLogin}
          className={styles.submitButton}
          fill="solid">
          登录
        </Button>
        {rule.message && <div className="text-[#FB233B] px-[4px] mt-[2px]">{rule.message}</div>}
        <div className=" text-right mt-[32px] h-[20px] leading-[20px] text-[#999999] font-[14px]">
          没有账号？<span className="text-[#FB233B]">去注册</span>
        </div>
      </div>
    </div>
  )
}

export default Email
