
import Link from 'next/link'
import React from 'react'
import {PiTelegramLogo} from 'react-icons/pi'
import {RiTwitterXLine, RiDiscordLine} from 'react-icons/ri'
import Image from 'next/image'
import { openLinkInNewTab } from '@/lib/utils'
import LocaleSwitcher from './LocalSwitcher';
//import { useRouter } from 'next/router'
//import { useRouter } from 'next/router';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function TopNavbar() {

   
  //const pathname = usePathname();

  /*let locale  = 'zh';
  if (pathname) {
    locale = pathname.split('/')[1]; // 'en' or 'zh'
  }
  console.log(pathname); */

  //type LocaleLinks = {
  //  en: string;
  //  zh: string;
  //};
  //const searchParams = useSearchParams();
  //const locale = searchParams.get('locale') || 'zh'; // Default to 'zh' if not found
  // Define your Telegram links based on locale
  //const locale = 'zh'
  const TGLink = {
    en: 'https://t.me/aiweb3dao_eng',
    zh: 'https://t.me/AIweb3dao', // Example link for Chinese locale
  };
  // Use the current locale to get the correct Twitter link
  //const currentTGLink = TGLink[locale as keyof typeof TGLink] || TGLink.zh; // Default to Chinese if undefined
  return (
    <div className='w-full bg-gray-800/80 sticky top-0  z-20'>
    <div className='  border-b border-b-gray-800/30 flex justify-between items-center py-5 px-3 h-[65px]  max-w-6xl w-full  mx-auto'>
       <Link href={`/`}>
       <div className='flex items-center gap-2'>
         <Image
          width={90}
          height={90}
          alt='logo'
          src={`/img/logo3.png`}
          className='rounded-full '
         />
       <h1 className='font-semibold'>AIWeb3 DAO</h1>
       </div>
       </Link>
      
           <div className='flex items-center space-x-4'>
              <Link href={`/blog`} className='capitalize md:font-semibold bg-gray-700 py-1 px-2 md:py-1.5 md:px-3 rounded-xl'>blogs</Link>
              <Link href={`/nfts`} className='capitalize md:font-semibold  bg-gray-700 py-1 px-2 md:py-1.5 md:px-3  rounded-xl'>nfts</Link>
              <Link href={`/events`} className='capitalize md:font-semibold  bg-gray-700 py-1 px-2 md:py-1.5 md:px-3  rounded-xl'>events</Link>
              <Link href={`/contents`} className='capitalize md:font-semibold  bg-gray-700 py-1 px-2 md:py-1.5 md:px-3  rounded-xl'>contents</Link>
              <Link href={`/news`} className='capitalize md:font-semibold  bg-gray-700 py-1 px-2 md:py-1.5 md:px-3  rounded-xl'>news</Link>


           </div>
          <div className=' items-center gap-3 hidden md:flex'>
            <a href="https://twitter.com/aiweb3dao" target="_blank" rel="noopener noreferrer">
              <div className='cursor-pointer  w-[30px] h-[30px] flex items-center justify-center rounded-full ring-rose-400 hover:ring-1' >
              <RiTwitterXLine style={{width : "20px", height : "20px "}} />
              </div>
            </a>

    {/*}
            <a href={currentTGLink} target="_blank" rel="noopener noreferrer">
                <div className='cursor-pointer  w-[30px] h-[30px] flex items-center justify-center rounded-full ring-rose-400 hover:ring-1' >
                <PiTelegramLogo style={{width : "20px", height : "20px"}} />
                </div>
            </a>
  */}
            <a href="https://discord.gg/pQtZG8UQfk" target="_blank" rel="noopener noreferrer">
                <div className='cursor-pointer  w-[30px] h-[30px] flex items-center justify-center rounded-full ring-rose-400 hover:ring-1' >
                <RiDiscordLine style={{width : "20px", height : "20px"}} />
                </div>
            </a>

             <LocaleSwitcher  />
          </div>
    </div>
    </div>
  )
}
