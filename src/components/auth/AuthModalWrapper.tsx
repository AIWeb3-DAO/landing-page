"use client";

import { useUser } from "@/components/user-context";
import { AuthModal } from "./AuthModal";

export const AuthModalWrapper = () => {
    const { isAuthModalOpen, setIsAuthModalOpen } = useUser();
    return (
        <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
        />
    );
};
