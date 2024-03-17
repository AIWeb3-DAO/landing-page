import { IPFS_GATEWAY } from '@/constant'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {motion} from 'framer-motion'
import { openLinkInNewTab } from '@/lib/utils'

export default function BlogCard(blog: any) {
    console.log("individual blog," , blog)
  return (
    <div className='flex items-center'>
        {
       blog?.blog.image &&
       
    <div  className='border border-zinc-700 w-full sm:w-[270px]  cursor-pointer  lg:w-[300px]  lg:h-[340px]  rounded-xl overflow-hidden hover:bg-zinc-900 my-3 flex items-center flex-col justify-center px-2 py-1'
      onClick={() => openLinkInNewTab(`https://grillapp.net/10900/${blog?.blog?.id}`)}
    >
        {

  <motion.img
  src={`${IPFS_GATEWAY}${blog?.blog.image}`} height={400}  width={400} alt='cover'
  className='  h-[270px] sm:h-[200px] md:h-[200px] object-cover rounded-t-xl'
  whileHover={
    {
      scale : 1.1,
      transition :{
        duration : 0.7
      }
    }
  }
  >

  </motion.img>

        }
       
       <div className='flex flex-col gap-3'>
       <h1 className='font-semibold my-2'>{ blog?.blog.image && blog?.blog.title}</h1>
        <h1 className='line-clamp-2'>{ blog?.blog.image && blog?.blog.summary}</h1>
       </div>
       
    </div>
}
    </div>
  )
}
