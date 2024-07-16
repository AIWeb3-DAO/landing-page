import React, { useEffect, useState } from 'react';

import Image from 'next/image'
import { collection, getDocs } from 'firebase/firestore';
import { dbPromise } from './firebaseConfig'; // Adjust the import path as needed

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function UpcomingContents() {

  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = () => {
    console.log('Button clicked!');
    // implement the logic here
  };

  const handleButtonClick2 = () => {
    console.log('Button clicked for signing message', inputValue);
    // implement the logic here
  };

  const [videos, setVideos] = useState([]);

  console.log('UpcomingContents component rendered');

  useEffect(() => {
    console.log('useEffect in TestComponent executed');
  }, []);

  // useEffect(() => {
  //   console.log('Firebase API Key:', firebaseConfig.apiKey);
  // }, []);
  
    useEffect(() => {
      const fetchVideos = async () => {
        try {
          const db = await dbPromise;
          if (db) {
            const querySnapshot = await getDocs(collection(db, 'youtube'));
            const videosList = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              const url = new URL(data.youtubeURL);
              const videoId = url.searchParams.get('v');
              if (videoId) {
                videosList.push({
                  id: doc.id,
                  youtubeURL: videoId,
                  author: data.author,
                  contributors: data.contributors || '',
                  tokens: data.tokens,
                });
              } else {
                console.error('Invalid YouTube URL:', data.youtubeURL);
              }
            });
            setVideos(videosList);
          }
        } catch (error) {
          console.error('Error fetching videos:', error);
        }
      };
  
      fetchVideos(); // Call the async function within the useEffect
    }, []);

 
  return (
    <div>

      <button onClick={handleButtonClick} style={{ marginBottom: '20px', padding: '10px', fontSize: '16px' }}>
        Click Me to connect to the wallet
      </button>

      <hr />
      <hr />

      <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter some text for signing the message"
          style={{ marginRight: '10px', padding: '5px', fontSize: '16px' }}
        />

      <button onClick={handleButtonClick2} style={{ marginBottom: '20px', padding: '10px', fontSize: '16px' }}>
        sign a message if you click this button,
      </button>

      <h1>Upcoming Contents</h1>
      <p></p>
      <br />

      <hr />
      <hr />

      <section className="section">
        <h2>我们评判视频的标准是： 作品观看量，点赞量，评论数，获得的赞助数，视频是否有动画，关于波卡的视频比平行链项目的视频评分高，等等。 大家可以根据自己对作品质量的评估，使用discord积分，越早参加，discord的积分获得AIWEB代币空投的比例越高，作品获得奖励获得的分成可能也越高，如果对作品进行赞助，可以获得代币AIWEB之外，还可以获得更多作品的股份，未来其他的赞助会获得收益！</h2>
        <h2>基于这些标准，大家可以去支持最喜欢的作品，获得积分以及未来奖励的分成。初始比例是有100积分，创作者可以选择比例，默认80%创作者，5%给协议国库，15%给大家参与，初始估值10u，如果收到打赏，则会对估值进行重估，创作者占的比例可能会降低。</h2>
        <hr />
        <p className="separator-paragraph">Here&apos;s a paragraph to separate the sections. It provides additional information or context for the upcoming videos.</p>

        <div className="video-grid">
          <div className="video-item">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p>
              This video provides an introduction to Polkadot, explaining its core features and benefits.
              大家可以通过下面命令到discord参与， 使用100积分，这个视频ID是1： !voting 1 100
            </p>
          </div>
          <div className="video-item">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/VYOjWnS4cMY"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p>
              This video delves into Kusama, Polkadot&apos;s canary network, and its importance for developers.
            </p>
          </div>
          <div className="video-item">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/3JZ_D3ELwOQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p>
              Learn about Polkadot&apos;s unique cross-chain communication capabilities in this informative video.
            </p>
          </div>
          <div className="video-item">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/lWA2pjMjpBs"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p>
              This video highlights some of the upcoming features and updates in the Polkadot ecosystem.
            </p>
          </div>
          <div className="video-item">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/5qap5aO4i9A"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p>
              A comprehensive guide to Polkadot&apos;s governance model and how it ensures network security and stability.
            </p>
          </div>
        </div>
      </section>

      <hr />
      <p className="separator-paragraph">Here&apos;s a paragraph to separate the sections. It provides additional information or context for the upcoming videos.</p>

      <section className="section">
        <h2>Another Section with More Videos, this part is coming from the database </h2>
        <div className="video-grid">
          {videos.map((video, index) => (
            <div className="video-item" key={index}>
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${video.youtubeURL}`}
                title={`YouTube video player - ${video.author}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p>{video.description}</p>
            </div>
          ))}
        </div>
      </section>



      <style jsx>{`
        .section {
          margin-bottom: 40px; /* 添加空白空间 */
        }
        .separator-paragraph {
          margin: 20px 0; /* 添加空白空间 */
          text-align: center;
        }
        .video-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
        }
        .video-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .video-item p {
          margin-top: 8px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
