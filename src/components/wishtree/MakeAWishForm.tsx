"use client";
import React, { useState } from "react";
import { FounderSelection } from "./FounderSelection";
import { FB_DB } from "@/lib/fbClient";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useWalletContext } from "../wallet-context";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { logger } from "@/utils/logger";
import { cn } from "@/utils/cn";
import { calculateHotnessScore } from "@/utils/wishTreeUtils";
import { useUser } from "../user-context";


export const MakeAWishForm = ({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) => {
    const { accounts, handleTransferTokens, tippingStates } = useWalletContext();
    const { user, consumeCredits, setIsAuthModalOpen } = useUser();
    const [founderId, setFounderId] = useState("vitalik");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);


    const handleWish = async () => {
        if (!message.trim()) {
            setError("Please write a blessing!");
            return;
        }

        // Check User Login
        if (!user) {
            setIsAuthModalOpen(true);
            return;
        }

        if (!accounts || accounts.length === 0) {
            setError("Please connect your wallet to inscribe a blessing.");
            return;
        }

        if (!showConfirm) {
            setShowConfirm(true);
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            if (!FB_DB) throw new Error("Database connection failed");

            // 1. Consume 50 Credits
            const creditSuccess = await consumeCredits(50);
            if (!creditSuccess) {
                setError("Insufficient energy. Ritual requires 50 Energy.");
                setIsSubmitting(false);
                setShowConfirm(false);
                return;
            }

            const initialScore = calculateHotnessScore(0, 0, 0);

            await addDoc(collection(FB_DB, "wishes"), {
                authorWallet: accounts[0].address,
                founderId: founderId,
                message: message,
                timestamp: serverTimestamp(),
                likesCount: 0,
                repostsCount: 0,
                tipsValue: 0,
                rankingScore: initialScore,
                isVisible: true,
            });

            onSuccess();
            onClose();
        } catch (err: any) {
            logger.error("Wish failed", err);
            setError("Ritual failed. Please check your connection and retry.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col space-y-6">
            <FounderSelection selectedId={founderId} onSelect={setFounderId} />

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Your Blessing</label>
                <textarea
                    value={message}
                    onChange={(e) => { setMessage(e.target.value); setShowConfirm(false); }}
                    placeholder="May the code be bug-free and the candles be green..."
                    maxLength={140}
                    className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-600 focus:ring-1 focus:ring-primary focus:border-primary resize-none transition-all"
                />
                <div className="flex justify-between text-xs text-gray-500 font-medium">
                    <span>{message.length}/140</span>
                    <span className="flex items-center gap-1">
                        Ritual Cost: <b className="text-amber-400">50 Energy</b>
                    </span>
                </div>
            </div>

            {error && (
                <p className="text-sm text-center px-4 py-2 rounded-lg text-red-400 bg-red-400/10">
                    {error}
                </p>
            )}

            <div className="flex flex-col gap-2">
                <button
                    onClick={handleWish}
                    disabled={isSubmitting || !message || accounts.length === 0}
                    className={cn(
                        "w-full py-4 rounded-full font-bold text-white shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                        showConfirm
                            ? "bg-gradient-to-r from-amber-500 to-orange-600 shadow-amber-500/20"
                            : "bg-gradient-to-r from-primary to-secondary shadow-primary/20 hover:scale-[1.02]"
                    )}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="animate-spin w-5 h-5" /> Ritual in progress...
                        </>
                    ) : (
                        <>
                            {accounts.length === 0 ? "Connect Wallet to Post" : (
                                <>
                                    <Send className="w-5 h-5" />
                                    {showConfirm ? "Click Again to Confirm (-50 Energy)" : "Inscribe Blessing"}
                                </>
                            )}
                        </>
                    )}
                </button>
                {showConfirm && !isSubmitting && (
                    <button
                        onClick={() => setShowConfirm(false)}
                        className="text-[10px] text-gray-500 uppercase tracking-widest hover:text-white transition-colors text-center"
                    >
                        Go back
                    </button>
                )}
            </div>
        </div>
    );
};

