"use client";

import React, { useState } from "react";
import { BackgroundBeams } from "../components/ui/background-beams";
import { FB_DB } from "@/lib/fbClient";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { logger } from "@/utils/logger";

export function JoinMail() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleJoin = async () => {
    if (!validateEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!FB_DB) {
      setStatus("error");
      setMessage("Database unavailable.");
      logger.error("Firebase DB is not initialized.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      await addDoc(collection(FB_DB, "subscriptionList"), {
        email: email,
        timestamp: serverTimestamp(),
      });
      setStatus("success");
      setMessage("Specifically, you have subscribed! Thank you.");
      setEmail("");
    } catch (error) {
      logger.error("Error adding document: ", error);
      setStatus("error");
      setMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="h-[40rem] w-full flex items-center justify-center relative overflow-hidden">
      <div className="max-w-2xl w-full mx-auto p-8 relative z-20">
        <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 text-center font-sans tracking-tight mb-8">
          Join the <span className="text-gradient">Revolution</span>
        </h1>

        <p className="text-neutral-400 max-w-lg mx-auto mb-10 text-lg text-center leading-relaxed">
          Stay ahead of the curve. Get exclusive updates, drops, and community news delivered straight to your inbox.
        </p>

        <div className="flex flex-col gap-4 items-center justify-center relative z-10 glass-card p-6 rounded-3xl border border-white/10">
          <input
            type="text"
            placeholder="enter@your.email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
          />

          <button
            className="w-full bg-white text-black font-bold text-lg py-4 rounded-full hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white transition-all duration-300 shadow-lg hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleJoin}
            disabled={status === "loading" || status === "success"}
          >
            {status === "loading" ? "Processing..." : status === "success" ? "Welcome Aboard!" : "Join Waitlist"}
          </button>

          {message && (
            <p className={`text-sm font-medium mt-2 ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </p>
          )}
        </div>
      </div>

      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
        <BackgroundBeams />
      </div>
    </div>
  );
}

