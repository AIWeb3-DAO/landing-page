import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


 type Props =  {
     video : any
 }
export default function VideoCard({video}  : Props) {
  return (
    <div className='aspect-[16/9]   rounded-xl hover:border border-gray-200  dark:border-gray-700 p-1'>
        <Link href={`/videos/${video?.id}`}>
         <Image  src={`https://www.rapu.xyz/_next/image?url=https%3A%2F%2Fipfs.crossbell.io%2Fipfs%2FQmbvn2XXd9TVTfTRNAgiJGv4WVnPmsJfjMzjNUpoUMwZym&w=1080&q=75`} width={300} height={200} alt='cover'  className='w-full object-cover  rounded-xl' />
          <div  className='mt-2 ml-2'>
          <p className='font-semibold'>This  is  the  video  title </p>
         
          </div>
          </Link>
    </div>
  )
}


   const  contributors  =  [
    {
       address :  "hhahah",
        amount :  100 
    }
   ]