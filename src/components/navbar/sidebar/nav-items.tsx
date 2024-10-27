import React from 'react'
import Link from 'next/link'

type Props = {
    route : string
    item : any
    isOpen : boolean
}
export default function NavItem({route, item, isOpen} : Props) {
  const isActive = route === item.link;
   const isHome  = route === "/home"
  return (
    <Link  href={item.link}
    className={` hover:bg-gray-800 ${isActive && "bg-gray-800 text-blue-500"} ${isHome && item.link === "/home" ? "bg-gray-800 text-blue-500" : ""} flex  ${isOpen && "space-x-2"} items-center my-4  ${! isOpen && "justify-center"} py-2 px-2 rounded-md`}
    >
 
      <item.icon className={`w-4.5 h-4.5 ${isOpen  && "min-w-4 h-4"}`} />
        <p className={`${! isOpen && "hidden"} text-sm`}>{item.title}</p>
   
     </Link>
  )
}