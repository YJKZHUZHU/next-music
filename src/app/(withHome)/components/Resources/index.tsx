"use client"
import { useResources } from "@/store/homePage"
import React, { useMemo } from "react"
import { Image } from "antd-mobile"
import dayjs from "dayjs"
import Skeleton from "react-loading-skeleton"
const skeletonArr = [...new Array(5).keys()]

const Empty = () => {
  return (
    <>
      {skeletonArr.map((d) => {
        return (
          <div key={d} className="w-65  flex flex-col gap-8">
            <Skeleton className="w-65 h-65" />
            <Skeleton className="h-[14px]" count={1} />
          </div>
        )
      })}
    </>
  )
}

function Resources() {
  const resources = useResources()
  console.log("resources", resources)
  const list = useMemo(() => {
    return resources.map((item) => {
      return {
        image: item?.uiElement.image?.imageUrl2 || "",
        title: item?.uiElement?.mainTitle?.title,
        showtoday: item?.action === "orpheus://songrcmd",
        resourceId: item?.resourceId,
      }
    })
  }, [resources])
  console.log("=--list=", list)
  return (
    <div className=" flex gap-8 scrollbar-hide overflow-x-scroll">
      {list.length === 0 ? (
        <Empty />
      ) : (
        list?.map((item) => {
          return (
            <div className=" flex flex-col items-center" key={item.resourceId}>
              {item.showtoday ? (
                <div className=" relative">
                  <span className=" absolute text-16 text-white top-[25px] left-[23px] font-[600]">
                    {dayjs().date()}
                  </span>
                  <Image lazy src={item.image} width={65} height={65} alt="" />
                </div>
              ) : (
                <Image lazy src={item.image} width={65} height={65} alt="" />
              )}

              <span className="text-14 text-[#61646F]">{item.title}</span>
            </div>
          )
        })
      )}
    </div>
  )
}

export default Resources
