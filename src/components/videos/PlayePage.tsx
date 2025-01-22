"use client"

import React, { useState,useEffect} from 'react'
import ReactPlayer from 'react-player'
import FullVideoStats from '../FullVideoStats';
import HeaderNav from '../Header/HeaderNav';
import {  usePathname } from 'next/navigation';
import {  FB_DB } from '@/lib/fbClient';
import { doc, getDoc,DocumentData } from 'firebase/firestore';
export default function PlayePage() {
  //const [videoData, setVideoData] = useState(null);
  const [videoData, setVideoData] = useState<DocumentData | null>(null); // Allow state to be either null or DocumentData
  const [loading, setLoading] = useState(true);
  const pathname = usePathname()

  const id = pathname.startsWith('/videos/') ? pathname.slice(8) : pathname;

  console.log("video id from main page", id)

  useEffect(() => {
    const fetchData = async () => {
      if(FB_DB && id){
      try {
        const docRef = doc(FB_DB, 'youtube', id);  
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setVideoData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      } finally {
        setLoading(false);
      }
    }};

    fetchData();
  }, [id]);
    console.log("the router", videoData)


    function formatTimestamp(seconds: number) {
      // Convert seconds to milliseconds
      const milliseconds = seconds * 1000;
    
      // Create a Date object
      const dateObject = new Date(milliseconds);
    
      // Format the date into a human-readable string
      const humanReadableDate = dateObject.toLocaleString(); // Adjust this as needed
    
      return humanReadableDate;
    }


      const readbaleTimeStamp = formatTimestamp(videoData?.timestamp?.seconds)

        console.log("the readable time ", readbaleTimeStamp)


    if (loading) {
      return(
        <div   className='w-full h-screen flex items-center justify-center'>
        <p  className='uppercase text-xl'>Loading ....</p>
        </div>
      )
    }
  return (
    <>
    <HeaderNav  />
    <div className='w-full  min-h-screen h-full flex space-x-3'>
        <div  className='w-full xl:w-[80%] min-h-screen px-2'>
         <div className='  h-[50vh] xl:h-[90vh]'>
         <ReactPlayer url={`${videoData?.youtubeURL}`} 
           
           width={"100%"}
           height={"100%"}
           
         />


         </div>
         <div  className='my-4 px-3 '>
         <h1 className='text-lg sm:text-xl md:text-2xl text-text '>{videoData?.youtubeTitle}</h1>
         <h1 className='text-lg sm:text-xl md:text-2xl text-text '>AIWeb3 is full of love, if you like this video, tip and support the content creator! (爱Web3中文社区充满了友爱，如果你喜欢这个内容，请一定要用你的积分，代币支持这个创作者！) </h1>

         <p>For the testnet, you can use the point on AIWeb3 discord to support the creators while earning the AIWEB token!</p>
         <p>Visit AIWeb3 official discord, #bot-channel, and enter the following if you want to contribute 10 points (keep in mind the ratio, you will earn more AIWEB token from the latest video)):</p><p className="p-2 text-blue-500"><b>!tipCreator {id} 10</b></p>
         <FullVideoStats  stats={videoData?.contributors} tokenstats={videoData?.tokens} createdAt={videoData?.timestamp?.seconds} videoId={id}  /> 
    
         </div>
      
         </div>

      <h2 className='hidden xl:block'>Related videos</h2>
    </div>
    </>
  )
}
