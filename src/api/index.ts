"use client"
import axios, { AxiosInstance } from "axios"
import qs from "qs"
import Cookies from "js-cookie"
import { redirect } from "next/navigation"
import { EnumLocalStorage, getItem } from "@/utils/cache"

export interface ErrorRes extends Error {
  url?: string
  code?: number
  error?: string
}

/** 创建请求实例 */
function createService() {
  // 创建一个 Axios 实例
  const service = axios.create({
    withCredentials: true,
    // baseURL: (window as any)._global._BASEURL,
  })

  service.interceptors.response.use(
    (response) => {
      const code = response.data.code || response.data?.data?.code
      const data = response.data || response.data?.data

      console.log("==response==", data)
      if (code === 200) {
        return {
          code,
          message: "",
          success: true,
          data: data.data || data,
        } as any
      }
      return {
        ...(data.data || data),
        code,
        success: false,
      }
    },
    (error) => {
      // Status 是 HTTP 状态码
      // const status = get(error, 'response.status');
      console.log("999", error)
      const status = error?.response?.status
      switch (status) {
        case 301:
          error.message = "需要登录"
          break
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

      return Promise.reject(error)
    }
  )
  return service
}

export function createRequestFunction(service: AxiosInstance) {
  // service.defaults.baseURL = "https://api.douya-music.top"
  service.defaults.baseURL = "/api"

  service.defaults.timeout = 60 * 1000

  service.interceptors.request.use(
    (config) => {


      console.log('config', config.data)
      let data = Object.create(null)
      data = config.data ? config.data : {}

      const cookie = getItem(EnumLocalStorage.cookie)

      if (cookie) {
        data.cookie = cookie
      }
      config.data = data

      console.log('config11', config.data)

      return config
    },
    // 发送失败
    (error) => Promise.reject(error)
  )

  return service
}

// 不缓存
export function createNoCacheRequestFunction(service: AxiosInstance) {
  service.defaults.baseURL = "/api"

  service.defaults.timeout = 60 * 1000

  service.interceptors.request.use(
    (config) => {

      const [url, queryString] = config.url?.split("?") || []
      let obj = Object.create(null)
      obj.timestamp = Date.now()
      if (queryString) {
        obj = {
          ...obj,
          ...qs.parse(queryString),
        }
      }
      console.log('config', config.data)
      let data = Object.create(null)
      data = config.data ? config.data : {}

      const cookie = getItem(EnumLocalStorage.cookie)

      if (cookie) {
        data.cookie = cookie
      }
      config.data = data



      const query = qs.stringify(obj)
      config.url = `${url}?${query}`

      console.log('config11', config.data)

      return config
    },
    // 发送失败
    (error) => Promise.reject(error)
  )

  return service
}

export interface IResp<T = Record<string, string>> {
  code: string
  message: string
  msg?: string
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

export const service = createNoCacheRequestFunction(createService())

export const cacheService = createRequestFunction(createService())
