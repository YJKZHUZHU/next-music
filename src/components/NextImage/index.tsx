
import { rgbDataURL } from "@/utils/rgbDataURL"
import Image, { ImageProps } from "next/image"
import { FC } from "react"

export const NextImage: FC<ImageProps> = (props = {
  src: rgbDataURL(235, 235, 235),
  blurDataURL: rgbDataURL(235, 235, 235),
  placeholder: "blur",
  fill: true,
  alt: ""
}) => {

  return <Image fill  {...props} />
}


export default NextImage