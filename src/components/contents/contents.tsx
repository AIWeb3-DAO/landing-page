'use client'

import React from 'react'
import TopNavbar from '../TopNavbar'
import Image from 'next/image'
import Link from 'next/link'
import LocaleSwitcher from '../LocalSwitcher'
import {PiTelegramLogo} from 'react-icons/pi'
import {RiTwitterXLine, RiDiscordLine} from 'react-icons/ri'
import UpcomingContents from './UpcomingContents'
import Soon from '../Soon'
export default function Contents() {
  return (
    //<div className='w-full h-screen flex flex-col items-center justify-center'>

    <div className='w-full max-w-7xl'>   
    
    <UpcomingContents />

    <Soon   />
    </div>
  )
}
