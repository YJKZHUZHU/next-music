import { IResp, service } from "."

enum EnumFeatch {
  /** 获取mlogUrl播放地址 */
  mlogUrl = "/mlog/url",
  /** 将 mlog id 转为视频 id */
  mlogToVideo = "/mlog/to/video",
  /** 调用此接口 , 传入 mv id,可获取 mv 播放地址 */
  mvUrl = "/mv/url",
  /**获取视频播放地址 */
  videoUrl = "/video/url",
}

interface IMlogUrlRes {
  id: string // 数据唯一标识
  type: number // 数据类型
  squareFeedType: number // 动态类型
  recmdType: number // 推荐类型
  resource: {
    // 资源详情
    threadId: string // 动态ID
    commentCount: number // 评论数
    likedCount: number // 点赞数
    shareCount: number // 分享数
    liked: boolean // 是否点赞
    maxCommentShowNum: number // 最大显示评论数
    comments: any[] | null // 评论列表
    ipLocation: {
      ip: any | null // IP地址
      location: string // 地理位置
    }
    id: string // 资源ID
    userId: number // 用户ID
    type: number // 资源类型
    content: {
      // 内容详情
      title: string // 标题
      text: string // 文本内容
      interveneText: any | null // 干预文本
      topics: any[] | null // 话题列表
      actList: {
        id: string // 活动ID
        name: string // 活动名称
        type: number // 活动类型
        subType: any | null // 子类型
        target: string // 活动链接
      }[]
      coverColor: number // 封面颜色
      image: any[] // 图片列表
      albumExt: any | null // 专辑扩展信息
      video: {
        // 视频信息
        videoKey: string // 视频key
        duration: number // 视频时长
        coverUrl: string // 封面URL
        frameUrl: string // 帧URL
        frameImage: {
          picKey: string // 图片key
          imageUrl: string // 图片URL
          width: number // 宽度
          height: number // 高度
        }
        width: number // 视频宽度
        height: number // 视频高度
        urlInfo: {
          id: string // URL信息ID
          url: string // 视频URL
          size: number // 文件大小
          r: number // 分辨率
          validityTime: number // 有效期时间
          resolution: any | null // 分辨率
        }
        urlInfos: {
          id: string
          url: string
          size: number
          r: number
          validityTime: number
          resolution: number
        }[]
        rcmdUrlInfo: {
          id: string
          url: string
          size: number
          r: number
          validityTime: number
          resolution: any | null
        }
        playCount: number // 播放次数
        coverDetail: {
          verticalCoverImage: {
            picKey: string
            imageUrl: string
            width: any | null
            height: any | null
          }
          horizontalCoverImage: {
            picKey: string
            imageUrl: string
            width: number
            height: number
          }
        }
        videoAreaInfo: any | null // 视频区域信息
      }
      audio: any | null // 音频信息
      song: {
        // 歌曲信息
        id: number // 歌曲ID
        name: string // 歌曲名称
        coverUrl: string // 封面URL
        duration: number // 时长
        artists: {
          artistId: number // 艺术家ID
          artistName: string // 艺术家名称
        }[]
        privilege: {
          // 权限信息
          id: number
          fee: number
          payed: number
          realPayed: number
          st: number
          pl: number
          dl: number
          sp: number
          cp: number
          subp: number
          cs: boolean
          maxbr: number
          fl: number
          pc: any | null
          toast: boolean
          flag: number
          paidBigBang: boolean
          preSell: boolean
          playMaxbr: number
          downloadMaxbr: number
          rscl: any | null
          freeTrialPrivilege: {
            resConsumable: boolean
            userConsumable: boolean
          }
          chargeInfoList: {
            rate: number
            chargeUrl: any | null
            chargeMessage: any | null
            chargeType: number
          }[]
        }
        albumName: string // 专辑名称
        startTime: number // 开始时间
        endTime: number // 结束时间
        isLiked: boolean // 是否喜欢
        playedNum: any | null // 播放次数
      }
      songs: any[] // 歌曲列表
      randomSong: any | null // 随机歌曲
      relateSongs: {
        // 相关歌曲列表
        id: number
        name: string
        coverUrl: string
        duration: number
        artists: {
          artistId: number
          artistName: string
        }[]
        privilege: {
          id: number
          fee: number
          payed: number
          realPayed: number
          st: number
          pl: number
          dl: number
          sp: number
          cp: number
          subp: number
          cs: boolean
          maxbr: number
          fl: number
          pc: any | null
          toast: boolean
          flag: number
          paidBigBang: boolean
          preSell: boolean
          playMaxbr: number
          downloadMaxbr: number
          rscl: any | null
          freeTrialPrivilege: {
            resConsumable: boolean
            userConsumable: boolean
          }
          chargeInfoList: {
            rate: number
            chargeUrl: any | null
            chargeMessage: any | null
            chargeType: number
          }[]
        }
        albumName: string
        startTime: number
        endTime: number
        isLiked: boolean
        playedNum: any | null
      }[]
      realateSongs: any[]
      templateId: any | null // 模板ID
      creation: any | null // 创作信息
      coverExt: any | null // 封面扩展信息
      creationUrl: any | null // 创作链接
      imageCreationUrl: any | null // 图片创作链接
      accompanyInfo: {
        // 伴随信息
        accompanyId: any | null
        accompanyType: any | null
        ugcAccompanyId: any | null
      }
      creationTagType: number // 创作标签类型
      creationProtocolInfos: any[] // 创作协议信息列表
    }
    talk: any | null // 话题
    profile: {
      // 用户信息
      userId: number // 用户ID
      nickname: string // 用户昵称
      avatarUrl: string // 用户头像URL
      followed: boolean // 是否关注
      userType: number // 用户类型
      isAnchor: boolean // 是否是主播
      avatarDetail: {
        userType: number // 用户类型
        identityLevel: number // 身份等级
        identityIconUrl: string // 身份图标URL
      }
    }
    relatedPubUsers: any[] // 相关发布用户列表
    pubTime: number // 发布时间
    status: number // 状态
    audioStatus: number // 音频状态
    alg: any | null // 算法信息
    reason: any | null // 原因
    reasonType: any | null // 原因类型
    priorShowLive: boolean // 是否优先显示直播
    live: any | null // 直播信息
    shareUrl: string // 分享链接
    tailMark: any | null // 尾部标记
    subed: boolean // 是否订阅
    mixInfo: {
      // 混合信息
      sourceResId: any | null
      sourceResType: number
      sourceUserId: number
      sourceResOrpheus: string
      sourceResStatus: number
      sourceUserName: string
      status: number
      creationUrl: string
    }
    relatedActivity: any | null // 相关活动
    source: string // 来源
    extSourceInfo: any | null // 扩展来源信息
    srcId: any | null // 来源ID
    circleVO: {
      // 圈子信息
      id: string // 圈子ID
      circleId: number
      name: string // 圈子名称
      target: any | null
      tagGroupId: number
      tagIds: number[]
    }
    mlogPlaylists: any | null // Mlog播放列表
    followedShowReason: any | null
  }
  promotion: any | null // 推广信息
  operate: {
    // 操作信息
    hasBiubiuComments: boolean // 是否有biubiu评论
    showMvTag: boolean // 是否显示MV标签
    showCollect: boolean // 是否显示收藏
    disShowCollectReason: string // 不显示收藏的原因
    playMode: number // 播放模式
  }
  relatedActivity: any | null // 相关活动
  showExtInfo: any | null // 扩展信息显示
  otherData: any | null // 其他数据
  nextModule: any | null // 下一个模块
  srcId: any | null // 来源ID
  businessEntrance: any | null // 业务入口
  logInfo: any | null // 日志信息
}

export const getMlogUrl = (data: { id: string | number; res?: string }) => {
  return service.post<unknown, IResp<IMlogUrlRes>>(EnumFeatch.mlogUrl, data)
}

export const mlogToVideo = (data: { id: string | number }) => {
  return service.post<unknown, IResp<string>>(EnumFeatch.mlogToVideo, data)
}

interface IMvUrlRes {
  id: number // 视频ID
  url: string // 视频URL地址
  r: number // 分辨率，例如1080p
  size: number // 文件大小，单位为字节
  md5: string // 文件的MD5值，用于校验文件完整性
  code: number // 内部状态码，通常与最外层的code相同
  expi: number // 过期时间，单位为秒
  fee: number // 费用，0表示免费
  mvFee: number // MV视频的费用，0表示免费
  st: number // 状态码，0通常表示正常
  promotionVo: any | null // 推广信息，具体结构未知，这里使用any类型
  msg: string // 消息描述，通常用于显示给用户的信息
}

/**
 *
 * @param data
 * @param {r} 分辨率,默认 1080,可从 /mv/detail 接口获取分辨率列表
 * @returns
 */
export const getMvUrl = (data: { id: string | number; r?: string }) => {
  return service.post<unknown, IResp<IMvUrlRes>>(EnumFeatch.mvUrl, data)
}

export const getVideoUrl = (data: { id: string | number }) => {
  return service.post<unknown, IResp<any>>(EnumFeatch.videoUrl, data)
}
