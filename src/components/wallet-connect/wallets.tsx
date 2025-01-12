import { memo } from 'react';
import { useWallets } from '@polkadot-onboard/react';
import { BaseWallet } from '@polkadot-onboard/core';
import Wallet from './wallet';
import { useWalletContext } from '../wallet-context';
const Wallets = () => {
  const {setIsShowConnectModal, isShowConnectModal} = useWalletContext()
  const { wallets } = useWallets();
   console.log("wallets", wallets)
  if (!Array.isArray(wallets)) {
    return null;
  }
  

  return (
    <div>
      {wallets.map((wallet: BaseWallet) => (
        <Wallet key={wallet.metadata.title} wallet={wallet} />
      ))}

       <button onClick={() => setIsShowConnectModal(! isShowConnectModal)}>close modal</button>
    </div>
  );
};

export default memo(Wallets);