import React from 'react'

import { investors } from '../../constants'
import Image from 'next/image'
export default function Supporters() {
  return (
    <div className='w-full px-3 '>
  <h1 className={`  text-lg md:text-4xl text-gray-200 font-semibold text-start my-6`}>Backed by our best partners</h1>
  <div className='grid  grid-cols-1 sm:grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 content-center place-items-center place-content-center '>
  {investors.map((items, i) =>  (
    <div key={i} className=' border border-gray-800 w-11/12 mx-auto md:w-[270px] h-[170px] rounded-xl flex space-y-2 flex-col items-center justify-center'>
    <Image  src={items.logo} width={100} height={100} alt='logo'
       className='rounded-full'
    />
    <p className='capitalize font-semibold'>{items.name}</p>
    
     </div>
  ))}
  </div>
    </div>
  )
}

