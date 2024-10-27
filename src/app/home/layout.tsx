import Sidebar from '@/components/navbar/sidebar/sidebar'
import TopNavbar from '@/components/navbar/top-navbar'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen'>
   
    <div className='flex space-x-2 '>
        <Sidebar />

        <div className='h-[300vh] w-full'>
         
            {children}
        </div>

    </div>
    </div>
  )
}
