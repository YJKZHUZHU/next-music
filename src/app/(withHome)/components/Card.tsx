'use client'
import { NextImage, Triangle } from "@/components"
import { attachPropertiesToComponent } from "@/utils/attachPropertiesToComponent"
import { randomNumber } from "@/utils/randomNumber"
import { rgbDataURL } from "@/utils/rgbDataURL"
import { tranNumber } from "@/utils/tranNumber"
import { Swiper } from "antd-mobile"
import rgbaster from "rgbaster"
import classNames from "classnames"
import Image from "next/image"
import { useEffect, useState } from "react"
import { PlayOutline, RightOutline } from 'antd-mobile-icons'
import useImgBg from "../hooks/useImgBg"


interface IResources {
  imageUrl: string
  playCount?: number
  resourceId?: string
  title: string
}
interface IDataItem {
  id: string
  imageUrl: string
  playCount: number,
  title: string
  showSwiper?: boolean // 是否轮播展示
  resources?: IResources[]
  // [props: string]: any
}

interface Props {
  title: string,
  list: Partial<IDataItem>[]
}

const bgArr = ['#D6DEE8', '#E3DCDB', '#DAD5E8', '#E2D8DB', '#DED7DA', '#DFDCDA']

interface ICardSwiperProps {
  source: IResources[]
}


interface HeaderProps {
  title: string
}
const Header = (props: HeaderProps) => {
  const { title } = props

  return <div className=" flex justify-between items-center gap-[12px] px-[16px]">
    <span className=" text-[18px] text-[#121212]  font-[500]">{title}</span>
    <span className=" text-[14px] text-[#FB233B] leading-[20px]">查看全部</span>
  </div>
}



const CardSwiper = (props: ICardSwiperProps) => {

  const { source } = props

  const [title, setTitle] = useState(source?.at(0)?.title)


  const swiperItems = (resources: IResources[]) => {
    console.log('resources', resources)
    return resources?.map((item) => (
      <Swiper.Item key={item.resourceId} className=" relative !h-[140px]">
        <NextImage className="rounded-[16px]" src={item.imageUrl} alt="" />
        {item?.playCount && (
          <div className="absolute right-[8px] top-[4px] flex items-center gap-[4px]">
            <Triangle />
            <span className="text-[#ffffff] text-[12px] font-[600]">
              {tranNumber(item?.playCount)}
            </span>
          </div>
        )}
      </Swiper.Item>
    ))
  }


  return (
    <div className="flex flex-col w-[140px] relative pt-[10px]">
      <div style={{ backgroundColor: bgArr[randomNumber(0, 5)] }} className=" absolute top-[3px] w-[85%] rounded-[16px] h-[20px] left-[10px] opacity-[0.5]"></div>
      <Swiper
        allowTouchMove={false}
        loop
        autoplay
        indicator={false}
        onIndexChange={(current) =>
          setTitle(source.at(current)?.title)
        }
        direction="vertical"
        className="!rounded-[16px] !h-[140px]">
        {swiperItems(source)}
      </Swiper>
      <div className="mt-[8px] text-[14px] leading-[18px] text-[#121212] line-clamp-2 animate-out fade-in">
        {title}
      </div>

    </div>
  )
}


const CardItem = (props: { imageUrl: string, className?: string }) => {
  const { imageUrl, className } = props

  const bg = useImgBg(imageUrl!)

  return <div style={{ backgroundColor: bg }} className={classNames(className, 'absolute top-[3px] w-[85%] rounded-[16px] h-[20px] left-[10px] opacity-[0.2]')}></div>

}

const Card = (props: Props) => {
  const { title, list } = props


  return (
    <>
      <Header title={title} />

      <div className="scrollbar-hide overflow-x-scroll  px-[16px] ">
        <div className="flex gap-[16px] w-max">
          {list?.map((item) => {
            if (item?.showSwiper) {
              return <CardSwiper source={item?.resources || []} key={item.id} />
            }
            return (
              <div key={item.id} className="flex flex-col w-[140px] relative pt-[10px] ">
                <CardItem imageUrl={item?.imageUrl!} className='!opacity-[0.1]' />
                <div className=" relative !h-[140px]">
                  <NextImage className="rounded-[16px]" src={item?.imageUrl!} alt="" />
                  {item?.playCount && (
                    <div className="absolute right-[8px] top-[4px] flex items-center gap-[4px]">
                      <Triangle />
                      <span className="text-[#ffffff] text-[12px] font-[600]">
                        {tranNumber(item?.playCount)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-[8px] text-[14px] leading-[18px] text-[#121212] line-clamp-2 animate-out fade-in">
                  {item.title}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

interface TopicProps {
  title: string,
  list: ITopicItem[]
}

interface ITopicItem {
  id: string
  titleImgUrl: string
  title: string
  subTitle: string
  nickname: string
  eventMsg: string
  imageUrl: string
}

const colorArr = [
  "linear-gradient(#6C948A, #81ABA1)",
  "linear-gradient(#7F7F7F, #979797)",
  "linear-gradient(#887475, #9D8E91)",
  "linear-gradient(#926775, #AB8291)",
  "linear-gradient(#94826A, #AA9A82)",
  "linear-gradient(#6C7394, #7E89A7)",
]

const Topic = (props: TopicProps) => {
  const { title, list } = props
  return (
    <>
      <Header title={title} />
      <div className="scrollbar-hide overflow-x-scroll  px-[16px]">
        <div className="flex gap-8  flex-nowrap w-[fit-content]">
          {list?.map((item) => {
            return (
              <div
                key={item.id}
                style={{ backgroundImage: colorArr[randomNumber(0, 5)] }}
                className="flex flex-col w-280 p-8 rounded-[16px] h-120">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-16 h-16 relative">
                    <NextImage src={item?.titleImgUrl} alt="" />
                  </div>
                  <span className=" text-white font-[600] ">{item?.title}</span>

                </div>
                <span className="text-10 text-white">{item?.subTitle}</span>
                <div className="flex justify-between items-center gap-12">
                  <div className=" line-clamp-2 flex-1 text-white">
                    <span className="font-[600]">{item?.nickname}:#</span>
                    <span>{item?.eventMsg}</span>
                  </div>
                  <div className="w-60 h-60 relative rounded-[8px]">
                    <NextImage className="rounded-[8px]" src={item?.imageUrl} alt="" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

interface IListItem {
  key: number | string,
  resources: {
    id: string | number
    imageUrl: string
    title: string
    titleType: string
    subTitle:
    string
    artists: string
    showPlayIcon: boolean
  }[]

}

interface ListProps {
  showRefresh: boolean
  onRefresh?: () => void
  loading: boolean,
  list: IListItem[],
  title: string
  buttonText?: string
}

const List = (props: ListProps) => {
  const { onRefresh, loading, showRefresh = false, list, title, buttonText } = props


  const renderTop = () => {
    return (
      <div className=" flex justify-between items-center gap-[12px] px-[16px]">
        <div onClick={onRefresh} className="flex items-center gap-[4px]">
          <Image
            priority
            className={classNames({ ["animate-spin"]: loading })}
            src="/home/reload.png"
            width={18}
            height={18}
            alt=""
          />
          <span className="text-[18px] text-[#121212] font-[500] line-clamp-1">{title}</span>
        </div>
        <div className="flex-1 ml-8">
          <div className="flex items-center gap-2 bg-[#E6E8EC] rounded-[24px] px-12 py-2 w-[max-content] ">
            <Triangle color="#2E3348" size={5} />
            <span className="text-[#313849] text-14">{buttonText || "播放"}</span>
          </div>
        </div>
      </div>
    )

  }

  return (
    <>
      {
        showRefresh ? renderTop() : <Header title={title} />
      }

      <div className="scrollbar-hide overflow-x-scroll  px-[16px]">
        <div className="flex gap-8   flex-nowrap">
          {list.map((item) => {
            return (
              <div key={item.key} className="w-[320px]  flex flex-col gap-8">
                {item.resources.map((d) => {
                  return (
                    <div className="w-[320px] flex gap-8" key={d.id}>
                      <div className="w-[80px] h-[80px] rounded-[8px] relative">
                        <NextImage src={d?.imageUrl} alt="" className="rounded-[8px]" />
                      </div>

                      <div className="flex-1 flex flex-col gap-4 mr-8 justify-center">
                        <span className="line-clamp-1 font-[600] text-[#343648]">{d?.title}</span>
                        <div className="flex items-center gap-[4px]">
                          {
                            d?.subTitle && <span className=" text-10 bg-[#EED4D6] text-[#E13736] opacity-[0.8] rounded-[6px] px-4">
                              {d?.subTitle}
                            </span>
                          }

                          <span className=" flex-1 line-clamp-1 text-12">{d?.artists}</span>
                        </div>
                      </div>
                      {d?.showPlayIcon && (
                        <Image
                          className="self-center mr-8"
                          src="/home/play.png"
                          width={16}
                          height={16}
                          alt=""
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}


interface YunCunProps {
  title: string,
  list: {
    id: string
    imgUrl: string
    title: string
  }[]
}


const YunCunCardItem = (props: { imgUrl: string, title: string }) => {
  const { imgUrl, title } = props

  const bg = useImgBg(imgUrl)

  return <div className="w-[260px] relative  flex flex-col gap-8 rounded-[8px]">
    <NextImage src={imgUrl} alt="" className="rounded-[8px]" />
    <div style={{ backgroundColor: bg }} className=" line-clamp-1 rounded-b-[8px] w-full px-[8px] flex items-center absolute bottom-0 h-[30px] text-[#ffffff] text-[14px]">{title}</div>
  </div>
}

const YunCun = (props: YunCunProps) => {
  const { title, list } = props
  return <>
    <Header title={title} />
    <div className="scrollbar-hide overflow-x-scroll  px-[16px]">
      <div className="flex gap-8 h-[120px] flex-nowrap w-max">
        {list.map((item) => {
          return (
            <YunCunCardItem key={item.id} imgUrl={item.imgUrl} title={item.title} />
          )
        })}
      </div>
    </div>
  </>

}

interface RankingListProps {
  title: string,
  list: {
    id: string,
    title: string,
    list: {
      id: string
      title: string
      tag: string
      tagColor: string
      imgUrl: string
      artists: any[]
      tarUrl: string
    }[]
  }[]
}

const RankingImg = (props: { list: string[] }) => {
  const { list } = props
  const [one, two, three] = list
  return <div className="w-[80px] h-full  relative">
    <Image src={one} width={62} height={62} alt="" className=" absolute rounded-[8px] bottom-0 z-20" />
    <Image src={two} width={45} height={45} alt="" className=" absolute rounded-[8px] bottom-0 right-[7px] z-10" />
    <Image src={three} width={35} height={35} alt="" className=" absolute rounded-[8px] right-0 bottom-0" />
    <Image src="/home/play.svg" width={24} height={24} alt="" className=" absolute z-30 right-[25px] bottom-[5px]" />
  </div>
}

const RankingList = (props: RankingListProps) => {
  const { title, list } = props

  return <>
    <Header title={title} />
    <div className="scrollbar-hide overflow-x-scroll  px-[16px]">
      <div className="flex gap-8 h-[120px] flex-nowrap w-max">
        {list.map((item) => {
          return (
            <div key={item.id} className="flex w-[340px] flex-col bg-[#ffffff] rounded-[16px] p-[16px] gap-[8px]">
              <div className="flex items-center">
                <span className="text-[#3F4454] text-[14px] font-[600]">{item.title}</span>
                <RightOutline className="text-[10px] text-[#3F4454] font-[600]" />
              </div>
              <div className="flex gap-[8px] flex-1">
                <RankingImg list={item?.list?.map(item => item?.imgUrl)} />

                <div className="flex flex-col flex-1 gap-[4px] justify-between">
                  {
                    item?.list?.map((d, index) => {
                      return <div key={d.id} className="flex items-center">
                        <span className="text-[#3F404E] font-[500] text-[12px] w-[10px]">{index + 1}</span>

                        <div className="flex-1 flex items-center">
                          <span className="text-[#3F404E] font-[500] text-[12px] pl-[8px]  line-clamp-1">{d.title}</span>

                          {
                            d.artists && d.artists?.length !== 0 && <>
                              <span className="text-[#696771] text-[12px] px-[4px]">-</span>
                              <span className="text-[#696771] text-[12px] max-w-[80px] line-clamp-1 ">{d.artists?.map(d => d.name)?.join(` / `)}</span>
                            </>
                          }

                        </div>

                        {
                          d?.tarUrl ? <div className="w-[30px] flex items-center justify-end gap-[2px]">
                            <Image src={d.tarUrl} width={12} height={12} alt="" />
                            <span style={{ color: d?.tagColor }} className="text-[12px] font-[400]">{d.tag}</span>
                          </div> : <span style={{ color: d?.tagColor }} className="w-[30px] text-[12px] font-[600] text-right">{d.tag}</span>
                        }


                      </div>
                    })
                  }
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  </>
}



export default attachPropertiesToComponent(Card, { Topic, List, YunCun, RankingList })