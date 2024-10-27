"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../../components/ui/Navbar-menu";
import { cn } from "@/lib/utils";


export function HomeNavbar() {

  return (

    <div className="relative  flex items-center justify-center w-full">
      <Navbar className="top-2" />
      
    

    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);




  return (
    <div className="flex justify-between w-full  h-24 sticky top-0 z-40 items-center px-3">
       
    <div
      className={cn("fixed top-10 inset-x-0 border rounded-3xl border-gray-700    max-w-2xl mx-auto z-50", className)}
    >
    
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/about">About us</HoveredLink>
          <HoveredLink href="/home/news">Polkadot news</HoveredLink>
          <HoveredLink href="/blog">Our blog and articles content</HoveredLink>
          <HoveredLink href="/home">Videos content</HoveredLink>
          
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Social">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Discord"
              href="https://discord.com/invite/pQtZG8UQfk"
              src="https://pbs.twimg.com/profile_images/1719768085815803905/Qt-WhTGg_400x400.jpg"
              description="Join our Chinese Discord community."
            />
            <ProductItem
              title="Chinese Telegram"
              href="https://t.me/aiweb3dao"
              src="https://pbs.twimg.com/profile_images/1183117696730390529/LRDASku7_400x400.jpg"
              description="Join our Chinese Telegram community"
            />

            <ProductItem
              title="Eng Telegram"
              href="https://t.me/aiweb3dao_eng"
              src="https://pbs.twimg.com/profile_images/1183117696730390529/LRDASku7_400x400.jpg"
              description="Join our English Telegram community."
            />            
         
          </div>
        </MenuItem>
        {/*}
        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Hobby</HoveredLink>
            <HoveredLink href="/individual">Individual</HoveredLink>
            <HoveredLink href="/team">Team</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem>
  */}
      </Menu>

      
      </div>
   
    </div>
  );
}
