

"use client"


import React, {useState, useEffect} from 'react'
import { tipTier } from '@/constants'
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore"; 
import { useWalletContext } from './wallet-context';
import { CheckCheck, Loader, Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { IoCheckmark } from 'react-icons/io5';
///const Checkmark = dynamic(() => import('react-checkmark'), { ssr: false });
type Props = {
  videoId : any,
 contributorAddress : any
}
export default function TipModal({videoId, contributorAddress} : Props) {
  const {tokenBalance, handleTransferTokens, isTippingLoading, isTippingSuccess} = useWalletContext()
   const  recipientAddress ="5DPVjCxjTHK4MfWf1HBYbqSCXTpyTw5mtijuvjdsttNvWyHT"

     const getModalState = () => {
      if(isTippingLoading){
        return(
          <div className='w-full relative'>
       <div  className=' flex  gap-3 flex-wrap items-center justify-center '>
         {tipTier?.map((tip, i) => (

            <div className='inline-flex  flex-col space-y-2 border cursor-pointer border-gray-400 hover:border-text-primary h-20 w-24 py-2 px-2 rounded-lg  items-center' key={i}
            onClick={() => handleTransferTokens({amount : tip.amount, recipientAddress, videoId, contributor : contributorAddress })}
            > 
                <h2 className='text-xl'>{tip.emoji}</h2>
                 <h2 className='text-sm'>{tip.amount} $LOVE</h2>
         </div>
         ))}
    </div>

     <div className='w-full h-full absolute top-0 bg-gray-800/60 rounded-xl z-10 flex items-center justify-center'>
  <Loader2 className='w-24 h-24 animate-spin'  />
     </div>
          </div>
        )
      } else if (isTippingSuccess) {
  return(
     <div className='w-full h-full flex items-center justify-center flex-col'>
      <div className='w-28 h-28 rounded-full flex items-center justify-center bg-green-500'>
  <IoCheckmark  className='w-20 h-20'   />
  </div>

   <h2 className='text-lg text-center my-4'>Transaction completed succefully</h2>
     </div>
  )
      }else {
  return(
    <div>
    
    <h1 className='font-sans  mb-7 text-2xl text-center'>Support The creator</h1>
       <p className='my-4 text-sm text-center'>💡 Your <span className='text-text-primary font-semibold'>  Balance is </span> <span className='text-blue-400'>{tokenBalance}</span> </p>
     <div  className=' flex  gap-3 flex-wrap items-center justify-center '>
          {tipTier?.map((tip, i) => (
 
             <div className='inline-flex  flex-col space-y-2 border cursor-pointer border-gray-400 hover:border-text-primary h-20 w-24 py-2 px-2 rounded-lg  items-center' key={i}
             onClick={() => handleTransferTokens({amount : tip.amount, recipientAddress, videoId, contributor : contributorAddress })}
             > 
                 <h2 className='text-xl'>{tip.emoji}</h2>
                  <h2 className='text-sm'>{tip.amount} $LOVE</h2>
          </div>
          ))}
     </div>
 
    
     </div>
  )
      }
     }

  return (
    <div>
    
   {getModalState()}

   
    </div>
  )
}






















/*"use client"


import React, {useState} from 'react'
import { tipTier } from '@/constants'
export default function TipModal() {
    const [state, setstate] = useState("tip")
  return (
    <div>
         {/*<div className='flex justify-around mb-5'>
             <div className='flex items-center bg-text-primary text-text-on-primary py-2 px-3 rounded-lg cursor-pointer text-center'>Tip</div>
             <div className='flex items-center bg-text-primary text-text-on-primary py-2 px-3 rounded-lg cursor-pointer text-center'>Buy token</div>

  </div>}*/
  /*
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
}*/
