import { NavbarDemo } from '@/components/TopNavbar'
import EventPage from '@/components/events/EventPage'
import React from 'react'

export default function page() {
  return (
    <div>
      <NavbarDemo  />
        <EventPage  />
    </div>
  )
}
