"use client"


import React, {useState, useEffect} from 'react'
import { collection, query, orderBy, limit, getDocs, startAfter } from "firebase/firestore";
import { FB_DB } from '@/lib/fbClient';
import { FaXTwitter } from 'react-icons/fa6';
import HeaderNav from '../Header/HeaderNav';
import { Timestamp } from '@firebase/firestore';

interface NewsItem {
  id: string;
  otherINFO: string;
  news: string;
  timestamp: string;
  // Add other properties if needed
}

const formatTimestamp = (timestamp: Timestamp | null | undefined): string => {
  if (!timestamp) return '';
  
  // Assuming timestamp is a Firestore Timestamp object
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleString(); // Customize this as needed
};

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    let q;

    if (!lastDoc) {
      q = query(collection(FB_DB, "news"), orderBy("timestamp", "desc"), limit(10));
    } else {
      q = query(
        collection(FB_DB, "news"),
        orderBy("timestamp", "desc"),
        startAfter(lastDoc),
        limit(10)
      );
    }

    const querySnapshot = await getDocs(q);
    const newsList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as NewsItem[];

    if (newsList.length === 0) {
      setHasMore(false);
    } else {
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setNews(prevNews => [...prevNews, ...newsList]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>
      <HeaderNav />
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
                  <span className='text-sm text-gray-400'>{new Date(item?.timestamp?.seconds * 1000).toLocaleString()}</span>
                  <p>{item?.news}</p>
                </div>
                <div>
                  {/* share icons here */}
                </div>
              </div>
            ))}
          </div>
          <div className='w-4/12 hidden lg:flex border-dashed p-3 bg-zinc-900 rounded-xl'>
            <h1 className='uppercase font-semibold'>Trending</h1>
          </div>
        </div>
        <div className='flex justify-center my-5'>
          {hasMore && !loading && (
            <button onClick={fetchNews}>
              Load More
            </button>
          )}
          {loading && (
            <p className='uppercase text-xl'>Loading ....</p>
          )}
        </div>
      </div>
    </>
  );
}
