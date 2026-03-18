"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FB_DB } from "@/lib/fbClient";
import { collection, query, orderBy, limit, onSnapshot, doc, updateDoc, increment, getDoc } from "firebase/firestore";
import { Wish } from "@/types/wishTree";
import { WishCard } from "./WishCard";
import { MakeAWishForm } from "./MakeAWishForm";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { X, Heart } from "lucide-react";
import Image from "next/image";

import { WishDetailModal } from "./WishDetailModal";
import { useUser } from "../user-context";


export const WishTreeCanvas = () => {
    const [wishes, setWishes] = useState<Wish[]>([]);
    const [selectedWish, setSelectedWish] = useState<Wish | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const searchParams = useSearchParams();

    // Fetch Wishes Real-time
    useEffect(() => {
        if (!FB_DB) return;

        // 1. Primary Query: Sort by Algorithmic Hotness Score
        const qHot = query(
            collection(FB_DB, "wishes"),
            orderBy("rankingScore", "desc"),
            limit(20)
        );

        const unsubscribe = onSnapshot(qHot,
            (snapshot) => {
                const fetchedWishes: Wish[] = [];
                snapshot.forEach((doc) => {
                    fetchedWishes.push({ id: doc.id, ...doc.data() } as Wish);
                });

                // If the primary query is empty, it might be because legacy data lacks 'rankingScore'
                if (fetchedWishes.length === 0) {
                    // 2. Fallback Query: Sort by Timestamp
                    const qFallback = query(
                        collection(FB_DB, "wishes"),
                        orderBy("timestamp", "desc"),
                        limit(20)
                    );
                    onSnapshot(qFallback, (fallbackSnapshot) => {
                        const fallbackWishes: Wish[] = [];
                        fallbackSnapshot.forEach((doc) => {
                            fallbackWishes.push({ id: doc.id, ...doc.data() } as Wish);
                        });
                        if (fallbackWishes.length > 0) setWishes(fallbackWishes);
                    });
                } else {
                    setWishes(fetchedWishes);
                }
            },
            (error) => {
                console.error("Firestore WishTree Error:", error);
                // Potential fallback on index error too
            }
        );

        return () => unsubscribe();
    }, []);

    // Handle Direct Link to Wish
    useEffect(() => {
        if (!searchParams) return;
        const wishId = searchParams.get("wishId");
        if (wishId && FB_DB) {
            const fetchWish = async () => {
                const wishRef = doc(FB_DB, "wishes", wishId);
                const wishSnap = await getDoc(wishRef);
                if (wishSnap.exists()) {
                    setSelectedWish({ id: wishSnap.id, ...wishSnap.data() } as Wish);
                }
            };
            fetchWish();
        }
    }, [searchParams]);

    const { user, consumeCredits, setIsAuthModalOpen } = useUser();

    const handleLike = async (wishId: string) => {
        if (!FB_DB || !wishId) return;

        // Check login
        if (!user) {
            setIsAuthModalOpen(true);
            return;
        }

        // Consume 1 credit for Like
        const success = await consumeCredits(1);
        if (!success) {
            alert("Insufficient credits. Liking requires 1 credit!");
            return;
        }

        const wishRef = doc(FB_DB, "wishes", wishId);

        try {
            const { getDoc } = await import("firebase/firestore");
            const wishDoc = await getDoc(wishRef);

            if (wishDoc.exists()) {
                const data = wishDoc.data();
                const newLikes = (data.likesCount || 0) + 1;

                const { calculateHotnessScore } = await import("@/utils/wishTreeUtils");
                const newScore = calculateHotnessScore(
                    newLikes,
                    data.repostsCount || 0,
                    data.tipsValue || 0,
                    data.timestamp?.seconds
                );

                await updateDoc(wishRef, {
                    likesCount: newLikes,
                    rankingScore: newScore
                });
            }
        } catch (error) {
            console.error("Failed to like/rank wish:", error);
        }
    };


    // Layout strategy: Rank 1 is top/center. Others cascade down.
    const getPosition = (index: number) => {
        // Base Y: Start from 10% (Top) and go down to 80%
        const y = 10 + (index * 3.5);

        // Base X: Center is 50%.
        // Index 0: Center
        // Index 1, 2: Slightly left/right
        // Index 3, 4: Further out
        // Use a sin wave to create a natural "Christmas Tree" or "Cone" spread
        // Alternating Left (-1) and Right (1)
        const side = index % 2 === 0 ? 1 : -1;
        const spreadMultiplier = Math.min(index * 2.5, 40); // Max spread 40%
        const randomJitter = Math.sin(index * 123) * 5; // +/- 5% jitter

        const x = 50 + (side * spreadMultiplier) + randomJitter;

        return { top: `${y}%`, left: `${x}%` };
    };

    return (
        <div
            className="relative w-full h-[90vh] overflow-hidden flex flex-col items-center mt-20 rounded-3xl border border-white/5 shadow-2xl bg-cover bg-center"
            style={{ backgroundImage: `url('/img/wishtree_bg.png')` }}
        >
            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

            {/* Background - The Tree Visualization (Enhanced with new background) */}
            <div className="absolute inset-0 pointer-events-none opacity-40 flex justify-center">
                <div className="absolute bottom-0 w-8 h-full bg-gradient-to-t from-amber-700/50 via-amber-900/20 to-transparent blur-sm" />
                <div className="absolute bottom-1/4 w-[500px] h-[500px] border-t border-amber-800/10 rounded-full" />
                <div className="absolute bottom-0 w-full max-w-lg h-1/2 bg-amber-500/5 blur-[100px]" />
            </div>

            {/* Header */}
            <div className="relative z-10 mt-10 text-center">
                <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-amber-200 to-amber-600 font-serif tracking-widest drop-shadow-sm">
                    神木祈愿殿
                </h2>
                <p className="text-amber-100/60 text-sm md:text-base uppercase tracking-[0.3em] mt-2">
                    Web3 Wish Tree Sanctuary
                </p>
            </div>

            {/* The Leaves (Wishes) */}
            <div className="absolute inset-0 w-full h-full max-w-6xl mx-auto mt-20 pointer-events-none">
                {wishes.length > 0 ? (
                    wishes.map((wish, index) => {
                        const pos = getPosition(index);
                        return (
                            <div key={wish.id} className="absolute pointer-events-auto hover:z-50 transition-all duration-1000 ease-in-out" style={{ ...pos }}>
                                <WishCard
                                    wish={wish}
                                    onLike={() => handleLike(wish.id!)}
                                    onClick={() => setSelectedWish(wish)}
                                />
                            </div>
                        )
                    })
                ) : (
                    <div className="w-full h-full flex items-center justify-center pointer-events-none">
                        <div className="text-amber-100/20 text-xl font-serif animate-pulse">
                            {FB_DB ? "Seeking blessings in the digital void..." : "Connection to Sanctuary lost..."}
                        </div>
                    </div>
                )}
            </div>

            {/* Wish Detail Modal (Zen Reveal) */}
            <WishDetailModal
                wish={selectedWish}
                onClose={() => setSelectedWish(null)}
                onLike={handleLike}
            />

            {/* Action Button */}
            <div className="absolute bottom-10 z-20">
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                        <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:scale-105 hover:shadow-[0_0_50px_rgba(245,158,11,0.6)] transition-all text-xl flex items-center gap-3 border border-amber-300/30">
                            <span>🙏</span> Inscribe Blessing
                        </button>
                    </DialogTrigger>
                    <DialogContent className="bg-black/90 border border-white/10 backdrop-blur-xl sm:max-w-lg">
                        <div className="absolute right-4 top-4 cursor-pointer" onClick={() => setIsModalOpen(false)}>
                            <X className="w-5 h-5 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4 text-center">Inscribe your Blessing</h2>
                        <MakeAWishForm onClose={() => setIsModalOpen(false)} onSuccess={() => {/* Show confetti */ }} />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};
