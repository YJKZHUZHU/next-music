import { encode } from "blurhash"

const loadImage = async (src: string) =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = (...args) => reject(args)
    img.src = src
  })

function imageToBase64(image: any) {
  let canvas = document.createElement("canvas")
  let width = image.width
  let height = image.height

  canvas.width = width
  canvas.height = height
  let context = canvas.getContext("2d")!
  context.drawImage(image, 0, 0, width, height)
  return context.getImageData(0, 0, image.width, image.height)
  // return canvas.toDataURL("image/png")
}

function urlToBase64(url: string, callback: (data: any) => void) {
  let image = new Image()

  image.setAttribute("crossOrigin", "Anonymous")
  image.src = url + "?v=" + Math.random()

  image.onload = function () {
    let dataURL = imageToBase64(image)
    if (callback) {
      callback(dataURL)
    }
  }
}

function urlToBase64Async(url: string) {
  return new Promise((resolve, reject) => {
    urlToBase64(url, (data) => {
      resolve(data)
    })
  })
}

const getImageData = (src: string) => {
  const image = new Image()
  image.setAttribute("crossOrigin", "anonymous")
  image.src = src
  const canvas = document.createElement("canvas")

  image.onload = () => {
    const canvas = document.createElement("canvas")
    canvas.width = image.width
    canvas.height = image.height
    const context = canvas.getContext("2d")
    context!.drawImage(image, 0, 0, image.width, image.height)
    const quality = 0.8
    //这里的dataurl就是base64类型
    const dataURL = canvas.toDataURL("image/jpeg", quality) //使用toDataUrl将图片转换成jpeg的格式,不要把图片压缩成png，因为压缩成png后base64的字符串可能比不转换前的长！
    return dataURL
  }

  // canvas.width = image.width
  // canvas.height = image.height
  // const context: CanvasRenderingContext2D = canvas.getContext("2d")!
  // context.drawImage(image, 0, 0)
  // return context.getImageData(0, 0, image.width, image.height)
}

export const encodeImageToBlurhash = async (imageUrl: string) => {
  // const image = await loadImage(imageUrl)
  const imageData: any = await urlToBase64Async(imageUrl)
  console.log("urlToBase64Async", imageData)
  // return imageData
  return encode(imageData.data, imageData.width, imageData.height, 4, 4)
}
