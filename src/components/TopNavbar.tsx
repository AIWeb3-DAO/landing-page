"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItemSocial } from "../components/ui/Navbar-menu";
import { cn } from "@/utils/cn";
import { useWalletContext } from "./wallet-context";
import { truncateText } from "@/utils/truncateTxt";
import Identicon from '@polkadot/react-identicon';
import dynamic from 'next/dynamic';
import { motion } from "framer-motion";

const ConnectWallet = dynamic(() => import("./wallet-connect/connectWallet"), {
  ssr: false,
});

export function NavbarDemo() {
  const { accounts, setIsShowConnectModal } = useWalletContext();

  return (
    <div className="w-full flex justify-center fixed top-5 z-50 px-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-4xl relative">
        <Navbar
          accounts={accounts}
          onConnect={() => setIsShowConnectModal(true)}
        />
      </div>
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
        <ConnectWallet />
      </div>
    </div>
  );
}

function Navbar({ className, accounts, onConnect }: { className?: string, accounts: any[], onConnect: () => void }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={cn(
        "relative rounded-full border border-white/10 bg-black/60 shadow-lg backdrop-blur-xl flex items-center justify-between px-6 py-3 space-x-4",
        className
      )}
    >
      {/* Branding / Logo Area could go here */}

      {/* Centered Menu */}
      <div className="flex-1 flex justify-center">
        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="Services">
            <div className="flex flex-col space-y-4 text-sm min-w-[180px]">
              <HoveredLink href="/about">About us</HoveredLink>
              <HoveredLink href="/news">Polkadot news</HoveredLink>
              <HoveredLink href="/blog">Blog & Articles</HoveredLink>
              <HoveredLink href="/videos">Videos</HoveredLink>
              <HoveredLink href="/lova">LOVA</HoveredLink>
              <HoveredLink href="/xlova">X LOVA</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Community">
            <div className="text-sm grid grid-cols-2 gap-6 p-4 min-w-[300px]">
              <ProductItemSocial
                title="Discord"
                href="https://discord.com/invite/pQtZG8UQfk"
                src="/img/discord_logo.png"
                description="Join our Chinese Discord."
              />
              <ProductItemSocial
                title="Telegram (CN)"
                href="https://t.me/aiweb3dao"
                src="/img/TG_logo.png"
                description="Chinese Telegram Group."
              />
              <ProductItemSocial
                title="Telegram (EN)"
                href="https://t.me/aiweb3dao_eng"
                src="/img/TG_logo.png"
                description="English Telegram Group."
              />
              <ProductItemSocial
                title="X (Twitter)"
                href="https://x.com/aiweb3dao"
                src="/img/X_logo.png"
                description="Follow us on X."
              />
            </div>
          </MenuItem>
        </Menu>
      </div>

      {/* Wallet Connection */}
      <div
        className="flex items-center cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 transition-all rounded-full px-4 py-2"
        onClick={onConnect}
      >
        {accounts.length > 0 ? (
          <div className="flex items-center space-x-2">
            <div className="ring-2 ring-primary rounded-full overflow-hidden w-6 h-6">
              <Identicon value={accounts[0]?.address} size={24} theme={"polkadot"} />
            </div>
            <p className="text-sm font-medium text-white">
              {accounts[0]?.address && truncateText(accounts[0]?.address, 6)}
            </p>
          </div>
        ) : (
          <span className="text-sm font-medium text-white">Connect Wallet</span>
        )}
      </div>
    </motion.div>
  );
}
