"use client";

import React, { useState, useEffect } from "react";
import { tipTier } from "@/constants";
import { useWalletContext } from "./wallet-context";
import { Loader2 } from "lucide-react";
import { IoCheckmark } from "react-icons/io5";

console.log({
  tipTier,
  useWalletContext,
  Loader2,
  IoCheckmark,
});

type Props = {
  videoId: any;
  contributorAddress: any;
  supportType: string;
};

export default function TipModal({ videoId, contributorAddress, supportType }: Props) {
  const { balances, handleTransferTokens, tippingStates } = useWalletContext();
  const tokenType = supportType === "LOVA in ACALA" ? "LOVA" : "LOVE";
  const tokenBalance = balances[tokenType];
  const isTippingLoading = tippingStates[tokenType].isLoading;
  const isTippingSuccess = tippingStates[tokenType].isSuccess;

  const recipientAddress = "5DPVjCxjTHK4MfWf1HBYbqSCXTpyTw5mtijuvjdsttNvWyHT";
  // const parseTokenBalance = (balance: string | undefined) => {
  //   if (!balance || typeof balance !== "string") return 0;
  //   const numericPart = balance.split(" ")[0];
  //   return Number(numericPart) || 0;
  // };
  const parseTokenBalance = (balance: string | undefined) => {
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

  //console.log("the token balance: ", tokenBalance);

  const safeTokenBalance = parseTokenBalance(tokenBalance);
  const [customAmount, setCustomAmount] = useState(() => {
    const halfBalance = safeTokenBalance / 2;
    return safeTokenBalance > 0 ? Math.min(halfBalance, safeTokenBalance) : 0;
  });

  useEffect(() => {
    const halfBalance = safeTokenBalance / 2;
    setCustomAmount(safeTokenBalance > 0 ? Math.min(halfBalance, safeTokenBalance) : 0);
  }, [safeTokenBalance]);

  const getTokenName = () => (supportType === "LOVA in ACALA" ? "$LOVA" : "$LOVE");

  const handleCustomTransfer = () => {
    console.log("handleCustomTransfer called", { customAmount, safeTokenBalance, tokenType });
    if (customAmount > 0 && customAmount <= safeTokenBalance) {
      handleTransferTokens({
        token: tokenType, // Add token parameter
        amount: customAmount,
        recipientAddress,
        videoId,
        contributor: contributorAddress,
      });
    } else {
      console.log("Transfer blocked: invalid amount", { customAmount, safeTokenBalance });
    }
  };

  const getModalState = () => {
    const state = isTippingLoading
      ? "loading"
      : isTippingSuccess
      ? "success"
      : supportType === "LOVA in ACALA"
      ? "acala"
      : "tanssi";
    console.log("getModalState:", state);
    if (isTippingLoading) {
      return (
        <div className="w-full relative">
          <div className="flex gap-3 flex-wrap items-center justify-center">
            {tipTier?.map((tip, i) => (
              <div
                className="inline-flex flex-col space-y-2 border cursor-pointer border-gray-400 hover:border-text-primary h-20 w-24 py-2 px-2 rounded-lg items-center"
                key={i}
                onClick={() =>
                  handleTransferTokens({
                    token: tokenType, // Add token parameter
                    amount: tip.amount,
                    recipientAddress,
                    videoId,
                    contributor: contributorAddress,
                  })
                }
              >
                <h2 className="text-xl">{tip.emoji}</h2>
                <h2 className="text-sm">{tip.amount} {getTokenName()}</h2>
              </div>
            ))}
          </div>
          <div className="w-full h-full absolute top-0 bg-gray-800/80 rounded-xl z-10 flex items-center justify-center">
            <Loader2 className="w-24 h-24 animate-spin text-white" />
          </div>
        </div>
      );
    } else if (isTippingSuccess) {
      return (
        <div className="w-full h-full flex items-center justify-center flex-col">
          <div className="w-28 h-28 rounded-full flex items-center justify-center bg-green-500">
            <IoCheckmark className="w-20 h-20 text-white" />
          </div>
          <h2 className="text-lg text-center my-4 text-white">Transaction completed successfully, thank you for supporting the content!</h2>
        </div>
      );
    } else {
      if (supportType === "LOVA in ACALA") {
        return (
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white">
            <h1 className="font-sans mb-7 text-2xl text-center">Support this content using LOVA in Acala chain (15 LOVA = 1 point in the pool)</h1>
            <p className="my-4 text-sm text-center">
              💡 Your <span className="text-text-primary font-semibold">Balance is </span>
              <span className="text-blue-400">{safeTokenBalance.toFixed(2)} {getTokenName()}</span>
            </p>
            <div className="flex flex-col items-center">
              <label className="mb-2 text-sm">Select amount ({getTokenName()}):</label>
              <input
                type="range"
                min={safeTokenBalance > 0 ? 0.01 : 0}
                max={safeTokenBalance || 1}
                step="0.01"
                value={customAmount}
                onChange={(e) => setCustomAmount(Number(e.target.value))}
                className="w-full cursor-pointer accent-green-500"
                disabled={safeTokenBalance === 0}
              />
              <p className="text-lg font-semibold mt-2 text-center">{customAmount.toFixed(2)} {getTokenName()}</p>
            </div>
            <button
              onClick={handleCustomTransfer}
              disabled={customAmount <= 0 || customAmount > safeTokenBalance || safeTokenBalance === 0}
              className={`w-full py-2 rounded-lg text-white font-semibold mt-4 transition ${
                customAmount > 0 && customAmount <= safeTokenBalance && safeTokenBalance > 0
                  ? "bg-green-500 hover:bg-green-600 cursor-pointer"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              Send {customAmount.toFixed(2)} {getTokenName()}
            </button>
          </div>
        );
      } else {
        return (
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white">
            <h1 className="font-sans mb-7 text-2xl text-center">Support this content</h1>
            <p className="my-4 text-sm text-center">
              💡 Your <span className="text-text-primary font-semibold">Balance is </span>
              <span className="text-blue-400">{safeTokenBalance.toFixed(2)} {getTokenName()}</span>
            </p>
            <div className="flex gap-3 flex-wrap items-center justify-center">
              {tipTier?.map((tip, i) => (
                <div
                  className="inline-flex flex-col space-y-2 border cursor-pointer border-gray-600 hover:border-text-primary h-20 w-24 py-2 px-2 rounded-lg items-center bg-gray-800"
                  key={i}
                  onClick={() =>
                    handleTransferTokens({
                      token: tokenType, // Add token parameter
                      amount: tip.amount,
                      recipientAddress,
                      videoId,
                      contributor: contributorAddress,
                    })
                  }
                >
                  <h2 className="text-xl">{tip.emoji}</h2>
                  <h2 className="text-sm">{tip.amount} {getTokenName()}</h2>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }
  };

  return <div className="bg-gray-900 p-4 rounded-lg">{getModalState()}</div>;
}