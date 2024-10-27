import React from 'react'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { FB_DB } from '@/lib/firebase-client';
import VideoCard from '@/components/video/video-card';


interface Video {
  id: string;
  youtubeURL: string;
  youtubeTitle: string;
  author: string;
  contributors: string;
  tokens: string[];
  description: string;
  currentRatio: string;
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
        videosList.push({
          id: doc.id,
          youtubeURL: videoId,
          youtubeTitle: data.youtubeTitle,
          author: data.author,
          contributors: data.contributors || '',
          tokens: data.tokens,
          description: `Posted ${timeDifferenceInHours} hours (${timeDifferenceInMins} mins) ago`,
          currentRatio: current_ratio,
        });
      }
    });

    return videosList;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
};
export default async function page() {

  const videos = await fetchVideos(); // Fetch data server-side

 
 
  return (
    <div>
      <div  className='max-w-2xl  mx-auto my-8 h-[20vh] flex items-center justify-center'>
        <h1 className='text-center text-4xl font-medium'>Explore educational video content and <br /> <span>elevate your understanding of Polkadot</span> </h1>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 my-3  max-w-[90%]  gap-3  mx-auto '>
      {videos?.map((item, i)  =>  (
   <VideoCard key={i} video={item}  />
))}

      </div>
    </div>
  )
}

