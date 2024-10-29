
"use client"
import React from 'react'
import ReactPlayer from 'react-player'
type Props = {
    url : string
}
export default function Player({url}: Props) {
  return (
    <div className='  h-[50vh] xl:h-[90vh]'>
         <ReactPlayer url={`${url}`} 
           
           width={"100%"}
           height={"100%"}
           
         />
      
    </div>
  )
}
