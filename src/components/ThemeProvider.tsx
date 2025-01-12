"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { client } from "@/graphql/client"
import { ApolloProvider } from "@apollo/client"
import { WalletAggregator } from '@polkadot-onboard/core';
import { InjectedWalletProvider } from '@polkadot-onboard/injected-wallets';
import { WalletConnectProvider } from '@polkadot-onboard/wallet-connect';
import { PolkadotWalletsContextProvider, useWallets } from '@polkadot-onboard/react';
import type { WalletConnectConfiguration } from '@polkadot-onboard/wallet-connect';
import { extensionConfig } from "./wallet-connect/extension-config"
const APP_NAME="AI-WEB3 DAO"

import { WalletProvider } from "./wallet-context"
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {

  let injectedWalletProvider = new InjectedWalletProvider(extensionConfig, APP_NAME);
      let walletConnectParams: WalletConnectConfiguration = {
        projectId: '4fae85e642724ee66587fa9f37b997e2',
        relayUrl: 'wss://relay.walletconnect.com',
        metadata: {
          name: 'Polkadot Demo',
          description: 'Polkadot Demo',
          url: '#',
          icons: ['/images/wallet-connect.svg'],
        },
        chainIds: ['polkadot:e143f23803ac50e8f6f8e62695d1ce9e', 'polkadot:91b171bb158e2d3848fa23a9f1c25182'],
        optionalChainIds: ['polkadot:67f9723393ef76214df0118c34bbbd3d', 'polkadot:7c34d42fc815d392057c78b49f2755c7'],
        onSessionDelete: () => {
          // do something when session is removed
        },
      };
      let walletConnectProvider = new WalletConnectProvider(walletConnectParams, APP_NAME);
      let walletAggregator = new WalletAggregator([injectedWalletProvider, walletConnectProvider]);
    
  return (
    <ApolloProvider client={client}>
  <NextThemesProvider {...props}>
  <PolkadotWalletsContextProvider walletAggregator={walletAggregator}>
  
   <WalletProvider>
    {children}
    </WalletProvider>

    </PolkadotWalletsContextProvider>
    </NextThemesProvider>
    </ApolloProvider>
  )
}
