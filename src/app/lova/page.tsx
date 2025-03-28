"use client";

import React, { useEffect, useState } from "react";
import { NavbarDemo } from "@/components/TopNavbar";
import { collection, getDocs, updateDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import { FB_DB } from "@/lib/fbClient";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {useWalletContext} from "@/components/wallet-context";

//const {accounts, isShowConnectModal, setIsShowConnectModal} = useWalletContext()

const LOVAlogo = "/img/LOVA_logo.png";

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

interface Balances {
  acalaBalancePUMPBOT: number;
  lovaBalancePUMPBOT: number;
  acalaBalanceTreasury: number;
  lovaBalanceTreasury: number;
}

export default function LOVA() {
  const { accounts, isShowConnectModal, setIsShowConnectModal } = useWalletContext();

  const [isEligible, setIsEligible] = useState(null);

  const [hasClaimed, setHasClaimed] = useState(false);

  const [videos, setVideos] = useState<Video[]>([]);
  const [balances, setBalances] = useState<Balances>({
    acalaBalancePUMPBOT: 0,
    lovaBalancePUMPBOT: 0,
    acalaBalanceTreasury: 0,
    lovaBalanceTreasury: 0,
  });
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  // Function to calculate time left until rewardTime
  const calculateTimeLeft = (rewardTime: number, currentTime: number) => {
    const difference = rewardTime - currentTime;

    if (difference <= 0) {
      return "Reward Available Now!";
    }

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {

    const checkEligibility = async () => {
      if (accounts.length === 0 || !accounts[0]?.address) {
        setIsEligible(null);
        setHasClaimed(false); // Reset state if no wallet
        return;
      }
    
      const address = accounts[0].address;
    
      try {
        const snapshot = await getDocs(collection(FB_DB, "keyINFO", "airdrop", "addresses"));
        const matched = snapshot.docs.find(doc => doc.id === address);
    
        if (matched) {
          setIsEligible(true);
    
          const data = matched.data();
          if (data.claim === true) {
            setHasClaimed(true);
          } else {
            setHasClaimed(false);
          }
        } else {
          setIsEligible(false);
          setHasClaimed(false);
        }
      } catch (err) {
        console.error("❌ Firestore error checking eligibility:", err);
        setIsEligible(null);
        setHasClaimed(false);
      }
    };


    const parseFormattedBalance = (formattedString: string): number => {
      if (!formattedString || typeof formattedString !== "string") return 0;
      const [numericPart, unit] = formattedString.split(" ");
      if (!numericPart) return 0;
      let value = parseFloat(numericPart);
      if (isNaN(value)) return 0;
      if (numericPart.toLowerCase().endsWith("k") || (unit && unit.toLowerCase().startsWith("k"))) {
        value *= 1000;
      }
      return value;
    };

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
                    address,
                    amount: data.tokens[index] || 0,
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

    const fetchBalances = async () => {
      try {
        const balanceDoc = await getDoc(doc(FB_DB, "keyINFO", "balance"));
        if (balanceDoc.exists()) {
          const balanceData = balanceDoc.data();
          const formattedBalances: Balances = {
            acalaBalancePUMPBOT: parseFormattedBalance(balanceData.acalaBalancePUMPBOT),
            lovaBalancePUMPBOT: parseFormattedBalance(balanceData.lovaBalancePUMPBOT),
            acalaBalanceTreasury: parseFormattedBalance(balanceData.acalaBalanceTreasury),
            lovaBalanceTreasury: parseFormattedBalance(balanceData.lovaBalanceTreasury),
          };
          setBalances(formattedBalances);
        }
      } catch (error) {
        console.error("Error fetching balances:", error);
      }
    };

    // Real-time listener for timestamp and rewardTime
    const timeDocRef = doc(FB_DB, "keyINFO", "time");
    const unsubscribe = onSnapshot(timeDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const timestamp = data.timestamp?.toMillis?.() || Date.now();
        const rewardTime = data.rewardTime; // Assuming stored as milliseconds

        if (rewardTime) {
          setTimeLeft(calculateTimeLeft(rewardTime, Date.now()));
        } else {
          setTimeLeft("Reward time not set");
        }
      } else {
        setTimeLeft("Time data not found");
      }
    }, (error) => {
      console.error("Error listening to time data:", error);
      setTimeLeft("Error loading timer");
    });


    checkEligibility();
  
    fetchVideos();
    fetchBalances();

    // Update time left every second
    const interval = setInterval(() => {
      const timeDocData = timeDocRef ? timeDocRef._document?.data?.value.mapValue.fields : null;
      const rewardTime = timeDocData?.rewardTime?.integerValue || timeDocData?.rewardTime?.doubleValue;
      if (rewardTime) {
        setTimeLeft(calculateTimeLeft(rewardTime, Date.now()));
      }
    }, 1000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [accounts]);

  const formatNumber = (num: number): string => {
    return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const rewardTiers = [120000, 110000, 100000, 90000, 80000];

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
                Support contents and Earn
              </button>
            </Link>
            <Link href="#voting">
              <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold transition-all">
                Vote and Earn
              </button>
            </Link>            
          </div>
        </motion.div>
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
            <section className="text-center text-lg text-gray-300">
              <p>
                <span className="text-blue-400 font-semibold">LOVA Pump AI</span> is an intelligent,
                community-driven agent that automatically buys LOVA based on{" "}
                <strong>real-time sentiment analysis</strong> and <strong>social engagement</strong>. The more active the
                community, the stronger the support for LOVA! 🚀
              </p>

              <p className="mt-4">
                <span className="text-blue-400 font-semibold"> 💰 LOVA Pump Bot:</span>{" "}
                {formatNumber(balances.acalaBalancePUMPBOT)} ACA | {formatNumber(balances.lovaBalancePUMPBOT)} LOVA
              </p>

              <p className="text-gray-300">
                <span className="text-blue-400 font-semibold">🏦 Treasury Reserve:</span>{" "}
                {formatNumber(balances.acalaBalanceTreasury)} ACA | {formatNumber(balances.lovaBalanceTreasury)} LOVA
              </p>

              <p className="text-gray-300">
                <span className="text-yellow-400 font-semibold"> ✅ LOVA value by AI Agent:</span>{" "}
                75 LOVA = 1 ACA 
              </p>

              <p className="mt-6 text-gray-300">
                Stay updated with <strong>LOVA Pump AI’s</strong> latest activity and insights—{" "}
                <a
                  href="https://x.com/LovaPump"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 font-semibold hover:underline"
                >
                  follow us on Twitter!
                </a>{" "}
                💙
              </p>
            </section>
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


{/* ❤️ Earn & Share LOVA by Voting Section */}
<section id="voting" className="py-16 px-4 text-center bg-gradient-to-r from-pink-900/50 to-red-900/50">
  <div className="max-w-4xl mx-auto">
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="text-4xl font-bold mb-6 text-white"
    >
      ❤️ Earn & Share LOVA by Voting!
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-lg mb-8 text-gray-300"
    >
      <section className="text-center text-lg text-gray-300">
        <p>
          🎉 The <span className="text-pink-400 font-semibold">Acala Meme & dApp Competition</span> is ON! 
        </p>
        <p className="mt-4">
          ❤️ Voting for <strong>LOVA</strong> or any dApp shows your support — and earns you <span className="text-yellow-400 font-semibold">LOVA airdrops</span>!
        </p>
        <p className="mt-4">
          💸 Use LOVA to tip creators, power up content, and grow your impact. Every vote fuels the love economy. The more you give, the more you earn!
        </p>
        <p className="mt-6 text-gray-300">
          <a
            href="https://voting.opensquare.io/space/acala/proposal/Qme3jkfQh7crdiS96mFdiXrPBd3bNPwNPZtnZXDhrMqogi?page=1&discussion_page=1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 font-semibold hover:underline"
          >
            👉 Vote Now & Spread the LOVA 💖
          </a>
        </p>
        {isEligible === true && (
  <>
    <p className="text-green-400 mt-2 font-semibold">
      🎉 You are qualified for the airdrop, thank you for voting and sharing love!
    </p>

    {hasClaimed ? (
      <p className="text-blue-300 mt-2 font-semibold">
        ✅ You've claimed the airdrop. Please wait for the voting period to end!
      </p>
    ) : (
      <button
        onClick={async () => {
          try {
            const address = accounts[0]?.address;
            if (!address) return;

            const docRef = doc(FB_DB, "keyINFO", "airdrop", "addresses", address);
            await updateDoc(docRef, {
              claim: true,
              claimedAt: new Date(),
            });

            setHasClaimed(true);
            console.log("✅ Airdrop claimed!");
          } catch (err) {
            console.error("❌ Error claiming airdrop:", err);
            alert("Something went wrong. Please try again.");
          }
        }}
        className="mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full"
      >
        ✨ Claim Your Airdrop
      </button>
    )}
  </>
)}

        {isEligible === false && (
        <p className="text-yellow-300 mt-2">
          🔔 Please vote for the airdrop (if you already did, updates are coming soon).
        </p>
        )}

        {isEligible === null && (
        <p className="text-yellow-300 mt-2">
          🔔 Connect your wallet to check if you qualify for the airdrop!
        </p>
        )}

      </section>

    </motion.p>
    <div className="flex flex-col md:flex-row justify-center gap-6 text-left">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-6 rounded-lg shadow-lg flex-1"
      >
        <h3 className="text-xl font-semibold mb-2 text-white">Why Voting Matters</h3>
        <ul className="space-y-2 text-gray-300">
          <li>✅ Help the best dApps shine in the Acala ecosystem.</li>
          <li>✅ Spread positivity and love through your votes.</li>
          <li>✅ Every vote supports real builders and community creators.</li>
        </ul>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gray-800 p-6 rounded-lg shadow-lg flex-1"
      >
        <h3 className="text-xl font-semibold mb-2 text-white">How You Benefit</h3>
        <p className="text-gray-300">
          ✨ Get rewarded with <span className="text-pink-400 font-semibold">LOVA</span> just for participating.
          Then, use it to tip creators or support future dApps. It’s a win-win for everyone in the ecosystem!
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
                const totalReward = rewardTiers[i] || 100000;
                const creatorReward = totalReward * 0.5;
                const protocolReward = totalReward * 0.1;
                const contributorPoolReward = totalReward * 0.4;

                const totalPoints = video.totalTokens;
                const lovaPool = totalPoints * 15;
                const rawProfit = lovaPool > 0 ? contributorPoolReward / lovaPool : 0;
                const profitPerLova = (rawProfit - 1).toFixed(2); // 实际利润（去掉本金）
                const weeklyProfit = parseFloat(profitPerLova);
                const apy = weeklyProfit > 0 ? ((1 + weeklyProfit) ** 52 - 1) * 100 : 0;
                const formattedApy = apy.toFixed(2);
                
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex flex-col md:flex-row items-center bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                  >
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

                      <div className="mt-4 bg-gray-700 p-4 rounded-lg">
                        <h4 className="text-md font-semibold text-blue-400 mb-2">
                          Reward Breakdown (Total: {formatNumber(totalReward)} LOVA)
                        </h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>🎥 <strong>Content Creator:</strong> {formatNumber(creatorReward)} LOVA (50%)</li>
                          <li>⚙️ <strong>Protocol:</strong> {formatNumber(protocolReward)} LOVA (10%)</li>
                          <li>💧 <strong>Contributor Pool:</strong> {formatNumber(contributorPoolReward)} LOVA (40%)</li>
                        </ul>
                        <div className="mt-3 bg-blue-900/50 p-3 rounded-md">
                          <p className="text-sm font-semibold text-blue-300">
                            🌟 <strong>Total worth of LOVA in Pool:</strong> {formatNumber(lovaPool)} LOVA
                          </p>
                          <p className="text-sm font-semibold text-green-400">
                            💰 <strong>Profit per LOVA Contributed:</strong> {profitPerLova} LOVA
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-md font-semibold text-gray-200">Top Contributors:</h4>
                        <ul className="text-sm text-gray-400">
                          {video.contributors.length > 0 ? (
                            Object.entries(
                              video.contributors.reduce((acc, contributor) => {
                                acc[contributor.address] = (acc[contributor.address] || 0) + contributor.amount;
                                return acc;
                              }, {} as Record<string, number>)
                            )
                              .map(([address, totalAmount]) => ({
                                address: `${address.slice(0, 4)}...${address.slice(-4)}`,
                                amount: totalAmount,
                              }))
                              .sort((a, b) => b.amount - a.amount)
                              .slice(0, 4)
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

                      <div className="mt-6 text-center">
                        <Link href={`/videos/${video.id}`}>
                          <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-2 rounded-full font-semibold transition-all">
                            Support & Earn {formattedApy}% APY
                          </button>
                        </Link>
                        <div className="mt-2 text-sm text-gray-400">
                             Weekly Profit: {profitPerLova} LOVA per LOVA
                        </div>
                        <div className="mt-2 text-sm text-gray-400">
                          {timeLeft !== null ? (
                            <span>Time until reward: {timeLeft}</span>
                          ) : (
                            <span>Loading timer...</span>
                          )}
                        </div>
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