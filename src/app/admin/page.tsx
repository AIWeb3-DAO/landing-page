//@ts-nocheck


"use client"

import { useUserContext } from '@/components/UserContext'
import React, {useState} from 'react'
import { toast } from '@/components/ui/use-toast'
import axios from 'axios'
import HeaderNav from '@/components/Header/HeaderNav'
export default function Page() {
    const [title, settitle] = useState("")
    const [CoverUrl, setCoverUrl] = useState("")
    const [description, setdescription] = useState("")
    const [videoUrl, setvideoUrl] = useState("")
  const [isCreatingNote, setisCreatingNote] = useState(false)
const {userProfile}  = useUserContext()


         // POST  END-POINT


         let postEndPoint = "https://got-be.onrender.com/post/create"
         const handlePostToBack =  async ()  =>  {
    setisCreatingNote(true)
          try {
            
            const result =  await  axios.post(postEndPoint, {
              author : userProfile?.id,
               content : description,
               title : title,
               media : videoUrl
              ,
              // tags : videoTags,
               category : "finance",
               thumbnail : CoverUrl
            })
  
            console.log("created video success", result)
      setisCreatingNote(false)
            
  
            toast({
              title : "New video created ",
              description : "video uploaded succefully "
            })
  
            
            
          } catch (error) {
            alert("something went wrong", error)
            setisCreatingNote(false)
            setisCreatingNote(false)
          }
      
         }
  return (
    <>
    <HeaderNav   />
    <div  className='h-screen flex w-full items-center justify-center'>
         <div   className='w-2/4  border border-red-600 rounded-xl p-4'>
            <h1>add new  video </h1>

   <div className='my-3'>
    <p>Video title</p>
     <input  value={title} onChange={(e) => settitle(e.target.value)}  
     placeholder='Video title'
     className='w-full py-2 px-3'
     />
   </div>
   <div className='my-3'>
    <p>Video description</p>
     <textarea  value={description} onChange={(e) => setdescription(e.target.value)}  
     placeholder='Video title'
     className='w-full py-2 px-3 h-20'
     />
   </div>
   <div className='my-3'>
    <p>Video yoyube url</p>
     <input  value={videoUrl} onChange={(e) => setvideoUrl(e.target.value)}  
     placeholder='Video description'
     className='w-full py-2 px-3'
     />
   </div>
   <div className='my-3'>
    <p>Video cover</p>
     <input  value={CoverUrl} onChange={(e) => setCoverUrl(e.target.value)}  
     placeholder='Video cover '
     className='w-full py-2 px-3'
     />
   </div>

    <button  className='my-4 bg-green-500 w-full py-3 px-5'  onClick={()  => handlePostToBack()}>{isCreatingNote  ?  "creating  video"  :  "create video"}</button>
  
             <div>

             </div>
         </div>
    </div>
    </>
  )
}
