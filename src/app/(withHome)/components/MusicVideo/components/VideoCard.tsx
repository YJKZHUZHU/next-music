"use client"
import useElementVisible from "@/hooks/useElementVisible"
import { rgbDataURL } from "@/utils/rgbDataURL"
import BackgroundVideo from "next-video/background-video"
import { Triangle, XgPlayer } from "@/components"
import { useEffect, useMemo, useRef, useState } from "react"
import style from "../index.module.scss"
import { IPlayerOptions } from "xgplayer"
import { rem } from "@/utils/rem"
import { MlogDetail } from "@/store/homePage"
import { getMlogUrl, getMvUrl } from "@/api/url"
import classNames from "classnames"
import { tranNumber } from "@/utils/tranNumber"

interface Props {
  item: MlogDetail
}

const commomConfig: IPlayerOptions = {
  width: rem(125),
  height: rem(165),
  useHls: true, //移动端支持
  cors: true,
  // autoplay: true,
  videoFillMode: "fill",
  // fluid: true,
  loop: true,
  ignores: [
    "loading",
    "replay",
    "volume",
    "progress",
    "progresspreview",
    "mobile",
    "start",
    "time",
    "playbackrate",
    "pip",
    "play",
    "controls",
    "danmu",
    "cssfullscreen",
    "definition",
    "enter",
    "fullscreen",
    "miniscreen",
  ],
}

const VideoCard = (props: Props) => {
  const [isVisible, ref] = useElementVisible()
  const { item } = props

  const [url, setUrl] = useState("")

  const isMv = Number(item.mlogBaseDataType) === 3

  const getUrlByMlog = async () => {
    try {
      const res = await getMlogUrl({ id: item.id })
      console.log("res--", item, res)
      setUrl(res.data?.resource?.content?.video?.urlInfo?.url)
    } catch (error) {
      console.log("error", error)
    }
  }

  const getUrlByMv = async () => {
    try {
      const res = await getMvUrl({ id: item.id })
      setUrl(res.data.url)
      console.log("res--", item, res)
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    console.log("ref--", ref.current)
    isMv ? getUrlByMv() : getUrlByMlog()
  }, [])

  const config = useMemo<IPlayerOptions>(() => {
    return {
      url,
      poster: `${item.resource?.mlogBaseData?.coverUrl}?param=125y140`,
      autoplay: true,
      ...commomConfig,
    }
  }, [url, item])

  return (
    <div className=" relative rounded-[10px] w-[125px] h-[165px]">
      <XgPlayer
        playerInit={(a) => {
          console.log("aa", a)
          // a.play()
        }}
        className={classNames(style.xgPlayer, "rounded-[10px]")}
        videoType="mp4"
        config={config}></XgPlayer>
      {isMv ? (
        <div className=" flex flex-col bottom-0 absolute text-[#ffffff] px-[5px] pb-[7px] text-[14px]">
          <div className=" w-max px-[4px] text-[12px] rounded-[4px] bg-[#7A635B] text-[#ffffff]">
            {item.reason}
          </div>
          <div className=" line-clamp-1"> {item?.resource?.mlogBaseData?.desc}</div>
        </div>
      ) : (
        <div className=" bottom-0 absolute text-[#ffffff] line-clamp-2 px-[5px] pb-[7px] text-[14px] break-all">
          {item?.resource?.mlogBaseData?.originalTitle}
        </div>
      )}

      {item?.resource?.mlogExtVO?.playCount && (
        <div className="absolute right-[8px] top-[4px] flex items-center gap-[4px]">
          <Triangle />
          <span className="text-[#ffffff] text-[12px] font-[600]">
            {tranNumber(item?.resource?.mlogExtVO?.playCount)}
          </span>
        </div>
      )}
    </div>
  )
  return (
    <BackgroundVideo
      disableTracking
      // paused={!isVisible}
      ref={ref}
      // loop
      autoPlay
      // style={{ width: 125, height: 175 }}
      width={125}
      height={200}
      className={style.videoCard}
      blurDataURL={rgbDataURL(235, 235, 235)}
      poster="http://p5.music.126.net/obj/w5nDkMOCwrDCmDDDi8Om/11278106162/b605/f986/d385/MUSIC8a99ace373397d4c81e56ac14f3e4504.jpg?param=100y100"
      src="http://vodkgeyttp8.vod.126.net/cloudmusic/obj/wovChMODwrLCnGzCncOh/13102431852/0835/d2c9/b3ed/43e34b487b723f6c7436c05418cad09c.mp4?wsSecret=5d31d3fe01e142130b88db2d9db233ed&wsTime=1718180095">
      <span className="text-[#ffffff]">{isVisible ? 1 : 0}</span>
    </BackgroundVideo>
  )
}

export default VideoCard
