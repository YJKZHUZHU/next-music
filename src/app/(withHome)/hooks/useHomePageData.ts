import { Block, homepage } from "@/api/home"
import {
  EnumBlockCode,
  IBannerInfo,
  IRecommendedItem,
  IRecommendedPlay,
  useLoading,
  usePageList,
  useSetBlockCodeLoading,
  useSetLoading,
  useSetPageList,
  useSimilarityRecommendedLoading,
  useUpdatePageList,
} from "@/store/homePage"
import { useEffect, useRef } from "react"

const MapRankTagColor = new Map()
  .set("colorSecondary4", "#F85E65")
  .set("colorSecondary7", "#469072")

export interface ISourceItem {
  image: string
  title: string
  showtoday: boolean
  resourceId: string
  [props: string]: any
}

export const useHomePageData = () => {
  const pageList = usePageList()

  const loading = useLoading()

  const setBlockCodeLoading = useSetBlockCodeLoading()
  const setPageList = useSetPageList()
  const setLoading = useSetLoading()
  const updatePageList = useUpdatePageList()

  const cursor = useRef("")

  const totalData = useRef<Block[]>([])

  const getData = async (data: { refresh: boolean; cursor?: string }) => {
    try {
      setLoading(true)
      const res = await homepage(data)
      console.log("==app首页数据==", res)
      cursor.current = res.data.cursor
      setPageList(res.data.blocks)
      if (res.data.hasMore && cursor.current) {
        totalData.current = [...totalData.current, ...res.data.blocks]
        // 继续请求，直到数据全部请求完成
        getData({ refresh: false, cursor: cursor.current })
        return
      }
      totalData.current = [...totalData.current, ...res.data.blocks]

      // setPageList(totalData.current)

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("error", error)
    }
  }

  const getOneData = async (refresh: boolean, blockCode: EnumBlockCode) => {
    try {
      setBlockCodeLoading(blockCode, true)

      const res = await homepage({
        refresh,
        cursor: JSON.stringify({
          offset: 0,
          blockCodeOrderList: [blockCode],
        }),
      })
      console.log(`==${blockCode}==数据`, res.data.blocks)

      const target = res.data.blocks.find((item) => item.blockCode === blockCode)
      target && updatePageList(target)

      setBlockCodeLoading(blockCode, false)
    } catch (error) {
      setBlockCodeLoading(blockCode, false)
      console.log("error", error)
    }
  }
  useEffect(() => {
    getData({
      refresh: false,
      // cursor: ''
    })
  }, [])

  console.log("推荐歌单", pageList.get(EnumBlockCode.HOMEPAGE_BLOCK_PLAYLIST_RCMD))

  const similarityRecommendedLoading = useSimilarityRecommendedLoading()

  // 轮播
  const bannerList =
    (
      pageList.get(EnumBlockCode.HOMEPAGE_BANNER)?.extInfo as { banners?: IBannerInfo[] }
    )?.banners?.filter((item) => !!!item.adid) || []

  // 入口
  const resources: ISourceItem[] =
    pageList
      .get(EnumBlockCode.HOMEPAGE_BLOCK_OLD_DRAGON_BALL)
      ?.creatives?.find((d) => d.creativeType === "DRAGON_BALL")
      ?.resources?.map((item) => {
        return {
          image: item?.uiElement.image?.imageUrl2 || "/",
          title: item?.uiElement?.mainTitle?.title,
          showtoday: item?.action === "orpheus://songrcmd",
          resourceId: item?.resourceId,
        }
      }) || []

  // 获取歌单
  const getPlayList = (type: EnumBlockCode, defaultTitle: string) => {
    const result = pageList.get(type)
    const list = result?.creatives || []
    const title = result?.uiElement?.subTitle.title || defaultTitle
    return {
      title,
      list: list.map((d) => {
        return {
          showSwiper: d?.creativeType === "scroll_playlist",
          resources: d?.resources?.map((item) => {
            return {
              imageUrl: item?.uiElement.image.imageUrl,
              playCount: item?.resourceExtInfo?.playCount,
              resourceId: item?.resourceId,
              title: item?.uiElement.mainTitle.title,
            }
          }),
          id: d.creativeId,
          imageUrl: d.uiElement.image.imageUrl,
          playCount: d.resources[0]?.resourceExtInfo?.playCount,
          title: d.uiElement.mainTitle.title,
        }
      }),
    }
  }

  // 热门话题
  const topicList = () => {
    const result = pageList.get(EnumBlockCode.HOMEPAGE_BLOCK_HOT_TOPIC)

    const list = result?.creatives
      ?.map((item) => item.resources)
      ?.flat() as unknown as IRecommendedItem[]

    const title = result?.uiElement?.subTitle.title || "热门话题"
    return {
      list: list?.map((item) => {
        return {
          id: item?.resourceId,
          titleImgUrl: item?.uiElement?.mainTitle?.titleImgUrl,
          title: item?.uiElement?.mainTitle?.title,
          subTitle: item?.uiElement?.subTitle?.title,
          nickname: item?.resourceExtInfo?.user?.nickname,
          eventMsg: item?.resourceExtInfo?.eventMsg,
          imageUrl: item?.uiElement?.image?.imageUrl,
        }
      }),
      title,
    }
  }

  // 猜你喜欢
  const similarityRecommended = () => {
    const result = pageList.get(EnumBlockCode.HOMEPAGE_BLOCK_STYLE_RCMD)

    return {
      list:
        result?.creatives.map((item, index) => {
          return {
            key: index,
            resources: item.resources.map((d) => {
              let subTitle = ""
              if (d?.uiElement?.subTitle?.titleType === "songRcmdTag") {
                subTitle = d?.uiElement?.subTitle?.title
              } else if (!d?.uiElement?.subTitle?.title) {
                subTitle = ""
              } else {
                subTitle = "SQ"
              }
              return {
                id: d.resourceId,
                imageUrl: d.uiElement?.image?.imageUrl,
                title: d?.uiElement?.mainTitle?.title,
                titleType: d?.uiElement?.subTitle?.titleType,
                subTitle,
                artists: d?.resourceExtInfo?.artists?.map((s: any) => s.name).join(` / `),
                showPlayIcon: !!d.resourceExtInfo?.song?.videoInfo?.video,
              }
            }),
          }
        }) || [],
      title: result?.uiElement?.subTitle?.title || "",
      button: result?.uiElement?.button.text,
      loading: similarityRecommendedLoading,
      showRefresh: true,
    }
  }

  // 新歌新碟
  const newAlbumNewSong = () => {
    const result = pageList.get(EnumBlockCode.HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG)
    return {
      list:
        result?.creatives.map((item, index) => {
          return {
            key: index,
            resources: item.resources.map((d) => {
              let subTitle = ""
              if (d?.resourceExtInfo?.songPrivilege?.dlLevel === "hires") {
                subTitle = "Hi-Res"
              } else if (d?.resourceExtInfo?.songPrivilege?.dlLevel === "lossless") {
                subTitle = "SQ"
              } else if (!d?.resourceExtInfo?.songPrivilege) {
                subTitle = ""
              } else {
                subTitle = ""
              }
              return {
                id: d.resourceId,
                imageUrl: d.uiElement?.image?.imageUrl,
                title: d?.uiElement?.mainTitle?.title,
                titleType: d?.uiElement?.subTitle?.titleType,
                subTitle,
                artists: d?.resourceExtInfo?.artists?.map((s: any) => s.name).join(` / `),
                showPlayIcon: !!d.resourceExtInfo?.song?.videoInfo?.video,
              }
            }),
          }
        }) || [],
      // title: result?.uiElement?.subTitle?.title || "",
      title: `新歌新碟 \\数字专辑`,
      button: "",
      loading: false,
      showRefresh: false,
    }
  }

  // 热门播客
  const voicelistRcmd = () => {
    const result = pageList.get(EnumBlockCode.HOMEPAGE_VOICELIST_RCMD)
    return {
      list:
        result?.creatives.map((item, index) => {
          return {
            key: index,
            resources: item.resources.map((d) => {
              return {
                id: d.resourceId,
                imageUrl: d.uiElement?.image?.imageUrl,
                title: d?.uiElement?.mainTitle?.title,
                titleType: d?.uiElement?.subTitle?.titleType,
                subTitle: d?.uiElement?.labelTexts[0],
                artists: d?.uiElement?.subTitle?.title!,
                showPlayIcon: !!d.resourceExtInfo?.song?.videoInfo?.video,
              }
            }),
          }
        }) || [],
      title: result?.uiElement?.subTitle?.title || "热门播客",
      button: "",
      loading: false,
      showRefresh: false,
    }
  }

  const yuncunList = () => {
    const result = pageList.get(EnumBlockCode.HOMEPAGE_BLOCK_YUNCUN_PRODUCED)

    return {
      title: result?.uiElement?.subTitle?.title || "云村出品",
      list:
        result?.creatives?.map((item) => {
          return {
            id: item.action,
            imgUrl: item?.uiElement?.image?.imageUrl,
            title: item?.uiElement?.mainTitle?.title,
          }
        }) || [],
    }
  }

  const rankingList = () => {
    const result = pageList.get(EnumBlockCode.HOMEPAGE_BLOCK_TOPLIST)
    return {
      title: result?.uiElement?.subTitle?.title || "排行榜",
      list:
        result?.creatives?.map((item) => {
          return {
            id: item.action,
            title: item?.uiElement?.mainTitle?.title,
            list:
              item?.resources?.map((d) => {
                return {
                  id: d?.resourceId,
                  title: d?.uiElement?.mainTitle?.title,
                  tag: d?.uiElement?.labelText?.text,
                  tagColor: MapRankTagColor.get(d?.uiElement?.labelText?.textColor),
                  tarUrl: d?.uiElement?.labelText?.labelUrl,
                  imgUrl: d?.uiElement?.image?.imageUrl,
                  artists: d?.resourceExtInfo?.artists,
                }
              }) || [],
          }
        }) || [],
    }
  }

  return {
    getOneData,
    getData,
    bannerList,
    resources,
    showSkeleton: pageList.size == 0, // 显示骨架屏幕
    recommendedPlayList: getPlayList(EnumBlockCode.HOMEPAGE_BLOCK_PLAYLIST_RCMD, "推荐歌单"), // 推荐歌单
    radarPlayList: getPlayList(EnumBlockCode.HOMEPAGE_BLOCK_MGC_PLAYLIST, "网易云音乐的雷达歌单"), // 雷达歌单
    scenePlayList: getPlayList(EnumBlockCode.HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST, "专属场景歌单"), // 雷达歌单
    topicList: topicList(), // 热门话题
    similarityRecommended: similarityRecommended(), // 猜你喜欢
    newAlbumNewSong: newAlbumNewSong(), // 新歌新碟
    voicelistRcmd: voicelistRcmd(), // 热门播客
    yuncunList: yuncunList(), // 云村出品
    rankingList: rankingList(), // 排行榜
  }
}
