import { FOUNDERS_LIST, Wish } from "@/types/wishTree";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

interface WishCardProps {
    wish: Wish;
    style?: React.CSSProperties;
    onClick?: () => void;
    onLike?: () => void;
}

const getRankStyles = (likes: number, baseColor: string) => {
    if (likes >= 50) return {
        border: "border-purple-400",
        bg: "bg-gradient-to-br from-purple-900/90 via-black/80 to-pink-900/90",
        glow: "animate-pulse shadow-[0_0_30px_rgba(168,85,247,0.6)]",
        icon: "👑"
    };
    if (likes >= 20) return {
        border: "border-yellow-400",
        bg: "bg-gradient-to-br from-yellow-900/80 via-black/80 to-amber-900/80",
        glow: "shadow-[0_0_20px_rgba(234,179,8,0.5)]",
        icon: "🌟"
    };
    if (likes >= 10) return {
        border: "border-slate-300",
        bg: "bg-gradient-to-br from-slate-800 via-black/80 to-slate-900",
        glow: "shadow-[0_0_15px_rgba(203,213,225,0.4)]",
        icon: "✨"
    };
    return {
        border: "border-white/40", // Brighter default border
        bg: "bg-[#0a0a0a]/90", // Slightly lighter black for visibility
        glow: "shadow-[0_0_10px_rgba(255,255,255,0.1)]",
        icon: ""
    };
};

export const WishCard: React.FC<WishCardProps> = ({ wish, style, onClick, onLike }) => {
    const founder = FOUNDERS_LIST.find((f) => f.id === wish.founderId) || FOUNDERS_LIST[0];
    const rank = getRankStyles(wish.likesCount || 0, founder.colorTheme);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute cursor-pointer group z-20 hover:z-30"
            style={style}
            onClick={onClick}
        >
            {/* The Glow */}
            <div
                className={cn(
                    "absolute -inset-4 opacity-50 blur-xl rounded-full group-hover:opacity-100 transition-opacity duration-500",
                    rank.glow
                )}
                style={!rank.glow ? { backgroundColor: founder.colorTheme } : {}}
            />

            {/* The Card (Leaf) */}
            <div className={cn(
                "relative w-24 h-32 md:w-32 md:h-44 backdrop-blur-xl border rounded-xl overflow-hidden transform group-hover:scale-105 transition-all duration-300 shadow-2xl flex flex-col items-center p-2 border-white/20 group-hover:border-white/60",
                rank.bg,
                rank.border
            )}>
                {/* Ranking Icon */}
                {rank.icon && <div className="absolute top-1 right-1 text-xs z-30">{rank.icon}</div>}

                {/* Top Hole for hanging */}
                <div className="w-2 h-2 bg-black rounded-full absolute top-1.5 left-1/2 -translate-x-1/2 border border-white/40 shadow-inner z-20" />

                {/* Avatar */}
                <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white/20 mt-2">
                    {founder.id === "custom" && wish.customImageUrl ? (
                        <Image src={wish.customImageUrl} fill className="object-cover" alt="Custom" />
                    ) : (
                        <Image src={founder.avatarUrl} fill className="object-cover" alt={founder.name} />
                    )}
                </div>

                {/* Message Preview */}
                <p className="text-[8px] md:text-[10px] text-gray-300 text-center mt-2 line-clamp-3 leading-tight px-1 font-serif italic h-full">
                    &ldquo;{wish.message}&rdquo;
                </p>

                {/* Footer */}
                <div className="mt-auto w-full flex justify-between items-center text-[8px] text-gray-500 border-t border-white/10 pt-1">
                    <span className="opacity-50">{wish.authorWallet.slice(0, 4)}</span>
                    <button
                        className="flex items-center gap-1 text-red-400 hover:text-red-300 hover:scale-110 transition-transform p-1 z-20 font-bold"
                        onClick={(e) => {
                            e.stopPropagation();
                            onLike && onLike();
                        }}
                    >
                        <span>♥</span> {wish.likesCount}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
