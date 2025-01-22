import React from 'react'
import { useWalletContext } from '../wallet-context'
import Identicon from '@polkadot/react-identicon';
import { truncateText } from '@/utils/truncateTxt';
export default function Accounts() {
const {accounts, disconnectWallet} = useWalletContext()
  return (
    <div className='w-full'>
      {accounts?.map((item, i) => (
        <div key={i} className='flex items-center space-x-3 w-full my-4'>
        <Identicon
      value={item.address}
      size={28}
      theme={"polkadot"}
    />

     <p className='font-semibold'>{truncateText(item.address, 7)}</p>
         </div>
      ))}

       <button className='w-full py-3 px-4 bg-red-600 text-white rounded-full mt-5' onClick={() => disconnectWallet()}>Disconnect wallet</button>
    </div>
  )
}
