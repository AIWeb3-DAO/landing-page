"use client";
import React from "react";
import { cn } from "@/utils/cn";
import { Spotlight } from "../components/ui/SpotLight";
import Image from "next/image";
import { motion } from "framer-motion";

export function Hero2() {
  return (
    <div className="h-screen w-full rounded-md flex md:items-center md:justify-center bg-background antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="rgba(59, 130, 246, 0.5)"
      />

      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 bg-black/80 pointer-events-none" />
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-left"
        >
          <h1 className="text-5xl md:text-8xl font-bold font-sans tracking-tighter leading-tight">
            BUILD <br />
            <span className="text-gradient drop-shadow-2xl">Polkadot Eco</span> <br />
            Together.
          </h1>

          <p className="mt-6 font-normal text-lg text-muted-foreground max-w-lg leading-relaxed">
            <span className="text-primary font-semibold">Vision:</span> Create a vibrant echo-system empowering creators.
            <br />
            <span className="text-primary font-semibold">Values:</span> Love, Content, Community.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="relative group/btn from-primary/20 to-primary/10 block bg-primary text-white rounded-full h-12 font-medium px-8 shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] shadow-primary/30 transition duration-200 hover:shadow-primary/50 hover:-translate-y-1">
              <span className="relative z-20">Start Building</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition duration-500 group-hover/btn:animate-shimmer" />
            </button>

            <button className="px-8 py-3 rounded-full border border-white/10 text-white hover:bg-white/5 transition font-medium">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Right Content - 3D Floater */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative flex justify-center"
        >
          <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] animate-float-slow">
            {/* Glow effect behind visual */}
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            <Image
              src={"/img/value_image.png"}
              layout="fill"
              objectFit="contain"
              alt='AIWeb3 Values'
              className="drop-shadow-2xl relative z-10"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
