
"use client"
import {useState} from 'react'
import Wallets from './wallets';
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useWalletContext } from '../wallet-context';

export default function ConnectWallet() {
 const {isShowConnectModal} = useWalletContext()
  return (
   
    <div className={``}>
   <Dialog open={isShowConnectModal}>
 
  <DialogContent className='max-w-[400px] bg-black text-white'>
    <DialogHeader>
      <DialogTitle>Connect wallet</DialogTitle>
      <DialogDescription>
   <Wallets />
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>

  )
}
