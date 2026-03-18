"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, updateProfile as updateFBProfile } from "firebase/auth";

import { doc, getDoc, setDoc, onSnapshot, updateDoc, increment } from "firebase/firestore";
import { FB_AUTH, FB_DB } from "@/lib/fbClient";

interface UserData {
    credits: number;
    hasReceivedSignupBonus: boolean;
    walletAddress?: string;
    email: string;
    loginMethods: string[];
    apiKey?: string;
    updatedAt: any;
}

interface UserContextType {
    user: User | null;
    userData: UserData | null;
    loading: boolean;
    consumeCredits: (amount: number) => Promise<boolean>;
    addCredits: (amount: number) => Promise<boolean>;
    updateProfile: (data: { displayName?: string, photoURL?: string }) => Promise<void>;
    isAuthModalOpen: boolean;
    setIsAuthModalOpen: (isOpen: boolean) => void;
}




const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const consumeCredits = async (amount: number): Promise<boolean> => {

        if (!user || !userData) return false;
        if (userData.credits < amount) return false;

        try {
            const userDocRef = doc(FB_DB, "users", user.uid);
            await updateDoc(userDocRef, {
                credits: increment(-amount),
                updatedAt: new Date()
            });
            return true;
        } catch (error) {
            console.error("Error consuming credits:", error);
            return false;
        }
    };

    const addCredits = async (amount: number): Promise<boolean> => {
        if (!user) return false;
        try {
            const userDocRef = doc(FB_DB, "users", user.uid);
            await updateDoc(userDocRef, {
                credits: increment(amount),
                updatedAt: new Date()
            });
            return true;
        } catch (error) {
            console.error("Error adding credits:", error);
            return false;
        }
    };


    const updateProfile = async (data: { displayName?: string, photoURL?: string }) => {
        if (!FB_AUTH.currentUser) return;

        try {
            // 1. Update Firebase Auth Profile
            await updateFBProfile(FB_AUTH.currentUser, data);

            // 2. Update Firestore User Doc
            const userDocRef = doc(FB_DB, "users", FB_AUTH.currentUser.uid);
            await updateDoc(userDocRef, {
                ...data,
                updatedAt: new Date()
            });

            // 3. Update local state
            setUser({ ...FB_AUTH.currentUser });
        } catch (error) {
            console.error("Error updating profile:", error);
            throw error;
        }
    };


    useEffect(() => {

        let unsubscribeData: (() => void) | null = null;

        // Safety timeout: If auth takes too long, stop loading
        const timeout = setTimeout(() => {
            if (loading) setLoading(false);
        }, 5000);

        const unsubscribeAuth = onAuthStateChanged(FB_AUTH, async (currentUser) => {
            if (timeout) clearTimeout(timeout);
            setUser(currentUser);

            // Clean up previous snapshot if it exists
            if (unsubscribeData) {
                unsubscribeData();
                unsubscribeData = null;
            }

            if (currentUser) {
                const userDocRef = doc(FB_DB, "users", currentUser.uid);

                // Listen to User Data in Real-time
                unsubscribeData = onSnapshot(userDocRef,
                    (docSnap) => {
                        if (docSnap.exists()) {
                            setUserData(docSnap.data() as UserData);
                        } else {
                            // First time user initialization (Async fire and forget)
                            const initialData: UserData = {
                                credits: 100,
                                hasReceivedSignupBonus: true,
                                email: currentUser.email || "",
                                loginMethods: currentUser.providerData.map(p => p.providerId).filter(id => !!id),
                                updatedAt: new Date()
                            };
                            setDoc(userDocRef, initialData);
                            setUserData(initialData);
                        }
                        setLoading(false); // Resolved once data is in
                    },
                    (error) => {
                        console.error("User Data Snapshot Error:", error);
                        setLoading(false); // Resolve on error too
                    }
                );
            } else {
                setUserData(null);
                setLoading(false);
            }
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribeData) unsubscribeData();
            if (timeout) clearTimeout(timeout);
        };
    }, []);


    return (
        <UserContext.Provider value={{
            user,
            userData,
            loading,
            consumeCredits,
            addCredits,
            updateProfile,
            isAuthModalOpen,

            setIsAuthModalOpen
        }}>
            {children}
        </UserContext.Provider>
    );
};



export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
