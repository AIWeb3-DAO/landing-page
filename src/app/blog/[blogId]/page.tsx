'use client'

import { useGetBlogById } from '@/hooks/useGetBlogById'
import React from 'react'
import { useRouter, usePathname} from 'next/navigation'

export default function Page() {

  const router = useRouter();
  const pathname = usePathname()

   //const {data, loading, error} = useGetBlogById(pathname)

  //   console.log("individula blog", data)
  return (
    <div> This  page  will be  available soon ....</div>
  )
}


