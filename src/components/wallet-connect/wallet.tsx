"use client"

import { memo, useEffect, useState } from 'react';
import Image from 'next/image';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { BaseWallet, Account } from '@polkadot-onboard/core';
import { AccountBox } from './account-box';
import { Wallet2Icon } from 'lucide-react';
import { useWalletContext } from '../wallet-context';
import { DialogClose } from '../ui/dialog';

const Wallet = ({ wallet }: { wallet: BaseWallet }) => {
  const {connectWallet, accounts} = useWalletContext()

    console.log("accounts", accounts)
 
  


  const walletClickHandler = async () => {
    await connectWallet(wallet);
  }

  return (
    <div className={`border my-4 py-2 px-2 rounded-xl`} style={{ marginBottom: '20px' }} onClick={walletClickHandler}>
     <div className='flex space-x-2  my-2 items-center  cursor-pointer'>
        <div >
          {wallet?.metadata?.id  === "talisman"  ?  (
            <Image src={"https://pbs.twimg.com/profile_images/1852410191695761408/Mi-Xs8D7_400x400.jpg"} width={50} height={50} alt='talisman logo'
              className='rounded-full w-10 h-10'
            />
          ) : wallet?.metadata?.id  === "polkadot-js"  ? (
            <Image src={"/img/dot-js.png"} width={50} height={50} alt='talisman logo'
            className='rounded-full w-10 h-10'
          />
          ):  wallet?.metadata?.id  === "subwallet-js"  ? (
            <Image src={"https://pbs.twimg.com/profile_images/1651520550295212037/YUKs0gC5_400x400.jpg"} width={50} height={50} alt='talisman logo'
            className='rounded-full w-10 h-10'
          />
        ):  wallet?.metadata?.id  === "wallet-connect"  ? (
          <Image src={"https://pbs.twimg.com/profile_images/1835981670916210688/Y4_qq8tr_400x400.jpg"} width={50} height={50} alt='talisman logo'
          className='rounded-full w-10 h-10'
        />
          ): <Wallet2Icon className='rounded-full w-10 h-10'    />}
        </div>
        <div className='text-lg capitalize'> {`${wallet.metadata.title} ${wallet.metadata.version || ''}`}</div>
        </div>
  
    </div>
  );
};

export default memo(Wallet);