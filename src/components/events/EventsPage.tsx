
"use client"
import React, {useState, useEffect} from 'react'
import { usePathname } from 'next/navigation'
import { MdKeyboardArrowLeft } from "react-icons/md";
//import { SUPABASE_KEY, SUPABASE_URL } from '@/constants'
import { FiDatabase } from "react-icons/fi";
import EventCard from './EventCard';
import { supabaseClient } from '@/utils/spClient';


interface Event {
  id: string;
  name: string;
  cover: string;
  project_id: string;
  starts_at: string;
  ends_at: string;
  xp_rewards: number;
  token_rewards: number;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingError, setIsFetchingError] = useState<string | null>(null);

  const handleFetch = async () => {
    setIsFetching(true);
    const { data, error } = await supabaseClient
      .from('dot_events')
      .select();
    
    if (error) {
      setIsFetchingError(error.message);
      console.log("something went wrong", error);
    } else {
      setEvents(data || []);
    }
    
    setIsFetching(false);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  console.log("events", events);

  if (events?.length === 0) {
    return (
      <div className='w-full h-full flex items-center justify-center flex-col space-y-4'>
        <FiDatabase className='w-20 h-20' />
        <p className='text-xl font-semibold'>No events for this category</p>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <p className='text-xl font-semibold'>Loading ... </p>
      </div>
    );
  }

  return (
    <div className='px-2 md:px-3 mt-4 min-h-screen'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {events && events.map((item, i) => (
          <EventCard
            key={i}
            title={item.name}
            cover={item.cover}
            organizer={item.project_id}
            startsAt={item.starts_at}
            endsAt={item.ends_at}
            rewards={item.xp_rewards}
            xp_rewards={item.xp_rewards}
            token_rewards={item.token_rewards}
            eventId={item.id}
          />
        ))}
      </div>
    </div>
  );
}