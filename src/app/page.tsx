import TrustedBy from '@/components/home/ecosystem'
import Footer from '@/components/home/footer'
import { Hero } from '@/components/home/hero'
import { JoinMail } from '@/components/home/join-mail'
import { HomeNavbar } from '@/components/home/landing-navbar'
import Supporters from '@/components/home/supporters'
import React from 'react'

export default function page() {
  return (
    <div className='min-h-screen bg-black'>
      <HomeNavbar  />
      <Hero  />
      <TrustedBy  />
      <Supporters  />
      <JoinMail  />
   
    </div>
  )
}
