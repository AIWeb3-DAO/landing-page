"use client"

import React, { useState, useEffect } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { FB_DB } from '@/lib/fbClient';
import { FaXTwitter } from 'react-icons/fa6';
import { FaArrowLeft, FaExternalLinkAlt, FaShareAlt } from 'react-icons/fa';
import HeaderNav from '../Header/HeaderNav';
import { Timestamp } from '@firebase/firestore';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { marked } from 'marked';

interface NewsItem {
  id: string;
  otherINFO: string;
  news: string;
  timestamp: Timestamp;
}

const formatTimestamp = (timestamp: Timestamp | null | undefined): string => {
  if (!timestamp) return '';
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleString();
};

const parseNewsContent = (content: string) => {
  try {
    const parsed = JSON.parse(content);
    if (parsed && typeof parsed === 'object') {
      return parsed;
    }
  } catch (e) {
    // Not JSON
  }
  return null;
};

// Simple Markdown component to safely render markdown to HTML
const Markdown = ({ content, className = '' }: { content: string, className?: string }) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    const parse = async () => {
      const parsed = await marked.parse(content);
      setHtml(parsed);
    };
    parse();
  }, [content]);

  return (
    <div 
      className={`prose prose-invert prose-emerald max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default function NewsDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      if (!id) return;
      try {
        const docRef = doc(FB_DB, "news", id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setNewsItem({ id: docSnap.id, ...docSnap.data() } as NewsItem);
        }
      } catch (error) {
        console.error("Error fetching news detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl animate-pulse">Loading news details...</p>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center space-y-4">
        <p className="text-xl text-gray-400">News item not found</p>
        <Link href="/news" className="text-emerald-400 hover:underline">Back to all news</Link>
      </div>
    );
  }

  const parsedNews = parseNewsContent(newsItem.news);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out this news: ${newsItem.otherINFO}`;

  const shareOnX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <HeaderNav />
      
      <div className="max-w-4xl mx-auto px-4 pt-10">
        <Link href="/news" className="flex items-center text-gray-400 hover:text-emerald-400 transition-colors mb-8 group">
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to News
        </Link>

        <article className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur-sm">
          <header className="mb-8 border-b border-zinc-800 pb-8">
            {parsedNews?.translated_title ? (
              <div className="space-y-2 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {parsedNews.translated_title}
                </h1>
                <h2 className="text-lg text-gray-500 font-medium italic">
                  {parsedNews.original_title}
                </h2>
              </div>
            ) : (
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {newsItem.otherINFO}
              </h1>
            )}
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span className="bg-zinc-800 px-3 py-1 rounded-full">
                {parsedNews?.published_date 
                  ? new Date(parsedNews.published_date).toLocaleString() 
                  : formatTimestamp(newsItem.timestamp)}
              </span>
              {parsedNews?.source && (
                <span className="flex items-center text-emerald-400">
                  Source: <span className="ml-1 font-medium">{parsedNews.source}</span>
                </span>
              )}
            </div>
          </header>

          <div className="prose prose-invert max-w-none">
            {parsedNews ? (
              <div className="space-y-8">
                {parsedNews.summary_zh && (
                  <div className="bg-zinc-800/80 p-6 rounded-xl border-l-4 border-emerald-500 shadow-inner">
                    <h2 className="text-lg font-semibold text-emerald-400 mb-3 flex items-center">
                      <span className="mr-2">Summary (摘要)</span>
                    </h2>
                    <Markdown content={parsedNews.summary_zh} className="text-gray-200" />
                  </div>
                )}
                
                {parsedNews.content_zh && (
                  <div className="text-lg leading-relaxed text-gray-300">
                    <h2 className="text-xl font-semibold text-white mb-4">Content (详情)</h2>
                    <Markdown content={parsedNews.content_zh} />
                  </div>
                )}

                {parsedNews.link && (
                  <div className="pt-6">
                    <a 
                      href={parsedNews.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl transition-all font-semibold shadow-lg shadow-emerald-900/20"
                    >
                      <span>Read Original Source</span>
                      <FaExternalLinkAlt size={14} />
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <Markdown content={newsItem.news} />
            )}
          </div>

          <footer className="mt-12 pt-8 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 flex items-center">
                <FaShareAlt className="mr-2" />
                Share
              </span>
              <button 
                onClick={shareOnX}
                className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-full transition-all hover:scale-110 active:scale-95"
                title="Share on X"
              >
                <FaXTwitter size={20} />
              </button>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
