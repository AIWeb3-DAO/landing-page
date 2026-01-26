"use client";

import React, { useState } from "react";
import { useUser } from "@/components/user-context";
import { useWalletContext } from "@/components/wallet-context";
import { Button } from "@/components/ui/button";
import { Coins, Zap, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const PACKAGES = [
    { id: "starter", name: "Novice Energy", credits: 50, price: 100, icon: <Zap className="text-blue-400" /> },
    { id: "pro", name: "Acolyte Surge", credits: 250, price: 450, icon: <Zap className="text-purple-400" />, save: "10%" },
    { id: "master", name: "High Priest Zeal", credits: 1000, price: 1600, icon: <Zap className="text-amber-400" />, save: "20%", popular: true },
];

export default function CreditPurchasePage() {
    const { user, addCredits, setIsAuthModalOpen } = useUser();
    const { accounts, handleTransferTokens, tippingStates } = useWalletContext();
    const [buyingId, setBuyingId] = useState<string | null>(null);

    const handleBuy = async (pkg: typeof PACKAGES[0]) => {
        if (!user) {
            setIsAuthModalOpen(true);
            return;
        }

        if (accounts.length === 0) {
            alert("Please connect your Polkadot wallet to proceed.");
            return;
        }

        try {
            setBuyingId(pkg.id);

            // 1. Process LOVA Payment
            // Treasury address used for all energy purchases
            await handleTransferTokens({
                token: "LOVA",
                amount: pkg.price,
                recipientAddress: "5DPVjCxjTHK4MfWf1HBYbqSCXTpyTw5mtijuvjdsttNvWyHT",
            });

            // 2. Add Credits on Success
            const success = await addCredits(pkg.credits);
            if (success) {
                alert(`Ritual complete! ${pkg.credits} Energy added to your account.`);
            }
        } catch (error) {
            console.error("Purchase failed:", error);
        } finally {
            setBuyingId(null);
        }
    };

    return (
        <main className="min-h-screen bg-black pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full text-amber-500 text-xs font-bold uppercase tracking-widest">
                        <Zap size={14} /> Energy Marketplace
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                        Power your <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500">Blessings</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        Inscribing cards and supporting others consumes energy. Recharge your soul to keep the WishTree vibrant.
                    </p>
                </div>

                {/* Packages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PACKAGES.map((pkg) => (
                        <motion.div
                            key={pkg.id}
                            whileHover={{ y: -5 }}
                            className={`relative bg-white/5 border rounded-3xl p-8 flex flex-col justify-between transition-all ${pkg.popular ? "border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.15)] bg-amber-500/5" : "border-white/10"
                                }`}
                        >
                            {pkg.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[10px] font-black uppercase px-3 py-1 rounded-full whitespace-nowrap">
                                    Most Vibrant
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="p-3 bg-white/5 rounded-2xl w-fit">
                                    {pkg.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                                    <p className="text-gray-500 text-sm">{pkg.credits} Credits</p>
                                </div>
                            </div>

                            <div className="mt-8 space-y-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-black text-white">{pkg.price}</span>
                                    <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">LOVA</span>
                                    {pkg.save && (
                                        <span className="ml-2 text-xs text-green-400 font-bold bg-green-400/10 px-2 py-0.5 rounded">
                                            Save {pkg.save}
                                        </span>
                                    )}
                                </div>

                                <Button
                                    onClick={() => handleBuy(pkg)}
                                    disabled={buyingId === pkg.id || tippingStates.LOVA.isLoading}
                                    className={`w-full rounded-2xl h-12 font-bold transition-all ${pkg.popular
                                            ? "bg-amber-500 hover:bg-amber-600 text-black"
                                            : "bg-white/10 hover:bg-white/20 text-white"
                                        }`}
                                >
                                    {buyingId === pkg.id ? <Loader2 className="animate-spin" /> : "Purchase Energy"}
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Info Footer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-white/5">
                    <div className="flex gap-4">
                        <div className="p-3 bg-white/5 rounded-2xl h-fit">
                            <ShieldCheck className="text-green-400" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-1">Secure Offering</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Payments are handled through the Acala Network. Ensure you have LOVA in your connected Polkadot wallet.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="p-3 bg-white/5 rounded-2xl h-fit">
                            <Coins className="text-amber-400" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-1">Instant Energy</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Credits are applied immediately to your Sanctuary account after the transaction is confirmed on-chain.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
