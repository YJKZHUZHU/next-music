import { IBannerInfo, ICreatives, IRecommendedPlay, MlogDetail } from "@/store/homePage"
import { IResp, service } from "./index"

enum EnumFeatch {
  banner = "/banner",
  songs = "/personalized",
  /** 每日推荐歌单 */
  resource = "/recommend/resource",
  /** 每日推荐歌曲 */
  recommendSongs = "/recommend/songs",
  /** 首页发现 */
  homepage = "/homepage/block/page",
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
  id: number // 音乐列表项的 ID
  type: number // 类型
  name: string // 音乐列表项的名称
  copywriter: string // 复制文本
  picUrl: string // 图片链接
  canDislike: boolean // 是否可取消喜欢
  trackNumberUpdateTime: number // 音乐列表项的更新时间
  playCount: number // 播放次数
  trackCount: number // 音乐数目
  highQuality: boolean // 是否高质量
  alg: string // 算法
}
interface ISongsResp {
  hasTaste: boolean // 是否有品味
  code: number // 响应码
  category: number // 类别
  result: ISongsItem[] // 音乐结果数组
}
export const songs = (data: ISongsParams) => {
  return service.post<ISongsParams, IResp<ISongsResp>>(EnumFeatch.songs, data)
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

interface Creator {
  avatarImgId: number // 创建者头像图片 ID
  backgroundImgId: number // 创建者背景图片 ID
  birthday: number // 创建者生日
  city: number // 创建者所在城市
  avatarUrl: string // 创建者头像链接
  authStatus: number // 创建者认证状态
  userType: number // 创建者用户类型
  nickname: string // 创建者昵称
  backgroundUrl: string // 创建者背景图片链接
  gender: number // 创建者性别
  accountStatus: number // 创建者账号状态
  vipType: number // 创建者 VIP 类型
  province: number // 创建者所在省份
  remarkName: null // 创建者备注名
  mutual: boolean // 是否互相关注
  djStatus: number // DJ 状态
  followed: boolean // 是否已关注
  avatarImgIdStr: string // 创建者头像图片 ID 字符串
  backgroundImgIdStr: string // 创建者背景图片 ID 字符串
  detailDescription: string // 创建者详细描述
  defaultAvatar: boolean // 是否默认头像
  expertTags: null // 专家标签
  description: string // 创建者描述
  userId: number // 创建者用户 ID
  signature: string // 创建者签名
  authority: number // 创建者权限
}
export interface IResourceItem {
  id: number // 推荐项 ID
  type: number // 类型
  name: string // 推荐项名称
  copywriter: string // 复制文本
  picUrl: string // 图片链接
  playcount: number // 播放次数
  createTime: number // 创建时间
  creator: Creator // 创建者信息
  trackCount: number // 音轨数
  userId: number // 用户 ID
  alg: string // 算法
}
interface IResourceResponseData {
  code: number // 响应码
  featureFirst: boolean // 特征优先
  haveRcmdSongs: boolean // 是否有推荐歌曲
  recommend: IResourceItem[] // 推荐项数组
}
export const resource = () => {
  return service.post<unknown, IResp<IResourceResponseData>>(EnumFeatch.resource)
}

interface Artist {
  id: number // 艺术家 ID
  name: string // 艺术家名称
  tns: string[] // 艺术家别名
  alias: string[] // 艺术家别名
}
interface Album {
  id: number // 专辑 ID
  name: string // 专辑名称
  picUrl: string // 专辑封面图片 URL
  tns: string[] // 专辑别名
  pic_str: string // 专辑封面图片字符串
  pic: number // 专辑封面图片
}
interface HighQualityAudio {
  br: number // 比特率
  fid: number
  size: number // 音频文件大小
  vd: number
  sr: number // 采样率
}
interface OriginSongSimpleData {
  songId: number // 原始歌曲 ID
  name: string // 原始歌曲名称
  artists: Artist[] // 原始歌曲艺术家列表
  albumMeta: {
    id: number // 原始专辑 ID
    name: string // 原始专辑名称
  }
}
interface Privilege {
  id: number // 特权 ID
  fee: number // 特权费用
  payed: number // 已付费用
  realPayed: number // 实际已付费用
  st: number
  pl: number
  dl: number
  sp: number
  cp: number
  subp: number
  cs: boolean
  maxbr: number // 最大比特率
  fl: number
  pc: any
  toast: boolean
  flag: number
  paidBigBang: boolean
  preSell: boolean
  playMaxbr: number // 播放最大比特率
  downloadMaxbr: number // 下载最大比特率
  maxBrLevel: string // 最大比特率级别
  playMaxBrLevel: string // 播放最大比特率级别
  downloadMaxBrLevel: string // 下载最大比特率级别
  plLevel: string // 播放级别
  dlLevel: string // 下载级别
  flLevel: string // 收费级别
  rscl: any
  freeTrialPrivilege: {
    resConsumable: boolean
    userConsumable: boolean
    listenType: any
    cannotListenReason: any
    playReason: any
  }
  rightSource: number
  chargeInfoList: {
    rate: number // 费率
    chargeUrl: any
    chargeMessage: any
    chargeType: number // 费用类型
  }[]
}
interface RecommendationReason {
  songId: number // 推荐歌曲 ID
  reason: string // 推荐原因
  reasonId: string // 推荐原因 ID
  targetUrl: any
}
interface Song {
  name: string // 歌曲名称
  id: number // 歌曲 ID
  pst: number
  t: number
  ar: Artist[] // 艺术家列表
  alia: string[]
  pop: number
  st: number
  rt: string
  fee: number // 费用
  v: number
  crbt: any
  cf: string
  al: Album // 专辑信息
  dt: number // 歌曲时长
  h: HighQualityAudio // 高质量音频
  m: HighQualityAudio // 中等质量音频
  l: HighQualityAudio // 低质量音频
  sq: HighQualityAudio // 超高质量音频
  hr: HighQualityAudio // 超高码率音频
  a: any
  cd: string
  no: number
  rtUrl: any
  ftype: number
  rtUrls: any[]
  djId: number
  copyright: number
  s_id: number
  mark: number
  originCoverType: number
  originSongSimpleData: OriginSongSimpleData
  tagPicList: any
  resourceState: boolean
  version: number
  songJumpInfo: any
  entertainmentTags: any
  single: number
  noCopyrightRcmd: any
  rtype: number
  rurl: any
  mst: number
  cp: number
  mv: number
  publishTime: number
  reason: any
  recommendReason: any
  privilege: Privilege // 特权信息
  alg: string
  s_ctrp: string
}
interface IRecommendSongsData {
  dailySongs: Song[] // 每日歌曲列表
  orderSongs: any[]
  recommendReasons: RecommendationReason[] // 推荐原因列表
  mvResourceInfos: any
}

interface IRecommendSongsResponse {
  code: number // 响应代码
  data: IRecommendSongsData // 数据
}
export const recommendSongs = () => {
  return service.post<unknown, IResp<IRecommendSongsResponse>>(EnumFeatch.recommendSongs)
}

/**
 * 数据对象
 */
interface IHomePageData {
  cursor: string // 游标
  blocks: Block[] // 数据块列表
  hasMore: boolean // 是否还有更多数据
  blockUUIDs: null // 数据块UUID列表
  pageConfig: PageConfig // 页面配置对象
  guideToast: GuideToast // 引导提示对象
  internalTest: null // 内部测试
  titles: any[] // 标题列表
  blockCodeOrderList: null // 数据块编码顺序列表
  exposedResource: string // 暴露的资源
  demote: boolean // 是否降级
}

/**
 * 数据块对象
 */
export interface Block {
  blockCode: string // 数据块编码
  showType: string // 展示类型
  dislikeShowType: number // 不喜欢的展示类型
  extInfo:
    | {
        banners?: (IBannerInfo | IRecommendedPlay)[]
      }
    | MlogDetail[] // 扩展信息
  creatives: ICreatives[]
  canClose: boolean // 是否可以关闭
  blockStyle: number // 数据块样式
  canFeedback: boolean // 是否可以反馈
  blockDemote: boolean // 数据块是否降级
  sort: number // 排序
  uiElement: {
    subTitle: {
      title: string
      canShowTitleLogo: boolean
    }
    button: {
      action: string
      actionType: string
      text: string
      iconUrl: null | string
      biData: null | string
    }
    rcmdShowType: string
  }
  resourceIdList: string[]
}

/**
 * 页面配置对象
 */
interface PageConfig {
  refreshToast: string // 刷新提示
  nodataToast: string // 无数据提示
  refreshInterval: number // 刷新间隔
  title: any // 标题
  fullscreen: boolean // 是否全屏
  abtest: string[] // AB测试列表
  songLabelMarkPriority: string[] // 歌曲标签优先级
  songLabelMarkLimit: number // 歌曲标签限制数
  homepageMode: string // 主页模式
  showModeEntry: boolean // 是否显示模式入口
  orderInfo: string // 排序信息
}

/**
 * 引导提示对象
 */
interface GuideToast {
  hasGuideToast: boolean // 是否有引导提示
  toastList: any[] // 提示列表
}

/**
 * trp对象
 */
interface Trp {
  rules: string[] // 规则列表
}
export const homepage = (data: { refresh: boolean; cursor?: string }) => {
  return service.post<unknown, IResp<IHomePageData>>(EnumFeatch.homepage, data)
}
