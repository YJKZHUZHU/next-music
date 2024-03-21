
import { rgbDataURL } from "@/utils/rgbDataURL"
import Image, { ImageProps } from "next/image"
import { FC } from "react"

export const NextImage: FC<ImageProps> = (props = {
  src: rgbDataURL(235, 235, 235),
  blurDataURL: rgbDataURL(235, 235, 1),
  placeholder: "blur",
  fill: true,
  alt: "",
}) => {

  return <Image   {...props} fill placeholder="blur" blurDataURL={rgbDataURL(235, 235, 235)} />
}


export default NextImage