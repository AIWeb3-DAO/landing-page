//@ts-nocheck


import React, {useState, useEffect} from 'react'
import ShareButtons from './ShareButtons';
//import Modal from '../common/Modal';
import { LuHelpingHand } from "react-icons/lu";
import { FaFire } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

//import moment from 'moment';
//import { WEBSITE_URL } from '@/assets/constant';
import TipModal from './TipModal';

import { useUserContext } from './UserContext';
import { ModalBody, ModalContent, ModalProvider, ModalTrigger } from './ui/animated-modal';
import { timeAgo } from '@/lib/utils';
import { truncateText } from '@/utils/truncateTxt';
  type statsProps ={
    stats? : any
    createdAt ? : any
     videId? : any
     tips ? : any
   
  }
export default function FullVideoStats({stats, createdAt, videId, tips} : statsProps) {
  const currentDate = new Date();
  const videoCreatedAt = new Date(createdAt);
  const {userProfile} = useUserContext()
  //@ts-ignore
  const diffInMilliseconds = currentDate - videoCreatedAt;
  const diffInHours = diffInMilliseconds / (60 * 60 * 1000);
  //const duration = moment.duration(diffInHours, "hours");
  const  WEBSITE_URL  = "hello  website"
    const isLiked =  false
    const [isShowTipModal, setisShowTipModal] = useState(false)

    const [isShowTradeModal, setisShowTradeModal] = useState()



         

        
  return (
    <div className={`flex flex-col md:flex-row justify-start md:justify-between md:items-center px-2 border-b border-b-gray-400/60  dark:border-gray-800 pb-2 my-3 `}>
      <div className='flex items-center gap-4'>

         <div className='flex items-center gap-2 text-sm dark:text-gray-400 text-gray-800'>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
<p className='xs:text-xs'>{timeAgo(createdAt)}</p>
         </div>
         <div className={`flex gap-2 items-center text-sm dark:text-gray-400 text-gray-800`}>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>
   <p className='text-xs'>{stats?.viewCount || "0"} views</p>
         </div>
         </div>

         <div className={`flex gap-6 items-center md:justify-center  mt-4 md:my-0  `}>
        
              <div className={`flex items-center gap-2 ${  isLiked && "text-green-500"} cursor-pointer hidden `} >
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ">
  <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
</svg>
  <p className=' text-sm md:font-semibold'>{ "0"}</p>
              </div>
            

  <ModalProvider>
    <ModalTrigger>
          <div className='flex items-center gap-2 hover:text-text-primary cursor-pointer' >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>


<p className='text-sm md:font-semibold'>Support</p>
          </div>
          </ModalTrigger>

      <ModalBody>
        <ModalContent>
            <TipModal  />
        </ModalContent>
      </ModalBody>

          </ModalProvider>

          <div className='flex items-center gap-2 hover:text-text-primary cursor-pointer hidden' >
     <FaFire   className='text-yellow-600 animate-bounce'  />


<p className='text-sm md:font-semibold'>Buy / Sell</p>
          </div>

   
      
      
<p className='text-sm font-semibold hidden'>Minted 2</p>
       
<Dialog >
  <DialogTrigger>
  <div className='items-center gap-2 hover:text-text-primary cursor-pointer flex'>
  <LuHelpingHand  className='w-6 h-6' />


<p className='text-sm font-semibold'>Contributors</p>
          </div>
          

  </DialogTrigger>
  <DialogContent className='bg-gray-900'>
    <DialogHeader>
      <DialogTitle className='mb-4 '>Contributors</DialogTitle>
      <DialogDescription>
      <div  className=''>
          {stats?.map((item, i)  =>  (
            <div key={i}  className='my-3'> 
                <p>{truncateText(item, 20)}</p>
             </div>
          ))}
      </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>   
              
        
 
           <Dialog >
  <DialogTrigger>
  <div className='items-center gap-2 hover:text-text-primary cursor-pointer flex'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
</svg>


<p className='text-sm font-semibold'>Share</p>
          </div>
          

  </DialogTrigger>
  <DialogContent className='bg-gray-900'>
    <DialogHeader>
      <DialogTitle className='mb-4 '>Share</DialogTitle>
      <DialogDescription>
       <ShareButtons url={`${WEBSITE_URL}/watch/$${videId}`} />
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>




</div>

         </div>

    
  )
}