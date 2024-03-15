"use client"
import React, { FC } from "react"
import { Image, ImageProps } from "antd-mobile"
import Skeleton, { SkeletonProps } from "react-loading-skeleton"

interface Props {
  imageProps?: ImageProps
  skeletonProps?: SkeletonProps
}

const SkeletonImage: FC<Props> = (props) => {
  const { imageProps, skeletonProps } = props
  return (
    <Image
      fallback={<Skeleton height={80} {...skeletonProps} />}
      placeholder={<Skeleton height={80} {...skeletonProps} />}
      width={80}
      height={80}
      alt=""
      {...imageProps}
    />
  )
}

export default SkeletonImage
