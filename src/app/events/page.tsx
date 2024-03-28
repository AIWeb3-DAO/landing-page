import TopNavbar from '@/components/TopNavbar'
import { BlogHome } from '@/components/blog'
import Events from '@/components/events/Events'
import React from 'react'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export default function page() {
 

  return (
    <main className={`flex flex-col items-center justify-between  bg-[url("/img/stars.svg")] bg-gray-900 ${inter.className} text-gray-300 min-h-screen`}>

    <Events  />
</main>
  )
}
