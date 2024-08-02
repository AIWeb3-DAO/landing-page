


"use client"


import React, {useState} from 'react'
import { tipTier } from '@/constants'
export default function TipModal() {
    const [state, setstate] = useState("tip")
  return (
    <div>
         {/*<div className='flex justify-around mb-5'>
             <div className='flex items-center bg-text-primary text-text-on-primary py-2 px-3 rounded-lg cursor-pointer text-center'>Tip</div>
             <div className='flex items-center bg-text-primary text-text-on-primary py-2 px-3 rounded-lg cursor-pointer text-center'>Buy token</div>

  </div>*/}
   <h1 className='font-sans  mb-7 text-2xl text-center'>Support The creator</h1>
      <p className='my-4 text-sm text-center'>💡 Your <span className='text-text-primary font-semibold'>$AIWEB </span> balance is 0  you need some $AIWEB to Tip </p>
    <div  className=' flex  gap-3 flex-wrap items-center justify-center '>
        
         {tipTier?.map((tip, i) => (

            <div className='inline-flex  flex-col space-y-2 border cursor-pointer border-gray-400 hover:border-text-primary h-20 w-24 py-2 px-2 rounded-lg  items-center' key={i}> 
                <h2 className='text-xl'>{tip.emoji}</h2>
                 <h2 className='text-sm'>{tip.amount} $AIWEB</h2>
         </div>
         ))}
    </div>
    </div>
  )
}
