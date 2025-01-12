
import PlayePage from '@/components/videos/PlayePage'
import React from 'react'
import { headers } from 'next/headers'
import { FB_DB } from '@/lib/fbClient'
import { doc, getDoc,DocumentData, updateDoc,increment  } from 'firebase/firestore';
import HeaderNav from '@/components/Header/HeaderNav';
import { NavbarDemo } from '@/components/TopNavbar';

import FullVideoStats from '@/components/FullVideoStats';
import Player from '@/components/videos/player';
import WalletSubmission from '@/components/videos/WalletSubmission';

export default async function Page() {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  const id = pathname?.startsWith('/videos/') ? pathname.slice(8) : pathname;



  const fetchData = async () => {
    if(FB_DB && id){
    try {
      const docRef = doc(FB_DB, 'youtube', id); 
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = (docSnap.data());
        /*await updateDoc(docRef, {
          views: increment(1),
        });*/
        return data
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    } finally {
    }
  }};

  const video =  await fetchData()

   console.log("video information", video)
 
   
   function formatTimestamp(seconds: number) {
    // Convert seconds to milliseconds
    const milliseconds = seconds * 1000;
  
    // Create a Date object
    const dateObject = new Date(milliseconds);
  
    // Format the date into a human-readable string
    const humanReadableDate = dateObject.toLocaleString(); // Adjust this as needed
  
    return humanReadableDate;
  }

  const readbaleTimeStamp = formatTimestamp(video?.timestamp?.seconds)
console.log("readable time", readbaleTimeStamp)


  const readableTimeStamp = formatTimestamp(video?.timestamp?.seconds);

  if (!video) {
    return (
      <div>
        <NavbarDemo />
        <div className="w-full min-h-screen h-full flex space-x-3">
          <h1>Video not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div>

      <NavbarDemo />
      <div className="w-full min-h-screen h-full flex space-x-3">
        <div className="w-full xl:w-[80%] min-h-screen px-2">
          <Player url={video?.youtubeURL} />
          <div className="my-4 px-3">
            <h1 className="text-lg sm:text-xl md:text-2xl text-text">{video?.youtubeTitle}</h1>
            <h1 className="text-lg sm:text-xl md:text-2xl text-text">
              AIWeb3 is full of love, if you like this video, tip and support the content creator!
            </h1>
            <p>
              For the testnet, you can use the point on AIWeb3 discord to support the creators while earning the AIWEB
              token!
            </p>
            <p>
              Visit AIWeb3 official discord,{' '}
              <a
                href="https://discord.com/channels/1069016441854099489/1070795846712578068"
                className="text-blue-500"
              >
                #bot-channel
              </a>
              , and enter the following if you want to contribute 10 points:
            </p>
            <p className="text-blue-500">
              <b>!tipCreator {id} 10</b>
            </p>
            <FullVideoStats
              stats={video?.contributors}
              tokenstats={video?.tokens}
              createdAt={video?.timestamp?.seconds}
              viewCounts={video?.views}
            />
          </div>
        </div>
        <h2 className="hidden xl:block">Related videos</h2>
      </div>
      <WalletSubmission videoId={id} />


    </div>
  );
}
