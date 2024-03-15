import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'


export default function Soon() {
    const router = useRouter()
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
        
        <img  src='/img/soon.svg' className='w-[300px] h-[300px]' />
           <p>Coming soon ...</p>
           <button className='font-semibold py-2 px-6 rounded-lg bg-blue-500 my-3' onClick={() =>router.back()}>Back Home</button>
    </div>
  )
}
