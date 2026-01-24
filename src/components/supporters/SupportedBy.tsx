"use client";
import React from "react";
import { investors } from "../../constants";
import Image from "next/image";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariant = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function Supporters() {
  return (
    <div className="w-full px-4 py-20 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          Backed by our <span className="text-gradient">Partners</span>
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {investors.map((items, i) => (
            <motion.div
              key={i}
              variants={itemVariant}
              className="group relative h-[180px] w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="glass-card h-full w-full rounded-2xl flex flex-col items-center justify-center space-y-4 hover:-translate-y-2 transition-transform duration-300 relative z-10 overflow-hidden">
                {/* Glow Element */}
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary/20 blur-[50px] rounded-full group-hover:bg-primary/40 transition-colors" />

                <div className="relative w-16 h-16 rounded-full border border-white/10 p-1 bg-black/50">
                  <Image
                    src={items.logo}
                    width={64}
                    height={64}
                    alt={items.name}
                    className="rounded-full object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>

                <p className="capitalize font-semibold text-lg text-gray-300 group-hover:text-white group-hover:text-glow transition-colors">
                  {items.name}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

