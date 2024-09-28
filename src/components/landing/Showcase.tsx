import React from 'react'
import { InfiniteSliderHoverSpeed } from "./HorizontalSlider";

function Showcase() {
  return (
    <div className="w-full py-16 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl md:text-4xl tracking-tighter max-w-xl text-center font-regular">
            Summarize YouTube videos in seconds
          </h2>
          <p className="text-lg md:text-xl text-gray-600 lg:max-w-2xl">
            Join thousands of users who save time by quickly extracting key insights from their favorite videos
          </p>
          <div className="w-full mt-5 flex justify-center mx-auto md:w-2/3">
            <InfiniteSliderHoverSpeed />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Showcase


{/* <h2 className="text-xl md:text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
            Trusted by thousands of businesses worldwide
          </h2> */}