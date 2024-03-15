

 'use client'
import "../globals.css";
import { ApolloProvider } from '@apollo/client/react'
import { theClient } from "@/graphql/apolloClient";
//import { Theme } from '@radix-ui/themes'
import { Inter } from 'next/font/google'
import NextNProgress from 'nextjs-progressbar';
import { UseInkathonProvider, astar } from '@scio-labs/use-inkathon'
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';

import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
} from 'wagmi/chains';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { locales } from "@/config";
/*export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}*/


export default function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {

  const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum, base, zora],
    [
      //@ts-ignore
      alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'Ai web3 dao',
    projectId: '891863bd3550fa179b8c3037337cd728',
    chains
  });
  
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })
  return (
    <html lang={locale}>
      <body>
      <ApolloProvider client={theClient}>
      <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} modalSize='compact'>
      <UseInkathonProvider defaultChain={astar} appName='Ai web3 dao'>
      <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />

        {children}
        </UseInkathonProvider>
        </RainbowKitProvider>
        </WagmiConfig>
        </ApolloProvider>
        </body>
    </html>
  );
}


