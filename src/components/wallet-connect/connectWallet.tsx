
"use client"
import Wallets from './wallets';
import React, {useState} from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useWalletContext } from '../wallet-context';
import Accounts from './accounts';
import { MoveLeft, X } from 'lucide-react';

export default function ConnectWallet() {
 const {isShowConnectModal, accounts, setIsShowConnectModal} = useWalletContext()
 const [isBack, setisBack] = useState(false)
  return (
   
    <div className={``}>
   <Dialog open={isShowConnectModal}>
 
  <DialogContent className='max-w-[400px] bg-black text-white'>
    <DialogHeader>
      <div className='flex items-center justify-between'>
      <DialogTitle>Connect wallet</DialogTitle>
       <div className='w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ' onClick={() => setIsShowConnectModal(false)}>
   <X    />
       </div>
      </div>
      <DialogDescription className=''>
         {accounts.length > 0 && !isBack && (
          <div className='mb-7 mt-4 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer border' onClick={() => setisBack(!isBack)}>
             <MoveLeft   />
          </div>
         )}
   {accounts.length > 0 && ! isBack ? (
     <Accounts  />
   ) : (
    <Wallets />
   )}
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>

  )
}
