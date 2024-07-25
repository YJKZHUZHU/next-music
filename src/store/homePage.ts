import { Block } from "@/api/home"
import { create } from "zustand"
import isEqual from "lodash/isEqual"
import { persist, createJSONStorage, devtools } from "zustand/middleware"
import { ProfileData } from "./user"

export enum EnumBlockCode {
  /** 首页轮播 */
  "HOMEPAGE_BANNER" = "HOMEPAGE_BANNER",
  /** 跳转模块 */
  "HOMEPAGE_BLOCK_OLD_DRAGON_BALL" = "HOMEPAGE_BLOCK_OLD_DRAGON_BALL",
  /** 推荐歌单 */
  "HOMEPAGE_BLOCK_PLAYLIST_RCMD" = "HOMEPAGE_BLOCK_PLAYLIST_RCMD",
  /** 猜你喜欢 */
  "HOMEPAGE_BLOCK_STYLE_RCMD" = "HOMEPAGE_BLOCK_STYLE_RCMD",
  /** 热门话题 */
  "HOMEPAGE_BLOCK_HOT_TOPIC" = "HOMEPAGE_BLOCK_HOT_TOPIC",
  "HOMEPAGE_MUSIC_MLOG" = "HOMEPAGE_MUSIC_MLOG",
  /** ${name}的雷达歌单 */
  "HOMEPAGE_BLOCK_MGC_PLAYLIST" = "HOMEPAGE_BLOCK_MGC_PLAYLIST",
  /** 热门播客 */
  "HOMEPAGE_VOICELIST_RCMD" = "HOMEPAGE_VOICELIST_RCMD",
  "HOMEPAGE_MUSIC_PODCAST_RCMD_BLOCK" = "HOMEPAGE_MUSIC_PODCAST_RCMD_BLOCK",
  /** 专属场景歌单 */
  "HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST" = "HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST",
  /** 云村出品 */
  "HOMEPAGE_BLOCK_YUNCUN_PRODUCED" = "HOMEPAGE_BLOCK_YUNCUN_PRODUCED",
  /** 新歌新碟 */
  "HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG" = "HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG",
  /** 排行榜 */
  "HOMEPAGE_BLOCK_TOPLIST" = "HOMEPAGE_BLOCK_TOPLIST",
  /** 热评歌曲 */
  "HOMEPAGE_BLOCK_NEW_HOT_COMMENT" = "HOMEPAGE_BLOCK_NEW_HOT_COMMENT",
  /** 音乐日历 */
  "HOMEPAGE_MUSIC_CALENDAR" = "HOMEPAGE_MUSIC_CALENDAR",
  /** 广播 */
  "HOMEPAGE_PODCAST24" = "HOMEPAGE_PODCAST24",
  /** 视频合集 */
  "HOMEPAGE_BLOCK_VIDEO_PLAYLIST" = "HOMEPAGE_BLOCK_VIDEO_PLAYLIST",
  "HOMEPAGE_WHOLENET_HOT_PODCAST" = "HOMEPAGE_WHOLENET_HOT_PODCAST",
  "HOMEPAGE_VOICEBOOK_RCMD" = "HOMEPAGE_VOICEBOOK_RCMD",
}

/**
 * 歌曲信息
 */
interface Song {
  name: string // 歌曲名称
  id: number // 歌曲 ID
  pst: number // 未知属性
  t: number // 未知属性
  ar: Artist[] // 艺术家信息数组
  alia: string[] // 歌曲别名数组
  pop: number // 歌曲流行度
  st: number // 未知属性
  rt: string // 未知属性
  fee: number // 费用
  v: number // 版本号
  crbt: null // 未知属性
  cf: string // 未知属性
  al: Album // 专辑信息
  dt: number // 歌曲时长
  h: Track // 高音质音频信息
  m: Track // 中音质音频信息
  l: Track // 低音质音频信息
  sq: Track // 超高音质音频信息
  hr: Track // 超高音质音频信息
  a: null // 未知属性
  cd: string // 专辑编号
  no: number // 未知属性
  rtUrl: null // 未知属性
  ftype: number // 未知属性
  rtUrls: any[] // 未知属性
  djId: number // DJ ID
  copyright: number // 版权信息
  s_id: number // 未知属性
  mark: number // 标记
  originCoverType: number // 原始封面类型
  originSongSimpleData: null // 未知属性
  tagPicList: null // 未知属性
  resourceState: boolean // 资源状态
  version: number // 版本号
  songJumpInfo: null // 未知属性
  entertainmentTags: null // 娱乐标签
  single: number // 是否为单曲
  noCopyrightRcmd: null // 未知属性
  rtype: number // 未知属性
  rurl: null // 未知属性
  mst: number // 未知属性
  cp: number // 未知属性
  mv: number // MV ID
  publishTime: number // 发布时间
  alg: string // 算法
}

/**
 * 艺术家信息
 */
interface Artist {
  id: number // 艺术家 ID
  name: string // 艺术家名称
  tns: string[] // 歌手别名数组
  alias: string[] // 歌手别名数组
}

/**
 * 专辑信息
 */
interface Album {
  id: number // 专辑 ID
  name: string // 专辑名称
  picUrl: string // 专辑封面图片 URL
  tns: string[] // 专辑别名数组
  pic_str: string // 专辑封面图片字符串
  pic: number // 专辑封面图片
}

/**
 * 音轨信息
 */
interface Track {
  br: number // 比特率
  fid: number // 未知属性
  size: number // 音轨大小
  vd: number // 未知属性
  sr: number // 采样率
}

/**
 * 横幅数据类型
 */
export interface IBannerInfo {
  pic: string // 图片 URL
  targetId: number // 目标 ID
  mainTitle: null // 主标题
  adid: null // 广告 ID
  targetType: number // 目标类型
  titleColor: string // 标题颜色
  typeTitle: string // 类型标题
  url: null // URL
  adurlV2: null // 广告 URL
  exclusive: boolean // 是否独家
  monitorImpress: null // 未知属性
  monitorClick: null // 未知属性
  monitorType: null // 未知属性
  monitorImpressList: any[] // 未知属性
  monitorClickList: any[] // 未知属性
  monitorBlackList: null // 未知属性
  extMonitor: null // 未知属性
  extMonitorInfo: null // 未知属性
  adSource: null // 未知属性
  adLocation: null // 未知属性
  encodeId: string // 编码 ID
  program: null // 未知属性
  event: null // 未知属性
  video: null // 未知属性
  dynamicVideoData: null // 未知属性
  song: Song // 歌曲信息
  bannerId: string // 横幅 ID
  alg: string // 算法
  scm: string // SCM
  requestId: string // 请求 ID
  showAdTag: boolean // 是否显示广告标签
  pid: null // 未知属性
  showContext: null // 未知属性
  adDispatchJson: null // 未知属性
  s_ctrp: string // 未知属性
  logContext: null // 未知属性
  bannerBizType: string // 横幅业务类型
}

interface SubTitle {
  canShowTitleLogo: boolean // 是否显示标题标志
  title: string
  titleType: string
}

/**
 * 资源元素 UI 元素
 */
interface UiElement {
  mainTitle: {
    title: string // 主标题
    canShowTitleLogo: boolean // 是否显示标题标志
    titleImgUrl: string
  }
  subTitle: SubTitle // 副标题
  image: {
    action: string // 动作
    title: string // 标题
    imageUrl: string // 图片 URL
    imageUrl2: string // 图片 URL 2
    purePicture: boolean // 是否纯图片
  }
  rcmdShowType: string // 推荐展示类型
  labelText: {
    labelUrl: string
    newLabelUrl?: string
    newTextColor?: string
    text: string
    textColor: string
  }
  labelTexts: string[]
}

/**
 * 资源
 */
export interface Resource {
  uiElement: UiElement // UI 元素
  resourceType: string // 资源类型
  resourceState: null // 资源状态
  resourceId: string // 资源 ID
  resourceUrl: null // 资源 URL
  resourceExtInfo: any // 资源额外信息
  action: string // 动作
  actionType: string // 动作类型
  valid: boolean // 是否有效
  alg: null // 算法
  logInfo: null // 日志信息
  ctrp: null // 未知属性
  likedCount: null // 点赞数
  replyCount: null // 回复数
  resourceContentList: null // 资源内容列表
  position: null // 位置
  playParams: null // 播放参数
}

/**
 * 创意类型
 */
type CreativeType = "DRAGON_BALL"

/**
 * 推荐对象
 */
export interface ICreatives {
  creativeType: CreativeType | string // 创意类型
  resources: Resource[] // 资源数组
  position: number // 位置
  action: string
  actionType: string
  alg: string
  creativeId: string
  logInfo: string
  uiElement: UiElement // UI 元素
}
interface ResourceExtInfo {
  playCount: number // 播放次数
  highQuality: boolean // 是否高质量
  hasListened: boolean // 是否已听
  specialType: number // 特殊类型
  eventMsg: string
  user: ProfileData
}
export interface IRecommendedItem {
  uiElement: UiElement // UI 元素
  resourceType: string // 资源类型
  resourceState: any // 资源状态
  resourceId: string // 资源 ID
  resourceUrl: any // 资源 URL
  resourceExtInfo: ResourceExtInfo // 资源扩展信息
  action: string // 动作
  actionType: string // 动作类型
  valid: boolean // 是否有效
  alg: string // 算法
  logInfo: string // 日志信息
  ctrp: any // CTRP
  likedCount: any // 点赞数
  replyCount: any // 回复数
  resourceContentList: any // 资源内容列表
  position: any // 位置
  playParams: any // 播放参数
}
export interface IRecommendedPlay {
  creativeType: string // 创意类型
  creativeId: string // 创意 ID
  action: string // 动作
  actionType: string // 动作类型
  uiElement: UiElement // UI 元素
  resources: IRecommendedItem[] // 资源数组
  alg: string // 算法
  logInfo: string // 日志信息
  position: number // 位置
}

interface MlogBaseData {
  id: string // 唯一标识符
  type: number // 类型
  originalTitle: string // 原始标题
  text: string // 文本内容
  desc?: null // 描述，可能为空
  interveneText?: null // 干预文本，可能为空
  pubTime: number // 发布时间，时间戳格式
  coverUrl: string // 封面图片URL
  coverDetail: {
    verticalCoverImage: {
      width?: null // 垂直封面图片宽度，可能为空
      height?: null // 垂直封面图片高度，可能为空
      imageUrl: string // 垂直封面图片URL
    }
    horizontalCoverImage: {
      width?: null // 水平封面图片宽度，可能为空
      height?: null // 水平封面图片高度，可能为空
      imageUrl: string // 水平封面图片URL
    }
  }
  coverHeight: number // 封面高度
  greatCover: boolean // 是否是精选封面
  coverWidth: number // 封面宽度
  coverColor: number // 封面颜色
  coverPicKey: string // 封面图片的key
  coverDynamicUrl?: null // 动态封面URL，可能为空
  audio?: null // 音频信息，可能为空
  threadId: string // 线程ID
  duration: number // 时长，毫秒为单位
  video: {
    videoKey: string // 视频key
    duration: number // 视频时长，毫秒为单位
    coverUrl: string // 视频封面URL
    frameUrl: string // 视频帧图片URL
    frameImage: {
      picKey: string // 视频帧图片的key
      imageUrl: string // 视频帧图片URL
      width: number // 视频帧图片宽度
      height: number // 视频帧图片高度
    }
    width: number // 视频宽度
    height: number // 视频高度
    urlInfo: {
      id: string // URL信息ID
      url?: null // 视频URL，可能为空
      size: number // 文件大小
      r?: null // 分辨率，可能为空
      validityTime: number // 有效期时间，秒为单位
      resolution?: null // 分辨率，可能为空
    }
    urlInfos: Array<{
      id: string
      url?: null
      size: number
      r?: null
      validityTime: number
      resolution: number
    }>
    rcmdUrlInfo: {
      id: string
      url?: null
      size: number
      r?: null
      validityTime: number
      resolution?: null
    }
    playCount?: null // 播放次数，可能为空
    coverDetail: {
      verticalCoverImage: {
        picKey: string
        imageUrl: string
        width?: null
        height?: null
      }
      horizontalCoverImage: {
        picKey: string
        imageUrl: string
        width: number
        height: number
      }
    }
  }
  videos?: null // 视频列表，可能为空
  graphic?: null // 图形信息，可能为空
}

interface MlogExtVO {
  likedCount: number // 点赞数
  commentCount: number // 评论数
  playCount: number // 播放次数
  song: {
    id: number // 歌曲ID
    name: string // 歌曲名称
    coverUrl: string // 歌曲封面URL
    duration: number // 歌曲时长，毫秒为单位
    artists: Array<{
      artistId: number // 艺术家ID
      artistName: string // 艺术家名称
    }>
    privilege?: null // 权限信息，可能为空
    albumName: string // 专辑名称
    startTime?: null // 开始时间，可能为空
    endTime?: null // 结束时间，可能为空
  }
  algSong?: null // 算法推荐歌曲，可能为空
  videoStartPlayTime: number // 视频开始播放时间
  canCollect: boolean // 是否可以收藏
  collectReason?: null // 收藏原因，可能为空
  artistName?: null // 艺术家名称，可能为空
  rcmdInfo?: null // 推荐信息，可能为空
  strongPushMark?: null // 强推标记，可能为空
  strongPushIcon?: null // 强推图标，可能为空
  specialTag?: null // 特殊标签，可能为空
  channelTag?: null // 频道标签，可能为空
  artists: Array<{}> // 艺术家列表
}

interface UserProfile {
  userId: number // 用户ID
  nickname: string // 用户昵称
  avatarUrl: string // 用户头像URL
  followed: boolean // 是否已关注
  userType: number // 用户类型
  isAnchor: boolean // 是否是主播
  avatarDetail: {
    userType: number // 用户类型
    identityLevel: number // 身份等级
    identityIconUrl: string // 身份图标URL
  }
}

export interface MlogDetail {
  id: string
  type: number
  mlogBaseDataType: number
  position?: null
  resource: {
    mlogBaseData: MlogBaseData
    mlogExtVO: MlogExtVO
    userProfile: UserProfile
    relatedPubUsers?: null
    status: number
    source: number
    shareUrl: string
    mlogPlaylists?: null
  }
  alg: string
  logInfo: string
  reason?: null
  matchField: number
  matchFieldContent?: null
  sameCity: boolean
}

interface Props {
  pageList: Map<EnumBlockCode, Block>
  loading: boolean
  blockCodeLoading: Record<string, boolean>
}

interface Actions {
  setBlockCodeLoading: (code: string, loading: boolean) => void
  setPageList: (pageList: Block[]) => void
  setLoading: (loading: boolean) => void
  updatePageList: (pageList: Block) => void
}

const initialState: Props = {
  pageList: new Map(),
  loading: false,
  blockCodeLoading: {},
}

export const useHomePageStore = create<Props & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        setPageList: (pageList) => {
          const source = get().pageList
          console.log("更新首页数据")
          pageList.forEach((item) => {
            if (!isEqual(item, source.get(item.blockCode))) {
              console.log("不相等吗", item)
              set({ pageList: source.set(item.blockCode, item) }, false, "更新首页信息")
            }
            // source.set(item.blockCode, item)
          })
          // set({ pageList: source }, false, "更新首页信息")
        },
        setLoading: (loading) => set({ loading }, false, "更新loading状态"),
        setBlockCodeLoading: (blockCode, loading) => {
          const target = get().blockCodeLoading

          set(
            { blockCodeLoading: { ...target, [blockCode]: loading } },
            false,
            `更新${blockCode}loading状态`
          )
        },
        updatePageList: (pageInfo) => {
          console.log("pageInfo", pageInfo)
          const source = get().pageList
          // const result = source.get(pageInfo.blockCode)
          set(
            { pageList: source.set(pageInfo.blockCode, pageInfo) },
            false,
            `更新${pageInfo.blockCode}数据`
          )
        },
      }),
      {
        name: "homePageStore",
        storage: createJSONStorage(() => localStorage, {
          reviver: (key, value: any) => {
            if (key === "pageList") {
              const storedMapArray = JSON.parse(value)
              // 将数组转换为 Map 对象
              const restoredMap = new Map(storedMapArray)
              return restoredMap
            }

            return value
          },
          replacer: (key, value: any) => {
            if (key === "pageList") {
              const mapArray = Array.from(value)

              // 将数组转换为 JSON 字符串
              const mapString = JSON.stringify(mapArray)

              // 将字符串存储到 localStorage
              return mapString
            }

            return value
          },
        }),
      }
    ),
    {
      name: "homePageStore",
    }
  )
)

export const usePageList = () => useHomePageStore((state) => state.pageList)

export const useLoading = () => useHomePageStore((state) => state.loading)

export const useSetBlockCodeLoading = () => useHomePageStore((state) => state.setBlockCodeLoading)

export const useSetPageList = () => useHomePageStore((state) => state.setPageList)

export const useSetLoading = () => useHomePageStore((state) => state.setLoading)

export const useUpdatePageList = () => useHomePageStore((state) => state.updatePageList)

export const useSimilarityRecommendedLoading = () =>
  useHomePageStore(
    (state) => state.blockCodeLoading[EnumBlockCode.HOMEPAGE_BLOCK_STYLE_RCMD] || false
  )

export const useMusicVideoLoading = () =>
  useHomePageStore((state) => state.blockCodeLoading[EnumBlockCode.HOMEPAGE_MUSIC_MLOG] || false)

export const useMusicVideo = () => {
  const target = useHomePageStore((state) => state.pageList.get(EnumBlockCode.HOMEPAGE_MUSIC_MLOG))

  const list = (target?.extInfo! || []) as MlogDetail[]
  const title = target?.uiElement?.subTitle.title
  return {
    list,
    title: title || "精选音乐视频",
  }
}
