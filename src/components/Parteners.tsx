'use client'
import React from 'react'
import {motion} from 'framer-motion'
import Image from 'next/image'

type Props = {
    title? : string
    subtitle?: string
  
   
 }
export default function Parteners({title, subtitle} : Props) {
  return (
    <motion.div
    initial={{y: 4000}}
    animate ={{
      y : -20
    }}
    transition={{
      duration : 2
    }}
     className='flex items-center justify-center flex-col min-h-screen'
   >
    <h1 className=' text-3xl md:text-5xl text-center my-5 font-bold'>{title}</h1>
<p className=' text-lg md:text-xl font-semibold text-gray-300 text-center my-7 whitespace-pre-line'>{subtitle}</p>
<div className='flex flex-col md:flex-row gap-3  w-full md:justify-between justify-center space-x-7 items-center p-2 '>
  <div className='w-2/4 border border-gray-700 p-3 rounded-lg'>
     <Image      
   src={`https://pbs.twimg.com/profile_images/1379064847439175692/upOKBONH_400x400.jpg`}
  height={300}
  width={300}
  alt='image'
  className='max-w-16 h-16 rounded-full '
 />
 <h1 className='font-bold text-2xl my-3'>Acala Network</h1>
 <p className='my-6 text-gray-300'>Acala is an appchain powering Web3 finance. DeFi on 
@Polkadot
</p>
  </div>

  <div className='w-2/4 border border-gray-700 p-3 rounded-lg'>
     <Image      
   src={`https://pbs.twimg.com/profile_images/1701876489048801280/sNthcwHe_400x400.png`}
  height={300}
  width={300}
  alt='image'
  className='max-w-16 h-16 rounded-full '
 />
 <h1 className='font-bold text-2xl my-3'>Astar Network</h1>
 <p className='my-6 text-gray-300'>A Scalable Network Powering a Global Web3 Vision for All.
</p>
  </div>

  </div>

   <div className='flex flex-wrap space-x-4 space-y-4 justify-between my-5 p-3 '>
    
     <div className='flex items-center justify-center flex-col border border-gray-700 rounded-md p-2 cursor-pointer'>
     <Image      
   src={`https://pbs.twimg.com/profile_images/1701876489048801280/sNthcwHe_400x400.png`}
  height={300}
  width={300}
  alt='image'
  className='max-w-20 h-20 rounded-full  mb-4'
 />
<h1 className='font-bold text-2xl'>Astar</h1>
 <h2 className='text-gray-400 uppercase text-sm'>Astar hackathon partener</h2>
     </div>
     <div className='flex items-center justify-center flex-col border border-gray-700 rounded-md p-2 cursor-pointer'>
     <Image      
   src={`https://pbs.twimg.com/profile_images/1508743603903864833/vXsCYk7U_400x400.jpg`}
  height={300}
  width={300}
  alt='image'
  className='max-w-20 h-20 rounded-full mb-4 '
 />
<h1 className='font-bold text-2xl'>Bifrost</h1>
 <h2 className='text-gray-400 uppercase text-sm'>Bifrost space partener</h2>
     </div>

     <div className='flex items-center justify-center flex-col border border-gray-700 rounded-md p-2 cursor-pointer'>
     <Image      
   src={`https://pbs.twimg.com/profile_images/1466716139636269058/-Wa58TmV_400x400.jpg`}
  height={300}
  width={300}
  alt='image'
  className='max-w-20 h-20 rounded-full mb-4 '
 />
<h1 className='font-bold text-2xl'>Centrifuge</h1>
 <h2 className='text-gray-400 uppercase text-sm'>Bifrost space partener</h2>
     </div>

     <div className='flex items-center justify-center flex-col border border-gray-700 rounded-md p-2 cursor-pointer'>
     <Image      
   src={`https://pbs.twimg.com/profile_images/1675780528992141312/AIth_3GW_400x400.jpg`}
  height={300}
  width={300}
  alt='image'
  className='max-w-20 h-20 rounded-full mb-4 '
 />
<h1 className='font-bold text-2xl'>Polkadot</h1>
 <h2 className='text-gray-400 uppercase text-sm'>Polkadot ama partener</h2>
     </div>
     
   </div>
  </motion.div>
  )
}
