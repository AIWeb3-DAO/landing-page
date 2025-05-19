// components/xlova/LovaBegin.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.css";


const LOVAlogo = "/img/LOVA_logo.png";

const LovaBegin: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 px-4 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <Image
            src={LOVAlogo}
            alt="LOVA Logo"
            width={120}
            height={120}
            className="mx-auto mb-6 animate-pulse"
          />
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            LOVA: Love in Web3
          </h1>
          <p className={`${styles.paragraph} text-lg md:text-xl max-w-3xl mx-auto mb-8`}>
            <span className={`${styles.fontSemibold} ${styles.textBlue400}`}>
              LOVA
            </span>{" "}
            is a community-driven token by{" "}
            <span className={styles.textPurple400}>AIWeb3</span>. With our new
            utility, you can use LOVA to share messages on X, supporting your
            favorite content creators while spreading{" "}
            <span className={styles.textPink400}>love</span> and{" "}
            <span className={styles.textBlue400}>empowerment</span> across the
            Polkadot ecosystem.
          </p>  

          <p className={`${styles.paragraph} text-lg md:text-xl max-w-3xl mx-auto mb-8`}>
            To use this service, you may need to acquire LOVA tokens. Currently, LOVA is available on 
            <a href="https://apps.acala.network/swap" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline"> Acala Swap</a>. 
            Support for purchasing LOVA on 
            <a href="https://app.hydration.net/trade/swap?referral=AIWEB3&assetIn=10&assetOut=1000639" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline"> Hydration</a> 
            will be added soon.
          </p>


          
         
        </motion.div>
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,#1e40af_0%,transparent_70%)] animate-pulse"></div>
        </div>
      </section>

    </>
  );
};

export default LovaBegin;
