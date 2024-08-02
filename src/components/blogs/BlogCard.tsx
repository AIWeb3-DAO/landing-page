import { IPFS_GATEWAY, PLACE_HOLDER } from '@/constants'
import { truncateText, truncateText2 } from '@/utils/truncateTxt'
import Image from 'next/image'
import React from 'react'
import { openLinkInNewTab } from '@/utils/cn'
export default function BlogCard(blog : any) {
  console.log("the  blog", blog)
  return (
    <div className='border border-gray-700 cursor-pointer w-full sm:w-64 md:w-52 lg:w-[300px]  p-2 rounded-md'
    onClick={() => openLinkInNewTab(`https://grillapp.net/10900/${blog?.blog?.id}`)}>  
      {blog?.blog?.image !== null ?  (
        <Image  src={`${IPFS_GATEWAY}${blog?.blog?.image}`} width={200} height={200} alt='cover' className='aspect-video w-full object-cover rounded-lg h-36'   />
      ) : (
        <Image  src={PLACE_HOLDER} width={200} height={200} alt='cover'  className='aspect-video w-full object-cover rounded-lg h-36'  />
   
      )}
      <div className='flex space-y-2 flex-col my-2'>
     <p className=''>{blog?.blog?.title ?  truncateText2(blog?.blog?.title , 30) :  truncateText2(blog?.blog?.summary , 100)}</p>
     <p className=''>{ blog?.blog?.title  && truncateText2(blog?.blog?.summary , 50)}</p>
     </div>

    </div>
  )
}
