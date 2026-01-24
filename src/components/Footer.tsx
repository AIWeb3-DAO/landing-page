"use client";
import { logo, polkadot_logo } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsDiscord, BsTelegram } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-black pt-20 pb-10 overflow-hidden">
      {/* Background Typography */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none opacity-[0.03]">
        <h1 className="text-[15vw] font-bold text-white tracking-widest leading-none">
          AIWEB3
        </h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/10">
                <Image
                  src={logo}
                  layout="fill"
                  objectFit="cover"
                  alt="AIWeb3 Logo"
                />
              </div>
              <span className="text-2xl font-bold tracking-wider text-white">
                AIWeb3 DAO
              </span>
            </div>

            <p className="text-muted-foreground max-w-md leading-relaxed text-lg">
              Empowering content creators with a decentralized X-to-Earn model.
              Building the most supportive and vibrant community in Web3.
            </p>

            <div className="flex items-center space-x-3 bg-white/5 w-fit px-4 py-2 rounded-full border border-white/5">
              <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">
                Powered by
              </span>
              <div className="flex items-center space-x-2">
                <Image
                  src={polkadot_logo}
                  width={24}
                  height={24}
                  className="rounded-full"
                  alt="Polkadot"
                />
                <span className="text-white font-bold">Polkadot</span>
              </div>
            </div>
          </div>

          {/* Links Column */}
          <div className="md:col-span-3 md:col-start-8">
            <h3 className="text-white font-bold text-lg mb-6">Platform</h3>
            <ul className="space-y-4">
              {['About us', 'Events', 'Blog', 'Videos'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(' ', '')}`}
                    className="text-muted-foreground hover:text-primary transition-colors hover:pl-2 duration-200 block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials Column */}
          <div className="md:col-span-3">
            <h3 className="text-white font-bold text-lg mb-6">Community</h3>
            <div className="flex space-x-4">
              <SocialIcon icon={<FaXTwitter />} href="https://x.com/aiweb3dao" />
              <SocialIcon icon={<BsDiscord />} href="https://discord.com/invite/pQtZG8UQfk" />
              <SocialIcon icon={<BsTelegram />} href="https://t.me/aiweb3dao" />
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} AIWeb3 DAO. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white hover:bg-primary hover:border-primary transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-primary/50"
    >
      {icon}
    </a>
  );
}
