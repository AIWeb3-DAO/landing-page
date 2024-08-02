import React, {useState} from 'react'
import { useRouter } from 'next/navigation';
import { truncateText } from '@/utils/truncateTxt';



type  channelProps = {
    channel?:  any
}
export default function ChannelInfo({channel}: channelProps) {
  const [testTruth, settestTruth] = useState(false)

    const  address =  "6776thjbvff"


  const router = useRouter();


  return (
    <div className='flex justify-between items-center my-3'>
        <div className='flex gap-2 items-center'>
        <div className='w-10 h-10 rounded-full sm:w-14 sm:h-14 lg:w-20 lg:h-20 shadow-2xl '>
        <div className='w-full h-full bg-purple-400 border border-red-400 flex text-2xl items-center justify-center font-extrabold rounded-full text-white'>
              F
           </div>
        </div>
        <div>
             <h1 className='text-sm font-semibold md:font-normal  hover:text-rose-600 md:text-lg'>User name</h1>
              <p className='text-xs md:text-sm font-mono'>10 Followers</p>
        </div>
        <h1 className='text hidden'>{ truncateText( address, 6)}</h1>
        </div>
      
         
              <div className={`bg-green-600 flex gap-3 items-center py-2 px-4 rounded-xl cursor-pointer text-white`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600">
  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
</svg>

<p className='text-sm md:text-lg'>Following</p>
   </div>
            
          
      
  
    </div>
  )
}
