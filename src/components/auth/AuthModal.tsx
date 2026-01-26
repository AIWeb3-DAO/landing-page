"use client";

import React, { useState } from "react";
import { FB_AUTH } from "@/lib/fbClient";
import {
    signInWithPopup,
    GoogleAuthProvider,
    sendSignInLinkToEmail
} from "firebase/auth";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Globe, Loader2 } from "lucide-react";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const provider = new GoogleAuthProvider();
            await signInWithPopup(FB_AUTH, provider);
            onClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailLinkLogin = async () => {
        if (!email) {
            setError("Please enter your email");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const actionCodeSettings = {
                url: window.location.origin + "/auth/callback",
                handleCodeInApp: true,
            };

            await sendSignInLinkToEmail(FB_AUTH, email, actionCodeSettings);

            // Save email for callback
            window.localStorage.setItem('emailForSignIn', email);
            setSent(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-black/90 border border-white/10 backdrop-blur-xl sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center text-white">Join the Sanctuary</DialogTitle>
                    <DialogDescription className="text-center text-gray-400">
                        Sign in to start inscribing blessings and earn rewards.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 pt-4">
                    {!sent ? (
                        <>
                            <div className="space-y-2">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-white/5 border-white/10 text-white"
                                />
                                <Button
                                    onClick={handleEmailLinkLogin}
                                    disabled={loading}
                                    className="w-full bg-primary hover:bg-primary/80 text-white font-bold h-12 flex items-center gap-2"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : <Mail size={18} />}
                                    Send Magic Link
                                </Button>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-white/10" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-black px-2 text-gray-500 font-medium">Or continue with</span>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                onClick={handleGoogleLogin}
                                className="w-full border-white/10 text-white font-bold h-12 hover:bg-white/5 flex items-center gap-2"
                            >
                                <Globe size={18} />
                                Sign in with Google
                            </Button>
                        </>
                    ) : (
                        <div className="text-center space-y-4 py-4">
                            <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-2">
                                <Mail size={32} />
                            </div>
                            <p className="text-white font-medium">Check your inbox!</p>
                            <p className="text-sm text-gray-400">
                                We sent a magic link to <b className="text-white">{email}</b>. Click the link to sign in automatically.
                            </p>
                            <Button variant="link" onClick={() => setSent(false)} className="text-primary text-xs">
                                Back to login
                            </Button>
                        </div>
                    )}

                    {error && <p className="text-red-400 text-xs text-center">{error}</p>}
                </div>
            </DialogContent>
        </Dialog>
    );
};
