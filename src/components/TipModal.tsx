
//@ts-nocheck

"use client"


import React, {useState, useEffect} from 'react'
import { tipTier } from '@/constants'
import { FB_DB } from '@/lib/fbClient'
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore"; 
import {ApiPromise, WsProvider,} from '@polkadot/api';
import { useUserContext } from './UserContext';
import ConfettiExplosion from 'react-confetti-explosion';

type Props = {
  videoId : any,
 contributorAddress : any
}
export default function TipModal({videoId, contributorAddress} : Props) {
  const [isTokenSent, setisTokenSent] = useState(true)
  const { wallet, storedWallet}  = useUserContext()
    const wsProvider = new WsProvider('wss://fraa-flashbox-4274-rpc.a.stagenet.tanssi.network');

    function toSmallestUnit(amount, decimals) {
      return amount * Math.pow(10, decimals);
    }

 
    

  
   const  recipientAddress ="5DPVjCxjTHK4MfWf1HBYbqSCXTpyTw5mtijuvjdsttNvWyHT"



// Function to update contributors and tokens in Firestore
const updateContributorsAndTokens = async (videoId, newContributor, newToken) => {
 
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
    const totalExistingTokens = existingTokens.reduce((sum, token) => sum + token, 0);

    // Calculate the distribution of 30% of new tokens to existing contributors
    const newTokenDistribution = newToken * 0.3;
    const newTokensForExisting = existingTokens.map(token => token + (token / totalExistingTokens) * newTokenDistribution);

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




    const handleTransferTokens  =  async (amount)  =>  {

      const smallestUnit = toSmallestUnit(amount, 12);

      try {
        const web3API = await ApiPromise.create({ provider: wsProvider });
        web3API.isReady.then(() => {
          const transferExtrinsic = web3API.tx.balances.transferKeepAlive(recipientAddress, smallestUnit);
      
          transferExtrinsic.signAndSend(wallet?.accounts[0]?.address, {signer: wallet?.signer}, ({status, txHash}) => {
            if (status.isFinalized) {
              updateContributorsAndTokens(videoId, contributorAddress, amount);
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
    

  return (
    <div>
       
   <h1 className='font-sans  mb-7 text-2xl text-center'>Support The creator</h1>
      <p className='my-4 text-sm text-center'>💡 Your <span className='text-text-primary font-semibold'>$AIWEB </span> balance is 0  you need some $AIWEB to Tip </p>
    <div  className=' flex  gap-3 flex-wrap items-center justify-center '>
         {tipTier?.map((tip, i) => (

            <div className='inline-flex  flex-col space-y-2 border cursor-pointer border-gray-400 hover:border-text-primary h-20 w-24 py-2 px-2 rounded-lg  items-center' key={i}
            onClick={() => handleTransferTokens(tip.amount)}
            > 
                <h2 className='text-xl'>{tip.emoji}</h2>
                 <h2 className='text-sm'>{tip.amount} $AIWEB</h2>
         </div>
         ))}
    </div>

    {isTokenSent  &&(
      <ConfettiExplosion 
      force={0.8}
      duration={3000}
      particleCount={250}
      width={1600}
    
      />
    )}
    </div>
  )
}
