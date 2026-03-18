"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@/components/user-context";
import { useWalletContext } from "@/components/wallet-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    User as UserIcon,
    Mail,
    Wallet,
    Zap,
    ShieldCheck,
    Save,
    LogOut,
    Link as LinkIcon,
    Unlink,
    CheckCircle2,
    Loader2,
    Key,
    Copy,
    RefreshCw,
    Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FB_AUTH } from "@/lib/fbClient";
import Identicon from '@polkadot/react-identicon';
import { truncateText } from "@/utils/truncateTxt";
import { cn } from "@/utils/cn";
import Image from "next/image";

export default function ProfilePage() {
    const { user, userData, loading, updateProfile } = useUser();
    const { accounts, setIsShowConnectModal } = useWalletContext();

    const [displayName, setDisplayName] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
    const [isGeneratingKey, setIsGeneratingKey] = useState(false);
    const [exampleLang, setExampleLang] = useState<'curl' | 'python'>('curl');
    const [isFromFile, setIsFromFile] = useState(false);

    const handleGenerateKey = async () => {
        if (!user) return;
        setIsGeneratingKey(true);
        try {
            const token = await user.getIdToken();
            const res = await fetch("/api/generate-key", { 
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setMessage({ text: "API Key generated successfully!", type: "success" });
            } else {
                setMessage({ text: data.error || "Failed to generate key", type: "error" });
            }
        } catch (error) {
            setMessage({ text: "Failed to connect to server.", type: "error" });
        } finally {
            setIsGeneratingKey(false);
        }
    };

    const handleDeleteKey = async () => {
        if (!user) return;
        if (!confirm("Are you sure you want to delete your API key? Any apps using it will stop working immediately.")) return;
        setIsGeneratingKey(true);
        try {
            const token = await user.getIdToken();
            const res = await fetch("/api/generate-key", { 
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) {
                setMessage({ text: "API Key deleted.", type: "success" });
            } else {
                setMessage({ text: "Failed to delete key", type: "error" });
            }
        } catch (error) {
            setMessage({ text: "Failed to connect to server.", type: "error" });
        } finally {
            setIsGeneratingKey(false);
        }
    };

    const handleCopyKey = () => {
        if (userData?.apiKey) {
            navigator.clipboard.writeText(userData.apiKey);
            setMessage({ text: "API Key copied to clipboard!", type: "success" });
        }
    };

    useEffect(() => {
        if (user?.displayName) {
            setDisplayName(user.displayName);
        }
    }, [user]);

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <Loader2 className="animate-spin text-primary" size={40} />
        </div>
    );

    if (!user) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-4">
                <h1 className="text-2xl text-white font-bold">Please sign in to view your profile</h1>
                <Button onClick={() => window.location.href = "/"}>Return Home</Button>
            </div>
        );
    }

    const handleSave = async () => {
        setIsSaving(true);
        setMessage(null);
        try {
            await updateProfile({ displayName });
            setMessage({ text: "Sanctuary identity updated!", type: "success" });
        } catch (error) {
            setMessage({ text: "Failed to update profile. Please try again.", type: "error" });
        } finally {
            setIsSaving(false);
        }
    };

    const handleLogout = () => {
        FB_AUTH.signOut().then(() => {
            window.location.href = "/";
        });
    };

    return (
        <main className="min-h-screen bg-black pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-center gap-8 bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative">
                            {user.photoURL ? (
                                <Image src={user.photoURL} alt="Avatar" fill className="object-cover" />
                            ) : (
                                <UserIcon size={64} className="text-primary/40" />
                            )}
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-amber-500 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                            {userData?.credits || 0} Energy
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-2">
                        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            {user.displayName || "Sanctuary Resident"}
                        </h1>
                        <p className="text-gray-500 font-mono text-sm">{user.email}</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                            {userData?.loginMethods?.map(method => (
                                <span key={method} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-[10px] text-gray-400 capitalize">
                                    {method}
                                </span>
                            ))}
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10 flex items-center gap-2"
                    >
                        <LogOut size={18} /> Sign Out
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Settings */}
                    <div className="md:col-span-2 space-y-6">
                        <section className="bg-white/5 border border-white/10 p-8 rounded-[2rem] space-y-6">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <ShieldCheck className="text-primary" /> Profile Settings
                            </h3>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Sanctuary Name</label>
                                    <Input
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        placeholder="How shall we address you?"
                                        className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:ring-primary"
                                    />
                                    <p className="text-[10px] text-gray-600">This name will be visible on your blessings and posts.</p>
                                </div>

                                <div className="space-y-2 blur-[1px] opacity-70 cursor-not-allowed">
                                    <label className="text-sm font-medium text-gray-400">Email Address (Managed by Provider)</label>
                                    <Input
                                        value={user.email || ""}
                                        disabled
                                        className="bg-black/20 border-white/5 text-gray-500 h-12 rounded-xl"
                                    />
                                </div>
                            </div>

                            <AnimatePresence>
                                {message && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`p-4 rounded-xl text-sm font-medium flex items-center gap-2 ${message.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                                            }`}
                                    >
                                        {message.type === 'success' ? <CheckCircle2 size={16} /> : <ShieldCheck size={16} />}
                                        {message.text}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <Button
                                onClick={handleSave}
                                disabled={isSaving || displayName === user.displayName}
                                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl flex items-center gap-2"
                            >
                                {isSaving ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                                Save Identity
                            </Button>
                        </section>

                        {/* Developer API Access */}
                        <section className="bg-white/5 border border-white/10 p-8 rounded-[2rem] space-y-6">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Key className="text-primary" /> Developer API Access
                            </h3>
                            <p className="text-xs text-gray-500 leading-relaxed italic">
                                Your API key grants programmatic access to publish articles bypassing the standard interface. Publishing via API consumes 50 Energy per article. Keep this key secret, as anyone with it can spend your energy.
                            </p>

                            {!userData?.apiKey ? (
                                <div className="space-y-4 text-center p-6 border border-white/5 rounded-2xl bg-black/20">
                                    <p className="text-sm font-medium text-gray-400">Generate an API key to get started.</p>
                                    <Button
                                        onClick={handleGenerateKey}
                                        disabled={isGeneratingKey}
                                        className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl"
                                    >
                                        {isGeneratingKey ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Key className="w-4 h-4 mr-2" />}
                                        Generate New API Key
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Your Active API Key</label>
                                        <div className="flex gap-2">
                                            <Input
                                                type="text"
                                                value={userData.apiKey}
                                                readOnly
                                                className="bg-black/40 border-white/10 text-primary font-mono h-12 rounded-xl focus:ring-primary truncate"
                                            />
                                            <Button
                                                onClick={handleCopyKey}
                                                variant="outline"
                                                className="h-12 border-white/10 text-gray-400 hover:text-white bg-white/5"
                                            >
                                                <Copy size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2 mt-4">
                                        <Button
                                            onClick={handleGenerateKey}
                                            disabled={isGeneratingKey}
                                            variant="outline"
                                            className="border-white/10 text-gray-400 hover:text-white text-xs bg-transparent"
                                        >
                                            {isGeneratingKey ? <Loader2 className="animate-spin w-3 h-3 mr-2" /> : <RefreshCw className="w-3 h-3 mr-2" />}
                                            Regenerate
                                        </Button>
                                        <Button
                                            onClick={handleDeleteKey}
                                            disabled={isGeneratingKey}
                                            variant="outline"
                                            className="border-red-500/20 text-red-500 hover:bg-red-500/10 text-xs bg-transparent"
                                        >
                                            <Trash2 className="w-3 h-3 mr-2" />
                                            Delete Key
                                        </Button>
                                    </div>

                                    {/* API Usage Example */}
                                    <div className="mt-8 p-6 bg-black/40 border border-white/10 rounded-2xl space-y-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                                How to use your API Key
                                            </h4>
                                            <div className="flex bg-white/5 rounded-lg p-1 grow-0 self-start">
                                                <button
                                                    onClick={() => setExampleLang('curl')}
                                                    className={cn(
                                                        "px-3 py-1 text-[10px] font-bold rounded-md transition-all",
                                                        exampleLang === 'curl' ? "bg-primary text-white" : "text-gray-500 hover:text-gray-300"
                                                    )}
                                                >
                                                    cURL
                                                </button>
                                                <button
                                                    onClick={() => setExampleLang('python')}
                                                    className={cn(
                                                        "px-3 py-1 text-[10px] font-bold rounded-md transition-all",
                                                        exampleLang === 'python' ? "bg-primary text-white" : "text-gray-500 hover:text-gray-300"
                                                    )}
                                                >
                                                    Python
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 bg-white/5 p-3 rounded-xl">
                                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Example Type:</span>
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => setIsFromFile(false)}
                                                    className={cn("text-[10px] px-2 py-1 rounded border transition-all", !isFromFile ? "border-primary/50 text-white bg-primary/20" : "border-white/5 text-gray-400")}
                                                >
                                                    Direct Text
                                                </button>
                                                <button 
                                                    onClick={() => setIsFromFile(true)}
                                                    className={cn("text-[10px] px-2 py-1 rounded border transition-all", isFromFile ? "border-primary/50 text-white bg-primary/20" : "border-white/5 text-gray-400")}
                                                >
                                                    From .md File
                                                </button>
                                            </div>
                                        </div>

                                        <p className="text-xs text-gray-400">
                                            Send a <code className="text-primary bg-primary/10 px-1 py-0.5 rounded">POST</code> request to <code className="text-white">/api/articles</code> to publish directly. Cost: 50 Energy.
                                        </p>
                                        <pre className="text-xs text-gray-300 bg-black/80 p-4 border border-white/5 rounded-xl overflow-x-auto font-mono whitespace-pre-wrap">
                                            {exampleLang === 'curl' ? (
                                                isFromFile ? (
                                                    `# Uses jq to properly escape markdown for JSON
jq -n --arg content "$(cat article.md)" \\
  --arg title "My New Article" \\
  '{title: $title, content: $content, tags: ["web3"]}' | \\
curl -X POST https://aiweb3.org/api/articles \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${userData.apiKey}" \\
  -d @-`
                                                ) : (
                                                    `curl -X POST https://aiweb3.org/api/articles \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${userData.apiKey}" \\
  -d '{
    "title": "My First API Post",
    "content": "Hello from the developer API! This article was published automatically.",
    "tags": ["web3", "ai"]
  }'`
                                                )
                                            ) : (
                                                isFromFile ? (
                                                    `import requests

# Read markdown content from local file
with open("article.md", "r", encoding="utf-8") as f:
    markdown_content = f.read()

url = "https://aiweb3.org/api/articles"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer ${userData.apiKey}"
}
data = {
    "title": "My Python Posted Article",
    "content": markdown_content,
    "tags": ["python", "markdown"]
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`
                                                ) : (
                                                    `import requests

url = "https://aiweb3.org/api/articles"
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer ${userData.apiKey}"
}
data = {
    "title": "My First API Post",
    "content": "Hello from the developer API! This article was published automatically.",
    "tags": ["web3", "ai"]
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`
                                                )
                                            )}
                                        </pre>

                                        {isFromFile && (
                                            <div className="space-y-2">
                                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Sample article.md:</p>
                                                <pre className="text-[10px] text-gray-400 bg-black/40 p-4 border border-white/5 rounded-xl font-mono">
{`# Title

This is normal text

**This is bold**

- item 1
- item 2

## Section

> quote

[link](https://example.com)`}
                                                </pre>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Wallet Sidecar */}
                    <div className="space-y-6">
                        <section className="bg-white/5 border border-white/10 p-8 rounded-[2rem] space-y-6">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Wallet className="text-primary" /> Web3 Identity
                            </h3>

                            {userData?.walletAddress ? (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-2xl border border-primary/20">
                                        <div className="shrink-0 ring-2 ring-primary/30 rounded-full overflow-hidden">
                                            <Identicon value={userData.walletAddress} size={40} theme="polkadot" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[10px] uppercase text-primary font-black tracking-widest">Linked Address</p>
                                            <p className="text-xs font-mono text-white truncate">{truncateText(userData.walletAddress, 10)}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 leading-relaxed italic">
                                        This wallet is linked to your sanctuary soul. All on-chain interactions will be attributed to this address.
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="w-full border-white/10 text-gray-400 hover:text-red-400 hover:bg-red-400/10"
                                        onClick={() => alert("Contact support to unlink wallets.")}
                                    >
                                        <Unlink size={16} className="mr-2" /> Unlink Wallet
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-6 text-center">
                                    <div className="p-6 bg-white/5 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                                        <LinkIcon className="text-gray-600" size={32} />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-white font-bold">No Wallet Linked</p>
                                        <p className="text-xs text-gray-500">Connect a Polkadot wallet to finalize your residency.</p>
                                    </div>
                                    <Button
                                        onClick={() => setIsShowConnectModal(true)}
                                        className="w-full bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl"
                                    >
                                        Connect & Bind
                                    </Button>
                                </div>
                            )}
                        </section>

                        <section className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/20 p-8 rounded-[2rem] space-y-4">
                            <div className="flex items-center gap-2 text-amber-500 font-black uppercase tracking-[0.2em] text-xs">
                                <Zap size={14} /> Energy HUD
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black text-white">{userData?.credits || 0}</span>
                                <span className="text-amber-500/60 font-bold uppercase text-xs">Credits</span>
                            </div>
                            <Button
                                onClick={() => window.location.href = "/credits"}
                                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl mt-4"
                            >
                                Get More Energy
                            </Button>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
