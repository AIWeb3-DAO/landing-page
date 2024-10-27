"use client"
import { usePathname } from 'next/navigation';
import React, {useState,useEffect} from 'react'
import { FB_DB } from '@/lib/firebase-client';
import { doc, getDoc,DocumentData, updateDoc, increment } from 'firebase/firestore';
import ReactPlayer from 'react-player'
export default function Page() {
    const [videoData, setVideoData] = useState<DocumentData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const pathname = usePathname()
    const id = pathname.startsWith('/home/videos/') ? pathname.slice(13) : pathname;

     //  increment viewrse on new visit

  const updateViewCount = async () => {
    const videoRef = doc(FB_DB, "youtube", id);
    try {
      await updateDoc(videoRef, {
        viewCount: increment(1),
      });
    } catch (error) {
      console.error("Error updating view count: ", error);
    }
  };

  useEffect(() => {
    updateViewCount()
  }, [])

     console.log("the path name", id)

     useEffect(() => {
        const fetchData = async () => {
          if(FB_DB && id){
          try {
            const docRef = doc(FB_DB, 'youtube', id);  // Adjust 'videos' to your collection name
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

      if(loading){
        return(
            <div className='w-full h-screen flex items-center justify-center'>
                <p>Loading ...</p>
            </div>
        )
      }
  return (
    <div className='h-screen max-w-7xl mx-auto'>
     <ReactPlayer url={`${videoData?.youtubeURL}`} 
         onClickPreview={() => alert("hello world")}
           
           width={"100%"}
           height={"100%"}
           style={{borderRadius : "10px"}}
           
         />
    </div>
  )
}
