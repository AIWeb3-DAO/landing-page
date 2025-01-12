import { dot } from "@polkadot-api/descriptors";
import { getWsProvider } from "@polkadot-api/ws-provider/web";
import { defineConfig } from "@reactive-dot/core";
import { InjectedWalletProvider } from "@reactive-dot/core/wallets.js";

export const config = defineConfig({
  chains: {
    polkadot: {
      descriptor: dot,
      provider: getWsProvider("wss://polkadot-rpc.publicnode.com"),
    },
  },
  wallets: [new InjectedWalletProvider()],
});