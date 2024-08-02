
"use client"
import React from 'react'
import Slider from 'react-infinite-logo-slider'
import { ecosystems } from '@/constants'
export default function TrustedBy() {
  return (
    <div className='my-4'>
          <h1 className={`  text-lg md:text-4xl text-gray-200 font-semibold text-start my-6`}>Trusted by Leading Parachains</h1>
           <div className='my-6 w-full max-w-[96vw] sm:max-w-[96vw] md:max-w-[96vw] xl:max-w-7xl mx-auto overflow-hidden'>
           <Slider
            width="250px"
            duration={40}
            pauseOnHover={true}
            blurBorders={false}
            blurBoderColor={'#fff'}
            
        >
          
    {ecosystems.map((item, i ) => (
      <div key={i}>
       <Slider.Slide >
         <div className='border py-2 px-4 rounded-3xl border-gray-500 '><p className='font-semibold text-gray-400 text-xl capitalize'>{item.name} </p></div>
       </Slider.Slide>
       </div>
    ))}
           
        </Slider>
           </div>
    </div>
  )
}
