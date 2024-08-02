//@ts-nocheck

"use client"

import React, {useState, useEffect} from 'react'
import { truncateText2, truncateText } from '@/utils/truncateTxt'
import Link from 'next/link'
import { IoDiamondSharp } from "react-icons/io5";
import { GoGift } from "react-icons/go";
import { MdOutlineVerified } from "react-icons/md";
import { openLinkInNewTab } from '@/utils/cn';
import { supabaseClient } from '@/utils/spClient';
type Props = {
    title : any 
    rewards : any
    cover : any
    organizer : any
    xp_rewards : any
    token_rewards : any
    startsAt : any
    endsAt : any
    eventId : any
}
export default function EventCard({cover, title, rewards, organizer, eventId, startsAt, endsAt} : Props) {
  const [organizerProfile, setorganizerProfile] = useState()
  const [isFetching, setisFetching] = useState(false)
  const [isFetchingError, setisFetchingError] = useState()
    

     function formatEventTime(start, end) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const now = new Date();
    
        const timeDifference = startDate - now;
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    
        if (minutesDifference <= 0) {
            return "this Event is ended";
        } else if (minutesDifference <= 60 * 24) {
            const hours = Math.floor(minutesDifference / 60);
            const minutes = minutesDifference % 60;
            return `Starts today at ${startDate.getHours()}:${startDate.getMinutes().toString().padStart(2, '0')}`;
        } else {
            const daysDifference = Math.floor(minutesDifference / (60 * 24));
            return `Starts in ${daysDifference} days at ${startDate.getHours()}:${startDate.getMinutes().toString().padStart(2, '0')}`;
        }
    }

       const profile = organizerProfile ? organizerProfile[0] : ""
  console.log("org profile", profile)
      const handleFetch = async () =>  {
          setisFetching(true)
          const { data, error } = await supabaseClient
  .from('dot_projects')
  .select()
  .eq('id', organizer)    // Correct

  setorganizerProfile(data)
  setisFetching(false)

  if(error) {
    setisFetching(false)
    setisFetchingError(error)
    console.log("something went wrong", error)
  }
      }

       useEffect(() => {
         if(organizer){
            handleFetch()
         }
       }, [organizer])

      // /project/${profile?.id 
  return (
    <div className='text-gray-300 aspect-[16/9] bg-zinc-800 rounded-xl p-2  cursor-pointer hover:bg-zinc-700'>
        <Link href={`/events/${eventId}`}> <img  src={cover} className='w-full h-36 object-cover rounded-lg'  />  </Link>
          <div className='absolute hidden right-3 top-4 rounded-lg bg-gray-900 px-2 py-0.5'>
            <p>hidden</p>
          </div>
          <div className='my-3'>
             <p className={` font-semibold`}>{title}</p>
          </div>
          <div className='flex justify-between my-3'>
             <div className='flex space-x-1 items-center cursor-pointer' onClick={() => openLinkInNewTab(`https://discover.linkdots.xyz/project/${profile?.id}`)}>
                 <img  src={profile?.project_avatar} 
                   className='w-8 h-8 rounded-full'
                 />
                 <p className='text-sm text-gray-400'>{ profile?.project_name && truncateText( profile?.project_name, 10)}</p>
                 <MdOutlineVerified className='text-yellow-500' />
             </div>

              <div className='flex items-center space-x-2'>
              <IoDiamondSharp className='w-4 h-4 text-gray-600' />
              <GoGift className='w-4 h-4 text-gray-600'  />
              </div>
          </div>
          <div className=' py-1 px-2'>
             <p className='text-gray-400 text-center'>{formatEventTime(startsAt, endsAt)} </p>
          </div>
    </div>
  )
}
