import { rgbDataURL } from "@/utils/rgbDataURL"
import Image, { ImageProps } from "next/image"
import { FC } from "react"

export const NextImage: FC<ImageProps> = (props) => {
  return (
    <Image
      fill
      placeholder="blur"
      sizes="auto"
      blurDataURL={rgbDataURL(235, 235, 235)}
      {...props}
    />
  )
}

export default NextImage
