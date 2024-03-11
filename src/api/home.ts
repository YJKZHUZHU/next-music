import { IResp, service } from "./index"

enum EnumFeatch {
  banner = "/banner",
  songs = "/personalized",
  resource = "/recommend/resource",
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

export const songs = (data: ISongsParams) => {
  return service.post<ISongsParams, IResp<IBannerRes>>(EnumFeatch.songs, data)
}