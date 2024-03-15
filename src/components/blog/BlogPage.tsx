import { IPFS_GATEWAY } from '@/constant'
import Image from 'next/image'
import React from 'react'

 type  blogPageProps = {
     title? : string
     image? : string
     body? : string
     post? : any
     loading : any
 }

export default function BlogPage({title, image, body, post, loading} : blogPageProps) {

    if(loading) {
        return(
          <div className='w-screen h-screen flex items-center justify-center'>
            <Image  src={`/img/logo.jpg`} width={200} height={200} alt='logo' className='w-12 h-12 rounded-full cursor-pointer animate-spin' />

          </div>
 
        )
      }
  return (
    <div className='flex flex-col max-w-[700px] mx-auto border border-zinc-900 items-center justify-center p-3 gap-4'>
   <h1 className='font-semibold text-5xl'>{title}</h1>
    <Image
    src={`${IPFS_GATEWAY}${image}`}
  width={700}
  height={500}
  alt='cover'
  className=' rounded-lg my-4'
/>
  <div>
     <p>{body}</p>
  </div>
    </div>
  )
}
