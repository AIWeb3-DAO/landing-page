"use client";

import React, { useState } from "react";
import { useUser } from "./user-context";
import { useWalletContext } from "./wallet-context";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LogOut, Wallet, CreditCard, User as UserIcon, Coins, Loader2 } from "lucide-react";
import { FB_AUTH, FB_DB } from "@/lib/fbClient";
import { doc, updateDoc } from "firebase/firestore";
import { truncateText } from "@/utils/truncateTxt";
import { useRouter } from "next/navigation";

export const UserMenu = () => {
    const { user, userData, loading, setIsAuthModalOpen } = useUser();
    const { accounts, setIsShowConnectModal } = useWalletContext();
    const [binding, setBinding] = useState(false);
    const router = useRouter();


    const handleLogout = () => {
        FB_AUTH.signOut();
    };

    const handleBindWallet = async () => {
        if (!user || accounts.length === 0) return;

        try {
            setBinding(true);
            const userRef = doc(FB_DB, "users", user.uid);
            await updateDoc(userRef, {
                walletAddress: accounts[0].address,
                updatedAt: new Date()
            });
        } catch (error) {
            console.error("Binding failed:", error);
        } finally {
            setBinding(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-8 w-8">
            <Loader2 className="animate-spin text-primary/50" size={16} />
        </div>
    );

    if (!user) {
        return (
            <div className="flex items-center shrink-0">
                <Button
                    variant="outline"
                    onClick={() => setIsAuthModalOpen(true)}
                    className="rounded-full border-white/10 text-white hover:bg-white/5 px-4 h-9 text-xs"
                >
                    Sign In
                </Button>
            </div>
        );
    }


    return (
        <div
            className="relative z-[9999] flex items-center gap-2 shrink-0 pointer-events-auto"
            onPointerDown={() => console.log("UserMenu container clicked")}
        >
            {/* Credits Display */}
            <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                <Coins size={14} className="text-amber-400" />
                <span className="text-xs font-bold text-white tracking-tight">{userData?.credits ?? "..."}</span>
            </div>


            {/* Temporary Logout Button for Debugging */}
            <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="rounded-full border-red-500/50 text-red-500 hover:bg-red-500/10 h-8 text-[10px]"
            >
                Log Out (Debug)
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="relative h-10 w-10 rounded-full border border-white/10 p-0 overflow-hidden ring-offset-black hover:ring-2 ring-primary transition-all cursor-pointer"
                    >
                        {user.photoURL ? (
                            <img src={user.photoURL} alt="Avatar" className="h-full w-full object-cover" />
                        ) : (
                            <div className="h-full w-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                <UserIcon size={20} className="text-white" />
                            </div>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-56 bg-black/90 border-white/10 backdrop-blur-xl text-white z-[100]"
                    align="end"
                    forceMount
                >

                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.displayName || "Sanctuary Native"}</p>
                            <p className="text-xs leading-none text-gray-500">{user.email}</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />

                    <div className="p-2 space-y-2">
                        <div className="flex items-center justify-between px-2 py-1 text-xs text-gray-400">
                            <span>Credits</span>
                            <span className="text-white font-bold">{userData?.credits || 0}</span>
                        </div>
                        <button
                            onClick={() => router.push("/credits")}
                            className="w-full px-2 py-1.5 text-[10px] bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 rounded border border-amber-500/20 text-center uppercase tracking-widest font-bold transition-all cursor-pointer"
                        >
                            Get More Credits ✨
                        </button>
                    </div>

                    <DropdownMenuSeparator className="bg-white/10" />

                    <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer" onClick={() => router.push("/profile")}>
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Profile Settings</span>
                    </DropdownMenuItem>


                    <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer" onClick={() => setIsShowConnectModal(true)}>

                        <Wallet className="mr-2 h-4 w-4" />
                        <span>
                            {accounts.length > 0 ? truncateText(accounts[0].address, 6) : "Connect Wallet"}
                        </span>
                    </DropdownMenuItem>

                    {accounts.length > 0 && userData?.walletAddress !== accounts[0].address && (
                        <DropdownMenuItem
                            className="bg-primary/20 focus:bg-primary/30 text-primary cursor-pointer font-bold"
                            onClick={(e: React.MouseEvent) => { e.preventDefault(); handleBindWallet(); }}
                            disabled={binding}
                        >
                            {binding ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Wallet className="mr-2 h-4 w-4" />}
                            <span>Bind Current Wallet</span>
                        </DropdownMenuItem>
                    )}

                    {userData?.walletAddress && (
                        <div className="px-2 py-1 text-[10px] text-gray-500 text-center italic">
                            Linked: {truncateText(userData.walletAddress, 8)}
                        </div>
                    )}

                    <DropdownMenuSeparator className="bg-white/10" />

                    <DropdownMenuItem className="focus:bg-red-500/10 text-red-500 cursor-pointer" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu >
        </div >
    );
};
