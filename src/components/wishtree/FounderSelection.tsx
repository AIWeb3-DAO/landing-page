"use client";
import React from "react";
import { FOUNDERS_LIST, Founder } from "@/types/wishTree";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { motion } from "framer-motion";

interface FounderSelectionProps {
    selectedId: string;
    onSelect: (id: string) => void;
}

export const FounderSelection: React.FC<FounderSelectionProps> = ({
    selectedId,
    onSelect,
}) => {
    return (
        <div className="w-full">
            <h3 className="text-lg font-semibold text-gray-200 mb-4 text-center">
                Choose your Guardian &nbsp;
                <span className="text-xs font-normal text-gray-500">(Or upload your own)</span>
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {FOUNDERS_LIST.map((founder) => {
                    const isSelected = selectedId === founder.id;
                    return (
                        <motion.div
                            key={founder.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onSelect(founder.id)}
                            className={cn(
                                "cursor-pointer flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300 relative overflow-hidden group",
                                isSelected
                                    ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                                    : "border-white/10 bg-white/5 hover:border-white/30"
                            )}
                        >
                            {/* Glow Effect */}
                            {isSelected && (
                                <div className="absolute inset-0 bg-primary/10 animate-pulse pointer-events-none" />
                            )}

                            <div className={cn(
                                "relative w-16 h-16 rounded-full overflow-hidden border-2 mb-3",
                                isSelected ? "border-primary" : "border-transparent"
                            )}>
                                {founder.id === "custom" ? (
                                    <div className="w-full h-full bg-white/10 flex items-center justify-center text-2xl">
                                        ?
                                    </div>
                                ) : (
                                    <Image
                                        src={founder.avatarUrl}
                                        alt={founder.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                )}
                            </div>

                            <p className={cn("text-sm font-medium text-center", isSelected ? "text-white" : "text-gray-400")}>
                                {founder.name}
                            </p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
                                {founder.role}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};
