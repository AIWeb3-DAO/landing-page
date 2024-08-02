import { NavbarDemo } from '@/components/TopNavbar'
import React from 'react'

export default function page() {
  return (
    <div className='w-full flex-col h-screen flex items-center justify-center'>
        <NavbarDemo   />
        <p className='font-bold text-3xl text-center bg-red-600'>Coming soon...</p>  
    </div>
  )
}
