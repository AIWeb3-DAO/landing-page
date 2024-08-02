"use client"


import React, {useState, useEffect} from 'react'
import { collection, query, orderBy, limit, getDocs, startAfter } from "firebase/firestore";
import { FB_DB } from '@/lib/fbClient';
import { FaXTwitter } from 'react-icons/fa6';
import HeaderNav from '../Header/HeaderNav';

export default function NewsPage() {
    const [news, setNews] = useState([])
    const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);



  const fetchNews = async (page) => {
    setLoading(true);
    let q;
  

    if (page === 1) {
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
    }));

    setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setNews(newsList);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews(page);
  }, []);

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };


    console.log("the news ", news)


    if (loading){
        return(
            <div   className='w-full h-screen flex items-center justify-center'>
            <p  className='uppercase text-xl'>Loading ....</p>
            </div>
        )
    }

  return (
    <>
    <HeaderNav  />
    <div  className='  max-w-7xl  mx-auto'>
        <div  className='h-[30vh] flex items-center justify-center'>
            <h1  className='text-2xl font-semibold'>Web3 news (Web3 新闻一览)</h1>
        </div>
        <div  className='flex space-x-10  justify-center'>

        <div  className=' flex flex-col w-full lg:w-6/12  max-w-xl  border-dashed p-3  bg-zinc-900 rounded-xl '>
              {news?.map((item, i)  =>  (
                <div  key={i}  className='  border-l-2  border-yellow-100 my-5 p-4'>
                  

                         <div> 
                            <h1  className='font-semibold text-xl my-3'>{item?.otherINFO}</h1>
                            <p>{item?.news}</p>
                          </div>
                          
                          <div> 

                                   {/*  share  icons  here */}
                            
                          </div>
                  </div>
              ))}
 
        </div>
        

    <div  className='w-4/12 hidden lg:flex   border-dashed p-3  bg-zinc-900  rounded-xl'>
         <h1  className='uppercase font-semibold'>Trending</h1>

          </div>
        </div>
    </div>
    </>
  )
}
