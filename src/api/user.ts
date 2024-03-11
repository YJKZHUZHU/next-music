import { IAccountInfo, IUserInfo } from "@/store/user"
import { service, IResp } from "./index"

enum FetchEnum {
  loginByEmail = "/login",
  loginByPhone = "/login/cellphone",
  loginStatus = "/login/status",
  userDetail = "/user/detail",
  accountDetail = "/user/account",
  anonimous = "/register/anonimous",
  logout = "/logout",
}

interface IloginByEmailParams {
  email: string
  password?: string
  timestamp?: number
  /** md5 加密后的密码,传入后 password 将失效 */
  md5_password?: string
}

export const loginByEmail = (data: IloginByEmailParams) => {
  return service.post<IloginByEmailParams, IResp<any>>(FetchEnum.loginByEmail, data)
}

interface IloginByPhoneParams {
  phone: string
  password?: string
  /** md5 加密后的密码,传入后 password 将失效 */
  md5_password?: string
}
export const loginByPhone = (data: IloginByPhoneParams) => {
  return service.post(FetchEnum.loginByPhone, data)
}

export const loginStatus = () => {
  return service.post<unknown, IResp<any>>(FetchEnum.loginStatus)
}

export const userDetail = (data: { uid: string }) => {
  return service.post<unknown, IResp<IUserInfo>>(FetchEnum.userDetail, data)
}

export const accountDetail = () => {
  return service.post<unknown, IResp<IAccountInfo>>(FetchEnum.accountDetail)
}

interface IAnonimousResp {
  cookie: string
  createTime: number
  userId: number
}
/** 游客登录 */
export const anonimous = () => {
  return service.post<unknown, IResp<IAnonimousResp>>(FetchEnum.anonimous)
}

/** 退出登录 */
export const logout = () => {
  return service.post<unknown, IResp<any>>(FetchEnum.logout)
}