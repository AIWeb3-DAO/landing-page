"use client"

import React, {useState, useEffect} from 'react'
import ReactPlayer from 'react-player'
import { Modal, ModalBody, ModalContent,ModalTrigger,useModal } from '../ui/animated-modal'
import TipModal from '../TipModal'
import HeaderNav from '../Header/HeaderNav'
import { testVideos } from '@/constants'
import VideoCard from './VideoCard'
import { fireBaseConfig } from '@/lib/fbClient'
import  {getFirestore, getDoc, collection, doc, getDocs}  from 'firebase/firestore'
import {initializeApp}  from "firebase/app"
export default function Watach() {
  const [videos, setVideos] = useState([])
  const [isLoading, setisLoading] = useState(true)


  const app =  initializeApp(fireBaseConfig)
  const db = getFirestore(app)




  const fetchVideos = async () => {
    try {
    
      if (db) {
        // Fetch the current timestamp from keyINFO/time
        const timeDoc = await getDoc(doc(db, 'keyINFO', 'time'));
        const currentTime = timeDoc.exists() ? timeDoc.data().timestamp.toMillis() : Date.now();

        const querySnapshot = await getDocs(collection(db, 'youtube'));
        let videosList = []
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const url = new URL(data.youtubeURL);
          const videoId = url.searchParams.get('v');
          if (videoId) {
            const videoTimestamp = data.timestamp.toMillis(); // Assuming `data.timestamp` is a Firestore Timestamp object
            const timeDifference = currentTime - videoTimestamp;
            const timeDifferenceInHours = Math.floor(timeDifference / (1000 * 60 * 60)); // Convert milliseconds to hours
            const timeDifferenceInMins  = Math.floor(timeDifference / (1000 * 60)); // Convert milliseconds to minutes

            // this code will calculate the ratio based on the timeDifferenceInHours
            // it is set to between 0 and 400 hours, and the ratio is between 30 and 50 
            const max_HOURS = 400 
            let hoursDIFF = timeDifferenceInHours;
            if (hoursDIFF < 0) {
              hoursDIFF = 0;
            }
            if (hoursDIFF > max_HOURS){
              hoursDIFF = max_HOURS;
            }
            const slope = -20 / 400 ;       // (end_value - start_value) / total_time
            const current_ratio = 30 - slope * hoursDIFF;

            videosList.push({
              id: doc.id,
              youtubeURL: videoId,
              author: data.author,
              contributors: data.contributors || '',
              tokens: data.tokens,
              description: `Posted ${timeDifferenceInHours} hours ( ${timeDifferenceInMins} ) mins ago, and the current time is ${currentTime}`,
              currentRatio: current_ratio,
            });
            setisLoading(false)
          } else {
            console.error('Invalid YouTube URL:', data.youtubeURL);
            setisLoading(false)
          }
        });
               console.log("the video list is: ", videosList);
        setVideos(videosList);
        setisLoading(false)
      }   
    } catch (error) {
      console.error('Error fetching videos:', error);
      setisLoading(false)
    }
  };

   useEffect(() => {
    fetchVideos()
   }, [])


     console.log("all videos  is  here ", videos)



     if(isLoading){
      return(
        <div   className='w-full h-screen flex items-center justify-center'>
        <p  className='uppercase text-xl'>Loading ....</p>
        </div>
      )
     }
   

  return (
    <>
    <HeaderNav   />

  <div  className='h-[30vh] flex items-center justify-center'>
     <div  className=' p-2  max-w-xl  mx-auto  '>
      <h1  className='text-center text-2xl'>Explore a curated list of videos featuring the latest Polkadot news and educational content.</h1>
     </div>
     </div>
    
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 my-3  max-w-[90%]   mx-auto '>

        {videos?.map((item, i)  =>  (
           <VideoCard key={i} video={item}  />
        ))}
     
      </div>











     {/*} <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' 

        
        width={800}
        height={600}
          />
   <Modal >
    <ModalTrigger className='my-5 w-full max-w-7xl'>

    <button className='py-4 bg-pink-600 w-full max-w-3xl my-4 rounded-xl text-white' >Tip creator</button>
    </ModalTrigger>
    <ModalBody >
      <ModalContent>

      <TipModal  />
      </ModalContent>
    </ModalBody>
   </Modal>*/}
      
   
    </>
  )
}
