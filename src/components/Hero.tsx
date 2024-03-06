'use client'

import Image from 'next/image';
import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import {motion} from 'framer-motion'
import { Poppins } from 'next/font/google';
import { CiStar } from "react-icons/ci";
import {useTranslations} from 'next-intl';
import NextIntlClientProvider from 'next-intl';

 type Props = {
    title? : string
    subtitle?: string
    joinBtn ? : any
    partenerBtn ? : any
 }
export default function Hero({title, subtitle, joinBtn, partenerBtn} : Props) {
  return (

    <div className='min-h-[60vh]   flex items-center justify-center'>
         <motion.div
          initial={{y: 400}}
          animate ={{
            y : -20
          }}
          transition={{
            duration : 2
          }}
         >
            <div className='xs:min-h[30vh] md:min-h-[40vh] flex flex-col items-center justify-center'>
       {/*} <h1 className='xs:text-4xl xs:leading-snug sm:text-5xl sm:leading-snug md:text-6xl md:leading-snug lg:text-7xl lg:leading-snug text-center font-extrabold text-gray-300'>
            A video sharing platform < br />
             Empowering    

             <TypeAnimation
               sequence={[
                 "Creators",
                 2000,
                 "Users",
                 2000
               ]}
               wrapper='span'
               repeat={Infinity}
               className='ml-3 text-rose-500'
             />
        </h1>*/}
         <h1 className={`text-7xl font-extrabold my-6`}>{title}</h1>
         <p className='font-semibold text-lg text-gray-400'>{subtitle}</p>
           <div className='mt-8 '>
                <div className='flex items-center space-x-5'>
                     <motion.div 
                     className='flex gap-2 items-center bg-white text-gray-700 py-2.5 px-3.5 rounded-xl cursor-pointer '
                     
                     >
                     <CiStar className='w-5 h-5' />
                      <p className='font-semibold'>{joinBtn}</p>
                     </motion.div>
                     <motion.div className='flex gap-2 items-center border border-gray-400 text-gray-300 py-2.5 px-3.5 rounded-xl cursor-pointer '>
                     <CiStar className='w-5 h-5' />
                      <p className='font-semibold'>{partenerBtn}</p>
                     </motion.div>
                </div>
           </div>
        </div>
      {/*}  <div className='mt-5 px-4'>
             <Image
    src={`https://pbs.twimg.com/profile_images/1637269369658171392/CHS2SlUh_400x400.jpg`}
  width={1200}
  height={800}
  alt='zenvid'
  className=''
  loading='lazy'
/>
            </div>*/}
        </motion.div>
        </div>
   
  )
}
