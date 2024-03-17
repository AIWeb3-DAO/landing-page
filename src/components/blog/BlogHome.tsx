//@ts-nocheck
import { useGetBlogPosts } from '@/hooks/useGetBlogs'
import React from 'react'
import BlogHeader from './BlogHeder'
import BlogCard from './BlogCard'
import Image from 'next/image'
import { useGetBlogPosts2 } from '@/hooks/useGetBlogs2'
export default function BlogHome() {
    const {data, loading, error} = useGetBlogPosts2()
  console.log("the filtered  data", data)

      if(loading) {
        return(
          <div className='w-screen h-screen flex items-center justify-center '>
            <Image  src={`/img/logo.jpg`} width={200} height={200} alt='logo' className='w-12 h-12 rounded-full cursor-pointer animate-spin' />

          </div>
 
        )
      }
  return (
    <div className=''>
        <BlogHeader />
        <div className='flex flex-wrap gap-x-3 items-center justify-center'>
          {data?.posts?.map((post, i) => {

            return(
              <BlogCard  blog={post} key={i} />
            )
          })}
        </div>
        </div>
  )
}
