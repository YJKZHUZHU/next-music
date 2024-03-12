import { IResp, service } from "./index"

enum EnumFeatch {
  banner = "/banner",
  songs = "/personalized",
  /** 每日推荐歌单 */
  resource = "/recommend/resource",
  /** 每日推荐歌曲 */
  recommendSongs = "/recommend/songs",
}

export interface IBanner {
  adDispatchJson: string | null
  adLocation: string | null
  adSource: string | null
  adid: string | null
  encodeId: string | null
  event: string | null
  exclusive: boolean
  extMonitor: string | null
  extMonitorInfo: string | null
  imageUrl: string
  monitorBlackList: string | null
  monitorClick: string | null
  monitorClickList: string | null
  monitorImpress: string | null
  monitorImpressList: string | null
  monitorType: string | null
  program: string | null
  scm: string | null
  song: string | null
  targetId: number
  targetType: number
  titleColor: string
  typeTitle: string
  url: string | null
  video: string | null
  pic: string
}
interface IBannerRes {
  banners: IBanner[]
}
export enum EnumBannerType {
  pc,
  android,
  iphone,
  ipad,
}

interface IBannerParams {
  type: EnumBannerType
}
export const banner = (data: IBannerParams) => {
  return service.post<IBannerParams, IResp<IBannerRes>>(EnumFeatch.banner, data)
}

interface ISongsParams {
  limit: number
}

export interface ISongsItem {
  alg: string
  canDislike: boolean
  copywriter: string | null
  highQuality: boolean
  id: number
  name: string
  picUrl: string
  playCount: number
  trackCount: number
  trackNumberUpdateTime: number
  type: number
}
export const songs = (data: ISongsParams) => {
  return service.post<ISongsParams, IResp<{ result: ISongsItem[] }>>(EnumFeatch.songs, data)
}

interface ICreator {
  accountStatus: number
  authStatus: number
  authority: number
  avatarImgId: number
  avatarImgIdStr: string
  avatarUrl: string
  backgroundImgId: number
  backgroundImgIdStr: string
  backgroundUrl: string
  birthday: number
  city: number
  defaultAvatar: false
  description: string
  detailDescription: string
  djStatus: number
  expertTags: null
  followed: false
  gender: number
  mutual: false
  nickname: string
  province: number
  remarkName: null | string
  signature: string
  userId: number
  userType: number
  vipType: number
}
export interface IResourceItem {
  alg: string
  copywriter: string
  createTime: number
  creator: ICreator
  id: number
  name: string
  picUrl: string
  playcount: number
  trackCount: number
  type: number
  userId: number
}
export const resource = () => {
  return service.post<
    unknown,
    IResp<{
      featureFirst: boolean
      haveRcmdSongs: boolean
      recommend: IResourceItem[]
    }>
  >(EnumFeatch.resource)
}

export const recommendSongs = () => {
  return service.post<
    unknown,
    IResp<{
      featureFirst: boolean
      haveRcmdSongs: boolean
      recommend: IResourceItem[]
    }>
  >(EnumFeatch.recommendSongs)
}
