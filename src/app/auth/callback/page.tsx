"use client";

import { useEffect, useState } from "react";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { FB_AUTH } from "@/lib/fbClient";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function AuthCallback() {
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();

    useEffect(() => {
        const handleAuth = async () => {
            if (isSignInWithEmailLink(FB_AUTH, window.location.href)) {
                let email = window.localStorage.getItem("emailForSignIn");

                if (!email) {
                    // Fallback if email is missing from localStorage
                    email = window.prompt("Please provide your email for confirmation");
                }

                try {
                    await signInWithEmailLink(FB_AUTH, email as string, window.location.href);
                    window.localStorage.removeItem("emailForSignIn");
                    setStatus("success");

                    // Redirect home after 2 seconds
                    setTimeout(() => {
                        router.push("/");
                    }, 2000);
                } catch (error: any) {
                    console.error("Auth Link Error:", error);
                    setStatus("error");
                    setErrorMsg(error.message);
                }
            } else {
                router.push("/");
            }
        };

        handleAuth();
    }, [router]);

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
            {status === "loading" && (
                <div className="space-y-4">
                    <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
                    <h1 className="text-2xl font-bold text-white">Completing login...</h1>
                    <p className="text-gray-400">Verifying your magic link, one moment.</p>
                </div>
            )}

            {status === "success" && (
                <div className="space-y-4">
                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
                    <h1 className="text-2xl font-bold text-white">Welcome Back!</h1>
                    <p className="text-gray-400">Success! Redirecting you to the sanctuary...</p>
                </div>
            )}

            {status === "error" && (
                <div className="space-y-4 max-w-sm">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
                    <h1 className="text-2xl font-bold text-white">Login Failed</h1>
                    <p className="text-red-400 text-sm">{errorMsg}</p>
                    <button
                        onClick={() => router.push("/")}
                        className="px-6 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all font-medium"
                    >
                        Try Again
                    </button>
                </div>
            )}
        </div>
    );
}
