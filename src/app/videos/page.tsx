import Watach from '@/components/videos/Watch'
import React from 'react'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { FB_DB } from '@/lib/fbClient';
import VideoCard from '@/components/videos/VideoCard';
import { NavbarDemo } from '@/components/TopNavbar';


interface Video {
  id: string;
  youtubeURL: string;
  youtubeTitle: string;
  author: string;
  contributors: string;
  tokens: string[];
  description: string;
  currentRatio: string;
  combinedScore?: number;
}



// Server-side fetching inside the component
const fetchVideos = async (): Promise<Video[]> => {
  try {
    // Fetch the current timestamp from 'keyINFO/time'
    const timeDoc = await getDoc(doc(FB_DB, 'keyINFO', 'time'));
    const currentTime = timeDoc.exists() ? timeDoc.data().timestamp.toMillis() : Date.now();

    // Fetch videos from the 'youtube' collection
    const querySnapshot = await getDocs(collection(FB_DB, 'youtube'));

    const videosList: Video[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const url = new URL(data.youtubeURL);
      const videoId = url.searchParams.get('v');

      if (videoId) {
        const videoTimestamp = data.timestamp.toMillis();
        const timeDifference = currentTime - videoTimestamp;
        const timeDifferenceInHours = Math.floor(timeDifference / (1000 * 60 * 60));
        const timeDifferenceInMins = Math.floor(timeDifference / (1000 * 60));

        const max_HOURS = 400;
        let hoursDIFF = timeDifferenceInHours;
        if (hoursDIFF < 0) {
          hoursDIFF = 0;
        }
        if (hoursDIFF > max_HOURS) {
          hoursDIFF = max_HOURS;
        }
        const slope = -20 / 400;
        const current_ratio = (30 - slope * hoursDIFF).toFixed(2);

        // Calculate total tokens
        const totalTokens = data.tokens?.reduce((sum: number, token: number) => sum + token, 0) || 0;

        // Calculate recency score (higher score for first 48 hours)
        let recencyScore = 0;
        if (timeDifferenceInHours <= 48) {
          recencyScore = 100 - (timeDifferenceInHours / 48) * 100; // Scale down to 0 after 48 hours
        }

        // Calculate combined score
        const combinedScore = recencyScore + totalTokens * 0.5;

        videosList.push({
          id: doc.id,
          youtubeURL: videoId,
          youtubeTitle: data.youtubeTitle,
          author: data.author,
          contributors: data.contributors || '',
          tokens: data.tokens,
          description: `Posted ${timeDifferenceInHours} hours (${timeDifferenceInMins} mins) ago`,
          currentRatio: current_ratio,
          combinedScore, // Store the combined score for sorting
        });
      }
    });

    // Sort the videos based on their combinedScore in descending order
    videosList.sort((a, b) => (b.combinedScore ?? 0) - (a.combinedScore ?? 0));

    return videosList;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}
export default async function page() {
  const videos = await fetchVideos();
  return (
    <div className='min-h-screen  w-full '>
      <NavbarDemo  />
       <div  className='h-[30vh] flex items-center justify-center'>
     <div  className=' p-2  max-w-xl  mx-auto  '>
      <h1  className='text-center text-2xl'>Check Polkadot eco videos, support the best content creators while also earn the reward!</h1>

      <h2  className='text-center text-2xl'>Special Event with Metahub, Bifrost and Vara network, Neemo Finance</h2>

     </div>
     </div>

     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 my-3  max-w-[90%]  gap-3  mx-auto '>
      {videos?.map((item, i)  =>  (
   <VideoCard key={i} video={item}  />
))}

      </div>
    </div>
  )
}
