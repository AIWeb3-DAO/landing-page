import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import CommentCard from './CommentCard';


type commentsProps = {
  comments?: Comment[]; // Define comments as an array of Comment type
  profileId?: string;
  videoId?: string;
  loading?: boolean;
};

interface Comment {
  author: string;
  content: string; // Updated from 'text' or 'data' to 'content'
  _id: string; // Assuming _id for unique comment identifier
  createdAt: string; // Assuming createdAt is a string
}

export default function Comments({ videoId, profileId, comments = [] }: commentsProps) {
  const [commentTxt, setcommentTxt] = useState('');
  const [isLoading, setisLoading] = useState(false);


  const handleComment = async () => {
    let postEndPoint = 'https://sapo-rdii.onrender.com/api/comments/create';

    setisLoading(true);

    try {
      const result = await axios.post(postEndPoint, {
        userId: userProfile?.id,
        content: commentTxt,
        postId: videoId,
      });

      console.log('created comment success', result);
      setisLoading(false);
      setcommentTxt(''); // Clear the input after submitting
    } catch (error) {
      alert('Something went wrong');
      console.log('error', error);
      setisLoading(false);
    }
  };

  if (comments?.length < 1 || !comments) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="my-2 flex flex-col items-end justify-end gap-3 w-full">
          <textarea
            value={commentTxt}
            onChange={(e) => setcommentTxt(e.target.value)}
            placeholder="Say something about this..."
            className="w-full h-16 no resize-none focus:outline-none border p-2 rounded-xl border-gray-400 dark:border-gray-600 bg-inherit"
          />
          <button
            className="bg-black text-white dark:bg-white dark:text-black py-1.5 px-4 rounded-xl"
            onClick={handleComment}
          >
            Send
          </button>
        </div>
        <div className="flex items-center justify-center flex-col gap-3 mb-2">
          <Image src={`/img/no-comment.svg`} width={400} height={400} alt="no comment" className="w-28 h-28" />
          <h1 className="text-sm">No comments yet. Be the first to comment!</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Comments</h1>

      <div className="my-2 flex flex-col items-end justify-end gap-3">
        <textarea
          value={commentTxt}
          onChange={(e) => setcommentTxt(e.target.value)}
          placeholder="Say something about this..."
          className="w-full h-14 no resize-none focus:outline-none border p-1 rounded-xl border-gray-400 dark:border-gray-600"
        />
        <button
          className="bg-black text-white dark:bg-white dark:text-black py-1.5 px-4 rounded-xl"
          onClick={handleComment}
        >
          {isLoading ? <div className="flex gap-2 items-center"><p className="text-sm">Sending...</p></div> : <p>Send</p>}
        </button>
      </div>

      <div>
        {comments.map((item, i) => (
          <CommentCard key={i} comment={item?.content} creator={item?.author} commentId={item?._id} createdAt={item?.createdAt} />
        ))}
      </div>
    </div>
  );
}
