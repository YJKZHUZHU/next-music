import { service } from "./index"

export const banner = () => {
  return service.get("/search?keywords=海阔天空")
  // return service.get("/search")
}
