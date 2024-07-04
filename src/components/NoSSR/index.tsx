import dynamic from "next/dynamic"
import React, { FC } from "react"

interface Props {
  [key: string]: unknown
}

const NoSSR: FC<Props> = (props) => {
  const { children } = props
  return <>{children}</>
}

export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
})
