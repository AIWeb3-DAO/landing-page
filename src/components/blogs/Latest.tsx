//@ts-nocheck

"use client"
import { cn } from "@/utils/cn";
import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { GET_LATEST_BLOG } from "@/graphql/getLatestBlogs";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { useQuery } from "@apollo/client";
import { IPFS_GATEWAY, latestBlogs, placeholderImg } from "@/constants";
import BlogCard from "./BlogCard";

export function LatestDemo() {
  const {data, loading, error} = useQuery(GET_LATEST_BLOG, {
    variables :{
        "where": {
         "space" : {
           "id_eq" : "10900"
         }
        },
        "orderBy": "createdAtTime_DESC",
        "limit": 4,
        
        
      }
    }

  )

    console.log("the  latest data", data)
  return (
    <div className=" my-4">
         <h1 className={`  text-lg md:text-4xl text-gray-200 font-semibold text-start my-6`}>Recent Articles from Our Team</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-content-center place-items-center">
    {data?.posts?.map((item, i) =>  (
      <BlogCard key={i} title={item.title} cover={`${IPFS_GATEWAY}${item.image}` } description={item.description} upperCounts={2} blog={item} />
    ))}
    </div>
    
    </div>
  );
}
