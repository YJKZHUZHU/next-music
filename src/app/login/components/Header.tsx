import Image from "next/image"
import { FC } from "react"
import classnames from "classnames"

interface IProps {
  active?: boolean
}

const Header: FC<IProps> = (props) => {
  const { active = false } = props
  return (
    <div className="mt-[26px] flex flex-col items-center">
      <Image className="mb-[24px]" src="/login/logo@2x.png" width={80} height={80} alt="" />
      <p className={`text-[24px] text-[#121212] ${active ? "opacity-100" : "opacity-20"}`}>
        欢迎回来
      </p>
      <span className=" text-[16px] text-[#A6A6A6] mt-[7px]">登录您的账号</span>
    </div>
  )
}

// Header.defaultProps = {
//   active: false,
// }

export default Header
