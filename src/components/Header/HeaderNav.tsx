


import React, {useState, useEffect} from 'react'
import { useUserContext } from '../UserContext'
import { truncateText, truncateText2 } from '@/utils/truncateTxt';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image';

interface UserData {
  address: string;
  // Add other properties if needed
}

export default function HeaderNav() {
  

     
  return (
    <div  className=' border-b border-zinc-900 h-[60px] w-full mx-auto  sticky top-0 z-30 flex justify-between items-center px-4 bg-black'>
      <div className='w-full h-full max-w-7xl mx-auto'>
        
   <Link href={`/`}>
   <Image  src={`/img/logo.png`}  width={40} height={40} alt='logo'   className='object-cover rounded-full' /></Link>

   </div>
        
        
        </div>
  )
}
