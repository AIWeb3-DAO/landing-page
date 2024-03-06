'use client'
import React from 'react'
import {motion} from 'framer-motion'


type Props = {
    intro? : string
    title_1?: string
    title_2 ? : any
   
 }
export default function About({intro, title_2, title_1} : Props) {
  return (
    <div className='flex flex-col items-center justify-center'>
          
          <motion.div
          initial={{y: 400}}
          animate ={{
            y : -20
          }}
          transition={{
            duration : 2
          }}
           className='flex items-center justify-center flex-col'
         >
          <h1 className=' text-xl text-center my-3'>{intro}</h1>
            <h1 className='text-5xl text-center font-extrabold whitespace-pre-line'  >{title_1}</h1>
             <div className='w-[3px] bg-gray-400 h-[170px] my-4 rounded-lg'></div>
             <h1 className='text-5xl text-center font-extrabold whitespace-pre-line'>{title_2}
</h1>
        </motion.div>
    </div>
  )
}


{/* <h1 className='text-5xl text-center font-extrabold'>DEVELOPER OWNED & <br /> GOVERNED COMMUNITY</h1>
             <div className='w-[3px] bg-gray-400 h-[170px] my-4 rounded-lg'></div>
<h1 className='text-5xl text-center font-extrabold'>LEARNING & BUILDING <br />  FOR WEB3*/}