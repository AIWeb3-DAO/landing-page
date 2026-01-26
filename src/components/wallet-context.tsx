"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { BaseWallet, Account } from "@polkadot-onboard/core";
import { useWallets } from "@polkadot-onboard/react";
import { formatBalance } from "@polkadot/util";
import { SubmittableExtrinsic } from "@polkadot/api/types";
import { FB_DB } from "@/lib/fbClient";
import { doc, updateDoc, arrayUnion, getDoc, increment } from "firebase/firestore";

type TokenType = "LOVE" | "LOVA";

type TransferTokensParams = {
  token: TokenType;
  amount: number;
  recipientAddress: string;
  selectedAccount?: string;
  videoId?: string;
  contributor?: string;
  wishId?: string;
  authorWallet?: string;
};

interface WalletContextType {
  accounts: Account[];
  signer: any | null;
  selectedWallet: BaseWallet | null;
  connectWallet: (wallet: BaseWallet) => Promise<void>;
  handleTransferTokens: (params: TransferTokensParams) => Promise<boolean>;
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
  const [isTanssiApiLoading, setIsTanssiApiLoading] = useState<boolean>(true);
  const [isAcalaApiLoading, setIsAcalaApiLoading] = useState<boolean>(true);
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
      // Tanssi API setup
      let tanssiApi: ApiPromise | null = null;
      setIsTanssiApiLoading(true); // Set Tanssi loading state
      try {
        const tanssiProvider = new WsProvider("wss://fraa-flashbox-4642-rpc.a.stagenet.tanssi.network");
        // Add a timeout to avoid hanging indefinitely
        tanssiApi = await Promise.race([
          ApiPromise.create({ provider: tanssiProvider }),
          new Promise<ApiPromise>((_, reject) =>
            setTimeout(() => reject(new Error("Tanssi API connection timed out")), 10000) // 10-second timeout
          ),
        ]);
        setApi(tanssiApi);
        setIsTanssiApiLoading(false); // ✅ Set loading to false on success
      } catch (error) {
        console.error("Failed to initialize Tanssi API:", error);
        setApi(null); // Ensure api is null if initialization fails
        setIsTanssiApiLoading(false); // ✅ Always set loading state to false, even on failure
      }

      // Acala API setup (independent of Tanssi)
      let acalaApi: ApiPromise | null = null;
      setIsAcalaApiLoading(true); // Set Acala loading state
      try {
        const acalaProvider = new WsProvider("wss://acala-rpc-0.aca-api.network");
        // Add a timeout for Acala API as well
        acalaApi = await Promise.race([
          ApiPromise.create({ provider: acalaProvider }),
          new Promise<ApiPromise>((_, reject) =>
            setTimeout(() => reject(new Error("Acala API connection timed out")), 10000) // 10-second timeout
          ),
        ]);
        setApiAcala(acalaApi);
        setIsAcalaApiLoading(false); // ✅ Set loading to false on success
      } catch (error) {
        console.error("Failed to initialize Acala API:", error);
        setApiAcala(null); // Ensure apiAcala is null if initialization fails
        setIsAcalaApiLoading(false); // ✅ Always set loading state to false, even on failure
      }
    };

    setupApis().catch((error) => {
      console.error("Unexpected error during API setup:", error);
      // Ensure both loading states are set to false in case of an unexpected error
      setIsTanssiApiLoading(false);
      setIsAcalaApiLoading(false);
    });

    // ✅ Cleanup function to disconnect WebSocket connections
    return () => {
      if (api) {
        api.disconnect().catch(console.error);
      }
      if (apiAcala) {
        apiAcala.disconnect().catch(console.error);
      }
    };
  }, []);

  // Reconnect wallet from localStorage
  useEffect(() => {
    const savedWalletId = localStorage.getItem("ai3Wallet");
    //console.log("saved wallet", savedWalletId);
    if (wallets && wallets.length > 0 && savedWalletId) {
      reconnectWallet(savedWalletId);
    }
  }, [wallets]);

  //console.log("saved accounts", accounts);

  const reconnectWallet = async (walletId: string) => {
    try {
      const wallet = wallets?.find((w) => w.metadata.id === walletId);
      //console.log("the required wallet", wallet);
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
    //console.log("the added video id", videoId);
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

        //console.log("Contributors and tokens updated");
      }
    } catch (error) {
      console.error("Error updating contributors and tokens:", error);
    }
  };
  // Update wish tips and supporters
  const updateWishTokensAndSupporters = async (wishId: string, amount: number) => {
    try {
      if (FB_DB) {
        const wishRef = doc(FB_DB, "wishes", wishId);
        const wishDoc = await getDoc(wishRef);
        if (wishDoc.exists()) {
          const data = wishDoc.data();
          const newLikes = (data.likesCount || 0) + 1;
          const newTips = (data.tipsValue || 0) + amount;
          const newReposts = data.repostsCount || 0;

          // Recalculate Hotness Score
          const { calculateHotnessScore } = await import("@/utils/wishTreeUtils");
          const newScore = calculateHotnessScore(newLikes, newReposts, newTips, data.timestamp?.seconds);

          await updateDoc(wishRef, {
            tipsValue: newTips,
            likesCount: newLikes,
            rankingScore: newScore
          });
        }
      }
    } catch (error) {
      console.error("Error updating wish tokens:", error);
    }
  };

  const handleTransferTokens = async ({
    token,
    amount,
    recipientAddress,
    selectedAccount,
    videoId,
    contributor,
    wishId,
    authorWallet
  }: TransferTokensParams): Promise<boolean> => {
    setTippingStates((prev) => ({ ...prev, [token]: { ...prev[token], isLoading: true, isSuccess: false } }));

    return new Promise(async (resolve) => {
      try {
        const accountAddress = selectedAccount || accounts[0]?.address;
        if (!accountAddress || !signer) throw new Error("No account or signer available");

        const isWishTip = !!(wishId && authorWallet);
        const treasuryAmount = isWishTip ? amount * 0.15 : amount;
        const authorAmount = isWishTip ? amount * 0.85 : 0;

        if (token === "LOVE" && api?.isReady) {
          const treasuryUnit = toSmallestUnit(treasuryAmount, 12);
          const extrinsics = [
            api.tx.balances.transferKeepAlive(recipientAddress, treasuryUnit)
          ];

          if (isWishTip) {
            const authorUnit = toSmallestUnit(authorAmount, 12);
            extrinsics.push(api.tx.balances.transferKeepAlive(authorWallet, authorUnit));
          }

          const tx = extrinsics.length > 1 ? api.tx.utility.batch(extrinsics) : extrinsics[0];

          await tx.signAndSend(accountAddress, { signer }, ({ status, dispatchError }) => {
            if (dispatchError) {
              setTippingStates((prev) => ({ ...prev, [token]: { isLoading: false, isSuccess: false } }));
              resolve(false);
            } else if (status.isInBlock) {
              if (videoId && contributor) {
                updateContributorsAndTokens(videoId, contributor, amount).then(() => {
                  setTippingStates((prev) => ({ ...prev, [token]: { isLoading: false, isSuccess: true } }));
                  resolve(true);
                });
              } else if (isWishTip) {
                updateWishTokensAndSupporters(wishId, amount).then(() => {
                  setTippingStates((prev) => ({ ...prev, [token]: { isLoading: false, isSuccess: true } }));
                  resolve(true);
                });
              } else {
                setTippingStates((prev) => ({ ...prev, [token]: { isLoading: false, isSuccess: true } }));
                resolve(true);
              }
            }
          });
        } else if (token === "LOVA" && apiAcala?.isReady) {
          const assetId = 18;
          const treasuryUnit = toSmallestUnit(treasuryAmount, 12);
          const extrinsics = [
            apiAcala.tx.currencies.transfer(recipientAddress, { ForeignAsset: assetId }, treasuryUnit)
          ];

          if (isWishTip) {
            const authorUnit = toSmallestUnit(authorAmount, 12);
            extrinsics.push(apiAcala.tx.currencies.transfer(authorWallet, { ForeignAsset: assetId }, authorUnit));
          }

          const tx = extrinsics.length > 1 ? apiAcala.tx.utility.batch(extrinsics) : extrinsics[0];

          await tx.signAndSend(accountAddress, { signer, nonce: -1 }, ({ status, dispatchError }) => {
            if (dispatchError) {
              setTippingStates((prev) => ({ ...prev, [token]: { isLoading: false, isSuccess: false } }));
              resolve(false);
            } else if (status.isInBlock) {
              if (videoId && contributor) {
                updateContributorsAndTokens(videoId, contributor, amount / 15).then(() => {
                  setTippingStates((prev) => ({ ...prev, [token]: { isLoading: false, isSuccess: true } }));
                  resolve(true);
                });
              } else if (isWishTip) {
                updateWishTokensAndSupporters(wishId, amount).then(() => {
                  setTippingStates((prev) => ({ ...prev, [token]: { isLoading: false, isSuccess: true } }));
                  resolve(true);
                });
              } else {
                setTippingStates((prev) => ({ ...prev, [token]: { isLoading: false, isSuccess: true } }));
                resolve(true);
              }
              getBalances();
            }
          });
        } else {
          throw new Error("API not ready or invalid token type");
        }
      } catch (error) {
        console.error(`An error occurred during the ${token} transfer:`, error);
        setTippingStates((prev) => ({ ...prev, [token]: { isLoading: false, isSuccess: false } }));
        resolve(false);
      }
    });
  };

  const getBalances = async () => {
    // Check if the address exists; if not, set both balances to 0
    if (!accounts[0]?.address) {
      setBalances({ LOVE: "0 LOVE", LOVA: "0 LOVA" });
      return;
    }

    // Initialize balances with default values
    let formattedLoveBalance = "0 LOVE";
    let formattedLovaBalance = "0 LOVA";

    // Fetch Tanssi ($LOVE) balance if api is available and ready
    if (api && isTanssiApiLoading) {
      try {
        const { data: loveBalance } = (await api.query.system.account(accounts[0].address) as any);
        formattedLoveBalance = formatBalance(loveBalance?.free || 0, {
          decimals: 12,
          withUnit: "LOVE",
        });
      } catch (error) {
        console.error("Error fetching LOVE balance:", error);
        formattedLoveBalance = "0 LOVE"; // Fallback to 0 if the query fails
      }
    } else {
      console.warn("api is not ready or unavailable. Setting LOVE balance to 0.");
      formattedLoveBalance = "0 LOVE";
    }

    // Update LOVE balance
    setBalances((prev) => ({ ...prev, LOVE: formattedLoveBalance }));

    // Fetch Acala ($LOVA) balance if apiAcala is available and ready
    if (apiAcala && isAcalaApiLoading) {
      try {

        const assetId = 18;
        const lovaBalance = (await apiAcala.query.tokens.accounts(accounts[0].address, { ForeignAsset: assetId })) as any;

        formattedLovaBalance = formatBalance(lovaBalance?.free || 0, {
          decimals: 12,
          withUnit: "LOVA",
        });

        const SpecialparseTokenBalance = (balance: string | undefined) => {
          if (!balance || typeof balance !== "string") return 0;
          const [numericPart, unit] = balance.split(" ");
          const value = Number(numericPart) || 0;

          if (!unit) return value;
          if (unit.toLowerCase().includes("k")) {
            return value * 1000; // Convert "kLOVA" to full LOVA
          } else if (unit.toLowerCase().includes("m")) {
            return value * 1000000; // Handle "MLOVA" if needed
          } else if (unit.toLowerCase().includes("lova")) {
            return value; // Plain "LOVA"
          }
          return value;
        };

        const formattedLovaBalance2 = SpecialparseTokenBalance(formattedLovaBalance);
        formattedLovaBalance = `${formattedLovaBalance2} LOVA`;
      } catch (error) {
        console.error("Error fetching LOVA balance:", error);
        formattedLovaBalance = "0 LOVA"; // Fallback to 0 if the query fails
      }
    } else {
      console.warn("apiAcala is not ready or unavailable. Setting LOVA balance to 0.");
      formattedLovaBalance = "0 LOVA";
    }

    // Update LOVA balance
    setBalances((prev) => ({ ...prev, LOVA: formattedLovaBalance }));
  };

  useEffect(() => {
    getBalances();
  }, [api, apiAcala, accounts]);

  //console.log("nn user balances", balances);
  //console.log("nn tipping states", tippingStates);

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