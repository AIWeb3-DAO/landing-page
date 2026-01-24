//@ts-nocheck
"use client"
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { supabaseClient } from '@/utils/spClient';
import { logger } from '@/utils/logger';

import Image from 'next/image';

export default function EventPage() {

  const [events, setevents] = useState()
  const [isFetching, setisFetching] = useState(false)
  const [isFetchingError, setisFetchingError] = useState()

  let router = usePathname()
  const pathId = router.split('/').pop();

  logger.log("events", events)
  const handleFetch = async () => {
    setisFetching(true)
    const { data, error } = await supabaseClient
      .from('dot_events')
      .select()
      .eq("id", pathId)
    setevents(data)
    setisFetching(false)

    if (error) {
      setisFetching(false)
      setisFetchingError(error)
      logger.error("something went wrong", error)
    }

  }

  useEffect(() => {

    handleFetch()
  }, [])

  function formatEventTime(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const now = new Date();

    const timeDifference = startDate - now;
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));

    if (minutesDifference <= 0) {
      return "Event ended";
    } else if (minutesDifference <= 60 * 24) {
      const hours = Math.floor(minutesDifference / 60);
      const minutes = minutesDifference % 60;
      return `Starts today at ${startDate.getHours()}:${startDate.getMinutes().toString().padStart(2, '0')}`;
    } else {
      const daysDifference = Math.floor(minutesDifference / (60 * 24));
      return `Starts in ${daysDifference} days at ${startDate.getHours()}:${startDate.getMinutes().toString().padStart(2, '0')}`;
    }
  }

  logger.log("events", events)

  if (isFetching) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <p className='text-xl font-semibold'>Loading...</p>
      </div>
    )
  }
  return (
    <div className='px-0 md:px-3  min-h-screen flex flex-col items-center justify-center  '>
      <h1 className={` text-3xl font-extrabold  my-6 capitalize`}>{events && events[0]?.name}</h1>
      <div className=' flex  lg:flex-row flex-col-reverse space-x-4 max-w-7xl mx-auto w-11/12 items-center justify-center   '>
        <div className='flex flex-col items-center justify-center h-52 md:h-64 lg:h-[60vh] w-full lg:w-2/4 relative'>
          {events && events[0]?.cover && (
            <Image
              src={events[0].cover}
              alt={events[0].name || 'Event cover'}
              fill
              priority
              className='object-cover lg:rounded-lg'
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
          <div className='my-4 w-full relative z-10 mt-auto'>
            <button className='w-full bg-white text-gray-900 py-3 text-xl font-semibold'
              disabled={true}

            >Add to calender</button>

          </div>
        </div>

        <div className='w-full lg:w-2/4 '>
          <div className='flex justify-between items-center p-3  my-2'>
            <h2 className='font-semibold uppercase'>Participants</h2>
            <h2>-----</h2>
          </div>
          <div className='flex justify-between items-center p-3  my-2'>
            <h2 className='font-semibold uppercase'>Raffle</h2>
            <h2>100 DOT</h2>
          </div>
          <div className='flex justify-between items-center p-3  my-2'>
            <h2 className='font-semibold uppercase'>where</h2>
            <h2>twitter space</h2>
          </div>
          <div className='flex justify-between items-center p-3  my-2'>
            <h2 className='font-semibold uppercase'>When</h2>
            <h2>{events && formatEventTime(events[0].starts_at, events[0].ends_at)}</h2>
          </div>
          <div className='flex justify-between items-center p-3  my-2'>
            <h2 className='font-semibold'>Organizer</h2>
            <h2>-----</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
