

import React, {useState} from 'react'
//import { useGetVideoComments } from '@/hooks';
import Image from 'next/image';
import { toast } from '../ui/use-toast';
//import { ClipLoader } from 'react-spinners';
//import { WEBSITE_URL } from '@/assets/constant';
import axios from 'axios';

import CommentCard from './CommentCard';
import { useUserContext } from '../UserContext';


type commentsProps = {
  comments ? : any 
  profileId ? : any
  videoId ? : any
  loading ? : any
}
export default function Comments({ videoId, profileId}: commentsProps) {

   const comments = []
  console.log("video comments  from hoooo", comments);
    const [commentTxt, setcommentTxt] = useState("");
    const [isLoading, setisLoading] = useState(false)
    const {userProfile}  = useUserContext()
    //const {refetcchUserInfo}  = useGetUserInfo(userProfile?.id)
  
   const note = {
     characterId : profileId,
     noteId : videoId
   }



     const handleComment = async () => {
      let postEndPoint = "https://sapo-rdii.onrender.com/api/comments/create"

      setisLoading(true)

      try {
            
        const result =  await  axios.post(postEndPoint, {
          userId : userProfile?.id,
           content : commentTxt,
           postId : videoId
        })

        console.log("created comment success", result)
     //refetcchUserInfo()
        
  setisLoading(false)

        /*toast({
          title : "video uploaded",
          description : "video uploaded succefully "
        })*/

        
        
      } catch (error) {
        alert("something went wrong")
        console.log("erroor", error)
        setisLoading(false)
      }


     
      
     }
   if(comments?.length  < 1  || ! comments){
    return(
      <div className=' flex flex-col items-center justify-center'> 
        <div className='my-2 flex flex-col items-end justify-end gap-3 w-full'>
        <textarea  
        value={commentTxt}
        onChange={e => setcommentTxt(e.target.value)}
   placeholder='Say something about this...'
  className='w-full h-16 no resize-none focus:outline-none border p-2 rounded-xl border-gray-400 dark:border-gray-600 bg-inherit'

/>


            <button className='bg-black text-white dark:bg-white dark:text-black py-1.5 px-4 rounded-xl '
   	onClick={
      handleComment
    }
 >Send</button>
            




      </div>
      <div className='flex items-center justify-center flex-col gap-3 mb-2'>
        <Image
      src={`/img/no-comment.svg`}
      width={400}
      height={400}
      alt='no comment'
      className='w-28 h-28'
        />
        <h1 className='text-sm'>No comment Be the First one to comment</h1>
        </div>
        </div>
    )
   }
  return (
    <div>
      <h1>Comments</h1>

      <div className='my-2 flex flex-col items-end justify-end gap-3'>
        <textarea  
         value={commentTxt}
         onChange={e => setcommentTxt(e.target.value)}
   placeholder='Say something about this...'
  className='w-full h-14 no resize-none focus:outline-none border p-1 rounded-xl border-gray-400 dark:border-gray-600'

/>
 <button className='bg-black text-white dark:bg-white dark:text-black py-1.5 px-4 rounded-xl '
   	onClick={handleComment}>{isLoading ? (<div className='flex gap-2 items-center'> <p className='text-sm'>Sending</p> </div>) : <p>Send</p>}</button>
      </div>

      <div>
         {comments?.data?.map((item, i) => (
          <CommentCard  key={i} comment={item?.content} creator={item?.author}  commentId={item?._id} createdAt={item?.createdAt}   />
         ))}
      </div>
    </div>
  )
}
