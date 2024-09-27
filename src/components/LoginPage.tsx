
"use client"

import React, {useState, useEffect} from 'react'
import { useUserContext } from './UserContext';
import { truncateText, truncateText2 } from '@/utils/truncateTxt';
export default function LoginPage() {
 
 //  const [storedWallet, setstoredWallet] = useState()
    const {logout, connectWallet, storedWallet, wallet}  =  useUserContext()

console.log("wallet from navbar", wallet)
  
  return (
    <div className='flex flex-col gap-3 items-center justify-center'>
   {
    wallet  ?   (
       <div className='border p-2 rounded-xl' onClick={()  => logout()}> 
       <p className='font-medium text-sm'>{   storedWallet && truncateText(storedWallet?.accounts[0]?.address, 10)}</p>
         </div>
    ): (
<button className='bg-white text-black py-2 px-6 rounded-xl'  onClick={()   => connectWallet() }>Connect wallet </button>
    )
   }
         
       {/*}  <button className='py-3 px-6 bg-green-600  rounded-xl'  onClick={()   => handTransferTokens() }>Send tokens </button>*/}
        

        
    </div>
  )
}
