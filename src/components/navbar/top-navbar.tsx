"use client"

import Link from 'next/link'
import React from 'react'

export default function TopNavbar() {
  return (
    <div className='p-6 py-7   sticky top-0 z-20 flex justify-between items-center max-w-7xl mx-auto bg-gray-950/85'>
      <div>Ai web3</div>
      <Link href={`/home`} className='border border-gray-50 py-3 px-4 rounded-xl caret-popover'>Open app</Link>
    </div>
  )
}
