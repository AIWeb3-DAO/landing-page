import React from 'react'
import { AboutTabs } from './AboutTabs'
import { Hero } from '../Hero'
import HeaderNav from '../Header/HeaderNav'

export default function About() {
  return (
    <>
    <HeaderNav  />
    <div className='w-full h-screen  '>
    
      <AboutTabs    />
    </div>
    </>
  )
}
