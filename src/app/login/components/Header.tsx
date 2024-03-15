import Image from "next/image"
import { FC } from "react"

interface IProps {
  active?: boolean
  title?: string
  subTitle?: string
}

const Header: FC<IProps> = (props) => {
  const { active = false, title = "欢迎回来", subTitle = "登录您的邮箱账号" } = props
  return (
    <div className="mt-[26px] flex flex-col items-center">
      <Image className="mb-[24px]" src="/login/logo@2x.png" width={80} height={80} alt="" />
      <p className={`text-[24px] text-[#121212] ${active ? "opacity-100" : "opacity-20"}`}>
        {title}
      </p>
      <span className=" text-[16px] text-[#A6A6A6] mt-[7px]">{subTitle}</span>
    </div>
  )
}

// Header.defaultProps = {
//   active: false,
// }

export default Header
