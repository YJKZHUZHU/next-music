import React, { FC } from "react"
import { useSimilarityRecommended, useLoading } from "@/store/homePage"
import Image from "next/image"
import { Triangle } from "@/components"
import classNames from "classnames"

interface Props {
  onRefresh: () => void
}

const SimilarityRecommended: FC<Props> = (props) => {
  const { onRefresh } = props
  const loading = useLoading()
  const { list, title, button } = useSimilarityRecommended()
  console.log("--list--", list)
  return (
    <>
      <div className="flex  items-center  px-[24px]">
        <div onClick={onRefresh} className="flex items-center gap-[4px]">
          <Image
            className={classNames({ [" animate-spin"]: loading })}
            src="/home/reload.png"
            width={18}
            height={18}
            priority
            alt=""
          />
          <span className="text-[18px] text-[#121212] leading-[16px] font-[500] line-clamp-1">
            {title}
          </span>
        </div>
        <div className="flex-1 ml-8">
          <div className="flex items-center gap-2 bg-[#E6E8EC] rounded-[24px] px-12 py-2 w-[max-content] ">
            <Triangle color="#2E3348" size={5} />
            <span className="text-[#313849] text-14">{button?.text}</span>
          </div>
        </div>
      </div>
      <div className="scrollbar-hide overflow-x-scroll  px-[24px]">
        <div className="w-[1000px] flex gap-8   flex-nowrap">
          {list.map((item, index) => {
            return (
              <div key={index} className="w-320  flex flex-col gap-8">
                {item.resources.map((d) => {
                  return (
                    <div className="w-320 flex gap-8" key={d.resourceId}>
                      <Image
                        className=" rounded-[8px]"
                        src={d.uiElement?.image?.imageUrl}
                        width={80}
                        height={80}
                        alt=""
                      />
                      <div className="flex-1 flex flex-col gap-4">
                        <span>{d?.uiElement?.mainTitle?.title}</span>
                        <div>
                          <span>{d?.uiElement?.subTitle?.title}</span>
                          <span>{d?.resourceExtInfo?.artists?.map((s: any) => s.name)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-[#E6E8EC] rounded-[24px] px-12 py-2 self-center ">
                        <Triangle color="#2E3348" size={5} />
                        <span className="text-[#313849] text-14">{button?.text}</span>
                      </div>
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

export default SimilarityRecommended
