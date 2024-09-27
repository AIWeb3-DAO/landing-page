

import React, { createContext, useState, useContext, useEffect } from 'react';
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
import {ApiPromise, WsProvider,} from '@polkadot/api';
import {ethers} from 'ethers';

 type providerProps = {
  logout : any
  connectWallet : any
  activeWallet? : any
  wallet? : any
     signer? : any
     storedWallet : any
     handTransferTokens ? : any
 } 
// Create a context
const UserContext = createContext<providerProps | undefined>(undefined);

export const useUserContext = (): providerProps => {
    const context = useContext(UserContext)

    if(!context){
        throw new Error ("must be used in providers")
    }
    return context
}

  type ContextProps = {
    children : React.ReactNode
  }
export const UserContextProvider =({children} : ContextProps) => {


const [wallet, setwallet] = useState(null)
const subwalletPolkadotWalet = subwalletPolkadotModule()
const coinbaseWalletSdk = coinbaseWalletModule({ darkMode: true })
const ledger = ledgerModule()
const talisman = TalismanModule ()
const polkadotjs= PolkadotJsModule ()
const [storedWallet, setstoredWallet] = useState()

const MAINNET_RPC_URL = 'https://mainnet.infura.io/v3/<INFURA_KEY>'
const ws = 'wss://rpc.polkadot.io'
    // Construct API provider
    const wsProvider = new WsProvider('wss://fraa-flashbox-4274-rpc.a.stagenet.tanssi.network');


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

console.log("wallet", wallet1)


localStorage.setItem("AI3_SIGNER_ADDRESS", JSON.stringify(wallet1))
}


const logout = () => {
  localStorage.removeItem('AI3_SIGNER_ADDRESS');
};

useEffect(() => {
  const stored_wallet = localStorage.getItem("AI3_SIGNER_ADDRESS")

   //console.log("the stored  wallet ",JSON.parse(stored_wallet))
   const parsedWallet =  JSON.parse(stored_wallet)
   setstoredWallet(parsedWallet)
   
 }, [])

 console.log("wallet", wallet)


 function toSmallestUnit(amount, decimals) {
  return amount * Math.pow(10, decimals);
}



      const handTransferTokens  =  async (amount, recipientAddress)  =>  {

        const smallestUnit = toSmallestUnit(amount, 12);

        try {
          const web3API = await ApiPromise.create({ provider: wsProvider });
          web3API.isReady.then(() => {
            const transferExtrinsic = web3API.tx.balances.transferKeepAlive(recipientAddress, smallestUnit);
        
            transferExtrinsic.signAndSend(wallet?.accounts[0]?.address, {signer: wallet?.signer}, ({status, txHash}) => {
              if (status.isInBlock) {
                console.log("the tx hash",txHash.toString());
                console.log(`Completed at block hash #${status.asInBlock.toString()}`);
              } else {
                console.log(`Current status: ${status.type}`);
              }
            })
          })

          
        } catch (error) {

           console.log(`something went wrong`, error)
          
        }
           
     
      }


   const value = {
    logout,
    connectWallet,
       storedWallet,
       handTransferTokens,
       wallet
   }

   return(
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
   )

}