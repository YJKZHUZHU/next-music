import { attachPropertiesToComponent } from "@/utils/attachPropertiesToComponent"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

const HomeSkeleton = () => {
  // baseColor="#202020" highlightColor="#444"
  return <SkeletonTheme>
    <div className="flex flex-col  gap-[24px]">
      <div className="px-[16px]">
        <Skeleton borderRadius={10} className=" w-full h-[160px]" />
      </div>
      <div className="px-[16px]">
        <div className="flex gap-8 scrollbar-hide overflow-hidden">
          {
            [1, 2, 3, 4, 5, 6, 7].map(item => {
              return <Skeleton key={item} className="relative w-[65px] h-[65px]" />
            })
          }
        </div>
      </div>

      <div className="flex flex-col gap-[16px] overflow-hidden">
        <div className="px-[16px]">
          <Skeleton borderRadius={10} className=" w-[60%] h-[27px]" />
        </div>

        <div className="scrollbar-hide overflow-hidden flex gap-[16px] w-max pl-[16px] ">
          {
            [1, 2, 3, 4].map(item => {
              return <div key={item} className="flex flex-col w-[140px] relative pt-[10px] ">
                <Skeleton borderRadius={16} className=" w-full h-[140px]" />
                <div className="flex flex-col gap-[6px]">
                  <Skeleton className=" mt-[8px] w-full h-[15px]" />
                  <Skeleton className=" mt-[8px] w-full h-[15px]" />
                </div>
              </div>
            })
          }
        </div>
      </div>

      <div className="flex flex-col gap-[16px]">
        <div className="px-[16px]">
          <Skeleton borderRadius={10} className=" w-[60%] h-[27px]" />
        </div>
        <div className=" flex flex-col gap-[8px] overflow-hidden pl-[16px]  ">
          {
            [1, 2, 3].map(item => {
              return <div key={item} className="flex scrollbar-hide overflow-hidden  w-max">
                {
                  [1, 2].map(d => {
                    return <div className="w-[320px] flex gap-8" key={d}>
                      <Skeleton borderRadius={8} className=" w-[80px] h-[80px]" />
                      <div className="flex-1 flex flex-col gap-4 mr-8 justify-center">
                        <Skeleton borderRadius={8} className=" w-[80%] h-[20px]" />
                        <Skeleton borderRadius={8} className=" w-[60%] h-[20px]" />
                      </div>

                    </div>
                  })
                }
              </div>
            })
          }
        </div>
      </div>

      <div className="flex flex-col gap-[16px] overflow-hidden">
        <div className="px-[16px]">
          <Skeleton borderRadius={10} className=" w-[60%] h-[27px]" />
        </div>

        <div className="scrollbar-hide overflow-hidden flex gap-[8px] w-max pl-[16px] ">
          {
            [1, 2, 3].map(item => {
              return <div key={item} className="flex flex-col w-[280px] h-[120px] relative rounded-[16px] ">
                <Skeleton borderRadius={16} className=" w-[280px] h-[120px]" />
              </div>
            })
          }
        </div>
      </div>

    </div>
  </SkeletonTheme>
}

export default attachPropertiesToComponent(HomeSkeleton, {})
