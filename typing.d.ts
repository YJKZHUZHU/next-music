declare module "amfe-flexible"

declare module "rgbaster" {
  export default async function (
    src: string,
    opts?: {
      ignore?: string[] // 忽略的颜色数组
      scale?: number // 缩放比例，范围在0到1之间
    }
  ): Promise<
    {
      color: string
      count: number
    }[]
  >
}
