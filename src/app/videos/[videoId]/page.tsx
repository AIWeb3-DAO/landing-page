import React from 'react';
import { headers } from 'next/headers';
import { FB_DB } from '@/lib/fbClient';
import { doc, getDoc } from 'firebase/firestore';
import { NavbarDemo } from '@/components/TopNavbar';

import FullVideoStats from '@/components/FullVideoStats';
import Player from '@/components/videos/player';
import WalletSubmission from '@/components/videos/WalletSubmission';

export default async function Page() {
  const headerList = headers();

  const currentPath = headerList.get('x-current-path');

  let id = null;

  if (currentPath) {
    try {
      if (currentPath.startsWith('/videos/')) {
        id = currentPath.slice(8); // Extract the part after "/videos/"
      }
      console.log('Extracted ID:', id);
    } catch (error) {
      console.error('Invalid URL in referer:', error);
    }
  } else {
    console.log('No referer header found');
  }

  if (!id) {
    id = 'n6jf4l6wSxaxskzvjO05';
  }

  const fetchData = async () => {
    if (FB_DB && id) {
      try {
        const docRef = doc(FB_DB, 'youtube', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          return docSnap.data();
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    }
    return null;
  };

  const video = await fetchData();

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

  const formatTimestamp = (seconds) => {
    const milliseconds = seconds * 1000;
    const dateObject = new Date(milliseconds);
    return dateObject.toLocaleString();
  };

  const readableTimeStamp = formatTimestamp(video?.timestamp?.seconds);

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
            />
          </div>
        </div>
        <h2 className="hidden xl:block">Related videos</h2>
      </div>
      <WalletSubmission videoId={id} />
    </div>
  );
}
