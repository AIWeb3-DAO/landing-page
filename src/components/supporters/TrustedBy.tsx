"use client";
import React from "react";
import Slider from "react-infinite-logo-slider";
import { ecosystems } from "@/constants";

export default function TrustedBy() {
  return (
    <div className="w-full py-12 relative">
      {/* Section Header */}
      <h2 className="text-xl md:text-3xl font-bold text-center text-gray-400 mb-8 uppercase tracking-widest opacity-80">
        Trusted by Leading Parachains
      </h2>

      {/* Marquee Container with Fade Masks */}
      <div className="relative w-full max-w-[100vw] overflow-hidden">
        {/* Gradient Masks */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="py-4">
          <Slider
            width="250px"
            duration={40}
            pauseOnHover={true}
            blurBorders={false}
          >
            {ecosystems.map((item, i) => (
              <Slider.Slide key={i}>
                <div className="group cursor-pointer mx-4">
                  <div className="px-6 py-3 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    <p className="font-medium text-gray-400 text-lg capitalize transition-colors duration-300 group-hover:text-white group-hover:text-glow">
                      {item.name}
                    </p>
                  </div>
                </div>
              </Slider.Slide>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
