import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit';
export default function NftPageTopNavbar() {
  return (
    <div className='flex  max-w-7xl mx-auto h-[60px] items-center justify-between sticky top-0 bg-black '>
         <Link href={`/`}>
        <Image  src={`/img/logo.jpg`} width={200} height={200} alt='logo' className='w-12 h-12 rounded-full cursor-pointer' />
        </Link>
   <ConnectButton chainStatus={"none"} showBalance={false}   />
        </div>
  )
}
