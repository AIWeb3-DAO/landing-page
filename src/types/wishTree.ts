import { Timestamp } from "firebase/firestore";

export interface Founder {
    id: string;
    name: string;
    role: string; // e.g., "The Architect", "The Builder"
    avatarUrl: string; // Path to image
    colorTheme: string; // Hex for card background glow
    quote?: string;
}

export interface Wish {
    id?: string;
    authorWallet: string; // 0x...
    authorName?: string; // Optional nickname
    founderId: string; // 'vitalik', 'gavin', or 'custom'
    message: string;

    // Metadata
    timestamp: Timestamp | any;
    likesCount: number;
    reportsCount: number;
    repostsCount: number;
    tipsValue: number; // Total value of tips in base token
    rankingScore: number; // For hot/trending sort

    // Visuals
    customImageUrl?: string; // If founderId is custom
    cardColor?: string;

    // Moderation
    isVisible: boolean; // Default true, false if reported > threshold
}

export interface WishInteraction {
    userId: string; // Wallet address
    wishId: string;
    type: 'like' | 'report';
    timestamp: number;
}

// Static Data for Founders
export const FOUNDERS_LIST: Founder[] = [
    {
        id: "vitalik",
        name: "Vitalik Buterin",
        role: "The Architect",
        avatarUrl: "/img/founders/vitalik.png",
        colorTheme: "#627EEA", // Ethereum Blue
    },
    {
        id: "gavin",
        name: "Gavin Wood",
        role: "The Builder",
        avatarUrl: "/img/founders/gavin.png",
        colorTheme: "#E6007A", // Polkadot Pink
    },
    {
        id: "satoshi",
        name: "Satoshi",
        role: "The Origin",
        avatarUrl: "/img/founders/satoshi.png",
        colorTheme: "#F7931A", // Bitcoin Orange
    },
    {
        id: "custom",
        name: "Custom / Self",
        role: "The Venturer",
        avatarUrl: "/img/founders/anon.png",
        colorTheme: "#10B981", // Emerald
    }
];
