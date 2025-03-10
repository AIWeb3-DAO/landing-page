import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  video: any;
};

export default function VideoCard({ video }: Props) {
  const imageUrl = `https://img.youtube.com/vi/${video?.youtubeURL}/sddefault.jpg`;

  return (
    <div className="aspect-[16/9] rounded-xl hover:border bg-gray-800 p-3">
      <Link href={`/videos/${video?.id}`}>
        <Image
          src={imageUrl}
          width={300}
          height={200}
          alt="cover"
          className="w-full object-cover rounded-xl"
          unoptimized // Keep to avoid server-side fetch issues
        />
        <div className="mt-2 ml-2">
          <p className="font-semibold">
            Reward ratio: {video?.currentRatio || 'N/A'} : 1 {video?.description || ''}
          </p>
          <p className="font-semibold">Create by: {video?.author || 'Unknown'}</p>
          <p className="font-semibold">
            Total contributed tokens:{' '}
            {video?.tokens?.length > 0
              ? video.tokens.reduce((sum: number, token: number) => sum + token, 0)
              : 0}
          </p>
          {video?.level && (
            <p className="font-semibold text-green-400">
              🚀 Level {video.level}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}