"use client"


import React, {useState, useEffect} from 'react'
import { useUserContext } from '../UserContext'
import { truncateText, truncateText2 } from '@/utils/truncateTxt';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image';

interface UserData {
  address: string;
  // Add other properties if needed
}

export default function HeaderNav() {
    const [userData, setuserData] = useState<UserData | null>(null)
    const {userProfile}  =  useUserContext()
const {theme, setTheme}  = useTheme()
const [testTruth, settestTruth] = useState(true)


 const handleToggleTheme = ()  =>  {
  if(theme === "light"){
    setTheme("dark")
  }else {
    setTheme("light")
  }
 }
    const fetchUser = async () => {
        try {
          const data = await fetch(`https://got-be.onrender.com/auth/profile/${userProfile?.id}`)
            .then(res => res.json())
            .catch(err => {
              console.log("the error while fetching", err);
              throw err;  // Re-throw the error to be caught in the outer try-catch
            });
      
          console.log("the videos data", data);
          setuserData(data)
          //return data;
        } catch (error) {
          console.log("the error while fetching", error);
          return null;  // Return null or an appropriate fallback value
        }
      };


        useEffect(() => {
          fetchUser()
        },[userProfile])
        

     
  return (
    <div  className=' border-b border-zinc-900 h-[60px] max-w-7xl mx-auto w-full sticky top-0 z-30 flex justify-between items-center px-4 bg-black'>
        
   <Link href={`/`}>
   <Image  src={`/img/logo.png`}  width={40} height={40} alt='logo'   className='object-cover rounded-full' /></Link>

   <div className='flex items-center space-x-2'>
 
     <p className='font-semibold'>{userData &&  truncateText(userData?.address, 30)}</p>
      {! userProfile &&  <Link href={'/login'}  className='py-3 px-5 rounded-2xl border border-green-400'>Connect wallet</Link>}
   </div>
        
        
        </div>
  )
}
