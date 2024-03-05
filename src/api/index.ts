"use client"
import axios, { AxiosInstance } from "axios"
// import { message } from 'antd-mobile'
// import Cookie, { CookiesEnum } from "@/utils/cookies"
import { redirect } from "next/navigation"

export interface ErrorRes extends Error {
  url?: string
  code?: number
  error?: string
}

/** 创建请求实例 */
function createService() {
  // 创建一个 Axios 实例
  const service = axios.create({
    withCredentials: false,
    // baseURL: (window as any)._global._BASEURL,
  })
  // 请求拦截
  service.interceptors.request.use(
    (config) => {
      return config
    },
    // 发送失败
    (error) => Promise.reject(error)
  )
  // 响应拦截（可根据具体业务作出相应的调整）
  service.interceptors.response.use(
    (response) => {
      return response.data
    },
    (error) => {
      // Status 是 HTTP 状态码
      // const status = get(error, 'response.status');
      console.log("999", error)
      const status = error?.response?.status
      switch (status) {
        case 400:
          error.message = "请求错误"
          break
        case 401:
          error.message = "token过期"
          break
        case 403:
          error.message = "拒绝访问"
          break
        case 404:
          error.message = "请求地址出错"
          break
        case 408:
          error.message = "请求超时"
          break
        case 500:
          error.message = "服务器内部错误"
          break
        case 501:
          error.message = "服务未实现"
          break
        case 502:
          error.message = "网关错误"
          break
        case 503:
          error.message = "服务不可用"
          break
        case 504:
          error.message = "网关超时"
          break
        case 505:
          error.message = "HTTP 版本不受支持"
          break
        default:
          break
      }
      console.log("error===>", JSON.stringify(error))
      // &&
      // ['09020102', '09020101', '09020102'].includes(error.response.data.errorCode))
      // if (
      //   error.response &&
      //   (error.response.status === 401 || error.response.status === 403) &&
      //   window.location.pathname !== "/"
      // ) {
      //   // Cookie.removeAll()
      //   // message.error(error.response.data.errorMessage)
      //   // location.href = `/login`
      // }
      // window.location.pathname !== "/" && message.error(error.message)
      return Promise.reject(error)
    }
  )
  return service
}

export function createRequestFunction(service: AxiosInstance) {
 
  // const token = Cookie.get(CookiesEnum.authentication)

  // console.log("service", token)
  //
  service.defaults.baseURL = "https://neteasecloudmusicapi.vercel.app"

  service.defaults.timeout = 60 * 1000

  // if (token) {
  //   service.defaults.headers.common = {
  //     token,
  //   }
  // }

  return service
}

export interface IResp<T = Record<string, string>> {
  code: string
  message: string
  success: boolean
  data: T
}

export interface IPageRecord<T = Record<string, string>> {
  current: number
  pages: number
  searchCount: boolean
  size: number
  total: number
  records: T[]
}

export const service = createRequestFunction(createService())
