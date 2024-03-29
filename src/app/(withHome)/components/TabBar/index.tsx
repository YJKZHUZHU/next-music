"use client"
import { Badge, TabBar } from "antd-mobile"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useRouter } from "next-nprogress-bar"
import { useState } from "react"

enum EnumTab {
  home = "home",
  collection = "collection",
  my = "my",
  search = "search",
}
function HomeTabBar() {
  const pathName = usePathname()
  console.log("pathName", pathName)
  const router = useRouter()
  const [activeKey, setActiveKey] = useState(pathName.replace("/", "") || EnumTab.home)
  const randerIcon = (active: boolean, name: EnumTab) => {
    const path = `/home/tabBar/${name}@2x.png`
    const activePath = `/home/tabBar/${name}_active@2x.png`
    return (
      <>
        <Image
          className={active ? "hidden" : "inline-block"}
          src={path}
          width={24}
          height={24}
          alt={name}
          priority
        />
        <Image
          className={!active ? "hidden" : "inline-block"}
          src={activePath}
          width={24}
          height={24}
          alt={name}
          priority
        />
      </>
    )
  }
  const renderText = (active: boolean, title: string) => {
    return (
      <span className={`font-[12px] ${active ? "text-[#FB233B]" : "text-[#A6A6A6]"}  line-[16px]`}>
        {title}
      </span>
    )
  }
  const tabs = [
    {
      key: EnumTab.home,
      title: (active: boolean) => renderText(active, "发现"),
      icon: (active: boolean) => randerIcon(active, EnumTab.home),
      badge: Badge.dot,
    },
    {
      key: EnumTab.search,
      title: (active: boolean) => renderText(active, "搜索"),
      icon: (active: boolean) => randerIcon(active, EnumTab.search),
      badge: Badge.dot,
    },
    {
      key: EnumTab.collection,
      title: (active: boolean) => renderText(active, "收藏"),
      icon: (active: boolean) => randerIcon(active, EnumTab.collection),
      badge: Badge.dot,
    },
    {
      key: EnumTab.my,
      title: (active: boolean) => renderText(active, "我的"),
      icon: (active: boolean) => randerIcon(active, EnumTab.my),
      badge: Badge.dot,
    },
  ]

  const onChange = (key: string) => {
    try {
      console.log("key--", key)
      setActiveKey(key as EnumTab)
      router.push(key === EnumTab.home ? "/" : `/${key}`)
    } catch (error) {
      console.log("error", error)
    }
  }
  return (
    <TabBar
      className="border-[#F5F5F5] border-t-[1px] border-t-solid box-border"
      activeKey={activeKey}
      safeArea
      onChange={onChange}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  )
}

export default HomeTabBar
