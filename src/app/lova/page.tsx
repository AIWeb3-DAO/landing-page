"use client";

import React, { useEffect, useState } from "react";
import { NavbarDemo } from "@/components/TopNavbar";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { FB_DB } from "@/lib/fbClient";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"; // For animations

const LOVAlogo = "/img/LOVA_logo.png"; // Ensure this exists in `public/img/`

interface Video {
  id: string;
  youtubeURL: string;
  youtubeTitle: string;
  author: string;
  contributors: { address: string; amount: number }[];
  tokens: number[];
  description: string;
  currentRatio: string;
  totalTokens: number;
}

export default function LOVA() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const timeDoc = await getDoc(doc(FB_DB, "keyINFO", "time"));
        const currentTime = timeDoc.exists() ? timeDoc.data().timestamp.toMillis() : Date.now();

        const querySnapshot = await getDocs(collection(FB_DB, "youtube"));
        const videosList: Video[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const url = new URL(data.youtubeURL);
          const videoId = url.searchParams.get("v");

          if (videoId) {
            const videoTimestamp = data.timestamp.toMillis();
            const timeDifference = currentTime - videoTimestamp;
            const timeDifferenceInHours = Math.floor(timeDifference / (1000 * 60 * 60));
            const timeDifferenceInMins = Math.floor(timeDifference / (1000 * 60));

            const max_HOURS = 400;
            let hoursDIFF = Math.max(0, Math.min(timeDifferenceInHours, max_HOURS));
            const slope = -20 / 400;
            const current_ratio = (30 - slope * hoursDIFF).toFixed(2);

            const totalTokens = data.tokens?.reduce((sum: number, token: number) => sum + token, 0) || 0;

            const contributors =
              data.contributors && data.tokens
                ? data.contributors.map((address: string, index: number) => ({
                    address, // Address from contributors array
                    amount: data.tokens[index] || 0, // Corresponding token amount, default to 0 if missing
                  }))
                : [];

            videosList.push({
              id: doc.id,
              youtubeURL: videoId,
              youtubeTitle: data.youtubeTitle,
              author: data.author,
              contributors,
              tokens: data.tokens || [],
              description: `Posted ${timeDifferenceInHours} hours (${timeDifferenceInMins} mins) ago`,
              currentRatio: current_ratio,
              totalTokens,
            });
          }
        });

        setVideos(videosList.sort((a, b) => b.totalTokens - a.totalTokens).slice(0, 5));
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  // Define reward array for top 5 videos (in LOVA)
  const rewardTiers = [120000, 110000, 100000, 90000, 80000]; // Adjust these values as needed

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      <NavbarDemo />

      {/* Hero Section */}
      <section className="py-16 px-4 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <Image src={LOVAlogo} alt="LOVA Logo" width={120} height={120} className="mx-auto mb-6 animate-pulse" />
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            LOVA: Love in Web3
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            <span className="font-semibold text-blue-400">LOVA</span> is a community-driven token by{" "}
            <span className="text-purple-400">AIWeb3</span>, spreading <span className="text-pink-400">love</span> and{" "}
            <span className="text-blue-400">empowerment</span> across the Polkadot ecosystem.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="#learn-more">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition-all">
                Learn More
              </button>
            </Link>
            <Link href="#videos">
              <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold transition-all">
                Support and Earn LOVA
              </button>
            </Link>
          </div>
        </motion.div>
        {/* Background Animation */}
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,#1e40af_0%,transparent_70%)] animate-pulse"></div>
        </div>
      </section>

      {/* About LOVA Section */}
      <section id="learn-more" className="py-16 px-4 bg-gray-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-8"
          >
            About LOVA Token
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg mb-6"
          >
            LOVA represents <span className="text-pink-400">support</span>, <span className="text-blue-400">engagement</span>, and{" "}
            <span className="text-purple-400">empowerment</span> in the decentralized world.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="p-4 bg-gray-700 rounded-lg"
            >
              <span className="text-2xl">💎</span>
              <h3 className="text-xl font-semibold mt-2">100M Supply</h3>
              <p className="text-gray-300">A capped supply of 100 million tokens issued on Assethub.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-4 bg-gray-700 rounded-lg"
            >
              <span className="text-2xl">🚀</span>
              <h3 className="text-xl font-semibold mt-2">AI-Powered</h3>
              <p className="text-gray-300">Driven by the LOVA Pump AI Agent for automated growth.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-4 bg-gray-700 rounded-lg"
            >
              <span className="text-2xl">❤️</span>
              <h3 className="text-xl font-semibold mt-2">Community First</h3>
              <p className="text-gray-300">Built to foster an inclusive Web3 ecosystem.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LOVA Pump AI Agent Section */}
      <section className="py-16 px-4 text-center bg-gradient-to-r from-blue-900/50 to-purple-900/50">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-6"
          >
            🚀 LOVA Pump AI Agent
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg mb-8"
          >
            Powered by <span className="text-blue-400">real-time sentiment analysis</span>, the AI agent boosts LOVA based on community engagement.
          </motion.p>
          <div className="flex flex-col md:flex-row justify-center gap-6 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg flex-1"
            >
              <h3 className="text-xl font-semibold mb-2">How It Works</h3>
              <ul className="space-y-2 text-gray-300">
                <li>✅ Analyzes activity on X and social platforms.</li>
                <li>✅ Scores sentiment based on community buzz.</li>
                <li>✅ Buys LOVA tokens to fuel ecosystem growth.</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg flex-1"
            >
              <h3 className="text-xl font-semibold mb-2">Why It Matters</h3>
              <p className="text-gray-300">
                Your <span className="text-blue-400">tweets</span>, <span className="text-purple-400">posts</span>, and{" "}
                <span className="text-pink-400">engagement</span> directly drive LOVA’s value!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Top Videos Section */}
      <section id="videos" className="py-16 px-4 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          >
            🔥 Support Creators, Earn LOVA
          </motion.h2>
          <p className="text-center text-lg mb-8 text-gray-300">
            Back your favorite Polkadot & Acala content with LOVA and earn{" "}
            <span className="text-blue-400">LOVA rewards provided by the LOVA Pump AI Agent!</span>! <br />
            <span className="text-sm">50% to creators, 10% to protocol, 40% to contributors.</span>
          </p>

          {videos.length === 0 ? (
            <p className="text-gray-400 text-center">Loading top videos...</p>
          ) : (
            <div className="space-y-12">
              {videos.map((video, i) => {
                const totalReward = rewardTiers[i] || 100000; // Default to 100,000 if index exceeds array
                const creatorReward = totalReward * 0.5; // 50%
                const protocolReward = totalReward * 0.1; // 10%
                const contributorPoolReward = totalReward * 0.4; // 40%

                const totalPoints = video.totalTokens; // e.g., 653.75
                const lovaPool = totalPoints * 15; // e.g., 653.75 * 15 = 9806.25
                const profitPerLova = lovaPool > 0 ? (contributorPoolReward / lovaPool).toFixed(2) : "0.00"; // e.g., 40000 / 9806.25 ≈ 4.08

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex flex-col md:flex-row items-center bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                  >
                    {/* Video Thumbnail */}
                    <div className="md:w-1/3 w-full">
                      <Link href={`/videos/${video.id}`}>
                        <Image
                          src={`https://img.youtube.com/vi/${video.youtubeURL}/sddefault.jpg`}
                          width={400}
                          height={250}
                          alt="cover"
                          className="w-full h-48 md:h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      </Link>
                    </div>

                    {/* Stats and Info */}
                    <div className="md:w-2/3 w-full p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold">
                            <Link href={`/videos/${video.id}`} className="text-blue-400 hover:underline">
                              {video.youtubeTitle}
                            </Link>
                          </h3>
                          <span className="text-sm bg-blue-600 text-white px-2 py-1 rounded-full">
                            Rank #{i + 1}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">
                          Created by: <span className="text-purple-400">{video.author}</span>
                        </p>
                        <p className="text-sm text-gray-300">
                          💙 <strong>Total Points (15 LOVA = 1 point):</strong> {totalPoints.toFixed(2)}
                        </p>
                      </div>

                      {/* Reward Breakdown */}
                      <div className="mt-4 bg-gray-700 p-4 rounded-lg">
                        <h4 className="text-md font-semibold text-blue-400 mb-2">Reward Breakdown (Total: {totalReward.toLocaleString()} LOVA)</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>🎥 <strong>Content Creator:</strong> {creatorReward.toLocaleString()} LOVA (50%)</li>
                          <li>⚙️ <strong>Protocol:</strong> {protocolReward.toLocaleString()} LOVA (10%)</li>
                          <li>💧 <strong>Contributor Pool:</strong> {contributorPoolReward.toLocaleString()} LOVA (40%)</li>
                        </ul>
                        <div className="mt-3 bg-blue-900/50 p-3 rounded-md">
                          <p className="text-sm font-semibold text-blue-300">
                            🌟 <strong>Total worth of LOVA in Pool:</strong> {lovaPool.toLocaleString()} LOVA
                          </p>
                          <p className="text-sm font-semibold text-green-400">
                            💰 <strong>Profit per LOVA Contributed:</strong> {profitPerLova} LOVA
                          </p>
                        </div>
                      </div>

                      {/* Contributors */}
                      <div className="mt-4">
                        <h4 className="text-md font-semibold text-gray-200">Top Contributors:</h4>
                        <ul className="text-sm text-gray-400">
                          {video.contributors.length > 0 ? (
                            Object.entries(
                              video.contributors.reduce((acc, contributor) => {
                                acc[contributor.address] = (acc[contributor.address] || 0) + contributor.amount;
                                return acc;
                              }, {} as Record<string, number>) // Aggregate contributions per address
                            )
                              .map(([address, totalAmount]) => ({
                                address: `${address.slice(0, 4)}...${address.slice(-4)}`,
                                amount: totalAmount,
                              })) // Convert back to array with truncated address
                              .sort((a, b) => b.amount - a.amount) // Sort by highest amount
                              .slice(0, 4) // Take the top 4 contributors
                              .map((contributor, index) => (
                                <li key={index}>
                                  💎 {contributor.address} - {contributor.amount} points
                                </li>
                              ))
                          ) : (
                            <li>No contributors yet—be the first!</li>
                          )}
                        </ul>
                      </div>

                      {/* Support Button */}
                      <div className="mt-6 text-center">
                        <Link href={`/videos/${video.id}`}>
                          <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-2 rounded-full font-semibold transition-all">
                            Support & Earn {profitPerLova} per LOVA 
                          </button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="py-16 px-4 text-center bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-6"
          >
            🎯 The Future of LOVA
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg mb-8"
          >
            Bridging <span className="text-blue-400">AI</span>, <span className="text-purple-400">Web3</span>, and{" "}
            <span className="text-pink-400">community</span> into a powerful movement.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="p-4"
            >
              <span className="text-2xl">🌟</span>
              <p className="mt-2">AI-driven rewards</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-4"
            >
              <span className="text-2xl">📊</span>
              <p className="mt-2">Enhanced analytics</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-4"
            >
              <span className="text-2xl">🤝</span>
              <p className="mt-2">Polkadot partnerships</p>
            </motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 text-lg"
          >
            <span className="text-blue-400">Together</span>, we’re redefining incentives in Web3. 🚀💙
          </motion.p>
        </div>
      </section>
    </div>
  );
}