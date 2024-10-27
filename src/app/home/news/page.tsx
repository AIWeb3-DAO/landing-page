import React from 'react'
import { collection, query, orderBy, limit, getDocs, startAfter } from "firebase/firestore";
import { FB_DB } from '@/lib/firebase-client';

interface NewsItem {
    id: string;
    otherINFO: string;
    news: string;
    timestamp: string;
  }
  
  // Async function to fetch news from Firebase Firestore
  const fetchNews = async (): Promise<NewsItem[]> => {
    try {
      const q = query(collection(FB_DB, "news"), orderBy("timestamp", "desc"), limit(10));
  
      const querySnapshot = await getDocs(q);
  
      // Map over the fetched documents and return an array of news items
      const newsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as NewsItem[];
 
      return newsList;
    } catch (error) {
      console.error("Error fetching news:", error);
      return []; // Return an empty array on error
    }
  };
export default async function page() {
    const news = await fetchNews();
  
  return (
    <div className='max-w-7xl mx-auto'>
    <div className='h-[30vh] flex items-center justify-center'>
      <h1 className='text-2xl font-semibold'>Web3 news (Web3 新闻一览)</h1>
    </div>
    <div className='flex space-x-10 justify-center'>
      <div className='flex flex-col w-full lg:w-6/12 max-w-xl border-dashed p-3 bg-zinc-900 rounded-xl'>
        {news?.map((item, i) => (
          <div key={i} className='border-l-2 border-yellow-100 my-5 p-4'>
            <div>
              <h1 className='font-semibold text-xl my-3'>{item?.otherINFO}</h1>  
              <span className='text-sm text-gray-400'>{new Date(item?.timestamp).toLocaleString()}</span>
              <p>{item?.news}</p>
            </div>
            <div>
              {/* share icons here */}
            </div>
          </div>
        ))}
      </div>
      <div className='w-4/12 hidden lg:flex border-dashed p-3 bg-zinc-900 rounded-xl flex-col space-y-4'>
        <h1 className='uppercase font-semibold'>Trending</h1>

        <p>coming sooon..</p>
      </div>
    </div>
   
  </div>
  )
}
