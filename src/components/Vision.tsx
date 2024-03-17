'use client'
import React from 'react'
import {motion} from 'framer-motion'


type Props = {
    title? : string
    subtitle?: string
  
   
 }
export default function Vision({title, subtitle} : Props) {
  return (
  
         <motion.div
          initial={{y: 4000}}
          animate ={{
            y : -20
          }}
          transition={{
            duration : 2
          }}
           className='flex items-center justify-center flex-col h-[80vh]'
         >
          <h1 className=' text-3xl md:text-5xl text-center my-5 font-bold'>{title}</h1>
      <p className='text-lg md:text-xl font-semibold text-gray-400 whitespace-pre-line text-center'>{subtitle}</p>
        </motion.div>
   
  )
}
