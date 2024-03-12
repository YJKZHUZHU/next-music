import React, { FC, useMemo } from "react"
import classNames from "classnames"

type PositionType = "Left" | "Right" | "Bottom" | "Top"
interface Props {
  // className: React.ClassAttributes<HTMLElement>
  className?: string
  size?: number
  color?: string
  position?: PositionType
}

const MapPostionStyle = new Map<PositionType, (color: string) => React.CSSProperties>()
  .set("Top", (color: string) => ({
    borderBottomColor: color,
  }))
  .set("Bottom", (color: string) => ({
    borderTopColor: color,
  }))
  .set("Left", (color: string) => ({
    borderRightColor: color,
  }))
  .set("Right", (color: string) => ({
    borderLeftColor: color,
  }))
const Triangle: FC<Props> = (props) => {
  const { className, size = 6, color = "#ffffff", position = "Right" } = props

  return (
    <div
      style={{
        borderWidth: `${size / 37.5}rem`,
        [`border${position}Width`]: 0,
        ...MapPostionStyle.get(position)!(color),
      }}
      className={classNames(className, "w-0", "h-0", "border-solid", "border-[transparent]")}></div>
  )
}

export default Triangle
