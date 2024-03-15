

import Link from 'next/link'
import React from 'react'
import {PiTelegramLogo} from 'react-icons/pi'
import {RiTwitterXLine, RiDiscordLine} from 'react-icons/ri'
import Image from 'next/image'
import { openLinkInNewTab } from '@/lib/utils'
import LocaleSwitcher from './LocalSwitcher';


export default function TopNavbar() {
  return (
    <div className='w-full bg-gray-800/80 sticky top-0  z-20'>
    <div className='  border-b border-b-gray-800/30 flex justify-between items-center py-5 px-3 h-[65px]  max-w-6xl w-full  mx-auto'>
       <Link href={`/`}>
       <div className='flex items-center gap-2'>
         <Image
          width={30}
          height={30}
          alt='logo'
          src={`https://pbs.twimg.com/profile_images/1637269369658171392/CHS2SlUh_400x400.jpg`}
          className='rounded-full '
         />
       <h1 className='font-semibold'>Ai web3</h1>
       </div>
       </Link>
      
           <div className='flex items-center space-x-4'>
              <Link href={`/blog`} className='capitalize font-semibold bg-gray-700 py-1.5 px-3 rounded-xl'>blogs</Link>
              <Link href={`/nfts`} className='capitalize font-semibold  bg-gray-700 py-1.5 px-3 rounded-xl'>nfts</Link>

           </div>
          <div className='flex items-center gap-3'>
            <div className='cursor-pointer  w-[30px] h-[30px] flex items-center justify-center rounded-full ring-rose-400 hover:ring-1' >
            <RiTwitterXLine style={{width : "20px", height : "20px "}} />
            </div>
            
             <div className='cursor-pointer  w-[30px] h-[30px] flex items-center justify-center rounded-full ring-rose-400 hover:ring-1' >
             <PiTelegramLogo style={{width : "20px", height : "20px"}} />
             </div>
            
             <LocaleSwitcher  />
          </div>
    </div>
    </div>
  )
}
