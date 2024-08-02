import { NavbarDemo } from '@/components/TopNavbar'
import BlogHome from '@/components/blogs/Home'
import React from 'react'


export default function page() {
  return (
    <div className='w-full min-h-screen '>
      <NavbarDemo />
    <BlogHome    />
    </div>
  )
}
