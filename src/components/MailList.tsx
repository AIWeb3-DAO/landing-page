"use client";
import React from "react";
import { BackgroundBeams } from "../components/ui/background-beams";

export function JoinMail() {
  return (
    <div className="h-[70vh]  my-5  w-full flex items-center justify-center">
    <div className="h-[30rem] max-w-5xl w-full my-10 rounded-xl bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Join the maillist
        </h1>
        <p></p>
       
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Welcome to Aiweb3, the best transactional email service on the web.
          We provide reliable, scalable, and customizable email solutions for
          your business. Whether you&apos;re sending order confirmations,
          password reset emails, or promotional campaigns, MailJet has got you
          covered.
        </p>
        <div className="flex flex-col gap-2 items-center justify-center  p-2 space-y-3 ">
        <input
          type="text"
          placeholder="hi@manuarora.in"
          className="rounded-lg border p-2 border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700"
        />
      
         <div className=" bg-white text-black w-full flex items-center justify-center max-w-72 mx-auto rounded-xl cursor-pointer  " onClick={() => alert("hello world")}>
          <button className="w-full bg-white py-3 text-black rounded-xl cursor-pointer " onClick={() => alert("hello world")}>Join</button>
         </div>
         </div>
      
      </div>
      

      <BackgroundBeams />
    </div>
    </div>
  );
}

