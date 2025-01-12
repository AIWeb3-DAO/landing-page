// WalletContext.tsx
//"use client"

/*import React, { createContext, useContext, useState } from 'react';
import { BaseWallet, Account } from '@polkadot-onboard/core';

interface WalletContextType {
  selectedWallet: BaseWallet | null;
  selectedAccount: Account | null;
  signer: any | null;
  setSelectedWallet: (wallet: BaseWallet | null) => void;
  setSelectedAccount: (account: Account | null, signer: any | null) => void;
}

const WalletContext = createContext<WalletContextType>({
  selectedWallet: null,
  selectedAccount: null,
  signer: null,
  setSelectedWallet: () => {},
  setSelectedAccount: () => {},
});

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedWallet, setSelectedWallet] = useState<BaseWallet | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [signer, setSigner] = useState<any | null>(null);

    console.log("my beutiful signer", signer)
  const handleSetSelectedAccount = (account: Account | null, walletSigner: any | null) => {
    setSelectedAccount(account);
    setSigner(walletSigner);
  };

  return (
    <WalletContext.Provider
      value={{
        selectedWallet,
        selectedAccount,
        signer,
        setSelectedWallet,
        setSelectedAccount: handleSetSelectedAccount,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => useContext(WalletContext);*/

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { BaseWallet, Account } from "@polkadot-onboard/core";
import { useWallets } from "@polkadot-onboard/react";
import { formatBalance } from "@polkadot/util";
import { SubmittableExtrinsic } from "@polkadot/api/types";
import { FB_DB } from "@/lib/fbClient";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore"; 
type TransferTokensParams = {
    amount: number; // Amount in base units (e.g., DOT)
    recipientAddress: string; // Recipient's address
    selectedAccount? : string
    videoId ? : string
    contributor? : string
  };

interface WalletContextType {
  accounts: Account[];
  signer: any | null;
  selectedWallet: BaseWallet | null;
  connectWallet: (wallet: BaseWallet) => Promise<void>;
  handleTransferTokens : ({amount, recipientAddress} : TransferTokensParams) => Promise<void>
  tokenBalance : any | null
  isTippingSuccess : boolean
  isTippingLoading : boolean
  isShowConnectModal : boolean
  setIsShowConnectModal : any
  //setSelectedWallet: (wallet: BaseWallet | null) => void;
  //setSelectedAccount: (account: Account | null, signer: any | null) => void;
  //selectedAccount: null,
}


const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [signer, setSigner] = useState<any | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<BaseWallet | null>(null);
  const [api, setApi] = useState<ApiPromise | null>(null);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [tokenBalance, setTokenBalance] = useState<string | number | null>(null)
  const [isTippingSuccess, setisTippingSuccess] = useState(false)
  const [isTippingLoading, setisTippingLoading] = useState(false)
  const [isShowConnectModal, setIsShowConnectModal] = useState(false)
  const {wallets} = useWallets()

  useEffect(() => {
    const setupApi = async () => {
      const provider = new WsProvider("wss://dancebox-3135.tanssi-api.network");
      const api = await ApiPromise.create({ provider });
      setApi(api);
    };

    setupApi();

  }, []);

  useEffect(() => {
     // Check for saved wallet in localStorage
     const savedWalletId = localStorage.getItem("ai3Wallet");

     console.log("saved wallet", savedWalletId)
    if (wallets && wallets.length > 0 && savedWalletId) {
      reconnectWallet(savedWalletId);
    }
  }, [wallets])
  

   console.log("saved accounts", accounts)
  const reconnectWallet = async (walletId: string) => {
    try {
      // Assume `wallets` is an array of available wallets
      const wallet = wallets?.find((w) => w.metadata.id === walletId);
      console.log("the required wallet", wallet)
      if (!wallet) throw new Error("Wallet not found"); 
      await wallet.connect();
      const accounts = await wallet.getAccounts();
      setAccounts(accounts);
      setSigner(wallet.signer);
      setSelectedWallet(wallet);
    } catch (error) {
      console.error("Failed to reconnect wallet:", error);
    }
  };

  const connectWallet = async (wallet: BaseWallet) => {
   /* try {
      await wallet.connect();
      const accounts = await wallet.getAccounts();
      setAccounts(accounts);
      setSigner(wallet.signer);
      setSelectedWallet(wallet);

      // Save selected wallet ID to localStorage
      localStorage.setItem("ai3Wallet", wallet.metadata.id);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }*/

      console.log(`wallet clicked!`);
      if (!isBusy) {
        try {
          setIsBusy(true);
          await wallet.connect();
          let accounts = await wallet.getAccounts();
          setAccounts(accounts);
          setSelectedWallet(wallet);
          setAccounts(accounts)
           // Save selected wallet ID to localStorage
        localStorage.setItem("ai3Wallet", wallet.metadata.id);
         setIsShowConnectModal(!isShowConnectModal)
        } catch (error) {
          // handle error
        } finally {
          setIsBusy(false);
        }
      }
  };


  function toSmallestUnit(amount : number, decimals: number) {
    return amount * Math.pow(10, decimals);
  }


    // update  db

    // Function to update contributors and tokens in Firestore
    const updateContributorsAndTokens = async (videoId : string, newContributor : string, newToken : number) => {
      console.log("the added video id", videoId)
      try {
        if(FB_DB){
        const videoDocRef = doc(FB_DB, "youtube", videoId);
        const videoDoc = await getDoc(videoDocRef);
    
        if (!videoDoc.exists()) {
          console.error("Video document does not exist");
          return;
        }
    
        const data = videoDoc.data();
        const existingContributors = data.contributors || [];
        const existingTokens = data.tokens || [];
    
        // Calculate the total current tokens
        const totalExistingTokens = existingTokens.reduce((sum : any, token : any) => sum + token, 0);
    
        // Calculate the distribution of 30% of new tokens to existing contributors
        const newTokenDistribution = newToken * 0.3;
        const newTokensForExisting = existingTokens.map(token  => token + (token / totalExistingTokens) * newTokenDistribution);
    
        // Calculate 70% of new tokens for the new contributor
        const newTokenForNewContributor = newToken * 0.7;
    
        // Update the contributors and tokens arrays
        const updatedContributors = [...existingContributors, newContributor];
        const updatedTokens = [...newTokensForExisting, newTokenForNewContributor];
    
        // Update the Firestore document
        await updateDoc(videoDocRef, {
          contributors: updatedContributors,
          tokens: updatedTokens
        });
    
        console.log("Contributors and tokens updated");
      }} catch (error) {
        console.error("Error updating contributors and tokens:", error);
      }
    };


  const handleTransferTokens = async ({
    amount,
    recipientAddress,
    selectedAccount,
    videoId,
    contributor
  }: TransferTokensParams): Promise<void> => {
    try {
      // Convert the amount to the smallest unit
      const smallestUnit = toSmallestUnit(amount, 12);
  
    setisTippingLoading(true)
      // Create the transfer extrinsic
      if(api?.isReady){
      const transferExtrinsic: SubmittableExtrinsic<'promise'> =
        api.tx.balances.transferKeepAlive(recipientAddress, smallestUnit);
  
      console.log("Signing and sending transaction...");
  
      // Sign and send the transaction
      await transferExtrinsic.signAndSend(
        accounts[0].address,
        { signer: signer },
        ({ status, txHash, dispatchError }) => {
          if (dispatchError) {
            if (dispatchError.isModule) {
              const decoded = api.registry.findMetaError(dispatchError.asModule);
              const { section, name, docs } = decoded;
              console.error(`Transaction failed: ${section}.${name} - ${docs.join(' ')}`);
              setisTippingLoading(false)
            } else {
              console.error(`Transaction failed: ${dispatchError.toString()}`);
              setisTippingLoading(false)
            }
          } else if (status.isInBlock) {
            console.log(`Transaction included in block: ${status.asInBlock.toString()}`);
            console.log(`Transaction hash: ${txHash.toString()}`);

              // Update contribution
              const handleUpdate = async () => {
                try {
                  await updateContributorsAndTokens(videoId, contributor,amount)
                  setisTippingLoading(false)
                  setisTippingSuccess(true)
                } catch (error) {
                  console.log("something went wrong at contribution", error)
                  setisTippingLoading(false)
                }
                  }
              handleUpdate()
          } else {
            console.log(`Transaction status: ${status.type}`);
          }
        }
      );
    }} catch (error) {
      console.error("An error occurred during the transfer:", error);
      setisTippingLoading(false)
    }
  };










  const getBalance = async () => {
    if (api?.isReady && accounts?.[0]?.address) {
      try {
        const { data: balance } = await api.query.system.account(accounts[0].address);
        console.log("Raw balance object:", balance?.free.toString());
  
        // Convert balance to human-readable format
        const formattedBalance = formatBalance(balance?.free, {
          decimals: 12, // Replace with your chain's decimals
          withUnit: 'LOVE' // Replace with your chain's unit
        });
  
        console.log("Formatted balance:", formattedBalance);
        setTokenBalance(formattedBalance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
  };
  
  useEffect(() => {
    getBalance();
  }, [api, accounts]);
    

    console.log("user balances", tokenBalance)
   console.log("Is contrubted loading", isTippingLoading)
   console.log("is Tipping success", isTippingSuccess)

  return (
    <WalletContext.Provider
      value={{
        accounts,
        signer,
        selectedWallet,
        connectWallet,
        tokenBalance,
        handleTransferTokens,
        isShowConnectModal,
        setIsShowConnectModal,
        isTippingLoading,
        isTippingSuccess
        
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};


