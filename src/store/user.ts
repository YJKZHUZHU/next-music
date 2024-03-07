import { create } from "zustand"
import { devtools } from "zustand/middleware"
import Cookies from "js-cookie"

interface IAccount {
  anonimousUser: boolean
  ban: number
  baoyueVersion: number
  createTime: number
  donateVersion: number
  id: number
  paidFee: boolean
  status: number
  tokenVersion: number
  type: number
  userName: string
  vipType: number
  whitelistAuthority: number
}

interface IProfile {
  userId: number
  userType: number
  nickname: string
  avatarImgId: number
  avatarUrl: string
  backgroundImgId: number
  backgroundUrl: string
  signature: string
  createTime: number
  userName: string
  accountType: number
  shortUserName: string
  birthday: number
  authority: number
  gender: number
  accountStatus: number
  province: number
  city: number
  authStatus: number
  description: null | string
  detailDescription: null | string
  defaultAvatar: boolean
  expertTags: null | string
  experts: null | string
  djStatus: number
  locationStatus: number
  vipType: number
  followed: boolean
  mutual: boolean
  authenticated: boolean
  lastLoginTime: number
  lastLoginIP: string
  remarkName: null | string
  viptypeVersion: number
  authenticationTypes: number
  avatarDetail: null | string
  anchor: boolean
}
interface IBindings {
  bindingTime: number
  expired: boolean
  expiresIn: number
  id: number
  refreshTime: number
  tokenJsonStr: any
  type: number
  url: string
  userId: number
  [props: string]: any
}
interface IIdentify {
  imageUrl: string
  imageDesc: string
  actionUrl: any
  [props: string]: any
}

interface IUserInfo {
  adValid: boolean
  bindings: IBindings[]
  code: number
  createDays: number
  createTime: number
  identify: IIdentify
  level: number
  listenSongs: number
  mobileSign: boolean
  pcSign: boolean
  peopleCanSeeMyPlayRecord: boolean
  profile: IProfile
  userPoint: {
    balance: number
    blockBalance: number
    status: number
    updateTime: number
    userId: number
    version: number
    [props: string]: any
  }
  [props: string]: any
}

export interface IAccountInfo {
  account: Partial<IAccount>
  profile: Partial<IProfile>
}

interface Props {
  cookie: string
  login: boolean
  uid: string | number
  accountInfo: Partial<IAccountInfo> // 账号信息
  userInfo: Partial<IUserInfo> // 用户信息
}

interface Actions {
  setCookie: (cookie: string) => void
  setLogin: (cookie: boolean) => void
  setUid: (uid: string | number) => void
  setAccountInfo: (accountInfo: IAccountInfo) => void
}

const initialState: Props = {
  cookie: Cookies.get("cookie") || "",
  login: false,
  uid: "",
  accountInfo: {},
  userInfo: {},
}

export const useUserStore = create<Props & Actions>()(
  devtools(
    (set) => ({
      ...initialState,
      setCookie: (cookie) => set({ cookie }, false, "设置cookie"),
      setLogin: (login) => set({ login }, false, "设置cookie"),
      setUid: (uid) => set({ uid }, false, "设置uid"),
      setAccountInfo: (accountInfo) => set({ accountInfo }, false, "设置账户信息"),
    }),
    {
      name: "userStore",
    }
  )
)
