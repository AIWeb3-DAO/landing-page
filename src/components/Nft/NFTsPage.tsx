import React, {useState, useEffect} from 'react'
import { useInkathon, subwallet, astar } from '@scio-labs/use-inkathon'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useSignMessage } from 'wagmi';
import NftPageTopNavbar from './NftPageTopNavbar';

/*import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { TextArea } from '@radix-ui/themes';*/
export default function NFTsPage() {
  const {connect, activeAccount, } = useInkathon()
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [imageTitle, setimageTitle] = useState("")
  const [imageDescription, setimageDescription] = useState("")
  const [tshirtColor, settshirtColor] = useState("")
  const [hairColor, sethairColor] = useState("")
  const [userImages, setuserImages] = useState()
  const urlVerifyUserSignature = "http://34.83.125.53:1985/verifyUserSignature" 
  const userAddress = "0x345fdA96178147bF5E8cdFbfBDF723d15f2973C3"

  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

    /*
 ===========================
  Authenticate users
 ============================

    */

  const  authenticate = async ( signature: any, account: any,) => {
    const data = JSON.stringify({
      accountType:"ethereum",
      message: `0xaaaaa is signing in to Aiweb3 at timestamp ${currentDateTime} with nonce 1200`,
      signature: signature,
      userAddress: account
  })
  const response = await fetch(urlVerifyUserSignature, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data
  })
  const result = await response.json() 
  return result
  console.log("the results", result)
  }

   /*
 ===========================
   End of Authenticate users
 ============================

    */
 
  
  /*
 ===========================
  Handle sign-in
 ============================

    */
  const signIn = async () => {
    try {
      if (!isConnected) {
        return alert('Please connect your wallet first');
      }
      const challenge =  `0xaaaaa is signing in to Aiweb3 at timestamp ${currentDateTime} with nonce 1200`
      const signature = await signMessageAsync({ message: challenge });
       const response = await authenticate(signature, address)
      console.log({ signature });
      console.log( challenge );
      console.log("the results after signing in", response );
    } catch (error) {
      console.error(error);
      alert('Error signing in');
    }
  };

  
  /*
 ===========================
  GET user  images
 ============================

    */

   const getUserAllImg = async () => {
    const getUserImgsUrl = "http://34.83.125.53:1985/getUserAllImg" // http://34.83.125.53:1985/getUserAllImg
    const data = JSON.stringify(
        {
            "accountType": "ethereum",
            "userAddress": address
        }
    )
    const response = await fetch(getUserImgsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data
    })
    const result = await response.json()
     setuserImages(result)
    console.log("getUserAllImg results ", result)
}



  /*
 ===========================
  Generate new image
 ============================

    */
    
  const imgGnerationUrl = "http://34.83.125.53:1985/mintNFTwithCode" 
     const  generateImage = async () =>  {
      const data = JSON.stringify({
        "accountType": "ethereum",
        "userAddress": address,
        "NFTCode": "abcd",
        "feature": imageTitle,
        
    })
    const response = await fetch(imgGnerationUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data
    })
    const result = await response.json() 
   // return result
    console.log("the results", response)  
     }

     const  signMessage = async (address : any) =>  {
          
     }

     
   useEffect(() => {
    if(isConnected) {
      getUserAllImg()
    }
      
       console.log("this  runs  after  each 20 seconds")
      // Set up the interval
    const intervalId = setInterval(getUserAllImg, 20000); // 20 seconds in milliseconds
      // Clean up the interval when the component is unmounted
      return () => clearInterval(intervalId);
   }, [])
   
  return (
    <div>
       <NftPageTopNavbar  />
        <div className=''>
          <div className='my-14'>
              <h1 className='text-center font-bold text-6xl mb-5'>Transform mundane ideas into captivating artworks with our app</h1>
          
          </div>



  <div className='flex gap-3 w-11/12 mx-auto  flex-col md:flex-row border-t border-gray-800 mt-8 '>
  
    <div className='flex-1 border border-gray-900 p-3 rounded-xl'>
        <div className='border-gray-900 border py-2 rounded-lg mb-5'>
           <p className='font-semibold text-lg text-center text-gray-200'>Options</p>
        </div>

         <div>
           <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-2'>
            <p className='text-sm font-semibold text-gray-400'>Image title</p>
          
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-yellow-400">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
</svg>
              
       
  </div>
              <input   
                 placeholder='super man'
                 value={imageTitle}
                 onChange={e => setimageTitle(e.target.value)}
                 className='w-full focus:outline-none h-10 px-2 bg-inherit border border-gray-800'
              />
           </div>

           <div className='flex flex-col gap-1 my-4'>
            <div className='flex items-center gap-2'>
            <p className='text-sm font-semibold text-gray-400'>Image  Description</p>
           
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-yellow-400">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
</svg>
            
      <p>Add Description  that describe you image</p>
 
       
  </div>
              <textarea  
                 placeholder='super man'
                 value={imageDescription}
                 onChange={e => setimageDescription(e.target.value)}
                 className='w-full focus:outline-none  h-24 px-2 bg-inherit border border-gray-800 resize-none'
              />
           </div>

           <h1>Features     <span className='text-xs text-gray-600'>option</span> </h1>

           <div className='flex flex-col gap-1 my-3'>
            <div className='flex items-center gap-2'>
            <p className='text-sm font-semibold text-gray-400'>T-shirt color</p>
            
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-yellow-400">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
</svg>
              
      <p className='text-gray-300'>T-shirt color</p>
   
  </div>
              <input   
                 placeholder='super man'
                 value={tshirtColor}
                 onChange={e => settshirtColor(e.target.value)}
                 className='w-full focus:outline-none h-10 px-2 bg-inherit border border-gray-800'
              />
           </div>

           <div className='flex flex-col gap-1 my-3'>
            <div className='flex items-center gap-2'>
            <p className='text-sm font-semibold text-gray-400'>Hair color</p>
          
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-yellow-400">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
</svg>
      <p className='text-gray-300'>Hair color</p>

       
  </div>
              <input   
                 placeholder='Hair Color '
                 value={hairColor}
                 onChange={e => sethairColor(e.target.value)}
                 className='w-full focus:outline-none h-10 px-2 bg-inherit border border-gray-800'
              />
           </div>
         </div>
         <div className='flex items-center gap-2 bg-indigo-600 py-2 px-3 rounded-full cursor-pointer justify-center' onClick={() => generateImage()}>
       <p className='font-semibold'>{isConnected ? "Generate image" : "connect wallet"}</p>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 ${! isConnected && "hidden"}`}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
</svg>

         </div>
    </div>

    <div className='w-full mx-auto md:w-1/2 border border-gray-800 rounded-lg min-h-[70vh] p-3 flex items-center justify-center'>
      <h1 className='text-2xl font-bold'>The generated image  will be  displayed here </h1>
    </div>
  </div>
  
        </div>
    </div>
  )
}
