//@ts-nocheck

"use client"

import React, {useState, useEffect} from 'react'
import { useUserContext } from './UserContext';
import { useRouter } from 'next/navigation'
import { stringToHex } from "@polkadot/util";

import Onboard from '@subwallet-connect/core';
import injectedModule from '@subwallet-connect/injected-wallets';
import subwalletModule from '@subwallet-connect/subwallet';
import subwalletPolkadotModule from '@subwallet-connect/subwallet-polkadot';
import type {EIP1193Provider, SubstrateProvider} from "@subwallet-connect/common";
import ledgerModule from '@subwallet-connect/ledger-polkadot'
import TalismanModule from '@subwallet-connect/talisman'
import PolkadotJsModule from '@subwallet-connect/polkadot-js'
import coinbaseWalletModule from '@subwallet-connect/coinbase'
import {ethers} from 'ethers';
export default function LoginPage() {
    const [wallet, setwallet] = useState(null)
    const router = useRouter()
    const subwalletPolkadotWalet = subwalletPolkadotModule()
    const coinbaseWalletSdk = coinbaseWalletModule({ darkMode: true })
    const ledger = ledgerModule()
    const talisman = TalismanModule ()
    const polkadotjs= PolkadotJsModule ()
    const {verifyNonce, logout, userProfile}  =  useUserContext()
const MAINNET_RPC_URL = 'https://mainnet.infura.io/v3/<INFURA_KEY>'
const ws = 'wss://rpc.polkadot.io'
    const  signRaw  =  wallet?.signer?.signRaw



    const handleSifnMessage = async ()  =>  {
        if (signRaw) {
          // after making sure that signRaw is defined
          // we can use it to sign our message
          const { signature } = await signRaw({
              address: wallet?.accounts[0]?.address,
              data: stringToHex('message to sign'),
              type: 'bytes'
          });
          const userToken = await verifyNonce(wallet?.accounts[0]?.address)
          console.log("signed message", signature)
          console.log("user tokens from login page", userToken)
      }else if(! signRaw){
        alert("no raw signer")
      }
      }

      useEffect(() => {
     
        if(wallet?.accounts[0]?.address  && !userProfile){
           // verifyNonce()
           handleSifnMessage()
        }

        if (wallet && userProfile) {
          router.push('/')
        }
    }, [wallet, userProfile])



      
const connectWallet = async ()  =>  {
    const onboard = Onboard({
  
      wallets: [ subwalletPolkadotWalet, talisman, polkadotjs, ledger, coinbaseWalletSdk],
      chains: [
        {
          id: '0x1',
          token: 'ETH',
          label: 'Ethereum Mainnet',
          rpcUrl: MAINNET_RPC_URL
        }
      ],
      chainsPolkadot: [
        {
          id: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
          namespace: 'substrate',
          token: 'DOT',
          label: 'Polkadot',
          rpcUrl: `polkadot.api.subscan.io`,
          decimal: 10
        },
        {
          id: 'lashbox_simple_container_4274',
          namespace: 'substrate',
          token: 'AIWEB',
          label: 'aiweb3',
          rpcUrl: `wss://fraa-flashbox-4274-rpc.a.stagenet.tanssi.network`,
          decimal: 12
        }
      ]
      })
  
  
  
  
  
  const wallets = await onboard?.connectWallet()
  const wallet1 = wallets[0]
  setwallet(wallet1)
  console.log("wallets", wallet)}
  
  
;
  return (
    <div className='flex flex-col gap-3 items-center justify-center'>
        <h1  className='text-3xl font-extrabold'>Sign in with your wallet</h1>

         <button className='py-3 px-6 bg-green-600  rounded-xl'  onClick={()   => connectWallet() }>Sign in </button>
        
    </div>
  )
}
