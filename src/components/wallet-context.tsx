"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { BaseWallet, Account } from "@polkadot-onboard/core";
import { useWallets } from "@polkadot-onboard/react";
import { formatBalance } from "@polkadot/util";
import { SubmittableExtrinsic } from "@polkadot/api/types";
import { FB_DB } from "@/lib/fbClient";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";

type TokenType = "LOVE" | "LOVA";

type TransferTokensParams = {
  token: TokenType;
  amount: number;
  recipientAddress: string;
  selectedAccount?: string;
  videoId?: string;
  contributor?: string;
};

interface WalletContextType {
  accounts: Account[];
  signer: any | null;
  selectedWallet: BaseWallet | null;
  connectWallet: (wallet: BaseWallet) => Promise<void>;
  handleTransferTokens: (params: TransferTokensParams) => Promise<void>;
  balances: Record<TokenType, string | null>;
  tippingStates: Record<TokenType, { isLoading: boolean; isSuccess: boolean }>;
  isShowConnectModal: boolean;
  setIsShowConnectModal: React.Dispatch<React.SetStateAction<boolean>>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [signer, setSigner] = useState<any | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<BaseWallet | null>(null);
  const [api, setApi] = useState<ApiPromise | null>(null); // Tanssi API
  const [apiAcala, setApiAcala] = useState<ApiPromise | null>(null); // Acala API
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [balances, setBalances] = useState<Record<TokenType, string | null>>({
    LOVE: null,
    LOVA: null,
  });
  const [tippingStates, setTippingStates] = useState<
    Record<TokenType, { isLoading: boolean; isSuccess: boolean }>
  >({
    LOVE: { isLoading: false, isSuccess: false },
    LOVA: { isLoading: false, isSuccess: false },
  });
  const [isShowConnectModal, setIsShowConnectModal] = useState(false);
  const { wallets } = useWallets();

  // Setup APIs for Tanssi and Acala
  useEffect(() => {
    const setupApis = async () => {
      // Tanssi API
      const tanssiProvider = new WsProvider("wss://fraa-flashbox-4642-rpc.a.stagenet.tanssi.network");
      const tanssiApi = await ApiPromise.create({ provider: tanssiProvider });
      await tanssiApi.isReady;
      setApi(tanssiApi);

      // Acala API
      const acalaProvider = new WsProvider("wss://acala-polkadot.api.onfinality.io/public-ws");
      const acalaApi = await ApiPromise.create({ provider: acalaProvider });
      await acalaApi.isReady;
      setApiAcala(acalaApi);
    };

    setupApis();
  }, []);

  // Reconnect wallet from localStorage
  useEffect(() => {
    const savedWalletId = localStorage.getItem("ai3Wallet");
    console.log("saved wallet", savedWalletId);
    if (wallets && wallets.length > 0 && savedWalletId) {
      reconnectWallet(savedWalletId);
    }
  }, [wallets]);

  console.log("saved accounts", accounts);

  const reconnectWallet = async (walletId: string) => {
    try {
      const wallet = wallets?.find((w) => w.metadata.id === walletId);
      console.log("the required wallet", wallet);
      if (!wallet) throw new Error("Wallet not found");
      await wallet.connect();
      const accounts = await wallet.getAccounts();
      setAccounts(accounts);
      setSigner(wallet.signer);
      setSelectedWallet(wallet);
    } catch (error) {
      console.error("Failed to reconnect wallet:", error);
    }
  };

  const connectWallet = async (wallet: BaseWallet) => {
    if (!isBusy) {
      try {
        setIsBusy(true);
        await wallet.connect();
        const accounts = await wallet.getAccounts();
        setAccounts(accounts);
        setSelectedWallet(wallet);
        setSigner(wallet.signer);
        localStorage.setItem("ai3Wallet", wallet.metadata.id);
        setIsShowConnectModal(!isShowConnectModal);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      } finally {
        setIsBusy(false);
      }
    }
  };

  const disconnectWallet = async () => {
    localStorage.removeItem("ai3Wallet");
    setSelectedWallet(null);
    setAccounts([]);
    setSigner(null);
    setBalances({ LOVE: null, LOVA: null });
    setTippingStates({
      LOVE: { isLoading: false, isSuccess: false },
      LOVA: { isLoading: false, isSuccess: false },
    });
    setIsShowConnectModal(false);
  };

  function toSmallestUnit(amount: number, decimals: number) {
    return BigInt(Math.round(amount * Math.pow(10, decimals)));
  }

  // Update contributors and tokens in Firestore
  const updateContributorsAndTokens = async (videoId: string, newContributor: string, newToken: number) => {
    console.log("the added video id", videoId);
    try {
      if (FB_DB) {
        const videoDocRef = doc(FB_DB, "youtube", videoId);
        const videoDoc = await getDoc(videoDocRef);

        if (!videoDoc.exists()) {
          console.error("Video document does not exist");
          return;
        }

        const data = videoDoc.data();
        const existingContributors = data.contributors || [];
        const existingTokens = data.tokens || [];

        const totalExistingTokens = existingTokens.reduce((sum: number, token: number) => sum + token, 0);
        const newTokenDistribution = newToken * 0.3;
        const newTokensForExisting = existingTokens.map((token: number) =>
          totalExistingTokens > 0 ? token + (token / totalExistingTokens) * newTokenDistribution : token
        );
        const newTokenForNewContributor = newToken * 0.7;

        const updatedContributors = [...existingContributors, newContributor];
        const updatedTokens = [...newTokensForExisting, newTokenForNewContributor];

        await updateDoc(videoDocRef, {
          contributors: updatedContributors,
          tokens: updatedTokens,
        });

        console.log("Contributors and tokens updated");
      }
    } catch (error) {
      console.error("Error updating contributors and tokens:", error);
    }
  };

  const handleTransferTokens = async ({
    token,
    amount,
    recipientAddress,
    selectedAccount,
    videoId,
    contributor,
  }: TransferTokensParams): Promise<void> => {
    setTippingStates((prev) => ({ ...prev, [token]: { ...prev[token], isLoading: true } }));
    try {
      const accountAddress = selectedAccount || accounts[0]?.address;
      if (!accountAddress || !signer) throw new Error("No account or signer available");

      if (token === "LOVE" && api?.isReady) {
        // Tanssi ($LOVE) transfer
        const smallestUnit = toSmallestUnit(amount, 12);
        const transferExtrinsic: SubmittableExtrinsic<"promise"> = api.tx.balances.transferKeepAlive(
          recipientAddress,
          smallestUnit
        );

        await transferExtrinsic.signAndSend(accountAddress, { signer }, ({ status, txHash, dispatchError }) => {
          if (dispatchError) {
            if (dispatchError.isModule) {
              const decoded = api.registry.findMetaError(dispatchError.asModule);
              console.error(`Transaction failed: ${decoded.section}.${decoded.name} - ${decoded.docs.join(" ")}`);
            } else {
              console.error(`Transaction failed: ${dispatchError.toString()}`);
            }
            setTippingStates((prev) => ({ ...prev, [token]: { isLoading: false, isSuccess: false } }));
          } else if (status.isInBlock) {
            console.log(`Transaction included in block: ${status.asInBlock.toString()}`);
            console.log(`Transaction hash: ${txHash.toString()}`);
            if (videoId && contributor) {
              updateContributorsAndTokens(videoId, contributor, amount).then(() => {
                setTippingStates((prev) => ({ ...prev, [token]: { isLoading: false, isSuccess: true } }));
              });
            } else {
              setTippingStates((prev) => ({ ...prev, [token]: { isLoading: false, isSuccess: true } }));
            }
          } else {
            console.log(`Transaction status: ${status.type}`);
          }
        });
      } else if (token === "LOVA" && apiAcala?.isReady) {
        // Acala ($LOVA) transfer
        const assetId = 18; // LOVA asset ID
        const tokenAmount = toSmallestUnit(amount, 12); // Assuming 12 decimals for LOVA
        const assetTransfer = apiAcala.tx.currencies.transfer(recipientAddress, { ForeignAsset: assetId }, tokenAmount);

        await assetTransfer.signAndSend(accountAddress, { signer, nonce: -1 }, ({ status, txHash, dispatchError }) => {
          if (dispatchError) {
            if (dispatchError.isModule) {
              const decoded = apiAcala.registry.findMetaError(dispatchError.asModule);
              console.error(`Transaction failed: ${decoded.section}.${decoded.name} - ${decoded.docs.join(" ")}`);
            } else {
              console.error(`Transaction failed: ${dispatchError.toString()}`);
            }
            setTippingStates((prev) => ({ ...prev, [token]: { isLoading: false, isSuccess: false } }));
          } else if (status.isInBlock) {
            console.log(`Transaction included in block: ${status.asInBlock.toString()}`);
            console.log(`Transaction hash: ${txHash.toString()}`);
            if (videoId && contributor) {
              updateContributorsAndTokens(videoId, contributor, amount).then(() => {
                setTippingStates((prev) => ({ ...prev, [token]: { isLoading: false, isSuccess: true } }));
              });
            } else {
              setTippingStates((prev) => ({ ...prev, [token]: { isLoading: false, isSuccess: true } }));
            }
          } else {
            console.log(`Transaction status: ${status.type}`);
          }
        });
      } else {
        throw new Error("API not ready or invalid token type");
      }
    } catch (error) {
      console.error(`An error occurred during the ${token} transfer:`, error);
      setTippingStates((prev) => ({ ...prev, [token]: { isLoading: false, isSuccess: false } }));
    }
  };

  const getBalances = async () => {
    if (!accounts[0]?.address || !api?.isReady || !apiAcala?.isReady) return;

    try {
      // Tanssi ($LOVE) balance
      const { data: loveBalance } = await api.query.system.account(accounts[0].address);
      const formattedLoveBalance = formatBalance(loveBalance?.free, {
        decimals: 12,
        withUnit: "LOVE",
      });
      setBalances((prev) => ({ ...prev, LOVE: formattedLoveBalance }));

      // Acala ($LOVA) balance
      const assetId = 18;
      const lovaBalance = await apiAcala.query.tokens.accounts(accounts[0].address, { ForeignAsset: assetId });
      const formattedLovaBalance = formatBalance((lovaBalance as any).free, {
        decimals: 12,
        withUnit: "LOVA",
      });
      setBalances((prev) => ({ ...prev, LOVA: formattedLovaBalance }));
    } catch (error) {
      console.error("Error fetching balances:", error);
    }
  };

  useEffect(() => {
    getBalances();
  }, [api, apiAcala, accounts]);

  console.log("user balances", balances);
  console.log("tipping states", tippingStates);

  return (
    <WalletContext.Provider
      value={{
        accounts,
        signer,
        selectedWallet,
        connectWallet,
        handleTransferTokens,
        balances,
        tippingStates,
        isShowConnectModal,
        setIsShowConnectModal,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext must be used within a WalletProvider");
  }
  return context;
};