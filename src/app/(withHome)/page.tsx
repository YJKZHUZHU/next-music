"use client"
import { Block, homepage } from "@/api/home"
import { Divider, PullToRefresh } from "antd-mobile"
import { EnumBlockCode, useHomePageStore } from "@/store/homePage"
import { useEffect, useRef } from "react"
import {
  HomeBanner,
  Top,
  Resources,
  MusicVideo,
  Card,
  Skeleton
} from "./components"
import { useHomePageData } from './hooks/useHomePageData'
import style from './index.module.scss'
import classNames from "classnames"


// 轮播，入口，推荐歌单，猜你喜欢，热门话题，雷达歌单，热门播客，专属场景歌单，云村出品，新歌新碟，排行榜，云村星评馆，音乐日历，广播

export default function Home() {


  const { bannerList, resources, recommendedPlayList, radarPlayList, scenePlayList, topicList, similarityRecommended, newAlbumNewSong, voicelistRcmd, showSkeleton, yuncunList, rankingList, getOneData, getData } = useHomePageData()



  return (
    <div className={classNames('flex flex-col  py-16 gap-24', style.pageHome)}>
      <Top />
      {
        showSkeleton ? <Skeleton /> : <PullToRefresh headHeight={50} onRefresh={() => getData({ refresh: true })}>
          <div className="flex flex-col gap-[24px]">
            <div className="px-[16px]">
              <HomeBanner list={bannerList} className={style.banner} />
            </div>
            <div className="px-[16px]">
              <Resources list={resources} />
            </div>
            {/* 推荐歌单 */}
            <div className=" flex flex-col gap-[16px]">
              <Card title={recommendedPlayList?.title!} list={recommendedPlayList?.list} />
            </div>
            <Divider className="!m-0" />
            {/* 猜你喜欢 */}
            <div className="flex flex-col gap-[16px]">
              <Card.List {...similarityRecommended} onRefresh={() => getOneData(true, EnumBlockCode.HOMEPAGE_BLOCK_STYLE_RCMD)} />
            </div>
            <Divider className="!m-0" />
            {/* 热门话题 */}
            <div className="flex flex-col gap-[16px]">
              <Card.Topic title={topicList?.title!} list={topicList?.list} />
            </div>
            <Divider className="!m-0" />
            {/* 雷达歌单 */}
            <div className="flex flex-col gap-[16px]">
              <Card title={radarPlayList?.title!} list={radarPlayList?.list} />
            </div>
            <Divider className="!m-0" />
            {/* 热门播客 */}
            <div className="flex flex-col gap-[16px]">
              <Card.List {...voicelistRcmd} />
              {/* <HotPodcast /> */}
            </div>
            <Divider className="!m-0" />
            {/* 场景歌单 */}
            <div className="flex flex-col gap-[16px]">
              <Card title={scenePlayList?.title!} list={scenePlayList.list} />
            </div>
            <Divider className="!m-0" />
            {/* 云村出品 */}
            <div className="flex flex-col gap-[16px]">
              <Card.YunCun {...yuncunList} />
            </div>
            <Divider className="!m-0" />
            {/* 新歌新碟 */}
            <div className="flex flex-col gap-[16px]">
              <Card.List {...newAlbumNewSong} />
            </div>
            <Divider className="!m-0" />
            {/* 排行榜 */}
            <div className="flex flex-col gap-[16px]">
              <Card.RankingList {...rankingList} />
            </div>

            {/* 精选音乐视频 */}
            <div className="flex flex-col gap-[16px]">
              <MusicVideo onRefresh={() => getOneData(true, EnumBlockCode.HOMEPAGE_MUSIC_MLOG)} />
            </div>
          </div>
        </PullToRefresh>
      }


    </div>
  )
}
