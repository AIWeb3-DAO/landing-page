import NewsDetailPage from '@/components/news/NewsDetailPage'
import { adminDb } from '@/lib/fbAdmin'
import { Metadata } from 'next'
import React from 'react'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id
  
  try {
    const docSnap = await adminDb.collection("news").doc(id).get();
    
    if (docSnap.exists) {
      const data = docSnap.data();
      let title = data?.otherINFO || "Web3 News";
      let description = "Stay updated with the latest in Web3 and blockchain.";
      
      try {
        const parsed = JSON.parse(data?.news);
        if (parsed && typeof parsed === 'object') {
          title = parsed.translated_title || parsed.original_title || title;
          description = parsed.summary_zh || parsed.content_zh?.substring(0, 160) || description;
        }
      } catch (e) {
        // Not JSON, use plain text
        description = data?.news?.substring(0, 160) || description;
      }

      return {
        title: `${title} | AiWeb3 News`,
        description: description,
        openGraph: {
          title: title,
          description: description,
          type: 'article',
          publishedTime: data?.timestamp?.toDate().toISOString(),
          siteName: 'AiWeb3',
        },
        twitter: {
          card: 'summary_large_image',
          title: title,
          description: description,
        },
      }
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return {
    title: "Web3 News | AiWeb3",
    description: "Latest updates from the Web3 space.",
  }
}

export default function page() {
  return (
    <NewsDetailPage />
  )
}
