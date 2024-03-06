import { service, IResp } from "./index"

enum FetchEnum {
  loginByEmail = "/login",
  loginByPhone = "/login/cellphone",
  loginStatus = "/login/status",
}

interface IloginByEmailParams {
  email: string
  password?: string
  timestamp?: number
  /** md5 加密后的密码,传入后 password 将失效 */
  md5_password?: string
}

export const loginByEmail = (data: IloginByEmailParams) => {
  return service.post<IloginByEmailParams, IResp>(FetchEnum.loginByEmail, data)
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
  return service.post(FetchEnum.loginStatus)
}
