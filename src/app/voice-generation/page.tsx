"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@/components/user-context";
import { Button } from "@/components/ui/button";
import { Mic, Loader2, Download, Play, Pause, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { VOICE_OPTIONS, LANGUAGE_OPTIONS, QwenTask } from "@/types/voice";
import { doc, onSnapshot, query, collection, where, orderBy, limit } from "firebase/firestore";
import { FB_DB, FB_STORAGE } from "@/lib/fbClient";
import { ref, getDownloadURL } from "firebase/storage";
import { History as HistoryIcon } from "lucide-react";

export default function VoiceGenerationPage() {
    const { user, userData, consumeCredits, setIsAuthModalOpen } = useUser();

    const [text, setText] = useState("");
    const [selectedVoice, setSelectedVoice] = useState("Ryan");
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentTask, setCurrentTask] = useState<QwenTask | null>(null);
    const [history, setHistory] = useState<QwenTask[]>([]);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [calculatedCost, setCalculatedCost] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const getProxyUrl = (gsUrl: string) => {
        if (!gsUrl || !gsUrl.startsWith("gs://")) return gsUrl;
        const parts = gsUrl.split('/');
        const path = parts.slice(3).join('/');
        return `/api/voice-generation/audio?path=${encodeURIComponent(path)}`;
    };

    // Listen to history
    useEffect(() => {
        if (!user?.uid) {
            setHistory([]);
            return;
        }

        const q = query(
            collection(FB_DB, "qwen3TTS"),
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc"),
            limit(10)
        );

        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                const h: QwenTask[] = [];
                snapshot.forEach((doc) => {
                    h.push({ ...doc.data(), id: doc.id } as QwenTask);
                });
                setHistory(h);
            },
            (error) => {
                console.error("History snapshot error:", error);
                // If index is missing, try fallback without sort
                if (error.code === 'failed-precondition') {
                    console.warn("Firestore index missing, falling back to unsorted history");
                    const qFallback = query(
                        collection(FB_DB, "qwen3TTS"),
                        where("userId", "==", user.uid),
                        limit(10)
                    );
                    onSnapshot(qFallback, (snapshot) => {
                        const h: QwenTask[] = [];
                        snapshot.forEach((doc) => {
                            h.push({ ...doc.data(), id: doc.id } as QwenTask);
                        });
                        // Sort in memory as fallback
                        h.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
                        setHistory(h);
                    });
                }
            }
        );

        return () => unsubscribe();
    }, [user?.uid]);

    // Calculate cost based on word count (supports mixed English and Chinese/Japanese/Korean)
    const getWordCount = (str: string) => {
        const cjkRegex = /[\u4e00-\u9fa5\u3040-\u30ff\uac00-\ud7af]/g;
        const cjkCount = (str.match(cjkRegex) || []).length;
        const nonCjkStr = str.replace(cjkRegex, ' ');
        const westernCount = nonCjkStr.trim().split(/\s+/).filter(w => w.length > 0).length;
        return cjkCount + westernCount;
    };

    const wordCount = getWordCount(text);
    const cost = Math.ceil(wordCount / 256) * 50;

    useEffect(() => {
        setCalculatedCost(cost);
    }, [cost]);

    // Listen to task updates
    useEffect(() => {
        if (!currentTask?.id) return;

        const unsubscribe = onSnapshot(
            doc(FB_DB, "qwen3TTS", currentTask.id),
            async (docSnap) => {
                if (docSnap.exists()) {
                    const taskData = docSnap.data() as QwenTask;
                    setCurrentTask({ ...taskData, id: currentTask.id });

                    if (taskData.status === "completed" && taskData.resultAudioUrl) {
                        try {
                            // Convert gs:// URL to downloadable URL
                            const gsUrl = taskData.resultAudioUrl;
                            if (gsUrl.startsWith("gs://")) {
                                const parts = gsUrl.split('/');
                                const path = parts.slice(3).join('/');
                                // Use our new proxy API to bypass client-side storage issues
                                const proxyUrl = `/api/voice-generation/audio?path=${encodeURIComponent(path)}`;
                                setAudioUrl(proxyUrl);
                            } else {
                                setAudioUrl(gsUrl);
                            }
                            setIsGenerating(false);
                        } catch (err: any) {
                            console.error("Error getting download URL:", err);
                            setError(`Failed to load audio: ${err.message || 'Unknown error'}`);
                            setIsGenerating(false);
                        }
                    } else if (taskData.status === "failed") {
                        setError(taskData.error || "Voice generation failed");
                        setIsGenerating(false);
                    }
                }
            },
            (err) => {
                console.error("Task listener error:", err);
                setError("Failed to monitor task status");
                setIsGenerating(false);
            }
        );

        return () => unsubscribe();
    }, [currentTask?.id]);

    const handleGenerate = async () => {
        if (!text.trim()) {
            setError("Please enter some text");
            return;
        }

        if (!user) {
            setIsAuthModalOpen(true);
            return;
        }

        // Show confirmation dialog
        setShowConfirmDialog(true);
    };

    const confirmGeneration = async () => {
        setShowConfirmDialog(false);
        setError(null);
        setAudioUrl(null);

        // Check and consume credits
        const success = await consumeCredits(calculatedCost);
        if (!success) {
            setError(`Insufficient credits. You need ${calculatedCost} credits but only have ${userData?.credits || 0}.`);
            return;
        }

        setIsGenerating(true);

        try {
            // Call API to create task
            const response = await fetch("/api/voice-generation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text,
                    voice: selectedVoice,
                    language: selectedLanguage,
                    mode: "custom",
                    userId: user?.uid
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create task");
            }

            setCurrentTask({
                id: data.taskId,
                type: 'custom',
                status: 'pending',
                importance: 5,
                text,
                speaker: selectedVoice,
                language: selectedLanguage,
                createdAt: null as any
            });
        } catch (err: any) {
            console.error("Generation error:", err);
            setError(err.message || "Failed to start voice generation");
            setIsGenerating(false);
            // Refund credits on error
            // await addCredits(calculatedCost);
        }
    };

    const handleDownload = () => {
        if (!audioUrl) return;
        const a = document.createElement("a");
        a.href = audioUrl;
        a.download = `voice_${currentTask?.id || Date.now()}.wav`;
        a.click();
    };

    return (
        <main className="min-h-screen bg-black pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-4 py-1.5 rounded-full text-purple-400 text-xs font-bold uppercase tracking-widest">
                        <Mic size={14} /> Voice Generation
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                        Transform Text to{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-500">
                            Voice
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Experience advanced AI-powered voice generation. We are building the next generation of AI and Web3 to empower creators worldwide.
                    </p>
                </div>

                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6"
                >
                    {/* Text Input */}
                    <div className="space-y-2">
                        <label className="text-white font-semibold text-sm">Text to Generate</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter the text you want to convert to speech..."
                            className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none"
                            disabled={isGenerating}
                        />
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-500">{wordCount} words</span>
                            <span className="text-purple-400 font-semibold">
                                Cost: {calculatedCost} credits
                            </span>
                        </div>
                    </div>

                    {/* Voice Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-white font-semibold text-sm">Voice</label>
                            <select
                                value={selectedVoice}
                                onChange={(e) => setSelectedVoice(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50"
                                disabled={isGenerating}
                            >
                                {VOICE_OPTIONS.map((voice) => (
                                    <option key={voice.id} value={voice.id} className="bg-gray-900">
                                        {voice.name} - {voice.description}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-white font-semibold text-sm">Language</label>
                            <select
                                value={selectedLanguage}
                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50"
                                disabled={isGenerating}
                            >
                                {LANGUAGE_OPTIONS.map((lang) => (
                                    <option key={lang} value={lang} className="bg-gray-900">
                                        {lang}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3 text-red-400 text-sm">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    {/* Generate Button */}
                    <Button
                        onClick={handleGenerate}
                        disabled={isGenerating || !text.trim()}
                        className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-2xl h-14 font-bold text-lg transition-all disabled:opacity-50"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="animate-spin mr-2" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Mic className="mr-2" />
                                Generate Voice
                            </>
                        )}
                    </Button>

                    {/* Status Display */}
                    {currentTask && (
                        <div className="text-center space-y-2">
                            <div className="text-sm text-gray-400">
                                Status:{" "}
                                <span className="text-purple-400 font-semibold capitalize">
                                    {currentTask.status}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Audio Player */}
                    {audioUrl && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/5 border border-purple-500/20 rounded-2xl p-6 space-y-4"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-white font-bold">Generated Audio</h3>
                                <Button
                                    onClick={handleDownload}
                                    variant="ghost"
                                    className="text-purple-400 hover:text-purple-300"
                                >
                                    <Download size={18} className="mr-2" />
                                    Download
                                </Button>
                            </div>
                            <audio src={audioUrl} controls className="w-full" />
                        </motion.div>
                    )}
                </motion.div>

                {/* Info Section */}
                <div className="text-center text-sm text-gray-500 space-y-2">
                    <p>💡 Pricing: 50 credits per 256 words</p>
                    <p>🎯 Your balance: {userData?.credits || 0} credits</p>
                </div>
            </div>

            {/* History Section */}
            {user?.uid && (
                <div className="max-w-4xl mx-auto mt-16 px-4 pb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
                            <HistoryIcon className="text-purple-400" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Generation History</h2>
                    </div>

                    {history.length > 0 ? (
                        <div className="grid gap-4">
                            {history.map((item) => (

                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:bg-white/[0.07]"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="space-y-1 flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase">
                                                    {item.speaker || item.type}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {item.createdAt?.toDate().toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-gray-300 text-sm line-clamp-2 italic">
                                                &quot;{item.text}&quot;
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3 shrink-0">
                                            {item.status === "completed" && item.resultAudioUrl ? (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="rounded-xl border-white/10 text-gray-300 hover:text-white"
                                                        onClick={() => {
                                                            const url = getProxyUrl(item.resultAudioUrl!);
                                                            const audio = new Audio(url);
                                                            audio.play();
                                                        }}
                                                    >
                                                        <Play size={16} className="mr-2" />
                                                        Play
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl"
                                                        onClick={() => {
                                                            const url = getProxyUrl(item.resultAudioUrl!);
                                                            const link = document.createElement("a");
                                                            link.href = url;
                                                            link.download = `voice_${item.id}.wav`;
                                                            link.click();
                                                        }}
                                                    >
                                                        <Download size={16} className="mr-2" />
                                                        Download
                                                    </Button>
                                                </>
                                            ) : item.status === "failed" ? (
                                                <div className="flex items-center text-red-400 text-sm gap-1">
                                                    <AlertCircle size={16} />
                                                    Failed
                                                </div>
                                            ) : (
                                                <div className="flex items-center text-yellow-400 text-sm gap-2">
                                                    <Loader2 size={16} className="animate-spin" />
                                                    Processing
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                            <p className="text-gray-500">No voice generations found in your history yet.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Confirmation Dialog */}
            {showConfirmDialog && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-900 border border-white/10 rounded-3xl p-8 max-w-md w-full space-y-6"
                    >
                        <div className="text-center space-y-2">
                            <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto">
                                <Mic className="text-purple-400" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Confirm Generation</h3>
                            <p className="text-gray-400">
                                This will cost <span className="text-purple-400 font-bold">{calculatedCost} credits</span>
                            </p>
                            <p className="text-sm text-gray-500">
                                {wordCount} words • {selectedVoice} • {selectedLanguage}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                onClick={() => setShowConfirmDialog(false)}
                                variant="outline"
                                className="flex-1 rounded-2xl h-12 border-white/10 hover:bg-white/5"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={confirmGeneration}
                                className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-2xl h-12 font-bold"
                            >
                                Confirm & Pay
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </main>
    );
}
