"use client"


import React, { useState, useEffect } from 'react'
import { collection, query, orderBy, limit, getDocs, startAfter } from "firebase/firestore";
import { FB_DB } from '@/lib/fbClient';
import Link from 'next/link';
import { FaShareAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import HeaderNav from '../Header/HeaderNav';
import { Timestamp } from '@firebase/firestore';
import { marked } from 'marked';

interface NewsItem {
  id: string;
  otherINFO: string;
  news: string;
  timestamp: Timestamp;
}

const formatTimestamp = (timestamp: Timestamp | null | undefined): string => {
  if (!timestamp) return '';

  // Assuming timestamp is a Firestore Timestamp object
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleString(); // Customize this as needed
};

const NewsItemDisplay = ({ item, shareOnX }: { item: NewsItem, shareOnX: (item: NewsItem) => void }) => {
  const [summaryHtml, setSummaryHtml] = useState('');
  const [contentHtml, setContentHtml] = useState('');
  const [parsedNews, setParsedNews] = useState<any>(null);

  useEffect(() => {
    const parse = async () => {
      try {
        const parsed = JSON.parse(item.news);
        if (parsed && typeof parsed === 'object') {
          setParsedNews(parsed);
          if (parsed.summary_zh) {
            const html = await marked.parse(parsed.summary_zh);
            setSummaryHtml(html);
          }
        }
      } catch (e) {
        // Not JSON
      }
      
      const html = await marked.parse(item.news);
      setContentHtml(html);
    };
    parse();
  }, [item.news]);

  return (
    <div className='group border-l-4 border-emerald-500/30 hover:border-emerald-500 my-4 p-5 bg-zinc-800/30 rounded-r-xl transition-all hover:bg-zinc-800/50 relative overflow-hidden'>
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            shareOnX(item);
          }}
          className="p-2 bg-zinc-700 hover:bg-emerald-600 rounded-full text-white transition-colors shadow-lg"
          title="Share on X"
        >
          <FaXTwitter size={14} />
        </button>
      </div>
      <Link href={`/news/${item.id}`} className="block">
        <h2 className='font-bold text-xl mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2'>{item?.otherINFO}</h2>
        <div className="flex items-center space-x-3 text-sm text-gray-500 mb-4">
          <span>{new Date(item?.timestamp?.seconds * 1000).toLocaleString()}</span>
          <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
          <span className="flex items-center hover:text-emerald-400">
            Details <FaExternalLinkAlt className="ml-1" size={10} />
          </span>
        </div>
        <div className="">
          {summaryHtml ? (
            <div className="space-y-2">
              <div 
                className="prose prose-invert prose-emerald max-w-none text-emerald-400 font-medium line-clamp-3"
                dangerouslySetInnerHTML={{ __html: summaryHtml }}
              />
              <p className="text-gray-400 text-sm italic">Summary preview</p>
            </div>
          ) : (
            <div 
              className="prose prose-invert prose-emerald max-w-none text-gray-300 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          )}
        </div>
      </Link>
    </div>
  );
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

  const shareOnX = (item: NewsItem) => {
    const shareUrl = `${window.location.origin}/news/${item.id}`;
    const shareText = `Check out this news: ${item.otherINFO}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <HeaderNav />
      <div className='max-w-7xl mx-auto px-4'>
        <div className='h-[30vh] flex flex-col items-center justify-center space-y-4 text-center'>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent'>
            Web3 News (Web3 新闻一览)
          </h1>
          <p className="text-gray-400 max-w-2xl px-4">
            Stay updated with the latest in Web3, blockchain, and decentralized technologies.
          </p>
        </div>
        <div className='flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-10 justify-center'>
          <div className='flex flex-col w-full lg:w-7/12 max-w-2xl border border-zinc-800 p-6 bg-zinc-900/50 backdrop-blur-sm rounded-2xl shadow-xl'>
            {news?.map((item) => (
              <NewsItemDisplay key={item.id} item={item} shareOnX={shareOnX} />
            ))}
          </div>
          <div className='w-full lg:w-4/12 border border-zinc-800 p-6 bg-zinc-900/50 backdrop-blur-sm rounded-2xl shadow-xl sticky top-24 self-start h-fit'>
            <h1 className='uppercase font-bold text-gray-400 mb-6 flex items-center tracking-widest'>
              <span className="w-8 h-[2px] bg-emerald-500 mr-3"></span>
              Trending
            </h1>
            <div className="space-y-6">
              {/* Trending items could go here */}
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-zinc-800 h-10 w-10"></div>
                <div className="flex-1 space-y-3 py-1">
                  <div className="h-2 bg-zinc-800 rounded"></div>
                  <div className="h-2 bg-zinc-800 rounded w-5/6"></div>
                </div>
              </div>
            </div>
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
