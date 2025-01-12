import React from "react";
import { cn } from "@/utils/cn";
import { Spotlight } from "../components/ui/SpotLight";
import Image from 'next/image'


export function Hero2() {
  return (
    <div className="   h-[40rem] w-full  items-center justify-center  rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
         
          BUILD <br /> Polkadot eco Together.
        </h1>
        <br />
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
        <b>Vision:</b> Create a vibrant and supportive eco that empowers Chinese content creators, fostering a community that thrives on love, collaboration, and mutual support.
        
        <br />
        <b>Value: Love, Content, Community</b> 
        </p>
        <div className="flex justify-center mt-4">
           <Image src={"/img/value_image.png"} width={300} height={300} alt='logo' />
        </div>
        <br />
        
      </div>
    </div>
  );
}
