'use client'
import React from 'react'
import {motion} from 'framer-motion'
import Image from 'next/image'
import { parteners } from '@/constant'

type Props = {
    title? : string
    subtitle?: string
  
   
 }
export default function Parteners({title, subtitle} : Props) {
  return (
    <motion.div
    initial={{y: 2}}
    animate ={{
      y : -2
    }}
    transition={{
      duration : 2
    }}
     className='flex items-center justify-center flex-col  h-screen'
   >
    <h1 className=' text-3xl md:text-5xl text-center my-5 font-bold'>{title}</h1>
<p className=' text-lg md:text-xl font-semibold text-gray-300 text-center my-7 whitespace-pre-line'>{subtitle}</p>
<div className='grid  grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 md:grid-cols-4 gap-3     w-full  space-x-6 p-3 '>
  

     {
      parteners.map((item, i) => (
         <div key={i} className='flex items-center justify-center flex-col border border-gray-700 rounded-md p-2 cursor-pointer'>
         <Image      
       src={item.logo}
      height={230}
      width={230}
      alt='image'
      className='max-w-20  w-[60px] h-[60px] rounded-full  mb-4'
     />
    <h1 className='font-bold text-xl'>{item.name}</h1>
     <h2 className='text-gray-400 uppercase text-sm'>{item.contest}</h2>
         </div> 
      ))
     }
     
   </div>
  </motion.div>
  )
}
