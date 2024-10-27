'use client'
import { sidebarItems } from '@/constants';
import { usePathname } from 'next/navigation';
import React, {useState} from 'react'
import { BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs";
import NavItem from './nav-items';

 type sidebarProps =  {
      isOpen? : unknown
      toggleOpen? : unknown
 }
export default function Sidebar({ } : sidebarProps) {
  const [isOpen, setisOpen] = useState(false)

  const handleToggleIsOpen = () =>  {
    setisOpen(! isOpen)
   }

   const pathName = usePathname()
   console.log("the path name ", pathName)
  return (
<div className={`hidden md:flex   sticky top-0 ${isOpen ? "flex w-[200px]  bg-gray-950 border-r border-gray-700 animate-slideInFromLeft" : ! isOpen ? "w-[65px]  bg-gray-950 border-r border-gray-700 animate-slideOutToLeft " : ""}  top-[0px]  h-[calc(100vh-0px)]  `}>
 
 <div className=' h-full w-full relative'>


   <div className={`text-white absolute ${isOpen ? "left-[93%]" : "left-[85%]"}   my-2 bg-gray-800 w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer`}>
     {isOpen  ? (
   <BsChevronDoubleLeft onClick={handleToggleIsOpen} />
     ) : (
         <BsChevronDoubleRight onClick={handleToggleIsOpen} />
     )}
   </div>

     <div className={`mt-14 px-1 text-gray-300`}>
     {sidebarItems.map((item, i) =>  (
     <NavItem  route={pathName}  item={item} isOpen={isOpen} key={i}  />
     ))}
     </div>
   </div>
</div>
  )
}