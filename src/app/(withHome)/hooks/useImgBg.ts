import { useEffect, useState } from "react"
import rgbaster from "rgbaster"

const useImgBg = (src: string, scale: number = 0.1, defaultBg: string = "#A2A7AF") => {
  const [bg, setBg] = useState(defaultBg)

  const getBg = async () => {
    try {
      const res = await rgbaster(src, {
        scale: scale,
        ignore: ["rgb(255,255,255)", "rgb(0,0,0)", "rgb(252, 253, 245)", "rgb(253, 253, 253)"],
      })
      setBg(res[0]?.color)
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    src && getBg()
  }, [src])

  return bg
}

export default useImgBg
