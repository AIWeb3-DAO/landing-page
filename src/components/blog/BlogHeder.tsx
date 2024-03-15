import React from 'react'
import Image from 'next/image'
import Search from './Search'

import Link from 'next/link'
export default function BlogHeader() {
  return (
         <div className='flex justify-between bg-black w-full max-w-[1400px] mx-auto h-[70px] items-center px-3 rounded-b-xl sticky top-0 '>
         <div>
            <Link href={`/`}>
        <Image  src={`/img/logo.jpg`} width={200} height={200} alt='logo' className='w-12 h-12 rounded-full cursor-pointer' />
        </Link>
         </div>
        <Search />

        <button className='bg-white text-black px-3 py-1.5 rounded-xl'>Connect wallet</button> 
    </div> 
   
  )
}
