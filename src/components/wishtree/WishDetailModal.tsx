"use client";
import React, { useState } from "react";
import { Wish, FOUNDERS_LIST } from "@/types/wishTree";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Sparkles, Fingerprint, Calendar, Share2, Coins } from "lucide-react";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { useWalletContext } from "../wallet-context";
import { doc, updateDoc, increment } from "firebase/firestore";
import { FB_DB } from "@/lib/fbClient";

interface WishDetailModalProps {
    wish: Wish | null;
    onClose: () => void;
    onLike: (id: string) => void;
}

export const WishDetailModal: React.FC<WishDetailModalProps> = ({ wish, onClose, onLike }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const { handleTransferTokens, tippingStates } = useWalletContext();
    const [selectedTipAmount, setSelectedTipAmount] = useState(10);
    const isTanssiTipping = tippingStates["LOVE"]?.isLoading;

    if (!wish) return null;

    const founder = FOUNDERS_LIST.find((f) => f.id === wish.founderId) || FOUNDERS_LIST[0];
    const date = wish.timestamp?.toDate ? wish.timestamp.toDate().toLocaleDateString() : "Just now";

    const handleRepostToX = async () => {
        if (!wish || !wish.id) return;
        const text = `I just supported a blessing on the AIWeb3 WishTree! 🙏\n\n"${wish.message}"\n\nJoin the sanctuary and make your wish:`;
        const url = `${window.location.origin}/?wishId=${wish.id}`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");

        // Log repost and update score
        if (FB_DB) {
            const wishRef = doc(FB_DB, "wishes", wish.id);
            const newReposts = (wish.repostsCount || 0) + 1;

            const { calculateHotnessScore } = await import("@/utils/wishTreeUtils");
            const newScore = calculateHotnessScore(
                wish.likesCount || 0,
                newReposts,
                wish.tipsValue || 0,
                wish.timestamp?.seconds
            );

            await updateDoc(wishRef, {
                repostsCount: newReposts,
                rankingScore: newScore
            });
        }
    };

    const handleTip = async () => {
        if (!wish || !wish.authorWallet) return;
        await handleTransferTokens({
            token: "LOVE",
            amount: selectedTipAmount,
            recipientAddress: "5DPVjCxjTHK4MfWf1HBYbqSCXTpyTw5mtijuvjdsttNvWyHT", // Treasury
            wishId: wish.id,
            authorWallet: wish.authorWallet
        });
    };

    return (
        <AnimatePresence>
            {wish && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
                    />

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
                    >
                        <X size={32} />
                    </button>

                    {/* Card Container */}
                    <div className="relative w-full max-w-[360px] h-[500px] perspective-1000">
                        <motion.div
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={{ duration: 0.8, type: "spring", stiffness: 260, damping: 20 }}
                            className="relative w-full h-full preserve-3d"
                            onClick={() => setIsFlipped(!isFlipped)}
                        >
                            {/* FRONT SIDE */}
                            <div className="absolute inset-0 backface-hidden">
                                <div className={cn(
                                    "w-full h-full glass-card rounded-[2rem] border-2 border-white/20 p-8 flex flex-col items-center justify-between shadow-[0_0_50px_rgba(0,0,0,0.5)]",
                                    "bg-gradient-to-b from-white/10 to-black/40"
                                )}>
                                    {/* Founder Header */}
                                    <div className="flex flex-col items-center">
                                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white/10 mb-4 shadow-xl">
                                            <Image
                                                src={founder.id === "custom" && wish.customImageUrl ? wish.customImageUrl : founder.avatarUrl}
                                                fill
                                                className="object-cover"
                                                alt={founder.name}
                                            />
                                        </div>
                                        <h3 className="text-xl font-bold text-white tracking-widest uppercase">{founder.name}</h3>
                                        <p className="text-xs text-primary font-medium tracking-[0.2em]">{founder.role}</p>
                                    </div>

                                    {/* Message */}
                                    <div className="flex-1 flex items-center justify-center py-8">
                                        <p className="text-xl md:text-2xl text-center text-white font-serif italic leading-relaxed">
                                            &ldquo;{wish.message}&rdquo;
                                        </p>
                                    </div>

                                    {/* Footer Interaction */}
                                    <div className="w-full flex justify-between items-center text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <Heart className="text-red-500 fill-red-500" size={18} />
                                            <span className="font-bold text-lg">{wish.likesCount} Supporters</span>
                                        </div>
                                        <div className="text-[10px] uppercase tracking-widest opacity-50 flex items-center gap-1">
                                            Tap to view details <Sparkles size={10} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* BACK SIDE */}
                            <div className="absolute inset-0 backface-hidden rotate-y-180">
                                <div className="w-full h-full glass-card rounded-[2rem] border-2 border-primary/20 bg-black/90 p-8 flex flex-col justify-between shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                                    <div className="space-y-8">
                                        <h3 className="text-lg font-bold text-primary tracking-widest uppercase border-b border-white/10 pb-4">Provenance</h3>

                                        <div className="space-y-6">
                                            <div className="flex items-start gap-4">
                                                <Fingerprint className="text-primary mt-1" size={20} />
                                                <div>
                                                    <p className="text-[10px] uppercase text-gray-500 tracking-widest">Inscribed By</p>
                                                    <p className="text-sm font-mono text-white break-all">{wish.authorWallet}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4">
                                                <Calendar className="text-primary mt-1" size={20} />
                                                <div>
                                                    <p className="text-[10px] uppercase text-gray-500 tracking-widest">Timestamp</p>
                                                    <p className="text-sm text-white font-medium">{date}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4">
                                                <Sparkles className="text-primary mt-1" size={20} />
                                                <div>
                                                    <p className="text-[10px] uppercase text-gray-500 tracking-widest">Ritual Tier</p>
                                                    <p className="text-sm text-white font-medium">Standard Off-chain Pilgrimage</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                                            <div className="flex gap-2">
                                                {[5, 10, 50].map((amt) => (
                                                    <button
                                                        key={amt}
                                                        onClick={(e) => { e.stopPropagation(); setSelectedTipAmount(amt); }}
                                                        className={cn(
                                                            "px-3 py-1 rounded-lg text-xs font-bold transition-all",
                                                            selectedTipAmount === amt ? "bg-primary text-white scale-110 shadow-lg" : "bg-white/10 text-gray-400"
                                                        )}
                                                    >
                                                        {amt}
                                                    </button>
                                                ))}
                                            </div>
                                            <button
                                                disabled={isTanssiTipping}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleTip();
                                                }}
                                                className="bg-primary/20 hover:bg-primary/40 text-primary px-4 py-2 rounded-xl text-xs font-bold transition-all border border-primary/40 flex items-center gap-2 group"
                                            >
                                                {isTanssiTipping ? "Processing..." : (
                                                    <>
                                                        <Coins size={14} className="group-hover:rotate-12 transition-transform" />
                                                        Send Tip
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRepostToX();
                                                }}
                                                className="flex-1 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-white font-bold transition-all flex items-center justify-center gap-2 group"
                                            >
                                                <Share2 className="group-hover:scale-125 transition-transform" size={18} />
                                                Repost to X
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onLike(wish.id!);
                                                }}
                                                className="flex-1 py-4 bg-red-500/20 hover:bg-red-500/40 rounded-2xl text-red-500 font-bold transition-all flex items-center justify-center gap-2 group border border-red-500/30"
                                            >
                                                <Heart className="group-hover:scale-125 transition-transform fill-current" size={18} />
                                                Consecrate
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};
