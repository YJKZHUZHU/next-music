import { Block } from "@/api/home"
import { trace } from "console"
import { create } from "zustand"
import { persist, createJSONStorage, devtools } from "zustand/middleware"

interface Props {
  pageList: Block[]
  loading: boolean
}

interface Actions {
  setPageList: (pageList: Block[]) => void
  setLoading: (loading: boolean) => void
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
  labelTexts: string[] // 标签文本数组
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
  creativeType: CreativeType // 创意类型
  resources: Resource[] // 资源数组
  position: number // 位置
}
interface ResourceExtInfo {
  playCount: number // 播放次数
  highQuality: boolean // 是否高质量
  hasListened: boolean // 是否已听
  specialType: number // 特殊类型
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

const initialState: Props = {
  pageList: [],
  loading: false,
}

export const useHomePageStore = create<Props & Actions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setPageList: (pageList) => set({ pageList }, false, "更新首页信息"),
        setLoading: (loading) => set({ loading }, false, "更新loading状态"),
      }),
      {
        name: "homePageStore",
        storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      }
    ),
    {
      name: "homePageStore",
    }
  )
)

export const useLoading = () => useHomePageStore((state) => state.loading)

// 首页轮播位
export const useBanner = () =>
  useHomePageStore(
    (state) =>
      (state.pageList?.find((d) => d.blockCode === "HOMEPAGE_BANNER")?.extInfo?.banners ||
        []) as unknown as IBannerInfo[]
  )

// 首页导航位
export const useResources = () =>
  useHomePageStore(
    (state) =>
      state.pageList
        ?.find((d) => d.blockCode === "HOMEPAGE_BLOCK_OLD_DRAGON_BALL")
        ?.creatives?.find((d) => d.creativeType === "DRAGON_BALL")?.resources || []
  )

export const useRecommendedPlay = () =>
  useHomePageStore((state) => {
    const target = state.pageList?.find((d) => d.blockCode === "HOMEPAGE_BLOCK_PLAYLIST_RCMD")
    const list = target?.creatives || []
    const title = target?.uiElement?.subTitle.title
    return {
      list: list as unknown as IRecommendedPlay[],
      title: title || '推荐歌单',
    }
  })

// 相似推荐
export const useSimilarityRecommended = () => {
  const target = useHomePageStore((state) =>
    state.pageList.find((item) => item.blockCode === "HOMEPAGE_BLOCK_STYLE_RCMD")
  )
  return {
    list: target?.creatives || [],
    resourceIdList: target?.resourceIdList || [],
    title: target?.uiElement?.subTitle?.title,
    button: target?.uiElement?.button,
  }
}
